import { Box, Button, styled, Typography } from "@mui/material";

// Анимированная обертка для текста
export const StyledBox = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(8),
  background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.main})`,
  color: "#fff",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[10],
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "6rem",
  letterSpacing: "2px",
  textShadow: `2px 2px 4px ${theme.palette.common.black}`,
  marginBottom: theme.spacing(2),
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(1, 4),
  fontSize: "1rem",
  fontWeight: "bold",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: theme.shadows[6],
  },
}));
