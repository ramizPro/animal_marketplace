'use server';

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "9zday4uw", 
  dataset: "production",        
  useCdn: false,
  apiVersion: "2023-11-24",     
  // token: "YOUR_SANITY_WRITE_TOKEN", 
});

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const query = `*[_type=="user" && email==$email][0]`;
        const user = await client.fetch(query, { email: credentials.email });

        if (!user) return null;

        const match = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!match) return null;

        return {
          id: user._id,
          name: user.username,
          email: user.email,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
