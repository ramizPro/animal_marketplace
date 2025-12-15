'use server';

import { createClient } from "@sanity/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const client = createClient({
  projectId: "9zday4uw",
  dataset: "production",
  apiVersion: "2023-11-24",
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
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
      avtor,
      "slika": slika.asset->url
    }
  `;

  const oglasi = await client.fetch(query);
  return Response.json(oglasi);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const { opis, pasma, tipZivali, lokacija, kontakt, cena, slika } = body;

  const doc = await client.create({
    _type: "oglas",
    opis,
    pasma,
    tipZivali,
    lokacija,
    kontakt,
    cena,
    slika,
    avtor: session.user.id, 
  });

  return new Response(JSON.stringify(doc), { status: 201 });
}
