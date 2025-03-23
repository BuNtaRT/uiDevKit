import { Card, styled } from "@mui/material";
import { margins } from "../../styles/marginsStyles.ts";
import { size } from "../../styles/sizeStyles.ts";

export const Container = styled(Card)`
  ${margins({ p: "6" })};
  ${size({ min: { w: 400, h: 300 }, max: { w: 400, h: 300 } })};
`;
