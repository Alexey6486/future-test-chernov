import React, {useEffect, useState} from "react";
import './table.styles.scss';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {
    changePageAC,
    getDataTC,
    sortByEmailAC,
    sortByIdAC,
    sortByLNameAC,
    sortByNameAC,
    sortByPhoneAC,
    TableStateType
} from "../../reducers/tableReducer";
import {TableRowComponent} from "./tableRow/tableRow.component";
import {paginationFilter} from "../../utils/pagination/paginationFilter/paginationFilter";
import {PaginationComponent} from "../../utils/pagination/pagination.component";

export const TableComponent = () => {

    const dispatch = useDispatch();

    const tableState = useSelector<AppRootStateType, TableStateType>(state => state.tableReducer);
    const {dataArray, totalItems, currentPage, itemsOnPage, pagesInPortion, idSort, emailSort, lastNameSort, nameSort, phoneSort} = tableState;

    // sort callback returns a field name param, then switch dispatches the action
    const onSortClick = (type: string) => {
        switch (type) {
            case 'id':
                return dispatch(sortByIdAC())
            case 'firstName':
                return dispatch(sortByNameAC())
            case 'lastName':
                return dispatch(sortByLNameAC())
            case 'email':
                return dispatch(sortByEmailAC())
            case 'phone':
                return dispatch(sortByPhoneAC())
        }
    }

    // table header
    const tableHeader = {
        id: 'ID',
        email: 'Email',
        firstName: 'First Name',
        lastName: 'Last Name',
        phone: 'Phone',
        tableRowType: 'header',
        onSortClick: onSortClick
    };

    // table data rows
    const dataArrayMap = dataArray.map(person => <TableRowComponent key={person.id} {...person}/>);

    // jsx elements on current page
    const [currPage, setCurrPage] = useState<JSX.Element[]>();

    const onPageChange = (page: number) => {
        dispatch(changePageAC(page))
    }

    // restrict fetching data from server to only initial loading
    const [first, setFirst] = useState(true);

    useEffect(() => {
        if (first) {
            dispatch(getDataTC());
            setFirst(false)
        }

        // divide users array by chunks, set the amount of users on page according to the current page and the amount users on one page
        setCurrPage(paginationFilter(currentPage, itemsOnPage, dataArrayMap));

    }, [dispatch, totalItems, idSort, emailSort, lastNameSort, nameSort, phoneSort, currentPage]);


    return (
        <>
            <div className={'dataTable'}>
                <TableRowComponent {...tableHeader}/>
                {currPage}
            </div>
            <PaginationComponent totalItems={totalItems} pagesInPortion={pagesInPortion} itemsOnPage={itemsOnPage}
                                 currentPage={currentPage} onPageChange={onPageChange}/>
        </>
    )
}