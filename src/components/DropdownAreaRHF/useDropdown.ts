import { useRef, useState } from "react";
import { useController, useFormContext } from "react-hook-form";

export const useDropdown = (name: string) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Ссылка на input

  const controller = useController({ name });
  const { control, setValue, watch } = useFormContext();
  const { fieldState } = controller;
  const error = fieldState.error?.message;

  const [dragActive, setDragActive] = useState(false);

  const files = watch(name) as File[]; // Получаем текущие файлы из формы

  // Обработка перетаскивания файлов
  const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "dragenter" || event.type === "dragover") {
      setDragActive(true);
    } else if (event.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Обработка drop событий
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setValue(name, Array.from(event.dataTransfer.files));
    }
  };

  // Обработка выбора файлов через input
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setValue(name, files.concat(Array.from(event.target.files)));
    }
  };

  // Удаление файла
  const handleRemoveFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setValue(name, updatedFiles);
  };

  return {
    fileInputRef,
    error,
    control,
    dragActive,
    handleDrag,
    handleDrop,
    handleFileSelect,
    handleRemoveFile,
    files,
  };
};
