import React from "react";
import './error.styles.scss';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {TableStateType} from "../../reducers/tableReducer";

export const ErrorComponent = () => {

    const tableState = useSelector<AppRootStateType, TableStateType>(state => state.tableReducer);
    const {error} = tableState;

    return (
        <div className={'errorMessage'}>
            {error}
        </div>
    )
}