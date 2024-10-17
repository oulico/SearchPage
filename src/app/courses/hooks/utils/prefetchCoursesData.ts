import {QueryClient} from "@tanstack/react-query";
import {QueryParams} from "constants/queryParams";
import {getCourses} from "./getCourses";

export const prefetchCoursesData = async (
    queryClient: QueryClient,
    queryParams: QueryParams
) => {

    const sortedQueryParams = Object.fromEntries(Object.entries(queryParams).sort());
    const stringifiedQueryParams = JSON.stringify(sortedQueryParams);

    await queryClient.prefetchQuery({
        queryKey: ['courses', stringifiedQueryParams],
        queryFn: () => getCourses({queryParams, offset: 0, count: 12}),
    });
};
