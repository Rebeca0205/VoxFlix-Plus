import styled from "styled-components";

const MovieSection = styled.section`
    background-color: rgba(0, 255, 255, 0.7);
    border: 5px solid rgba(112, 255, 255, 1);
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 30px;
    margin: 40px;

    @media screen and (max-width: 390px) {
        flex-direction: column;
    }
`

const MovieIMG = styled.img`
    width: 30%;
    border-radius: 6px;
    @media screen and (max-width: 390px) {
        width: 100%;
    }
`

const TextDiv = styled.div`
    text-align: center;
    padding: 70px;

    @media screen and (max-width: 390px) {
        padding: 20px;
    }
`

export {
    MovieSection,
    MovieIMG,
    TextDiv
}