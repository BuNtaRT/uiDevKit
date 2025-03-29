import { FC } from "react";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";

const ButtonContainer: FC<PropsType> = (props) => {
  const { onAdd, onCancel, onSave, onEdit, onDelete, onSubmit } = props;
  const {
    disabledAdd,
    disabledDelete,
    disabledEdit,
    disabledCancel,
    disabledSave,
    disabledSubmit,
  } = props;
  const { fullWidth } = props;

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2, // Расстояние между кнопками
        width: fullWidth ? "100%" : undefined,
        justifyContent: fullWidth ? "space-between" : undefined,
      }}
    >
      {/* Кнопка "Подтвердить" */}
      {onSubmit && (
        <Button
          variant="contained"
          color="primary"
          startIcon={<CheckIcon />}
          onClick={onSubmit}
          disabled={disabledSubmit}
          fullWidth={fullWidth}
          type={"submit"}
        >
          Подтвердить
        </Button>
      )}
      {/* Кнопка "Сохранить" */}
      {onSave && (
        <Button
          variant="contained"
          color="info"
          startIcon={<CheckIcon />}
          onClick={onSave}
          disabled={disabledSave}
          fullWidth={fullWidth}
        >
          Сохранить
        </Button>
      )}
      {/* Кнопка "Добавить" */}
      {onAdd && (
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={onAdd}
          disabled={disabledAdd}
          fullWidth={fullWidth}
        >
          Добавить
        </Button>
      )}
      {/* Кнопка "Редактировать" */}
      {onEdit && (
        <Button
          variant="contained"
          color="primary"
          startIcon={<EditIcon />}
          onClick={onEdit}
          disabled={disabledEdit}
          fullWidth={fullWidth}
        >
          Редактировать
        </Button>
      )}

      {/* Кнопка "Удалить" */}
      {onDelete && (
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={onDelete}
          disabled={disabledDelete}
          fullWidth={fullWidth}
        >
          Удалить
        </Button>
      )}

      {/* Кнопка "Отмена" */}
      {onCancel && (
        <Button
          variant="contained"
          color="error"
          startIcon={<ClearIcon />}
          onClick={onCancel}
          disabled={disabledCancel}
          fullWidth={fullWidth}
        >
          Отмена
        </Button>
      )}
    </Box>
  );
};

type PropsType = {
  fullWidth?: boolean;

  onAdd?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  onCancel?: () => void;
  onSave?: () => void;
  onSubmit?: () => void;

  disabledAdd?: boolean;
  disabledDelete?: boolean;
  disabledEdit?: boolean;
  disabledCancel?: boolean;
  disabledSave?: boolean;
  disabledSubmit?: boolean;
};

export default ButtonContainer;
