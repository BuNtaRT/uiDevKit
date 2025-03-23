import { FC } from "react";
import { Container, Grid2, Paper, Typography } from "@mui/material";
import { StyledBox, StyledButton, StyledTypography } from "./notFound.styles.ts";
import { useNavigate } from "react-router-dom";

const NotFoundPage: FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Grid2 container justifyContent="center" alignItems="center">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
          <StyledBox>
            <StyledTypography variant="h1">404</StyledTypography>
            <Typography variant="h5" gutterBottom>
              Страница не найдена!
            </Typography>
            <Typography variant="body1">
              Страница, которую вы ищете, могла быть удалена, ее название могло быть изменено или
              она временно недоступна.
            </Typography>
            <StyledButton variant="contained" color="primary" onClick={() => navigate("/")}>
              На главную
            </StyledButton>
          </StyledBox>
        </Paper>
      </Grid2>
    </Container>
  );
};

export default NotFoundPage;
