import styled from "styled-components";

const HeaderStyle = styled.header`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: ${props => props.theme.colors.header};
    padding: 15px 20px;
    align-items: center;
    box-sizing: border-box
`

const LogoIMG = styled.img`
    width: 4%;
    height: 4%;
    cursor: pointer;

    @media screen and (max-width: 450px) {
        width: 10%;
        height: 10%;
    }
`

export {
    HeaderStyle,
    LogoIMG
}