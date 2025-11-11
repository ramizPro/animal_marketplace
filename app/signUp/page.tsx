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
        <form>
          Uporabniško ime:
          <div className="reg_username">
            <input type="text" id="username" name="username" required />
          </div>
          E-pošta:
          <div className="reg_mail">
            <input type="text" id="mail" name="mail" required />
          </div>
          Geslo:
          <div className="reg_password">
            <input type="password" id="password" name="password" required />
          </div>
          <Link href="/mainPage">
            <button className="signup_button" type="submit">Registracija</button>
          </Link>
        </form>
      </div>
       </main>
  );
}

  