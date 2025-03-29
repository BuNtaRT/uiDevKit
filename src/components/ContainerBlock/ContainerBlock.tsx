import { FC } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

const ContainerBlock: FC<PropsType> = (props) => {
  const { maxWidth = 500, title, children, titleVariant } = props;
  return (
    <Box sx={{ width: "100%" }}>
      {/* Блок с ограничением ширины и выравниванием по центру */}
      <Card
        sx={{
          margin: "0 auto", // Выравнивание по центру
          maxWidth: maxWidth ? `${maxWidth}px` : "100%", // Максимальная ширина контента
          padding: 2, // Отступы внутри блока
        }}
      >
        {/* Заголовок (если передан) */}
        {title && (
          <Typography variant="h6" gutterBottom align={titleVariant}>
            {title}
          </Typography>
        )}

        <CardContent>{children}</CardContent>
      </Card>
    </Box>
  );
};

type PropsType = {
  maxWidth?: number;
  title?: string;
  children: React.ReactNode;
  titleVariant?: "center" | "left" | "right" | "inherit" | "justify" | undefined;
};

export default ContainerBlock;
