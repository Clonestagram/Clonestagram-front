import React, { useRef, useState, useEffect } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "/src/styles/styles.css";
import { handleImageSubmit } from "../handlers/imageUploadHandler";
import { handleVideoSubmit } from "../handlers/videoUploadHandler";
import { useLoginUser } from "../hooks/useLoginUser";
import { uploadTriggerState } from "../recoil/uploadTriggerAtom";
import { useRecoilState } from "recoil";

const filterOptions = [
  { name: "원본", value: "none" },
  { name: "Grayscale", value: "grayscale(1)" },
  { name: "Sepia", value: "sepia(1)" },
  { name: "Invert", value: "invert(1)" },
  { name: "Brightness", value: "brightness(1.2)" },
  { name: "Contrast", value: "contrast(1.5)" },
  { name: "Hue Rotate", value: "hue-rotate(90deg)" },
];

const Upload = () => {
  const [trigger, setTrigger] = useRecoilState(uploadTriggerState);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("none");
  const [step, setStep] = useState<"null"|"upload" | "preview" | "filter" | "form">("null");
  const [caption, setCaption] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const { loginUser } = useLoginUser();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      const url = URL.createObjectURL(selected);
      setFile(selected);
      setImageURL(url);
      setFilter("none");
      setStep("preview");
    }
  };

  const handlePostSubmit = () => {
    if (!file || !imageURL) {
      alert("파일 또는 이미지가 유효하지 않습니다.");
      return;
    }
    if (file.type.startsWith("video")) {
      handleVideoSubmit(file, caption, () => {
        // alert("게시물이 저장되었습니다!");
        setStep("upload");
        setImageURL(null);
        setCaption("");
        setFile(null);
      });
    } else {
      if (loginUser) {
        handleImageSubmit(file, imageURL, canvasRef.current!, filter, caption, loginUser.id, () => {
          // alert("게시물이 저장되었습니다!");
          setStep("upload");
          setImageURL(null);
          setCaption("");
          setFile(null);
        },
        setTrigger);
      } else {
        alert("로그인이 필요합니다.");
      }
    }
  };

  useEffect(() => {
    if (videoRef.current && imageURL) {
      videoRef.current.src = imageURL;
    }
  }, [imageURL]);

  return (
    <div className="upload-box">

      {step === "null" && (
        <div className="upload-content">
          <CloudUploadIcon style={{ fontSize: 64, color: "#aaa" }} />
          <p>사진 또는 동영상을 업로드하세요</p>
          <button onClick={() => fileInputRef.current?.click()} className="upload-btn">
            컴퓨터에서 선택
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*,video/*"
            onChange={handleFileChange}
          />
        </div>
      )}

      {step === "preview" && imageURL && (
        <div className="preview-container">
          {file?.type.startsWith("video") ? (
            <video ref={videoRef} controls className="preview-media" />
          ) : (
            <img
              src={imageURL}
              alt="미리보기"
              className="preview-media"
              style={{ filter }}
            />
          )}
          <button className="next-button" onClick={() => setStep(file?.type.startsWith("video") ? "form" : "filter")}>
            다음
          </button>
        </div>
      )}

      {step === "filter" && imageURL && (
        <div className="filter-step">
          <div className="left-preview">
            <img
              src={imageURL}
              alt="preview"
              className="preview-media"
              style={{ filter }}
            />
          </div>
          <div className="right-filters">
            <h3>필터</h3>
            <div className="filter-list">
              {filterOptions.map((f) => (
                <div
                  key={f.name}
                  className={`filter-thumbnail ${filter === f.value ? "selected" : ""}`}
                  onClick={() => setFilter(f.value)}
                >
                  <img src={imageURL} alt={f.name} style={{ filter: f.value }} />
                  <span>{f.name}</span>
                </div>
              ))}
            </div>
            <button className="next-button" onClick={() => setStep("form")}>다음</button>
          </div>
        </div>
      )}

      {step === "form" && (
        <div className="post-form">
          <div className="left-preview">
            {file?.type.startsWith("video") ? (
              <video ref={videoRef} controls className="preview-media" />
            ) : (
              <img src={imageURL!} alt="filtered" style={{ filter }} className="preview-media" />
            )}
          </div>
          <div className="right-form">
            <textarea
              placeholder="문구를 입력하세요..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={5}
              className="caption-input"
            />
            <button onClick={handlePostSubmit} className="upload-btn">
              공유하기
            </button>
          </div>
        </div>
      )}
      
      {step === "upload" && (
          <div className="upload-message">
              <p>게시물이 저장되었습니다</p>
          </div>
      )}

      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </div>
  );
};

export default Upload;
