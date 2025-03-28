import React, { useState } from "react";
import "/src/styles/styles.css";
import { Link, useNavigate } from "react-router-dom";
import { setLoginUserById } from "../data/loginUser";
import { useAppState } from "../context/AppStateContext"; // ✅ 추가

const Login: React.FC = () => {
  const [form, setForm] = useState({
    email: "",
    fullName: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate(); // 훅 사용
  const { resetAppState } = useAppState(); // ✅ 여기서 가져옴

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🔐 로그인 정보:", form);

    try {
      await setLoginUserById(form.email);
      resetAppState(); // ✅ 상태 초기화
      navigate("/");
    } catch (err) {
      console.error("❌ 로그인 실패:", err);
    }
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
