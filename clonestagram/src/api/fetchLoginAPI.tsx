import axios from 'axios';

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  userId: string;
}

const BASE_URL = 'http://localhost:8080';

export const login = async (formData: LoginFormData): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${BASE_URL}/login`,
      formData,
      { withCredentials: true }
    );
    console.log('✅ 로그인 성공:', response);
    return response.data; // ✅ 응답 데이터만 반환
  } catch (error: any) {
    if (error.response?.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error('로그인 요청 실패');
    }
  }
};
