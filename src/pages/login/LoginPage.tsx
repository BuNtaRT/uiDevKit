import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { FC } from "react";
import { useLoginPage } from "./useLoginPage.ts";
import TextFieldRhf from "../../components/TextFieldRHF/TextFieldRHF.tsx";
import Form from "../../components/Form/Form.tsx";
import Logo from "../../components/Logo.tsx";
import { colors } from "../../styles/colors.ts";
import { useAtomValue } from "jotai/index";
import { themeState } from "../../atoms/atoms.ts";

const LoginPage: FC = () => {
  const formMethods = useLoginPage();
  const mode = useAtomValue(themeState);

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 8,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 4,
          backdropFilter: "blur(50px)", // Размытие
          backgroundColor: mode === "dark" ? "rgba(0,0,0,0.6)" : "rgba(255,254,248,0.5)", // Полупрозрачный фон
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)", // Тень
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Logo color={mode === "light" ? colors.black : colors.white} size={200} />
          <Typography variant="h4" align="center" gutterBottom>
            Вход в систему обучения сварочному делу
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
