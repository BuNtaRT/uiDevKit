import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid2,
  InputLabel,
  Paper,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { Controller } from "react-hook-form";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDropdown } from "./useDropdown.ts";

const DropdownAreaRHF: FC<PropsType> = (props) => {
  const { name, label = "Загрузите файлы" } = props;

  const methods = useDropdown(name);
  const { control, fileInputRef, dragActive, error, files } = methods;
  const { handleRemoveFile, handleFileSelect, handleDrag, handleDrop } = methods;

  return (
    <>
      <InputLabel sx={{ textAlign: "center", mb: 1, color: "text.primary" }}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={() => (
          <Paper
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            sx={{
              p: 4,
              border: `2px dashed ${dragActive ? "#1976d2" : "#ccc"}`,
              borderRadius: 2,
              textAlign: "center",
              cursor: "pointer",
              bgcolor: dragActive ? "#e3f2fd" : "transparent",
              transition: "background-color 0.3s ease, border-color 0.3s ease",
            }}
          >
            {/* Отображение загруженных файлов */}
            {files && files.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Grid2 container spacing={2}>
                  {files.map((file, index) => (
                    <Grid2 key={index} size={{ xs: 6, sm: 4, md: 2 }}>
                      <Card sx={{ maxWidth: 200, height: "100%" }}>
                        <CardMedia
                          sx={{
                            height: 80,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: "#f5f5f5",
                          }}
                        >
                          <InsertDriveFileIcon sx={{ fontSize: 48, color: "black" }} />
                        </CardMedia>
                        <CardContent sx={{ textAlign: "center", p: 1 }}>
                          <Typography variant="subtitle2" noWrap title={file.name}>
                            {file.name}
                          </Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: "center", p: 1 }}>
                          <Button
                            size="small"
                            color="error"
                            variant="text"
                            onClick={() => handleRemoveFile(index)}
                            endIcon={<DeleteIcon />}
                          >
                            Удалить
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid2>
                  ))}
                </Grid2>
              </Box>
            )}
            <Typography variant="body1" color="textSecondary">
              Перетащите файлы сюда или нажмите для выбора
            </Typography>
            <input
              type="file"
              multiple
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileSelect}
            />
            <Button
              variant="outlined"
              color="primary"
              onClick={() => fileInputRef.current?.click()}
              sx={{ mt: 2 }}
            >
              Выбрать файлы
            </Button>
            {error && <span style={{ color: "red" }}>{error}</span>}
          </Paper>
        )}
      />
    </>
  );
};

type PropsType = {
  name: string;
  label?: string;
  accept: string;
};

export default DropdownAreaRHF;
