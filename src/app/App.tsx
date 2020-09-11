import React from 'react';
import './App.styles.scss';
import {TableComponent} from "../components/table/table.component";

export const App = () => {

    return (
        <div className="App">
            <div className={'container'}>
                <div className={'tableBlock'}>
                    <TableComponent/>
                </div>
            </div>
        </div>
    );
}
