import styled from "@emotion/styled";
import { flex } from "../../styles/displayStyles.ts";
import { size } from "../../styles/sizeStyles.ts";
import { margins } from "../../styles/marginsStyles.ts";
import { Box, Card, styled as muiStyled } from "@mui/material";
import { borders } from "../../styles/borderStyles.ts";
import { colors } from "../../styles/colors.ts";

export const PaginationContainer = styled.div`
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  background: ${colors.gray};
  padding: 12px;
  border-radius: 12px;
  min-width: 300px;
`;

export const Container = styled.div`
  ${flex({ gap: 24 })};
  ${size({ max: { w: 1400 }, min: { h: "90vh" } })}
  ${margins({ p: "24 24", m: "0 auto" })}
`;

export const LeftPanel = styled.div`
  ${size({ h: "100%", w: 300, min: { w: 300 } })};
  ${borders({ radius: 12 })};
`;

export const Content = styled(Card)`
  ${size({ w: "100%" })};
  ${borders({ radius: 12 })};
  ${margins({ p: "24 24" })}
`;

export const Header = muiStyled(Box)(({ theme }) => ({
  maxWidth: 1352,
  width: "100%",
  backgroundColor: theme.palette.secondary.main,
  minHeight: 64,
  display: "flex",
  position: "sticky",
  padding: 12,
  top: 0,
  placeSelf: "center",
  borderEndEndRadius: 12,
  borderEndStartRadius: 12,
  zIndex: 1,
}));
