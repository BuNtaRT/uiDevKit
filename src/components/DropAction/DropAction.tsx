import { FC, ReactNode, useState } from "react";
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const DropAction: FC<PropsType> = (props) => {
  const { onDelete, onEdit, icon } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Состояние для открытия меню

  // Открытие меню
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Закрытие меню
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {/* Кнопка для открытия выпадающего меню */}
      <IconButton onClick={handleClick} size="small">
        {icon || <MoreVertIcon />} {/* Используем переданную иконку или стандартную */}
      </IconButton>

      {/* Выпадающее меню */}
      <Menu
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "12px",
            padding: 0,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          },
          "& .MuiMenu-list": {
            padding: 1,
          },
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom", // Меню открывается снизу от кнопки
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top", // Меню выравнивается по верхней части кнопки
          horizontal: "right",
        }}
      >
        {/* Пункт "Редактировать" */}
        {onEdit && (
          <MenuItem
            onClick={() => {
              onEdit();
              handleClose();
            }}
          >
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Редактировать</ListItemText>
          </MenuItem>
        )}

        {/* Пункт "Удалить" */}
        {onDelete && (
          <MenuItem
            onClick={() => {
              onDelete();
              handleClose();
            }}
          >
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Удалить</ListItemText>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

type PropsType = {
  onDelete?: () => void;
  onEdit?: () => void;
  icon?: ReactNode;
};

export default DropAction;
