import axios, { AxiosInstance } from "axios";
import { login } from "../constant/routes.ts";
import { clearAuth, getAuth } from "../utils/getAuth.ts";

/**
 * Создает экземпляр axios с настройками для работы с базовым URL и авторизацией.
 *
 * @param baseURL - Базовый URL для всех запросов. Может быть undefined, если нужно использовать URL по умолчанию.
 * @returns Экземпляр axios, настроенный для отправки запросов с базовым URL и авторизацией через Basic Auth.
 *
 * В данном коде используется interceptor для обработки ошибок. При ошибке с кодом 401
 * (неавторизованный доступ) происходит редирект на страницу входа.
 */

const instance = (baseURL: string | undefined) => {
  const instance = axios.create({
    baseURL,
  });

  instance.interceptors.request.use((config) => {
    const auth = getAuth();

    if (auth) config.headers.Authorization = `Basic ${auth}`;
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        clearAuth();
        window.location.href = `#${login}`;
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const api = {
  baseInstance: instance(import.meta.env.VITE_API_URL),
  rawInstance: instance(undefined),
};

export type ApiType = { baseInstance: AxiosInstance; rawInstance: AxiosInstance };
