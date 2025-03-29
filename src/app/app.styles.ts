import styled from "@emotion/styled";
import { size } from "../styles/sizeStyles.ts";

export const AppContainer = styled.div<{ color: string }>`
  ${size({ w: "100vw", h: "100vh" })};
  background-color: ${({ color }) => color};
`;

export const AppBackground = styled.div`
  ${size({ w: "100vw", h: "100vh" })};

  position: absolute;
  background: url("/background.png") no-repeat center center fixed;
  background-size: cover;
  transform: scale(1.1);
  filter: blur(30px);
  z-index: -1;
`;

export const PageContainer = styled.div`
  height: calc(100vh - 64px);

  overflow-y: auto;
`;
