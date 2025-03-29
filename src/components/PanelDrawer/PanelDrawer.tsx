import { FC } from "react";
import { alpha, Box, Drawer, IconButton, Typography, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const PanelDrawer: FC<PropsType> = (props) => {
  const { isOpen, onClose, label, children, width } = props;

  const theme = useTheme();

  return (
    <Drawer
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: "blur(4px)", // Размытие фона
            backgroundColor: "rgba(0, 0, 0, 0.1)", // Светлый полупрозрачный фон
          },
        },
        paper: {
          sx: {
            backgroundColor: "transparent",
          },
        },
      }}
      anchor="right"
      open={isOpen}
      onClose={onClose}
    >
      <Box
        sx={{
          width: width ?? 700,
          height: "100%",
          padding: 4,
          display: "flex",
          flexDirection: "column",
          backgroundColor: alpha(theme.palette.background.paper, 0.8),
        }}
      >
        {/* Заголовок и кнопка закрытия */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <Typography variant="h6">{label}</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Содержимое бокового окна */}
        {children}
      </Box>
    </Drawer>
  );
};

type PropsType = {
  isOpen: boolean;
  onClose: () => void;
  label: string;
  children: React.ReactNode;
  width?: number;
};

export default PanelDrawer;
