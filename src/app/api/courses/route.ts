import {NextRequest, NextResponse} from 'next/server';
import {z} from 'zod';

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
// export interface BffCourse {
//     id: number;
//     title: string;
//     short_description: string;
//     taglist: string[];
//     image_file_url: string;
//     is_free: boolean;
//     subtitle: string;
//     discounted_price: string;
// }
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
    discountRate: null | any;
    price: string;
    priceUsd: string;
    enrollType: number;
    isFree: boolean;
}

// 쿼리스트링에 들어갈 필터 조건의 Zod 스키마 선언
const searchParamsSchema = z.object({
    title: z.string().optional(),
    status: z.array(z.string()).optional(),
    is_datetime_enrollable: z.string().optional(),
    sort_by: z.string().default('created_datetime.desc'),
    offset: z.string().default('0'),
    count: z.string().default('12'),
});

// 외부 API 호출 함수
async function fetchCourses(filterConditions: any, sort_by: string, offset: number, count: number) {
    const apiUrl = `https://api-rest.elice.io/org/academy/course/list/?filter_conditions=${encodeURIComponent(JSON.stringify(filterConditions))}&sort_by=${sort_by}&offset=${offset}&count=${count}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    return data;
}

// API 핸들러 구현
export async function GET(req: NextRequest) {
    const {searchParams} = new URL(req.url);


    // console.log('this is searchParams:', searchParams)
    // safeParse로 검증
    const result = searchParamsSchema.safeParse(Object.fromEntries(searchParams));
    if (!result.success) {
        return NextResponse.json({error: "Invalid query parameters"}, {status: 400});
    }


    // console.log('this is result:', result)
    // 필터 조건 JSON 생성

    const filterConditions = {
        "$and": [
            result.data.title ? {"title": `%${result.data.title}%`} : {},
            result.data.status?.length ? {"$or": result.data.status.map((status) => ({status: parseInt(status, 10)}))} : {},
            result.data.is_datetime_enrollable === 'true' ? {"is_datetime_enrollable": true} : {}
        ].filter(Boolean),
    };

    console.log('this is filter conditions:', filterConditions);

    // 문자열에서 원래 자료형으로 변환
    const parsedOffset = parseInt(result.data.offset, 10);
    const parsedCount = parseInt(result.data.count, 10);

    // 외부 API 요청
    try {
        const courses = await fetchCourses(
            filterConditions,
            result.data.sort_by,
            parsedOffset,
            parsedCount
        );

        if (courses._result.status !== "ok") {
            return NextResponse.json({error: "Failed to fetch data from external API"}, {status: 500});
        }

        const bffCourses: BffCourseList = {
            courseCount: courses.courseCount,
            courses: courses.courses.map((course: Course) => ({
                courseType: course.course_type,  // 스네이크 케이스 -> 카멜 케이스로 변환
                tags: course.tags.map(tag => tag.name),  // 태그 이름만 리스트로 추출
                title: course.title,
                shortDescription: course.short_description,  // 카멜 케이스로 맞춤
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
                discountedPriceUsd: course.discounted_price_usd,  // 여기서도 스네이크 케이스에 맞춤
                discountRate: course.discount_rate,
                price: course.price,
                priceUsd: course.price_usd,
                enrollType: course.enroll_type,
                isFree: course.is_free,
            })),
        };

        return NextResponse.json(bffCourses, {status: 200});
    } catch (error) {
        return NextResponse.json({error: "Failed to fetch data from external API"}, {status: 500});
    }
}
