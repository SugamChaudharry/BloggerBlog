import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button
      className="w-24 border border-blue-400 text-white py-2 rounded-lg hover:bg-gray-700/60"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
