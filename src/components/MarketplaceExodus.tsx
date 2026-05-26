import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  ShoppingBag,
  DollarSign,
  Home,
  Users,
  BarChart3,
  RefreshCw,
  Lock,
  Megaphone,
  Search,
  Package,
  Star,
  CheckCircle2,
  XCircle,
  Zap,
  Layers,
} from "lucide-react";

/* ─── Design tokens ─── */
const C = {
  orange:  "#e07a30",
  blue:    "#3b82f6",
  blueD:   "#004896",
  crimson: "#831449",
  pink:    "#c9547a",
  red:     "#ef4444",
  bg:      "#080808",
  card:    "#111111",
  border:  "#1e1e1e",
  border2: "#252525",
  muted:   "#888888",
  subtle:  "#808080",
};

const gradAmber = `linear-gradient(135deg, ${C.orange}, #f5a55a)`;

const gradRed   = `linear-gradient(135deg, ${C.red}, #f87171)`;

/* ─── Helpers ─── */
const GradText = ({ children, grad = gradAmber }: { children: React.ReactNode; grad?: string }) => (
  <span style={{ background: grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
    {children}
  </span>
);

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

const SectionLabel = ({ children, color = C.crimson }: { children: React.ReactNode; color?: string }) => (
  <p className="text-[10px] font-bold tracking-[0.22em] uppercase mb-2.5" style={{ color }}>
    {children}
  </p>
);

/* ─── Data ─── */
const feeData = [
  {
    platform: "Tokopedia",
    highlight: "15×",
    label: "Kenaikan batas komisi",
    detail: "Dari maks. Rp 40.000 → Rp 650.000 per item. Berlaku 18 Mei 2026.",
    color: C.orange,
  },
  {
    platform: "TikTok Shop",
    highlight: "Rp 5.000",
    label: "Biaya logistik per pesanan",
    detail: "Ditanggung penjual penuh — dipotong sebelum uang sampai ke kamu.",
    color: C.blue,
  },
  {
    platform: "Total Potongan",
    highlight: "24–30%",
    label: "Per transaksi 2026",
    detail: "Dari ~10% di 2024, kini hampir 3× lipat — diam-diam dimakan platform.",
    color: C.red,
  },
];

const brandCases = [
  {
    brand: "True To Skin",
    category: "Kosmetik Lokal",
    action: "Keluar dari TikTok Shop",
    quote: "Skema baru memaksa penjual menanggung ongkir pembeli sekaligus ongkir retur — cost naik drastis tanpa jaminan margin.",
    icon: ShoppingBag,
    color: C.orange,
  },
  {
    brand: "Noera",
    category: "Beauty Brand",
    action: "Tegaskan Integritas Produk",
    quote: "Harga yang dibayar konsumen seharusnya untuk kualitas produk, bukan habis untuk biaya transaksi di perantara digital.",
    icon: DollarSign,
    color: C.blue,
  },
];

const costRows = [
  { label: "Omset per bulan",          labelMobile: "Omset per bulan",        value: "Rp 100.000.000", pct: null,  type: "neutral" as const },
  { label: "Komisi platform",          labelMobile: "Komisi platform",         value: "−Rp 15.000.000", pct: "15%", type: "loss"    as const },
  { label: "Biaya layanan & PPN",      labelMobile: "Layanan & PPN",           value: "−Rp 2.000.000",  pct: "2%",  type: "loss"    as const },
  { label: "Iklan dalam platform",     labelMobile: "Iklan platform",          value: "−Rp 10.000.000", pct: "10%", type: "loss"    as const },
  { label: "Subsidi ongkir & logistik",labelMobile: "Ongkir & logistik",       value: "−Rp 9.000.000",  pct: "9%",  type: "loss"    as const },
  { label: "Promo wajib & flash sale", labelMobile: "Promo & flash sale",      value: "−Rp 5.000.000",  pct: "5%",  type: "loss"    as const },
  { label: "Retur & pengembalian",     labelMobile: "Retur",                   value: "−Rp 3.000.000",  pct: "3%",  type: "loss"    as const },
  { label: "Packaging & operasional",  labelMobile: "Packaging",               value: "−Rp 3.000.000",  pct: "3%",  type: "loss"    as const },
  { label: "Yang masuk kantong",       labelMobile: "Yang masuk kantong",      value: "Rp 53.000.000",  pct: "53%", type: "result"  as const },
];

const dbBenefits = [
  { icon: Users,     title: "Kenali Siapa Pelangganmu",   color: C.blue,   desc: "Nama, HP, alamat, riwayat belanja, produk favorit — tersimpan rapi. Hubungi kapanpun tanpa bayar platform." },
  { icon: RefreshCw, title: "Repeat Order Tanpa Iklan",   color: C.orange, desc: "Pelanggan lama 5× lebih mudah membeli lagi. Kirim promo WhatsApp ke 500 pembeli setiamu — gratis." },
  { icon: BarChart3, title: "Analitik Bisnis yang Nyata", color: C.blue,   desc: "Produk terlaris, kota asal, jam pembelian puncak — data ini milikmu, bukan dijual platform ke pesaingmu." },
  { icon: Star,      title: "Program Loyalitas Sendiri",  color: C.orange, desc: "Sistem poin, membership, reward — tanpa bergantung fitur platform. Pelanggan loyal adalah asetmu." },
];

const ownBenefits = [
  { icon: Home,      short: "Bukan ngontrak, tapi punya sendiri",  title: "Rumah Digital Milikmu",      color: C.orange, desc: "Website adalah properti digital milikmu — tidak bisa dihapus, tidak bisa dinaikkan sewanya tiba-tiba, tidak bisa diubah aturannya sepihak." },
  { icon: Lock,      short: "Tidak ada potongan mengejutkan",       title: "Harga & Margin Kamu Kontrol", color: C.blue,   desc: "Kamu yang tentukan harga jual, margin, kapan diskon. Tidak ada platform yang tiba-tiba ambil 15–30% tanpa bisa ditolak." },
  { icon: Search,    short: "Ditemukan tanpa bayar iklan terus",    title: "SEO — Aset Jangka Panjang",  color: C.orange, desc: "Website teroptimasi bisa muncul di Google bertahun-tahun. Sekali investasi konten, mendatangkan pembeli organik 3–5 tahun ke depan." },
  { icon: Megaphone, short: "Promo, bundling, flash sale sesukamu", title: "Kampanye Bebas Tanpa Izin",  color: C.blue,   desc: "Flash sale 2 jam? Bundling produk? Diskon khusus pelanggan lama? Di website sendiri, semua itu kapanpun tanpa izin platform." },
  { icon: Package,   short: "Sistem yang kerja saat kamu tidur",    title: "Manajemen Stok & Pesanan",   color: C.orange, desc: "Pesanan masuk otomatis tercatat, stok terupdate real-time, notifikasi ke tim. Operasional rapi, error human berkurang drastis." },
  { icon: Layers,    short: "Ceritakan brand-mu tanpa batas",       title: "Brand Experience Penuh",     color: C.blue,   desc: "Tampilan, warna, tone of voice, video, cerita founder — semua kamu atur. Konsumen merasakan brand-mu, bukan produk di antara pesaing." },
];

const comparisonRows = [
  { aspect: "Data pelanggan milik sendiri",    market: false, own: true  },
  { aspect: "Kontrol margin & harga",          market: false, own: true  },
  { aspect: "Visibilitas tanpa iklan terus",   market: false, own: true  },
  { aspect: "Bebas promo & bundling",          market: false, own: true  },
  { aspect: "Brand story bebas diatur",        market: false, own: true  },
  { aspect: "Program loyalitas sendiri",       market: false, own: true  },
  { aspect: "Analitik bisnis milik sendiri",   market: false, own: true  },
  { aspect: "Biaya tidak berubah tiba-tiba",   market: false, own: true  },
  { aspect: "Jangkauan pasar luas (awal)",     market: true,  own: false },
  { aspect: "Payment infrastructure ready",    market: true,  own: true  },
];

/* ══════════════════════════════════════════════════ */
export default function MarketplaceExodus() {
  const wrapRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  const feeSectionRef   = useRef(null);
  const casesSectionRef = useRef(null);
  const analogyRef      = useRef(null);
  const ownRef          = useRef(null);
  const compareRef      = useRef(null);
  const ctaRef          = useRef(null);

  const feeInView     = useInView(feeSectionRef,   { once: true, margin: "-40px" });
  const casesInView   = useInView(casesSectionRef, { once: true, margin: "-40px" });
  const analogyInView = useInView(analogyRef,      { once: true, margin: "-40px" });
  const ownInView     = useInView(ownRef,           { once: true, margin: "-40px" });
  const compareInView = useInView(compareRef,       { once: true, margin: "-40px" });
  const ctaInView     = useInView(ctaRef,           { once: true, margin: "-40px" });

  return (
    <section
      id="marketplace-vs-website"
      ref={wrapRef}
      className="relative overflow-hidden py-10 md:py-20 lg:py-28"
      style={{ background: C.bg }}
    >
      {/* ── Ambient glow ── */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[900px] h-[300px] md:h-[500px] rounded-full blur-[80px] md:blur-[120px] opacity-[0.07]"
          style={{ background: `radial-gradient(ellipse, ${C.crimson} 0%, transparent 70%)` }} />
        <div className="absolute bottom-32 left-0 w-[300px] md:w-[600px] h-[200px] md:h-[400px] rounded-full blur-[70px] md:blur-[100px] opacity-[0.05]"
          style={{ background: `radial-gradient(ellipse, ${C.orange} 0%, transparent 70%)` }} />
        <div className="absolute bottom-0 right-0 w-[300px] md:w-[500px] h-[200px] md:h-[350px] rounded-full blur-[70px] md:blur-[100px] opacity-[0.05]"
          style={{ background: `radial-gradient(ellipse, ${C.blueD} 0%, transparent 70%)` }} />
      </motion.div>

      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${C.crimson}60, transparent)` }} />

      {/* ── Container ── */}
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">

        {/* ══ 1. HEADER ══ */}
        <FadeUp className="text-center mb-10 md:mb-16 lg:mb-20">
          {/* Alert badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 mb-5"
            style={{ background: `${C.red}15`, border: `1px solid ${C.red}30` }}>
            <AlertTriangle size={11} style={{ color: C.red }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: C.red }}>
              Peringatan untuk Pebisnis UMKM
            </span>
          </div>

          <h2 className="font-poppins font-extrabold text-[22px] sm:text-4xl md:text-5xl lg:text-[56px] text-white leading-[1.12] mb-3 md:mb-5">
            Brand Besar Mulai Tinggalkan{" "}
            <GradText grad={gradAmber}>Marketplace</GradText>
          </h2>
          <p className="font-poppins font-bold text-base sm:text-xl md:text-3xl lg:text-4xl text-white/45 leading-snug mb-4 md:mb-6">
            — Kamu Harusnya Melakukan Hal yang Sama
          </p>
          <p className="text-[13px] md:text-base max-w-2xl mx-auto leading-relaxed" style={{ color: C.subtle }}>
            Mei 2026 — hampir semua platform e-commerce besar Indonesia kompak menaikkan biaya.
            Yang terdampak bukan hanya brand besar.{" "}
            <strong className="text-white/80">UMKM yang bergantung penuh pada marketplace mulai tersudut.</strong>
          </p>
        </FadeUp>

        {/* ══ 2. FEE CRISIS — horizontal scroll on mobile ══ */}
        <div ref={feeSectionRef} className="mb-10 md:mb-16 lg:mb-20">
          {/* Mobile: snap-scroll cards. Desktop: 3-col grid */}
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-3 -mx-4 px-4
                          sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0">
            {feeData.map((item, i) => (
              <motion.div
                key={item.platform}
                initial={{ opacity: 0, y: 40 }}
                animate={feeInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-2xl p-4 md:p-6 overflow-hidden flex-shrink-0 w-[72vw] sm:w-auto snap-start"
                style={{
                  background: C.card,
                  border: `1px solid ${C.border2}`,
                  borderTopColor: item.color,
                  borderTopWidth: 3,
                }}
              >
                <div className="absolute -bottom-8 -right-8 w-36 h-36 rounded-full blur-3xl opacity-[0.08] pointer-events-none"
                  style={{ backgroundColor: item.color }} />
                <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-3" style={{ color: C.muted }}>
                  {item.platform}
                </p>
                <p className="font-poppins font-extrabold text-3xl md:text-4xl lg:text-5xl mb-1.5 leading-none" style={{ color: item.color }}>
                  {item.highlight}
                </p>
                <p className="font-bold text-white text-[13px] md:text-sm mb-2">{item.label}</p>
                <p className="text-[11px] md:text-xs leading-relaxed" style={{ color: C.muted }}>{item.detail}</p>
              </motion.div>
            ))}
          </div>
          {/* Scroll hint — mobile only */}
          <p className="text-center text-[10px] mt-2 sm:hidden" style={{ color: C.muted }}>← geser untuk lihat semua →</p>
        </div>

        {/* ══ 3. BRAND CASES ══ */}
        <div ref={casesSectionRef} className="mb-10 md:mb-16 lg:mb-20">
          <FadeUp className="mb-5 md:mb-8">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: C.border2 }} />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase whitespace-nowrap" style={{ color: C.muted }}>
                Kasus Nyata
              </span>
              <div className="flex-1 h-px" style={{ background: C.border2 }} />
            </div>
          </FadeUp>

          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3 md:gap-4">
            {brandCases.map((c, i) => (
              <motion.div
                key={c.brand}
                initial={{ opacity: 0, y: 28 }}
                animate={casesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl p-4 md:p-6"
                style={{ background: C.card, border: `1px solid ${C.border2}` }}
              >
                {/* Top row: icon + brand + badge */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${c.color}18` }}>
                    <c.icon size={16} style={{ color: c.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white text-[13px] md:text-base leading-snug">{c.brand}</h3>
                    <p className="text-[11px] md:text-xs mt-0.5" style={{ color: C.muted }}>{c.category}</p>
                  </div>
                </div>
                {/* Badge — below on mobile so it doesn't overflow */}
                <div className="mb-3">
                  <span className="inline-block text-[10px] md:text-xs font-semibold rounded-full px-2.5 py-1"
                    style={{ color: c.color, background: `${c.color}18`, border: `1px solid ${c.color}30` }}>
                    {c.action}
                  </span>
                </div>
                <div className="border-l-2 pl-3" style={{ borderColor: `${c.color}50` }}>
                  <p className="text-[12px] md:text-sm leading-relaxed italic" style={{ color: C.subtle }}>
                    &ldquo;{c.quote}&rdquo;
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ══ 4. ANALOGI TOKO MAL ══ */}
        <div ref={analogyRef} className="mb-10 md:mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={analogyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl md:rounded-3xl p-5 md:p-8 lg:p-12 overflow-hidden relative"
            style={{ background: C.card, border: `1px solid ${C.border2}` }}
          >
            <div className="absolute top-0 right-0 w-48 md:w-72 h-48 md:h-72 rounded-full blur-3xl opacity-[0.06] pointer-events-none"
              style={{ background: C.orange }} />

            <div className="text-center mb-5 md:mb-8 relative">
              <SectionLabel color={C.orange}>Bayangkan Ini</SectionLabel>
              <h3 className="font-poppins font-extrabold text-[19px] sm:text-2xl md:text-3xl lg:text-4xl text-white leading-tight">
                Jualan di Marketplace Itu Seperti{" "}
                <GradText grad={gradAmber}>Buka Toko di Mal Orang Lain</GradText>
              </h3>
            </div>

            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3 md:gap-5">
              {/* Ngontrak */}
              <div className="rounded-xl md:rounded-2xl p-4 md:p-6"
                style={{ background: `${C.red}08`, border: `1px solid ${C.red}20` }}>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg md:rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${C.red}18` }}>
                    <AlertTriangle size={14} style={{ color: C.red }} />
                  </div>
                  <div>
                    <p className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase" style={{ color: `${C.red}80` }}>Situasi sekarang</p>
                    <h4 className="font-bold text-white text-[12px] md:text-sm">Toko di Mal — Ngontrak</h4>
                  </div>
                </div>
                <ul className="space-y-2">
                  {[
                    "Sewa naik setiap tahun — kamu tidak bisa protes",
                    "Aturan promosi ikut kebijakan mal",
                    "Pembeli datang ke mal, bukan ke tokomu",
                    "Data pengunjung mal milik pengelola mal",
                    "Kalau mal tutup, tokomu ikut hilang",
                    "Bersaing dengan ratusan toko di sebelahmu",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <XCircle size={12} className="shrink-0 mt-0.5" style={{ color: C.red }} />
                      <span className="text-[11px] md:text-xs leading-relaxed" style={{ color: C.muted }}>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Milik sendiri */}
              <div className="rounded-xl md:rounded-2xl p-4 md:p-6"
                style={{ background: `${C.blue}08`, border: `1px solid ${C.blue}25` }}>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg md:rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${C.blue}18` }}>
                    <Home size={14} style={{ color: C.blue }} />
                  </div>
                  <div>
                    <p className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase" style={{ color: `${C.blue}90` }}>Yang kamu butuhkan</p>
                    <h4 className="font-bold text-white text-[12px] md:text-sm">Rumah Digital — Milik Sendiri</h4>
                  </div>
                </div>
                <ul className="space-y-2">
                  {[
                    "Bayar sekali bangun, milik selamanya",
                    "Promo, diskon, harga — kamu yang atur",
                    "Pelanggan datang langsung ke brandmu",
                    "Database pelanggan 100% milikmu",
                    "Tidak bisa dihapus atau diubah sepihak",
                    "Tampil unik, tidak bersaing di satu halaman",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <CheckCircle2 size={12} className="shrink-0 mt-0.5" style={{ color: C.blue }} />
                      <span className="text-[11px] md:text-xs leading-relaxed text-white/65">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={analogyInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="font-bold text-white/55 text-center text-[13px] md:text-lg lg:text-xl mt-6 md:mt-8 max-w-2xl mx-auto leading-snug"
            >
              &ldquo;Pengusaha cerdas tidak selamanya ngontrak.{" "}
              <span className="text-white">Pada titik tertentu, mereka bangun rumah sendiri.</span>&rdquo;
            </motion.p>
          </motion.div>
        </div>

        {/* ══ 5. SIMULASI BIAYA ══ */}
        <div className="mb-10 md:mb-16 lg:mb-20">
          <FadeUp className="text-center mb-6 md:mb-10 px-2">
            <SectionLabel color={C.red}>Hitung Dulu Sebelum Lanjut</SectionLabel>
            <h3 className="font-poppins font-extrabold text-[18px] sm:text-2xl md:text-3xl lg:text-4xl text-white leading-tight break-words">
              Berapa yang{" "}
              <GradText grad={gradRed}>Kamu Rugi</GradText>
              <br className="sm:hidden" />
              {" "}Setiap Bulan?
            </h3>
            <p className="text-[12px] md:text-sm mt-2.5 max-w-lg mx-auto leading-relaxed" style={{ color: C.subtle }}>
              Simulasi nyata untuk toko dengan omset{" "}
              <strong className="text-white">Rp 100 juta per bulan</strong>{" "}
              di marketplace Indonesia 2026.
            </p>
          </FadeUp>

          <FadeUp delay={0.08}>
            {/* ── Tabel Potongan ── */}
            <div className="rounded-2xl overflow-hidden max-w-2xl mx-auto"
              style={{ background: C.card, border: `1px solid ${C.border2}` }}>

              {/* Table header */}
              <div className="grid grid-cols-[1fr_32px_auto] sm:grid-cols-[1fr_48px_auto] px-3 sm:px-5 md:px-6 py-2.5"
                style={{ background: "#181818", borderBottom: `1px solid ${C.border2}` }}>
                <span className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase" style={{ color: C.muted }}>Komponen</span>
                <span className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-center" style={{ color: C.muted }}>%</span>
                <span className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-right w-[88px] sm:w-[110px] md:w-[132px]" style={{ color: C.muted }}>Jumlah</span>
              </div>

              {costRows.map((row, i) => {
                const isResult  = row.type === "result"
                const isLoss    = row.type === "loss"
                const isNeutral = row.type === "neutral"
                return (
                  <div
                    key={row.label}
                    className="grid grid-cols-[1fr_32px_auto] sm:grid-cols-[1fr_48px_auto] items-center px-3 sm:px-5 md:px-6 py-2.5 md:py-3.5"
                    style={{
                      borderBottom: i < costRows.length - 1 ? `1px solid ${C.border}` : undefined,
                      background: isResult ? `${C.blue}10` : isNeutral ? `rgba(255,255,255,0.02)` : undefined,
                    }}
                  >
                    {/* Label + mini bar */}
                    <div className="pr-2 sm:pr-3 min-w-0">
                      <span
                        className="text-[11px] sm:text-[12px] md:text-[13px] leading-tight block"
                        style={{
                          color: isResult ? "#fff" : isNeutral ? "rgba(255,255,255,0.9)" : C.subtle,
                          fontWeight: isResult || isNeutral ? 600 : 400,
                        }}
                      >
                        <span className="sm:hidden">{row.labelMobile}</span>
                        <span className="hidden sm:inline">{row.label}</span>
                      </span>
                      {isLoss && row.pct && (
                        <div className="mt-1 h-[2px] sm:h-[3px] rounded-full overflow-hidden" style={{ background: `${C.red}20`, maxWidth: 80 }}>
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: C.red }}
                            initial={{ width: 0 }}
                            whileInView={{ width: row.pct }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Pct badge */}
                    <div className="flex justify-center">
                      {row.pct && (
                        <span
                          className="text-[9px] sm:text-[10px] font-bold rounded px-1 py-0.5 tabular-nums"
                          style={{
                            color: isResult ? C.blue : isLoss ? C.red : C.subtle,
                            background: isResult ? `${C.blue}15` : isLoss ? `${C.red}15` : "transparent",
                          }}
                        >
                          {row.pct}
                        </span>
                      )}
                    </div>

                    {/* Value */}
                    <span
                      className="font-poppins font-bold text-[10px] sm:text-[12px] md:text-[13px] tabular-nums shrink-0 text-right w-[88px] sm:w-[110px] md:w-[132px]"
                      style={{
                        color: isLoss ? C.red : isResult ? C.blue : "white",
                      }}
                    >
                      {row.value}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* ── Summary cards ── */}
            <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3 max-w-2xl mx-auto">
              {/* Per Rp 100rb */}
              <div className="rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 text-center"
                style={{ background: `${C.red}0a`, border: `1px solid ${C.red}25` }}>
                <p className="text-[9px] sm:text-[10px] md:text-[11px] mb-1 sm:mb-1.5 leading-snug" style={{ color: C.subtle }}>
                  Tiap Rp 100.000 masuk
                </p>
                <p className="font-poppins font-extrabold text-[16px] sm:text-[22px] md:text-3xl leading-none mb-1" style={{ color: C.red }}>
                  Rp 47rb
                </p>
                <p className="text-[9px] sm:text-[10px] leading-snug" style={{ color: C.muted }}>
                  dipotong platform
                </p>
              </div>

              {/* Total bulanan */}
              <div className="rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 text-center"
                style={{ background: `${C.orange}0a`, border: `1px solid ${C.orange}25` }}>
                <p className="text-[9px] sm:text-[10px] md:text-[11px] mb-1 sm:mb-1.5 leading-snug" style={{ color: C.subtle }}>
                  Potongan per bulan
                </p>
                <p className="font-poppins font-extrabold text-[16px] sm:text-[22px] md:text-3xl leading-none mb-1" style={{ color: C.orange }}>
                  Rp 47 Jt
                </p>
                <p className="text-[9px] sm:text-[10px] leading-snug" style={{ color: C.muted }}>
                  dari 8 pos berbeda
                </p>
              </div>

              {/* Tahunan */}
              <div className="rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 text-center"
                style={{ background: `${C.red}12`, border: `1px solid ${C.red}30` }}>
                <p className="text-[9px] sm:text-[10px] md:text-[11px] mb-1 sm:mb-1.5 leading-snug" style={{ color: C.subtle }}>
                  Hilang dalam 1 tahun
                </p>
                <p className="font-poppins font-extrabold text-[16px] sm:text-[22px] md:text-3xl leading-none mb-1" style={{ color: C.red }}>
                  Rp 564 Jt
                </p>
                <p className="text-[9px] sm:text-[10px] leading-snug" style={{ color: C.muted }}>
                  ke kantong platform
                </p>
              </div>
            </div>
          </FadeUp>
        </div>

        {/* ══ 6. DATABASE: HARTA KARUN ══ */}
        <div className="mb-10 md:mb-16 lg:mb-20 relative">

          {/* ── Section glow backdrop ── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-[120px] opacity-[0.12]"
              style={{ background: `radial-gradient(ellipse, ${C.blue} 0%, transparent 70%)` }} />
          </div>

          {/* ── Header block ── */}
          <FadeUp className="text-center mb-8 md:mb-14 relative">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-5"
              style={{ background: `${C.blue}18`, border: `1px solid ${C.blue}35` }}>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.blue }} />
              <span className="text-[10px] font-bold tracking-[0.22em] uppercase" style={{ color: C.blue }}>
                Nilai yang Paling Sering Dilewatkan
              </span>
            </div>

            {/* Oversized display heading */}
            <div className="relative mb-4">
              <h3 className="font-poppins font-black text-[26px] sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] tracking-tight">
                Database Pelanggan:
              </h3>
              <div className="relative inline-block mt-1 md:mt-2">
                <span
                  className="font-poppins font-black text-[26px] sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight block"
                  style={{
                    background: `linear-gradient(135deg, ${C.blue} 0%, #60a5fa 40%, ${C.blueD} 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Harta Karun yang Kamu Buang
                </span>
                {/* underline accent */}
                <motion.div
                  className="absolute -bottom-1 left-0 h-[3px] rounded-full"
                  style={{ background: `linear-gradient(90deg, ${C.blue}, transparent)` }}
                  initial={{ width: 0 }}
                  whileInView={{ width: "60%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>

            <p className="text-[13px] md:text-base lg:text-lg mt-5 max-w-xl mx-auto leading-relaxed" style={{ color: C.subtle }}>
              Di marketplace, kamu mungkin punya{" "}
              <span className="font-bold text-white/80">1.000 pembeli</span>.
              Tapi coba jawab:{" "}
              <em className="not-italic font-bold" style={{ color: C.blue }}>
                kamu tahu nama, nomor HP, dan kebiasaan belanja mereka?
              </em>
            </p>
          </FadeUp>

          {/* ── 3 Big Stat Cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-10">
            {[
              {
                number: "5×",
                label: "Lebih Murah",
                sub: "jual ke pelanggan lama vs cari pelanggan baru",
                color: C.blue,
                grad: `linear-gradient(135deg, ${C.blueD}22, ${C.blue}18)`,
              },
              {
                number: "60–70%",
                label: "Kemungkinan Beli Lagi",
                sub: "pelanggan existing yang pernah puas dengan produkmu",
                color: C.orange,
                grad: `linear-gradient(135deg, ${C.orange}18, ${C.orange}08)`,
              },
              {
                number: "Rp 0",
                label: "Biaya Remarketing",
                sub: "kirim promo WhatsApp langsung ke database-mu sendiri",
                color: C.blue,
                grad: `linear-gradient(135deg, ${C.blueD}22, ${C.blue}10)`,
              },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-2xl md:rounded-3xl p-5 md:p-7 overflow-hidden group cursor-default"
                style={{ background: s.grad, border: `1px solid ${s.color}30` }}
              >
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl"
                  style={{ background: `linear-gradient(90deg, ${s.color}, transparent)` }} />

                {/* Glow blob */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-[0.18] transition-opacity duration-500 pointer-events-none"
                  style={{ background: s.color }} />

                {/* Big number */}
                <motion.p
                  className="font-black leading-none mb-2 tracking-tight"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "clamp(2.4rem, 7vw, 3.8rem)",
                    background: `linear-gradient(135deg, #ffffff, ${s.color})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  {s.number}
                </motion.p>

                <p className="font-bold text-white text-[13px] md:text-[15px] mb-1.5 leading-snug">{s.label}</p>
                <div className="h-px mb-2.5 w-8 rounded-full" style={{ background: `${s.color}60` }} />
                <p className="text-[11px] md:text-xs leading-relaxed" style={{ color: C.muted }}>{s.sub}</p>
              </motion.div>
            ))}
          </div>

          {/* ── Benefit cards — bold redesign ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {dbBenefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-2xl p-4 md:p-6 overflow-hidden group cursor-default"
                style={{ background: C.card, border: `1px solid ${C.border2}` }}
              >
                {/* Hover bg glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at top left, ${b.color}0a 0%, transparent 60%)` }} />

                {/* Left accent border */}
                <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full"
                  style={{ background: `linear-gradient(180deg, ${b.color}, ${b.color}30)` }} />

                <div className="pl-3 relative">
                  {/* Icon + title row */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${b.color}18`, boxShadow: `0 0 0 1px ${b.color}25` }}>
                      <b.icon size={17} style={{ color: b.color }} />
                    </div>
                    <h4 className="font-bold text-white text-[13px] md:text-[15px] leading-snug">{b.title}</h4>
                  </div>

                  <p className="text-[12px] md:text-[13px] leading-relaxed" style={{ color: C.subtle }}>{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Bottom callout strip ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 md:mt-6 rounded-2xl px-5 py-4 md:px-7 md:py-5 flex flex-col sm:flex-row items-start sm:items-center gap-3"
            style={{
              background: `linear-gradient(135deg, ${C.blueD}20, ${C.blue}10)`,
              border: `1px solid ${C.blue}25`,
            }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: `${C.blue}20` }}>
              <Star size={16} style={{ color: C.blue }} />
            </div>
            <p className="text-[12px] md:text-sm leading-relaxed flex-1" style={{ color: C.subtle }}>
              <strong className="text-white font-bold">Ingat:</strong>{" "}
              Di marketplace, data pelangganmu{" "}
              <strong style={{ color: C.red }}>bukan milikmu</strong>.
              {" "}Mereka bisa pakai data itu untuk iklankan produk kompetitormu. Di website sendiri?{" "}
              <strong className="text-white">100% data adalah milikmu.</strong>
            </p>
          </motion.div>
        </div>

        {/* ══ 7. 6 KEUNGGULAN SISTEM SENDIRI ══ */}
        <div ref={ownRef} className="mb-10 md:mb-16 lg:mb-20">
          <FadeUp className="text-center mb-6 md:mb-10">
            <SectionLabel color={C.orange}>Mengapa Harus Punya Sendiri</SectionLabel>
            <h3 className="font-poppins font-extrabold text-[19px] sm:text-2xl md:text-3xl lg:text-4xl text-white leading-tight">
              6 Kelebihan Nyata Punya{" "}
              <GradText grad={gradAmber}>Rumah Digital Sendiri</GradText>
            </h3>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {ownBenefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 28 }}
                animate={ownInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl p-4 md:p-5 relative overflow-hidden group"
                style={{ background: C.card, border: `1px solid ${C.border2}` }}
              >
                {/* Hover glow — desktop only */}
                <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-[0.12] transition-opacity duration-500 pointer-events-none hidden md:block"
                  style={{ background: b.color }} />

                {/* Accent line that animates in */}
                <motion.div
                  className="h-[2px] rounded-full mb-4 origin-left"
                  style={{ background: b.color }}
                  initial={{ scaleX: 0 }}
                  animate={ownInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.07 }}
                />

                <div className="flex items-start gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: `${b.color}18` }}>
                    <b.icon size={16} style={{ color: b.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-semibold mb-0.5 tracking-wide leading-none" style={{ color: C.muted }}>
                      {b.short}
                    </p>
                    <h4 className="font-bold text-white text-[13px] md:text-[15px] leading-snug">{b.title}</h4>
                  </div>
                </div>
                <p className="text-[11px] md:text-[12px] leading-relaxed mt-2.5" style={{ color: C.subtle }}>{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ══ 8. TABEL PERBANDINGAN ══ */}
        <div ref={compareRef} className="mb-10 md:mb-16 lg:mb-20">
          <FadeUp className="text-center mb-5 md:mb-8">
            <SectionLabel>Perbandingan Langsung</SectionLabel>
            <h3 className="font-poppins font-extrabold text-[19px] sm:text-2xl md:text-3xl text-white leading-tight">
              Marketplace vs Website Sendiri
            </h3>
          </FadeUp>

          <FadeUp delay={0.08}>
            <div className="rounded-2xl overflow-hidden" style={{ background: C.card, border: `1px solid ${C.border2}` }}>
              {/* Header */}
              <div className="grid grid-cols-[1fr_auto_auto]" style={{ background: "#181818", borderBottom: `1px solid ${C.border2}` }}>
                <div className="px-3 md:px-5 py-3 md:py-4">
                  <p className="font-bold text-[11px] md:text-sm" style={{ color: C.muted }}>Aspek</p>
                </div>
                <div className="w-[72px] md:w-[110px] px-2 md:px-4 py-3 md:py-4 text-center flex flex-col items-center justify-center"
                  style={{ borderLeft: `1px solid ${C.border2}` }}>
                  <XCircle size={12} style={{ color: C.red }} className="mb-0.5 md:hidden" />
                  <p className="font-bold text-[10px] md:text-sm" style={{ color: C.red }}>
                    <span className="hidden md:inline">Marketplace</span>
                    <span className="md:hidden">Market</span>
                  </p>
                </div>
                <div className="w-[72px] md:w-[110px] px-2 md:px-4 py-3 md:py-4 text-center flex flex-col items-center justify-center"
                  style={{ borderLeft: `1px solid ${C.border2}` }}>
                  <CheckCircle2 size={12} style={{ color: C.blue }} className="mb-0.5 md:hidden" />
                  <p className="font-bold text-[10px] md:text-sm" style={{ color: C.blue }}>
                    <span className="hidden md:inline">Website Sendiri</span>
                    <span className="md:hidden">Website</span>
                  </p>
                </div>
              </div>

              {comparisonRows.map((row, i) => (
                <motion.div
                  key={row.aspect}
                  initial={{ opacity: 0, x: -10 }}
                  animate={compareInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.05 + 0.15 }}
                  className="grid grid-cols-[1fr_auto_auto] transition-colors duration-150 hover:bg-white/[0.02]"
                  style={{ borderBottom: i < comparisonRows.length - 1 ? `1px solid ${C.border}` : undefined }}
                >
                  <div className="px-3 md:px-5 py-3 md:py-3.5">
                    <p className="text-[11px] md:text-xs leading-snug" style={{ color: C.subtle }}>{row.aspect}</p>
                  </div>
                  <div className="w-[72px] md:w-[110px] py-3 md:py-3.5 flex items-center justify-center"
                    style={{ borderLeft: `1px solid ${C.border}` }}>
                    {row.market
                      ? <CheckCircle2 size={14} style={{ color: C.blue }} />
                      : <XCircle size={14} style={{ color: `${C.red}60` }} />
                    }
                  </div>
                  <div className="w-[72px] md:w-[110px] py-3 md:py-3.5 flex items-center justify-center"
                    style={{ borderLeft: `1px solid ${C.border}` }}>
                    {row.own
                      ? <CheckCircle2 size={14} style={{ color: C.blue }} />
                      : <XCircle size={14} style={{ color: `${C.red}60` }} />
                    }
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-[10px] md:text-xs text-center mt-3" style={{ color: `${C.muted}90` }}>
              * Marketplace tetap relevan sebagai kanal akuisisi pelanggan baru — bukan satu-satunya fondasi bisnis.
            </p>
          </FadeUp>
        </div>

        {/* ══ 9. KONTEKS PASAR ══ */}
        <FadeUp className="mb-8 md:mb-10">
          <div
            className="rounded-2xl md:rounded-3xl p-5 md:p-8 lg:p-12 relative overflow-hidden text-center"
            style={{
              background: `linear-gradient(135deg, ${C.blue}12 0%, ${C.card} 50%, ${C.orange}10 100%)`,
              border: `1px solid ${C.border2}`,
            }}
          >
            <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 rounded-full blur-3xl opacity-[0.06] pointer-events-none"
              style={{ background: C.orange }} />
            <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 mb-4"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <Zap size={11} style={{ color: C.orange }} />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: C.orange }}>
                Bukan Pilih Salah Satu
              </span>
            </div>
            <p className="font-poppins font-bold text-[17px] sm:text-xl md:text-2xl lg:text-3xl text-white mb-3 md:mb-4 leading-snug max-w-3xl mx-auto">
              Nilai transaksi e-commerce Indonesia{" "}
              <GradText grad={gradAmber}>Rp 487 triliun</GradText> di 2024.{" "}
              Marketplace tidak bisa diabaikan — tapi tidak boleh jadi{" "}
              <em>satu-satunya</em> fondasimu.
            </p>
            <p className="text-[12px] md:text-sm lg:text-base max-w-2xl mx-auto leading-relaxed" style={{ color: C.subtle }}>
              Strategi yang tepat:{" "}
              <strong className="text-white">
                gunakan marketplace untuk menjangkau pembeli baru, lalu arahkan ke ekosistem milikmu sendiri.
              </strong>{" "}
              Website jadi pusat — marketplace jadi corong masuk.
            </p>
          </div>
        </FadeUp>

        {/* ══ 10. CTA ══ */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 28 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Home size={14} style={{ color: C.orange }} />
            <span className="text-[13px] md:text-sm font-semibold" style={{ color: C.orange }}>
              Sudah waktunya punya rumah digital sendiri.
            </span>
          </div>
          <p className="text-[12px] md:text-sm lg:text-base mb-6 max-w-md mx-auto leading-relaxed" style={{ color: C.subtle }}>
            Kami bantu kamu mulai dari titik yang paling masuk akal — tidak perlu sekaligus.{" "}
            <strong className="text-white">Mulai dan bisa langsung kepakai.</strong>
          </p>
          {/* Buttons — stack on mobile, row on sm */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <motion.button
              onClick={() => document.querySelector("#produk")?.scrollIntoView({ behavior: "smooth" })}
              whileTap={{ scale: 0.97 }}
              className="font-poppins font-semibold px-6 py-[14px] rounded-full text-[13px] md:text-sm flex items-center gap-2 justify-center sm:w-auto transition-opacity active:opacity-80"
              style={{ background: gradAmber, color: "#fff", minHeight: 48 }}
            >
              Lihat Paket yang Tepat
              <ArrowRight size={14} />
            </motion.button>
            <motion.button
              onClick={() => document.querySelector("#kontak")?.scrollIntoView({ behavior: "smooth" })}
              whileTap={{ scale: 0.97 }}
              className="font-poppins font-semibold px-6 py-[14px] rounded-full text-[13px] md:text-sm flex items-center gap-2 justify-center sm:w-auto transition-colors active:opacity-80"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.14)",
                color: "white",
                minHeight: 48,
              }}
            >
              Diskusi Dulu, Gratis
            </motion.button>
          </div>
        </motion.div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${C.crimson}30, transparent)` }} />
    </section>
  );
}
