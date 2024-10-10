'use client'
import {useQuery, QueryClient} from '@tanstack/react-query';
import {getBaseURL} from 'utils/getBaseURL';
import {BffCourseList} from "app/api/courses/route";
import {QueryParams} from "constants/queryParams";


export const fetchCourses = async (queryParams: QueryParams): Promise<BffCourseList> => {

    //객체를 쿼리스트링으로 변환
    const searchParams = new URLSearchParams();

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

export const useCourse = (queryParams) => {
    // 들어오는 값은 객체임. 이 객체를 그냥 전달하면 됨. 그런데 쿼리키를 객체로 하는게 좋을지?
    // 이를테면 배열이니까 순서가 바뀌지 않는지?
    // 그렇다면 항상 같은 순서로 sorting을 하자.
    // 그리고 직렬화하자.

    console.log('useCourse queryParams:', queryParams);
    const sortedQueryParams = Object.fromEntries(Object.entries(queryParams).sort());
    const stringifiedQueryParams = JSON.stringify(sortedQueryParams);

    return useQuery<BffCourseList, Error>({
        queryKey: ['courses', stringifiedQueryParams],
        queryFn: () => fetchCourses(queryParams),
    });
};

export const prefetchCoursesData = async (
    queryClient: QueryClient,
    queryParams: QueryParams
) => {

    const sortedQueryParams = Object.fromEntries(Object.entries(queryParams).sort());
    const stringifiedQueryParams = JSON.stringify(sortedQueryParams);

    await queryClient.prefetchQuery({
        queryKey: ['courses', stringifiedQueryParams],
        queryFn: () => fetchCourses(queryParams),
    });
};
