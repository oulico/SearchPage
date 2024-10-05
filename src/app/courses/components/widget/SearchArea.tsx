'use client'

import {OutlineWrapper} from "@/app/courses/components/ui/Outliner";
import {SearchIcon} from "@/app/courses/components/icons/SearchIcon";
import {Input} from "@chakra-ui/react";


export const SearchArea = () => {

    return (
        <OutlineWrapper>
            <div>
                <SearchIcon color="" size={24}/>
                {/*<Input placeholder='medium size' size='md'/>*/}
            </div>
        </OutlineWrapper>
    );
};

