import { FC } from "react";
import { TextField } from "@mui/material";
import { Controller, useController, useFormContext } from "react-hook-form";

const TextFieldRHF: FC<PropsType> = (props) => {
  const { name, type = "text", label, placeholder, rows } = props;

  const controller = useController({ name });
  const { control } = useFormContext();
  const { fieldState } = controller;
  const error = fieldState.error?.message;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          size="small"
          type={type}
          label={label}
          margin="normal"
          error={!!error}
          helperText={error}
          placeholder={placeholder}
          rows={rows}
          multiline={!!rows}
        />
      )}
    />
  );
};

type PropsType = {
  name: string;
  type?: string;
  label: string;
  placeholder?: string;
  rows?: number;
};

export default TextFieldRHF;
