export const getIdFromLink = (link: string) => link.split("/").at(-1) ?? "";
