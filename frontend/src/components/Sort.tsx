import React, { useState } from 'react';
import { SortButton } from '../styling/StyledHome';

const Sort = () => {
    const [sortState, setSortState] = useState({
        sortMeth: 'Due Date',
    });

    const switchSortMeth = () => {
        setSortState({
            sortMeth: (sortState.sortMeth === 'Due Date')? 'Club Name' : 'Due Date'
        });
    }

    return (
        <SortButton onClick={switchSortMeth}>
            <img className="Sort-icon" src={require("../assets/sort_icon.svg")} alt="sort icon"/>
            <p>{'Sort By: ' + sortState.sortMeth}</p>
        </SortButton>
    );
};

export default Sort;