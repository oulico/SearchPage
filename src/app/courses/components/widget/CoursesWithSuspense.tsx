'use client';
import {CourseCard} from "app/courses/components/ui/CourseCard";
import {useCourse} from "app/courses/hooks/useCourse";
import styled from "@emotion/styled";
import {ArrayParam, withDefault, StringParam, useQueryParams, NumberParam} from "use-query-params";
import {useRouter} from "next/navigation";
import AsyncBoundary from "components/AsyncBoundary"; // AsyncBoundary 컴포넌트 추가

const CardWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
    padding-top: 3rem;
`;

type AnyFilterConditions = {
    [key: string]: string | string[] | number | undefined;
};


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

    const MyFiltersParam = withDefault(ArrayParam, []);
    // 상태 변화에 따른 쿼리 실행을 위한 구문
    const [query] = useQueryParams({
        category: MyFiltersParam,
        courseType: MyFiltersParam,
        level: MyFiltersParam,
        programmingLanguage: MyFiltersParam,
        price: MyFiltersParam,
        tab: StringParam,
        offset: NumberParam,
        count: NumberParam,
    });

    const {offset, count, ...filterConditions} = query as AnyFilterConditions;

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
