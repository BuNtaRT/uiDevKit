import { FC } from "react";
import { ModalNotificationType } from "../../atoms/atoms.ts";
import { Box, Button, Modal, Typography } from "@mui/material";
import {
  CheckCircleOutline,
  ErrorOutline,
  InfoOutlined,
  WarningAmberOutlined,
} from "@mui/icons-material";
import { Line } from "../MicroComponents.ts";
import { backgroundsFilter, colors } from "../../styles/colors.ts";

const NotificationModal: FC<PropsType> = (props) => {
  const { data, onClose } = props;

  if (!data) return null;

  const { type, message } = data;
  const name = typeName[type];
  const icon = typeIcon[type];
  const color = typeColor[type];

  const sizeWidth = message.length < 25 ? 400 : 500;

  return (
    <Modal open onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: sizeWidth,
          bgcolor: color,
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
        <Line color={colors.blackHalfOpacity} />

        <Typography
          variant="body1"
          align={message.length < 10 ? "center" : "left"}
          sx={{ mt: 2, mb: 2, whiteSpace: "pre-line" }}
        >
          {message}
        </Typography>

        <Line color={colors.blackHalfOpacity} />

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color={type}
            onClick={onClose}
            sx={{ mt: 3, mx: "auto", minWidth: 300 }}
          >
            Закрыть
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const typeColor = {
  error: "#ffebee",
  info: "#e3f2fd",
  success: "#e8f5e9",
  warning: "#fff8e1",
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
