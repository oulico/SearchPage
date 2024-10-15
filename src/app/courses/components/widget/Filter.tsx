'use client'

import React from "react";
import {useRouter} from 'next/navigation';
import {FILTER_OPTIONS, parsers} from 'constants/queryParams';
import {ToggleButton} from "app/courses/components/ui/ToggleButton";
import AsyncBoundary from "components/AsyncBoundary";
import styled from "@emotion/styled";
import {colors} from 'constants/styleScheme'
import {useQueryState} from "nuqs";

type FilterKey = keyof typeof FILTER_OPTIONS;
type FilterOption = {
    value: string;
    label: string;
};
type FilterOptionGroup = Record<string, FilterOption>;

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

const LoadingFallback: React.FC = () => <div>Loading filter...</div>;

const ErrorFallback: React.FC<{ reset: () => void }> = ({reset}) => (
    <div>
        <p>Error loading filters. Please try again later.</p>
        <button onClick={reset}>Try again</button>
    </div>
);


const Resolved: React.FC = () => {
    const [courseType, setCourseType] = useQueryState('course_type', parsers.courseType.array);
    const [format, setFormat] = useQueryState('format', parsers.format.array);
    const [programmingLanguage, setProgrammingLanguage] = useQueryState('programming_language', parsers.programmingLanguage.array);
    const [category, setCategory] = useQueryState('category', parsers.category.array);
    const [level, setLevel] = useQueryState('level', parsers.level.array);
    const [price, setPrice] = useQueryState('price', parsers.price.array);

    const filterStates: Record<FilterKey, [string[] | null, (value: string[] | null) => void]> = {
        COURSE_TYPE: [courseType, setCourseType],
        FORMAT: [format, setFormat],
        PROGRAMMING_LANGUAGE: [programmingLanguage, setProgrammingLanguage],
        CATEGORY: [category, setCategory],
        LEVEL: [level, setLevel],
        PRICE: [price, setPrice],
    };

    const updateSearchParams = (key: FilterKey, value: string) => {
        const [currentValues, setValues] = filterStates[key];
        const newValues = currentValues?.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...(currentValues || []), value];
        setValues(newValues);
    };

    const renderToggleButtons = (key: FilterKey) => (
        Object.entries(FILTER_OPTIONS[key] as FilterOptionGroup).map(([, option]) => (
            <ToggleButton
                key={option.value}
                label={option.label}
                isSelected={filterStates[key][0]?.includes(option.value) || false}
                onToggle={() => updateSearchParams(key, option.value)}
            />
        ))
    );

    return (
        <FilterWrapper>
            <FilterTable role="grid" aria-labelledby="filter-table-title">
                <tbody>
                {(Object.keys(FILTER_OPTIONS) as FilterKey[]).map(key => {
                    const options = FILTER_OPTIONS[key] as FilterOptionGroup;
                    const firstOption = Object.values(options)[0];
                    return (
                        <tr key={key}>
                            <th className="fixed-width">{firstOption.label}</th>
                            <TD>{renderToggleButtons(key)}</TD>
                        </tr>
                    );
                })}
                </tbody>
            </FilterTable>
        </FilterWrapper>
    );
};

export const FilterWithSuspense: React.FC = () => {
    const router = useRouter();

    return (
        <AsyncBoundary
            pending={<LoadingFallback/>}
            rejected={() => <ErrorFallback reset={() => router.refresh()}/>}
        >
            <Resolved/>
        </AsyncBoundary>
    );
};
