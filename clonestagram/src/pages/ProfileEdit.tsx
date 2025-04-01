import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Divider,
} from "@mui/material";
import defaultProfileImg from "/public/profileImg.jpg";
import { useLoginUser } from "../hooks/useLoginUser";
import { uploadToCloudinary } from "../utils/uploadToCloudinary"; // ✅ 이미지 업로드 API
import { updateUserProfile } from "../api/fetchUserAPI"; // ✅ PUT /{userId}/profile API
import { useNavigate } from "react-router-dom";


const ProfileEdit: React.FC = () => {
  const { getLoginUser } = useLoginUser();
  const loginUser = getLoginUser();

  const [bio, setBio] = useState(loginUser.bio || "");
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(
    loginUser.profileimg || defaultProfileImg
  );
  const [loading, setLoading] = useState(false);

  // 이미지 선택 시 처리
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const navigate = useNavigate();

 const handleSubmit = async () => {
  setLoading(true);

//   let uploadedImageUrl: string = loginUser.profileimg || defaultProfileImg; // ✅ null 방지 기본값 지정

  let uploadedImageUrl: string | null = loginUser.profileimg || defaultProfileImg; // ✅ 기본값 지정

  if (profileImageFile) {
    try {
      uploadedImageUrl = await uploadToCloudinary(profileImageFile, "image");
    } catch (err) {
      console.error("❌ 이미지 업로드 실패", err);
      alert("이미지 업로드에 실패했습니다.");
      setLoading(false);
      return;
    }
  }

  const formData = new FormData();
  formData.append("id", loginUser.id);
  formData.append("bio", bio);
  formData.append("profileImage", uploadedImageUrl || defaultProfileImg);

  const success = await updateUserProfile(formData, loginUser.id);
  setLoading(false);
  if (success) {
    alert("✅ 프로필이 저장되었습니다!");
    navigate(`/${loginUser.username}`);
  } else {
    alert("❌ 저장 실패");
  }
};


  return (
    <Box maxWidth="600px" mx="auto" mt={6} px={3}>
      <Typography variant="h5" fontWeight="bold" mb={4}>
        프로필 편집
      </Typography>

      {/* 🔵 프로필 이미지 + 사용자 정보 */}
      <Box display="flex" alignItems="center" mb={4}>
        <img
          src={previewUrl}
          alt="프로필 미리보기"
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            objectFit: "cover",
            marginRight: 16,
          }}
        />
        <Box flex="1">
          <Typography fontWeight="bold">{loginUser.username}</Typography>
        </Box>
        <Button variant="contained" component="label">
          사진 변경
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />
        </Button>
      </Box>

      <Divider />

      {/* 🔽 소개 */}
      <Box mt={4}>
        <Typography fontWeight="bold" mb={1}>
          소개
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="자기소개를 입력하세요"
        />
        <Typography
          variant="caption"
          display="block"
          align="right"
          color="text.secondary"
          mt={0.5}
        >
          {bio.length} / 150
        </Typography>
      </Box>

      {/* 저장 버튼 */}
      <Box textAlign="center" mt={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "저장 중..." : "저장"}
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileEdit;
