import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title,discription, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
          <div className="w-[35vw] my-6 items-center">
          <img
            src={appwriteService.getFileURL(featuredImage)}
            alt={title}
          />
          <p className="text-3xl text-start">{title}</p>
          <p className="text-lg text-start">{discription}</p>
          </div>

    </Link>
  );
}

export default PostCard;
