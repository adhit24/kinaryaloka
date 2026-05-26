import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  Home,
  BarChart3,
  TrendingUp,
  Lightbulb,
  Sparkles,
} from "lucide-react";

/* ─── Design tokens ─── */
const C = {
  orange:  "#e07a30",
  blue:    "#3b82f6",
  blueD:   "#004896",
  crimson: "#831449",
  pink:    "#c9547a",
  red:     "#ef4444",
  green:   "#22c55e",
  yellow:  "#eab308",
  bg:      "#080808",
  card:    "#0f0f0f",
  cardHover: "#141414",
  border:  "#1e1e1e",
  border2: "#222222",
  muted:   "#888888",
  subtle:  "#9a9a9a",
};

const gradAmber = `linear-gradient(135deg, ${C.orange}, #f5a55a)`;

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

/* ─── Tab Data ─── */
const tabsMasalah = [
  {
    title: "Masih jawab pertanyaan harga lewat DM satu-satu?",
    desc: "Katalog produk online bisa dibagikan sekali, diakses selamanya.",
    color: C.pink,
  },
  {
    title: "Pembeli minta foto produk tapi kamu bingung kirim ke mana?",
    desc: "Toko online yang rapi bikin calon pembeli percaya sebelum tanya.",
    color: C.blue,
  },
  {
    title: "Promosi jalan, tapi tidak tahu berapa yang lihat & beli?",
    desc: "Sistem digital yang tepat kasih kamu data nyata, bukan perasaan.",
    color: C.yellow,
  },
  {
    title: "Jam kerja habis untuk hal yang bisa diotomasi?",
    desc: "Otomatisasi pesanan, stok, dan notifikasi — biar sistem yang kerja.",
    color: C.green,
  },
  {
    title: "Pelanggan beli sekali, lalu hilang tanpa jejak?",
    desc: "Database pelanggan sendiri bikin kamu bisa follow up kapan saja.",
    color: C.orange,
  },
];

const tabsFakta = [
  {
    title: "Komisi marketplace naik 15× di 2026",
    desc: "Tokopedia naikkan batas komisi dari Rp 40.000 ke Rp 650.000 per item.",
    color: C.red,
  },
  {
    title: "Total potongan bisa mencapai 24–30% per transaksi",
    desc: "Komisi + layanan + iklan + ongkir + promo wajib = margin habis.",
    color: C.orange,
  },
  {
    title: "Brand besar mulai keluar dari marketplace",
    desc: "True To Skin, Noera, dan brand lokal lain mulai bangun ekosistem sendiri.",
    color: C.pink,
  },
  {
    title: "Data pelangganmu bukan milikmu di marketplace",
    desc: "Platform bisa gunakan data pembelimu untuk iklankan produk kompetitor.",
    color: C.blue,
  },
  {
    title: "Rp 564 juta hilang per tahun untuk toko omset Rp 100 juta/bulan",
    desc: "Potongan dari 8 pos berbeda yang diam-diam menggerus profit.",
    color: C.yellow,
  },
];

const tabsSolusi = [
  {
    title: "Website sendiri = rumah digital yang tidak bisa disita",
    desc: "Tidak bisa dihapus, dinaikkan sewanya, atau diubah aturannya sepihak.",
    color: C.blue,
  },
  {
    title: "Kontrol penuh atas harga, margin, dan promosi",
    desc: "Flash sale, bundling, diskon khusus — semua tanpa izin platform.",
    color: C.orange,
  },
  {
    title: "Database pelanggan 100% milikmu",
    desc: "Nama, HP, riwayat belanja — hubungi kapanpun tanpa bayar platform.",
    color: C.green,
  },
  {
    title: "SEO = aset jangka panjang yang bekerja bertahun-tahun",
    desc: "Sekali investasi konten, mendatangkan pembeli organik 3–5 tahun.",
    color: C.yellow,
  },
  {
    title: "Marketplace tetap jadi corong, website jadi pusat",
    desc: "Gunakan marketplace untuk akuisisi, lalu arahkan ke ekosistemmu.",
    color: C.pink,
  },
];

const tabs = [
  { key: "masalah", label: "Masalahmu", icon: AlertTriangle, data: tabsMasalah },
  { key: "fakta", label: "Fakta Market", icon: BarChart3, data: tabsFakta },
  { key: "solusi", label: "Solusinya", icon: Lightbulb, data: tabsSolusi },
];

const tabDescriptions: Record<string, string> = {
  masalah: "Masalah ini bukan karena bisnis kamu kurang bagus — tapi karena belum ada sistem yang mendukungnya.",
  fakta: "Ini bukan opini — ini fakta yang terjadi di ekosistem marketplace Indonesia 2026.",
  solusi: "Solusi bukan meninggalkan marketplace sepenuhnya, tapi punya fondasi yang kamu kontrol.",
};

