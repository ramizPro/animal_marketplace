"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "./globals.css"; 

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const username = (form.elements.namedItem("username") as HTMLInputElement).value;
    const email = (form.elements.namedItem("mail") as HTMLInputElement).value;
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
      <div className="card_style">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input name="username" placeholder="Username" required />
          </div>
          <div>
            <input name="mail" type="email" placeholder="Email" required />
          </div>
          <div>
            <input name="password" type="password" placeholder="Password" required />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </main>
  );
}
