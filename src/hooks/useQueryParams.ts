'use client'

import {useState, useEffect, useCallback} from 'react'
import {usePathname, useSearchParams} from "next/navigation";
import {QueryParams, FILTER_OPTIONS} from 'constants/queryParams';

// 쿼리 파라미터의 키를 정의하는 상수 배열
const QUERY_KEYS: Array<keyof QueryParams> = Object.keys(FILTER_OPTIONS).map(key => key.toLowerCase()) as Array<keyof QueryParams>;

export function useQueryParams() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [localQueries, setLocalQueries] = useState<Record<keyof QueryParams, string[]>>({} as Record<keyof QueryParams, string[]>);

    // Initialize local state from URL on first render
    useEffect(() => {
        const initialQueries = {} as Record<keyof QueryParams, string[]>;
        console.log('initial queries', initialQueries)
        QUERY_KEYS.forEach(key => {
            initialQueries[key] = searchParams.getAll(key);
        });
        console.log('+++++initial queries', initialQueries)
        setLocalQueries(initialQueries);
    }, []);

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

        const params = new URLSearchParams(searchParams.toString());
        params.delete(key);
        if (value !== null) {
            if (Array.isArray(value)) {
                value.forEach(v => params.append(key, v));
            } else {
                params.append(key, value);
            }
        }
        history.replaceState(null, '', `${pathname}?${params.toString()}`);
    }, [pathname, searchParams]);

    const addToQuery = useCallback((key: keyof QueryParams, value: string) => {
        setLocalQueries(prev => ({
            ...prev,
            [key]: [...(prev[key] || []), value]
        }));

        const params = new URLSearchParams(searchParams.toString());
        params.append(key, value);
        history.replaceState(null, '', `${pathname}?${params.toString()}`);
    }, [pathname, searchParams]);

    const removeFromQuery = useCallback((key: keyof QueryParams, value: string) => {
        setLocalQueries(prev => ({
            ...prev,
            [key]: (prev[key] || []).filter(v => v !== value)
        }));

        const params = new URLSearchParams(searchParams.toString());
        const values = params.getAll(key).filter(v => v !== value);
        params.delete(key);
        values.forEach(v => params.append(key, v));
        history.replaceState(null, '', `${pathname}?${params.toString()}`);
    }, [pathname, searchParams]);

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
