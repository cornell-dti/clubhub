import React, { useState } from 'react';
import './Sort.css';

const Sort = () => {
    const [sortState, setSortState] = useState({
        sortMeth: 'Due Date',
    });

    const switchSortMeth = () => {
        setSortState({
            sortMeth: (sortState.sortMeth == 'Due Date')? 'Club Name' : 'Due Date'
        });
    }

    return (
        <div className="Sort-button" onClick={switchSortMeth}>
            <img className="Sort-icon" src={require("../../assets/sort_icon.svg")} alt="sort icon"/>
            <p>{'Sort By: ' + sortState.sortMeth}</p>
        </div>
    );
};

export default Sort;