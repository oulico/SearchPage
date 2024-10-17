'use client';

import React from 'react';
import {DehydratedState} from '@tanstack/react-query';
import {SearchAreaWithSuspense} from "@/app/courses/components/widget/SearchArea";
import {FilterWithSuspense} from "@/app/courses/components/widget/Filter";
import {CoursesWithSuspense} from "app/courses/components/widget/CoursesWithSuspense";

interface CoursePageClientProps {
    dehydratedState: DehydratedState;
}

export function CoursesPageClient({dehydratedState}: CoursePageClientProps) {
    return (
        // <HydrationBoundary state={dehydratedState}>
        <>
            <SearchAreaWithSuspense/>
            <FilterWithSuspense/>
            <CoursesWithSuspense dehydrateState={dehydratedState}/>
        </>
        // </HydrationBoundary>
    );
}
