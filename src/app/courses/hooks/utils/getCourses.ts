import {QueryParams} from "constants/queryParams";
import {BffCourseList} from "app/api/courses/route";
import {getBaseURL} from "utils/getBaseURL";

export const getCourses = async ({queryParams, offset, count}: {
    queryParams: QueryParams,
    offset: number,
    count: number
}): Promise<BffCourseList> => {
    // 객체를 쿼리스트링으로 변환. 중복된 키를 사용하도록 함.
    const searchParams = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach(v => searchParams.append(key, v));
        } else if (value !== undefined && value !== null) {
            searchParams.append(key, String(value));
        }
    });

    const baseURL = getBaseURL();
    if (!baseURL) {
        console.error('Base URL is undefined or empty');
        throw new Error('Invalid base URL');
    }

    const url = `${baseURL}/api/courses?${searchParams.toString()}&offset=${offset}&count=${count}`;
    console.log('URL:', url);
    console.log('Decoded URL:', decodeURIComponent(url));

    try {
        const response = await fetch(url, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch courses: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching courses:', error);
        throw error;
    }
};
