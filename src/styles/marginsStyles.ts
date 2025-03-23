import { css } from "@emotion/react";

export const margins = (props: MarginsStylePropsType) => {
  const { m, p, needImportant = false } = props;

  const calculateStr = (str: MarginsType | undefined) => {
    const arr = str?.split(" ");

    return arr
      ?.map((item) =>
        item ? (item === "auto" || item.includes("%") ? `${item}` : `${item}px`) : 0
      )
      .join(" ");
  };

  const margin = calculateStr(m);
  const padding = calculateStr(p);

  return css`
    ${margin ? `margin: ${margin}` : undefined};
    ${padding ? `padding: ${padding} ${needImportant ? "!important" : ""}` : undefined};
  `;
};

type MarginsStylePropsType = {
  m?: MarginsType;
  p?: MarginsType;
  needImportant?: boolean;
};

export type MarginsType =
  | `${MarginType}`
  | `${MarginType} ${MarginType}`
  | `${MarginType} ${MarginType} ${MarginType}`
  | `${MarginType} ${MarginType} ${MarginType} ${MarginType}`;

type MarginType = number | `${number}%` | "auto";
