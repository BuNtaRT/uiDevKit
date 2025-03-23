import { FC } from "react";
import { Controller, useController, useFormContext } from "react-hook-form";
import { InputLabel, Select, FormControl, MenuItem, FormHelperText } from "@mui/material";
import { OptionsType } from "../../utils/typesUtils.ts";

const SelectRHF: FC<PropsType> = (props) => {
  const { name, label, options } = props;

  const controller = useController({ name });
  const { control } = useFormContext();
  const { fieldState } = controller;
  const error = fieldState.error?.message;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl fullWidth margin="normal">
          <InputLabel id="dropdown-label" size="small">
            {label}
          </InputLabel>
          <Select
            labelId="dropdown-label"
            label="Choose an option"
            {...field}
            error={!!error}
            size="small"
          >
            {options.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText error>{error}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

type PropsType = { name: string; label: string; options: OptionsType };

export default SelectRHF;
