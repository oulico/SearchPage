'use client'
import styled from "@emotion/styled";
import {colors} from "constants/styleScheme";
import {useCourse} from "app/courses/hooks/useCourse";
import {CounterActions} from "react-use/lib/useCounter";


const ButtonWrapper = styled.div({
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    paddingTop: '1rem',
})
const PagesButton = styled.button({
    display: 'inline-block',
    width: '40px',
    height: '40px',
    backgroundColor: 'white',
    border: '1px solid',
    borderColor: colors.gray[200],
    borderRadius: '4px',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: colors.gray[200],
        color: 'white',
    },
    '&:focus': {
        outline: 'none',
    },
    '&:disabled': {
        backgroundColor: colors.gray[200],
        color: 'white',
        cursor: 'not-allowed',
    },
})
const PagesButtonActive = styled(PagesButton)({
    backgroundColor: colors.primary[500],
    color: 'white',
})
const PagesButtonWithIcon = styled(PagesButton)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
})
const COUNT = 12;

export const Pagination = ({offset, set}: {
    offset: number,
    set: CounterActions['set']
}) => {

    const {data} = useCourse(offset, COUNT);
    if (!data) return null;

    const totalPages = Math.ceil(data.courseCount / COUNT);
    const currentPage = Math.floor(offset / COUNT) + 1;

    const onPageChange = (pageNum: number) => {
        set((pageNum - 1) * COUNT);
    };

    const getPageNumbers = () => {
        const pageNumbers = [];
        const leftOffset = Math.min(2, currentPage - 1);
        const rightOffset = Math.min(2, totalPages - currentPage);
        const start = Math.max(1, currentPage - leftOffset);
        const end = Math.min(totalPages, currentPage + rightOffset);

        for (let i = start; i <= end; i++) {
            pageNumbers.push(i);
        }

        while (pageNumbers.length < 5 && pageNumbers[0] > 1) {
            pageNumbers.unshift(pageNumbers[0] - 1);
        }
        while (pageNumbers.length < 5 && pageNumbers[pageNumbers.length - 1] < totalPages) {
            pageNumbers.push(pageNumbers[pageNumbers.length - 1] + 1);
        }

        return pageNumbers;
    };

    const handleLeftBtn = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    }

    const handleRightButton = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    }

    return (
        <ButtonWrapper>
            <PagesButtonWithIcon onClick={handleLeftBtn} disabled={currentPage === 1}>
                {'<'}
            </PagesButtonWithIcon>
            {getPageNumbers().map((pageNumber) => (
                pageNumber === currentPage
                    ? <PagesButtonActive key={pageNumber} onClick={() => onPageChange(pageNumber)}>
                        {pageNumber}
                    </PagesButtonActive>
                    : <PagesButton key={pageNumber} onClick={() => onPageChange(pageNumber)}>
                        {pageNumber}
                    </PagesButton>
            ))}
            <PagesButtonWithIcon onClick={handleRightButton} disabled={currentPage === totalPages}>
                {'>'}
            </PagesButtonWithIcon>
        </ButtonWrapper>
    );
};
