import {useSearchParams} from 'next/navigation';
import {useSuspenseQuery} from "@tanstack/react-query";
import {getBaseURL} from "utils/getBaseURL";
import {assert} from "utils/assert";

export const useSearch = () => {
    const searchParams = useSearchParams();

    const queryParams = {
        category: searchParams.getAll('category').map(Number),
        courseType: searchParams.getAll('courseType').map(Number),
        format: searchParams.getAll('format').map(Number),
        level: searchParams.getAll('level').map(Number),
        price: searchParams.getAll('price').map(Number),
        programmingLanguage: searchParams.getAll('programmingLanguage').map(Number),
        tab: searchParams.get('tab')
    };

    const {data, ...rest} = useSuspenseQuery({
        queryKey: ['courses', queryParams],
        queryFn: async () => {
            const url = new URL(`${getBaseURL()}/api/courses`);

            Object.entries(queryParams).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach(v => url.searchParams.append(key, v.toString()));
                } else if (value) {
                    url.searchParams.append(key, value.toString());
                }
            });

            const response = await fetch(url.toString(), {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                assert(response.ok, 'Network response was not ok');
            }

            return await response.json();
        },
    });

    return {courses: data, ...rest};
};
