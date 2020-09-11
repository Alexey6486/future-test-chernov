import React from 'react';
import './App.styles.scss';
import {TableComponent} from "../components/table/table.component";
import {UserDetailsComponent} from "../components/userDetails/userDetails.component";

export const App = () => {

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
        </div>
    );
}
