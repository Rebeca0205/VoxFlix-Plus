import styled from "styled-components";

const CarouselSection = styled.section`
    margin: 40px 30px;
` 

const CarouselFila = styled.div`
    display: flex;
    gap: 20px;
    overflow-x: scroll;
    overflow-y: hidden;
    scroll-behavior: smooth;
    height: 550px;
    margin: 0 10px;
    border-sizing: border-box; 

    &::-webkit-scrollbar-thumb {
    background-color: #e50914;
    border-radius: 10px;
  }
`
export {
    CarouselSection,
    CarouselFila
}