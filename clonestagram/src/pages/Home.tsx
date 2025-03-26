import React from "react";
import FeedList from "../components/FeedList";
import { Box } from "@mui/material";
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// const queryClient = new QueryClient(); // ✅ 인스턴스 생성

export default function Home() {
  return (
    // <QueryClientProvider client={queryClient}>
      <div>
        <Box flex="0 0 520px" sx={{ margin: "auto", marginTop: "10px", height: "2000px", backgroundColor: "white" }}>
        <FeedList />
        </Box>
      </div>
    // </QueryClientProvider>
  );
}
