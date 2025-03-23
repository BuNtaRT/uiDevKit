import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai";
import { theme } from "../styles/theme.ts";
import { ThemeProvider } from "@mui/material";
import { HashRouter } from "react-router-dom";
import App from "./App.tsx";

const queryClient = new QueryClient();

const Main = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <ThemeProvider theme={theme}>
          <HashRouter>
            <App />
          </HashRouter>
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  );
};

export default Main;
