import Link from "next/link";

export function HeaderMain(){
    return(
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
    );
}

export function HeaderNazaj(){
    return(
      <div className="bg-black/60 backdrop-blur-md p-4 flex justify-between items-center">
        <Link
          href="/"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Odjava
        </Link>

        <h1 className="text-white text-4xl font-bold">AgroTrg</h1>

        <Link
          href="/mainPage"
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          Nazaj
        </Link>
      </div>
    );
}