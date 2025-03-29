export type IdType = {
  id: string;
};

export type SupplementType = {
  title: string; // заголовок
  file: string; // путь до файла в исходных данных
};
export type SupplementsType = SupplementType[];

export type EntitiesType<T> = T[];

export type EntitiesResponseType<T> = { items: EntitiesType<T>; totalCount: number };

export type SelfLinkType = {
  _links: { self: LinkType } & Record<string, LinkType>;
};
export type LinkType = { href: string };
export type LinksType = LinkType[];
