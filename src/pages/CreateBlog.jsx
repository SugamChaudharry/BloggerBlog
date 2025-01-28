import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BlogCreation from "../components/BlogCreation";
import BlogDashboard from "../components/BlogDashboard";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { login, logout } from "../store/authSlice";
import { AuthLayout } from "../components";

const CreateBlog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // Get view from URL parameter, default to dashboard if ot present
  const view = searchParams.get("view") || "dashboard";

  useEffect(() => {
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

  const handleViewChange = (newView) => {
    setSearchParams({ view: newView });
  };

  return (
    !loading && (
      <AuthLayout authentication>
        <div>
          {view === "dashboard" ? (
            <BlogDashboard onCreateNew={() => handleViewChange("creation")} />
          ) : (
            <BlogCreation onBack={() => handleViewChange("dashboard")} />
          )}
        </div>
      </AuthLayout>
    )
  );
};

export default CreateBlog;
