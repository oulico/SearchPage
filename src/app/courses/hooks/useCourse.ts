import {useSearchParams} from 'next/navigation';
import {useSuspenseQuery} from '@tanstack/react-query';
import {getBaseURL} from 'utils/getBaseURL';
import {useState, useEffect, useCallback} from 'react';
import debounce from 'lodash/debounce';

interface Tag {
    id: number;
    tag_type: number;
    name: string;
}

interface Course {
    [key: string]: unknown;

    tags: Tag[];
}

interface QueryParams {
    title?: string;
    status?: string[];
    is_datetime_enrollable?: string;
    sort_by: string;
    offset: string;
    count: string;
}

export const useCourse = () => {
    const searchParams = useSearchParams();
    const [debouncedTitle, setDebouncedTitle] = useState<string | undefined>(searchParams.get('title') || undefined);

    const queryParams: QueryParams = {
        status: searchParams.getAll('status'),
        is_datetime_enrollable: searchParams.get('is_datetime_enrollable') || undefined,
        sort_by: searchParams.get('sort_by') || 'created_datetime.desc',
        offset: searchParams.get('offset') || '0',
        count: searchParams.get('count') || '12',
    };

    const debouncedSetTitle = useCallback(
        debounce((title: string | undefined) => {
            setDebouncedTitle(title);
        }, 300),
        []
    );

    useEffect(() => {
        const title = searchParams.get('title') || undefined;
        debouncedSetTitle(title);
        return () => {
            debouncedSetTitle.cancel();
        };
    }, [searchParams, debouncedSetTitle]);

    const {data, ...rest} = useSuspenseQuery({
        queryKey: ['courses', {...queryParams, title: debouncedTitle}],
        queryFn: async (): Promise<Course[]> => {
            const url = new URL(`${getBaseURL()}/api/courses`);

            Object.entries({...queryParams, title: debouncedTitle}).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach(v => url.searchParams.append(key, v));
                } else if (value !== undefined) {
                    url.searchParams.append(key, value);
                }
            });

            const response = await fetch(url.toString(), {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return await response.json();
        },
    });

    return {courses: data, ...rest};
};
