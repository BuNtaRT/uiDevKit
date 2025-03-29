import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import DropAction from "../../../../components/DropAction/DropAction.tsx";
import { useSetAtom } from "jotai";
import { formState } from "../../../../atoms/atoms.ts";
import { Box } from "@mui/material";

export const useTable = () => {
  const setFormState = useSetAtom(formState);

  const items = [
    { id: 1, name: "Данные - 1", isImportant: false, description: "Описание - 1" },
    { id: 2, name: "Данные - 2", isImportant: false, description: "Описание - 2" },
    { id: 3, name: "Данные - 3", isImportant: true, description: "Описание - 3" },
    { id: 4, name: "Данные - 4", isImportant: false, description: "Описание - 4" },
    { id: 5, name: "Данные - 5", isImportant: false, description: "Описание - 5" },
    { id: 6, name: "Данные - 6", isImportant: false, description: "Описание - 6" },
    { id: 7, name: "Данные - 7", isImportant: false, description: "Описание - 7" },
    { id: 8, name: "Данные - 8", isImportant: false, description: "Описание - 8" },
    { id: 9, name: "Данные - 9", isImportant: false, description: "Описание - 9" },
    { id: 10, name: "Данные - 10", isImportant: true, description: "Описание - 10" },
    { id: 11, name: "Данные - 11", isImportant: false, description: "Описание - 11" },
    { id: 12, name: "Данные - 12", isImportant: false, description: "Описание - 12" },
    { id: 13, name: "Данные - 13", isImportant: false, description: "Описание - 13" },
    { id: 14, name: "Данные - 14", isImportant: false, description: "Описание - 14" },
    { id: 15, name: "Данные - 15", isImportant: false, description: "Описание - 15" },
    { id: 16, name: "Данные - 16", isImportant: false, description: "Описание - 16" },
    { id: 17, name: "Данные - 17", isImportant: false, description: "Описание - 17" },
    { id: 18, name: "Данные - 18", isImportant: false, description: "Описание - 18" },
    { id: 19, name: "Данные - 19", isImportant: false, description: "Описание - 19" },
  ];

  const size = "1fr 1fr 120px 60px";

  const header = {
    name: "Имя",
    description: "Описание",
    important: "Важно",
    action: (
      <Box sx={{ placeSelf: "center" }}>
        <EditIcon />
      </Box>
    ),
  };

  const data = items.map((item) => {
    const { name, description, isImportant } = item;
    return {
      name,
      description,
      important: isImportant ? <CheckCircleIcon /> : <CancelIcon />,
      action: <DropAction onEdit={() => setFormState(item)} onDelete={() => setFormState(true)} />,
    };
  });

  return { data, header, size, setFormState };
};
