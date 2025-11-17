import Link from "next/link";
export default function Oglas() {
return (
    <main className="min-h-screen bg-gray-100"
          style={{
            backgroundImage: "url('/background.png')"
        }}>
      <div className="bg-black/60 shadow p-6 flex flex-col md:flex-row justify-between text-align-center">
        <h1 className="header_title">AgroTrg - Kupujte in prodajajte živino na spletu</h1>
        <Link
          href="/mainPage"
          className="mt-4 md:mt-0 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Nazaj
        </Link>
      </div>
      <div className="ads_style_welcome_page">
        forma za objavo oglasa
      </div>
    </main>
  );
}
