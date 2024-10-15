import {FILTER_OPTIONS} from 'constants/queryParams';

type FlexibleQueryParams = {
    [K in keyof typeof FILTER_OPTIONS]?: string | string[] | null | undefined;
} & {
    keyword?: string;
    tab?: string;
    offset?: number;
    count?: number;
};

type Condition =
    | { title: string }
    | { $or: Record<string, unknown>[] }
    | { is_datetime_enrollable: boolean }
    | Record<string, unknown>;

function generateFilterConditions(params: FlexibleQueryParams): string {
    console.log('params======', params);
    const conditions: Condition[] = [
        {"$or": [{"status": 2}, {"status": 3}, {"status": 4}]},
        {"is_datetime_enrollable": true}
    ];

    // keyword 처리 (문자열)
    if (typeof params.keyword === 'string' && params.keyword !== 'null') {
        conditions.push({"title": `%${decodeURIComponent(params.keyword)}%`});
    } else {
        conditions.push({"title": "%%"});
    }

    // tab 처리 (문자열)
    if (typeof params.tab === 'string' && params.tab !== 'null') {
        conditions.push({"tab": params.tab});
    }

    // offset과 count는 API 호출 시 사용될 것이므로 여기서는 처리하지 않습니다.

    Object.keys(FILTER_OPTIONS).forEach(key => {
        const paramKey = key.toLowerCase() as keyof FlexibleQueryParams;
        const paramValue = params[paramKey];

        if (paramValue !== null && paramValue !== undefined) {
            const values = Array.isArray(paramValue) ? paramValue : [paramValue];
            const options = FILTER_OPTIONS[key as keyof typeof FILTER_OPTIONS];
            const orConditions = values.flatMap(value => {
                if (typeof value === 'string') {
                    const option = Object.entries(options).find(([, opt]) => opt.value === value);
                    return option ? [{[key.toLowerCase()]: option[1].value}] : [];
                }
                return [];
            });

            if (orConditions.length > 0) {
                conditions.push({"$or": orConditions});
            }
        }
    });

    console.log('Generated conditions:', JSON.stringify({"$and": conditions}));
    return JSON.stringify({"$and": conditions});
}

export {generateFilterConditions};
