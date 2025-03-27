import React, { useState } from "react";
import "/src/styles/styles.css";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [form, setForm] = useState({
    email: "",
    fullName: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate(); // 훅 사용

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("회원가입 정보:", form);

    // 로그인 로직 성공 시
    navigate("/"); // 👉 App 내부 라우팅으로 이동
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  return (
    <div className="signup-wrapper">
      <div className="signup-box">
        <h1 className="signup-logo">Clonestagram</h1>
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            name="email"
            placeholder="전화번호, 사용자 이름 또는 이메일"
            value={form.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
          />
         
          <button type="submit" className="signup-btn">
            로그인
          </button>
        </form>
        <Link to="/findpwd" style={{ 
          alignItems: 'center',
          gap: '12px',
          padding: '20px 16px',
          fontSize: '14px',
          color: 'black',
          textDecoration: 'none'}} >
            비밀번호를 잃으셨나요?
        </Link>
        <p className="signup-login-redirect">
          계정이 없으신가요? <a href="/signup">가입하기</a>
        </p>
        
      </div>
    </div>
  );
};

export default Login;
