export type IdType = {
  id: string;
};

export type EntitiesType<T> = T[];

export type EntitiesResponseType<T> = { items: EntitiesType<T>; totalCount: number };

export type SelfLinkType = {
  _link: { self: LinkType };
};
export type LinkType = { href: string };
export type LinksType = LinkType[];
