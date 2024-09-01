import React, { useState } from 'react';
import logoImage from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import '../Css/Style.css';
import axios from 'axios';
import Cookies from 'js-cookie';

const LogIn = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // 서버로 로그인 요청
      const response = await axios.post('http://localhost:8080/login', { userid: id, password });
      const authToken = response.data.token;

      // 토큰을 쿠키에 저장
      Cookies.set('authToken', authToken, { expires: 1 / 24, secure: true, sameSite: 'Strict' });

      // 로그인 성공 후 메인 페이지로 이동
      navigate('/main');
    } catch (error) {
      alert('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div className="login-container">
      <div className="logo">
        <img src={logoImage} alt="Around Me" />
      </div>
      <h1>Login</h1>
      <p>Welcome to Around Me</p>
      <form className='in' onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p className="register-text">
        아직 회원 가입을 못 하셨나요? <a href="/register">회원가입</a>
      </p>
    </div>
  );
};

export default LogIn;