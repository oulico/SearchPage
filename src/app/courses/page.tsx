import {dehydrate} from '@tanstack/react-query';
import {getQueryClient} from "utils/get-query-client";
import {CoursesPageClient} from "app/courses/components/pages/CoursesPageClient";
import {QueryParams} from "constants/queryParams";
import {prefetchCoursesData} from "app/courses/hooks/utils/prefetchCoursesData";


export default async function CoursesPageServer({}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const queryClient = getQueryClient();
    const queryParams: Partial<QueryParams> = {};
    const searchParams = new URLSearchParams();

    Object.entries(queryParams).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach(v => searchParams.append(key, v));
        } else if (value !== undefined && value !== null) {
            searchParams.append(key, value);
        }
    });

    await prefetchCoursesData(queryClient, queryParams);

    const dehydratedState = dehydrate(queryClient);

    // return <CoursesPageClient dehydratedState={dehydrate(queryClient)} initialPage={page}/>;
    return <CoursesPageClient dehydratedState={dehydratedState}/>;
}
