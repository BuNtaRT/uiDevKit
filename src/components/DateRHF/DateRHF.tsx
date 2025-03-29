import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FC } from "react";
import { Controller, useController, useFormContext } from "react-hook-form";
import { FormControl, FormHelperText } from "@mui/material";

const DateRhf: FC<PropsType> = (props) => {
  const { name, label } = props;

  const { control } = useFormContext();
  const controller = useController({ name });
  const { fieldState } = controller;
  const error = fieldState.error?.message;

  return (
    <FormControl fullWidth margin="normal" error={!!error}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            label={label}
            value={field.value || null} // Устанавливаем значение или null
            onChange={(newValue) => field.onChange(newValue)} // Обновляем значение в форме
            slotProps={{ textField: { size: "small", placeholder: "ДД.ММ.ГГГГ" } }}
            format="dd.MM.yyyy"
          />
        )}
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  );
};

type PropsType = {
  name: string; // Имя поля в форме
  label: string;
};

export default DateRhf;
