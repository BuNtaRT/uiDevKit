import { FC, useState } from "react";
import { Container } from "./SelectItemsSearchRHF.styles.ts";
import SearchField from "../SearchField/SearchField.tsx";
import { OptionsType } from "../../utils/typesUtils.ts";
import {
  Checkbox,
  FormHelperText,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { useController } from "react-hook-form";

const SelectItemsSearchRHF: FC<PropsType> = (props) => {
  const { options, onClick, name } = props;

  const theme = useTheme();
  const [search, setSearch] = useState("");

  const {
    field: { value: selectedIds, onChange: setSelectedIds },
    fieldState: { error },
  } = useController({ name });

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCheckboxChange = (id: string) => {
    const newSelectedIds = selectedIds.includes(id)
      ? selectedIds.filter((selectedId: string) => selectedId !== id) // Удалить, если уже выбран
      : [...selectedIds, id]; // Добавить, если не выбран

    setSelectedIds(newSelectedIds); // Обновить значение в форме
  };

  return (
    <Container>
      {/* Поле поиска */}
      <SearchField value={search} onChange={setSearch} size="small" variant="standard" />

      {/* Список отфильтрованных опций */}
      {filteredOptions.length > 0 ? (
        <List>
          {filteredOptions.map(({ id, name }) => (
            <ListItem
              key={id}
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "3px 6px",
                bgcolor: theme.palette.action.hover,
                "&:hover": {
                  bgcolor: theme.palette.background.paper,
                },
              }}
            >
              {/* Чекбокс */}
              <Checkbox
                checked={selectedIds.includes(id)} // Проверяем, выбран ли элемент
                onChange={() => handleCheckboxChange(id)} // Обновляем состояние
                sx={{
                  color: theme.palette.text.primary,
                  "&.Mui-checked": {
                    color: theme.palette.primary.main,
                  },
                }}
              />
              {/* Текст */}
              <ListItemText primary={name} onClick={() => onClick && onClick(id)} />
            </ListItem>
          ))}
        </List>
      ) : (
        // Если нет совпадений
        <Typography variant="body1" align="center" color="text.secondary">
          Ничего не найдено
        </Typography>
      )}

      {/* Ошибка валидации */}
      {error && <FormHelperText error>{error.message}</FormHelperText>}
    </Container>
  );
};

type PropsType = {
  options: OptionsType;
  onClick?: (id: string) => void;
  name: string;
};

export default SelectItemsSearchRHF;
