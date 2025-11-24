'use server';

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const users = []; // replace with DB

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const user = users.find(u => u.email === credentials.email);
        if (!user) return null;

        const match = await bcrypt.compare(credentials.password, user.password);
        if (!match) return null;

        return { id: user.id, email: user.email };
      },
    }),
  ],
  session: { strategy: "jwt" },
});

export { handler as GET, handler as POST };
