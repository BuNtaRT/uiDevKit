import * as dateFns from "date-fns";

const { format, parse, parseISO } = dateFns;

/**
 *
 * ------------------------------------------------------------------------------------------
 * **ФОРМАТИРОВАНИЕ ДАТЫ**
 *
 * *Форматирует дату в зависимости от типа форматирования, указанного в параметрах*
 *
 * -
 *
 * @param props - параметры
 * @param props.date - дата, которую необходимо отформатировать (строка или объект типа Date)
 * @param props.type - тип форматирования
 * @returns отформатированное значение в зависимости от указанного типа
 *
 * @description
 * *props.type* может быть одним из следующих:
 * - "object" - для получения объекта Date
 * - "forFrontend" - для получения даты в формате дд.ММ.гггг
 * - "forBackend" - для получения даты в формате гггг-ММ-дд
 * - "bigDate" - для получения даты с временем гггг-ММ-ддT00:00:00.000
 *
 */

export const formatDate = <T extends TypeType>(props: FormatDatePropsType<T>) => {
  const { date, type } = props;

  const dateIsString = typeof date === "string";
  const dateIncludesT = dateIsString && date.includes("T");
  const dateIncludesDash = dateIsString && date.includes("-");

  const fMask = "dd.MM.yyyy";
  const bMask = "yyyy-MM-dd";

  const dateObject = dateIsString
    ? dateIncludesT
      ? parseISO(date)
      : parse(date, dateIncludesDash ? bMask : fMask, new Date())
    : date;

  const dateForFrontend = format(dateObject, fMask);
  const dateForBackend = format(dateObject, bMask);

  return (
    type === "object"
      ? dateObject
      : type === "forFrontend"
        ? dateForFrontend
        : type === "bigDate"
          ? `${dateForBackend}T00:00:00.000`
          : dateForBackend
  ) as FormatDateResultType<T>;
};

type FormatDatePropsType<T> = {
  date: DateType;
  type: T;
};

export type FormatDateResultType<T> = T extends "object"
  ? Date
  : T extends "forFrontend"
    ? FrontendDateType
    : T extends "bigDate"
      ? BigBackendDateType
      : BackendDateType;

export type TypeType = "object" | "forFrontend" | "forBackend" | "bigDate";

export type DateType = Date | FrontendDateType | BackendDateType | BigBackendDateType;

export type FrontendDateType =
  `${number}${number}.${number}${number}.${number}${number}${number}${number}`;
export type BackendDateType =
  `${number}${number}${number}${number}-${number}${number}-${number}${number}`;
export type BigBackendDateType =
  `${BackendDateType}T${number}${number}:${number}${number}:${number}${number}.${number}${number}${number}`;
