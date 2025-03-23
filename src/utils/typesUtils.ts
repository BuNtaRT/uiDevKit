// ------------------------------ Обертка типа для start и stop

export type StartStopType<T> = { start: T; end: T };

// ------------------------------ Сделать конкретное поле необязательным

export type PartialPicker<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// ------------------------------ Сделать конкретное поле обязательным

export type RequiredPicker<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

// ------------------------------ Сделать только переданные поля обязательными

export type RequiredOne<T, K extends keyof T = keyof T> = K extends keyof T
  ? Required<Pick<T, K>> & Partial<Omit<T, K>>
  : never;

// ------------------------------ Сделать только переданные поля необязательными

export type OptionalOne<T, K extends keyof T = keyof T> = K extends keyof T
  ? Partial<Pick<T, K>> & Required<Omit<T, K>>
  : never;

// ------------------------------ Опции

export type OptionType = { id: string; name: string };

export type OptionsType = OptionType[];
