import { useState } from "react";
import FeedList from "../components/FeedList";
import { Box, Button, ButtonGroup } from "@mui/material";

export default function Home() {
  const [selectedType, setSelectedType] = useState<"seeAll" | "following" | "nonSeen">("seeAll");

  return (
    <Box>
      {/* 우측 상단 필터 선택 */}
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        padding="10px 20px"
        sx={{ backgroundColor: "#f9f9f9" }}
      >
        <ButtonGroup variant="text" size="small">

        <Button
            onClick={() => setSelectedType("nonSeen")}
            variant={selectedType === "nonSeen" ? "contained" : "text"}
          >
            NonSeen
          </Button>
          
          <Button
            onClick={() => setSelectedType("following")}
            variant={selectedType === "following" ? "contained" : "text"}
          >
            Following
          </Button>
          

          <Button
            onClick={() => setSelectedType("seeAll")}
            variant={selectedType === "seeAll" ? "contained" : "text"}
          >
            SeeAll
          </Button>
        </ButtonGroup>
      </Box>

      {/* 피드 리스트 */}
      <Box
        flex="0 0 520px"
        sx={{
          margin: "auto",
          marginTop: "10px",
          height: "2000px",
          backgroundColor: "white",
        }}
      >
        <FeedList type={selectedType} />
      </Box>
    </Box>
  );
}
