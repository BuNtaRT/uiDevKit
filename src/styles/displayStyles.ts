import { size } from "./sizeStyles";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

/**
 *
 * ------------------------------------------------------------------------------------------
 * ФЛЕКС-КОНТЕЙНЕР
 *
 * -
 *
 * @param props - параметры
 * @param props.gap - отступы между колонками или рядами в зависимости от значения isColumn (number) (не обязательный)
 * @param props.isColumn - если надо разместить элементы в колонку (boolean) (не обязательный)
 * @param props.totalCenter - если надо разместить элементы по центру и по горизонтали и по вертикали (boolean) (не обязательный)
 * @param props.horizontal - выравнивание по горизонтали ("center" | "left" | "right" | "evenly") (не обязательный)
 * @param props.vertical - выравнивание по вертикали ("center" | "top" | "bottom" | "evenly") (не обязательный)
 * @param props.notResize - запрет элементу сужаться (boolean) (не обязательный)
 *
 */

export const flex = (props?: FlexPropsType) => {
  if (!props)
    return css`
      display: flex;
    `;

  const { gap, isColumn = false, totalCenter, horizontal, vertical, notResize = false } = props;

  return css`
    display: flex;

    ${gap ? `gap: ${gap}px` : undefined};

    ${isColumn ? `flex-direction: column` : undefined};

    ${totalCenter ? `justify-content: center; align-items: center` : undefined};

    ${horizontal
      ? `${isColumn ? "align-items" : "justify-content"}: ${
          horizontal === "evenly"
            ? "space-between"
            : horizontal === "left"
              ? "start"
              : horizontal === "right"
                ? "end"
                : "center"
        }`
      : undefined};

    ${vertical
      ? `${isColumn ? "justify-content" : "align-items"}: ${
          vertical === "evenly"
            ? "space-between"
            : vertical === "top"
              ? "start"
              : vertical === "bottom"
                ? "end"
                : "center"
        }`
      : undefined};

    ${notResize ? `flex-shrink: 0` : undefined};
  `;
};

type FlexPropsType = {
  gap?: number;
  isColumn?: boolean;
  totalCenter?: boolean;
  horizontal?: "center" | "left" | "right" | "evenly";
  vertical?: "center" | "top" | "bottom" | "evenly";
  notResize?: boolean;
};

/**
 *
 * ------------------------------------------------------------------------------------------
 * ГРИД-КОНТЕЙНЕР
 *
 * -
 *
 * @param props - параметры
 * @param props.gap - отступы между колонками и рядами (number | `${number} ${number}`) (не обязательный)
 * @param props.columns - ширины столбцов (string) (не обязательный)
 * @param props.autoFlowColumn - автоматическое размещение столбцов (boolean) (не обязательный)
 * @param props.rows - высоты строк (string) (не обязательный)
 * @param props.autoRows - высота неявно созданных строк (number) (не обязательный)
 * @param props.itemsInCenter - выравнивание по горизонтали внутри ячейки (boolean) (не обязательный)
 *
 */

export const grid = (props?: GridPropsType) => {
  if (!props) return flex();

  const { gap, columns, autoFlowColumn, rows, autoRows, itemsInCenter } = props;

  const gapArr = typeof gap === "string" ? gap.split(" ") : undefined;

  return css`
    display: grid;

    ${gap
      ? typeof gap === "string"
        ? `gap: ${gapArr?.[0]}px ${gapArr?.[1]}px`
        : `gap: ${gap}px`
      : undefined};

    ${columns ? `grid-template-columns: ${columns}` : undefined};

    ${rows ? `grid-template-rows: ${rows}` : undefined};

    ${autoRows ? `grid-auto-rows: ${autoRows}px` : undefined};

    ${itemsInCenter ? "align-items: center" : undefined};

    ${autoFlowColumn ? "grid-auto-flow: column" : undefined};
  `;
};

type GridPropsType = {
  gap?: number | `${number} ${number}`;
  columns?: string;
  autoFlowColumn?: boolean;
  rows?: string;
  autoRows?: number;
  itemsInCenter?: boolean;
};

/**
 *
 * ------------------------------------------------------------------------------------------
 * БЛОК С КОЛОНКАМИ ОДНОЙ ШИРИНЫ
 *
 * -
 *
 * @param columns - количество колонок
 *
 */

export const Columns = styled.div<{ columns: number }>`
  ${({ columns }) => grid({ gap: 16, columns: `repeat(${columns}, 1fr)` })};
  ${size({ w: "100%" })};
`;
