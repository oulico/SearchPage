'use client'

import {useState, useEffect, useCallback} from 'react'
import {usePathname, useSearchParams} from "next/navigation";
import {QueryParams, FILTER_OPTIONS} from 'constants/queryParams';

const QUERY_KEYS: Array<keyof QueryParams> = Object.keys(FILTER_OPTIONS).map(key => key.toLowerCase()) as Array<keyof QueryParams>;

export function useQueryParams() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [localQueries, setLocalQueries] = useState<Record<keyof QueryParams, string[]>>({} as Record<keyof QueryParams, string[]>);

    useEffect(() => {
        const initialQueries = {} as Record<keyof QueryParams, string[]>;
        QUERY_KEYS.forEach(key => {
            initialQueries[key] = searchParams.getAll(key);
        });
        setLocalQueries(initialQueries);
    }, []);

    const updateURL = useCallback((newQueries: Record<keyof QueryParams, string[]>) => {
        const params = new URLSearchParams();
        Object.entries(newQueries).forEach(([key, values]) => {
            values.forEach(value => params.append(key, value));
        });
        history.replaceState(null, '', `${pathname}?${params.toString()}`);
    }, [pathname]);

    const setQuery = useCallback((key: keyof QueryParams, value: string | string[] | null) => {
        setLocalQueries(prev => {
            const newQueries = {...prev};
            if (value === null) {
                newQueries[key] = [];
            } else {
                newQueries[key] = Array.isArray(value) ? value : [value];
            }
            return newQueries;
        });

        // URL 업데이트를 다음 틱으로 지연
        setTimeout(() => updateURL({...localQueries, [key]: Array.isArray(value) ? value : value ? [value] : []}), 0);
    }, [updateURL, localQueries]);

    const addToQuery = useCallback((key: keyof QueryParams, value: string) => {
        setLocalQueries(prev => {
            const newQueries = {
                ...prev,
                [key]: [...(prev[key] || []), value]
            };
            // URL 업데이트를 다음 틱으로 지연
            setTimeout(() => updateURL(newQueries), 0);
            return newQueries;
        });
    }, [updateURL]);

    const removeFromQuery = useCallback((key: keyof QueryParams, value: string) => {
        setLocalQueries(prev => {
            const newQueries = {
                ...prev,
                [key]: (prev[key] || []).filter(v => v !== value)
            };
            // URL 업데이트를 다음 틱으로 지연
            setTimeout(() => updateURL(newQueries), 0);
            return newQueries;
        });
    }, [updateURL]);

    const getQuery = useCallback((key: keyof QueryParams): string[] => {
        return localQueries[key] || [];
    }, [localQueries]);

    const queries = new Proxy({} as Record<keyof QueryParams, string[]>, {
        get: (target, prop: string) => getQuery(prop as keyof QueryParams),
        set: (target, prop: string, newValue: string[]) => {
            setQuery(prop as keyof QueryParams, newValue);
            return true;
        }
    });

    return {queries, setQuery, addToQuery, removeFromQuery};
}
