import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SwaggerPage } from "./pages/SwaggerPage.jsx";
import { RegisterPage } from "./pages/RegisterPage.jsx";
import { MainPage } from "./pages/MainPage.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./index.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RegisterPage />,
  },
  {
    path: "/admin/swagger",
    element: <SwaggerPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/shop/main",
    element: <MainPage />
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
