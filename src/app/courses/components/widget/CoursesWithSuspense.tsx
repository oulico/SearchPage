'use client';
import {CourseCard} from "app/courses/components/ui/CourseCard";
import {useCourse} from "app/courses/hooks/useCourse";
import styled from "@emotion/styled";
import {useRouter} from "next/navigation";
import AsyncBoundary from "components/AsyncBoundary";
import {Pagination} from "app/courses/components/widget/Pagination";

const CardWrapper = styled.div({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1rem',
    paddingTop: '3rem',
})


export const CoursesWithSuspense = () => {
    const router = useRouter();

    // AsyncBoundary로 감싸서 로딩, 에러, 성공 상태를 처리
    return (
        <AsyncBoundary pending={<LoadingFallback/>} rejected={() => <ErrorFallback reset={() => router.refresh()}/>}>
            <Resolved/>
        </AsyncBoundary>
    );
};


const Resolved: React.FC = () => {

    const {data} = useCourse();
    if (!data || !data.courses) return null;

    return (
        <>
            {data.courseCount && <h2>{data.courseCount} courses</h2>}
            <CardWrapper>
                {data.courses.map((course) => (
                    <CourseCard key={course.title} course={course}/>
                ))}
            </CardWrapper>
            <Pagination/>
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
