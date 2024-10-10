import {z} from 'zod';

export const CATEGORIES = {
    SUBJECT: '6',
    CHALLENGE: '7',
    TEST: '8',
} as const;

export const COURSE_TYPES = {
    FREE_CHOICE: '1',
    SEQUENTIAL: '2',
} as const;

export const FIELDS = {
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

export const TABS = {
    COURSE: 'course',
} as const;

// 타입 정의
type Category = typeof CATEGORIES[keyof typeof CATEGORIES];
type CourseType = typeof COURSE_TYPES[keyof typeof COURSE_TYPES];
type Field = typeof FIELDS[keyof typeof FIELDS];
type Level = typeof LEVELS[keyof typeof LEVELS];
type ProgrammingLanguage = typeof PROGRAMMING_LANGUAGES[keyof typeof PROGRAMMING_LANGUAGES];
type Price = typeof PRICES[keyof typeof PRICES];
type Tab = typeof TABS[keyof typeof TABS];

// QueryParams 타입 정의
export type QueryParams = {
    category?: Category | Category[]
    courseType?: CourseType | CourseType[]
    field?: Field | Field[]
    level?: Level | Level[]
    programmingLanguage?: ProgrammingLanguage | ProgrammingLanguage[]
    price?: Price | Price[]
    tab?: Tab
    page?: string
    pageSize?: string
};

// Zod 스키마 정의
export const queryParamsSchema = z.object({
    category: z.enum(Object.values(CATEGORIES) as [Category]).optional().or(z.array(z.enum(Object.values(CATEGORIES) as [Category]))),
    courseType: z.enum(Object.values(COURSE_TYPES) as [CourseType]).optional().or(z.array(z.enum(Object.values(COURSE_TYPES) as [CourseType]))),
    field: z.enum(Object.values(FIELDS) as [Field]).optional().or(z.array(z.enum(Object.values(FIELDS) as [Field]))),
    level: z.enum(Object.values(LEVELS) as [Level]).optional().or(z.array(z.enum(Object.values(LEVELS) as [Level]))),
    programmingLanguage: z.enum(Object.values(PROGRAMMING_LANGUAGES) as [ProgrammingLanguage]).optional().or(z.array(z.enum(Object.values(PROGRAMMING_LANGUAGES) as [ProgrammingLanguage]))),
    price: z.enum(Object.values(PRICES) as [Price]).optional().or(z.array(z.enum(Object.values(PRICES) as [Price]))),
    tab: z.enum(Object.values(TABS) as [Tab]).optional(),
    page: z.string().optional(),
    pageSize: z.string().optional(),
});
