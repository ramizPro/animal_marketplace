"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";


 //Bug 3#: SessionProvider wrapper
export function SessionProvider({ children }: { children: React.ReactNode }) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}