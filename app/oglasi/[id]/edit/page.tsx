import { notFound } from "next/navigation";
import Link from "next/link";

type Props = {
  params: {
    id: string;
  };
};

export default function EditOglasPage({ params }: Props) {
  const id = params.id;

  if (!id) {
    notFound();
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">Uredi oglas</h1>

      <p className="text-gray-600">ID oglasa: {id}</p>

      <Link
        href={`/oglasi/${id}`}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Nazaj na oglas
      </Link>
    </main>
  );
}
