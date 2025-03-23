/**
 * Функция фильтрует массив на два подмассива по условию переданному в функции-предикате.
 *
 * @param array - Массив значений, которые нужно разделить (V[]).
 * @param predicate - Функция-предикат, принимающая элемент массива и возвращающая true или false (item: V) => boolean.
 * @returns Кортеж из двух массивов:
 *   - Первый массив содержит элементы, удовлетворяющие условию предиката.
 *   - Второй массив содержит элементы, которые не удовлетворяют условию.
 *
 * @example
 * const data = [1, 2, 3, 4, 5];
 * const [even, odd] = partitionFilter(data, (num) => num % 2 === 0);
 * console.log(even); // [2, 4]
 * console.log(odd);  // [1, 3, 5]
 */
export const partitionFilter = <V>(array: V[], predicate: (item: V) => boolean): [V[], V[]] =>
  array.reduce<[V[], V[]]>(
    (acc, item) => {
      if (predicate(item)) acc[0].push(item);
      else acc[1].push(item);

      return acc;
    },
    [[], []]
  );
