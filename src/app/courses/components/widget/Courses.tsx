'use client';

import React, {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {CourseCard} from "app/courses/components/ui/CourseCard";
import {fetchCourses} from "app/courses/hooks/useCourse";
import styled from "@emotion/styled";
import {BffCourseList} from "app/api/courses/route";
import {useSearchParams, useRouter} from 'next/navigation';

const CardWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
`;

interface CoursesProps {
    initialPage: number;
}

export const Courses: React.FC<CoursesProps> = ({initialPage}) => {
    const [page, setPage] = useState(initialPage);
    const searchParams = useSearchParams();
    const router = useRouter();

    const queryParams = {
        title: searchParams.get('title') || undefined,
        status: searchParams.getAll('status'),
        is_datetime_enrollable: searchParams.get('is_datetime_enrollable') === 'true',
        sort_by: searchParams.get('sort_by') || undefined,
        page,
        pageSize: 20,
    };

    const {data, isLoading, isError, error} = useQuery<BffCourseList, Error>({
        queryKey: ['courses', queryParams],
        queryFn: () => fetchCourses(queryParams),
    });

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        current.set('page', newPage.toString());
        const search = current.toString();
        const query = search ? `?${search}` : "";
        router.push(`${window.location.pathname}${query}`);
    };

    if (isLoading) return <LoadingFallback/>;
    if (isError) return <ErrorFallback error={error} reset={() => router.refresh()}/>;
    if (!data || !data.courses) return null;

    return (
        <>
            <CardWrapper>
                {data.courses.map((course) => (
                    <CourseCard key={course.title} course={course}/>
                ))}
            </CardWrapper>
            <Pagination
                currentPage={page}
                totalPages={data.courseCount || 1}
                onPageChange={handlePageChange}
            />
        </>
    );
};

const LoadingFallback: React.FC = () => {
    return <div>Loading courses...</div>;
};

const ErrorFallback: React.FC<{ error: Error; reset: () => void }> = ({error, reset}) => {
    return (
        <div>
            <p>Error loading courses: {error.message}</p>
            <button onClick={reset}>Try again</button>
        </div>
    );
};

const Pagination: React.FC<{
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}> = ({currentPage, totalPages, onPageChange}) => {
    return (
        <div>
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    );
};
