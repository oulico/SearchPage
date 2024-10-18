import {QueryClient} from "@tanstack/react-query";
import {QueryParams} from "constants/queryParams";
import {getCourses} from "./getCourses";

export const prefetchCoursesData = async (
    queryClient: QueryClient,
    searchParams: URLSearchParams
) => {
    const queryParams: Partial<QueryParams> = {};
    // TODO : Do not repeat yourself
    // 객체를 순환하려면 Object.entries를 사용해야함
    Object.entries(searchParams).forEach(([key, value]) => {
        if (key in queryParams) {
            if (Array.isArray(queryParams[key as keyof QueryParams])) {
                (queryParams[key as keyof QueryParams] as string[]).push(value);
            } else {
                // @ts-expect-error TODO 타입 수정
                queryParams[key as keyof QueryParams] = [queryParams[key as keyof QueryParams] as string, value];
            }
        } else {
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

    const sortedQueryParams = sortedSearchParams.toString();

    const stringifiedQueryParams = JSON.stringify(sortedQueryParams);

    console.log('Starting prefetching in prefetchCoursesData');
    console.log('Query params:', queryParams);
    console.log('Stringified query params:', stringifiedQueryParams);

    try {
        await queryClient.prefetchQuery({
            queryKey: ['courses', stringifiedQueryParams],
            queryFn: () => getCourses({queryParams, offset: 0, count: 12}),
        });

        // prefetch 완료 후 데이터 확인
        const prefetchedData = queryClient.getQueryData(['courses', stringifiedQueryParams]);
        console.log('Prefetched data:', prefetchedData);

        if (!prefetchedData) {
            console.warn('No data was prefetched');
        }

        console.log('Prefetching completed successfully');
    } catch (error) {
        console.error('Error during prefetching:', error);
    }
};
