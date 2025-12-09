'use server';

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "9zday4uw",
  dataset: "production",
  useCdn: false,
  apiVersion: "2023-11-24",
  token: process.env.SANITY_WRITE_TOKEN,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      opis,
      pasma,
      tipZivali,
      lokacija,
      kontakt,
      cena,
      avtor,
      slika,  
    } = body;

    const doc = await client.create({
      _type: "oglas",
      opis,
      pasma,
      tipZivali,
      lokacija,
      kontakt,
      cena,
      avtor,
      slika,   
    });

    return new Response(JSON.stringify({ success: true, doc }), {
      status: 201,
    });
  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
