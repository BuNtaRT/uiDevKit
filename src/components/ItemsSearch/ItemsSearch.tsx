import { FC, ReactNode, useState } from "react";
import { Container } from "./ItemsSearch.styles.ts";
import SearchField from "../SearchField/SearchField.tsx";
import { OptionsType } from "../../utils/typesUtils.ts";
import { List, ListItem, ListItemText, Typography, useTheme } from "@mui/material";

const ItemsSearch: FC<PropsType> = (props) => {
  const { options, onClick, button } = props;

  const theme = useTheme();
  const [search, setSearch] = useState("");

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleClick = (id: string) => {
    setSearch("");
    onClick(id);
  };

  return (
    <Container>
      <SearchField value={search} onChange={setSearch} size="small" variant="standard" />

      {/* Список отфильтрованных опций */}
      {filteredOptions.length > 0 ? (
        <List>
          {filteredOptions.map(({ id, name }) => (
            <ListItem
              key={id}
              component={"button"}
              sx={{
                color: theme.palette.text.primary,
                padding: "3px 6px",
                textAlign: "left",
                bgcolor: theme.palette.background.paper,
                "&:hover": {
                  bgcolor: theme.palette.action.hover,
                },
              }}
              onClick={() => handleClick(id)}
            >
              <ListItemText primary={name} />
              {button}
            </ListItem>
          ))}
        </List>
      ) : (
        // Если нет совпадений
        <Typography variant="body1" align="center" color="text.secondary">
          Ничего не найдено
        </Typography>
      )}
    </Container>
  );
};

type PropsType = {
  options: OptionsType;
  onClick: (id: string) => void;
  button?: ReactNode;
};

export default ItemsSearch;
