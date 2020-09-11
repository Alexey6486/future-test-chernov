import {TableStateType} from "../../../reducers/tableReducer";

export const sortFunction = (sortType: string, sortState: string, state: TableStateType, sortBy: string) => {
    if (sortState === 'desc') {
        if (sortType === 'idSort') {
            state.dataArray.sort((a, b) => a[sortBy] - b[sortBy]);
        } else {
            state.dataArray.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
        }
        state[sortType] = 'asc';
    } else if (sortState === 'asc') {
        if (sortType === 'idSort') {
            state.dataArray.sort((a, b) => a[sortBy] - b[sortBy]).reverse();
        } else {
            state.dataArray.sort((a, b) => a[sortBy].localeCompare(b[sortBy])).reverse();
        }
        state[sortType] = 'desc';
    }
};