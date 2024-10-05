'use client';

import React from 'react';
import {HydrationBoundary, DehydratedState} from '@tanstack/react-query';
import {SearchArea} from "@/app/courses/components/widget/SearchArea";
import {Filter} from "@/app/courses/components/widget/Filter";
import {Courses} from "@/app/courses/components/widget/Courses";

interface CoursePageClientProps {
    dehydratedState: DehydratedState;
    initialPage: number;
}

export function CoursePageClient({dehydratedState, initialPage}: CoursePageClientProps) {
    return (
        <HydrationBoundary state={dehydratedState}>
            <SearchArea/>
            <Filter/>
            <Courses initialPage={initialPage}/>
        </HydrationBoundary>
    );
}

