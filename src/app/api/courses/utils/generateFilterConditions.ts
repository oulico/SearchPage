import { z } from 'zod';
import { FILTER_MAP } from "constants/filterMap";
import { queryParamsSchema } from "constants/queryParams";

export type QueryParams = z.infer<typeof queryParamsSchema>;

type FilterValue = {
    query: Record<string, string>;
    filter: Record<string, unknown> | Record<string, unknown>[];
};

type FilterMapType = {
    [K in keyof QueryParams]?: {
        [V: string]: FilterValue;
    };
};

const typedFilterMap = FILTER_MAP as FilterMapType;

type Condition =
    | { title: string }
    | { $or: Record<string, unknown>[] }
    | { is_datetime_enrollable: boolean }
    | Record<string, unknown>;

function generateFilterConditions(params: QueryParams): string {
    console.log('params', params);
    const conditions: Condition[] = [
        { "$or": [{ "status": 2 }, { "status": 3 }, { "status": 4 }] },
        { "is_datetime_enrollable": true }
    ];

    // keyword 처리
    if (params.keyword && params.keyword !== '') {
        conditions.push({ "title": `%${decodeURIComponent(params.keyword)}%` });
    } else {
        conditions.push({ "title": "%%" });
    }

    // tab 처리
    if (params.tab && params.tab !== null) {
        conditions.push({ "tab": params.tab });
    }

    // 나머지 params 처리
    const filterKeys: (keyof QueryParams)[] = ['format', 'category', 'level', 'programmingLanguage', 'price'];

    filterKeys.forEach(key => {
        const values = params[key];
        if (Array.isArray(values) && values.length > 0) {
            const filterGroup = typedFilterMap[key];
            if (filterGroup) {
                const orConditions: Record<string, unknown>[] = [];
                values.forEach(v => {
                    const filterValue = filterGroup[v];
                    if (filterValue && filterValue.filter) {
                        if (Array.isArray(filterValue.filter)) {
                            orConditions.push(...filterValue.filter);
                        } else {
                            orConditions.push(filterValue.filter);
                        }
                    }
                });
                if (orConditions.length > 0) {
                    conditions.push({ "$or": orConditions });
                }
            }
        }
    });

    console.log('Generated conditions:', JSON.stringify({ "$and": conditions }));
    return JSON.stringify({ "$and": conditions });
}

export { generateFilterConditions };
