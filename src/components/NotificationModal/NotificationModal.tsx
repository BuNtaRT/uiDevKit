import { FC } from "react";
import { ModalNotificationType, themeState } from "../../atoms/atoms.ts";
import { alpha, Box, Button, Divider, Modal, Typography } from "@mui/material";
import {
  CheckCircleOutline,
  ErrorOutline,
  InfoOutlined,
  WarningAmberOutlined,
} from "@mui/icons-material";
import { backgroundsFilter } from "../../styles/colors.ts";
import { useAtomValue } from "jotai";

const NotificationModal: FC<PropsType> = (props) => {
  const { data, onClose } = props;

  const mode = useAtomValue(themeState);

  const isDark = mode === "dark";

  if (!data) return null;

  const { message, type } = data;
  const name = typeName[type];
  const icon = typeIcon[type];
  const color = typeColor[type](isDark);

  const sizeWidth = message.length < 25 ? 400 : 500;

  return (
    <Modal
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: "blur(4px)", // Размытие фона
            backgroundColor: "rgba(0, 0, 0, 0.1)", // Светлый полупрозрачный фон
          },
        },
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      open
      onClose={onClose}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: sizeWidth,
          bgcolor: alpha(color, 0.8),
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            mb: 2,
            color: `${type}.main`,
            background: backgroundsFilter.air,
          }}
        >
          {icon}
          <Typography variant="subtitle1" fontWeight="bold">
            {name}
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />

        <Typography
          variant="body1"
          align={message.length < 10 ? "center" : "left"}
          sx={{ my: 2, whiteSpace: "pre-line" }}
        >
          {message}
        </Typography>

        <Divider sx={{ my: 1 }} />

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color={type}
            onClick={onClose}
            sx={{ mt: 1, mx: "auto", minWidth: 300 }}
          >
            Закрыть
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const typeColor = {
  error: (isDark: boolean) => (isDark ? "#8f7070" : "#ffebee"),
  info: (isDark: boolean) => (isDark ? "#6a7d91" : "#e3f2fd"),
  success: (isDark: boolean) => (isDark ? "#5c855c" : "#e8f5e9"),
  warning: (isDark: boolean) => (isDark ? "#918658" : "#fff8e1"),
};

const typeName = {
  error: "Ошибка",
  info: "Информация",
  success: "Успешно",
  warning: "Предупреждение",
};

const typeIcon = {
  error: <ErrorOutline />,
  info: <InfoOutlined />,
  success: <CheckCircleOutline />,
  warning: <WarningAmberOutlined />,
};

type PropsType = {
  data?: ModalNotificationType;
  onClose: () => void;
};

export default NotificationModal;
