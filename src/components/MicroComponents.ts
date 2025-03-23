import styled from "@emotion/styled";
import { size } from "../styles/sizeStyles.ts";
import { borders } from "../styles/borderStyles.ts";
import { colors } from "../styles/colors.ts";
import { margins } from "../styles/marginsStyles.ts";

const { gray } = colors;

export const Line = styled.div<{ margin?: number; color?: string }>`
  ${({ margin }) => (margin ? margins({ m: `${margin} 0` }) : "")}
  ${size({ w: "100%", h: 1 })};
  ${({ color }) => borders({ width: 1, color: color ? color : gray })};
`;
