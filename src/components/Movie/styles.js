import styled from "styled-components";

const MovieOption = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 270px;
    height: 500px;
    position: relative;
    cursor: pointer;
    transition: transform 0.3s;
`
const PosterIMG = styled.img`
    width: 270px;
    height: 430px;
    border-radius: 6px;
`

export{
    MovieOption,
    PosterIMG
}