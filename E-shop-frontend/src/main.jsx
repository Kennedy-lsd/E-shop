import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SwaggerPage } from "./pages/SwaggerPage.jsx";
import { RegisterPage } from "./pages/RegisterPage.jsx";
import { MainPage } from "./pages/MainPage.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { ProductDetailsPage } from "./pages/ProductDetailsPage.jsx";
import { CreateProductPage } from "./pages/CreateProductPage.jsx";
import { UserProfile } from "./User/UserProfile.jsx";
import "bootstrap/dist/css/bootstrap.min.css"; 
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
  },
  {
    path: "/shop/main/create",
    element: <CreateProductPage />
  },
  {
    path: "/shop/main/details/:productId",
    element: <ProductDetailsPage />
  },
  {
    path: "/shop/main/user/:userId",
    element: <UserProfile />
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
