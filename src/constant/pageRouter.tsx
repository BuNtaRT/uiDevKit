import NotFoundPage from "../pages/notFound/NotFoundPage.tsx";
import * as routes from "./routes.ts";
import LoginPage from "../pages/login/LoginPage.tsx";

export const pageRouter = () => {
  return [
    { path: "*", page: <NotFoundPage /> },
    { path: routes.login, page: <LoginPage /> },
  ];
};
