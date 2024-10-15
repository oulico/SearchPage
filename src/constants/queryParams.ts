import {z} from 'zod';
import {createParser, parseAsArrayOf} from 'nuqs';

// 필터 옵션 정의
export const FILTER_OPTIONS = {
    COURSE_TYPE: {
        SUBJECT: {value: '6', label: '주제별'},
        CHALLENGE: {value: '7', label: '챌린지'},
        TEST: {value: '8', label: '테스트'},
    },
    FORMAT: {
        FREE_CHOICE: {value: '1', label: '자유 선택'},
        SEQUENTIAL: {value: '2', label: '순차 학습'},
    },
    CATEGORY: {
        PROGRAMMING_BASICS: {value: '4', label: '프로그래밍 기초'},
        DATA_ANALYSIS: {value: '5', label: '데이터 분석'},
        WEB: {value: '6', label: '웹'},
        AI: {value: '7', label: 'AI'},
        ALGORITHM: {value: '8', label: '알고리즘'},
    },
    LEVEL: {
        BEGINNER: {value: '11', label: '입문'},
        ELEMENTARY: {value: '12', label: '초급'},
        INTERMEDIATE: {value: '13', label: '중급'},
        ADVANCED: {value: '14', label: '고급'},
        EXPERT: {value: '15', label: '전문가'},
    },
    PROGRAMMING_LANGUAGE: {
        C: {value: '16', label: 'C'},
        CPP: {value: '17', label: 'C++'},
        JAVA: {value: '18', label: 'Java'},
        PYTHON: {value: '19', label: 'Python'},
        JAVASCRIPT: {value: '20', label: 'JavaScript'},
        R: {value: '21', label: 'R'},
        HTML_CSS: {value: '22', label: 'HTML/CSS'},
        SQL: {value: '23', label: 'SQL'},
        ARDUINO: {value: '24', label: 'Arduino'},
        SCRATCH: {value: '25', label: 'Scratch'},
        KOTLIN: {value: '26', label: 'Kotlin'},
        SWIFT: {value: '27', label: 'Swift'},
        ENT: {value: '28', label: 'ENT'},
    },
    PRICE: {
        FREE: {value: '29', label: '무료'},
        PAID: {value: '30', label: '유료'},
        SUBSCRIPTION: {value: '31', label: '구독'},
        CREDIT: {value: '32', label: '학점'},
    },
} as const;

// QueryParams 타입 정의
export type QueryParams = {
    courseType?: string[] | null;
    format?: string[] | null;
    category?: string[] | null;
    level?: string[] | null;
    programmingLanguage?: string[] | null;
    price?: string[] | null;
    tab?: string | null;
    keyword?: string | null;
};

// Zod 스키마 정의
export const queryParamsSchema = z.object({
    courseType: z.string().or(z.array(z.string())).optional(),
    format: z.string().or(z.array(z.string())).optional(),
    category: z.string().or(z.array(z.string())).optional(),
    level: z.string().or(z.array(z.string())).optional(),
    programmingLanguage: z.string().or(z.array(z.string())).optional(),
    price: z.string().or(z.array(z.string())).optional(),
    keyword: z.string().optional(),
    tab: z.string().optional(),
});

// 단일 값을 위한 파서 생성 함수
const createFilterParser = () => {
    return createParser({
        parse: (value: string) => value || null,
        serialize: (value: string) => value,
    });
};

// 배열 값을 위한 파서 생성 함수
const createFilterArrayParser = () => {
    return parseAsArrayOf(createFilterParser());
};

// 모든 필터 옵션에 대한 파서 생성
export const parsers = {
    courseType: {single: createFilterParser(), array: createFilterArrayParser()},
    format: {single: createFilterParser(), array: createFilterArrayParser()},
    category: {single: createFilterParser(), array: createFilterArrayParser()},
    level: {single: createFilterParser(), array: createFilterArrayParser()},
    programmingLanguage: {single: createFilterParser(), array: createFilterArrayParser()},
    price: {single: createFilterParser(), array: createFilterArrayParser()},
};
