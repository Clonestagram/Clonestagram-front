import axios from 'axios';
export interface JoinFormData {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
  }
  
const BASE_URL = 'http://localhost:8080'; // 서버 주소 맞게 수정

export const join = async (formData: JoinFormData): Promise<string> => {
  try {
    const response = await axios.post<string>(
      `${BASE_URL}/join`,
      formData,
      { withCredentials: true }
    );
    return response.data; // "회원가입 성공"
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(typeof error.response.data === 'string' ? error.response.data : '회원가입 실패');
    } else {
      throw new Error('회원가입 요청 실패');
    }
  }
};
