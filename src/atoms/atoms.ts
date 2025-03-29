import { atom } from "jotai";
import { atomWithQuery } from "jotai-tanstack-query";
import { userApi, UserType } from "../api/userApi.ts";

// ------------------------------ LOADER'Ы ДОБАВЛЕНИЯ/РЕДАКТИРОВАНИЯ/УДАЛЕНИЯ СТРОКИ ТАБЛИЦЫ

export const deletionStatusState = atom<boolean>(false);
export const createOrUpdateStatusState = atom<boolean>(false);

// ------------------------------ ГЛАВНЫЙ ПОИСКОВЫЙ ЗАПРОС

export const searchQueryState = atom<string>("");

// ------------------------------ ГЛАВНАЯ ПАГИНАЦИЯ

export const pageState = atom<number>(1);
export const totalCountState = atom<number>(0);

// ------------------------------ ФОРМЫ - СОСТОЯНИЕ

export const formState = atom<unknown | boolean>(false);

// ------------------------------ ТЕМА ПРИЛОЖЕНИЯ

export const themeState = atom<"dark" | "light">("light");

// ------------------------------ Модальное окно уведомления

export const modalNotificationState = atom<ModalNotificationType | undefined>();

export type ModalNotificationType = {
  type: NotificationType;
  message: string;
};

export type NotificationType = "success" | "info" | "warning" | "error";

// ------------------------------ Модальное окно справа

export const modalRightState = atom("");

// ------------------------------ текущий пользователь

export const currentUserState = atomWithQuery(() => currentUserQuery());

export const currentUserQuery = () => ({
  queryKey: ["currentUser"],
  queryFn: fetchCurrentUser,
  keepPreviousData: true,
});

export const useCurrentUserKeys = () => ["currentUser"];

const fetchCurrentUser = async (): Promise<CurrentUserType> => {
  const res = await userApi().me();

  if (!res) throw new Error("Error fetching user");
  if (Object.keys(res).length === 0) throw new Error("error fetching user");

  const roleByAuthority = (name: string) =>
    res.data.roles.some(({ authority }) => authority === name);

  const isAdmin = roleByAuthority(rolesAuthority.admin);

  return {
    user: res.data,
    isAdmin,
  };
};

export type CurrentUserType = {
  user: UserType;
  isAdmin: boolean;
};

const rolesAuthority = {
  admin: "admin",
};
