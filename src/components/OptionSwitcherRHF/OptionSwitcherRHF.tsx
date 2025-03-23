import { FC } from "react";
import { Controller, useController, useFormContext } from "react-hook-form";
import { OptionsType } from "../../utils/typesUtils.ts";
import { FormControl, FormHelperText } from "@mui/material";
import { ToggleButton, ToggleButtonGroup } from "@mui/lab";

const OptionSwitcherRhf: FC<PropsType> = (props) => {
  const { name, options } = props;

  const controller = useController({ name });
  const { control } = useFormContext();
  const { fieldState } = controller;
  const error = fieldState.error?.message;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl fullWidth error={!!error}>
          <ToggleButtonGroup
            {...field}
            value={field.value}
            exclusive
            onChange={(_, value) => {
              if (value === field.value) return;
              field.onChange(value || options[0].id);
            }}
            aria-label="Горизонтальный переключатель"
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {options.map(({ id, name }) => (
              <ToggleButton
                key={id}
                value={id}
                aria-label={name}
                sx={{
                  textTransform: "none",

                  color: field.value === id ? "white" : "text.primary",
                  "&.Mui-selected:hover": {
                    bgcolor: field.value === id ? "secondary.dark" : "action.hover",
                  },
                  "&.Mui-selected": {
                    bgcolor: field.value === id ? "secondary.main" : "transparent",
                  },
                }}
                size="small"
                fullWidth
              >
                {name}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

type PropsType = { name: string; options: OptionsType };

export default OptionSwitcherRhf;
