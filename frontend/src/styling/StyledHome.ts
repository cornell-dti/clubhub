import styled from 'styled-components';
import { colors } from '../constants/Colors';
import searchIcon from '../assets/search_icon.svg';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Main = styled.div`
    display: flex;
`;

export const CardFrame = styled.div`
    display: flex;
    flex-direction: column;
`;

export const HeaderContainer = styled.div`
    min-height: 100px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding-left: 30px;
    padding-right: 30px;

    img {
        height: 80px;
        flex-shrink: 0;
        margin: 0;
    }

    input {
        width: 450px;
        height: 30px;
        border-radius: 100px;
        padding: 0 10px;
        box-shadow: 2px 2px 5px 2px ${colors.light_grey};
        border-style: none;
        background-image: url(${searchIcon});
        background-position: 7px 7px;
        background-repeat: no-repeat;
        text-indent: 30px;
        
        &:focus {
            outline: none;
        }
    }
`;

export const CategoriesContainer = styled.div`
    width: 500px;
    padding: 20px;

    ul {
        list-style-type: none;
        margin-left: 20px;
        padding: 0%;
    }

    li {
        margin: 0 0 5px 0;
    }

    a {
        color: black;
        text-decoration: none;

        &:focus {
            font-weight: bold;
        }
    }
`;

export const SortButton = styled.div`
    display: flex;
    font-size: large;
    color: #757575;
    font-weight: bold;
    align-items: center;

    img {
        padding-right: 10px;
    }

    p {
        &:hover {
            cursor: pointer;
        }
    }
`;

export const ClubCardContainer = styled.div`
    float: left;
    margin: 20px;
    position: relative;
    background-color: ${colors.white};
    width: 360px;
    height: 200px;
    box-shadow: 0 3px 3px ${colors.light_grey};
    border-radius: 20px;
    text-align: left;
    align-content: center;
    overflow: hidden;

    ul {
        list-style-type: none;
        padding-left: 25px;
        font-size: 18px;
        letter-spacing: 1px;
    }

    a {
        color: ${colors.black};
        text-decoration: none;
        font-weight: bold;
    }
`;

export const ClubHeaderContainer = styled.div`
    width: 100%;
    height: 60%;
    background-color: ${colors.dark_grey};
    text-align: center;
    color: ${colors.white};

    img {
        float: left;
        padding: 25px;
        width: 70px;
        height: 70px;
        border-radius: 30%;
    }

    h3 {
        float: left;
        width: 235px;
        height: 70px;
        text-align: left;
        font-size: 25px;  
    }
`;

export const StyledPagination = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    ul {
        list-style-type: none;
    }

    li {
        float: left;
        margin: 5px;
    }

    a {
        display: block;
        color: black;
        text-align: center;
        text-decoration: none;

        &:focus {
            font-weight: bold;
        }
    }
`;