# HERBARIUM — Kebun Raya Kartu Spesimen

Hari 21 · 30 Days of Code · 2026-10-30

**Live:** https://kayzenn123.github.io/agent-herbarium/

Seluruh situs adalah satu peta kebun raya yang bisa digeser (drag) dan dizoom — tanpa navbar, tanpa menu. 18 tanaman hias populer Indonesia hidup sebagai kartu remi herbarium yang ditancapkan miring di empat bedeng: Bedeng Teduh, Rumah Kaca, Kolam & Rambat, Teras Terang. Ketuk kartu untuk membukanya seperti label herbarium: kebutuhan cahaya, air, tingkat kesulitan, dan satu fakta perawatan.

## Fitur
- Kanvas kebun drag + zoom (mouse, sentuh/pinch, roda mouse, keyboard, tombol)
- 18 kartu spesimen flip 3D ala kartu remi (nama kaligrafi + binomial Latin asli)
- Filter cahaya (kantong benih), pencarian + deep-link `?tanaman=slug`
- Laci favorit (localStorage berversi) + unduh JSON + salin daftar
- Kompas marquee melingkar, 2 pita ribbon, judul di busur SVG, jalur setapak draw-on, tilt 3D kartu
- Easter egg: ketuk gerbang 5× → hujan daun
- Toggle "Gerak" + hormat `prefers-reduced-motion`; mode ringan otomatis
- Toggle jeda implisit: semua gerak mati via satu tombol (WCAG 2.2.2)

## Tech
Vanilla HTML/CSS/JS — nol dependensi runtime. Font self-host via @fontsource (Great Vibes, Crimson Pro, Castoro Titling — OFL). Ikon 100% SVG hand-built. Tanpa gambar raster, tanpa request eksternal.

## Skor QA
- `tools/qa.js` (Playwright chromium): exit 0 — 0 overflow, 0 console error, 0 gambar tanpa alt, 0 input tanpa label, h1 = 1, lang = id
- FPS CPU throttle 4x: 45,3 (batas 45)
- Kontras WCAG AA: teks/bg 14,6 · muted/bg 6,4 · putih/aksen 4,6 · putih/pop 6,1
- WebKit: tidak bisa diuji di VM (libgstreamer hilang — keterbatasan environment, bukan bug web)
- Lighthouse: tidak bisa jalan di VM (headless no-egress); diganti cek manual setara

## Cara jalanin
```bash
cd site && python3 -m http.server 8000
# buka http://localhost:8000/
```

## Seed
domain katalog tanaman · layout canvas pan/zoom (override 1 sumbu dari bento — tabrakan TaksirLoak, preseden 2026-10-29) · referensi kartu remi · constraint tanpa gambar murni tipografi · font Great Vibes/Crimson Pro/Castoro Titling · palet mid/monochrome hue 155 · gerak drag-zoom/kompas-melingkar/textPath/tilt/draw-on · ikon solid blocky custom.

## Lisensi
Kode: MIT. Font: OFL (lihat node_modules/@fontsource/*/LICENSE). Data tanaman: fakta perawatan umum.
