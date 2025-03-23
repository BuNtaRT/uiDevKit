import { AxiosResponse } from "axios";
import { EntitiesResponseType } from "../api/types.ts";

/**
 *
 * ------------------------------------------------------------------------------------------
 * **ПОЛУЧЕНИЕ ДАННЫХ**
 *
 * @template T - тип возвращаемых данных
 * @param getAll - функция, возвращающая промис с данными
 * @returns Промис, который разрешается в данные (`data`), возвращённые функцией `getAll`
 *
 */

export const fetchAll = async <T>(getAll: GetAllType<T>) => (await getAll()).data;

type GetAllType<T> = () => Promise<AxiosResponse<EntitiesResponseType<T>>>;

/**
 *
 * ------------------------------------------------------------------------------------------
 * **ПОЛУЧЕНИЕ СПИСКА ИЗ ДАННЫХ**
 *
 * @template T - тип элементов списка
 * @param getAll - функция, возвращающая промис с данными, содержащими список `items`
 * @returns Промис, который разрешается в массив элементов `items`
 *
 */

export const fetchItems = async <T>(getAll: GetAllItemsType<T>) => (await getAll()).data.items;

type GetAllItemsType<T> = () => Promise<AxiosResponse<Pick<EntitiesResponseType<T>, "items">>>;

/**
 *
 * ------------------------------------------------------------------------------------------
 * **ПОЛУЧЕНИЕ КОЛИЧЕСТВА ЭЛЕМЕНТОВ**
 *
 * @template T - тип возвращаемых данных
 * @param getAll - функция, возвращающая промис с данными, содержащими `totalCount`
 * @returns Промис, который разрешается в количество элементов `totalCount`
 *
 */

export const fetchTotalCount = async <T>(getAll: GetAllTotalCountType<T>) =>
  (await getAll()).data.totalCount;

type GetAllTotalCountType<T> = () => Promise<
  AxiosResponse<Pick<EntitiesResponseType<T>, "totalCount">>
>;

/**
 *
 * ------------------------------------------------------------------------------------------
 * **ПОЛУЧЕНИЕ ДАННЫХ ПО ID**
 *
 * @template T - тип возвращаемых данных
 * @param get - функция, возвращающая промис с данными
 * @returns Промис, который разрешается в данные (`data`), возвращённые функцией `get`
 *
 */

export const fetchById = async <T>(get: FetchGetPropsType<T>) => (await get()).data;

type FetchGetPropsType<T> = () => Promise<AxiosResponse<T>>;
