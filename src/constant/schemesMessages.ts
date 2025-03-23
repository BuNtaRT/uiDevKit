export const required = "Поле должно быть заполнено";
export const unavailableOption = "Необходимо выбрать из доступных вариантов";

// ------------------------------ СТРОКИ

export const long = "Слишком длинное значение";

export const email = "Введите корректный e-mail";
export const phoneNumber = "Введите корректный номер";

export const minLength = (number: number) => `Минимальная длинна - ${number} символа`;
export const maxLength = (number: number) => `Максимальная длина - ${number} символа`;

// ------------------------------ ЦИФРЫ

export const numbers = "Допустимы только цифры";
export const onlyInteger = "Только целые числа";
export const minValue = (number: number) => `Минимальное значение - ${number}`;
export const maxValue = (number: number) => `Максимальное значение - ${number}`;

// ------------------------------ ДАТЫ

export const thisDateIsToCorrect = "Введите корректную дату";
export const thisPeriodIsNotCorrect = "Начало периода должно быть не позже окончания";

// ------------------------------ ФАЙЛЫ

export const minFiles = (number: number) => `Минимальное кол-во файлов - ${number}`;
