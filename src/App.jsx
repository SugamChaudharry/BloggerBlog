import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loding, setLoading] = useState(true);
  const dispatch = useDispatch();

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

  return !loding ? (
    <div className="w-screen h-screen overflow-x-hidden bg-gradient-to-t from-gray-900 to-gray-800">
      <div className="w-full">
        <Header />
        <main className="w-full">
          <Outlet />
        </main>
      </div>
    </div>
  ) : null;
}

export default App;
