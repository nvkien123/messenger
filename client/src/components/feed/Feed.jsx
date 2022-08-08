import { useContext, useEffect, useState } from "react";
import Share from "../share/Share";
import "./feed.css";
import { AuthContext } from "../../context/AuthContext";

export default function Feed() {
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />     
      </div>
    </div>
  );
}
