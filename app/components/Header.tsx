"use client";

import Link from "next/link";
import { signOut } from "next-auth/react"; //Fix #5 - dodano
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export function HeaderMain() {
  return (
    <div className="bg-black/60 backdrop-blur-md p-4 flex justify-between items-center">
      <Odjava />

      <h1 className="text-white text-4xl font-bold">AgroTrg</h1>

      <Link
        href="/objavi_oglas"
        className="px-4 py-2 bg-main text-white rounded-lg hover:bg-accent transition"
      >
        Objavi
      </Link>
    </div>
  );
}

export function HeaderNazaj() {
  return (
    <div className="bg-black/60 backdrop-blur-md p-4 flex justify-between items-center">
      <Odjava />

      <h1 className="text-white text-4xl font-bold">AgroTrg</h1>

      <Link
        href="/mainPage"
        className="px-4 py-2 bg-main text-white rounded-lg hover:bg-accent transition"
      >
        Nazaj
      </Link>
    </div>
  );
}

export function Odjava(){

  const router = useRouter();
  const { data: session } = useSession();

  // Fix #5: Funkcija za odjavo
  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  if(session){
      return(
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-second text-white rounded-lg hover:bg-secondAcc transition"
        >
          Odjava
        </button>
    )
  }
}