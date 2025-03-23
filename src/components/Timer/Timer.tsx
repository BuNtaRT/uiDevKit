import { FC, useEffect, useState } from "react";
import { Typography } from "@mui/material";

const Timer: FC<PropsType> = (props) => {
  const { endDate } = props;
  const [timeLeft, setTimeLeft] = useState<string>("00:00:00");

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const timeDifference = endDate.getTime() - now.getTime();

      if (timeDifference <= 0) {
        setTimeLeft("00:00:00");
        return;
      }

      // Вычисляем часы, минуты и секунды
      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      // Форматируем в чч:мм:сс
      const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

      setTimeLeft(formattedTime);
    };

    // Обновляем таймер каждую секунду
    const intervalId = setInterval(updateTimer, 1000);

    // Очистка интервала при размонтировании компонента
    return () => clearInterval(intervalId);
  }, [endDate]);

  return (
    <Typography variant="h6" align="right">
      Осталось времени: {timeLeft}
    </Typography>
  );
};

type PropsType = {
  endDate: Date;
};

export default Timer;
