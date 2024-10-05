import {useSearchParams} from 'next/navigation';
import {useSuspenseQuery} from '@tanstack/react-query';
import {getBaseURL} from 'utils/getBaseURL';
import {assert} from 'utils/assert';
import {useQueryClient} from "app/providers/QueryClientProvider";

// 코스 타입 정의
interface Course {
    id: number;
    title: string;
    short_description: string;
    taglist: string[];
    image_file_url: string | null;
    is_free: boolean;
    subtitle: string;
}

// 쿼리 파라미터 타입 정의
interface QueryParams {
    title?: string;
    status?: string[];
    is_datetime_enrollable?: string;
    sort_by: string;
    offset: string;
    count: string;
}

const MOCK_COURSES: Course[] = [
    // ... (기존 MOCK_COURSES 데이터)
];

export const useCourse = () => {
    const searchParams = useSearchParams();

    const queryParams: QueryParams = {
        title: searchParams.get('title') || undefined,
        status: searchParams.getAll('status'),
        is_datetime_enrollable: searchParams.get('is_datetime_enrollable') || undefined,
        sort_by: searchParams.get('sort_by') || 'created_datetime.desc',
        offset: searchParams.get('offset') || '0',
        count: searchParams.get('count') || '12',
    };


    const {data, ...rest} = useSuspenseQuery({
        queryKey: ['courses', queryParams],
        queryFn: async (): Promise<Course[]> => {
            const url = new URL(`${getBaseURL()}/api/courses`);

            Object.entries(queryParams).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach(v => url.searchParams.append(key, v));
                } else if (value !== undefined) {
                    url.searchParams.append(key, value);
                }
            });

            console.log('url:', url.toString());

            // API 호출 대신 목업 데이터 반환
            return MOCK_COURSES;

            // 실제 API 호출 시 아래 코드 사용
            // const response = await fetch(url.toString(), {
            //   credentials: 'include',
            //   headers: {
            //     'Content-Type': 'application/json',
            //   },
            // });
            //
            // if (!response.ok) {
            //   throw new Error('Network response was not ok');
            // }
            //
            // return await response.json();
        },
    });

    return {courses: data, ...rest};
};
