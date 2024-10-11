import {z} from 'zod';

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

// 역방향 매핑을 위한 유틸리티 함수
function invertObject<T extends Record<string, string>>(obj: T) {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [value, key])
    ) as { [K in keyof T as T[K]]: K };
}

// 역방향 매핑 객체 생성
export const CATEGORIES_INVERSE = invertObject(COURSE_TYPES);
export const COURSE_TYPES_INVERSE = invertObject(FORMATS);
export const FIELDS_INVERSE = invertObject(CATEGORIES);
export const LEVELS_INVERSE = invertObject(LEVELS);
export const PROGRAMMING_LANGUAGES_INVERSE = invertObject(PROGRAMMING_LANGUAGES);
export const PRICES_INVERSE = invertObject(PRICES);

// 유니온 타입 정의
export type CourseType = typeof COURSE_TYPES[keyof typeof COURSE_TYPES];
export type Format = typeof FORMATS[keyof typeof FORMATS];
export type Category = typeof CATEGORIES[keyof typeof CATEGORIES];
export type Level = typeof LEVELS[keyof typeof LEVELS];
export type ProgrammingLanguage = typeof PROGRAMMING_LANGUAGES[keyof typeof PROGRAMMING_LANGUAGES];
export type Price = typeof PRICES[keyof typeof PRICES];

// QueryParams 타입 정의

export type QueryParams = {
    courseType?: CourseType | CourseType[]
    format?: Format | Format[]
    category?: Category | Category[]
    level?: Level | Level[]
    programmingLanguage?: ProgrammingLanguage | ProgrammingLanguage[]
    price?: Price | Price[]
    tab?: string
};


export const queryParamsSchema = z.object({
    courseType: z.string().or(z.array(z.string())).optional(),
    format: z.string().or(z.array(z.string())).optional(),
    category: z.string().or(z.array(z.string())).optional(),
    level: z.string().or(z.array(z.string())).optional(),
    programmingLanguage: z.string().or(z.array(z.string())).optional(),
    price: z.string().or(z.array(z.string())).optional(),
    tab: z.string().optional(),
});
