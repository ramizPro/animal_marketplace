"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

   /*
    Funkcija se sproži, ko se uporabnik prijavi.
     prebere email in geslo iz forma
     uporabi NextAuth signIn z "credentials" providerjem
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    //NextAuth funkcija za sing in
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      router.push("/mainPage");
    } else {
      alert("Invalid email or password");
    }

    setLoading(false);
  };

  return (
    <main
      className="min-h-screen flex justify-center items-center"
      style={{
        backgroundImage: "url('/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white/80 p-10 rounded-xl shadow-lg w-80 flex flex-col gap-6 backdrop-blur-sm">
        <h1
          style={{ WebkitTextStroke: "1px black" }}
          className="text-3xl font-bold text-center text-white drop-shadow-md"
        >
          Prijava
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Mail"
            required
            className="p-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"
          />

          <input
            name="password"
            type="password"
            placeholder="Geslo"
            required
            className="p-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-secondAcc text-white p-3 rounded-lg text-lg font-semibold hover:bg-second transition"
          >
            {loading ? "Prijavljanje..." : "Prijava"}
          </button>
        </form>
      </div>
    </main>
  );
}
