import React from "react";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { username } = useParams();

  return (
    <div>
      <h1>{username}의 프로필</h1>
    </div>
  );
}
