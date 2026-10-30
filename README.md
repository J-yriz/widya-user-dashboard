# User Directory Dashboard

SPA direktori pengguna bergaya **Editorial Botanical × Technical Blueprint**. Dibangun dengan **React 19**, **TypeScript 5.9**, **Vite 8**, dan **Tailwind CSS v4**.

| Fitur       | Detail                                                                                        |
| ----------- | --------------------------------------------------------------------------------------------- |
| Tabel/Grid  | Dua mode tampilan, ditukar lewat segmented control ber-`role="radiogroup"`                    |
| Pencarian    | Realtime, case-insensitive pada `name` atau `email`, debounce 220 ms + `useDeferredValue`     |
| Detail      | Modal berisi profil, kontak, alamat, koordinat geo, dan perusahaan                            |
| State       | Skeleton saat loading, pesan error ramah + tombol **Coba lagi**, empty state saat tidak cocok |
| Aksesibilitas | Focus trap, restore focus, skip-link, focus ring, `aria-live`, reduced motion              |

---

## 1. Struktur Project

```
.
├── index.html                  # Shell HTML: meta, font, #root
├── vite.config.ts              # React + React Compiler + Tailwind plugin
├── tsconfig.app.json           # Strict flags
├── .env.example                # Template environment
└── src/
    ├── main.tsx                # Bootstrap React
    ├── App.tsx                 # Composition root: state UI + orkestrasi
    ├── styles/index.css        # Design token layer (@theme + base + a11y)
    ├── types/user.ts           # Model domain + AsyncState
    ├── services/api.ts         # HTTP client, ApiError, mapping pesan error
    ├── hooks/
    │   ├── useUsers.ts         # Fetch, abort, retry
    │   ├── useDebouncedValue.ts
    │   └── useOverlay.ts       # Focus trap, Escape, scroll lock
    ├── utils/
    │   ├── cx.ts               # Class-name joiner
    │   ├── filterUsers.ts      # Fungsi murni pencarian
    │   └── filterUsers.test.ts # Unit test
    └── components/
        ├── layout/Shell.tsx    # Page chrome + skip-link
        ├── stats/StatCard.tsx  # Metric tile
        ├── ui/                 # Blueprint, Icons, SearchField,
        │                       # SegmentedControl, SkeletonList, States
        └── users/              # Toolbar, UserTable, UserGrid, UserModal
```

Arah dependensi satu arah: `types → services → hooks → components → App`. `utils` berisi fungsi murni tanpa React. Komponen tidak pernah mengimpor `services/`; hanya hooks yang menyentuh jaringan.

---

## 2. Setup & Menjalankan

### Prasyarat

- Node.js >= 20.19 atau >= 22.12 (dibutuhkan Vite 8)
- Yarn 1.x / npm

### Langkah

```bash
# 1. Install dependency
yarn install

# 2. Salin environment
cp .env.example .env

# 3. Jalankan dev server
yarn dev                   # -> http://localhost:5173

# 4. Build produksi
yarn build
yarn preview               # sajikan dist/ secara lokal
```

### Environment Variables (`.env`)

| Variabel             | Wajib | Default | Keterangan                                                                 |
| -------------------- | ----- | ------- | -------------------------------------------------------------------------- |
| `VITE_API_BASE_URL`  | ya    | —       | Base URL API tanpa trailing slash, mis. `https://jsonplaceholder.typicode.com` |

Nilai dibaca di `src/services/api.ts` lewat `import.meta.env`. Bila kosong, aplikasi berhenti dengan pesan yang jelas. `.env.example` dikomit; `.env` diabaikan git.

> Variabel dibaca saat **build**, bukan runtime. Set nilainya di CI/hosting sebelum `yarn build`, lalu build ulang bila berubah. Hanya variabel berawalan `VITE_` yang masuk ke bundle klien — jangan simpan secret di sini.

### Perintah Berguna

| Perintah         | Fungsi                                  |
| ---------------- | --------------------------------------- |
| `yarn dev`       | Dev server + HMR                        |
| `yarn build`     | Typecheck lalu build produksi ke `dist/`|
| `yarn typecheck` | Typecheck tanpa emit                    |
| `yarn lint`      | ESLint (typescript-eslint + react-hooks)|
| `yarn test`      | Vitest, single run                      |
| `yarn preview`   | Sajikan hasil build lokal               |

Hasil build adalah situs statis di `dist/`. Tanpa router, jadi tidak perlu rewrite rule.

---

## 3. Desain & Fitur UI

### 3.1 Endpoint

Aplikasi memanggil `GET ${VITE_API_BASE_URL}/users` dengan header `Accept: application/json`. Respons dipetakan ke `User` di `src/types/user.ts` dan dirender sebagai tabel atau grid.

