import { FormControl, FormHelperText } from "@mui/material";
import { FC } from "react";
import { Controller, useController, useFormContext } from "react-hook-form";
import { TimePicker } from "@mui/x-date-pickers";

const TimeRhf: FC<PropsType> = (props) => {
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
          <TimePicker
            {...field}
            label={label}
            slotProps={{ textField: { size: "small", placeholder: "ЧЧ.ММ" } }}
          />
        )}
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  );
};

type PropsType = {
  name: string; // Имя поля в форме
  label: string; // Метка поля
};

export default TimeRhf;
