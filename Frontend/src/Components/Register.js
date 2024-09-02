import React, { useState } from 'react';
import logoImage from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import '../Css/Style.css';
import axios from 'axios';

const Register = () => {
  const [nickname, setNickname] = useState('');
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [locationConsent, setLocationConsent] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!termsAccepted || !locationConsent) {
      alert('모든 체크박스를 선택해 주세요.');
      return;
    }
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      // 서버로 회원가입 요청
      await axios.post('http://localhost:8080/register', {
        nickname,
        userid,
        password,
        termsAccepted,
        locationConsent,
      });

      alert('회원 가입이 완료되었습니다.');
      navigate('/login');
    } catch (error) {
      alert('회원 가입에 실패했습니다.');
    }
  };

  return (
    <div className="register-container">
      <div className="logo">
        <img src={logoImage} alt="Around Me" />
      </div>
      <h1 className="register-title">회원 가입</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="아이디"
          value={userid}
          onChange={(e) => setUserid(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <div className="checkboxes">
          <label>
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              required
            /> 이용약관 동의(필수)
          </label>
          <label>
            <input
              type="checkbox"
              checked={locationConsent}
              onChange={(e) => setLocationConsent(e.target.checked)}
              required
            /> 위치 기반 서비스 정보 제공 동의(필수)
          </label>
        </div>
        <button className="registerbtn" type="submit">회원 가입</button>
      </form>
      <p className="login-text">
        이미 Around Me 회원이신가요? <a href="/login">로그인</a>
      </p>
    </div>
  );
};

export default Register;
