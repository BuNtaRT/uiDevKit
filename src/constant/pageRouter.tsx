import { lazy } from "react";
import NotFoundPage from "../pages/notFound/NotFoundPage.tsx";
import * as routes from "./routes.ts";
const LoginPage = lazy(() => import(`../pages/login/LoginPage.tsx`));

import { Navigate } from "react-router-dom";

export const pageRouter = () => {
  return [
    { path: routes.login, page: <LoginPage /> },
    { path: "*", page: <NotFoundPage /> },
    { path: "/", page: <Navigate to={routes.login} /> },
  ];
};
