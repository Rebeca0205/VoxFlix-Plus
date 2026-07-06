import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    body{
        margin: 0;
        font-family: ${props => props.theme.fonts.base};
        background-color: ${props => props.theme.colors.background};
        box-sizing: border-box
        width: 100%;
    }

    h1, h2, h3, h4{
        color: ${props => props.theme.colors.aqua};
    }

    h1{
        font-size: clamp(2rem, 3vw, 3.5rem);
    }

    h2{
        font-size: clamp(1.5rem, 3vw, 2rem);
    }

    h3{
        font-size: clamp(1rem, 3vw, 1.5rem);
    }


    p{
        color: ${props => props.theme.colors.white};
        font-size: clamp(1rem, 2vw, 1.6rem);
    }

    a {
        text-decoration: none;
    }

    button{
        border-radius: 9px;
        border: 5px solid rgba(112, 255, 255, 1);
        background-color: rgba(112, 255, 255, 1);
        padding: 20px;
        font-family: ${props => props.theme.fonts.base};
        color: rgb(20, 117, 117);
        outline: none; 
        font-size: clamp(0.5rem, 2vw, 1.4rem);
        font-weight: 500;
        cursor: pointer;

        &:hover {
            background-color: rgb(196, 255, 255);
        }
    }
`
//
export default GlobalStyles;