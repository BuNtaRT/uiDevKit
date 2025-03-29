import { FC } from "react";
import { AppBackground, AppContainer, PageContainer } from "./app.styles.ts";
import { Box, LinearProgress, ThemeProvider } from "@mui/material";
import Header from "../components/Header/Header.tsx";
import { pageRouter } from "../constant/pageRouter.tsx";
import { Route, Routes } from "react-router-dom";
import { useLoadableSingleData } from "../utils/useLoadableData.ts";
import { currentUserState, themeState } from "../atoms/atoms.ts";
import { darkTheme, lightTheme } from "../styles/theme.ts";
import { useAtomValue } from "jotai";

const App: FC = () => {
  const mode = useAtomValue(themeState);

  //накладываем фоновый цвет
  const overlayColor = mode === "dark" ? "rgba(30, 30, 30, 0.85)" : "rgba(255, 255, 255, 0.7)";

  const themeApp = mode === "dark" ? darkTheme : lightTheme;
  const { isLoading } = useLoadableSingleData(currentUserState);

  return (
    <ThemeProvider theme={themeApp}>
      <AppContainer color={overlayColor}>
        <AppBackground />
        {isLoading ? (
          <Box sx={{ width: "100%", mt: 5 }}>
            <LinearProgress />
          </Box>
        ) : (
          <>
            <Header />
            <PageContainer>
              <Routes>
                {pageRouter().map(({ page, path }) => (
                  <Route key={path} path={path} element={page} />
                ))}
              </Routes>
            </PageContainer>
          </>
        )}
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
