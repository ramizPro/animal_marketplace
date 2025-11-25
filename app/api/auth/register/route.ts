'use server';

import { createClient } from "@sanity/client";
import bcrypt from "bcryptjs";

const client = createClient({
  projectId: "9zday4uw", 
  dataset: "production",
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: "2023-11-24",

});
console.log("TOKEN EXISTS?", !!process.env.SANITY_WRITE_TOKEN);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, email, password } = body;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await client.create({
      _type: "user",
      username,
      email,
      passwordHash,
    });

    return new Response(JSON.stringify({ user }), { status: 201 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
