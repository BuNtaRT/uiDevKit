import styled from "@emotion/styled";
import { size } from "../styles/sizeStyles.ts";

export const AppContainer = styled.div<{ color: string }>`
  ${size({ w: "100vw", h: "100vh" })};
  // //background: url("/background.png") no-repeat center center fixed;
  // background-size: cover;
  // transform: scale(1.1);
  // filter: blur(30px);
  // z-index: -1;
  //
  // &:after {
  //   content: "";
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   height: 100%;
  //   background-color: ${({ color }) => color};
  //   z-index: 0;
  // }
`;

export const PageContainer = styled.div`
  height: calc(100vh - 64px);

  overflow-y: auto;
`;
