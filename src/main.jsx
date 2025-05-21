import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthLayout } from "./components/index.js";
import {
  CreateBlog,
  Explore,
  EditBlog,
  Home,
  Login,
  Post,
  Signup,
  Profile,
} from "./pages/index.js";
import { Analytics } from "@vercel/analytics/next"
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/explore",
        element: (
          <AuthLayout authentication>
            {" "}
            <Explore />
          </AuthLayout>
        ),
      },
      {
        path: "/profile",
        element: (
          <AuthLayout authentication>
            {" "}
            <Profile />
          </AuthLayout>
        ),
      },
      {
        path: "/blog/:slug",
        element: (
          <AuthLayout authentication>
            <Post />,
          </AuthLayout>
        ),
      },
    ],
  },
  {
    path: "/create-blog",
    element: <CreateBlog />,
  },
  {
    path: "/edit-blog/:slug",
    element: <EditBlog />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Analytics />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
