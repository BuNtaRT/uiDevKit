import { FC } from "react";
import { AppContainer, PageContainer } from "./app.styles.ts";
import { useTheme } from "@mui/material";
import Header from "../components/Header/Header.tsx";
import { pageRouter } from "../constant/pageRouter.tsx";
import { Route, Routes } from "react-router-dom";

const App: FC = () => {
  const theme = useTheme(); // Получаем текущую тему MUI

  //накладываем фоновый цвет
  const overlayColor =
    theme.palette.mode !== "dark" ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.7)";

  return (
    <AppContainer color={overlayColor}>
      <Header />
      <PageContainer>
        <Routes>
          {pageRouter().map(({ page, path }) => (
            <Route key={path} path={path} element={page} />
          ))}
        </Routes>
      </PageContainer>
    </AppContainer>
  );
};

export default App;
