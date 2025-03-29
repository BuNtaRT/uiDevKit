import { FC } from "react";
import { Box, Button, Typography } from "@mui/material";

const FileCard: FC<PropsType> = (props) => {
  const { title, file } = props;

  return (
    <Box
      sx={{
        minWidth: "300px", // Фиксированная ширина
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        padding: 2,
        mt: 2,
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Заголовок */}
      <Typography variant="h6" align="center">
        {title}
      </Typography>

      {/* Кнопка для скачивания файла */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          // Открытие файла в новой вкладке или скачивание
          window.open(file, "_blank");
        }}
      >
        Скачать файл
      </Button>
    </Box>
  );
};

type PropsType = {
  title: string;
  file: string;
};

export default FileCard;
