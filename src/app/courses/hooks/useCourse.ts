'use client'
import { useSuspenseQuery} from '@tanstack/react-query';
import {BffCourseList} from "app/api/courses/route";
import {QueryParams} from "constants/queryParams";
import {useSearchParams} from "next/navigation";
import {getCourses} from "./utils/getCourses";


export const useCourse = (offset = 0, count = 12) => {
    console.log(offset)
    const searchParams = useSearchParams();

    const queryParams: Partial<QueryParams> = {};

    searchParams.forEach((value, key) => {
        if (key in queryParams) {
            // @ts-expect-error 인덱스 키로 문자열을 사용할 수 없기 때문에, 좀 더 유연하게 타입을 만들어줘야한다.
            if (Array.isArray(queryParams[key])) {
                // @ts-expect-error 인덱스 키로 문자열을 사용할 수 없기 때문에, 좀 더 유연하게 타입을 만들어줘야한다.
                (queryParams[key] as string[]).push(value);
            } else {
                // @ts-expect-error 인덱스 키로 문자열을 사용할 수 없기 때문에, 좀 더 유연하게 타입을 만들어줘야한다.
                queryParams[key] = [queryParams[key] as string, value];
            }
        } else {
            // @ts-expect-error 인덱스 키로 문자열을 사용할 수 없기 때문에, 좀 더 유연하게 타입을 만들어줘야한다.
            queryParams[key] = value;
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
                sortedSearchParams.append(key, value);
            }
        });

    const sortedQueryString = sortedSearchParams.toString();

    return useSuspenseQuery<BffCourseList, Error>({
        queryKey: ['courses', sortedQueryString, offset, count],
        queryFn: () => getCourses({queryParams, offset, count}),
    });
};

