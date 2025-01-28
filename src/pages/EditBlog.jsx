import { useState, useEffect } from "react";
import { AuthLayout } from "../components";
import appwriteService from "../appwrite/config";
import { useParams, useNavigate } from "react-router-dom";
import BlogCreation from "../components/BlogCreation";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "../store/authSlice";

function EditBlog() {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);
  useEffect(() => {
    if (slug) {
      setLoading(true);
      appwriteService
        .getPost(slug)
        .then((post) => {
          if (post) {
            setPost(post);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setLoading(false));
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return !loading ? (
    <div className="w-full h-full">
      <AuthLayout authentication>
        {post.title ? (
          <BlogCreation post={post} onBack={() => navigate("/blog/" + slug)} />
        ) : (
          <div className="">Loading ....</div>
        )}
      </AuthLayout>
    </div>
  ) : (
    <div className="">Loading ....</div>
  );
}

export default EditBlog;
