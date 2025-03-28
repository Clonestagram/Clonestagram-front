import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

interface EditPostDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (newContent: string) => void;
  initialContent: string;
}

const EditPostDialog: React.FC<EditPostDialogProps> = ({
  open,
  onClose,
  onSubmit,
  initialContent,
}) => {
  const [content, setContent] = useState(initialContent);

  const handleSubmit = () => {
    onSubmit(content);
    onClose();
  };

  const handleClose = () => {
    setContent(initialContent); // 초기값 복원
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>게시물 수정</DialogTitle>
      <DialogContent>
        <TextField
          multiline
          fullWidth
          minRows={3}
          maxRows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="수정할 내용을 입력하세요"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>취소</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPostDialog;
