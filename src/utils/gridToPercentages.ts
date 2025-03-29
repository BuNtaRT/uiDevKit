export const gridToPercentages = (input: string): string[] => {
  // Разделяем строку на элементы
  const parts = input.split(/\s+/).map((part) => part.trim());

  // Инициализируем переменные для подсчета
  let totalFr = 0; // Сумма всех fr
  let totalPx = 0; // Сумма всех px
  const frValues: number[] = []; // Массив значений fr
  const pxValues: number[] = []; // Массив значений px

  // Проходим по всем частям строки
  parts.forEach((part) => {
    if (part.endsWith("fr")) {
      const frValue = parseFloat(part); // Извлекаем значение fr
      totalFr += frValue;
      frValues.push(frValue);
      pxValues.push(0); // Для fr добавляем 0 в pxValues
    } else if (part.endsWith("px")) {
      const pxValue = parseFloat(part); // Извлекаем значение px
      totalPx += pxValue;
      pxValues.push(pxValue);
      frValues.push(0); // Для px добавляем 0 в frValues
    } else {
      throw new Error(`Неподдерживаемый формат: ${part}`);
    }
  });

  // Преобразуем fr в проценты
  return parts.map((_, index) => {
    if (frValues[index] > 0) {
      // Для fr вычисляем процент от оставшейся ширины
      const percentage = (frValues[index] / totalFr) * 100;
      return `calc(${percentage}% - ${totalPx}px)`;
    } else {
      // Для px возвращаем фиксированное значение
      return `${pxValues[index]}px`;
    }
  });
};
