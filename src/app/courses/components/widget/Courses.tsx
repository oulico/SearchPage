import {CourseCard} from "app/courses/components/ui/CourseCard";
import {useCourse} from "app/courses/hooks/useCourse";


export const Courses = () => {
    const {courses} = useCourse()

    //api 테스트 해보기.
    // 반환값으로 mock만들기.
    return (
        <div>
            {courses.map((course) => (
                <CourseCard key={course.id} course={course}/>
            ))}
        </div>
    );
};
