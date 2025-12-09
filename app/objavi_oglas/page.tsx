"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const PASME = {
  Govedo: ["Holstein", "Limousine", "Angus", "Hereford"],
  Prašiči: ["Duroc", "Landrace", "Pietrain"],
  "Ovce & Koze": ["Burska", "Istrska", "Drežniška"],
  Perutnina: ["Kokoši", "Race", "Purani"],
  Konji: ["Lipicanec", "Haflinger", "Quarter Horse"],
} as const;

type VrstaKey = keyof typeof PASME;

export default function Oglas() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const [vrsta, setVrsta] = useState<VrstaKey | "">("");
  const [pasma, setPasma] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;

    const opis = (form.elements.namedItem("opis") as HTMLInputElement).value;
    const lokacija = (form.elements.namedItem("lokacija") as HTMLInputElement).value;
    const kontakt = (form.elements.namedItem("kontakt") as HTMLInputElement).value;
    const cena = Number(
      (form.elements.namedItem("cena") as HTMLInputElement).value
    );

    const tipZivali = vrsta;
    const pasmaValue = pasma;

    let slikaRef = null;

    if (imageFile) {
      const imgData = new FormData();
      imgData.append("file", imageFile);

      const imgRes = await fetch("/api/upload-image", {
        method: "POST",
        body: imgData,
      });

      const imgJson = await imgRes.json();

      slikaRef = {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imgJson.asset._id,
        },
      };
    }
    const res = await fetch("/api/oglas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        opis,
        pasma: pasmaValue,
        tipZivali,
        lokacija,
        kontakt,
        cena,
        slika: slikaRef,
        avtor: "anon",
      }),
    });

    if (res.ok) {
      alert("Oglas uspešno objavljen!");
      router.push("/mainPage");
    } else {
      alert("Napaka pri objavi oglasa.");
    }

    setLoading(false);
  };

  return (
    <main
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('/background.png')",
        backgroundSize: "cover",
      }}
    >
      <div className="bg-black/60 shadow p-6 flex flex-col md:flex-row justify-between text-align-center">
        <h1 className="header_title">
          AgroTrg - Kupujte in prodajajte živino na spletu
        </h1>
        <Link
          href="/mainPage"
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Nazaj
        </Link>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 p-8 rounded-xl shadow-lg w-96 mx-auto mt-10 flex flex-col gap-4"
      >
        <input
          name="opis"
          placeholder="Opis"
          required
          className="p-2 border rounded"
        />

        {/* vrsta */}
        <select
          value={vrsta}
          onChange={(e) => {
            setVrsta(e.target.value as VrstaKey);
            setPasma("");
          }}
          required
          className="p-2 border rounded"
        >
          <option value="">Izberi vrsto živali</option>
          {Object.keys(PASME).map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>

        {/* pasma */}
        <select
          value={pasma}
          onChange={(e) => setPasma(e.target.value)}
          required
          disabled={!vrsta}
          className="p-2 border rounded"
        >
          <option value="">Izberi pasmo</option>
          {vrsta &&
            PASME[vrsta].map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
        </select>

        <input
          name="lokacija"
          placeholder="Lokacija"
          required
          className="p-2 border rounded"
        />

        <input
          name="kontakt"
          placeholder="Kontakt"
          required
          className="p-2 border rounded"
        />

        <input
          name="cena"
          type="number"
          placeholder="Cena (€)"
          required
          className="p-2 border rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          className="p-2 border rounded bg-white"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Objavljam..." : "Objavi oglas"}
        </button>
      </form>
    </main>
  );
}
