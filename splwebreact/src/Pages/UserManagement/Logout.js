import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import Link


const Logout = ({onLogout}) => {

    const navigate = useNavigate();

    useEffect(() => {
        const userConfirmed = window.confirm('Are you sure you want to logout?');
        if (userConfirmed) { 
            onLogout();
            localStorage.setItem("user", undefined);
            localStorage.setItem("userRoleClass",undefined);
            localStorage.setItem("userName",undefined);
            navigate('/');
        }
    });

    return  <></>
}

export default Logout;