import {dehydrate} from '@tanstack/react-query';
import {getQueryClient} from "utils/get-query-client";
import {CoursesPageClient} from "app/courses/components/pages/CoursesPageClient";
import {prefetchCoursesData} from "app/courses/hooks/utils/prefetchCoursesData";


export default async function CoursesPageServer({searchParams}: {
    searchParams: URLSearchParams
}) {
    const queryClient = getQueryClient();
    // const searchParams = new URLSearchParams();

    try {
        console.log('Starting prefetching');
        console.log('search params:', searchParams);
        console.log('typeof search params:', typeof searchParams);
        await prefetchCoursesData(queryClient, searchParams);
        console.log('Prefetching done');
    } catch (e) {
        console.error('Prefetching failed', e);
    }

    const dehydratedState = dehydrate(queryClient);

    // return <CoursesPageClient dehydratedState={dehydrate(queryClient)} initialPage={page}/>;
    return <CoursesPageClient dehydratedState={dehydratedState}/>;
}
