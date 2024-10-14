'use client'

import React from "react";
import {useRouter, useSearchParams} from 'next/navigation';
import {
    CATEGORIES,
    COURSE_TYPES,
    FORMATS,
    LEVELS,
    PRICES,
    PROGRAMMING_LANGUAGES
} from "constants/queryParams";

import {ToggleButton} from "app/courses/components/ui/ToggleButton";
import AsyncBoundary from "components/AsyncBoundary"; // AsyncBoundary 추가
import styled from "@emotion/styled";
import {colors} from 'constants/styleScheme'

type FilterKey = 'courseType' | 'format' | 'programmingLanguage' | 'category' | 'level' | 'price';

const FilterWrapper = styled.div({
    paddingTop: '12px',
});
const FilterTable = styled.table({
    width: '100%',
    borderCollapse: 'collapse',
    paddingTop: '12px',
    paddingBottom: '12px',
    th: {
        backgroundColor: colors.gray[100],
        width: '100px',
    },
    'th, td': {
        border: '1px solid',
        borderCollapse: 'collapse',
        borderColor: colors.gray[200],
        padding: '8px',
        textAlign: 'left',
    },
});
const TD = styled.td({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px',
});

// 검색 결과를 로드할 때 보여줄 컴포넌트
const LoadingFallback: React.FC = () => {
    return <div>Loading filter...</div>;
};

// 에러 발생 시 보여줄 컴포넌트
const ErrorFallback: React.FC<{ reset: () => void }> = ({reset}) => {
    return (
        <div>
            <p>Error loading filters. Please try again later.</p>
            <button onClick={reset}>Try again</button>
        </div>
    );
};


const Resolved: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const getSelectedParams = (key: FilterKey, labels: typeof COURSE_TYPES | typeof FORMATS | typeof PROGRAMMING_LANGUAGES | typeof CATEGORIES | typeof LEVELS | typeof PRICES) => {
        const selectedValues = searchParams.getAll(key);
        return Object.entries(labels).reduce((acc, [enumKey, id]) => {
            acc[enumKey] = selectedValues.includes(id) ? id : '';
            return acc;
        }, {} as Record<string, string>);
    };

    const updateSearchParams = (key: FilterKey, value: string) => {
        const newSearchParams = new URLSearchParams(searchParams);
        const currentValues = newSearchParams.getAll(key);

        let newValues: string[];
        if (currentValues.includes(value)) {
            newValues = currentValues.filter(v => v !== value);
        } else {
            newValues = [...currentValues, value];
        }

        newSearchParams.delete(key);
        newValues.forEach(v => newSearchParams.append(key, v));

        router.push(`?${newSearchParams.toString()}`, {scroll: false});
    };

    const renderToggleButtons = (labels: typeof COURSE_TYPES | typeof FORMATS | typeof PROGRAMMING_LANGUAGES | typeof CATEGORIES | typeof LEVELS | typeof PRICES, key: FilterKey) => (
        Object.entries(labels).map(([enumKey, id]) => (
            <ToggleButton
                key={id}
                label={enumKey}
                isSelected={getSelectedParams(key, labels)[enumKey] !== ''}
                onToggle={() => updateSearchParams(key, id)}
            />
        ))
    );

    return (
        <FilterWrapper>
            <FilterTable role="grid" aria-labelledby="filter-table-title">
                {/*<caption id="filter-table-title" className="sr-only">강좌 필터 옵션</caption>*/}
                <tbody>
                <tr>
                    <th className="fixed-width">유형</th>
                    <TD>{renderToggleButtons(COURSE_TYPES, 'format')}</TD>
                </tr>
                <tr>
                    <th className="fixed-width">진행방식</th>
                    <TD>{renderToggleButtons(FORMATS, 'format')}</TD>
                </tr>
                <tr>
                    <th className="fixed-width">언어</th>
                    <TD>{renderToggleButtons(PROGRAMMING_LANGUAGES, 'programmingLanguage')}</TD>
                </tr>
                <tr>
                    <th className="fixed-width">분야</th>
                    <TD>{renderToggleButtons(CATEGORIES, 'category')}</TD>
                </tr>
                <tr>
                    <th className="fixed-width">난이도</th>
                    <TD>{renderToggleButtons(LEVELS, 'level')}</TD>
                </tr>
                <tr>
                    <th className="fixed-width">가격</th>
                    <TD>{renderToggleButtons(PRICES, 'price')}</TD>
                </tr>
                </tbody>
            </FilterTable>
        </FilterWrapper>
    );
};

// AsyncBoundary로 감싸서 에러와 로딩 처리
export const FilterWithSuspense: React.FC = () => {
    const router = useRouter();

    return (
        <AsyncBoundary pending={<LoadingFallback/>} rejected={() => <ErrorFallback reset={() => router.refresh()}/>}>
            <Resolved/>
        </AsyncBoundary>
    );
};
