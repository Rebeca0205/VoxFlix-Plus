import styled from "styled-components";

const SearchPageStyles = styled.div`
    display: flex;
    flex-direction: column;
    
    @media screen and (max-width: 390px) {
        margin: 0 10px;
    }
`

const BackIconButton = styled.i`
    margin-left: 50px;
    margin-top: 20px;
    width: 2.5%;
    cursor: pointer;

    @media screen and (max-width: 390px) {
        width: 5%;
        margin-left: 20px;
        margin-bottom: 10px;
    }
`

const BackIMG = styled.img`
    width: 100%;
    height: 100%;
`

export {
    SearchPageStyles,
    BackIconButton,
    BackIMG
}