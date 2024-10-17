export function createSortedSearchParams(params: Record<string, string | string[] | undefined>): URLSearchParams {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            const sortedValue = [...value].sort((a, b) => a.localeCompare(b, undefined, {numeric: true}));
            sortedValue.forEach(v => searchParams.append(key, v));
        } else if (value !== undefined) {
            searchParams.append(key, value);
        }
    });

    return searchParams;
}

