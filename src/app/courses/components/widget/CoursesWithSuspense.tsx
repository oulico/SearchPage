'use client';
import {CourseCard} from "app/courses/components/ui/CourseCard";
import {useCourse} from "app/courses/hooks/useCourse";
import styled from "@emotion/styled";
// import {useRouter} from "next/navigation";
// import AsyncBoundary from "components/AsyncBoundary";
import {Pagination} from "app/courses/components/widget/Pagination";
import {useNumber} from "react-use";

const CardWrapper = styled.div({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1rem',
    paddingTop: '3rem',
})


export const CoursesWithSuspense = () => {
    // const router = useRouter();
    return (
        // <AsyncBoundary pending={<LoadingFallback/>}
        //                rejected={() => <ErrorFallback reset={() => router.refresh()}/>}>
        <Resolved/>
        // </AsyncBoundary>
    );
};


const Resolved: React.FC = () => {

    const [offset, {set}] = useNumber(0);
    const {data, isLoading, error} = useCourse(offset);
    if (!data || !data.courses) return null;

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            {data.courseCount && <h2>{data.courseCount} courses</h2>}
            <CardWrapper>
                {data.courses.map((course, index) => (
                    <CourseCard key={course.title + index} course={course}/>
                ))}
            </CardWrapper>
            <Pagination offset={offset} set={set}/>
        </>
    );
};

// const LoadingFallback: React.FC = () => {
//     return <div>Loading courses...</div>;
// };
//
// const ErrorFallback: React.FC<{ reset: () => void }> = ({reset}) => {
//     return (
//         <div>
//             <p>Error loading courses. Please try again later.</p>
//             <button onClick={reset}>Try again</button>
//         </div>
//     );
// };
