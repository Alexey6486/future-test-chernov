import React from "react";
import './tableRow.styles.scss';
import {SortArrowComponent} from "../../../utils/sorting/sortArrow/sortArrow.component";

type PropsType = {
    id: any
    firstName: string
    lastName: string
    email: string
    phone: string
    tableRowType?: string
    onSortClick?: (type: string) => void
    showUserDetails?: (id: number) => void
}

export const TableRowComponent = (props: PropsType) => {

    const {id, email, firstName, lastName, phone, tableRowType, onSortClick, showUserDetails} = props;

    // if row is table header, apply class modifier
    const rowTypeClass = tableRowType ? `tableRow tableRow-${tableRowType}` : 'tableRow';

    // sort callback
    const onSortClickHandler = (type: string) => { if (onSortClick) onSortClick(type); }

    // if row is table header, add sort component with sort callback
    const sortArrow= (field: string) => tableRowType && onSortClick && <SortArrowComponent onSortClick={() => onSortClickHandler(field)}/>;

    // show user details callback
    const onShowUser = () => {
        if (showUserDetails && !onSortClick) showUserDetails(id);
    }

    return (
        <div className={rowTypeClass} onClick={onShowUser}>
            <div className={'tableColumn tableColumn-id'}>{id}{sortArrow('id')}</div>
            <div className={'tableColumn tableColumn-name'}>{firstName}{sortArrow('firstName')}</div>
            <div className={'tableColumn tableColumn-name'}>{lastName}{sortArrow('lastName')}</div>
            <div className={'tableColumn tableColumn-email'}>{email}{sortArrow('email')}</div>
            <div className={'tableColumn tableColumn-phone'}>{phone}{sortArrow('phone')}</div>
        </div>
    )
}