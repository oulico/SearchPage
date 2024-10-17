import {NextRequest, NextResponse} from 'next/server';
import {generateFilterConditions} from './utils/generateFilterConditions';
import {z} from 'zod';
import {queryParamsSchema} from 'constants/queryParams'
import * as sea from "node:sea";

// 태그 인터페이스 정의
interface Tag {
    id: number;
    tag_type: number;
    name: string;
}

interface Course {
    [key: string]: unknown;

    tags: Tag[];
}

// BFF 코스 인터페이스 정의
export interface BffCourseList {
    courseCount: number;
    courses: BffCourse[];
}

export interface BffCourse {
    courseType: number;
    tags: string[];
    title: string;
    shortDescription: string;
    classType: number;
    logoFileUrl: null | string;
    imageFileUrl: null | string;
    enrolledRolePeriod: null | string;
    enrolledRoleBeginDatetime: number | null;
    enrolledRoleEndDatetime: number | null;
    beginDatetime: number;
    endDatetime: null | number;
    isDiscounted: boolean;
    discountedPrice: string;
    discountedPriceUsd: string;
    discountRate: null | unknown;
    price: string;
    priceUsd: string;
    enrollType: number;
    isFree: boolean;
}


// queryParamsSchema를 확장해서 offset과 count를 추가
const searchParamsSchema = queryParamsSchema.extend({
    offset: z.string().transform(s => s === 'undefined' ? undefined : Number(s)).optional(),
    count: z.string().transform(s => s === 'undefined' ? undefined : Number(s)).optional(),
});


// 외부 API 호출 함수
async function fetchCourses(filterConditions: string, offset = 0, count = 12) {
    console.log('filterConditions', filterConditions)
    const apiUrl = `https://api-rest.elice.io/org/academy/course/list/?filter_conditions=${encodeURIComponent(filterConditions)}&offset=${offset}&count=${count}`;
    console.log('apiurl', apiUrl)
    console.log('decoded url:', decodeURIComponent(apiUrl));

    const response = await fetch(apiUrl);
    const data = await response.json();

    return data;
}

// API 핸들러 구현
export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const path = req.nextUrl.pathname
    console.log('this is path:', path)

    const searchParamsEntries = searchParams.entries();
    console.log('this is searchParamsEntries:', searchParamsEntries)
    console.log('getAll format', searchParams.getAll('format'))
    const queryParams = {
        format: searchParams.getAll('format'),
        category: searchParams.getAll('category'),
        level: searchParams.getAll('level'),
        programmingLanguage: searchParams.getAll('programming_language'),
        price: searchParams.getAll('price'),
        tab: searchParams.get('tab'),
        offset: searchParams.get('offset'),
        count: searchParams.get('count'),
        keyword: searchParams.get('keyword'),
    };
    console.log('this is queryParams as object:', queryParams)
    //값이 없는 경우에는 null 아니면 빈배열로 들어오고 있다. 아예 객체에서 해당 프로퍼티를 없애도 될 것 같긴한데..


// ok 배열로 들어옴.

// for (const [key, value] of req.nextUrl.searchParams.entries()) {
//     if (key in searchParams) {
//         if (Array.isArray(searchParams[key])) {
//             (searchParams[key] as string[]).push(value);
//         } else {
//             searchParams[key] = [searchParams[key] as string, value];
//         }
//     } else {
//         searchParams[key] = value;
//     }
// }
//
// // 단일 값 배열을 문자열로 변환 (선택적)
// Object.keys(searchParams).forEach(key => {
//     if (Array.isArray(searchParams[key]) && searchParams[key].length === 1) {
//         searchParams[key] = (searchParams[key] as string[])[0];
//     }
// });

    console.log('this is nextUrl:', req.nextUrl);
    console.log('this is queryParams:', queryParams);

// safeParse로 검증 검증이 제대로 안되고 있음. 왜 객체에 배열이 안들어있고, 그냥 통째로 문자열일까?
//     const result = searchParamsSchema.parse(searchParams);
    // 여기서 타입을 바꿔줄 필요가 있을까???? 일단 모두 그냥 문자열 혹은 문자열 배열로 받게 하.ㅁ
    const result = searchParamsSchema.safeParse(queryParams);

    if (!result.success) {
        console.log("Validation errors:", result.error.errors);
        // 여기서 에러 메시지를 확인할 수 있습니다
    } else {
        console.log("Parsed data:", result.data);
    }
    // console.log('this is result after parsing zod:', result)
    // zod에서 에러메세지를 받아보자

// const filterConditions = generateFilterConditions(result);


// console.log('this is result:', result)

//  이제 잘 들어옴
// this is result: {
//   format: [ 8, 7 ],
//   format: [ 2, 1 ],
//   field: [ 6, 8, 5, 4 ],
//   level: 12,
//   programmingLanguage: [
//     20, 22, 24, 25, 26,
//     28, 17, 18, 27
//   ],
//   price: 32,
//   tab: undefined,
//   page: undefined,
//   pageSize: undefined
// }

// 필터 조건 JSON 생성

    console.log('result befor filterConditions', result)
    const filterConditions = generateFilterConditions(result.data);
    console.log('conditions', filterConditions)

// const filterConditions = {
//     "$and": [
//         result.data.title ? {"title": `%${result.data.title}%`} : {},
//         result.data.status?.length ? {"$or": result.data.status.map((status) => ({status: parseInt(status, 10)}))} : {},
//         result.data.is_datetime_enrollable === 'true' ? {"is_datetime_enrollable": true} : {}
//     ].filter(Boolean),
// };
//
// console.log('this is filter conditions:', filterConditions);
// 여기서 ㅇ제대로 안들어옴.

// 문자열에서 원래 자료형으로 변환
// const parsedOffset = parseInt(result.offset, 10);
// const parsedCount = parseInt(result.count, 10);

// 외부 API 요청
    try {
        const courses = await fetchCourses(
            filterConditions,
        );

        // console.log('this is courses:', courses)

        if (courses._result.status !== "ok") {
            return NextResponse.json({error: "Failed to fetch data from external API"}, {status: 500});
        }

        const bffCourses: BffCourseList = {
            courseCount: courses.course_count,
            courses: courses.courses.map((course: Course) => ({
                courseType: course.course_type,
                tags: course.tags.map(tag => tag.name),
                title: course.title,
                shortDescription: course.short_description,
                classType: course.class_type,
                imageFileUrl: course.image_file_url,
                logoFileUrl: course.logo_file_url,
                enrolledRolePeriod: course.enrolled_role_period,
                enrolledRoleBeginDatetime: course.enrolled_role_begin_datetime,
                enrolledRoleEndDatetime: course.enrolled_role_end_datetime,
                beginDatetime: course.begin_datetime,
                endDatetime: course.end_datetime,
                isDiscounted: course.is_discounted,
                discountedPrice: course.discounted_price,
                discountedPriceUsd: course.discounted_price_usd,
                discountRate: course.discount_rate,
                price: course.price,
                priceUsd: course.price_usd,
                enrollType: course.enroll_type,
                isFree: course.is_free,
            })),
        };

        return NextResponse.json(bffCourses, {status: 200});
    } catch {
        return NextResponse.json({error: "Failed to fetch data from external API"}, {status: 500});
    }
}
