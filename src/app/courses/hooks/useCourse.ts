'use client'
import {useQuery, QueryClient} from '@tanstack/react-query';
import {BffCourseList} from "app/api/courses/route";
import {QueryParams} from "constants/queryParams";
import {useSearchParams} from "next/navigation";


export const getCourses = async ({queryParams, offset, count}: {
    queryParams: QueryParams,
    offset: number,
    count: number
}): Promise<BffCourseList> => {

    //객체를 쿼리스트링으로 변환. 근데 중복된 키를 사용하도록 하기.
    const searchParams = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach(v => searchParams.append(key, v));
        } else if (value !== undefined) {
            searchParams.append(key, value);
        }
    });

    const url = `/api/courses?${searchParams.toString()}&offset=${offset}&count=${count}`

    const response = await fetch(url, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch courses');
    }

    return await response.json();
};

export const useCourse = (offset = 0, count = 12) => {
    console.log(offset)
    const searchParams = useSearchParams();

    const queryParams: QueryParams = {};
    searchParams.forEach((value, key) => {
        if (key in queryParams) {
            // @ts-expect-error TODO 인덱스 키로 문자열을 사용할 수 없기 때문에, 좀 더 유연하게 타입을 만들어줘야한다.
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
            } else if (value !== undefined) {
                sortedSearchParams.append(key, value);
            }
        });

    const sortedQueryString = sortedSearchParams.toString();

    return useQuery<BffCourseList, Error>({
        queryKey: ['courses', sortedQueryString, offset, count],
        queryFn: () => getCourses({queryParams, offset, count}),
    });
};

export const prefetchCoursesData = async (
    queryClient: QueryClient,
    queryParams: QueryParams
) => {

    const sortedQueryParams = Object.fromEntries(Object.entries(queryParams).sort());
    const stringifiedQueryParams = JSON.stringify(sortedQueryParams);

    await queryClient.prefetchQuery({
        queryKey: ['courses', stringifiedQueryParams],
        queryFn: () => getCourses({queryParams, offset: 0, count: 20}),
    });
};
