import {NextRequest, NextResponse} from 'next/server';
import {z} from 'zod';

// 1. 쿼리스트링에 들어갈 필터 조건의 Zod 스키마 선언
const searchParamsSchema = z.object({
    title: z.string().optional(), // title은 선택 사항
    status: z.array(z.string()).optional(), // status는 문자열 배열로 받아올 수 있음
    is_datetime_enrollable: z.string().optional(), // 문자열로 받음
    sort_by: z.string().default('created_datetime.desc'), // 기본값을 설정
    offset: z.string().default('0'), // 기본값을 설정
    count: z.string().default('2'), // 기본값을 설정
});

// 2. 외부 API 호출 함수
async function fetchCourses(filterConditions: any, sort_by: string, offset: number, count: number) {
    const apiUrl = `https://api-rest.elice.io/org/academy/course/list/?filter_conditions=${encodeURIComponent(JSON.stringify(filterConditions))}&sort_by=${sort_by}&offset=${offset}&count=${count}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    return data;
}

// 3. API 핸들러 구현
export async function GET(req: NextRequest) {
    // 쿼리스트링에서 searchParams 추출
    console.log('hello')
    const {searchParams} = new URL(req.url);

    // 1. zod로 쿼리스트링 파싱

    console.log('hello2')
    // console.log('queryParams', queryParams)
    // safeParse로 검증
    const result = searchParamsSchema.safeParse(searchParams);
    if (!result.success) {
        return NextResponse.json({error: "Invalid query parameters"}, {status: 400});
    }
    console.log('hello3')

    // 2. 필터 조건 JSON 생성
    const filterConditions = {
        "$and": [
            result.data.title ? {"title": `%${result.data.title}%`} : {}, // title 키워드
            result.data.status?.length ? {"$or": result.data.status.map((status) => ({status: parseInt(status, 10)}))} : {}, // status 필터
            result.data.is_datetime_enrollable === 'true' ? {"is_datetime_enrollable": true} : {} // is_datetime_enrollable 필터
        ].filter(Boolean), // 빈 객체 필터링
    };

    console.log('hello4')
    // 문자열에서 원래 자료형으로 변환
    const parsedOffset = parseInt(result.data.offset, 10);
    const parsedCount = parseInt(result.data.count, 10);
    const parsedIsDatetimeEnrollable = result.data.is_datetime_enrollable === 'true';

    // 3. 외부 API 요청
    try {
        const courses = await fetchCourses(
            filterConditions,
            result.data.sort_by,
            parsedOffset,
            parsedCount
        );
        return NextResponse.json({courses}, {status: 200});
    } catch (error) {
        return NextResponse.json({error: "Failed to fetch data from external API"}, {status: 500});
    }
}
