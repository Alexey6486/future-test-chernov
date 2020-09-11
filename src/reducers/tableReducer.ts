import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {appApi, ServerResponseObjectType} from "../api/appApi";
import {AppRootStateType} from "../store/store";
import {sortFunction} from "../utils/sortFunction/sortFunction";

// action types
const GET_DATA = 'GET_DATA';
const SORT_BY_ID = 'SORT_BY_ID';
const SORT_BY_NAME = 'SORT_BY_NAME';
const SORT_BY_LNAME = 'SORT_BY_LNAME';
const SORT_BY_EMAIL = 'SORT_BY_EMAIL';
const SORT_BY_PHONE = 'SORT_BY_PHONE';

// types
type SortType = 'desc' | 'asc';
export interface TableStateType extends Record<string, any> {
    dataArray: Array<ServerResponseObjectType>
    idSort: SortType
    nameSort: SortType
    lastNameSort: SortType
    emailSort: SortType
    phoneSort: SortType
}

type ThunkType = ThunkAction<void, AppRootStateType, {}, ActionTypes>;
type ActionTypes =
      ReturnType<typeof getDataAC>
    | ReturnType<typeof sortByIdAC>
    | ReturnType<typeof sortByNameAC>
    | ReturnType<typeof sortByLNameAC>
    | ReturnType<typeof sortByEmailAC>
    | ReturnType<typeof sortByPhoneAC>;

// state
const initialState: TableStateType = {
    dataArray: [],
    idSort: 'desc',
    nameSort: 'desc',
    lastNameSort: 'desc',
    emailSort: 'desc',
    phoneSort: 'desc',
};

// action creators
const getDataAC = (payload: Array<ServerResponseObjectType>) => ({type: GET_DATA, payload} as const);
export const sortByIdAC = () => ({type: SORT_BY_ID} as const);
export const sortByNameAC = () => ({type: SORT_BY_NAME} as const);
export const sortByLNameAC = () => ({type: SORT_BY_LNAME} as const);
export const sortByEmailAC = () => ({type: SORT_BY_EMAIL} as const);
export const sortByPhoneAC = () => ({type: SORT_BY_PHONE} as const);

// reducer
export const tableReducer = (state: TableStateType = initialState, action: ActionTypes) => {
    switch (action.type) {
        case GET_DATA:
            return {...state, dataArray: action.payload};
        case SORT_BY_ID:
            const stateForSortById = {...state}
            sortFunction('idSort', stateForSortById.idSort, stateForSortById, 'id');
            return stateForSortById;
        case SORT_BY_NAME:
            const stateForSortByName = {...state}
            sortFunction('nameSort', stateForSortByName.nameSort, stateForSortByName, 'firstName');
            return stateForSortByName;
        case SORT_BY_LNAME:
            const stateForSortByLName = {...state}
            sortFunction('lastNameSort', stateForSortByLName.lastNameSort, stateForSortByLName, 'lastName');
            return stateForSortByLName;
        case SORT_BY_EMAIL:
            const stateForSortByEmail = {...state}
            sortFunction('emailSort', stateForSortByEmail.emailSort, stateForSortByEmail, 'email');
            return stateForSortByEmail;
        case SORT_BY_PHONE:
            const stateForSortByPhone = {...state}
            sortFunction('phoneSort', stateForSortByPhone.phoneSort, stateForSortByPhone, 'phone');
            return stateForSortByPhone;
        default:
            return state;
    }
};

// thunks
export const getDataTC = (): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    try {
        const response = await appApi.getData();
        dispatch(getDataAC(response));
    } catch (error) {
        console.log(error);
    }
};
