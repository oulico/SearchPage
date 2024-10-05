import {z} from 'zod';

const QUERYPARAMS = {
    category: [6, 7, 8, 9, 10],
    courseType: [1, 2, 3],
    format: [4, 5],
    level: [11, 12, 13, 14, 15],
    price: [29, 30, 31, 32],
    programmingLanguage: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
    tab: 'course'
} as const;

// 각 필드에 대해 타입 정의
export type QueryParams = typeof QUERYPARAMS;

// Zod 스키마로 변환
export const queryParamsSchema = z.object({
    category: z.array(z.number()).nonempty(),
    courseType: z.array(z.number()).nonempty(),
    format: z.array(z.number()).nonempty(),
    level: z.array(z.number()).nonempty(),
    price: z.array(z.number()).nonempty(),
    programmingLanguage: z.array(z.number()).nonempty(),
    tab: z.enum(['course']) // 'tab'은 단일 문자열로 enum 처리
});
