"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const PASME = {
    Govedo: ["Holstein", "Limousine", "Angus", "Hereford"],
    Prašiči: ["Duroc", "Landrace", "Pietrain"],
    "Ovce & Koze": ["Burska", "Istrska", "Drežniška"],
    Perutnina: ["Kokoši", "Race", "Purani"],
    Konji: ["Lipicanec", "Haflinger", "Quarter Horse"],
  } as const;

  type VrstaKey = keyof typeof PASME;

  const [oglasi, setOglasi] = useState<any[]>([]);
  const [vrsta, setVrsta] = useState<VrstaKey | "">("");
  const [pasma, setPasma] = useState("");

  useEffect(() => {
    const fetchOglasi = async () => {
      const res = await fetch("/api/oglasi");
      const data = await res.json();
      setOglasi(data);
    };

    fetchOglasi();
  }, []);
  const filtriraniOglasi = oglasi.filter((oglas) => {
  const matchVrsta =
    !vrsta || oglas.tipZivali?.toLowerCase() === vrsta.toLowerCase();

  const matchPasma =
    !pasma ||
    oglas.pasma?.toLowerCase().includes(pasma.toLowerCase()) ||
    pasma.toLowerCase().includes(oglas.pasma?.toLowerCase());

  return matchVrsta && matchPasma;
  });


  return (
    <main
      className="min-h-screen bg-gray-100"
      style={{
        backgroundImage: "url('/background.png')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* HEADER */}
      <div className="bg-black/60 shadow py-3 px-6 flex items-center justify-between relative backdrop-blur-md">
          <Link
            href="/"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Odjava
          </Link>
          <h1 style={{ WebkitTextStroke: "1px black" }} 
          className="text-white text-5xl font-bold mb-10 drop-shadow-lg">
            AgroTrg
          </h1>
          <Link
            href="/objavi_oglas"
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
          >
            Objavi 
          </Link>
      </div>

      <div className="flex flex-col md:flex-row mt-6 gap-6 px-6">
        {/* FILTRI */}
        <aside className="w-full md:w-64 bg-white shadow-md rounded-xl p-4 h-fit">
          <h2 className="text-xl font-semibold mb-4">Filtri</h2>

          <div className="mb-4">
            <label className="block font-medium mb-1">Vrsta živali</label>
            <select
              className="w-full border rounded-lg p-2"
              value={vrsta}
              onChange={(e) => {
                setVrsta(e.target.value as VrstaKey | "");
                setPasma("");
              }}
            >
              <option value="">Vse</option>
              <option value="Govedo">Govedo</option>
              <option value="Prašiči">Prašiči</option>
              <option value="Ovce & Koze">Ovce & Koze</option>
              <option value="Perutnina">Perutnina</option>
              <option value="Konji">Konji</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Pasma živali</label>
            <select
              className="w-full border rounded-lg p-2"
              value={pasma}
              onChange={(e) => setPasma(e.target.value)}
              disabled={!vrsta}
            >
              {<option>Izberite vrsto...</option>}
              {vrsta &&
                PASME[vrsta].map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
            </select>
          </div>
        </aside>

        {/* OGLASI */}
        <section className="flex-1">
          <h2
            style={{ WebkitTextStroke: "1px black" }}
            className="text-white text-6xl font-bold mb-10 drop-shadow-lg "
          >
            Vsi oglasi
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtriraniOglasi.map((oglas) => (
              <div
                key={oglas._id}
                className="bg-white rounded-xl shadow p-4 hover:scale-105 hover:shadow-2xl transition-transform"
              >
                {oglas.slika && (
                  <img
                    src={oglas.slika}
                    alt="oglas"
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />
                )}

                <h3 className="font-bold text-lg mb-1">{oglas.opis}</h3>
                <p>
                  <b>Pasma:</b> {oglas.pasma}
                </p>
                <p>
                  <b>Tip:</b> {oglas.tipZivali}
                </p>
                <p>
                  <b>Lokacija:</b> {oglas.lokacija}
                </p>
                <p>
                  <b>Kontakt:</b> {oglas.kontakt}
                </p>

                <p className="mt-2 text-xl font-bold text-green-600">
                  {oglas.cena} €
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
