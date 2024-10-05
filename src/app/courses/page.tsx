import React from 'react';
import {SearchArea} from "@/app/courses/components/widget/SearchArea";
import {Filter} from "@/app/courses/components/widget/Filter";
import {Pagination} from "@/app/courses/components/widget/Pagination";


const SearchPage = () => {
    return (
        <main>
            <SearchArea/>
            <Filter/>
            <Pagination/>
        </main>
    );
};

export default SearchPage;
