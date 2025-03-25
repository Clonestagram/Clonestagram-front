import React from "react";
import FeedList from "../components/FeedList";
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// const queryClient = new QueryClient(); // ✅ 인스턴스 생성

export default function Home() {
  return (
    // <QueryClientProvider client={queryClient}>
      <div>
        <FeedList />
      </div>
    // </QueryClientProvider>
  );
}
