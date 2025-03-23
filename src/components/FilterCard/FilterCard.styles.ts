import styled from "@emotion/styled";
import { size } from "../../styles/sizeStyles.ts";
import { Card } from "@mui/material";
import { margins } from "../../styles/marginsStyles.ts";
import { flex } from "../../styles/displayStyles.ts";
import { borders } from "../../styles/borderStyles.ts";

export const FormContainer = styled.div`
  ${size({ h: "100%", w: 300 })};
`;

export const Filters = styled(Card)`
  ${size({ h: "100%", w: 300, min: { h: 400 } })};
  ${margins({ p: "24 12" })}
  ${flex({ gap: 6, isColumn: true })};
  ${borders({ radius: 12 })};
`;
