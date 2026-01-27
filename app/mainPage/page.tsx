"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PASME, VrstaKey } from "@/lib/constants";
import { HeaderMain } from "@/app/components/Header";

export default function Home() {
  //stanje za oglase, vrste in pasme
  const [oglasi, setOglasi] = useState<any[]>([]);
  const [vrsta, setVrsta] = useState<VrstaKey | "">("");
  const [pasma, setPasma] = useState("");

   //FIX #6: Dodana stanja za loading in error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /*
    ko se stran zažene se tudi ta funkcija zažene,
    pridobi vse oglase iz API,
    ter jih shrane v stanje "Oglasi"
  */
   useEffect(() => {
    const fetchOglasi = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await fetch("/api/oglas");
        
        // FIX #6: Preveri status
        if (!res.ok) {
          throw new Error("Napaka pri pridobivanju oglasov");
        }
        
        const data = await res.json();
        setOglasi(data);
      } catch (err: any) {
        // FIX #6: Error handling
        console.error("Fetch error:", err);
        setError(err.message || "Prišlo je do napake");
      } finally {
        setLoading(false);
      }
    };
    
    fetchOglasi();
  }, []);

  //funkcija za filtreranje oglasov.
  //filtrera po izbrani pasmi in po vrsti živali
  const filtriraniOglasi = oglasi.filter((oglas) => {
    const matchVrsta =
      !vrsta || oglas.tipZivali?.toLowerCase() === vrsta.toLowerCase();

    const matchPasma =
      !pasma ||
      oglas.pasma?.toLowerCase().includes(pasma.toLowerCase());

    return matchVrsta && matchPasma;
  });

  return (
    <main
      className="min-h-screen"
      style={{
        backgroundImage: "url('/background.png')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      {/* HEADER */}
      <HeaderMain />

      <div className="flex gap-6 p-6">
        {/* FILTRI */}
        <aside className="w-64 bg-white rounded-xl shadow p-4">
          <h2 className="font-bold mb-4">Filtri</h2>

          <select
            className="w-full border p-2 rounded mb-3"
            value={vrsta}
            onChange={(e) => {
              setVrsta(e.target.value as VrstaKey | "");
              setPasma("");
            }}
          >
            <option value="">Vse vrste</option>
            {Object.keys(PASME).map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>

          <select
            className="w-full border p-2 rounded"
            disabled={!vrsta}
            value={pasma}
            onChange={(e) => setPasma(e.target.value)}
          >
            <option value="">Vse pasme</option>
            {vrsta &&
              PASME[vrsta].map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
          </select>
        </aside>

        {/* OGLASI */}
        <section className="flex-1">
          {/*FIX #6: Loading in error stanja */}
          {loading && (
            <div className="text-center py-10">
              <p className="text-xl">Nalagam oglase...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p className="font-bold">Napaka</p>
              <p>{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Poskusi ponovno
              </button>
            </div>
          )}

          {!loading && !error && filtriraniOglasi.length === 0 && (
            <div className="text-center py-10">
              <p className="text-xl">Ni oglasov za prikaz</p>
            </div>
          )}

          {!loading && !error && filtriraniOglasi.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtriraniOglasi.map((oglas) => (
                <Link
                  href={`/oglasi/${oglas._id}`}
                  key={oglas._id}
                  className="bg-white rounded-xl shadow p-4 hover:scale-105 transition cursor-pointer"
                >
                  {oglas.slika && (
                    <img
                      src={oglas.slika}
                      alt={oglas.opis}
                      className="w-full h-48 object-cover rounded mb-2"
                    />
                  )}
                  <h3 className="font-bold">{oglas.opis}</h3>
                  <p className="text-gray-600">{oglas.pasma}</p>
                  <p className="text-main font-bold">{oglas.cena} €</p>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
