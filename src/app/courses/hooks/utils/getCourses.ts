import {QueryParams} from "constants/queryParams";
import {BffCourseList} from "app/api/courses/route";
import {getBaseURL} from "utils/getBaseURL";

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
        } else if (value !== undefined && value !== null) {
            searchParams.append(key, value);
        }
    });

    const url = getBaseURL() + `/api/courses?${searchParams.toString()}&offset=${offset}&count=${count}`
    console.log('url:', url)
    console.log('decoded:', decodeURIComponent(url))

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
