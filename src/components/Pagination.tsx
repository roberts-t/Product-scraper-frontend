import React from 'react';
import { FiChevronRight, FiChevronLeft, FiChevronsRight, FiChevronsLeft } from 'react-icons/fi';

const PAGE_RANGE = 5;
export const Pagination: React.FC<PaginationProps> = (props) => {
    const totalPages = Math.ceil(props.totalProducts / props.productsPerPage);
    const pageNumbers = Array.from({length: totalPages}, (_, i) => i + 1);

    let startPage = Math.max(props.currentPage - Math.ceil(PAGE_RANGE/2), 0);
    let endPage = Math.min(props.currentPage + Math.ceil(PAGE_RANGE/2) - 1, totalPages);
    if (endPage - startPage < PAGE_RANGE) {
        const difference = PAGE_RANGE - (endPage - startPage);
        startPage = Math.max(startPage - difference, 0);
    }
    if (endPage < PAGE_RANGE) {
        const difference = PAGE_RANGE - endPage;
        endPage = Math.min(endPage + difference, totalPages);
    }
   const slicedPageNumbers = pageNumbers.slice(startPage, endPage);

    const handleNextPageClick = () => {
        if (props.currentPage < totalPages) {
            props.setCurrentPage(props.currentPage + 1);
        }
    }

    const handlePreviousPageClick = () => {
        if (props.currentPage > 1) {
            props.setCurrentPage(props.currentPage - 1);
        }
    }

    if (totalPages === 1) {
        return null;
    }

    return (
        <div className="my-10 flex items-center justify-center">
            <button
                onClick={() => props.setCurrentPage(1)}
                disabled={props.currentPage < Math.ceil(PAGE_RANGE / 2) + 1}
                className="disabled:text-gray-300 text-gray-500"
            >
                <FiChevronsLeft className="text-2xl mr-2" />
            </button>
            <button
                onClick={handlePreviousPageClick}
                disabled={props.currentPage === 1}
                className="disabled:text-gray-300 text-gray-500"
            >
                <FiChevronLeft className="text-2xl mr-2" />
            </button>
            {slicedPageNumbers.map((pageNumber) => (
                <PageNumber
                    key={pageNumber}
                    pageNumber={pageNumber}
                    active={pageNumber === props.currentPage}
                    onClick={() => props.setCurrentPage(pageNumber)}
                />
            ))}
            <button
                onClick={handleNextPageClick}
                disabled={props.currentPage === totalPages}
                className="disabled:text-gray-300 text-gray-500"
            >
                <FiChevronRight className="text-2xl ml-2" />
            </button>
            <button
                onClick={() => props.setCurrentPage(totalPages)}
                disabled={totalPages - props.currentPage < Math.ceil(PAGE_RANGE / 2)}
                className="disabled:text-gray-300 text-gray-500"
            >
                <FiChevronsRight className="text-2xl ml-2" />
            </button>
        </div>
    );
};

const PageNumber: React.FC<PageNumberProps> = (props) => {
    return (
        <div
            className={`mx-1 w-8 h-8 rounded-sm flex justify-center items-center cursor-pointer ${props.active ? 'bg-primary text-white' : 'text-gray-500'}`}
            onClick={props.onClick}
        >
            {props.pageNumber}
        </div>
    )
}

interface PaginationProps {
    productsPerPage: number;
    totalProducts: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

interface PageNumberProps {
    pageNumber: number;
    active: boolean;
    onClick: () => void;
}