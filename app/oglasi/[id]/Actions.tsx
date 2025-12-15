"use client";

import { useRouter } from "next/navigation";

export default function OglasActions({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Res želiš izbrisati oglas?")) return;

    const res = await fetch(`/api/oglas/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.push("/mainPage");
    } else {
      alert("Napaka pri brisanju oglasa");
    }
  }

  return (
    <div className="flex gap-4 mt-6">
        {/*
      <button
        onClick={() => router.push(`/oglasi/${id}/edit`)}
        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
      >
        Uredi
      </button>
        
      */}
      <button
        onClick={handleDelete}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Izbriši
      </button>
    </div>
  );
}
