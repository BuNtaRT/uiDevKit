import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { FC } from "react";
import { useLoginPage } from "./useLoginPage.ts";
import TextFieldRhf from "../../components/TextFieldRHF/TextFieldRHF.tsx";
import Form from "../../components/Form/Form.tsx";

const LoginPage: FC = () => {
  const formMethods = useLoginPage();

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Вход
          </Typography>

          {/* Форма */}
          <Form methods={formMethods}>
            <TextFieldRhf name="login" label="Логин" />
            <TextFieldRhf name="password" label="Пароль" type="password" />

            {/* Кнопка входа */}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Войти
            </Button>
          </Form>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
