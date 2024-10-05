import {useMemo} from "react";
import {useSearchParams} from "next/navigation";
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


export const Filter = () => {
    const searchParams = useSearchParams();

    const getSelectedParams = (key: string, labels: Record<string, number>) => {
        const selectedValues = searchParams.getAll(key).map(Number);
        return Object.entries(labels).reduce((acc, [label, value]) => {
            acc[label] = selectedValues.includes(value) ? value : 0; // 선택된 값이 없으면 0으로 설정
            return acc;
        }, {} as Record<string, number>);
    };

    const selectedParams = useMemo(() => ({
        category: getSelectedParams('category', CATEGORY_LABELS),
        courseType: getSelectedParams('courseType', COURSE_TYPE_LABELS),
        programmingLanguage: getSelectedParams('programmingLanguage', PROGRAMMING_LANGUAGE_LABELS),
        field: getSelectedParams('field', FIELD_LABELS),
        level: getSelectedParams('level', LEVEL_LABELS),
        price: getSelectedParams('price', PRICE_LABELS),
    }), [searchParams]);

    const updateSearchParams = (key: string, value: number) => {
        const currentValues = searchParams.getAll(key).map(Number);
        const newValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value) // 토글 오프
            : [...currentValues, value]; // 토글 온

        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.delete(key); // 기존 파라미터 제거
        newValues.forEach(v => newSearchParams.append(key, v.toString())); // 새로운 값 추가

        window.history.replaceState({}, '', `?${newSearchParams.toString()}`);
    };

    const renderToggleButtons = (labels: Record<string, number>, key: keyof typeof selectedParams) => (
        Object.entries(labels).map(([label, value]) => (
            <ToggleButton
                key={value}
                label={label}
                isSelected={selectedParams[key][label] > 0}
                onToggle={() => updateSearchParams(key, value)}
            />
        ))
    );

    return (
        <OutlineWrapper>
            <StyledTable>
                <tbody>
                <tr>
                    <th className="fixed-width">유형</th>
                    {renderToggleButtons(CATEGORY_LABELS, 'category')}
                </tr>
                <tr>
                    <th className="fixed-width">진행방식</th>
                    {renderToggleButtons(COURSE_TYPE_LABELS, 'courseType')}
                </tr>
                <tr>
                    <th className="fixed-width">언어</th>
                    {renderToggleButtons(PROGRAMMING_LANGUAGE_LABELS, 'programmingLanguage')}
                </tr>
                <tr>
                    <th className="fixed-width">분야</th>
                    {renderToggleButtons(FIELD_LABELS, 'field')}
                </tr>
                <tr>
                    <th className="fixed-width">난이도</th>
                    {renderToggleButtons(LEVEL_LABELS, 'level')}
                </tr>
                <tr>
                    <th className="fixed-width">가격</th>
                    {renderToggleButtons(PRICE_LABELS, 'price')}
                </tr>
                </tbody>
            </StyledTable>
        </OutlineWrapper>
    );
};
