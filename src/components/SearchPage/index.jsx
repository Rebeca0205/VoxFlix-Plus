import { useState } from "react";
import SearchBar from "../SearchBar";
import SearchResults from "../SearchResults";
import { BackIconButton, BackIMG, SearchPageStyles } from "./styles";
import BackIcon from "../../assets/arrow-left-back.svg"
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
    const [inputValue, setInputValue] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate()

    return(     
        <SearchPageStyles>
            <BackIconButton onClick={() => navigate("/")}>
                <BackIMG src={BackIcon} alt="BackArrowIMG"/>
            </BackIconButton>
            <SearchBar
                searchName={inputValue}
                setSearchName={setInputValue}
                onSearch={() => setSearchTerm(inputValue)}
            />
            <SearchResults
                searchInput={searchTerm}
            />
        </SearchPageStyles>       
    )
}

export default SearchPage;