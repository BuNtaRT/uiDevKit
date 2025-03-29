import { atomWithQuery } from "jotai-tanstack-query";
import { fetchAll } from "../utils/fetch.ts";
import { userApi } from "../api/userApi.ts";

export const usersState = atomWithQuery(() => {
  return {
    queryKey: ["usersState"],
    queryFn: () => fetchAll(() => userApi().getAll()),
  };
});
