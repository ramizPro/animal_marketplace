import './globals.css';

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
    <header
      style={{
          width: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          padding: "1rem 0",
          position: "absolute",
          top: 0,
          left: 0,
          textAlign: "center",
      }}
    >
      <h1
        style={{
            color: "white",
            fontSize: "2rem",
            fontWeight: "bold",
            margin: 0,
        }}
      >
        AgroTrg - Kupujte in prodajajte živino na spletu
      </h1>
    </header>
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "2rem",
          borderRadius: "10px",
          maxWidth: "600px",
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            marginBottom: "1rem",
            fontWeight: "bold",
          }}
        >
          Prijava
        </h2>
        <input type ="text" placeholder="Uporabniško ime" 
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem", borderRadius: "5px", border: "1px solid #ccc" }} />
        <input type ="password" placeholder="Geslo" style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem", borderRadius: "5px", border: "1px solid #ccc" }} />
        <button 
          style={{ width: "100%", padding: "0.75rem", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", fontSize: "1rem", cursor: "pointer" }}>
          Prijava
        </button>
      </div>
    </main>
  );
}
