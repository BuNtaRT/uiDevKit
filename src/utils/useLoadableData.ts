import { Atom, useAtomValue } from "jotai";
import { EntitiesResponseType, EntitiesType } from "../api/types";
import { AtomWithQueryResult } from "jotai-tanstack-query";

/**
 *
 * ------------------------------------------------------------------------------------------
 * РАБОТА С ЗАГРУЖАЕМЫМИ ДАННЫМИ
 *
 * @param state - loadable атом
 * @param initialValue - начальное значение
 *
 * @return data - начальное значение или данные (T)
 * @return totalCount - общее количество данных
 * @return loadableData - объект загрузки данных, содержащий статус ("loading" | "hasError" | "hasData"), ошибку, если есть, и данные, если они загрузились (T)
 *
 */

export function useLoadableData<T>(
  state: Atom<Loadable<AtomWithQueryResult<EntitiesResponseType<T> | undefined>>>,
  initialValue: T[]
): DataWithCountType<T>;

export function useLoadableData<T, I>(
  state: Atom<Loadable<AtomWithQueryResult<T>>>,
  initialValue: I
): ResolveType<T> | I;

export function useLoadableData<T, I>(
  state: Atom<Loadable<AtomWithQueryResult<T | undefined>>>,
  initialValue: I | T[]
): ResolveType<T> | I | DataWithCountType<T> {
  const loadableData = useAtomValue(state);
  const isArray = Array.isArray(initialValue);

  if (loadableData.state === "hasData") {
    const data = loadableData.data.data;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (isArray && typeof data === "object" && "items" in data) {
      const items = (data as unknown as EntitiesResponseType<T>).items;
      return {
        data: items,
        totalCount: (data as unknown as EntitiesResponseType<T>)?.totalCount ?? 0,
        loadableData: { state: loadableData.state, data: items },
      };
    } else if (isArray)
      return { data: [], totalCount: 0, loadableData: { state: loadableData.state, data: [] } };

    return data as ResolveType<T>;
  }

  if (isArray) return { data: [], totalCount: 0, loadableData };

  return initialValue as I;
}

type DataWithCountType<T> = {
  data: T[];
  totalCount: number;
  loadableData: Loadable<EntitiesType<T>>;
};

type Loadable<Value> =
  | {
      state: "loading";
    }
  | {
      state: "hasError";
      error: unknown;
    }
  | {
      state: "hasData";
      data: ResolveType<Value>;
    };

type ResolveType<T> = T extends Promise<infer V> ? V : T;
