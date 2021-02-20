import React from 'react';
import { SortButton } from '../styling/StyledHome';

const Sort = ({ sortHandler, sortMeth }: Props) => {
    return (
        <SortButton>
            <img className="Sort-icon" src={require("../assets/sort_icon.svg")} alt="sort icon"/>
            <p onClick={sortHandler}>{'Sort By: ' + sortMeth}</p>
        </SortButton>
    );
};

export default Sort;

interface Props {
    sortHandler(): void
    sortMeth: string
}