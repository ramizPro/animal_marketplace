import Link from "next/link";

export default function Home() {
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
        <button className="login_button">Prijava</button>

        <Link href="/signUp">
          <button className="signup_button">Registracija</button>
        </Link>
      </div>
    </main>
  );
}
