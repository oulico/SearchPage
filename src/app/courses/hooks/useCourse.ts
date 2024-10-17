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

    //객체를 쿼리스트링으로 변환. 근데 중복된 키를 사용하도록 하기. 반복문으로 하면 됨.
    const searchParams = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach(v => searchParams.append(key, v));
        } else if (value !== undefined) {
            searchParams.append(key, value);
        }
    });


    // const searchParams = new URLSearchParams(queryParams as Record<string, string>);
    // searchParams.set('offset', offset.toString());
    // searchParams.set('count', count.toString());

    // 여기서 생성된 쿼리스트링이 동일한 키를 ㅈ중복 사용하도록 변경해야함.
    // 그냥 객체로 바꾸지 말것?

    const url = `/api/courses?${searchParams.toString()}&offset=${offset}&count=${count}`

    // 이제 여기서 중복된 키를 사용하는지 확인해야함. 확인완료.


    console.log('중복된 키를 사용하는지 확인하기 getCourses url:', url);

    console.log('decoded url:', decodeURIComponent(url));
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

// export const useCourse = (offset = 0, count = 12) => {
//
//     const searchParams = useSearchParams();
//
//     const query = new URLSearchParams(searchParams.toString());
//
//     const queryParams: Record<string, string | string[]> = {};
//
//     query.forEach((value, key) => {
//         if (key in queryParams) {
//             if (Array.isArray(queryParams[key])) {
//                 (queryParams[key] as string[]).push(value);
//             } else {
//                 queryParams[key] = [queryParams[key] as string, value];
//             }
//         } else {
//             queryParams[key] = value;
//         }
//     });
//
//     return useQuery<BffCourseList, Error>({
//         queryKey: ['courses', {queryParams, offset, count}],
//         queryFn: () => getCourses({queryParams, offset, count}),
//     });
//     // 객체로 요청한다.
// };

export const useCourse = (offset = 0, count = 12) => {
    const searchParams = useSearchParams();

    // 쿼리 파라미터를 객체로 변환
    const queryParams: QueryParams = {};
    searchParams.forEach((value, key) => {
        if (key in queryParams) {
            if (Array.isArray(queryParams[key])) {
                (queryParams[key] as string[]).push(value);
            } else {
                queryParams[key] = [queryParams[key] as string, value];
            }
        } else {
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
    console.log('decoded sortedQueryString:', decodeURIComponent(sortedQueryString));
    console.log('여기서 중복된 키를 사용하는지 아닌지 확인하기', queryParams);
    // queryParams는 객체임. 문자열 배열을 값으로 하는 프로퍼티들이 있음.

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
