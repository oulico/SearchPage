import {z} from 'zod';

// 레이블과 ID 매핑을 정의
export const CATEGORY_LABELS = {
    '과목': 6,
    '챌린지': 7,
    '테스': 8,
} as const;

export const COURSE_TYPE_LABELS = {
    '자유 선택형': 1,
    '순차 완료': 2,
} as const;

export const FIELD_LABELS = {
    '프로그래밍 기초': 4,
    '데이터 분석': 5,
    '웹': 6,
    '인공지능': 7,
    '알고리즘': 8,
} as const;

export const LEVEL_LABELS = {
    '입문': 11,
    '초급': 12,
    '중급': 13,
    '고급': 14,
    '심화': 15,
} as const;

export const PROGRAMMING_LANGUAGE_LABELS = {
    'C': 16,
    'C++': 17,
    '자바': 18,
    '파이썬': 19,
    '자바스크립트': 20,
    'R': 21,
    'HTML/CSS': 22,
    'SQL': 23,
    '아두이노': 24,
    '스크래치': 25,
    '코틀린': 26,
    '스위프트': 27,
    '엔트': 28,
} as const;

export const PRICE_LABELS = {
    '무료': 29,
    '유료': 30,
    '구독': 31,
    '학점': 32,
} as const;

export const TAB_LABELS = {
    'course': 'course',
} as const;

// 각 레이블에 대한 타입 정의
type Category = keyof typeof CATEGORY_LABELS;
type CourseType = keyof typeof COURSE_TYPE_LABELS;
type Field = keyof typeof FIELD_LABELS;
type Level = keyof typeof LEVEL_LABELS;
type ProgrammingLanguage = keyof typeof PROGRAMMING_LANGUAGE_LABELS;
type Price = keyof typeof PRICE_LABELS;
type Tab = keyof typeof TAB_LABELS;

// 각 키와 레이블의 값을 매핑한 타입 정의
export type QueryParams = {
    category: Record<Category, number>;
    courseType: Record<CourseType, number>;
    field: Record<Field, number>;
    level: Record<Level, number>;
    programmingLanguage: Record<ProgrammingLanguage, number>;
    price: Record<Price, number>;
    tab: Tab;
};

// Zod 스키마로 변환 나중에 api에서 사용예정
export const queryParamsSchema = z.object({
    category: z.record(z.number()).optional(), // 레이블: ID 매핑
    courseType: z.record(z.number()).optional(),
    field: z.record(z.number()).optional(),
    level: z.record(z.number()).optional(),
    programmingLanguage: z.record(z.number()).optional(),
    price: z.record(z.number()).optional(),
    tab: z.enum(['course']) // 'tab'은 단일 문자열로 enum 처리
});
