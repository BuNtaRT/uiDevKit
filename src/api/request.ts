import { AxiosResponse } from "axios";
import { EntitiesResponseType, IdType } from "./types";
import { getIdFromLink } from "../utils/getIdFromLink.ts";
import { ApiType } from "./api.ts";
import { clearableObject } from "../utils/clearableObject.ts";

/**
 *
 * ------------------------------------------------------------------------------------------
 * МАКЕТ REST ЭНДПОИНТА
 *
 * -
 *
 * @param instance
 * @param entityName - имя эндпоинта
 * @param DATA - получаемый тип
 *
 */

export const entitiesBase = <DATA>(instance: ApiType, entityName: string) => {
  const { baseInstance, rawInstance } = instance;

  return {
    getAll: async (props?: AllPropType): Promise<AxiosResponse<EntitiesResponseType<DATA>>> => {
      const page = props?.page;
      const size = props?.size;
      const filters = props?.filter ? clearableObject(props?.filter) : undefined;
      const link = props?.baseLink;

      const params = {
        params: {
          ...(page || page === 0 ? { page } : {}),
          ...(size || size === 0 ? { size } : {}),
          ...(filters ? filters : {}),
        },
      };

      const res = link
        ? rawInstance.get(`${link}`, params)
        : baseInstance.get(`/${entityName}`, params);

      const response = await res;
      const itemsRaw = response.data._embedded[entityName];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const items = itemsRaw.map((item: any) => ({
        ...item,
        id: getIdFromLink(item._links.self.href as string),
      }));
      const totalCount = response.data.page.totalElements;

      return { ...res, data: { items, totalCount } };
    },

    get: (request: RequestType): Promise<AxiosResponse<DATA>> => {
      return request?.link
        ? rawInstance.get(request.link)
        : baseInstance.get(`/${entityName}/${request?.id}`);
    },
    create: (props: EntityCreateType<unknown>): Promise<AxiosResponse<IdType>> => {
      const { data, link } = props;
      return link ? rawInstance.post(link) : baseInstance.post(`/${entityName}`, data);
    },
    update: (props: EntityUpdateType<unknown>): Promise<AxiosResponse<DATA>> => {
      const { id, data, link } = props;
      return link
        ? rawInstance.patch(link, data)
        : baseInstance.patch(`/${entityName}${id !== undefined ? `/${id}` : ""}`, data);
    },
    replace: (props: EntityUpdateType<unknown>): Promise<AxiosResponse<DATA>> => {
      const { id, data, link } = props;
      return link
        ? rawInstance.put(link, data)
        : baseInstance.put(`/${entityName}${id !== undefined ? `/${id}` : ""}`, data);
    },
    delete: (request: RequestType): Promise<AxiosResponse<DATA, DATA>> => {
      const { id, link } = request;
      return link ? rawInstance.delete(link) : baseInstance.delete(`/${entityName}/${id}`);
    },
  };
};

type AllPropType = {
  page?: number;
  size?: number;
  filter?: object;
  baseLink?: string;
};

export type RequestType = {
  link?: string;
  id?: string;
};

export type EntityCreateType<T> = {
  link?: string;
  data: T;
};

export type EntityUpdateType<T> = RequestType & {
  data: T;
};
