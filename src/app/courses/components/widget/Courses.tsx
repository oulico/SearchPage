'use client';

import {CourseCard} from "app/courses/components/ui/CourseCard";
import {useCourse} from "app/courses/hooks/useCourse";
import styled from "@emotion/styled";
import {useQueryParam, ArrayParam, withDefault, StringParam, useQueryParams, NumberParam} from "use-query-params";

const CardWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
`;


const MyFiltersParam = withDefault(ArrayParam, [])

export const Courses = () => {

    //export type QueryParams = {
    //     category?: Category | Category[]  // 단일 문자열 또는 문자열 배열
    //     courseType?: CourseType | CourseType[]
    //     field?: Field | Field[]
    //     level?: Level | Level[]
    //     programmingLanguage?: ProgrammingLanguage | ProgrammingLanguage[]
    //     price?: Price | Price[]
    //     tab?: Tab
    //     page?: string
    //     pageSize?: string
    // };

    // todo: 여기서 상태가 변화하면, 그대로 TanstackQuery의 쿼리를 실행하도록 하기.
    const [query, setQuery] = useQueryParams({
        category: MyFiltersParam,
        courseType: MyFiltersParam,
        field: MyFiltersParam,
        level: MyFiltersParam,
        programmingLanguage: MyFiltersParam,
        price: MyFiltersParam,
        tab: StringParam,
        page: NumberParam,
        pageSize: NumberParam
    });


    const {data, isLoading, isError} = useCourse(query)

    // const {
    //     category,
    //     courseType,
    //     field,
    //     level,
    //     programmingLanguage,
    //     price,
    //     tab,
    //     page,
    //     pageSize
    // } = query;
    console.log('query from Courses.tsx', query)
    console.log('data from Courses.tsx', data)

    // const {data, isLoading, isError, error} = useCourse(query)
    // 렌더링이 2번 됨. 서버사이드에서 렌더링 되는듯

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
            {/*<Pagination*/}
            {/*    currentPage={queryParams.page || 1}*/}
            {/*    totalPages={data.courseCount || 1}*/}
            {/*    // onPageChange={handlePageChange}*/}
            {/*/>*/}
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
