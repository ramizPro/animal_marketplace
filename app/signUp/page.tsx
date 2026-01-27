"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link"; 

export default function SignUpPage() {
  const router = useRouter(); //namenjeno za pošiljenje uporabnika na drugo stran, ko se uporabnik prijavi
  const [loading, setLoading] = useState(false); //namenjeno za prikaz loading takrat ko se funkcija izvaja

  /*
  Funkcija, ki se sproži ko se uporabnik želi registrerati,
   prebere vse vrednosti,
   pošlje zahtevo API register.
  */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    //prebere vrednosti iz forms
    const form = e.currentTarget;
    const username = (form.elements.namedItem("username") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      //pošlje podatke na API za registracijo
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      //če API vrže napako, se izpiše, ter pošlje nazaj uporabnika na /login
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Registration failed");
      }
      
      // FIX: Dodana potrditev uspešne registracije
      alert("Registracija uspešna! Sedaj se lahko prijaviš.");
      router.push("/login");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false); 
    }
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
          Registracija
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            name="username"
            type="text" //FIX #4: Spremenjen iz "username" v "text"
            placeholder="Uporabniško ime"
            required
            minLength={3} //FIX #4
            className="p-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"
          />
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
            minLength={5} //FIX #4
            className="p-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-second text-white p-3 rounded-lg text-lg font-semibold hover:bg-secondAcc transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Registriranje..." : "Registracija"}
          </button>
        </form>

        {/* Dodan link na prijavo*/}
        <div className="text-center text-sm">
          <span className="text-gray-700">Že imaš račun? </span>
          <Link href="/login" className="text-second font-semibold hover:underline">
            Prijavi se
          </Link>
        </div>
      </div>
    </main>
  );
}