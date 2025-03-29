import { AxiosResponse } from "axios";
import { api } from "./api.ts";

export const filesApi = {
  upload: async (props: FormData): Promise<AxiosResponse<DocumentType>> => {
    return api.baseInstance.post(`files/upload`, props, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data; boundary=PART",
      },
    });
  },
  download: async (fileRef: string): Promise<AxiosResponse<BlobPart>> => {
    return api.baseInstance.get(`files/download`, {
      params: { fileRef },
      responseType: "arraybuffer",
    });
  },
};
