import React, { useState } from "react";
import "/src/styles/styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUser } from "../hooks/useLoginUser";
import { login, LoginFormData } from "../api/fetchLoginAPI";



const Login: React.FC = () => {
  const [form, setForm] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const { setLoginUserById } = useLoginUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🔐 로그인 정보:", form);

    try {
      const result = await login(form); // 세션 로그인 요청
      alert(result.message); // "로그인 성공"

      // 유저 정보 조회 및 전역 상태 저장 (임시 ID로 설정, 추후 백엔드 연동 필요)
      
      await setLoginUserById(result.userId);  

      navigate("/");
    } catch (err: any) {
      console.error("❌ 로그인 실패:", err);
      alert(err.message);
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-box">
        <h1 className="signup-logo">Clonestagram</h1>
        <form onSubmit={handleSubmit} className="signup-form" autoComplete="off">
          <input
            type="text"
            name="email"
            placeholder="이메일"
            value={form.email}
            onChange={handleChange}
            autoComplete="off"
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
          />
          <button type="submit" className="signup-btn">
            로그인
          </button>
        </form>

        {/* <Link
          to="/findpwd"
          style={{
            alignItems: "center",
            gap: "12px",
            padding: "20px 16px",
            fontSize: "14px",
            color: "black",
            textDecoration: "none",
          }}
        >
          비밀번호를 잃으셨나요?
        </Link> */}

        <p className="signup-login-redirect">
          계정이 없으신가요? <a href="/signup">가입하기</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
