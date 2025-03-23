import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    secondary: {
      main: "#afdafb",
    },
  },
  components: {
    MuiToggleButton: {
      styleOverrides: {
        root: {
          "&:focus": {
            outline: "none",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&:focus": {
            outline: "none",
          },
        },
      },
    },
  },
  // components: {
  //   MuiPaper: {
  //     styleOverrides: {
  //       root: {
  //         background: "rgba(255, 255, 255, 0.6)",
  //         backdropFilter: "blur(10px)",
  //         borderRadius: "8px",
  //         boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  //       },
  //     },
  //   },
  //   MuiSwitch: {
  //     styleOverrides: {
  //       root: {
  //         width: 42,
  //         height: 26,
  //         padding: 0,
  //         margin: 8,
  //       },
  //       switchBase: {
  //         padding: 1,
  //         "&$checked, &$colorPrimary$checked, &$colorSecondary$checked": {
  //           transform: "translateX(16px)",
  //           color: "#fff",
  //           "& + $track": {
  //             opacity: 1,
  //             border: "none",
  //           },
  //         },
  //       },
  //       thumb: {
  //         width: 24,
  //         height: 24,
  //       },
  //       track: {
  //         borderRadius: 13,
  //         border: "1px solid #bdbdbd",
  //         backgroundColor: "#fafafa",
  //         opacity: 1,
  //         transition:
  //           "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  //       },
  //     },
  //   },
  // },
});
