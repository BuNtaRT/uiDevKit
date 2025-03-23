export const sections = (): SectionsType => [
  {
    title: "Страница",
    route: "*",
  },
  {
    title: "Секция",
    sections: [
      {
        title: "Страница",
        route: "*",
      },
    ],
  },
];

export type SectionsType = SectionType[];

export type SectionType = SimpleSectionType | PartSectionType;

export type SimpleSectionType = {
  title: string;
  route: string;
};
type PartSectionType = {
  title: string;
  sections: SimpleSectionType[];
};
