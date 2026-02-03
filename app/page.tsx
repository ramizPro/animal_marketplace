import Link from "next/link";

export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col justify-center items-center text-center"
      style={{
        backgroundImage: "url('/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <h1 style={{ WebkitTextStroke: "1px black" }} 
          className="text-white text-6xl font-bold mb-10 drop-shadow-lg">
        AgroTrg
      </h1>
      <div className="bg-white/80 p-8 rounded-xl shadow-lg flex flex-col gap-4 w-60">
        <Link href="/">
          <button className="login_button">Prijava</button>
        </Link>

        <Link href="/signUp">
          <button className="signup_button">Registracija</button>
        </Link>
      </div>
    </main>
  );
}

