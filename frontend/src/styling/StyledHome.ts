import styled from 'styled-components';
import { colors } from '../constants';
import { device } from './Media';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 100%;   
`;

export const Main = styled.div`
    display: flex;
`;

export const CardFrame = styled.div`
    width: 85%;
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
    margin-top: 10px;
    img {
        height: 80px;
        flex-shrink: 0;
        margin: 0;
    }
`;

export const CategoriesContainer = styled.div`
    width: 15%;
    padding: 20px;
    padding-left: 30px;
    font-size: 20px;
    h2 {
        margin: 0;
    }
    ul {
        list-style-type: none;
        margin-left: 20px;
        padding: 0%;
    }
    li {
        margin: 0 0 10px 0;
    }
    a {
        color: black;
        text-decoration: none;
        &:focus {
            font-weight: bold;
        }
    }
    @media ${device.mobileL} {
        display: ${({openMenu}:props) => openMenu? 'flex' : 'none'};
        flex-direction: column;
        transform: ${({openMenu}:props) => openMenu ? 'tranlateX(0)' : 'translateX(-100%)'};
        transition: all 0.3s ease-in-out;
    }
`;

export const CategoriesToggle = styled.div`
    display: none;
    @media ${device.mobileL} {
        padding-top: 10px;
        padding-left: 40px;
        display: flex;
    }
`;

type props = {
    openMenu: boolean
}

export const SortButton = styled.div`
    display: flex;
    color: ${colors.grey};
    padding-left: 30px;
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
    /* padding-right: 50px;
    padding-left: 50px; */
    min-width: 500px;
    flex-direction: row;
    flex-wrap: wrap;
`;

export const ClubCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px 30px 50px 30px;
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
        height: 100%;
    }
`;