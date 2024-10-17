'use client';
import {CourseCard} from "app/courses/components/ui/CourseCard";
import {useCourse} from "app/courses/hooks/useCourse";
import styled from "@emotion/styled";
import {useRouter} from "next/navigation";
import AsyncBoundary from "components/AsyncBoundary";
import {Pagination} from "app/courses/components/widget/Pagination";
import {useNumber} from "react-use";
import {DehydratedState, HydrationBoundary} from "@tanstack/react-query";

const CardWrapper = styled.div({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1rem',
    paddingTop: '3rem',
})


export const CoursesWithSuspense = ({dehydrateState}: { dehydrateState: DehydratedState }) => {
    const router = useRouter();
    return (
        <HydrationBoundary state={dehydrateState}>
            <AsyncBoundary pending={<LoadingFallback/>}
                           rejected={() => <ErrorFallback reset={() => router.refresh()}/>}>
                <Resolved/>
            </AsyncBoundary>
        </HydrationBoundary>
    );
};


const Resolved: React.FC = () => {

    const [offset, {set}] = useNumber(0);
    const {data} = useCourse(offset);
    if (!data || !data.courses) return null;

    return (
        <>
            {data.courseCount && <h2>{data.courseCount} courses</h2>}
            <CardWrapper>
                {data.courses.map((course) => (
                    <CourseCard key={course.title} course={course}/>
                ))}
            </CardWrapper>
            <Pagination offset={offset} set={set}/>
        </>
    );
};

const LoadingFallback: React.FC = () => {
    return <div>Loading courses...</div>;
};

const ErrorFallback: React.FC<{ reset: () => void }> = ({reset}) => {
    return (
        <div>
            <p>Error loading courses. Please try again later.</p>
            <button onClick={reset}>Try again</button>
        </div>
    );
};
