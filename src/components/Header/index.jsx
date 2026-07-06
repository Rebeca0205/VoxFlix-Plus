import { useNavigate } from 'react-router-dom';
import User from '../../assets/user.svg';
import Logo from '../../assets/Voxflix_Logo.png';
import { LogoIMG, HeaderStyle } from './styles';

const Header = () => {
    const navigate = useNavigate();

    return (
        <HeaderStyle>
            <img src={User} alt="usuario"/>
            <h1 style={{margin: "10px"}}>VOXFLIX</h1>
            <LogoIMG onClick={() => navigate("/")}  src={Logo} alt="Logo_VoxFlix" />
        </HeaderStyle>
    )
}

export default Header;