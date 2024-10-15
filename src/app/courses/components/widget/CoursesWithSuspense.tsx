'use client';
import {CourseCard} from "app/courses/components/ui/CourseCard";
import {useCourse} from "app/courses/hooks/useCourse";
import styled from "@emotion/styled";
import {useQueryState, parseAsInteger, parseAsString, parseAsArrayOf, parseAsJson,} from "nuqs";
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
    //TODO parser 추가하기
    const [courseType] = useQueryState('course_type', parsers.courseType.array);
    const [format] = useQueryState('format', parsers.format.array);
    const [programmingLanguage] = useQueryState('programming_language', parsers.programmingLanguage.array);
    const [category] = useQueryState('category', parsers.category.array);
    const [level] = useQueryState('level', parsers.level.array);
    const [price] = useQueryState('price', parsers.price.array);
    const [tab] = useQueryState('tab', parseAsString);
    const [keyword] = useQueryState('keyword', parseAsString);
    const [offset] = useQueryState('offset', parseAsInteger);
    const [count] = useQueryState('count', parseAsInteger);

    const filterConditions = {
        category,
        courseType,
        level,
        programmingLanguage,
        price,
        tab,
        format,
        keyword,
    }


    const {data} = useCourse(filterConditions, offset as number, count as number);

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
