import { atom } from "jotai";
import { atomWithQuery } from "jotai-tanstack-query";
import { userApi, UserType } from "../api/userApi.ts";
import { loadable } from "jotai/vanilla/utils";

// ------------------------------ LOADER'Ы ДОБАВЛЕНИЯ/РЕДАКТИРОВАНИЯ/УДАЛЕНИЯ СТРОКИ ТАБЛИЦЫ

export const deletionStatusState = atom<boolean>(false);
export const createOrUpdateStatusState = atom<boolean>(false);

// ------------------------------ ГЛАВНЫЙ ПОИСКОВЫЙ ЗАПРОС

export const searchQueryState = atom<string>("");

// ------------------------------ ГЛАВНАЯ ПАГИНАЦИЯ

export const paginationState = atom<PaginationStateType>({ page: 0, quantity: 10 });

// ------------------------------ ФОРМЫ - СОСТОЯНИЕ

export const formState = atom<boolean>(false);

export type PaginationStateType = { page: number; quantity: number };

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

export const currentUserAtom = atomWithQuery(() => currentUserQuery());

export const currentUserQuery = () => ({
  queryKey: ["currentUser"],
  queryFn: fetchCurrentUser,
  keepPreviousData: true,
});

export const currentUserState = loadable(currentUserAtom);

const fetchCurrentUser = async (): Promise<CurrentUserType> => {
  const res = await userApi().me();

  if (!res) throw new Error("Error fetching user");
  if (Object.keys(res).length === 0) throw new Error("error fetching user");

  const roleByAuthority = (name: string) =>
    res.data.roles.some(({ authority }) => authority === name);

  const isAdmin = roleByAuthority(rolesAuthority.admin);
  const isMentor = roleByAuthority(rolesAuthority.mentor);
  const isStudent = roleByAuthority(rolesAuthority.user);

  return {
    user: res.data,
    isAdmin,
    isMentor,
    isStudent,
  };
};

type CurrentUserType = {
  user: UserType;
  isAdmin: boolean;
  isMentor: boolean;
  isStudent: boolean;
};

const rolesAuthority = {
  admin: "ROLE_admin",
  mentor: "ROLE_mentor",
  user: "ROLE_user",
};
