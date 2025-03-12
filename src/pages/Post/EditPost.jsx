import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetPostDetailApi } from "../../services/Post";
import SkeletonPostForm from "../../components/Skeleton/form";
import PostForm from "../../components/Post/form";


const EditPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    GetPostDetailApi(postId, setPost,navigate);
  }, [postId]);

  return (
    <>
      <title> Edit Post </title>
      {post ? <PostForm existingPost={post} /> : <SkeletonPostForm />}
    </>
  )
};

export default EditPost;
