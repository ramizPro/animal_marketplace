import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "9zday4uw",
  dataset: "production",
  useCdn: false,
  apiVersion: "2023-11-24",
  token: process.env.SANITY_WRITE_TOKEN,
});

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await client.fetch(
          `*[_type=="user" && email==$email][0]`,
          { email: credentials.email }
        );

        if (!user) return null;

        const match = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        );
        if (!match) return null;

        return {
          id: user._id,
          name: user.username,
          email: user.email,
          role: user.role ?? "user",
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};
