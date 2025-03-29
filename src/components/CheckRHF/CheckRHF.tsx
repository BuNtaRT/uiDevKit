import { FC } from "react";
import { Controller, useController, useFormContext } from "react-hook-form";
import { Checkbox, FormControl, FormControlLabel, FormHelperText } from "@mui/material";

const CheckRhf: FC<PropsType> = (props) => {
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
          <FormControlLabel
            control={
              <Checkbox
                {...field}
                checked={field.value} // Управление состоянием чекбокса
                onChange={(e) => field.onChange(e.target.checked)} // Обновление значения
                color="primary" // Цвет чекбокса
              />
            }
            label={label} // Метка чекбокса
          />
        )}
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  );
};

type PropsType = { name: string; label: string };

export default CheckRhf;
