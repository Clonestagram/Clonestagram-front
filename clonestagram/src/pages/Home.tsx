import React from "react";
import FeedList from "../components/FeedList";
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// const queryClient = new QueryClient(); // ✅ 인스턴스 생성

export default function Home() {
  return (
    // <QueryClientProvider client={queryClient}>
      <div>
        <h3>Instagram Home Feed 📸</h3>
        <FeedList />
      </div>
    // </QueryClientProvider>
  );
}
