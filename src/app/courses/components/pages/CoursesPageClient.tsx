import {HydrationBoundary} from '@tanstack/react-query';
import {SearchAreaWithSuspense} from "@/app/courses/components/widget/SearchArea";
import {FilterWithSuspense} from "@/app/courses/components/widget/Filter";
import {CoursesWithSuspense} from "app/courses/components/widget/CoursesWithSuspense";

export function CoursesPageClient() {

    return (
        <>
            <HydrationBoundary>
                <SearchAreaWithSuspense/>
                <FilterWithSuspense/>
                <CoursesWithSuspense/>
            </HydrationBoundary>
        </>
    );
}
