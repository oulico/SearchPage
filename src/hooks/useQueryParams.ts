'use client'

import {useCallback} from 'react'
import {useRouter, usePathname, useSearchParams} from "next/navigation";
import {QueryParams} from '../utils/filterOptions';

export function useQueryParams() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const setQuery = useCallback((key: keyof QueryParams, value: string | string[] | null) => {
        const params = new URLSearchParams(searchParams);
        params.delete(key);
        if (value !== null) {
            if (Array.isArray(value)) {
                value.forEach(v => params.append(key, v));
            } else {
                params.append(key, value);
            }
        }
        router.push(`${pathname}?${params.toString()}`);
    }, [router, pathname, searchParams]);

    const addToQuery = useCallback((key: keyof QueryParams, value: string) => {
        const params = new URLSearchParams(searchParams);
        params.append(key, value);
        router.push(`${pathname}?${params.toString()}`);
    }, [router, pathname, searchParams]);

    const removeFromQuery = useCallback((key: keyof QueryParams, value: string) => {
        const params = new URLSearchParams(searchParams);
        const values = params.getAll(key).filter(v => v !== value);
        params.delete(key);
        values.forEach(v => params.append(key, v));
        router.push(`${pathname}?${params.toString()}`);
    }, [router, pathname, searchParams]);

    const getQuery = useCallback((key: keyof QueryParams): string[] => {
        return searchParams.getAll(key);
    }, [searchParams]);

    const queries = new Proxy({} as Record<keyof QueryParams, string[]>, {
        get: (target, prop: string) => getQuery(prop as keyof QueryParams),
        set: (target, prop: string, newValue: string[]) => {
            setQuery(prop as keyof QueryParams, newValue);
            return true;
        }
    });

    return {queries, setQuery, addToQuery, removeFromQuery};
}
