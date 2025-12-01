'use server';

//import { createClient } from "@sanity/client";
import bcrypt from "bcryptjs";
import {writeClient} from "@/sanity/lib/right-client";

const client = writeClient;
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
