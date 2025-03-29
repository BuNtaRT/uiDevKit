import { clearableObject } from "../utils/clearableObject.ts";
import { AxiosResponse } from "axios";

export const getAllParams = (props?: AllPropType) => {
  const page = props?.page;
  const size = props?.size;
  const filters = props?.filter ? clearableObject(props?.filter) : undefined;

  return {
    params: {
      ...(page || page === 0 ? { page } : {}),
      ...(size || size === 0 ? { size } : {}),
      ...(filters ? filters : {}),
    },
  };
};

export const getAllResponse = (response: AxiosResponse<any, any>) => {
  const items = response.data._embedded[Object.keys(response.data._embedded)[0]];
  const totalCount = response.data?.page?.totalElements ?? 0;

  return { items, totalCount };
};

export const getAllResponseService = (response: AxiosResponse<any, any>) => {
  const items = response.data.content;
  const totalCount = response.data.numberOfElements;

  return { items, totalCount };
};

export type AllPropType = {
  page?: number;
  size?: number;
  filter?: object;
  link?: string;
};
