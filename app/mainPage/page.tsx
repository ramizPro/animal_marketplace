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
      const res = await fetch("/api/oglas");
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
      <div className="bg-black/60 backdrop-blur-md p-4 flex justify-between items-center">
        <Link
          href="/"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Odjava
        </Link>

        <h1 className="text-white text-4xl font-bold">AgroTrg</h1>

        <Link
          href="/objavi_oglas"
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          Objavi
        </Link>
      </div>

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
                    className="w-full h-48 object-cover rounded mb-2"
                  />
                )}
                <h3 className="font-bold">{oglas.opis}</h3>
                <p>{oglas.pasma}</p>
                <p className="text-green-600 font-bold">{oglas.cena} €</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
