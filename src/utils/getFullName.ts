import { UserType } from "../api/userApi.ts";

export const getFullName = (user: UserType): string => {
  const { lastName, firstName, middleName } = user;

  const nameParts = [lastName, firstName, middleName].filter((part) => part && part.trim() !== "");

  // Объединяем части имени через пробел
  return nameParts.join(" ");
};
