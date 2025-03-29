import { filesApi } from "../api/filesApi.ts";
import { saveAs } from "file-saver";
import { api } from "../api/api.ts";

export const getFileBlob = async (link: string) => {
  const res = await filesApi.download(encodeURIComponent(link));
  return new Blob([res.data], { type: res.headers["content-type"] });
};

export const downloadFile = async (link?: string) => {
  if (!link) return;

  try {
    const blob = await getFileBlob(link);

    // Извлекаем имя файла из URL (если нужно)
    const fileName = link.split("/").pop() || "downloaded-file";

    // Используем file-saver для скачивания файла
    saveAs(blob, fileName);
  } catch (error) {
    console.error("Ошибка при скачивании файла:", error);
  }
};

export const getFile = async (link?: string) => {
  if (!link) return;

  const blob = await getFileBlob(link);
  return new File([blob], link, { type: blob.type });
};

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = (await filesApi.upload(formData)).data;

  return res as unknown as string;
};

//--------------------------------------

export const getPhotosByLink = async (link: string) => {
  const res = await api.rawInstance.get(link);

  const embedded = await res.data._embedded;

  const arrayLinks: LinkDescriptionType[] = embedded[Object.keys(embedded)[0]].map(
    ({ fileLink, description }: LinkDescriptionType) => ({ fileLink, description })
  );

  const files: FileDescriptionType[] = [];

  for (const linkFile of arrayLinks) {
    const file = await getFile(linkFile.fileLink);
    if (file) files.push({ file, description: linkFile.description });
  }

  return files;
};

type LinkDescriptionType = { fileLink: string; description: string };
type FileDescriptionType = { file: File; description: string };
