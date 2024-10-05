'use client'

import {OutlineWrapper} from "@/app/courses/components/ui/Outliner";
import {useCourse} from "app/courses/hooks/useCourse";

const COUNT = 20;

export const Pagination = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const offset = (currentPage - 1) * COUNT;
    const {courses, totalCourses} = useCourse({offset, count: COUNT});

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };
    return (
        <OutlineWrapper>
            <div>

            </div>
        </OutlineWrapper>
    );
};
