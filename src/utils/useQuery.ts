import { AxiosResponse } from "axios";
import { IdType } from "../api/types.ts";
import { createOrUpdateStatusState, deletionStatusState } from "../atoms/atoms.ts";
import { useAtomValue } from "jotai";
import { useSetAtom } from "jotai";
import { queryClientAtom } from "jotai-tanstack-query";
import { useMutation } from "@tanstack/react-query";
import { RequestType } from "../api/request.ts";

// Основной хук для работы с запросами (создание, обновление, удаление)
export const useQuery = <VOBJ>() => {
  // Получаем client для работы с кэшом запросов
  const queryClient = useAtomValue(queryClientAtom);

  // Устанавливаем статус создания или обновления
  const setCreateOrUpdateStatus = useSetAtom(createOrUpdateStatusState);

  // Устанавливаем статус удаления
  const setDeletionStatus = useSetAtom(deletionStatusState);

  return {
    // Хук для создания объекта
    useCreate: (props: CreatePropsType<VOBJ>) => {
      const { api, queryKey, queryKeyForOneEntity } = props;

      return useMutation({
        mutationFn: async (props: { data: VOBJ; link?: string }) => api.create!(props), // Выполнение API-запроса на создание

        // При изменении состояния, ставим флаг для отображения статуса
        onMutate: () => setCreateOrUpdateStatus(true),
        // После завершения запроса, инвалидация кэша для обновления данных
        onSettled: async () => {
          // Инвалидируем запросы с основным ключом
          queryClient.invalidateQueries({ queryKey });

          // Инвалидируем запросы для каждого ключа для одной сущности
          if (queryKeyForOneEntity)
            queryKeyForOneEntity.forEach((key) => queryClient.invalidateQueries({ queryKey: key }));

          // Сбрасываем флаг после завершения операции
          setCreateOrUpdateStatus(false);
        },
      });
    },

    // Хук для обновления объекта
    useUpdate: (props: UpdatePropsType<VOBJ>) => {
      const { api, queryKey, queryKeyForOneEntity } = props;

      return useMutation({
        mutationFn: async (props: RequestType & { data: VOBJ }) => api.update!(props),
        onMutate: () => setCreateOrUpdateStatus(true),
        onSettled: async () => {
          // Инвалидируем запросы с основным ключом
          queryClient.invalidateQueries({ queryKey });

          if (queryKeyForOneEntity)
            queryKeyForOneEntity.forEach((key) => queryClient.invalidateQueries({ queryKey: key })); // Инвалидируем запросы для каждого ключа для одной сущности

          // Сбрасываем флаг после завершения операции
          setCreateOrUpdateStatus(false);
        },
      });
    },

    // Хук для удаления объектов
    useDelete: (props: DeletePropsType<VOBJ>) => {
      const { api, queryKey, queryKeyForOneEntity } = props;

      return useMutation({
        mutationFn: async (ids: RequestType[]) => {
          // Для каждого ID выполняем удаление
          const promises = ids.map(async (id) => api.delete!(id));

          // Ждем завершения всех операций удаления
          return Promise.all(promises);
        },

        // При изменении состояния, ставим флаг для отображения статуса
        onMutate: () => setDeletionStatus(true),

        // После завершения запроса, инвалидация кэша для обновления данных
        onSettled: async () => {
          // Инвалидируем запросы с основным ключом
          queryClient.invalidateQueries({ queryKey });

          // Инвалидируем запросы для каждого ключа для одной сущности
          if (queryKeyForOneEntity)
            queryKeyForOneEntity.forEach((key) => queryClient.invalidateQueries({ queryKey: key }));

          // Сбрасываем флаг после завершения операции
          setDeletionStatus(false);
        },
      });
    },
    useCustomRequest: <FIELD extends string>(props: CustomRequestPropsType<FIELD>) => {
      const { queryKey, queryKeyForOneEntity, key, api, isDeletion = true } = props;

      return useMutation({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mutationFn: async (props: any) => {
          api[key](props);
        },
        onMutate: async () => {
          if (isDeletion) setDeletionStatus(true);
          else setCreateOrUpdateStatus(true);
        },
        onSettled: async () => {
          queryClient.invalidateQueries({ queryKey });

          if (queryKeyForOneEntity)
            queryKeyForOneEntity.forEach((key) => queryClient.invalidateQueries({ queryKey: key }));

          if (isDeletion) setDeletionStatus(false);
          else setCreateOrUpdateStatus(false);
        },
      });
    },
  };
};

// Типы для параметров создания, обновления и удаления объектов
type CreatePropsType<VOBJ> = {
  api: { create?: (props: { data: VOBJ; link?: string }) => Promise<AxiosResponse<IdType>> }; // Метод создания объекта
  queryKey: QueryKeyType; // Ключ для запроса (используется для кеширования)
  queryKeyForOneEntity?: QueriesKeyType; // Ключи для одной сущности (необязательное поле)
};

type UpdatePropsType<VOBJ> = {
  api: { update?: (props: RequestType & { data: VOBJ }) => Promise<AxiosResponse<VOBJ>> }; // Метод обновления объекта
  queryKey: QueryKeyType; // Ключ для запроса (используется для кеширования)
  queryKeyForOneEntity?: QueriesKeyType; // Ключи для одной сущности (необязательное поле)
};

type DeletePropsType<VOBJ> = {
  api: { delete?: (props: RequestType) => OnDeleteReturnType<VOBJ> }; // Метод удаления объекта
  queryKey: QueryKeyType; // Ключ для запроса (используется для кеширования)
  queryKeyForOneEntity?: QueriesKeyType; // Ключи для одной сущности (необязательное поле)
};

// Общий тип API для работы с объектами
export type ApiType<VOBJ> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAll?: (props?: any) => Promise<AxiosResponse>; // Получить все объекты (тип any пока не типизирован)
  get?: (id: string) => Promise<AxiosResponse>; // Получить один объект по ID
  create?: CreatePropsType<VOBJ>["api"]["create"]; // Метод создания
  update?: UpdatePropsType<VOBJ>["api"]["update"]; // Метод обновления
  delete?: DeletePropsType<VOBJ>["api"]["delete"]; // Метод удаления
};

// Типы для ключей запроса и их комбинации
export type QueryKeyType = (string | string[] | number | boolean | undefined | null)[]; // Типы для ключей запросов

export type QueriesKeyType = QueryKeyType[]; // Массив ключей запросов

// Тип для возвращаемого значения при удалении
export type OnDeleteReturnType<OBJ> =
  | Promise<AxiosResponse<unknown, unknown>> // Может быть Promise с ответом от сервера
  | void // Может быть пустым
  | Promise<OBJ> // Может быть объектом
  | OBJ[]; // Или массивом объектов

export type CustomRequestPropsType<FIELD extends string> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  api: { [key in FIELD]: (props: any) => Promise<AxiosResponse<IdType>> };
  key: FIELD;
  queryKey: QueryKeyType;
  queryKeyForOneEntity?: QueriesKeyType;
  isDeletion?: boolean;
};