Penanganan status:

| Kondisi              | Tampilan                                              |
| -------------------- | ----------------------------------------------------- |
| Request berjalan     | Skeleton blueprint, `aria-busy="true"`                |
| Respons 2xx          | Tabel/grid, jumlah hasil diumumkan `aria-live`        |
| Jaringan gagal       | Pesan "Tidak dapat menghubungi server" + **Coba lagi** |
| HTTP 429             | Pesan "Terlalu banyak permintaan"                     |
| HTTP lain non-2xx    | Pesan error dengan kode status                        |
| Query tanpa hasil    | Empty state yang menampilkan kata kunci               |

### 3.2 Design Token

Semua token didefinisikan satu kali di `src/styles/index.css` memakai `@theme` Tailwind v4, lalu dipakai sebagai utility (`bg-surface`, `text-muted`, `shadow-card`, `ease-brand`). Tailwind dikompilasi saat build, bukan dimuat dari CDN.

| Token               | Nilai                  | Peran                        |
| ------------------- | ---------------------- | ---------------------------- |
| `--color-ink-900`   | `#1E0C1F`              | Teks utama, surface gelap    |
| `--color-ink-700`   | `#2B1621`              | Border, basis teks sekunder  |
| `--color-ink-500`   | `#5B223E`              | Tint shadow                  |
| `--color-canvas`    | `#F9EFE4`              | Background halaman           |
| `--color-surface`   | `#F8EDE2`              | Card, header, glass base     |
| `--color-orchid`    | `#D946EF`              | Focus ring, aksen            |

Alpha ladder: `--color-hairline` (`/ .10`), `--color-marker` (`/ .25`), `--color-muted` (`/ .70`, kontras 5.84:1), `--color-subtle` (`/ .72`, 6.20:1). Teks sekunder tidak memakai `/50` (3.17:1) atau `/60` (4.29:1) karena gagal WCAG AA.

Tipografi memakai satu font, **Inter** (300–600), dengan skala `--text-h1` 60 px sampai `--text-micro` 9.9 px. Karakter visualnya adalah kontras antara display tracking negatif dan label uppercase tracking `+0.24em`.

Radius bersifat **sharp-first** (`--radius-none: 0` sebagai default); `rounded-full` hanya untuk dot status. Shadow memakai tint brand, bukan hitam netral. Semua transisi memakai `--ease-brand: cubic-bezier(0.22, 1, 0.36, 1)`.

Motif: `.blueprint-grid` (dot-grid diagonal), `CornerBrackets`, `Eyebrow`, dan `Rule`. Efek kaca (`bg-surface/70` + `backdrop-blur-xl`) hanya pada toolbar dan modal.

### 3.3 Aksesibilitas

- `:focus-visible` global: outline orchid 2 px dengan offset.
- Skip-link ke konten utama.
- Modal: `role="dialog"`, `aria-modal`, `aria-labelledby`, focus trap (Tab/Shift+Tab), `Escape`, scroll lock, restore focus.
- Tabel: `<caption class="sr-only">`, `scope="col"`, baris fokusabel dengan `Enter`/`Space`.
- Toggle view: `role="radiogroup"`, `aria-checked`, `aria-label` eksplisit.
- Jumlah hasil pencarian diumumkan lewat `aria-live="polite"`.
- `prefers-reduced-motion` mematikan animation/transition.
- `<html lang="id">`.

---

## 4. Pertanyaan Pemahaman

### 4.1 Alur Fetch: Component → Network → UI

Urutan untuk memuat daftar user:

1. **`App`** merender `Toolbar` dan area hasil. `useUsers()` dipanggil sekali di composition root.
2. **`useUsers`** memiliki `AsyncState<User[]>` berbentuk discriminated union: `idle | loading | success | error`. Tidak mungkin ada `data` dan `error` bersamaan.
3. **Effect** berjalan sekali saat mount (dan setiap `attempt` berubah). Di dalamnya dibuat `AbortController`.
4. **`services/api.ts`** memanggil `fetch(`${BASE_URL}/users`, { signal })`, meneruskan sinyal agar request bisa dibatalkan.
5. **Sukses** — respons JSON dipetakan ke `User[]`, lalu `setState({ status: 'success', data })` bila komponen masih aktif.
6. **Gagal** — error jaringan dipetakan ke pesan ramah, `AbortError` di-rethrow dan diabaikan hook.
7. **Render** — `App` memilih skeleton, error, empty state, tabel, atau grid berdasarkan `status` dan hasil filter.

```ts
useEffect(() => {
  const controller = new AbortController();
  let active = true;

  fetchUsers(controller.signal)
    .then((data) => { if (active) setState({ status: 'success', data }); })
    .catch((err: unknown) => {
      if (!active || controller.signal.aborted) return;
      setState({ status: 'error', message: ... });
    });

  return () => {
    active = false;
    controller.abort();
  };
}, [attempt]);
```

