import React, {useState} from "react";
import './pagination.styles.scss';

type PropsType = {
    currentPage: number
    totalItems: number
    itemsOnPage: number
    pagesInPortion: number
    onPageChange: (page: number) => void
}

export const PaginationComponent = (props: PropsType) => {

    const {currentPage, itemsOnPage, onPageChange, pagesInPortion, totalItems} = props;

    const onPageChangeHandler = (page: number) => onPageChange(page);

    const totalPages = Math.ceil(totalItems / itemsOnPage);
    const totalPortions = Math.ceil(totalPages / pagesInPortion);

    let pages = [];
    for (let i = 1; i <= totalPages; i++) pages.push(i);

    const [portionNumber, setPortionNumber] = useState(1);
    const nextPortion = () => setPortionNumber(portionNumber + 1);
    const prevPortion = () => setPortionNumber(portionNumber - 1);

    const firstPageInPortion = (portionNumber - 1) * pagesInPortion + 1;
    const lastPageInPortion = portionNumber * pagesInPortion;

    const pagesMap = pages
        .filter(f => f >= firstPageInPortion && f <= lastPageInPortion)
        .map(m => {
            return (
                <button key={m} onClick={() => onPageChangeHandler(m)}
                        className={m === currentPage ? 'active pageBtn' : 'pageBtn'}>{m}</button>
            )
        })

    const portionWithLastPage = (page: number) => {
        onPageChange(page);
        setPortionNumber(totalPortions);
    };

    const portionWithFirstPage = (page: number) => {
        onPageChange(page);
        setPortionNumber(1);
    };

    const lastPage = pages.map(page => {
        if (page === pages.length) {
            return (
                <div key={page} className={'paginationBlock__pre-after'}>
                    <div className={'paginationDots'}>...</div>
                    <button onClick={() => portionWithLastPage(page)}
                            className={page === currentPage ? 'active pageBtn' : 'pageBtn'}>{page}</button>
                </div>
            )
        }
        return null;
    });

    const firstPage = pages.map(page => {
        if (page === 1) {
            return (
                <div key={page} className={'paginationBlock__pre-after'}>
                    <button onClick={() => portionWithFirstPage(page)}
                            className={page === currentPage ? 'active pageBtn' : 'pageBtn'}>{page}</button>
                    <div className={'paginationDots'}>...</div>
                </div>
            )
        }
        return null;
    });

    return (
        <div className={'pagination'}>
            <div className={'paginationBlock'}>
                {portionNumber > 1 && <button onClick={prevPortion}>prev</button>}
                {portionNumber > 1 && firstPage}
                {pagesMap}
                {portionNumber < totalPortions && lastPage}
                {portionNumber < totalPortions && <button onClick={nextPortion}>next</button>}
            </div>
        </div>
    )
}