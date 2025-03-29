import { CurrentUserType } from "../atoms/atoms.ts";

export const sections = (user?: CurrentUserType): SectionsType => {
  const { isAdmin } = user || {};

  const administrationSections = isAdmin
    ? [
        {
          title: "Секция",
          sections: [
            {
              title: "Файлы",
              route: '',
            },
          ],
        },
      ]
    : [];

  return [
    {
      title: "Станица",
      route: '',
    },
    ...administrationSections,
  ];
};

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
