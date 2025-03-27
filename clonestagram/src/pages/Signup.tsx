import React, { useState } from "react";
import "/src/styles/styles.css";

const Signup: React.FC = () => {
  const [form, setForm] = useState({
    email: "",
    fullName: "",
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("회원가입 정보:", form);
    // 회원가입 API 요청 처리 추가 가능
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-box">
        <h1 className="signup-logo">Clonestagram</h1>
        <p className="signup-subtext">친구들의 사진과 동영상을 보려면 가입하세요.</p>
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            name="email"
            placeholder="휴대폰 번호 또는 이메일 주소"
            value={form.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="fullName"
            placeholder="성명"
            value={form.fullName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="username"
            placeholder="사용자 이름"
            value={form.username}
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
            가입
          </button>
        </form>
        <p className="signup-login-redirect">
          계정이 있으신가요? <a href="/login">로그인</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
