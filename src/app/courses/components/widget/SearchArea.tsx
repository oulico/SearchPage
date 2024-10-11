'use client'

import React from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {OutlineWrapper} from "@/app/courses/components/ui/Outliner";
import {SearchIcon} from "@/app/courses/components/icons/SearchIcon";
import {Input, InputGroup, InputLeftElement} from "@chakra-ui/react";

export const SearchArea = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const keyword = e.target.value.trim();
        const params = new URLSearchParams(searchParams.toString());

        if (keyword) {
            params.set('title', keyword);
        } else {
            params.delete('title');
        }

        router.push(`/courses?${params.toString()}`);
    };

    return (
        <OutlineWrapper>
            <div>
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <SearchIcon color="black" size={24}/>
                    </InputLeftElement>
                    <Input
                        type='text'
                        placeholder='배우고 싶은 언어, 기술을 검색해 보세요'
                        defaultValue={searchParams.get('title') || ''}
                        onChange={handleSearch}
                    />
                </InputGroup>
            </div>
        </OutlineWrapper>
    );
};
