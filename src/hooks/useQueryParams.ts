'use client'

import {useCallback} from 'react'
import {useRouter, usePathname, useSearchParams} from "next/navigation";
import {QueryParams} from 'constants/queryParams';

export function useQueryParams() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams9999 = useSearchParams();

    const setQuery = useCallback((key: keyof QueryParams, value: string | string[] | null) => {
        const params = new URLSearchParams(searchParams9999);
        params.delete(key);
        if (value !== null) {
            if (Array.isArray(value)) {
                value.forEach(v => params.append(key, v));
            } else {
                params.append(key, value);
            }
        }
        router.push(`${pathname}?${params.toString()}`, {scroll: false});
    }, [router, pathname, searchParams9999]);

    const addToQuery = useCallback((key: keyof QueryParams, value: string) => {
        const params = new URLSearchParams(searchParams9999);
        params.append(key, value);
        router.push(`${pathname}?${params.toString()}`, {scroll: false});
    }, [router, pathname, searchParams9999]);

    const removeFromQuery = useCallback((key: keyof QueryParams, value: string) => {
        const params = new URLSearchParams(searchParams9999);
        const values = params.getAll(key).filter(v => v !== value);
        params.delete(key);
        values.forEach(v => params.append(key, v));
        router.push(`${pathname}?${params.toString()}`, {scroll: false});
    }, [router, pathname, searchParams9999]);

    const getQuery = useCallback((key: keyof QueryParams): string[] => {
        return searchParams9999.getAll(key);
    }, [searchParams9999]);

    const queries = new Proxy({} as Record<keyof QueryParams, string[]>, {
        get: (target, prop: string) => getQuery(prop as keyof QueryParams),
        set: (target, prop: string, newValue: string[]) => {
            setQuery(prop as keyof QueryParams, newValue);
            return true;
        }
    });

    return {queries, setQuery, addToQuery, removeFromQuery};
}
