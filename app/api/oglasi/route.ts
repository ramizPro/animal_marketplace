'use server';

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "9zday4uw",
  dataset: "production",
  apiVersion: "2023-11-24",
  useCdn: false,
});

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
      slika {
        asset->{
          _id,
          url
        }
      }
    }
  `;

  const oglasi = await client.fetch(query);

  return new Response(JSON.stringify(oglasi), { status: 200 });
}
