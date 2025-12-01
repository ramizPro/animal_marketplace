import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100"
          style={{
            backgroundImage: "url('/background.png')"
        }}>
      <div className="bg-black/60 shadow p-6 flex flex-col md:flex-row justify-between text-align-center">
        <h1 className="header_title">AgroTrg - Kupujte in prodajajte živino na spletu</h1>
      </div>
      <div className="ads_style_welcome_page">
          <Link href="/login">
            <button className="login_button">Prijava</button>
          </Link>
          <Link href="/signUp">
            <button className="signup_button">Registracija</button>
          </Link>
      </div>
    </main>
  );
}
