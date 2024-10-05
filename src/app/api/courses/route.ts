import {NextRequest, NextResponse} from 'next/server';

// 조드 스키마 선언하기
export async function GET(req: NextRequest, {params, searchParams}: { params: any, searchParams: any }) {
    // 1. zod로 parse. 자주 일어날 것같은 오류(예상 가능한 오류 등)은 safeParse로 result.success 여부에 따라서 실패시 에러메시지를 내려줍니다. 예: NextResponse.json({error: ""}, {status: 404})

    // 2. PROCESS
    let responseText = 'Hello World';

    // 3. RETURN
    return NextResponse.json({responseText}, {status: 200});
}
