# 🌾 AgroTrg

**AgroTrg** je spletna aplikacija za objavo in ogled oglasov s področja kmetijstva (živali). Uporabniki lahko dodajajo, pregledujejo in brišejo oglase, z administrativnimi pravicami za nadzor vsebine.

---

## 🚀 Funkcionalnosti

* 📢 Objavljanje oglasov (opis, vrsta, pasma, lokacija, kontakt, cena, slika)
* 🖼️ Nalaganje slik (Sanity CMS)
* 👀 Ogled posameznega oglasa
* ✏️ Brisanje oglasov (lastnik ali admin)
* 🔐 Avtentikacija z **NextAuth**
* 👑 Admin pravice
* ⚡ Server Actions + App Router (Next.js 13+)

---

## 🛠️ Tehnologije

* **Next.js 13+ (App Router)**
* **TypeScript**
* **NextAuth**
* **Sanity CMS**
* **Tailwind CSS**

---

## 📂 Struktura projekta (osnovno)

```
app/
 ├─ api/
 │   ├─ oglas/
 │   ├─ oglasi/[id]/
 │   └─ upload-image/
 ├─ oglasi/
 │   ├─ [id]/
 │   │   ├─ page.tsx
 │   │   ├─ edit/
 │   │   └─ Actions.tsx
 ├─ objavi_oglas/
 └─ mainPage/
```

---

## 🔐 Okoljske spremenljivke

Ustvari datoteko `.env.local`:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret
SANITY_WRITE_TOKEN=your_sanity_token
```

---

## ▶️ Zagon projekta

```bash
npm install
npm run dev
```

Aplikacija bo dostopna na:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 👤 Pravice uporabnikov

* **Uporabnik**: lahko briše samo svoje oglase
* **Admin**: lahko briše vse oglase

---

## 📌 Opombe

* Slike se shranjujejo v **Sanity assets**
* API poti so zaščitene z avtentikacijo
* Brisanje in urejanje oglasov je dovoljeno samo lastniku ali adminu

---

## 📄 Licenca

Projekt je namenjen izobraž
