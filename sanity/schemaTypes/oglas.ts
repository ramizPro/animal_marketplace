import { defineType } from "sanity";

export default defineType({
  name: "oglas",
  title: "Oglas",
  type: "document",
  fields: [
    { name: "opis", title: "Opis", type: "string" },
    { name: "pasma", title: "Pasma", type: "string" },
    { name: "tipZivali", title: "Tip živali", type: "string" },
    { name: "lokacija", title: "Lokacija", type: "string" },
    { name: "kontakt", title: "Kontakt", type: "string" },
    { name: "cena", title: "Cena", type: "number" },
    { name: "avtor", title: "Avtor", type: "string" },

    {
      name: "slika",
      title: "Slika",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
});
