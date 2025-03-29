import { Atom, useAtomValue } from "jotai";
import { EntitiesResponseType } from "../api/types";
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
  state: Atom<AtomWithQueryResult<EntitiesResponseType<T> | undefined>>,
  initialValue: T[]
): DataWithCountType<T> {
  const loadableData = useAtomValue(state);

  if (loadableData.fetchStatus === "idle") {
    const data = loadableData.data;

    if (typeof data === "object" && "items" in data) {
      const items = (data as unknown as EntitiesResponseType<T>).items;
      return {
        data: items,
        totalCount: (data as unknown as EntitiesResponseType<T>)?.totalCount ?? 0,
        isLoading: false,
      };
    } else
      return {
        data: [],
        totalCount: 0,
        isLoading: false,
      };
  }
  return {
    data: initialValue as T[],
    totalCount: 0,
    isLoading: loadableData.fetchStatus === "fetching",
  };
}

export function useLoadableSingleData<T>(state: Atom<AtomWithQueryResult<T>>): DataSingleType<T> {
  const loadableData = useAtomValue(state);

  console.log(loadableData);
  if (loadableData.fetchStatus === "idle") {
    const data = loadableData.data;

    return { data: data as ResolveType<T>, isLoading: false };
  }

  return {
    data: undefined,
    isLoading: loadableData.fetchStatus === "fetching",
  };
}

type DataWithCountType<T> = {
  data: T[];
  totalCount: number;
  isLoading: boolean;
};

type DataSingleType<T> = {
  data: ResolveType<T> | undefined;
  isLoading: boolean;
};

type ResolveType<T> = T extends Promise<infer V> ? V : T;
