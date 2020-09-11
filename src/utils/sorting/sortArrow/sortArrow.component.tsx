import React, {useState} from "react";
import './sortArrow.styles.scss';

type PropsType = {
    onSortClick: () => void
}

export const SortArrowComponent = (props: PropsType) => {

    const {onSortClick} = props;

    const [sortArrow, setSortArrow] = useState(false);
    const sortArrowToggleClass = sortArrow ? 'sortArrow toggle' : 'sortArrow';

    const onSortClickHandler = () => {
        onSortClick();
    }

    return (
        <div className={sortArrowToggleClass} onClick={() => {
            setSortArrow(prev => !prev);
            onSortClickHandler();
        }}></div>
    )
}