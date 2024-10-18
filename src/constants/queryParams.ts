import {z} from 'zod';

// 각 필터 옵션 정의
export const COURSE_TYPE = {
    SUBJECT: '6',
    CHALLENGE: '7',
    TEST: '8',
} as const;

export const FORMAT = {
    FREE_CHOICE: '1',
    SEQUENTIAL: '2',
} as const;

export const CATEGORY = {
    PROGRAMMING_BASICS: '4',
    DATA_ANALYSIS: '5',
    WEB: '6',
    AI: '7',
    ALGORITHM: '8',
} as const;

export const LEVEL = {
    BEGINNER: '11',
    ELEMENTARY: '12',
    INTERMEDIATE: '13',
    ADVANCED: '14',
    EXPERT: '15',
} as const;

export const PROGRAMMING_LANGUAGE = {
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

export const PRICE = {
    FREE: '29',
    PAID: '30',
    SUBSCRIPTION: '31',
    CREDIT: '32',
} as const;

// 타입 정의
export type CourseType = typeof COURSE_TYPE[keyof typeof COURSE_TYPE];
export type Format = typeof FORMAT[keyof typeof FORMAT];
export type Category = typeof CATEGORY[keyof typeof CATEGORY];
export type Level = typeof LEVEL[keyof typeof LEVEL];
export type ProgrammingLanguage = typeof PROGRAMMING_LANGUAGE[keyof typeof PROGRAMMING_LANGUAGE];
export type Price = typeof PRICE[keyof typeof PRICE];

// Zod 스키마 정의
export const courseTypeSchema = z.enum(Object.values(COURSE_TYPE) as [CourseType, ...CourseType[]]);
export const formatSchema = z.enum(Object.values(FORMAT) as [Format, ...Format[]]);
export const categorySchema = z.enum(Object.values(CATEGORY) as [Category, ...Category[]]);
export const levelSchema = z.enum(Object.values(LEVEL) as [Level, ...Level[]]);
export const programmingLanguageSchema = z.enum(Object.values(PROGRAMMING_LANGUAGE) as [ProgrammingLanguage, ...ProgrammingLanguage[]]);
export const priceSchema = z.enum(Object.values(PRICE) as [Price, ...Price[]]);

// 쿼리 파라미터 스키마
export const queryParamsSchema = z.object({
    courseType: courseTypeSchema.array().optional(),
    format: formatSchema.array().optional(),
    category: categorySchema.array().optional(),
    level: levelSchema.array().optional(),
    programmingLanguage: programmingLanguageSchema.array().optional(),
    price: priceSchema.array().optional(),
    keyword: z.string().nullable().optional(),
    tab: z.string().nullable().optional(),
});

// 전체 쿼리 파라미터 타입
export type QueryParams = {
    courseType?: CourseType[];
    format?: Format[];
    category?: Category[];
    level?: Level[];
    programmingLanguage?: ProgrammingLanguage[];
    price?: Price[];
    keyword?: string | null;
    tab?: string | null;
};

// export type QueryParams = {
//     courseType?: string[];
//     format?: string[];
//     category?: string[];
//     level?: string[];
//     programmingLanguage?: string[];
//     price?: Price[];
//     keyword?: string | null;
//     tab?: string | null;
// };
// }

// 전체 필터 옵션
export const FILTER_OPTIONS = {
    COURSE_TYPE,
    FORMAT,
    CATEGORY,
    LEVEL,
    PROGRAMMING_LANGUAGE,
    PRICE,
};

// 유틸리티 함수
export const getFilterOptions = <T extends keyof typeof FILTER_OPTIONS>(key: T) => {
    return Object.entries(FILTER_OPTIONS[key]).map(([label, value]) => ({label, value}));
}
