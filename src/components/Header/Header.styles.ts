import { Box, Toolbar } from "@mui/material";
import styled from "@emotion/styled";
import { flex, grid } from "../../styles/displayStyles.ts";

export const Bar = styled(Toolbar)`
  ${grid({ columns: "40px 1fr 40px 150px" })};
  justify-content: center;
  justify-items: center;
`;

export const SectionsContainer = styled(Box)`
  ${flex({ gap: 6 })};
`;