**Kenapa dependency array hanya `[attempt]`.** Effect tidak boleh menulis ke dependency-nya sendiri. `attempt` hanya berubah lewat `retry()` (event handler), sehingga tidak ada siklus render → effect → setState → render. Status `loading` juga di-set di `retry()`, bukan sinkron di body effect. `retry` dibungkus `useCallback` dengan array kosong agar referensinya stabil.

**Kenapa cleanup penting.**

| Masalah         | Tanpa cleanup                                     | Dengan cleanup                                  |
| --------------- | ------------------------------------------------- | ----------------------------------------------- |
| Memory leak     | Promise menahan closure komponen yang sudah unmount | Request dibatalkan, closure dilepas           |
| Race condition  | Respons lama menimpa hasil retry yang lebih baru  | Request lama di-abort, `active=false` menolak hasil basi |
| Network waste   | Request tetap berjalan                            | Koneksi diputus                                 |

StrictMode dipertahankan: di development effect dijalankan dua kali, dan cleanup membatalkan request pertama. Ini menguji kebenaran cleanup, bukan bug.

### 4.2 Alasan Struktur Folder

Pemisahan mengikuti tanggung jawab, bukan jenis file:

- **`types/`** — kontrak domain yang dipakai service, hook, komponen, dan test. Satu sumber kebenaran, tanpa circular import.
- **`services/`** — satu-satunya tempat yang tahu URL, header, dan bentuk respons. Mengganti backend cukup mengubah satu file.
- **`hooks/`** — logika reusable (fetch, debounce, overlay). Komponen tetap presentational dan mudah dipreview.
- **`utils/`** — fungsi murni tanpa React dan tanpa I/O, sehingga bisa diuji tanpa DOM.
- **`components/ui/`** — primitif yang tidak tahu domain `User`, bisa dipakai untuk fitur lain.
- **`components/users/`** — fitur yang menggabungkan primitif dengan domain.
- **`components/layout/`** — page chrome, bukan logika bisnis.

Efek praktisnya: bug fetch hanya mungkin di `services/` + `hooks/`, `filterUsers` bisa diuji tanpa render, dan mengganti mekanisme HTTP tidak menyentuh komponen.

### 4.3 Optimasi untuk 10.000 User

Tiga penyebab lag yang berbeda membutuhkan tiga solusi berbeda.

**`useMemo` — hilangkan kalkulasi berulang.**

```ts
const filtered = useMemo(() => filterUsers(users, deferredQuery), [users, deferredQuery]);
```

Tanpa memo, filter 10.000 baris dijalankan pada setiap render, termasuk saat buka modal atau ganti view.

**Debounce + `useDeferredValue` — input tetap responsif.**

```ts
const debouncedQuery = useDebouncedValue(query, 220);
const deferredQuery = useDeferredValue(debouncedQuery);
```

Debounce mengurangi frekuensi kerja: mengetik 10 karakter menjadi satu kali filter. `useDeferredValue` memberi nilai tertunda ke subtree daftar, sehingga render input berjalan lebih dulu. `useTransition` adalah alternatif saat update dipicu `setState` eksplisit, misalnya ganti filter atau halaman.

**Virtualization — batasi jumlah node DOM.**

Bottleneck terbesar bukan filter (10.000 `String.includes` sekitar 1–3 ms), melainkan 10.000 baris DOM beserta layout dan paint-nya. Solusinya render hanya baris yang terlihat, misalnya dengan `@tanstack/react-virtual`:

```tsx
const rowVirtualizer = useVirtualizer({
  count: filtered.length,
  getScrollElement: () => scrollRef.current,
  estimateSize: () => 56,
  overscan: 8,
});
```

DOM turun dari 10.000 baris menjadi sekitar 20 baris.

Bila masih berat: cache hasil `toLowerCase()` sekali saat fetch, pindahkan filter ke Web Worker, gunakan server-side search dengan `AbortController` per ketikan, pagination, dan `React.memo` pada row.

---

## 5. Catatan Produksi

- Set `VITE_API_BASE_URL` di environment hosting sebelum build; nilai yang berubah butuh build ulang.
- API harus mengizinkan origin situs (CORS) karena request dilakukan dari browser.
- Aset statis `dist/` bisa dilayani Nginx, Netlify, Vercel, atau GitHub Pages tanpa rewrite rule.
- Endpoint `/users` mengembalikan 10 baris, jadi virtualization belum diaktifkan. Aktifkan bila dataset melewati beberapa ratus baris.
- Jangan menaruh secret di `VITE_*`; semua nilai ikut terkirim ke browser.
