import { AxiosResponse } from "axios";
import { EntitiesResponseType, IdType } from "./types";
import { ApiType } from "./api.ts";
import { AllPropType, getAllParams, getAllResponse } from "./apiModules.ts";

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
      const link = props?.link;
      const params = getAllParams(props);

      const res = link
        ? rawInstance.get(`${link}`, params)
        : baseInstance.get(`/${entityName}`, params);

      const response = await res;
      const data = getAllResponse(response);

      return { ...res, data };
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
