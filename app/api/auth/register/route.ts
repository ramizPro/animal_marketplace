'use server';

import { createClient } from "@sanity/client";
import bcrypt from "bcryptjs";

// Sanity client — must have write token
const client = createClient({
  projectId: "9zday4uw", 
  dataset: "production",
  useCdn: false,
  token: "sk9jjIiytimZHY4Bp0IyfMDqNEvEWiefWzKvTfSrSPChHq9uE6B650SD6XuSndI2xRPncWkgWyD6cfiXt9La2twSrsKvuDZemTMHi9bjhgSJ51KFBbIeHV1TWKPLPLNFHOej4wml99DuayibV7ux7uipKN319lYhILQoS8FLNxYLofjrMwuC", // must have write access
  apiVersion: "2023-11-24",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, email, password } = body;

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create new user in Sanity
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
