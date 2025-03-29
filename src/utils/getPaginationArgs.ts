import { Getter } from "jotai/vanilla/typeUtils";
import { pageState } from "../atoms/atoms.ts";

export const getPaginationArgs = (get: Getter) => {
  const page = get(pageState);
  return {
    page: page - 1,
    size: 15,
  };
};