/* ══════════════════════════════════════════════════ */
export default function MarketplaceExodus() {
  const wrapRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-40px" });

  const [activeTab, setActiveTab] = useState("masalah");
  const currentTab = tabs.find((t) => t.key === activeTab)!;

  return (
    <section
      id="marketplace-vs-website"
      ref={wrapRef}
      className="relative overflow-hidden py-14 md:py-24 lg:py-32"
      style={{ background: C.bg }}
    >
      {/* ── Ambient glow layers ── */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] md:w-[1000px] h-[350px] md:h-[550px] rounded-full blur-[100px] md:blur-[140px] opacity-[0.06]"
          style={{ background: `radial-gradient(ellipse, ${C.crimson} 0%, transparent 70%)` }} />
        <div className="absolute bottom-32 left-0 w-[400px] md:w-[700px] h-[250px] md:h-[450px] rounded-full blur-[90px] md:blur-[130px] opacity-[0.04]"
          style={{ background: `radial-gradient(ellipse, ${C.orange} 0%, transparent 70%)` }} />
        <div className="absolute top-1/2 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[400px] rounded-full blur-[80px] md:blur-[120px] opacity-[0.03]"
          style={{ background: `radial-gradient(ellipse, ${C.blue} 0%, transparent 70%)` }} />
      </motion.div>

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${C.crimson}50, ${C.orange}40, transparent)` }} />

      {/* ── Container ── */}
      <div className="max-w-[820px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">

        {/* ══ HEADER ══ */}
        <FadeUp className="text-center mb-10 md:mb-14">
          {/* Alert badge */}
          <motion.div
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 mb-7"
            style={{ background: `${C.red}12`, border: `1px solid ${C.red}30`, backdropFilter: "blur(8px)" }}
            animate={{ boxShadow: [`0 0 0px ${C.red}00`, `0 0 20px ${C.red}15`, `0 0 0px ${C.red}00`] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <AlertTriangle size={13} style={{ color: C.red }} />
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: C.red }}>
              Peringatan UMKM
            </span>
          </motion.div>

          <h2 className="font-poppins font-extrabold text-[28px] sm:text-[42px] md:text-[52px] lg:text-[60px] text-white leading-[1.08] mb-5 md:mb-6 tracking-tight">
            Brand Besar Tinggalkan<br />
            <span className="relative inline-block">
              <GradText grad={gradAmber}>Marketplace</GradText>
              {/* Animated underline */}
              <motion.span
                className="absolute -bottom-1 left-0 h-[3px] rounded-full"
                style={{ background: gradAmber, opacity: 0.6 }}
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </span>
          </h2>
          <p className="text-[14px] md:text-[16px] max-w-lg mx-auto leading-[1.7]" style={{ color: C.subtle }}>
            Mei 2026 — platform e-commerce kompak naikkan biaya.{" "}
            <strong className="text-white font-semibold">UMKM mulai tersudut.</strong>
          </p>
        </FadeUp>

        {/* ══ TABS ══ */}
        <FadeUp delay={0.1} className="mb-9 md:mb-11">
          <div
            className="flex items-center rounded-full p-1.5 mx-auto max-w-fit"
            style={{
              background: `linear-gradient(135deg, ${C.card}, #0d0d0d)`,
              border: `1px solid ${C.border2}`,
              boxShadow: `0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)`,
            }}
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <motion.button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className="relative flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-full text-[12px] md:text-sm font-semibold transition-colors duration-200"
                  style={{ color: isActive ? "#fff" : C.muted }}
                  whileHover={{ scale: isActive ? 1 : 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBg"
                      className="absolute inset-0 rounded-full"
                      style={{ background: gradAmber, boxShadow: `0 2px 12px ${C.orange}40` }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <tab.icon size={14} />
                    <span className="whitespace-nowrap">{tab.label}</span>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </FadeUp>

        {/* ══ TAB CONTENT ══ */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Description */}
            <p className="text-[14px] md:text-[15px] leading-[1.7] mb-7 md:mb-9" style={{ color: C.subtle }}>
              {tabDescriptions[activeTab]}
            </p>

            {/* Cards */}
            <div className="flex flex-col gap-3.5 md:gap-4">
              {currentTab.data.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="relative rounded-2xl p-5 md:p-6 overflow-hidden group cursor-default"
                  style={{
                    background: C.card,
                    borderLeft: `3px solid ${item.color}`,
                    borderTop: `1px solid ${C.border2}`,
                    borderRight: `1px solid ${C.border2}`,
                    borderBottom: `1px solid ${C.border2}`,
                    transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.background = C.cardHover;
                    el.style.borderTopColor = `${item.color}30`;
                    el.style.borderRightColor = `${item.color}30`;
                    el.style.borderBottomColor = `${item.color}30`;
                    el.style.boxShadow = `0 4px 20px ${item.color}10, inset 0 0 30px ${item.color}05`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.background = C.card;
                    el.style.borderTopColor = C.border2;
                    el.style.borderRightColor = C.border2;
                    el.style.borderBottomColor = C.border2;
                    el.style.boxShadow = "none";
                  }}
                >
                  {/* Subtle inner gradient glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at left center, ${item.color}08 0%, transparent 60%)` }}
                  />

                  {/* Dot indicator on right — pulsing */}
                  <motion.div
                    className="absolute top-5 right-5 w-2.5 h-2.5 rounded-full"
                    style={{ background: item.color, boxShadow: `0 0 6px ${item.color}50` }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                  />

                  <h4 className="relative font-bold text-white text-[14px] md:text-[15px] leading-snug mb-2 pr-8 group-hover:text-white/95 transition-colors">
                    {item.title}
                  </h4>
                  <p className="relative text-[13px] md:text-sm leading-[1.7]" style={{ color: C.subtle }}>
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ══ STATS ROW ══ */}
        <FadeUp delay={0.15} className="mt-12 md:mt-16 mb-12 md:mb-16">
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {[
              { number: "24–30%", label: "potongan per transaksi", color: C.red },
              { number: "Rp 564 Jt", label: "hilang per tahun", color: C.orange },
              { number: "5×", label: "lebih murah retain pelanggan", color: C.blue },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                className="relative text-center rounded-2xl p-4 md:p-6 overflow-hidden group"
                style={{ background: `${s.color}06`, border: `1px solid ${s.color}18` }}
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: `linear-gradient(90deg, transparent, ${s.color}60, transparent)` }} />

                <motion.p
                  className="font-poppins font-extrabold text-[17px] sm:text-[22px] md:text-[28px] leading-none mb-2"
                  style={{ color: s.color }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {s.number}
                </motion.p>
                <p className="text-[10px] md:text-[11px] leading-snug" style={{ color: C.muted }}>
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </FadeUp>

        {/* ══ MARKET CONTEXT ══ */}
        <FadeUp className="mb-12 md:mb-16">
          <div
            className="rounded-3xl p-6 md:p-10 text-center relative overflow-hidden"
            style={{
              background: `linear-gradient(160deg, ${C.blue}0c 0%, ${C.card} 40%, ${C.orange}08 100%)`,
              border: `1px solid ${C.border2}`,
              boxShadow: `0 8px 32px rgba(0,0,0,0.3)`,
            }}
          >
            {/* Decorative orbs */}
            <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full blur-[60px] opacity-[0.07] pointer-events-none"
              style={{ background: C.orange }} />
            <div className="absolute -bottom-12 -left-12 w-44 h-44 rounded-full blur-[50px] opacity-[0.05] pointer-events-none"
              style={{ background: C.blue }} />

            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-5"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(4px)" }}>
              <TrendingUp size={12} style={{ color: C.orange }} />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: C.orange }}>
                Strategi Cerdas
              </span>
            </div>
            <p className="font-poppins font-bold text-[17px] sm:text-xl md:text-[26px] text-white mb-4 leading-snug max-w-2xl mx-auto tracking-tight">
              Marketplace tetap jadi corong —{" "}
              <GradText grad={gradAmber}>website sendiri jadi pusat bisnismu.</GradText>
            </p>
            <p className="text-[13px] md:text-[15px] max-w-lg mx-auto leading-[1.7]" style={{ color: C.subtle }}>
              Gunakan marketplace untuk menjangkau pembeli baru, lalu arahkan ke ekosistem yang kamu kontrol penuh.
            </p>
          </div>
        </FadeUp>

        {/* ══ CTA ══ */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 28 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-2.5 mb-4">
            <Sparkles size={15} style={{ color: C.orange }} />
            <span className="text-[13px] md:text-[15px] font-semibold" style={{ color: C.orange }}>
              Sudah waktunya punya rumah digital sendiri.
            </span>
          </div>
          <p className="text-[13px] md:text-[15px] mb-7 max-w-md mx-auto leading-[1.7]" style={{ color: C.subtle }}>
            Kami bantu kamu mulai dari titik yang paling masuk akal — tidak perlu sekaligus.{" "}
            <strong className="text-white font-semibold">Mulai dan bisa langsung kepakai.</strong>
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <motion.button
              onClick={() => document.querySelector("#produk")?.scrollIntoView({ behavior: "smooth" })}
              whileHover={{ scale: 1.03, boxShadow: `0 4px 20px ${C.orange}40` }}
              whileTap={{ scale: 0.97 }}
              className="font-poppins font-semibold px-7 py-4 rounded-full text-[13px] md:text-sm flex items-center gap-2.5 justify-center sm:w-auto"
              style={{ background: gradAmber, color: "#fff", boxShadow: `0 2px 12px ${C.orange}30` }}
            >
              Lihat Paket yang Tepat
              <ArrowRight size={15} />
            </motion.button>
            <motion.button
              onClick={() => document.querySelector("#kontak")?.scrollIntoView({ behavior: "smooth" })}
              whileHover={{ scale: 1.03, background: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.97 }}
              className="font-poppins font-semibold px-7 py-4 rounded-full text-[13px] md:text-sm flex items-center gap-2 justify-center sm:w-auto"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "white",
                backdropFilter: "blur(4px)",
              }}
            >
              <Home size={14} />
              Diskusi Dulu, Gratis
            </motion.button>
          </div>
        </motion.div>

      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${C.crimson}25, ${C.orange}20, transparent)` }} />
    </section>
  );
}
