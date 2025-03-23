import { useAtomValue } from "jotai/index";
import { currentUserAtom } from "../atoms/atoms.ts";

export const useUserRoles = () => {
  const { data } = useAtomValue(currentUserAtom);
  const { isStudent = false, user, isAdmin = false, isMentor = false } = data || {};

  return {
    isStudent,
    isMentor,
    isAdmin,
    user,
  };
};
