'use server';

import { sanityClient, sanityWriteClient } from "@/sanity/lib/sanity";

const client = sanityClient;

/*
 GET endpoint za pridobivanje vseh oglasov.
 pogleda podatke v bazi
 sortiranje po datumu ustvarjanja (najnovejši prvi)
 vračanje samo potrebnih polj
 */
export async function GET() {
  const query = `
    *[_type == "oglas"] | order(_createdAt desc) {
      _id,
      opis,
      pasma,
      tipZivali,
      lokacija,
      kontakt,
      cena,
      "slika": slika.asset->url
    }
  `;

  const oglasi = await client.fetch(query);

  return Response.json(oglasi);
}
