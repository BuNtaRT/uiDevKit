import { IconButton, InputAdornment, TextField, TextFieldVariants } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import SearchIcon from "@mui/icons-material/Search";

const SearchField: FC<PropsType> = (props) => {
  const { value, onChange, variant, size } = props;

  const [searchValue, setSearchValue] = useState(value);

  useEffect(() => {
    setSearchValue(value);
  }, [value]);

  const setOnChange = () => {
    onChange(searchValue);
  };

  const handleSearch = useDebouncedCallback(() => {
    setOnChange();
  }, 400);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      onChange(searchValue);
    }
  };

  const handleChange = (text: string) => {
    setSearchValue(text);
    handleSearch();
  };

  return (
    <TextField
      fullWidth
      placeholder="Поиск..."
      value={searchValue}
      onChange={(evt) => handleChange(evt.target.value)}
      onKeyDown={handleKeyPress}
      variant={variant}
      size={size}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="поиск" onClick={setOnChange}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

type PropsType = {
  value: string;
  onChange: (value: string) => void;
  variant?: TextFieldVariants;
  size?: "small" | "medium";
};

export default SearchField;
