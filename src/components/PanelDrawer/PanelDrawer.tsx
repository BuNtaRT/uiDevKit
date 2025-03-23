import { FC } from "react";
import { Box, Drawer, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const PanelDrawer: FC<PropsType> = (props) => {
  const { isOpen, onClose, label, children } = props;

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Box
        sx={{
          width: 700,
          maxWidth: "700px", // Максимальная ширина для больших экранов
          height: "100%",
          padding: 4,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "background.paper",
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
};

export default PanelDrawer;
