import {dehydrate} from '@tanstack/react-query';
import {getQueryClient} from "utils/get-query-client";
import {fetchCourses} from "app/courses/hooks/useCourse";
import {CoursePageClient} from "app/courses/components/pages/SearchPage";

export default async function CoursesPage({
                                              searchParams,
                                          }: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const queryClient = getQueryClient();
    const page = parseInt(searchParams.page as string || '1', 10);
    const pageSize = 20;

    const queryParams = {
        title: searchParams.title as string | undefined,
        status: Array.isArray(searchParams.status) ? searchParams.status : searchParams.status ? [searchParams.status as string] : undefined,
        is_datetime_enrollable: searchParams.is_datetime_enrollable === 'true',
        sort_by: searchParams.sort_by as string | undefined,
        page,
        pageSize,
    };

    await queryClient.prefetchQuery({
        queryKey: ['courses', queryParams],
        queryFn: () => fetchCourses(queryParams)
    });

    return <CoursePageClient dehydratedState={dehydrate(queryClient)} initialPage={page}/>;
}
