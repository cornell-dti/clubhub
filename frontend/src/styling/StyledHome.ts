import styled from 'styled-components';
import { colors } from '../constants/colors';
import searchIcon from '../assets/search_icon.svg';
import { device } from './Media';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 100%;   
`;

export const Main = styled.div`
    display: flex;
`;

export const HeaderContainer = styled.div`
    min-height: 100px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding 20px 9vw 0 30px;

    img {
        height: 80px;
        flex-shrink: 0;
        margin: 0;
    }

    input {
        width: 30vw;
        min-width: 200px;
        max-width: 450px;
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
    padding: 20px;
    padding-left: 80px;
    font-size: 20px;
    ul {
        list-style-type: none;
        margin: 10px 0 20px 20px;
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

    h2 {
        margin 10px 0 10px 0;
    }

    h3 {
        margin: 0 0 0 10px;
    }
    @media ${device.mobileM} { 
        padding: 10px;
        padding-left: 40px;
      }
`;

export const SortButton = styled.div`
    display: flex;
    padding-left: 80px;
    width: 100%;
    font-size: large;
    color: #757575;
    padding-left: 80px;
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

export const ClubGrid = styled.div`
    display: flex;
    padding-right: 50px;
    padding-left: 50px;
    flex-direction: row;
    flex-wrap: wrap;
`;

export const ClubCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px 4vw 50px 4vw;
    background-color: ${colors.white};
    width: 30vw;
    min-width: 400px;
    height: 240px;
    box-shadow: 0 3px 3px ${colors.light_grey};
    border-radius: 20px;
    text-align: left;
    align-content: center;
    overflow: hidden;
    ul {
        list-style-type: none;
        padding-left: 25px;
        font-size: 20px;
        letter-spacing: 1px;
        margin-top: 15px;
        margin-bottom: 12px;
    }
    a {
        color: ${colors.black};
        text-decoration: none;
        font-weight: bold;
    }
`;

export const ClubHeaderContainer = styled.div`
    width: 100%;
    height: 65%;
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
    width: 100%;

    ul {
        list-style-type: none;
        padding: 0;
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