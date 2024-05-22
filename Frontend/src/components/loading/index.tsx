import { CircularProgress } from "@mui/material";
import React from "react";
import "./loading.scss";

const Loading: React.FC = () => {
  return (
    <div className="loading-contaier">
      <CircularProgress />
    </div>
  );
};

export default Loading;
