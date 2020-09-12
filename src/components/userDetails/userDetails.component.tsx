import React from "react";
import './userDetails.styles.scss';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {TableStateType} from "../../reducers/tableReducer";

export const UserDetailsComponent = () => {

    const tableState = useSelector<AppRootStateType, TableStateType>(state => state.tableReducer);
    const {userDetailsId, dataArray} = tableState;

    const userDetails = dataArray.filter(f => f.id === userDetailsId)
        .map(m => {
            return (
                <div className={'userDetails'} key={m.id}>
                    <div className={'userDetails__line'}>
                        <div className={'userDetails__title'}>Выбран пользователь:</div>
                        <div className={'userDetails__text'}>{m.firstName} {m.lastName}</div>
                    </div>
                    <div className={'userDetails__line'}>
                        <div className={'userDetails__title'}>Описание:</div>
                    </div>
                    <div className={'userDetails__line'}>
                        <div className={'userDetails__text'}>{m.description}</div>
                    </div>
                    <div className={'userDetails__line'}>
                        <div className={'userDetails__title'}>Адрес проживания: </div>
                        <div className={'userDetails__text'}>{m.address.streetAddress}</div>
                    </div>
                    <div className={'userDetails__line'}>
                        <div className={'userDetails__title'}>Город:</div>
                        <div className={'userDetails__text'}>{m.address.city}</div>
                    </div>
                    <div className={'userDetails__line'}>
                        <div className={'userDetails__title'}>Провинция:</div>
                        <div className={'userDetails__text'}>{m.address.state}</div>
                    </div>
                    <div className={'userDetails__line'}>
                        <div className={'userDetails__title'}>Индекс</div>
                        <div className={'userDetails__text'}>{m.address.zip}</div>
                    </div>
                </div>
            )
        })
    return (
        <>
            {
                userDetailsId &&
                userDetails
            }
        </>
    )
}