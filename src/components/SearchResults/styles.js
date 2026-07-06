import styled from "styled-components";

const SearchGrid = styled.section`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
    margin: 30px;

    @media screen and (max-width: 50em) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: 450px) {
        grid-template-columns: repeat(1, 1fr);
    }
`

export {
    SearchGrid
}