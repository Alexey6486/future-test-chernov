import React, {useEffect} from "react";
import './table.styles.scss';
import { useDispatch, useSelector } from "react-redux";
import {AppRootStateType} from "../../store/store";
import {getDataTC, sortByEmailAC, sortByIdAC, sortByLNameAC, sortByNameAC, sortByPhoneAC, TableStateType} from "../../reducers/tableReducer";
import { TableRowComponent } from "./tableRow/tableRow.component";

export const TableComponent = () => {

    const dispatch = useDispatch();

    const tableState = useSelector<AppRootStateType, TableStateType>(state => state.tableReducer);
    const {dataArray} = tableState;

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
    const tableHeader = {id: 'ID', email: 'Email', firstName: 'First Name', lastName: 'Last Name', phone: 'Phone', tableRowType: 'header', onSortClick: onSortClick};

    //table data rows
    const dataArrayMap = dataArray.map(person => <TableRowComponent key={person.id} {...person}/>);

    useEffect(() => {
        dispatch(getDataTC());
    }, [dispatch]);

    return (
        <div className={'dataTable'}>
            <TableRowComponent {...tableHeader}/>
            {dataArrayMap}
        </div>
    )
}