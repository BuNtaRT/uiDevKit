import { css } from "@emotion/react";

/**
 *
 * ------------------------------------------------------------------------------------------
 * ФЛЕКС-КОНТЕЙНЕР
 *
 * -
 *
 * @param props - параметры
 * @param props.s - размер обеих сторон (если они равны) (SizeType) (не обязательный)
 * @param props.h - высота (SizeType) (не обязательный)
 * @param props.w - ширина (SizeType) (не обязательный)
 * @param props.min - минимальные значения размеров (не обязательный)
 * @param props.min.s - минимальный размер обеих сторон (если они равны) (не обязательный)
 * @param props.min.h - минимальная высота (не обязательный)
 * @param props.min.w - минимальная ширина (не обязательный)
 * @param props.max - максимальные значения размеров (не обязательный)
 * @param props.max.s - максимальный размер обеих сторон (если они равны) (не обязательный)
 * @param props.max.h - максимальная высота (не обязательный)
 * @param props.max.w - максимальная ширина (не обязательный)
 *
 * @description
 * SizeType: number | `${number}%` | `calc(${string})` | `${number}vh` | `${number}vw` | "fit" | "min" | "max" | "auto"
 *
 */

export const size = (props: SizePropsType) => {
    const minHeightValue =
        props.min !== undefined
            ? "s" in props.min
                ? props.min.s
                : "h" in props.min
                    ? props.min.h
                    : undefined
            : undefined;
    const heightValue = "s" in props ? props.s : "h" in props ? props.h : undefined;
    const maxHeightValue =
        props.max !== undefined
            ? "s" in props.max
                ? props.max.s
                : "h" in props.max
                    ? props.max.h
                    : undefined
            : undefined;

    const minWidthValue =
        props.min !== undefined
            ? "s" in props.min
                ? props.min.s
                : "w" in props.min
                    ? props.min.w
                    : undefined
            : undefined;
    const widthValue = "s" in props ? props.s : "w" in props ? props.w : undefined;
    const maxWidthValue =
        props.max !== undefined
            ? "s" in props.max
                ? props.max.s
                : "w" in props.max
                    ? props.max.w
                    : undefined
            : undefined;

    const sizeString = (size: SizeType | undefined) =>
        size !== undefined
            ? typeof size === "number"
                ? `${size}px`
                : size === "fit" || size === "min" || size === "max"
                    ? `${size}-content`
                    : size
            : size;

    const minHeight = sizeString(minHeightValue);
    const height = sizeString(heightValue);
    const maxHeight = sizeString(maxHeightValue);
    const minWidth = sizeString(minWidthValue);
    const width = sizeString(widthValue);
    const maxWidth = sizeString(maxWidthValue);

    return css`
    ${minHeight ? `min-height: ${minHeight}` : undefined};
    ${height ? `height: ${height}` : undefined};
    ${maxHeight ? `max-height: ${maxHeight}` : undefined};

    ${minWidth ? `min-width: ${minWidth}` : undefined};
    ${width ? `width: ${width}` : undefined};
    ${maxWidth ? `max-width: ${maxWidth}` : undefined};

    ${maxWidth ? `max-width: ${maxWidth}` : undefined};

    ${props.borderBox ? `box-sizing: border-box;` : undefined};
  `;
};

type SizePropsType = { borderBox?: boolean } & (
    | ({
    min?: HeightOrWidthType;
    max?: HeightOrWidthType;
} & {
    s: SizeType;
})
    | (
    | {
    min: HeightOrWidthType;
    max?: HeightOrWidthType;
    h?: SizeType;
    w?: SizeType;
}
    | {
    min?: HeightOrWidthType;
    max: HeightOrWidthType;
    h?: SizeType;
    w?: SizeType;
}
    | {
    min?: HeightOrWidthType;
    max?: HeightOrWidthType;
    h: SizeType;
    w?: SizeType;
}
    | {
    min?: HeightOrWidthType;
    max?: HeightOrWidthType;
    h?: SizeType;
    w: SizeType;
}
    )
    );

export type SizeType =
    | number
    | `${number}%`
    | `calc(${string})`
    | `${number}vh`
    | `${number}vw`
    | "fit"
    | "min"
    | "max"
    | "auto";

type HeightOrWidthType =
    | { h: SizeType; w?: SizeType }
    | { h?: SizeType; w: SizeType }
    | {
    s: SizeType;
};
