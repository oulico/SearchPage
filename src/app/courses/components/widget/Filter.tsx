'use client'

import React, {useMemo, useCallback} from "react";
import {useRouter, useSearchParams} from 'next/navigation';
import {
    CATEGORY_LABELS,
    COURSE_TYPE_LABELS,
    FIELD_LABELS,
    LEVEL_LABELS,
    PRICE_LABELS,
    PROGRAMMING_LANGUAGE_LABELS
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

// 타입 정의
type FilterKey = 'category' | 'courseType' | 'programmingLanguage' | 'field' | 'level' | 'price';

interface SelectedParams {
    category: Record<string, number>;
    courseType: Record<string, number>;
    programmingLanguage: Record<string, number>;
    field: Record<string, number>;
    level: Record<string, number>;
    price: Record<string, number>;
}

export const Filter: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const getSelectedParams = useCallback((key: FilterKey, labels: Record<string, number>) => {
        const selectedValues = searchParams.getAll(key).map(Number);
        return Object.entries(labels).reduce((acc, [label, value]) => {
            acc[label] = selectedValues.includes(value) ? value : 0; // 선택된 값이 없으면 0으로 설정
            return acc;
        }, {} as Record<string, number>);
    }, [searchParams]);

    const selectedParams = useMemo<SelectedParams>(() => ({
        category: getSelectedParams('category', CATEGORY_LABELS),
        courseType: getSelectedParams('courseType', COURSE_TYPE_LABELS),
        programmingLanguage: getSelectedParams('programmingLanguage', PROGRAMMING_LANGUAGE_LABELS),
        field: getSelectedParams('field', FIELD_LABELS),
        level: getSelectedParams('level', LEVEL_LABELS),
        price: getSelectedParams('price', PRICE_LABELS),
    }), [getSelectedParams]);

    const updateSearchParams = useCallback((key: FilterKey, value: number) => {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        const currentValues = newSearchParams.getAll(key).map(Number);

        let newValues: number[];
        if (currentValues.includes(value)) {
            // 토글 오프: 값 제거
            newValues = currentValues.filter(v => v !== value);
        } else {
            // 토글 온: 값 추가
            newValues = [...currentValues, value];
        }

        // 기존 파라미터 제거 후 새 값 설정
        newSearchParams.delete(key);
        newValues.forEach(v => newSearchParams.append(key, v.toString()));

        // Next.js 라우터를 사용하여 URL 업데이트
        router.push(`?${newSearchParams.toString()}`, {scroll: false});
    }, [searchParams, router]);

    const renderToggleButtons = useMemo(() => (
        (labels: Record<string, number>, key: keyof SelectedParams) => (
            Object.entries(labels).map(([label, value]) => (
                <ToggleButton
                    key={value}
                    label={label}
                    isSelected={selectedParams[key][label] > 0}
                    onToggle={() => updateSearchParams(key, value)}
                />
            ))
        )
    ), [selectedParams, updateSearchParams]);

    return (
        <OutlineWrapper>
            <StyledTable role="grid" aria-labelledby="filter-table-title">
                <caption id="filter-table-title" className="sr-only">강좌 필터 옵션</caption>
                <tbody>
                <tr>
                    <th className="fixed-width">유형</th>
                    <td>{renderToggleButtons(CATEGORY_LABELS, 'category')}</td>
                </tr>
                <tr>
                    <th className="fixed-width">진행방식</th>
                    <td>{renderToggleButtons(COURSE_TYPE_LABELS, 'courseType')}</td>
                </tr>
                <tr>
                    <th className="fixed-width">언어</th>
                    <td>{renderToggleButtons(PROGRAMMING_LANGUAGE_LABELS, 'programmingLanguage')}</td>
                </tr>
                <tr>
                    <th className="fixed-width">분야</th>
                    <td>{renderToggleButtons(FIELD_LABELS, 'field')}</td>
                </tr>
                <tr>
                    <th className="fixed-width">난이도</th>
                    <td>{renderToggleButtons(LEVEL_LABELS, 'level')}</td>
                </tr>
                <tr>
                    <th className="fixed-width">가격</th>
                    <td>{renderToggleButtons(PRICE_LABELS, 'price')}</td>
                </tr>
                </tbody>
            </StyledTable>
        </OutlineWrapper>
    );
};
