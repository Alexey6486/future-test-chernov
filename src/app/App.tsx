import React from 'react';
import './App.styles.scss';
import {TableComponent} from "../components/table/table.component";
import {UserDetailsComponent} from "../components/userDetails/userDetails.component";
import {LoadingFromServerComponent} from "../utils/loading/loadDataFromServer/loadingFromServer.component";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {TableStateType} from "../reducers/tableReducer";
import { ErrorComponent } from '../utils/error/error.component';

export const App = () => {

    const tableState = useSelector<AppRootStateType, TableStateType>(state => state.tableReducer);
    const {loadingData, error} = tableState;

    return (
        <div className="App">

            <div className={'container'}>
                <div className={'tableBlock'}>
                    <TableComponent/>
                </div>
                <div className={'userBlock'}>
                    <UserDetailsComponent/>
                </div>
            </div>

            {loadingData && <LoadingFromServerComponent/>}
            {error && <ErrorComponent/>}

        </div>
    );
}
