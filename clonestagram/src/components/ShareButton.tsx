import "/src/styles/styles.css";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";;

const ShareButton: React.FC = () => {


  // 공유 버튼 클릭 핸들러 (링크 복사 예제)
  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("링크가 복사되었습니다!");
  };

  return (
    <div>
      <IconButton onClick={handleShareClick}>
        <SendIcon fontSize="large" />
      </IconButton>
    </div>
  );
};

export default ShareButton;
