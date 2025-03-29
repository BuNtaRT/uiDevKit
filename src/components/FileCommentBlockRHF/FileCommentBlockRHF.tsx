import { Box, Button, IconButton, Paper, TextField } from "@mui/material";
import { FC, useState } from "react";
import { Controller, useController, useFieldArray, useFormContext } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";

const FileCommentBlockRhf: FC<PropsType> = (props) => {
  const { name, canEdit = true } = props;

  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const controller = useController({ name });
  const { control } = useFormContext();
  const { fieldState } = controller;

  const error = fieldState.error?.message;

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  // Обработка добавления нового файла
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const previewUrl = reader.result as string;
        setPreviewImages((prev) => [...prev, previewUrl]);
        append({ file, title: "" });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={() => (
        <Paper
          sx={{
            p: 4,
            borderRadius: 2,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/* Кнопка добавления изображения */}
          {canEdit && (
            <Button variant="contained" component="label" sx={{ maxWidth: 300 }}>
              Добавить изображение
              <input type="file" accept="image/*" hidden onChange={handleFileChange} />
            </Button>
          )}

          {/* Список изображений с комментариями */}
          <Box sx={{ mt: 2 }}>
            {fields.map((field, index) => (
              <Paper
                key={field.id}
                elevation={3}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 1,
                  mb: 1,
                }}
              >
                {/* Превью изображения */}
                <Box
                  sx={{
                    width: "70%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden", // Обрезаем изображение, если оно выходит за границы
                  }}
                >
                  <img
                    src={previewImages[index]}
                    alt={`Предпросмотр ${index}`}
                    style={{
                      height: "100%", // Занимает полную высоту контейнера
                      objectFit: "cover", // Сохраняет пропорции и обрезает лишнее
                      width: "auto", // Ширина подстраивается автоматически
                    }}
                  />
                </Box>

                {/* Поле для заголовка */}
                <Controller
                  name={`${name}.${index}.title`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Описание"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={3}
                      sx={{
                        ml: 2,
                        width: "30%",
                        height: "100%", // Занимает полную высоту
                        "& .MuiInputBase-root": {
                          height: "100%", // Растягиваем внутренний контейнер TextField
                        },
                      }}
                    />
                  )}
                />

                {canEdit && (
                  <IconButton
                    onClick={() => {
                      remove(index);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Paper>
            ))}
          </Box>
          {error && <span style={{ color: "red" }}>{error}</span>}
        </Paper>
      )}
    />
  );
};

type PropsType = {
  name: string;
  canEdit?: boolean;
};

export type FilesTitleType = {
  file: File;
  title: string;
};

export default FileCommentBlockRhf;
