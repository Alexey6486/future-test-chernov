import React, {useEffect, useState} from "react";
import './table.styles.scss';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {
    addUserAC,
    changePageAC,
    getDataTC,
    searchAC,
    sortByEmailAC,
    sortByIdAC,
    sortByLNameAC,
    sortByNameAC,
    sortByPhoneAC,
    TableStateType,
    userDetailsAC
} from "../../reducers/tableReducer";
import {TableRowComponent} from "./tableRow/tableRow.component";
import {paginationFilter} from "../../utils/pagination/paginationFilter/paginationFilter";
import {PaginationComponent} from "../../utils/pagination/pagination.component";
import {searchFunction} from "../../utils/search/searchFunction/searchFunction";
import {SearchComponent} from "../../utils/search/search.component";
import {AddUserComponent, AddUserFormDataType} from "../addUser/addUser.component";
import { v1 } from "uuid";

export const TableComponent = () => {

    const dispatch = useDispatch();

    const tableState = useSelector<AppRootStateType, TableStateType>(state => state.tableReducer);
    const {dataArray, totalItems, currentPage, itemsOnPage, pagesInPortion, idSort, emailSort, lastNameSort, nameSort, phoneSort, searchParam} = tableState;

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
    const tableHeader = { id: 'ID', email: 'Email', firstName: 'First Name', lastName: 'Last Name', phone: 'Phone',
        tableRowType: 'header', onSortClick: onSortClick };

    // show user details callback
    const showUserDetails = (id: number) => dispatch(userDetailsAC(id));

    // table data rows
    const arrItems = searchFunction(searchParam, dataArray)
        .map(person => <TableRowComponent key={v1()} {...person} showUserDetails={showUserDetails}/>);

    // jsx elements on current page
    const [currPage, setCurrPage] = useState<JSX.Element[]>();

    // pagination callback
    const onPageChange = (page: number) => dispatch(changePageAC(page));

    // restrict fetching data from server to only initial loading
    const [first, setFirst] = useState(true);

    // search callback
    const onSearch = (text: string) => dispatch(searchAC(text));

    // show/hide add user form
    const [addUserPopUp, setAddUserPopUp] = useState(false);

    // open add user pop up callback
    const onOpen = () => setAddUserPopUp(true);

    // close add user pop up callback
    const onClose = () => setAddUserPopUp(false);

    // add user callback
    const addUser = (payload: AddUserFormDataType) => dispatch(addUserAC(payload));

    // get 32 or 1000 users (by default we load 20 users)
    const getUsers = (usersNumber: number) => {
        dispatch(getDataTC(usersNumber));
    }

    useEffect(() => {
        if (first) {
            dispatch(getDataTC(100));
            setFirst(false)
        }

        // divide users array by chunks, set the amount of users on page according to the current page and the amount users on one page
        setCurrPage(paginationFilter(currentPage, itemsOnPage, arrItems));

    }, [dispatch, totalItems, idSort, emailSort, lastNameSort, nameSort, phoneSort, currentPage, searchParam, dataArray]);

    return (
        <>
            <div className={'tableInterface'}>
                <SearchComponent onSearch={onSearch}/>
                <div className={'tableInterface__btnsContainer'}>
                    <button onClick={onOpen}>Add user</button>
                </div>
            </div>

            <div className={'dataTable'}>
                <TableRowComponent {...tableHeader}/>
                {currPage}
            </div>

            <div className={'tableInterface'}>
                <PaginationComponent totalItems={totalItems} pagesInPortion={pagesInPortion} itemsOnPage={itemsOnPage}
                                     currentPage={currentPage} onPageChange={onPageChange}/>
                <div className={'tableInterface__btnsContainer'}>
                    <button onClick={() => getUsers(32)}>Load 32 users</button>
                    <button onClick={() => getUsers(1000)}>Load 1000 users</button>
                </div>
            </div>

            {
                addUserPopUp &&
                <AddUserComponent onClose={onClose} addUser={addUser}/>
            }
        </>
    )
}