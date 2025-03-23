import { atomWithQuery } from "jotai-tanstack-query";
import { fetchAll } from "../utils/fetch.ts";
import { loadable } from "jotai/vanilla/utils";
import { userApi } from "../api/userApi.ts";

const usersAtom = atomWithQuery(() => {
  return {
    queryKey: ["usersState"],
    queryFn: () => fetchAll(() => userApi().getAll()),
  };
});

export const usersState = loadable(usersAtom);
