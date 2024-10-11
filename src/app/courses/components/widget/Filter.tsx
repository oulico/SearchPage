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
import {OutlineWrapper} from "app/courses/components/ui/Outliner";
import {ToggleButton} from "app/courses/components/ui/ToggleButton";
import styled from "@emotion/styled";

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;

    th, td {
        border: 1px solid #ccc;
        padding: 8px;
        text-align: left;
    }

    th {
        background-color: #f0f0f0;
    }

    .fixed-width {
        width: 100px;
    }
`;

type FilterKey = 'courseType' | 'format' | 'programmingLanguage' | 'category' | 'level' | 'price';

export const Filter: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const getSelectedParams = (key: FilterKey, labels: typeof COURSE_TYPES | typeof FORMATS | typeof PROGRAMMING_LANGUAGES | typeof FIELDS | typeof LEVELS | typeof PRICES) => {
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
        <OutlineWrapper>
            <StyledTable role="grid" aria-labelledby="filter-table-title">
                <caption id="filter-table-title" className="sr-only">강좌 필터 옵션</caption>
                <tbody>
                <tr>
                    <th className="fixed-width">유형</th>
                    <td>{renderToggleButtons(COURSE_TYPES, 'format')}</td>
                </tr>
                <tr>
                    <th className="fixed-width">진행방식</th>
                    <td>{renderToggleButtons(FORMATS, 'format')}</td>
                </tr>
                <tr>
                    <th className="fixed-width">언어</th>
                    <td>{renderToggleButtons(PROGRAMMING_LANGUAGES, 'programmingLanguage')}</td>
                </tr>
                <tr>
                    <th className="fixed-width">분야</th>
                    <td>{renderToggleButtons(CATEGORIES, 'category')}</td>
                </tr>
                <tr>
                    <th className="fixed-width">난이도</th>
                    <td>{renderToggleButtons(LEVELS, 'level')}</td>
                </tr>
                <tr>
                    <th className="fixed-width">가격</th>
                    <td>{renderToggleButtons(PRICES, 'price')}</td>
                </tr>
                </tbody>
            </StyledTable>
        </OutlineWrapper>
    );
};
