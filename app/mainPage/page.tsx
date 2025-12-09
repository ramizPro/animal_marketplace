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
      console.log("OGLASI IZ API:", data);
      setOglasi(data);
    };

    fetchOglasi();
  }, []);

  return (
    <main
      className="min-h-screen bg-gray-100"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <div className="bg-black/60 shadow p-6 flex flex-col md:flex-row justify-between text-align-center">
        <h1 className="header_title">
          AgroTrg - Kupujte in prodajajte živino na spletu
        </h1>

        <Link
          href="/"
          className="mt-4 md:mt-0 px-6 py-3 bg-grey-600 text-white rounded-lg hover:bg-grey-700"
        >
          Odjava
        </Link>

        <Link
          href="/objavi_oglas"
          className="mt-4 md:mt-0 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          + Objavi oglas
        </Link>
      </div>

      <div className="flex flex-col md:flex-row mt-6 gap-6 px-6">
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
              {!vrsta && <option>Izberite vrsto...</option>}
              {vrsta &&
                PASME[vrsta].map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
            </select>
          </div>
        </aside>

        <section className="flex-1">
          <h2 className="text-2xl font-bold mb-4">Vsi oglasi</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {oglasi.map((oglas) => (
              <div key={oglas._id} className="bg-white rounded-xl shadow p-4 hover:scale-105 transition-transform">
                {oglas.slika?.asset?.url && (
                  <img
                    src={oglas.slika}
                    alt="oglas"
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />
                )}

                <h3 className="font-bold text-lg mb-1">{oglas.opis}</h3>
                <p><b>Pasma:</b> {oglas.pasma}</p>
                <p><b>Tip:</b> {oglas.tipZivali}</p>
                <p><b>Lokacija:</b> {oglas.lokacija}</p>
                <p><b>Kontakt:</b> {oglas.kontakt}</p>

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
