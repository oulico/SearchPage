import {NextRequest, NextResponse} from 'next/server';
import {generateFilterConditions} from './utils/generateFilterConditions';
import {z} from 'zod';
import {queryParamsSchema} from 'constants/queryParams'


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
    const apiUrl = `https://api-rest.elice.io/org/academy/course/list/?filter_conditions=${encodeURIComponent(filterConditions)}&offset=${offset}&count=${count}`;
    console.log('apiUrl:', apiUrl)
    console.log('decoded:', decodeURIComponent(apiUrl))
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
}

// API 핸들러 구현
export async function GET(req: NextRequest) {
    const searchParams1111 = req.nextUrl.searchParams

    const queryParams = {
        format: searchParams1111.getAll('format'),
        category: searchParams1111.getAll('category'),
        level: searchParams1111.getAll('level'),
        programmingLanguage: searchParams1111.getAll('programming_language'),
        price: searchParams1111.getAll('price'),
        tab: searchParams1111.get('tab'),
        offset: searchParams1111.get('offset'),
        count: searchParams1111.get('count'),
        keyword: searchParams1111.get('keyword'),
    };

    console.log('offset received', queryParams.offset)

    console.log('이건 문자열 배열로 값을 넣어줌.', queryParams)
    const result = searchParamsSchema.safeParse(queryParams);

    if (!result.success) {
        console.log("Validation errors:", result.error.errors);
    } else {
        console.log("Parsed data:", result.data);
    }


// 필터 조건 JSON 생성
//@ts-expect-error TODO 타입 설정은 나중에 하기.
    const filterConditions = generateFilterConditions(result.data);


// 외부 API 요청
    try {
        const courses = await fetchCourses(
            filterConditions,
            result?.data?.offset,
            result?.data?.count
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
