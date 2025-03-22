// src/data/feedData.ts
import testImage1 from "/src/assets/testImage1.png";

// 피드 데이터 타입 정의
export interface FeedData {
  id: number;
  username: string;
  content: string;
  image: string;
  likes: number;
  comments: number;
}

// 100개의 더미 피드 생성
const feedData: FeedData[] = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  username: `user${index + 1}`,
  content: `This is post ${index + 1}`,
  image: testImage1,
  likes: Math.floor(Math.random() * 100),
  comments: Math.floor(Math.random() * 10),
}));

export default feedData;
