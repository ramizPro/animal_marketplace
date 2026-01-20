"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const form = e.currentTarget;
    const username = (form.elements.namedItem("username") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Registration failed");
      }
      router.push("/login");
    } catch (error: any) {
      alert(error.message);
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
          Registracija
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            name="username"
            type="username"
            placeholder="Uporabniško ime"
            required
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
            className="p-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-900 text-white p-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Registriranje..." : "Registracija"}
          </button>
        </form>
      </div>
    </main>
  );
}
