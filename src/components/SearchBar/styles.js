import styled from "styled-components";

const FormStyle = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    align-items: center;
`

const SearchInput = styled.input`
    border-radius: 200px;
    border: 5px solid rgba(112, 255, 255, 1);
    padding: 10px;
    font-family: font-family: ${props => props.theme.fonts.base};
    outline: none; 
    font-size: clamp(0.8rem, 3vw, 1rem);

    &:focus{
        border: 5px solid rgba(112, 255, 255, 1);
        background-color: rgb(196, 255, 255);
        color: rgba(4, 25, 130, 0.5);
    }

    &::placeholder{
        color: rgba(4, 25, 130, 0.5);
    }

    @media screen and (max-width: 390px) {
        width: 40%;
    }
`

const SearchButton = styled.button`
    padding: 0;
    outline: none; 
    font-size: clamp(0.8rem, 3vw, 1.3rem);
    font-weight: 500;
    width: 10%;

    @media screen and (max-width: 390px) {
        width: 15%;
    }
`

const RefreshButton = styled.i`
    cursor: pointer
`

export {
    FormStyle,
    SearchInput,
    SearchButton,
    RefreshButton
}