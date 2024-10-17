import {z} from 'zod';

// 각 필터 옵션 정의
export const COURSE_TYPES = {
    SUBJECT: '6',
    CHALLENGE: '7',
    TEST: '8',
} as const;

export const FORMATS = {
    FREE_CHOICE: '1',
    SEQUENTIAL: '2',
} as const;

export const CATEGORIES = {
    PROGRAMMING_BASICS: '4',
    DATA_ANALYSIS: '5',
    WEB: '6',
    AI: '7',
    ALGORITHM: '8',
} as const;

export const LEVELS = {
    BEGINNER: '11',
    ELEMENTARY: '12',
    INTERMEDIATE: '13',
    ADVANCED: '14',
    EXPERT: '15',
} as const;

export const PROGRAMMING_LANGUAGES = {
    C: '16',
    CPP: '17',
    JAVA: '18',
    PYTHON: '19',
    JAVASCRIPT: '20',
    R: '21',
    HTML_CSS: '22',
    SQL: '23',
    ARDUINO: '24',
    SCRATCH: '25',
    KOTLIN: '26',
    SWIFT: '27',
    ENT: '28',
} as const;

export const PRICES = {
    FREE: '29',
    PAID: '30',
    SUBSCRIPTION: '31',
    CREDIT: '32',
} as const;

// 타입 정의
export type CourseType = typeof COURSE_TYPES[keyof typeof COURSE_TYPES];
export type Format = typeof FORMATS[keyof typeof FORMATS];
export type Category = typeof CATEGORIES[keyof typeof CATEGORIES];
export type Level = typeof LEVELS[keyof typeof LEVELS];
export type ProgrammingLanguage = typeof PROGRAMMING_LANGUAGES[keyof typeof PROGRAMMING_LANGUAGES];
export type Price = typeof PRICES[keyof typeof PRICES];

// Zod 스키마 정의
export const courseTypeSchema = z.enum(Object.values(COURSE_TYPES) as [CourseType, ...CourseType[]]);
export const formatSchema = z.enum(Object.values(FORMATS) as [Format, ...Format[]]);
export const categorySchema = z.enum(Object.values(CATEGORIES) as [Category, ...Category[]]);
export const levelSchema = z.enum(Object.values(LEVELS) as [Level, ...Level[]]);
export const programmingLanguageSchema = z.enum(Object.values(PROGRAMMING_LANGUAGES) as [ProgrammingLanguage, ...ProgrammingLanguage[]]);
export const priceSchema = z.enum(Object.values(PRICES) as [Price, ...Price[]]);

// 쿼리 파라미터 스키마
export const queryParamsSchema = z.object({
    courseType: courseTypeSchema.array().optional(),
    format: formatSchema.array().optional(),
    category: categorySchema.array().optional(),
    level: levelSchema.array().optional(),
    programmingLanguage: programmingLanguageSchema.array().optional(),
    price: priceSchema.array().optional(),
    keyword: z.string().nullable().default(""),
    tab: z.string().nullable().default("course"),
});

export type QueryParams = z.infer<typeof queryParamsSchema>;

// 전체 필터 옵션
export const FILTER_OPTIONS = {
    COURSE_TYPE: COURSE_TYPES,
    FORMAT: FORMATS,
    CATEGORY: CATEGORIES,
    LEVEL: LEVELS,
    PROGRAMMING_LANGUAGE: PROGRAMMING_LANGUAGES,
    PRICE: PRICES,
};

// 유틸리티 함수
export const getFilterOptions = <T extends keyof typeof FILTER_OPTIONS>(key: T) => {
    return Object.entries(FILTER_OPTIONS[key]).map(([label, value]) => ({label, value}));
}
