import React from 'react';

const Pagination = ({ perPage, totalItem, setCurrentPage, currentPage }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItem / perPage); i++) {
        pageNumbers.push(i);
    }

    const handleChangePage = (page) => {
        setCurrentPage(page);
        window.scroll(0, 550)
    }
    return (
        <div className='flex justify-center gap-4 mt-5 pagination'>
            {pageNumbers.map((page, index) => (
                <div key={index}
                    className={`${page === currentPage ? 'bg-pink text-white border-none' : ''} cursor-pointer rounded-xl px-4 py-2 border border-gray-400`}
                    onClick={() => handleChangePage(page)}
                >
                    {page}
                </div>
            ))}
        </div>
    );
};

export default Pagination;