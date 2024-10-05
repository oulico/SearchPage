'use client'
import React from 'react';
import {SearchArea} from "@/app/courses/components/widget/SearchArea";
import {Filter} from "@/app/courses/components/widget/Filter";
import {Courses} from "@/app/courses/components/widget/Courses";
import {Pagination} from "@/app/courses/components/widget/Pagination";


const SearchPage = () => {
    return (
        <>
            <SearchArea/>
            <Filter/>
            <Courses/>
            {/*<Pagination/>*/}
        </>
    );
};

export default SearchPage;
