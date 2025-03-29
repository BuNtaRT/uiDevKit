import { useLoadableData } from "../utils/useLoadableData.ts";
import { usersState } from "./users.ts";
import { getFullName } from "../utils/getFullName.ts";

export const useUsersOptions = () => {
  const { data } = useLoadableData(usersState, []);

  return data.map((user) => ({
    id: user._links.self.href,
    name: `${getFullName(user)} (${user.username})`,
  }));
};
