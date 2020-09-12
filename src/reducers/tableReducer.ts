import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {appApi, ServerResponseObjectType} from "../api/appApi";
import {AppRootStateType} from "../store/store";
import {sortFunction} from "../utils/sorting/sortFunction/sortFunction";
import {AddUserFormDataType} from "../components/addUser/addUser.component";

// action types
const GET_DATA = 'GET_DATA';
const CHANGE_PAGE = 'CHANGE_PAGE';
const SORT_BY_ID = 'SORT_BY_ID';
const SORT_BY_NAME = 'SORT_BY_NAME';
const SORT_BY_LNAME = 'SORT_BY_LNAME';
const SORT_BY_EMAIL = 'SORT_BY_EMAIL';
const SORT_BY_PHONE = 'SORT_BY_PHONE';
const SEARCH = 'SEARCH';
const USER_DETAILS = 'USER_DETAILS';
const ADD_USER = 'ADD_USER';
const LOADING_DATA = 'LOADING_DATA';
const ERROR = 'ERROR';

// types
type SortType = 'desc' | 'asc';
export interface TableStateType extends Record<string, any> {
    dataArray: Array<ServerResponseObjectType>
    totalItems: number
    currentPage: number
    itemsOnPage: number
    pagesInPortion: number
    idSort: SortType
    nameSort: SortType
    lastNameSort: SortType
    emailSort: SortType
    phoneSort: SortType
    searchParam: string
    userDetailsId: number | null
    loadingData: boolean
    error: string | null
}

type ThunkType = ThunkAction<void, AppRootStateType, {}, ActionTypes>;
type ActionTypes =
      ReturnType<typeof getDataAC>
    | ReturnType<typeof sortByIdAC>
    | ReturnType<typeof sortByNameAC>
    | ReturnType<typeof sortByLNameAC>
    | ReturnType<typeof sortByEmailAC>
    | ReturnType<typeof sortByPhoneAC>
    | ReturnType<typeof changePageAC>
    | ReturnType<typeof searchAC>
    | ReturnType<typeof userDetailsAC>
    | ReturnType<typeof addUserAC>
    | ReturnType<typeof loadingDataAC>
    | ReturnType<typeof errorAC>;

// state
const initialState: TableStateType = {
    dataArray: [],
    totalItems: 0,
    currentPage: 1,
    itemsOnPage: 10,
    pagesInPortion: 5,
    idSort: 'desc',
    nameSort: 'desc',
    lastNameSort: 'desc',
    emailSort: 'desc',
    phoneSort: 'desc',
    searchParam: '',
    userDetailsId: null,
    loadingData: false,
    error: null,
};

// action creators
const getDataAC = (payload: Array<ServerResponseObjectType>) => ({type: GET_DATA, payload} as const);
export const sortByIdAC = () => ({type: SORT_BY_ID} as const);
export const sortByNameAC = () => ({type: SORT_BY_NAME} as const);
export const sortByLNameAC = () => ({type: SORT_BY_LNAME} as const);
export const sortByEmailAC = () => ({type: SORT_BY_EMAIL} as const);
export const sortByPhoneAC = () => ({type: SORT_BY_PHONE} as const);
export const changePageAC = (page: number) => ({type: CHANGE_PAGE, page} as const);
export const searchAC = (text: string) => ({type: SEARCH, text} as const);
export const userDetailsAC = (id: number) => ({type: USER_DETAILS, id} as const);
export const addUserAC = (payload: AddUserFormDataType) => ({type: ADD_USER, payload} as const);
export const loadingDataAC = (payload: boolean) => ({type: LOADING_DATA, payload} as const);
export const errorAC = (payload: string | null) => ({type: ERROR, payload} as const);

// reducer
export const tableReducer = (state: TableStateType = initialState, action: ActionTypes) => {
    switch (action.type) {
        case GET_DATA:
            return {...state, dataArray: action.payload, totalItems: action.payload.length, currentPage: 1,};
        case CHANGE_PAGE:
            return {...state, currentPage: action.page};
        case SEARCH:
            return {...state, searchParam: action.text};
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
        case USER_DETAILS:
            return {...state, userDetailsId: action.id};
        case ADD_USER:
            const id = Number.parseInt(new Date().getTime().toString().slice(5));
            const newUser = {...action.payload, id, address: { streetAddress: 'no data', city: 'no data',
                    state: 'no data', zip: 0 }, description: 'no data', }
            return {...state, dataArray: [newUser, ...state.dataArray],totalItems: state.totalItems + 1};
        case LOADING_DATA:
            return {...state, loadingData: action.payload};
        case ERROR:
            return {...state, error: action.payload};
        default:
            return state;
    }
};

// thunks
export const getDataTC = (rowsNumber: number): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, {}, ActionTypes>) => {
    dispatch(loadingDataAC(true));
    try {
        const response = await appApi.getData(rowsNumber);
        dispatch(getDataAC(response));
        dispatch(loadingDataAC(false));
    } catch (error) {
        dispatch(loadingDataAC(false));
        console.log(error.message);
        dispatch(errorAC('Something went wrong. Check console and network.'));
        setTimeout(() => {
            dispatch(errorAC(null));
        }, 3000);
    }
};
