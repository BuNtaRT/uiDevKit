import { OptionsType } from "./typesUtils.ts";

export const mapFromOptions = (options: OptionsType) =>
  new Map(options.map(({ id, name }) => [id, name]));
