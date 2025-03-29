import { entitiesBase } from "./request.ts";
import { api } from "./api.ts";
import { AxiosResponse } from "axios";
import { SelfLinkType } from "./types.ts";

export const userApi = () => ({
  ...entitiesBase<UserType>(api, "users"),

  me: (): Promise<AxiosResponse<UserType>> => {
    return api.baseInstance.get("users/current");
  },
});

export type UserType = SelfLinkType & {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  username: string;
  email: string;
  roles: RolesUserType;
};

export type RolesUserType = RoleUserType[];

export type RoleUserType = {
  id: number;
  authority: string;
  name: string;
};
