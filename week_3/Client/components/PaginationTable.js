import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faAnglesLeft,
    faAngleLeft,
    faChevronRight,
    faAnglesRight,
} from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { DOTS, usePagination } from '@/customHooks/usePagination'

function PaginationTable(props) {
    const {
        onPageChange,
        totalCount = 1,
        siblingCount = 1,
        currentPage = 1,
        pageSize = 1,
    } = props

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    })

    // If there are less than 2 times in pagination range we shall not render the component
    // if (currentPage === 0 || paginationRange.length < 2) {
    //     return null
    // }

    const totalPage = Math.ceil(totalCount / pageSize)

    const onNext = () => {
        onPageChange(currentPage + 1)
    }

    const onNextNext = () => {
        onPageChange(totalPage)
    }

    const onPrevious = () => {
        onPageChange(currentPage - 1)
    }

    const onPrevPrev = () => {
        onPageChange(1)
    }

    let lastPage = paginationRange[paginationRange.length - 1]

    return (
        <div id="pagination-table-logs" className="pagination center">
            <button
                className="first-page pagination-item"
                disabled={currentPage == 1}
                onClick={onPrevPrev}
            >
                <FontAwesomeIcon icon={faAnglesLeft} />
            </button>
            <button
                className="prev-page pagination-item"
                disabled={currentPage == 1}
                onClick={onPrevious}
            >
                <FontAwesomeIcon icon={faAngleLeft} />
            </button>
            <div id="pagination" className="pagination-item page-numbers">
                {paginationRange.map((pageNumber, index) => {
                    if (pageNumber == DOTS) {
                        return (
                            <div
                                key={index}
                                className="page-numbers-item center"
                            >
                                ...
                            </div>
                        )
                    }

                    return (
                        <div
                            key={index}
                            className={`page-numbers-item center ${
                                pageNumber === currentPage ? 'page-current' : ''
                            }`}
                            onClick={() => onPageChange(pageNumber)}
                        >
                            {pageNumber}
                        </div>
                    )
                })}
            </div>
            <button
                className="next-page pagination-item"
                disabled={currentPage == totalPage}
                onClick={onNext}
            >
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
            <button
                className="last-page pagination-item"
                disabled={currentPage == totalPage}
                onClick={onNextNext}
            >
                <FontAwesomeIcon icon={faAnglesRight} />
            </button>

            <style jsx>{`
                .pagination-item:not(.page-numbers),
                .page-numbers .page-numbers-item {
                    width: 44px;
                    height: 44px;
                    margin: 0 6px;
                    cursor: pointer;
                }

                .pagination-item:not(.page-numbers):hover,
                .page-numbers .page-numbers-item:hover {
                    opacity: 0.5;
                }

                .page-numbers {
                    display: flex;
                }

                .page-numbers .page-numbers-item {
                    border-radius: 40%;
                    /* border: 1px solid #ccc; */
                    background-color: rgba(0, 0, 0, 0.08);
                }

                #pagination .page-numbers-item.page-current {
                    background-color: #c0d9ff;
                }

                #pagination-table-logs i {
                    font-size: 18px;
                    pointer-events: none;
                }

                #pagination-table-logs button {
                    background-color: transparent;
                    /* outline: none; */
                    border: 1px solid #ccc;
                    border-radius: 50%;
                    /* color: rgba(0, 0, 0, 0.5); */
                }

                button:disabled,
                button[disabled] {
                    cursor: default !important;
                }

                button:disabled:hover,
                button[disabled]:hover {
                    opacity: 1
                }
            `}</style>
        </div>
    )
}

export default PaginationTable
