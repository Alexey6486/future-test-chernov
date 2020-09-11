import {applyMiddleware, combineReducers, createStore } from "redux";
import ThunkMiddleware from 'redux-thunk';
import {reducer as ReduxForm} from 'redux-form'
import {tableReducer} from "../reducers/tableReducer";

const reducers = combineReducers({
    form: ReduxForm,
    tableReducer,
});

export type AppRootStateType = ReturnType<typeof reducers>;

export const store = createStore(reducers, applyMiddleware(ThunkMiddleware));
