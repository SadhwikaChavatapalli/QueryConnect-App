import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import Link


const Logout = ({onLogout}) => {

    const navigate = useNavigate();

    useEffect(() => {
        onLogout();
        navigate('/');
        localStorage.setItem("user", undefined);
        localStorage.setItem("userRoleClass",undefined);
    });

    return  <></>
}

export default Logout;