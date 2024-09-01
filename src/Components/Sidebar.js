import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import '../Css/Style.css';

const Sidebar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // 쿠키에서 토큰 확인
        const authToken = Cookies.get('authToken');
        if (authToken) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        Cookies.remove('authToken');
        setIsLoggedIn(false);
        navigate('/');
    };

    const handleLogo = () => {
        navigate('/');
    };


    return (
        <div className='SidebarContainter'>
            {isLoggedIn ? (
                // 로그인된 상태
                <div className='SidebarContent'>
                    <svg width="100" height="100" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className='UserIcon'>
                        <path d="M11 6C11 7.65685 9.65685 9 8 9C6.34315 9 5 7.65685 5 6C5 4.34315 6.34315 3 8 3C9.65685 3 11 4.34315 11 6Z" fill="white" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8ZM8 1C4.13401 1 1 4.13401 1 8C1 9.65343 1.57326 11.173 2.53186 12.3707C3.24293 11.2252 4.80464 10 8.00001 10C11.1954 10 12.7571 11.2252 13.4681 12.3707C14.4267 11.173 15 9.65343 15 8C15 4.13401 11.866 1 8 1Z" fill="white" />
                    </svg>
                    <div className='UserName'>닉네임</div>
                    <div className='Logout' onClick={handleLogout}> Log Out</div>
                </div>
            ) : (
                // 로그인되지 않은 상태
                <div className='SidebarContent'>
                    <img className='Logo' src='Around_Me_Logo.png' alt="Around Me Logo" onClick={handleLogo} />
                    <div className='AM_Text'>Around Me</div>
                    <div className='SidebarFooter'>
                        <div className='Footer_1'>이미 회원이신가요?</div>
                        <div className='Footer_2'>아직 회원이 아니신가요?</div>
                        <a href='/Login' className='SidebarLogin'>로그인</a>
                        <a href='/Register' className='SidebarRegister'>회원가입</a>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Sidebar;
