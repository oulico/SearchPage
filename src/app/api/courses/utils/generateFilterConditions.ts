import {z} from 'zod';
import {COURSE_TYPES, FORMATS, CATEGORIES, LEVELS, PROGRAMMING_LANGUAGES, PRICES} from 'constants/queryParams';
import {FILTER_MAP} from "constants/filterMap";

const CourseTypeSchema = z.enum(Object.values(COURSE_TYPES) as [string, ...string[]]);
const FormatSchema = z.enum(Object.values(FORMATS) as [string, ...string[]]);
const CategorySchema = z.enum(Object.values(CATEGORIES) as [string, ...string[]]);
const LevelSchema = z.enum(Object.values(LEVELS) as [string, ...string[]]);
const ProgrammingLanguageSchema = z.enum(Object.values(PROGRAMMING_LANGUAGES) as [string, ...string[]]);
const PriceSchema = z.enum(Object.values(PRICES) as [string, ...string[]]);

export const queryParamsSchema = z.object({
    courseType: CourseTypeSchema.or(z.array(CourseTypeSchema)).optional(),
    format: FormatSchema.or(z.array(FormatSchema)).optional(),
    category: CategorySchema.or(z.array(CategorySchema)).optional(),
    level: LevelSchema.or(z.array(LevelSchema)).optional(),
    programmingLanguage: ProgrammingLanguageSchema.or(z.array(ProgrammingLanguageSchema)).optional(),
    price: PriceSchema.or(z.array(PriceSchema)).optional(),
    tab: z.string().optional(),
    offset: z.number().optional(),
    count: z.number().optional(),
});
export type QueryParams = z.infer<typeof queryParamsSchema>;

// FILTER_MAP의 구조를 명시적으로 정의
type FilterValue = {
    query: Record<string, string>;
    filter: Record<string, unknown> | Record<string, unknown>[];
};

type FilterMapType = {
    [K in keyof QueryParams]?: {
        [V: string]: FilterValue;
    };
};

// FILTER_MAP이 FilterMapType을 따르는지 확인 (타입 단언 사용)
const typedFilterMap = FILTER_MAP as FilterMapType;

type Condition =
    | { title: string }
    | { $or: Record<string, unknown>[] }
    | { is_datetime_enrollable: boolean }
    | Record<string, unknown>;

function generateFilterConditions(params: QueryParams): string {
    const conditions: Condition[] = [
        {"title": "%%"},
        {"$or": [{"status": 2}, {"status": 3}, {"status": 4}]},
        {"is_datetime_enrollable": true}
    ];

    function addCondition(paramKey: keyof FilterMapType) {
        const param = params[paramKey];
        const filterMapEntry = typedFilterMap[paramKey];

        if (param && filterMapEntry) {
            const values = Array.isArray(param) ? param : [param];
            const orConditions = values.flatMap(value => {
                const filterInfo = filterMapEntry[value as string];
                if (filterInfo?.filter) {
                    return Array.isArray(filterInfo.filter) ? filterInfo.filter : [filterInfo.filter];
                }
                return [];
            });

            if (orConditions.length > 0) {
                conditions.push({"$or": orConditions});
            }
        }
    }

    // 각 파라미터에 대해 조건 추가
    (Object.keys(typedFilterMap) as Array<keyof FilterMapType>).forEach(addCondition);

    return JSON.stringify({"$and": conditions});
}

export {generateFilterConditions};
