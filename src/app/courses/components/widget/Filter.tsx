'use client'

import React from "react";
import {useRouter} from 'next/navigation';
import {
    FILTER_OPTIONS,
    QueryParams,
    getFilterOptions,
} from 'constants/queryParams';
import {ToggleButton} from "app/courses/components/ui/ToggleButton";
import AsyncBoundary from "components/AsyncBoundary";
import styled from "@emotion/styled";
import {colors} from 'constants/styleScheme'
import {useQueryParams} from 'hooks/useQueryParams';

type FilterKey = keyof typeof FILTER_OPTIONS;


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
        padding: '8px',
        textAlign: 'left',

    },
    'th:first-of-type': {
        width: '100px',
        borderRight: '1px solid',
        borderColor: colors.gray[200],
    },
    'tr': {
        border: '1px solid',
        borderColor: colors.gray[200],
    }
});

const TD = styled.td({
    display: 'flex',
    border: 'none',
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
    const {queries, addToQuery, removeFromQuery} = useQueryParams();

    const handleToggle = (key: keyof QueryParams, optionId: string) => {
        const currentValues = queries[key];
        if (currentValues.includes(optionId)) {
            removeFromQuery(key, optionId);
        } else {
            addToQuery(key, optionId);
        }
    };

    const renderToggleButtons = (key: keyof typeof FILTER_OPTIONS) => {
        // const options = FILTER_OPTIONS[key];
        const selectedValues = queries[key.toLowerCase() as keyof QueryParams];
        // return Object.entries(options).map(([, option]) => (
        //     <ToggleButton
        //         key={option.value}
        //         label={option.label}
        //         isSelected={selectedValues.includes(option.value)}
        //         onToggle={() => handleToggle(key.toLowerCase() as keyof QueryParams, option.value)}
        //     />
        // ));
        return getFilterOptions(key).map(option => (
            <ToggleButton
                key={option.value}
                label={option.label}
                isSelected={selectedValues.includes(option.value)}
                onToggle={() => handleToggle(key.toLowerCase() as keyof QueryParams, option.value)}
            />
        ));
    };


    return (
        <FilterWrapper>
            <FilterTable role="grid" aria-labelledby="filter-table-title">
                <tbody>
                {(Object.keys(FILTER_OPTIONS) as FilterKey[]).map(key => {
                    return (
                        <tr key={key}>
                            <th className="fixed-width">{key}</th>
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
