import {useSearchParams} from 'next/navigation';
import {useSuspenseQuery} from '@tanstack/react-query';
import {getBaseURL} from 'utils/getBaseURL';
import {assert} from 'utils/assert';

export const useCourse = () => {
    const searchParams = useSearchParams();

    const queryParams = {
        title: searchParams.get('title') || '', // 검색 키워드
        status: searchParams.getAll('status'), // status 필터 (문자열 배열)
        is_datetime_enrollable: searchParams.get('is_datetime_enrollable') || undefined, // 등록 가능한 강좌 여부
        sort_by: searchParams.get('sort_by') || 'created_datetime.desc', // 정렬 기준
        offset: searchParams.get('offset') || '0', // 결과 페이지 시작점
        count: searchParams.get('count') || '12', // 한 번에 가져올 결과 수
    };

    const {data, ...rest} = useSuspenseQuery({
        queryKey: ['courses', queryParams],
        queryFn: async () => {
            const url = new URL(`${getBaseURL()}/api/courses`);

            // 쿼리 파라미터 추가
            Object.entries(queryParams).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach(v => url.searchParams.append(key, v.toString()));
                } else if (value !== undefined && value !== null && value !== '') {
                    url.searchParams.append(key, value.toString());
                }
            });

            console.log('url:', url.toString());

            const response = await fetch(url.toString(), {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                assert(response.ok, 'Network response was not ok');
            }

            return await response.json();
        },
    });

    return {courses: data, ...rest};
};
