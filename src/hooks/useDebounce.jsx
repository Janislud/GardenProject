import { useEffect, useState } from "react";

export const useDebounce = (value, delay) => {
  // Состояние для отслеживания последнего значения
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Задержка обновления значения
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Очистка таймера при каждом изменении значения или при размонтировании компонента
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Повторный запуск эффекта при изменении значения или задержки

  return debouncedValue; // Возвращаем дебаунсированное значение
};
