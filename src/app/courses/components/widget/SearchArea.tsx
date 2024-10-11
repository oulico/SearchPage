'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { OutlineWrapper } from "@/app/courses/components/ui/Outliner";
import { SearchIcon } from "@/app/courses/components/icons/SearchIcon";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import AsyncBoundary from "components/AsyncBoundary"; // AsyncBoundary 추가

// 검색 결과를 로드할 때 보여줄 컴포넌트
const LoadingFallback: React.FC = () => {
    return <div>Loading search...</div>;
};

// 에러 발생 시 보여줄 컴포넌트
const ErrorFallback: React.FC<{ reset: () => void }> = ({ reset }) => {
    return (
        <div>
            <p>Error loading search results. Please try again later.</p>
            <button onClick={reset}>Try again</button>
        </div>
    );
};

// 검색 결과를 성공적으로 가져왔을 때의 컴포넌트
const Resolved: React.FC = () => {
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
                    <InputLeftElement pointerEvents="none">
                        <SearchIcon color="black" size={24} />
                    </InputLeftElement>
                    <Input
                        type="text"
                        placeholder="배우고 싶은 언어, 기술을 검색해 보세요"
                        defaultValue={searchParams.get('title') || ''}
                        onChange={handleSearch}
                    />
                </InputGroup>
            </div>
        </OutlineWrapper>
    );
};

// AsyncBoundary로 감싸서 에러와 로딩 처리
export const SearchAreaWithSuspense: React.FC = () => {
    const router = useRouter();

    return (
        <AsyncBoundary pending={<LoadingFallback />} rejected={() => <ErrorFallback reset={() => router.refresh()} />}>
            <Resolved />
        </AsyncBoundary>
    );
};
