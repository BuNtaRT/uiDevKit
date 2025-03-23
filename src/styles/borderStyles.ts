import {css} from "@mui/material";


export const borders = (props: PropsType) => {
    const { side, width, style = "solid", color, none = false, radius, totalRadius = false } = props;

    return css`
    ${color ? `border${side ? `-${side}` : ""}: ${width ?? 1}px ${style} ${color}` : undefined};

    ${none
        ? `border${typeof none === "string" ? `-${none}` : ""}: none;  outline: none`
        : undefined};

    ${radius ? `border-radius: ${typeof radius === "number" ? `${radius}px` : radius}` : undefined};

    ${totalRadius ? "border-radius: 99em" : undefined};
  `;
};

type PropsType = {
    side?: SideType;
    width?: number;
    color?: string;
    style?: "solid" | "dashed";
    none?: SideType | boolean;
    radius?: number | `${number}%`;
    totalRadius?: boolean;
};

type SideType = "top" | "bottom" | "left" | "right";
