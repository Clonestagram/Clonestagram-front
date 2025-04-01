import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { FollowDto } from "../api/fetchFollowList"; // FollowDto 타입 import
import { fetchFollowState } from "../api/fetchFollowState";

interface FollowerDialogProps {
    open: boolean;
    onClose: () => void;
    title: string;
    fetchFn: () => Promise<FollowDto[]>;
    onCountChange?: (delta: number, type: "follower" | "following") => void;
  }
  
  const FollowerDialog: React.FC<FollowerDialogProps> = ({
    open,
    onClose,
    title,
    fetchFn,
    onCountChange,
  }) => {
    const [followList, setFollowList] = useState<FollowDto[]>([]);
    const [search, setSearch] = useState("");
    const [isFollowingMap, setIsFollowingMap] = useState<Record<string, boolean>>({});
  
    const handleFollowToggle = async (item: FollowDto) => {
        const followerId = item.followerId;
        const followedId = item.followedId;
      
        const wasFollowing = isFollowingMap[followedId]; // 이전 상태
        const success = await fetchFollowState(followerId, followedId); // 토글 요청
      
        if (!success) return;
      
        if (title === "팔로워") {
          // 팔로워 관계는 삭제만
          setFollowList((prev) => prev.filter((f) => f.followerId !== item.followerId));
          onCountChange?.(-1, "follower");
        } else {
          // 팔로잉 버튼 상태 토글
          setIsFollowingMap((prev) => ({
            ...prev,
            [followedId]: !wasFollowing,
          }));
      
          // 카운트 증감
          const delta = wasFollowing ? -1 : +1;
          onCountChange?.(delta, "following");
        }
      };
      
  
    const fetchData = async () => {
      const data = await fetchFn();
      const parsed = data.map((f) => ({
        ...f,
        id: f.userId.toString(),
        fromUserId: f.followerId.toString(),
        toUserId: f.followedId.toString(),
      }));
      setFollowList(parsed);
  
      // 팔로잉 여부 초기화 (팔로잉 다 true)
      if (title === "팔로잉") {
        const initialMap: Record<string, boolean> = {};
        parsed.forEach((item) => {
          initialMap[item.toUserId] = true;
        });
        setIsFollowingMap(initialMap);
      }
    };
  
    useEffect(() => {
      if (open) fetchData();
    }, [open]);
  
    const filteredList = followList.filter((item) => {
      const targetName = title === "팔로워" ? item.followerName : item.followedName;
      return targetName.toLowerCase().includes(search.toLowerCase());
    });
  
    const getUsername = (item: FollowDto) =>
      title === "팔로워" ? item.followerName : item.followedName;
  
    const getProfileImage = (item: FollowDto) =>
      title === "팔로워" ? item.followerProfileimg : item.followedProfileImg;
  
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
        <DialogTitle>
          {title}
          <IconButton onClick={onClose} style={{ position: "absolute", right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
  
        <DialogContent>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon style={{ marginRight: 8 }} />,
            }}
            sx={{ mb: 2 }}
          />
  
          <List>
            {filteredList.map((item) => (
              <ListItem key={item.userId} secondaryAction={
                <Button
                  variant={title === "팔로워" ? "outlined" : isFollowingMap[item.followedId] ? "contained" : "outlined"}
                  color={title === "팔로워" ? "error" : "primary"}
                  onClick={() => handleFollowToggle(item)}
                >
                  {title === "팔로워"
                    ? "삭제"
                    : isFollowingMap[item.followedId] ? "팔로잉" : "팔로우"}
                </Button>
              }>
                <ListItemAvatar>
                  <Avatar src={getProfileImage(item)} />
                </ListItemAvatar>
                <ListItemText primary={getUsername(item)} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default FollowerDialog;
  