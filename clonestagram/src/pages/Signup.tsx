import React, { useState } from "react";
import { join, JoinFormData } from "../api/fetchJoinAPI";
import "/src/styles/styles.css";

const Signup: React.FC = () => {
  const [form, setForm] = useState({
    email: "",
    // fullName: "", // → name
    username: "", // 백엔드에는 사용 안함 (별도 저장 X)
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const joinData: JoinFormData = {
      email: form.email,
      name: form.username, // 백엔드 요구에 맞게 fullName → name
      password: form.password,
      confirmPassword: form.password, // 현재 확인 필드 없으므로 동일하게 처리
    };

    try {
      const result = await join(joinData);
      alert(result); // "회원가입 성공"
      // TODO: 로그인 페이지로 이동 등
    } catch (err: any) {
      alert(err.message); // 에러 메시지 출력
    }
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
            name="username"
            placeholder="사용자 이름"
            value={form.username}
            onChange={handleChange}
          />
          {/* <input
            type="text"
            name="username"
            placeholder="사용자 이름"
            value={form.username}
            onChange={handleChange}
            disabled // 현재 백엔드에 저장하지 않으므로 입력만 받고 비활성화 처리
          /> */}
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
