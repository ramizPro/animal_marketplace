import { sanityClient, sanityWriteClient } from "@/sanity/lib/sanity";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import OglasActions from "./Actions";
import { HeaderNazaj } from "@/app/components/Header";

const client = sanityClient;

type Props = {
  params: { id: string };
};

export default async function OglasPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // pridobi uporabnikško sejo
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;
  const role = (session?.user as any)?.role;

  //pridobi query za posamezen oglas
  const oglas = await client.fetch(
    `*[_type=="oglas" && _id==$id][0]{
      _id,
      opis,
      pasma,
      tipZivali,
      lokacija,
      kontakt,
      cena,
      avtor,
      "slika": slika.asset->url
    }`,
    { id }
  );

  if (!oglas) return notFound();

  const isOwner = userId && oglas.avtor === userId;
  const isAdmin = role === "admin";
  const canEdit = isOwner || isAdmin;

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
      <HeaderNazaj />

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6 mt-6">
        {oglas.slika && (
          <img
            src={oglas.slika}
            alt={oglas.opis}
            className="w-full h-80 object-cover rounded-lg mb-4"
          />
        )}

        <h1 className="text-3xl font-bold mb-2">{oglas.opis}</h1>

        <p><b>Pasma:</b> {oglas.pasma}</p>
        <p><b>Vrsta:</b> {oglas.tipZivali}</p>
        <p><b>Lokacija:</b> {oglas.lokacija}</p>
        <p><b>Kontakt:</b> {oglas.kontakt}</p>

        <p className="mt-4 text-2xl font-bold text-main">
          {oglas.cena} €
        </p>
        {canEdit && <OglasActions id={oglas._id} />}
      </div>
    </main>
  );
}
