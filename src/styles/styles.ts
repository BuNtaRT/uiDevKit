import { css } from "@emotion/react";
import { colors } from "./colors";

const { blackOpacity } = colors;

export const overflowOneLine = css`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const overflowLines = (lines: number) => css`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: ${lines};
  -webkit-box-orient: vertical;
`;

export const shadow = `0 0 2px ${blackOpacity}, 0 2px 24px ${blackOpacity}`;
