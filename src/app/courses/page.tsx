import {dehydrate} from '@tanstack/react-query';
import {getQueryClient} from "utils/get-query-client";
// import {getCourses} from "app/courses/hooks/useCourse";
import {CoursesPageClient} from "app/courses/components/pages/CoursesPageClient";
// import {Suspense} from "react";
// import {QueryParams, queryParamsSchema} from "constants/queryParams";


export default async function CoursesPageServer({}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const queryClient = getQueryClient();
    // const queryParams = queryParamsSchema.parse(searchParams)

    // console.log('query', queryParams)

    // const sortedQueryParams = Object.fromEntries(Object.entries(queryParams).sort());
    // const stringifiedQueryParams = JSON.stringify(sortedQueryParams);


    // await queryClient.prefetchQuery({
    //     queryKey: ['courses', stringifiedQueryParams],
    //     queryFn: () => getCourses(queryParams)
    // });

    // return <CoursesPageClient dehydratedState={dehydrate(queryClient)} initialPage={page}/>;
    return <CoursesPageClient dehydratedState={dehydrate(queryClient)}/>;
}
