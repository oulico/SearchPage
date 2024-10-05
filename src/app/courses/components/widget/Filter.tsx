'use client'
import {OutlineWrapper} from "@/app/courses/components/ui/Outliner";
import {useSearch} from "@/app/courses/hooks/useSearch";

export const Filter = () => {
    const {courses, ...rest} = useSearch();

    return (
        <OutlineWrapper>
            <div>

            </div>
        </OutlineWrapper>
    );
};
