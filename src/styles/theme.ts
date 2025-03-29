import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4a62dc",
    },
    secondary: {
      main: "#aac7ff",
    },
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:focus": {
            outline: "none",
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backdropFilter: "blur(10px)", // Размытие фона
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Светлый полупрозрачный фон
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Легкая тень
          borderRadius: "16px 0 0 16px", // Закругленные углы
          overflow: "hidden", // Убираем артефакты на границах
        },
      },
    },
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
        contained: {
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
        },
        root: {
          "&:focus": {
            outline: "none",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(50px)", // Размытие
          backgroundColor: "rgba(255,254,248,0.7)", // Полупрозрачный фон
          borderRadius: 12,
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)", // Тень
          border: "1px solid rgba(255, 255, 255, 0.3)", // Граница
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({
          backdropFilter: "blur(10px)", // Эффект размытия
          backgroundColor: "rgba(0, 0, 0, 0)", // Полупрозрачный фон#1976d2
          backgroundImage: `linear-gradient(to bottom, ${theme.palette.primary.main}fc, ${theme.palette.primary.main}db)`, // Градиент вниз
          boxShadow: "none", // Убираем тень
        }),
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(10px)", // Дополнительное размытие
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          "& .MuiTable-body": {
            "& .MuiTableRow-hover:hover": {
              backgroundColor: "#f0f4ff", // Подсветка при наведении
            },
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#f5f5f5", // Светлый фон для заголовков
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: "bold", // Жирный текст для заголовков
          padding: "12px", // Более щадящий отступ
        },
        body: {
          padding: "12px", // Отступ для ячеек
          borderBottom: "1px solid #e0e0e0", // Тонкая граница между строками
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Тень вокруг контейнера таблицы
          borderRadius: "8px", // Закругленные углы
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

export const darkTheme = createTheme({
  palette: {
    mode: "dark", // Указываем режим "dark"
    primary: {
      main: "#3b46a1", // Основной цвет остаётся таким же
    },
    secondary: {
      main: "#7282b1", // Вторичный цвет адаптирован для тёмной темы
    },
    background: {
      default: "#121212", // Основной фон
      paper: "#1e1e1e", // Фон карточек и других элементов
    },
    text: {
      primary: "#ffffff", // Основной текст (белый)
      secondary: "#bdbdbd", // Вторичный текст (светло-серый)
    },
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:focus": {
            outline: "none",
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backdropFilter: "blur(10px)", // Размытие фона
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Светлый полупрозрачный фон
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Легкая тень
          borderRadius: "16px 0 0 16px", // Закругленные углы
          overflow: "hidden", // Убираем артефакты на границах
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
          backgroundColor: theme.palette.primary.main, // Заполненный фон
          color: "#fff", // Белый текст
          fontWeight: "bold", // Жирный текст
          borderRadius: 16, // Скругленные углы
          padding: "4px 12px", // Отступы внутри чипса
          "&:hover": {
            backgroundColor: theme.palette.primary.dark, // Темнее при наведении
          },
        }),
        outlined: ({ theme }) => ({
          borderColor: theme.palette.primary.main, // Цвет границы для outlined
          color: "white", // Цвет текста для outlined
          "&:hover": {
            backgroundColor: theme.palette.primary.main, // Легкий фон при наведении
          },
        }),
        filled: ({ theme }) => ({
          backgroundColor: theme.palette.secondary.main, // Фон для filled
          color: "#fff", // Белый текст
        }),
      },
    },
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
        contained: {
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
        },
        root: {
          "&:focus": {
            outline: "none",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(50px)", // Размытие
          backgroundColor: "rgba(30, 30, 30, 0.7)", // Полупрозрачный фон
          borderRadius: 12,
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)", // Более тёмная тень
          border: "1px solid rgba(255, 255, 255, 0.1)", // Граница с низкой прозрачностью
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({
          backdropFilter: "blur(10px)", // Эффект размытия
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Полупрозрачный фон
          backgroundImage: `linear-gradient(to bottom, ${theme.palette.primary.main}fc, ${theme.palette.primary.main}99)`, // Градиент вниз
          boxShadow: "none", // Убираем тень
        }),
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(10px)", // Дополнительное размытие
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          "& .MuiTable-body": {
            "& .MuiTableRow-hover:hover": {
              backgroundColor: "#303030", // Подсветка при наведении
            },
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#212121", // Тёмный фон для заголовков
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: "bold", // Жирный текст для заголовков
          color: "#ffffff", // Белый текст для заголовков
          padding: "12px", // Более щадящий отступ
        },
        body: {
          color: "#bdbdbd", // Вторичный текст (светло-серый)
          padding: "12px", // Отступ для ячеек
          borderBottom: "1px solid #424242", // Тонкая граница между строками
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)", // Более тёмная тень
          borderRadius: "8px", // Закругленные углы
        },
      },
    },
  },
});
