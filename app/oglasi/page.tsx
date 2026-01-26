import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/*
  Pridobi posamezen oglas preko API-ja.
  cache: "no-store" zagotovi, da vedno dobimo sveže podatke.
 */
async function getOglas(id: string) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/oglas/${id}`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function OglasPage({
  params,
}: {
  params: { id: string };
}) {
  const oglas = await getOglas(params.id);
  const session = await getServerSession(authOptions);

  const isOwner = session?.user?.id === oglas.avtor;
  const isAdmin = session?.user?.role === "admin";

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6">
        {oglas.slika && (
          <img
            src={oglas.slika}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
        )}

        <h1 className="text-2xl font-bold mb-2">{oglas.opis}</h1>
        <p><b>Pasma:</b> {oglas.pasma}</p>
        <p><b>Tip:</b> {oglas.tipZivali}</p>
        <p><b>Lokacija:</b> {oglas.lokacija}</p>
        <p><b>Kontakt:</b> {oglas.kontakt}</p>

        <p className="mt-4 text-2xl font-bold text-main">
          {oglas.cena} €
        </p>

        {(isOwner || isAdmin) && (
          <div className="flex gap-4 mt-6">
            <a
              href={`/oglas/${oglas._id}/edit`}
              className="px-4 py-2 bg-second text-white rounded-lg"
            >
              Uredi
            </a>

            <button
              className="px-4 py-2 bg-red-600 text-white rounded-lg"
            >
                Izbriši
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
