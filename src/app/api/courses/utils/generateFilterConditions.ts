import {QueryParams} from "constants/queryParams";

import { FILTER_MAP } from "constants/filterMap";

function generateFilterConditions(params: QueryParams): string {
    const conditions: any[] = [
        {"title": "%%"},
        {"$or": [{"status": 2}, {"status": 3}, {"status": 4}]},
        {"is_datetime_enrollable": true}
    ];

    function addCondition(paramKey: keyof QueryParams) {
        const param = params[paramKey];
        if (param) {
            const values = Array.isArray(param) ? param : [param];
            const orConditions = values.flatMap(value => {
                const filterInfo = FILTER_MAP[paramKey][value];
                if (filterInfo && filterInfo.filter) {
                    if (Array.isArray(filterInfo.filter)) {
                        return filterInfo.filter.map(f => ({ [Object.keys(f)[0]]: Object.values(f)[0] }));
                    } else {
                        return [filterInfo.filter];
                    }
                }
                return [];
            });

            if (orConditions.length > 0) {
                conditions.push({"$or": orConditions});
            }
        }
    }

    // 각 파라미터에 대해 조건 추가
    addCondition('category');
    addCondition('courseType');
    addCondition('field');
    addCondition('level');
    addCondition('programmingLanguage');
    addCondition('price');

    return JSON.stringify({"$and": conditions});
}

export { generateFilterConditions };
