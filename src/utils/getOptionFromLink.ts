import { SelfLinkType } from "../api/types.ts";
import { OptionType } from "./typesUtils.ts";

export const getOptionFromLink = <KEY extends keyof LO, LO extends SelfLinkType>(
  item: LO,
  key: KEY
): OptionType => {
  // Извлекаем name из объекта item по ключу
  const name = item[key] as string;

  // Извлекаем href из _links.self
  const id = item._links.self.href;

  // Возвращаем объект OptionType
  return {
    id,
    name,
  };
};
