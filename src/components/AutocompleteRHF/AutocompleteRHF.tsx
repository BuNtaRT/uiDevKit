import { FC } from "react";
import { Controller, useController, useFormContext } from "react-hook-form";
import { OptionsType, OptionType } from "../../utils/typesUtils.ts";
import { FormControl, FormHelperText, TextField } from "@mui/material";
import { Autocomplete } from "@mui/material";

const AutocompleteRHF: FC<PropsType> = (props) => {
  const { name, label, options, max = 100, multiple } = props;

  const controller = useController({ name });
  const { control } = useFormContext();
  const { fieldState } = controller;

  const error = fieldState.error?.message;

  const handleChange = (newValue: OptionType[] | OptionType | null) => {
    if (multiple) {
      return Array.isArray(newValue) ? newValue.map((option) => option.id) : [];
    } else {
      if (!newValue) return "";
      return "id" in newValue ? newValue?.id || "" : "";
    }
  };

  const selectedValue = (value: string[] | string) =>
    multiple
      ? options.filter((option) => Array.isArray(value) && value.includes(option.id))
      : options.find((option) => option.id === value) || null;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <FormControl fullWidth margin="normal">
          <Autocomplete
            multiple={multiple}
            options={options}
            getOptionLabel={(option) => option.name}
            filterOptions={(filteredOptions) => filteredOptions.slice(0, max)}
            value={selectedValue(value)}
            onChange={(_, newValue) => onChange(handleChange(newValue))}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                size="small"
                error={!!error}
                helperText={error}
              />
            )}
            noOptionsText="Нет опций"
          />
          {error && <FormHelperText error>{error}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

type PropsType = {
  name: string;
  label: string;
  options: OptionsType;
  max?: number;
  multiple?: boolean;
};

export default AutocompleteRHF;
