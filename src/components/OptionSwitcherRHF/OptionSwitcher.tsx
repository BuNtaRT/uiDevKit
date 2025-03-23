import { FC } from "react";
import { OptionsType } from "../../utils/typesUtils.ts";
import { ToggleButton, ToggleButtonGroup } from "@mui/lab";

const OptionSwitcher: FC<PropsType> = (props) => {
  const { options, value, onChange } = props;

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={(_, valueNew) => {
        if (valueNew === value) return;
        onChange(valueNew || options[0].id);
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

            color: value === id ? "white" : "text.primary",
            "&.Mui-selected:hover": {
              bgcolor: value === id ? "secondary.dark" : "action.hover",
            },
            "&.Mui-selected": {
              bgcolor: value === id ? "secondary.main" : "transparent",
            },
          }}
          size="small"
          fullWidth
        >
          {name}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

type PropsType = { value: string; options: OptionsType; onChange: (value: string) => void };

export default OptionSwitcher;
