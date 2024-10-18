'use client'
import {useSuspenseQuery, useQueryClient} from '@tanstack/react-query';
import {BffCourseList} from "app/api/courses/route";
import {QueryParams} from "constants/queryParams";
import {useSearchParams} from "next/navigation";
import {getCourses} from "./utils/getCourses";
import {useEffect} from "react";

export const useCourse = (offset = 0, count = 12) => {
    const searchParamsSSSSS = useSearchParams();
    const queryClient = useQueryClient();

    const queryParams: Partial<QueryParams> = {};

    searchParamsSSSSS.forEach((value, key) => {
        if (key in queryParams) {
            if (Array.isArray(queryParams[key as keyof QueryParams])) {
                (queryParams[key as keyof QueryParams] as string[]).push(value);
            } else {
                // @ts-expect-error TODO 타입 수정
                queryParams[key as keyof QueryParams] = [queryParams[key as keyof QueryParams] as string, value];
            }
        } else {
            // @ts-expect-error TODO 타입 수정
            queryParams[key as keyof QueryParams] = value;
        }
    });

    // 정렬된 쿼리 문자열 생성
    const sortedSearchParams = new URLSearchParams();
    Object.entries(queryParams)
        .sort(([a], [b]) => a.localeCompare(b))
        .forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach(v => sortedSearchParams.append(key, v));
            } else if (value !== undefined && value !== null) {
                sortedSearchParams.append(key, value as string);
            }
        });

    const sortedQueryString = sortedSearchParams.toString();

    // 프리페칭 함수
    const prefetchPages = async (prefetchOffsets: number[]) => {
        const prefetchPromises = prefetchOffsets.map(prefetchOffset =>
            queryClient.prefetchQuery({
                queryKey: ['courses', sortedQueryString, prefetchOffset, count],
                queryFn: () => getCourses({queryParams, offset: prefetchOffset, count}),
            })
        );
        await Promise.all(prefetchPromises);
    };

    // 현재 페이지 데이터 쿼리
    const query = useSuspenseQuery<BffCourseList, Error>({
        queryKey: ['courses', sortedQueryString, offset, count],
        queryFn: () => getCourses({queryParams, offset, count}),
    });

    // 프리페칭 실행
    useEffect(() => {
        const prefetchOffsets = [];
        if (offset === 0) {
            // 오프셋이 0일 때 오른쪽으로 4페이지 프리페치
            prefetchOffsets.push(...[1, 2, 3, 4].map(n => n * count));
        } else {
            // 왼쪽 2페이지, 오른쪽 2페이지 프리페치
            prefetchOffsets.push(...[-2, -1, 1, 2].map(n => offset + n * count).filter(o => o >= 0));
        }
        prefetchPages(prefetchOffsets);
    }, [offset, count, sortedQueryString]);

    return query;
};
