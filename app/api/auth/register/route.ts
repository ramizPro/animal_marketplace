'use server';


import bcrypt from "bcryptjs";
import { createClient } from "@sanity/client";

//inicializacija sanity client, da lahko prosto dostopa do baze
const client = createClient({
  projectId: "9zday4uw",
  dataset: "production",
  useCdn: false,
  apiVersion: "2023-11-24",
  token: process.env.SANITY_WRITE_TOKEN,
});

console.log("TOKEN EXISTS?", !!process.env.SANITY_WRITE_TOKEN);

/*
  POST za registracijo uporabnika
  prebere podatke, ustvari novega uporabnika pod pravimi pogoji.
 */
export async function POST(req: Request) {
  try {
    //pridobi podatke
    const body = await req.json();
    const { username, email, password } = body;
    //hash
    const passwordHash = await bcrypt.hash(password, 10);

    //ustvari novega uporabnika
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
