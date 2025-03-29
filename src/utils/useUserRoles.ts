import { useAtomValue } from "jotai/index";
import { currentUserState } from "../atoms/atoms.ts";

export const useUserRoles = () => {
  const { data } = useAtomValue(currentUserState);
  const { user, isAdmin = false } = data || {};

  return {
    isAdmin,
    user,
  };
};
