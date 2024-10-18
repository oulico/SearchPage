import {dehydrate, HydrationBoundary, QueryClient} from '@tanstack/react-query';
// import {CoursesPageClient} from "app/courses/components/pages/CoursesPageClient";
import {prefetchCoursesData} from "app/courses/hooks/utils/prefetchCoursesData";
import {SearchAreaWithSuspense} from "app/courses/components/widget/SearchArea";
import {FilterWithSuspense} from "app/courses/components/widget/Filter";
import {CoursesWithSuspense} from "app/courses/components/widget/CoursesWithSuspense";

export const dynamic = 'force-dynamic'; // 이 라인을 추가하여 항상 동적으로 렌더링되도록 설정

export default async function CoursesPageServer({searchParams}: {
    searchParams: URLSearchParams
}) {
    const queryClient = new QueryClient();
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

    // return (
    //     <HydrationBoundary state={dehydratedState}>
    //         <CoursesPageClient/>
    //     </HydrationBoundary>
    // )
    return (
        <>
            <SearchAreaWithSuspense/>
            <FilterWithSuspense/>
            <HydrationBoundary state={dehydratedState}>
                <CoursesWithSuspense/>
            </HydrationBoundary>
        </>
    )
}
