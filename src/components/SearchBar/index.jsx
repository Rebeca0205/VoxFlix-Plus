import React from "react"
import { useDispatch } from "react-redux";
import { resetResults } from "../../redux/slices/search.slice";
import refreshIcon from "../../assets/refresh-ccw.svg"
import { FormStyle, RefreshButton, SearchButton, SearchInput } from "./styles";

const SearchBar = ({searchName, setSearchName, onSearch}) => {
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch();
    }

    const handleRefresh = () => {
        setSearchName('');
        dispatch(resetResults())
    }

    return(
        <form onSubmit={handleSubmit}>
            <h1 style={{textAlign: 'center', marginTop: '0', fontSize: 'clamp(1.6rem, 3vw, 3.5rem)'}}>¡Busca tu Pelicula! Es imposible que no la tengamos</h1>

            <FormStyle>
                <SearchInput 
                    type="text" 
                    id="searchSection__searchInput" 
                    placeholder="Escribe lo que sea"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                />
                <SearchButton>Buscar</SearchButton>
                <RefreshButton onClick={handleRefresh}>
                    <img src={refreshIcon} alt="RefreshIcon"/>
                </RefreshButton>
            </FormStyle>
        </form>
    )
}

export default SearchBar;