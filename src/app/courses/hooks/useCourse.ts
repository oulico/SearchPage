'use client'
import {useQuery, QueryClient, QueryFunctionContext} from '@tanstack/react-query';
import {getBaseURL} from 'utils/getBaseURL';
import {BffCourseList} from "app/api/courses/route";
import {usePathname, useSearchParams} from 'next/navigation';

interface UseCourseParams {
    page: number;
    pageSize?: number;
}

interface CourseQueryParams {
    title?: string;
    status?: string[];
    is_datetime_enrollable?: boolean;
    sort_by?: string;
    page: number;
    pageSize: number;
}

const DEFAULT_PAGE_SIZE = 20;

export const fetchCourses = async ({
                                       title,
                                       status,
                                       is_datetime_enrollable,
                                       sort_by,
                                       page,
                                       pageSize,
                                   }: CourseQueryParams): Promise<BffCourseList> => {
    const searchParams = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
    });

    if (title) searchParams.append('title', title);
    if (status) status.forEach(s => searchParams.append('status', s));
    if (is_datetime_enrollable !== undefined) searchParams.append('is_datetime_enrollable', is_datetime_enrollable.toString());
    if (sort_by) searchParams.append('sort_by', sort_by);

    const url = `${getBaseURL()}/api/courses?${searchParams.toString()}`;

    const response = await fetch(url, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch courses');
    }

    return await response.json();
};

export const useCourse = ({page, pageSize = DEFAULT_PAGE_SIZE}: UseCourseParams) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const queryParams: CourseQueryParams = {
        title: searchParams.get('title') || undefined,
        status: searchParams.getAll('status'),
        is_datetime_enrollable: searchParams.get('is_datetime_enrollable') === 'true' || undefined,
        sort_by: searchParams.get('sort_by') || undefined,
        page,
        pageSize,
    };

    return useQuery<BffCourseList, Error>({
        queryKey: ['courses', pathname, queryParams],
        queryFn: () => fetchCourses(queryParams),
    });
};

export const prefetchCoursesData = async (
    queryClient: QueryClient,
    queryParams: CourseQueryParams
) => {
    await queryClient.prefetchQuery({
        queryKey: ['courses', queryParams],
        queryFn: () => fetchCourses(queryParams),
    });
};
