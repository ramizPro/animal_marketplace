"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";

export default function Home() {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const form = e.currentTarget;
  const email = (form.elements.namedItem("username") as HTMLInputElement).value;
  const password = (form.elements.namedItem("password") as HTMLInputElement).value;

  await signIn("credentials", {
    email,
    password,
    callbackUrl: "/mainPage",
  });
};

  return (
    <main
      style={{
        backgroundImage: "url('/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <header className="header_style">
        <h1 className="header_title">
          AgroTrg - Kupujte in prodajajte živino na spletu
        </h1>
      </header>

      <div className="card_style">
        <form onSubmit={handleSubmit}>
          Uporabniško ime:
          <div className="reg_username">
            <input type="text" id="username" name="username" required />
          </div>

          Geslo:
          <div className="reg_password">
            <input type="password" id="password" name="password" required />
          </div>

          <button className="login_button" type="submit">
            Prijava
          </button>

          <div style={{ marginTop: "1rem" }}>
            <Link href="/signUp">Nimate računa? Registrirajte se!</Link>
          </div>
        </form>
      </div>
    </main>
  );
}
