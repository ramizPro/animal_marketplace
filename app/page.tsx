import './globals.css';

export default function Home() {
  return (
    <main style={{ textAlign: "center", padding: "2rem" }}>
      <img 
        src="/background.png" 
        alt="Kmečke živali" 
        style={{ width: "100%", maxWidth: "800px", borderRadius: "1rem" }}
      />
      <h1 style={{
        color: "black",
        fontSize: "2rem",
        fontWeight: "bold",
        marginTop: "1.5rem"
      }}>
        Kupujte in prodajajte živino na spletu
      </h1>
    </main>
  );
}
