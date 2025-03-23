import { FC } from "react";
import { Controller, useController, useFormContext } from "react-hook-form";
import { Box, FormHelperText, Slider, Typography } from "@mui/material";

const SliderRHF: FC<PropsType> = (props) => {
  const { name, label, min, max, unit, nullableLabel } = props;

  const controller = useController({ name });
  const { control, watch } = useFormContext();
  const { fieldState } = controller;
  const value = watch(name) as number;
  const error = fieldState.error?.message;

  return (
    <Box sx={{ px: 2 }}>
      <Typography id={`${name}-slider`} sx={{ mt: 1, ml: -1 }} gutterBottom>
        {label}: {!value && nullableLabel ? nullableLabel : value}
      </Typography>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Slider
            {...field}
            aria-labelledby={`${name}-slider`}
            valueLabelDisplay="auto"
            step={1}
            min={min}
            max={max}
            marks={[
              { value: min, label: `${min}${unit ?? ""}` },
              { value: max, label: `${max}${unit ?? ""}` },
            ]}
          />
        )}
      />

      {error && <FormHelperText error>{error}</FormHelperText>}
    </Box>
  );
};

type PropsType = {
  name: string;
  label: string;
  min: number;
  max: number;
  unit?: string;
  nullableLabel?: string;
};

export default SliderRHF;
