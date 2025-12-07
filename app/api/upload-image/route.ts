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
    const data = await req.formData();
    const file = data.get("file") as File;

    if (!file) {
      return new Response(JSON.stringify({ error: "No file" }), { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const asset = await client.assets.upload("image", buffer, {
      filename: file.name,
      contentType: file.type,
    });

    return new Response(JSON.stringify({ asset }), { status: 201 });
  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
