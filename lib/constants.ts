// Seznam vrst živali in pripadajočih pasem
export const PASME = {
  Govedo: ["Holstein", "Limousine", "Angus", "Hereford"],
  Prašiči: ["Duroc", "Landrace", "Pietrain"],
  "Ovce & Koze": ["Burska", "Istrska", "Drežniška"],
  Perutnina: ["Kokoši", "Race", "Purani"],
  Konji: ["Lipicanec", "Haflinger", "Quarter Horse"],
} as const;

export type VrstaKey = keyof typeof PASME;