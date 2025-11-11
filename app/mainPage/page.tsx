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

      
    </main>
  );
}
