import axios from "axios";

export const unknownErrorText = "Произошла какая-то ошибка. Сообщите администратору системы";

export const getErrorMessage = (error?: unknown) => {
  if (error) {
    if (axios.isAxiosError(error)) {
      try {
        const response = error.response;

        // Если есть данные в ответе
        if (response?.data) {
          // Если есть details, объединяем их в строку
          if (response.data.details && Array.isArray(response.data.details)) {
            return response.data.details.join(". ");
          }

          // Если есть message, возвращаем его
          if (response.data.message) {
            return response.data.message;
          }
        }

        // Если нет данных, но есть статус, возвращаем сообщение на основе статуса
        if (response?.status) {
          switch (response.status) {
            case 400:
              return "Неправильный запрос";
            case 401:
              return "Необходима авторизация";
            case 403:
              return "Доступ запрещен";
            case 404:
              return "Ресурс не найден";
            case 500:
              return "Внутренняя ошибка сервера";
            default:
              return `Ошибка ${response.status}`;
          }
        }
      } catch {
        // Если что-то пошло не так, возвращаем стандартное сообщение
        return unknownErrorText;
      }
    }

    // Если это не ошибка Axios, возвращаем стандартное сообщение
    return unknownErrorText;
  }
};
