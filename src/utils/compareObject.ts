/**
 * Сравнивает два объекта (filters и initialValues) по их ключам и значениям.
 * Сортирует ключи в обоих объектах, преобразует их в массивы и затем сравнивает их строковые представления.
 *
 * @param filters - Объект фильтров, который нужно сравнить с начальными значениями.
 * @param initialValues - Начальные значения, с которыми нужно сравнить объект фильтров.
 * @returns Возвращает true, если объекты отличаются, иначе false.
 *
 * Этот метод преобразует оба объекта в строки с помощью JSON.stringify, сортируя их ключи,
 * чтобы игнорировать порядок ключей в объектах при сравнении.
 */

export const compareObject = <C extends object>(filters: C, initialValues: C) =>
  JSON.stringify(
    Object.keys(filters)
      .sort()
      .map((key) => ({ [key]: filters[key as keyof typeof filters] }))
  ) !==
  JSON.stringify(
    Object.keys(initialValues)
      .sort()
      .map((key) => ({
        [key]: initialValues[key as keyof typeof initialValues],
      }))
  );
