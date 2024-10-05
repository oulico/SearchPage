import React from 'react';
import {AsyncBoundary} from "@toss/async-boundary";
import {CourseCard} from "app/courses/components/ui/CourseCard";
import {useCourse} from "app/courses/hooks/useCourse";
import styled from "@emotion/styled";
import {BffCourseList} from "app/api/courses/route";  // BffCourseList 인터페이스 import

// styled emotion
const CardWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
`;

export const Courses: React.FC = () => {
    return (
        <AsyncBoundary
            pendingFallback={<LoadingFallback/>}
            rejectedFallback={({error, reset}) => (
                <ErrorFallback error={error} reset={reset}/>
            )}
        >
            <CoursesContent/>
        </AsyncBoundary>
    );
};

const CoursesContent: React.FC = () => {
    const {courses} = useCourse();


    if (!courses) {
        return null;
    }
    if (!courses.courses) {
        return null;
    }

    return (
        <CardWrapper>
            {courses.courses.map((course) => (
                <CourseCard key={course.title} course={course}/>
            ))}
        </CardWrapper>
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
