'use client'

import {OutlineWrapper} from "@/app/courses/components/ui/Outliner";
import {SearchIcon} from "@/app/courses/components/icons/SearchIcon";
import {Input, InputGroup, InputLeftElement} from "@chakra-ui/react";
import React from "react";


export const SearchArea = () => {

    return (
        <OutlineWrapper>
            <div>
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <SearchIcon color="black" size={24}/>
                    </InputLeftElement>
                    <Input type='search' placeholder='배우고 싶은 언어, 기술을 검색해 보세요'/>
                </InputGroup>
            </div>
        </OutlineWrapper>
    );
};

