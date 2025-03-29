import { FC, ReactNode } from "react";
import { Divider, Typography } from "@mui/material";

const ParagraphLine: FC<PropsType> = (props) => {
  const { title, children, align = "left" } = props;

  return (
    <>
      <Typography variant="h6" align={align} sx={{ mb: 1, mt: 3 }}>
        {title}
      </Typography>
      <Divider sx={{ my: 2 }} />
      {children}
    </>
  );
};

type PropsType = {
  title?: string;
  align?: "left" | "right" | "center" | "inherit" | "justify";
  children?: ReactNode;
};

export default ParagraphLine;
