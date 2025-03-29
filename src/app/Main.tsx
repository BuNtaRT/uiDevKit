import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai";
import { HashRouter } from "react-router-dom";
import App from "./App.tsx";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { ru } from "date-fns/locale/ru";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const queryClient = new QueryClient();

const Main = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
          <HashRouter>
            <App />
          </HashRouter>
        </LocalizationProvider>
      </Provider>
    </QueryClientProvider>
  );
};

export default Main;
