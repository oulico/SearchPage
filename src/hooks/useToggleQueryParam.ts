import {useQueryParams} from './useQueryParams';

export function useToggleQueryParam(key) {
    const {queries, setQuery, deleteQuery} = useQueryParams();

    const toggle = (value: boolean) => {
        if (queries[key] === value) {
            deleteQuery(key);
        } else {
            setQuery[key](value);
        }
    };

    return [queries[key], toggle];
}

export function useStringQueryParam(key, defaultValue = '') {
    const { queries, setQuery } = useQueryParams();

    const setValue = (value) => {
        setQueries[key](value || defaultValue);
    };

    return [queries[key] || defaultValue, setValue];
}
