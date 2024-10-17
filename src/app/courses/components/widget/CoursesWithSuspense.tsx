'use client';
import {CourseCard} from "app/courses/components/ui/CourseCard";
import {useCourse} from "app/courses/hooks/useCourse";
import styled from "@emotion/styled";
import {useQueryState, parseAsInteger, parseAsString, parseAsJson,} from "nuqs";
import {useRouter} from "next/navigation";
import AsyncBoundary from "components/AsyncBoundary";
import {parsers, queryParamsSchema} from "constants/queryParams";

const CardWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
    padding-top: 3rem;
`;
//TODO 객체 스타일로 변경하기


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
    // const [query] = useQueryState('zod', parseAsJson(queryParamsSchema.parse));
    // console.log('query look like this', query)
    // const filterConditions = query;

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
