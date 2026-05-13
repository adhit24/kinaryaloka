import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, ChevronRight, ExternalLink, RotateCcw } from 'lucide-react'
import naraImg from '../../Assets/nara_mask.png'

// ─── Knowledge Base ─────────────────────────────────────────────────────────
const KB = {
  company: {
    name: 'KINARYALOKA Digital Studio',
    tagline: 'Partner digital untuk UMKM yang mau serius tapi tidak tahu mulai dari mana.',
    description: 'KINARYALOKA Digital Studio lahir untuk membantu UMKM menerjemahkan cara bisnis mereka ke sistem digital yang rapi, jelas, dan bisa dipakai sehari-hari.',
    values: [
      'Tepat Sasaran — Kami pelajari bisnis kamu dulu, baru bikin sistemnya.',
      'Partner bukan Vendor — Support dan komunikasi tetap berjalan setelah project selesai.',
      'Langsung Kepakai — Semua yang kami bangun dirancang agar bisa dipakai sehari-hari.',
      'Transparan & Jelas — Harga jelas, progress jelas, hasil jelas. Tidak ada biaya tersembunyi.',
    ],
    whatsapp: '6281357662424',
    whatsappMessage: 'Halo KINARYALOKA! Saya mau konsultasi gratis 30 menit untuk bisnis saya.',
    founded: '29 April 2026',
    sharia: 'KINARYALOKA berprinsip syariah — kami tidak menerima project yang bertentangan dengan hukum syariat Islam.',
    commitment: ['90% akurasi produk akhir sesuai design Figma', '24/7 komunikasi aktif dan support tanpa batas waktu', '100% integrasi sistem yang dapat diandalkan'],
  },
  process: [
    'Hubungi kami via WhatsApp',
    'Cerita soal bisnis & kebutuhanmu',
    'Kami rekomendasikan paket yang tepat',
    'Project dimulai dengan rapi dan terstruktur',
  ],
  products: {
    ecommerce: [
      {
        id: 'katalog-digital',
        name: 'Katalog Digital',
        price: 2500,
        tag: 'ecommerce',
        badge: undefined as string | undefined,
        ideal: ['umkm baru', 'tidak butuh payment gateway', 'pemesanan via whatsapp', 'budget kecil'],
        description: 'Website katalog produk online. Pelanggan lihat produk & pesan langsung via WhatsApp.',
        features: ['Web katalog (hingga 50 produk)', 'Tombol pesan via WhatsApp', 'Mobile responsive', 'Revisi desain hingga puas'],
      },
      {
        id: 'toko-online',
        name: 'Toko Online',
        price: 5000,
        tag: 'ecommerce',
        badge: undefined as string | undefined,
        ideal: ['checkout online', 'payment gateway', 'keranjang belanja', 'midtrans', 'xendit'],
        description: 'Toko online lengkap dengan keranjang belanja & payment gateway.',
        features: ['Keranjang belanja', 'Checkout & payment gateway', 'Dashboard admin', 'Domain & hosting 1 tahun', 'Support teknis 2 bulan'],
      },
      {
        id: 'olshop-full',
        name: 'Olshop Full',
        price: 8000,
        tag: 'ecommerce',
        badge: undefined as string | undefined,
        ideal: ['inventori', 'multi varian', 'voucher diskon', 'laporan penjualan', 'banyak produk'],
        description: 'Platform jual beli penuh fitur: inventori, multi-varian, voucher, laporan real-time.',
        features: ['Semua fitur Toko Online', 'Manajemen inventori & stok otomatis', 'Sistem voucher & kode diskon', 'Laporan penjualan & analitik', 'Support prioritas 3 bulan'],
      },
      {
        id: 'ecommerce-full-brand',
        name: 'E-Commerce Full Brand',
        price: 15000,
        tag: 'ecommerce',
        badge: 'Flagship',
        ideal: ['brand lengkap', 'toko online profesional', 'sosial media kit', 'google my business', 'seo lengkap', 'semua fitur'],
        description: 'E-commerce profesional + identitas brand lengkap.',
        features: ['Semua fitur Olshop Full', 'Desain identitas visual (logo + color system)', 'Social media kit 10 template', 'SEO on-page lengkap', 'Support prioritas 6 bulan'],
      },
    ],
    webdesign: [
      {
        id: 'paket-reservasi',
        name: 'Paket Reservasi',
        price: 2500,
        tag: 'webdesign',
        badge: undefined as string | undefined,
        ideal: ['booking online', 'reservasi', 'tanpa website', 'jasa layanan', 'salon', 'klinik', 'restoran'],
        description: 'Sistem booking online siap pakai tanpa perlu website.',
        features: ['Setup sistem booking online', 'Notifikasi WhatsApp', 'Interface mobile-friendly', 'Support teknis 30 hari'],
      },
      {
        id: 'website-reservasi',
        name: 'Website & Reservasi',
        price: 5000,
        tag: 'webdesign',
        badge: undefined as string | undefined,
        ideal: ['website profesional', 'landing page', 'booking simpel', 'profil bisnis'],
        description: 'Website profesional lengkap dengan sistem booking simpel.',
        features: ['Custom web design landing page', 'Sistem reservasi simpel', 'Integrasi Google Maps', 'Tombol WhatsApp', 'Support teknis 1 bulan'],
      },
      {
        id: 'website-pro',
        name: 'Website Pro',
        price: 8000,
        tag: 'webdesign',
        badge: undefined as string | undefined,
        ideal: ['multi halaman', 'database', 'dashboard admin', 'riwayat booking', 'website lengkap'],
        description: 'Web design multi-halaman dengan sistem reservasi bertenaga database.',
        features: ['Custom web design multi-halaman', 'Dashboard admin kelola booking', 'Notifikasi otomatis WhatsApp & Email', 'Domain & hosting 1 tahun', 'Support teknis 3 bulan'],
      },
      {
        id: 'full-digital-package',
        name: 'Full Digital Package',
        price: 12000,
        tag: 'webdesign',
        badge: 'Flagship',
        ideal: ['transformasi digital', 'semua fitur web', 'brand identity', 'seo', 'google analytics', 'konsultasi konten'],
        description: 'Transformasi digital menyeluruh dari sistem, website, hingga identitas visual.',
        features: ['Semua fitur Website Pro', 'Desain identitas visual', 'Social media kit 8 template', 'SEO on-page', 'Support prioritas 6 bulan'],
      },
    ],
    branding: [
      {
        id: 'paket-branding',
        name: 'Paket Branding',
        price: 1500,
        tag: 'branding',
        badge: undefined as string | undefined,
        ideal: ['logo', 'identitas brand', 'brand baru', 'color palette', 'tagline', 'brand story'],
        description: 'Identitas brand lengkap: logo, color palette, copywriting, social media kit.',
        features: ['Desain logo (3 konsep)', 'Color palette & typography', 'Brand guidelines PDF', 'Social media kit 5 template'],
      },
      {
        id: 'branding-copywriting',
        name: 'Branding + Copywriting',
        price: 2500,
        tag: 'branding',
        badge: undefined as string | undefined,
        ideal: ['copywriting', 'caption media sosial', 'website copy', 'deskripsi produk', 'email marketing'],
        description: 'Branding lengkap dengan copywriting profesional untuk website & social media.',
        features: ['Semua fitur Paket Branding', 'Website copywriting 5 halaman', 'Social media copy 15 template caption', 'Packaging label design', 'Support 1 bulan'],
      },
      {
        id: 'complete-branding',
        name: 'Complete Branding',
        price: 4000,
        tag: 'branding',
        badge: undefined as string | undefined,
        ideal: ['branding menyeluruh', 'ads copywriting', 'google ads', 'meta ads', 'packaging', 'print ready', 'brand strategy'],
        description: 'Solusi branding end-to-end: visual identity, copywriting, dan marketing kit.',
        features: ['Semua fitur Branding + Copywriting', 'Social media kit 20 template', 'Ads copywriting Google + Meta', 'Brand strategy consultation', 'Support 2 bulan'],
      },
    ],
  },
}

const allProducts = [...KB.products.ecommerce, ...KB.products.webdesign, ...KB.products.branding]

// ─── Navigation Shortcuts ───────────────────────────────────────────────────
function scrollTo(sectionId: string) {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
}

function openWA(custom?: string) {
  const msg = custom || KB.company.whatsappMessage
  window.open(`https://wa.me/${KB.company.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank')
}

// ─── Consultation State ──────────────────────────────────────────────────────
type ConsultStep = 'idle' | 'bisnis_type' | 'bisnis_need' | 'budget' | 'done'

interface ConsultState {
  step: ConsultStep
  bisnisType: string
  need: string
  budget: number
}

// ─── Conversation Context ─────────────────────────────────────────────────────
interface ConvContext {
  userName: string
  lastIntent: Intent
  topicsDiscussed: string[]
  pendingClarification: { originalText: string; offeredIntents: Intent[] } | null
  clarifyLoopCount: number
  awaitingCustomContext: string | null
}

// ─── Message Type ────────────────────────────────────────────────────────────
interface ChatMessage {
  id: number
  role: 'bot' | 'user'
  text: string
  chips?: string[]
  products?: typeof allProducts
  nav?: { label: string; sectionId: string }[]
  waLink?: string
}

// ─── Intent Matching ─────────────────────────────────────────────────────────
function matchKeywords(text: string, keywords: string[]): boolean {
  const lower = text.toLowerCase()
  return keywords.some((k) => lower.includes(k))
}

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim()
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

type Intent =
  | 'greeting' | 'about' | 'values' | 'process' | 'commitment' | 'sharia'
  | 'product_ecommerce' | 'product_webdesign' | 'product_branding' | 'product_all'
  | 'price' | 'consult' | 'payment' | 'timeline' | 'revision' | 'portfolio'
  | 'team' | 'location' | 'after_project' | 'followup' | 'name_intro'
  | 'nav_tentang' | 'nav_produk' | 'nav_komitmen' | 'nav_digital'
  | 'whatsapp' | 'thanks' | 'history' | 'unknown' | 'custom'

// ─── Dynamic Keyword Learning ────────────────────────────────────────────────────
const dynamicKeywords: Map<string, Intent> = new Map()
const customIntentResponses: Map<string, string> = new Map()

function addDynamicKeyword(word: string, intent: Intent) {
  const n = normalize(word)
  if (n.length > 1) dynamicKeywords.set(n, intent)
}

function clearDynamicKeywords() {
  dynamicKeywords.clear()
  customIntentResponses.clear()
}

// ─── Clarification Suggestion Options ──────────────────────────────────────────
const CLARIFICATION_OPTIONS: { intent: Intent; chip: string }[] = [
  { intent: 'about',            chip: 'Profil KINARYALOKA' },
  { intent: 'product_ecommerce', chip: 'Toko Online & E-Commerce' },
  { intent: 'product_webdesign', chip: 'Website & Web Design' },
  { intent: 'product_branding',  chip: 'Branding & Logo' },
  { intent: 'price',            chip: 'Harga & Biaya' },
  { intent: 'process',          chip: 'Proses & Cara Kerja' },
  { intent: 'payment',          chip: 'Metode Pembayaran' },
  { intent: 'timeline',         chip: 'Timeline Pengerjaan' },
  { intent: 'revision',         chip: 'Revisi Desain' },
  { intent: 'portfolio',        chip: 'Portofolio & Karya' },
  { intent: 'team',             chip: 'Tim Developer' },
  { intent: 'location',         chip: 'Lokasi & Kantor' },
  { intent: 'after_project',    chip: 'Support Setelah Project' },
  { intent: 'commitment',       chip: 'Komitmen & Garansi' },
  { intent: 'values',           chip: 'Nilai & Visi Misi' },
  { intent: 'sharia',           chip: 'Kebijakan Syariah' },
  { intent: 'consult',          chip: 'Konsultasi Paket' },
  { intent: 'whatsapp',         chip: 'Hubungi via WhatsApp' },
]

function detectIntent(text: string): Intent {
  const t = normalize(text)

  // Check dynamically learned keywords first
  for (const [word, intent] of dynamicKeywords) {
    if (t.includes(word)) return intent
  }

  if (matchKeywords(t, ['nama saya', 'nama ku', 'panggil saya', 'perkenalkan', 'saya adalah']))
    return 'name_intro'
  if (matchKeywords(t, ['lebih lanjut', 'ceritain lebih', 'jelaskan lebih', 'maksudnya', 'detail dong', 'contoh dong', 'gimana caranya', 'bisa diperjelas', 'elaborasi']))
    return 'followup'
  if (matchKeywords(t, ['halo', 'hai', 'hi', 'hello', 'selamat', 'pagi', 'siang', 'malam', 'sore', 'hei', 'hay', 'haloo', 'assalamualaikum', 'permisi']))
    return 'greeting'
  if (matchKeywords(t, ['sejak kapan', 'kapan berdiri', 'kapan didirikan', 'kapan mulai', 'sudah berapa lama', 'berdiri tahun', 'kapan beroperasi', 'mulai beroperasi', 'tahun berapa', 'kapan lahir', 'kapan dibuat', 'berumur']))
    return 'history'
  if (matchKeywords(t, ['siapa', 'apa itu', 'tentang kinaryaloka', 'kinaryaloka itu', 'kalian siapa', 'studio ini', 'profil', 'latar belakang']))
    return 'about'
  if (matchKeywords(t, ['nilai', 'value', 'filosofi', 'prinsip', 'visi', 'misi', 'budaya kerja']))
    return 'values'
  if (matchKeywords(t, ['proses', 'cara kerja', 'alur', 'langkah', 'tahap', 'prosedur', 'mulai dari', 'cara order', 'cara pesan']))
    return 'process'
  if (matchKeywords(t, ['komitmen', 'garansi', 'jaminan', 'akurasi', '247', '24 jam', '90%', '100%', 'garansi apa']))
    return 'commitment'
  if (matchKeywords(t, ['syariah', 'halal', 'islam', 'haram', 'larangan', 'agama']))
    return 'sharia'
  if (matchKeywords(t, ['bayar', 'pembayaran', 'metode bayar', 'transfer', 'dp ', 'uang muka', 'cicilan', 'tempo bayar', 'lunas']))
    return 'payment'
  if (matchKeywords(t, ['berapa lama', 'timeline', 'estimasi waktu', 'kapan selesai', 'deadline', 'lama pengerjaan', 'durasi', 'selesai kapan', 'waktu pengerjaan']))
    return 'timeline'
  if (matchKeywords(t, ['revisi', 'revision', 'ubah desain', 'ganti desain', 'edit ulang', 'tidak puas', 'bisa direvisi', 'berapa kali revisi']))
    return 'revision'
  if (matchKeywords(t, ['portofolio', 'portfolio', 'contoh hasil', 'karya', 'project sebelumnya', 'hasil kerja', 'pernah bikin']))
    return 'portfolio'
  if (matchKeywords(t, ['tim', 'team', 'siapa yang kerja', 'developer', 'desainer', 'programmer', 'staff', 'karyawan', 'anggota tim']))
    return 'team'
  if (matchKeywords(t, ['alamat', 'lokasi', 'kantor', 'offline', 'ketemu langsung', 'meeting', 'tatap muka', 'dimana kalian']))
    return 'location'
  if (matchKeywords(t, ['setelah project', 'after project', 'maintenance', 'support setelah', 'jika ada bug', 'update nanti', 'kelanjutan', 'garansi setelah']))
    return 'after_project'
  if (matchKeywords(t, ['ecommerce', 'e commerce', 'toko online', 'jualan online', 'olshop', 'belanja online', 'katalog digital']))
    return 'product_ecommerce'
  if (matchKeywords(t, ['website', 'web design', 'reservasi', 'booking', 'landing page', 'web profil', 'situs web']))
    return 'product_webdesign'
  if (matchKeywords(t, ['branding', 'logo', 'brand identity', 'identitas visual', 'copywriting', 'tagline', 'desain brand']))
    return 'product_branding'
  if (matchKeywords(t, ['semua produk', 'daftar produk', 'produk apa', 'layanan apa', 'paket apa', 'ada apa aja', 'ada berapa', 'berapa jenis', 'berapa paket', 'jenis jasa', 'jenis layanan', 'apa saja jasa', 'apa saja produk', 'apa saja layanan', 'sebutkan', 'produk', 'layanan', 'paket']))
    return 'product_all'
  if (matchKeywords(t, ['harga', 'biaya', 'tarif', 'berapa', 'budget', 'investasi', 'idr', 'bayar berapa', 'mahal', 'murah']))
    return 'price'
  if (matchKeywords(t, ['konsultasi', 'butuh bantuan', 'cocok buat', 'rekomen', 'saran dong', 'bantu pilih', 'pilih yang mana', 'bingung', 'tidak tahu mulai']))
    return 'consult'
  if (matchKeywords(t, ['tentang kami', 'about us', 'section tentang']))
    return 'nav_tentang'
  if (matchKeywords(t, ['lihat produk', 'ke produk', 'section produk']))
    return 'nav_produk'
  if (matchKeywords(t, ['komitmen kami', 'ke komitmen']))
    return 'nav_komitmen'
  if (matchKeywords(t, ['mengapa digital', 'kenapa digital', 'why digital']))
    return 'nav_digital'
  if (matchKeywords(t, ['whatsapp', 'chat langsung', 'hubungi', 'kontak', 'telepon', ' wa ']))
    return 'whatsapp'
  if (matchKeywords(t, ['terima kasih', 'makasih', 'thanks', 'thank you', 'oke siap', 'mantap', 'keren', 'helpful']))
    return 'thanks'

  // Fuzzy fallback: word-overlap scoring
  const words = t.split(' ')
  const scores: [Intent, number][] = [
    ['product_ecommerce', words.filter(w => ['toko','jual','beli','produk','shop','dagang','order','belanja'].includes(w)).length],
    ['product_webdesign', words.filter(w => ['web','halaman','page','desain','design','site','domain','situs'].includes(w)).length],
    ['product_branding', words.filter(w => ['logo','brand','warna','visual','identitas','tampilan','ikon'].includes(w)).length],
    ['price', words.filter(w => ['harga','biaya','bayar','mahal','murah','idr','ribu','juta'].includes(w)).length],
    ['timeline', words.filter(w => ['lama','waktu','hari','minggu','bulan','selesai','cepat','kira'].includes(w)).length],
  ]
  const best = scores.sort((a, b) => b[1] - a[1])[0]
  if (best[1] >= 1) return best[0]

  return 'unknown'
}

// ─── Response Generator ──────────────────────────────────────────────────────
let msgId = 100

function makeBot(text: string, extra?: Partial<ChatMessage>): ChatMessage {
  return { id: ++msgId, role: 'bot', text, ...extra }
}

function makeUser(text: string): ChatMessage {
  return { id: ++msgId, role: 'user', text }
}

const MAIN_CHIPS = ['Tentang Kinaryaloka', 'Lihat Semua Produk', 'Mulai Konsultasi', 'Hubungi via WA']

function getResponse(
  userText: string,
  consult: ConsultState,
  setConsult: (c: ConsultState) => void,
  ctx: ConvContext,
  setCtx: (c: ConvContext) => void,
): ChatMessage[] {
  const intent = detectIntent(userText)

  // ── Custom context teaching mode: user provides label for an unrecognized text ──
  if (ctx.awaitingCustomContext && intent === 'unknown') {
    const originalText = ctx.awaitingCustomContext
    const contextLabel = userText.trim()
    addDynamicKeyword(originalText, 'custom')
    customIntentResponses.set(normalize(originalText), contextLabel)
    setCtx({
      ...ctx,
      lastIntent: 'custom',
      awaitingCustomContext: null,
      pendingClarification: null,
      clarifyLoopCount: 0,
    })
    return [
      makeBot(
        `Terima kasih sudah bantu saya belajar! 🙏\n\nSaya sekarang mengenali **“${originalText}”** sebagai topik tentang **${contextLabel}**. Kalau kamu tanya hal yang sama lain kali, saya sudah tahu!\n\nUntuk pertanyaan ini, tim KINARYALOKA siap bantu kamu secara langsung.`,
        {
          chips: ['Hubungi via WA', 'Mulai Konsultasi', 'Lihat Semua Produk'],
          waLink: `https://wa.me/${KB.company.whatsapp}?text=${encodeURIComponent(`Halo KINARYALOKA! Saya ingin bertanya tentang ${contextLabel}.`)}`,
        },
      ),
    ]
  }

  const name = ctx.userName ? `, **${ctx.userName}**` : ''

  const updatedCtx: ConvContext = {
    ...ctx,
    lastIntent: intent,
    topicsDiscussed: intent !== 'unknown'
      ? [...new Set([...ctx.topicsDiscussed, intent])]
      : ctx.topicsDiscussed,
    pendingClarification: ctx.pendingClarification,
    clarifyLoopCount: intent !== 'unknown' ? 0 : ctx.clarifyLoopCount,
    awaitingCustomContext: intent !== 'unknown' ? null : ctx.awaitingCustomContext,
  }

  // ── Clarification resolution: user picked a relevant option ──
  if (ctx.pendingClarification && intent !== 'unknown') {
    addDynamicKeyword(ctx.pendingClarification.originalText, intent)
    setCtx({ ...updatedCtx, pendingClarification: null, clarifyLoopCount: 0, awaitingCustomContext: null })
  } else {
    setCtx(updatedCtx)
  }

  // ── Consultation flow overrides intent ──
  if (consult.step === 'bisnis_type') {
    const bisnisList = ['umkm', 'kuliner', 'fashion', 'kecantikan', 'jasa', 'manufaktur', 'retail', 'pendidikan', 'kesehatan', 'properti', 'cafe', 'restoran', 'salon']
    const detected = bisnisList.find((b) => userText.toLowerCase().includes(b)) || userText.trim()
    setConsult({ ...consult, step: 'bisnis_need', bisnisType: detected })
    return [
      makeBot(
        `Oke, bisnis di bidang **${detected}**! 🎯\n\nSekarang ceritain, apa kebutuhan utama kamu saat ini?`,
        { chips: ['Butuh toko online / e-commerce', 'Butuh website profil / booking', 'Butuh branding & logo', 'Butuh semuanya (paket lengkap)'] },
      ),
    ]
  }

  if (consult.step === 'bisnis_need') {
    const need = userText.trim()
    setConsult({ ...consult, step: 'budget', need })
    return [
      makeBot(
        `Mantap! **${need}** — pilihan yang tepat untuk berkembang secara digital. 💡\n\nTerakhir, kira-kira budget yang kamu siapkan berapa?`,
        { chips: ['Di bawah 2 juta', '2–5 juta', '5–10 juta', '10 juta ke atas'] },
      ),
    ]
  }

  if (consult.step === 'budget') {
    const budgetMap: Record<string, number> = {
      'di bawah 2 juta': 2000,
      '2–5 juta': 5000,
      '5–10 juta': 10000,
      '10 juta ke atas': 99000,
    }
    const budget = budgetMap[userText.toLowerCase()] ?? 99000
    setConsult({ ...consult, step: 'done', budget })
    const { need, bisnisType } = consult
    const needLower = need.toLowerCase()
    let pool = allProducts
    if (needLower.includes('e-commerce') || needLower.includes('toko online')) pool = KB.products.ecommerce
    else if (needLower.includes('website') || needLower.includes('booking')) pool = KB.products.webdesign
    else if (needLower.includes('brand') || needLower.includes('logo')) pool = KB.products.branding
    else if (needLower.includes('semuanya')) pool = allProducts.filter((p) => p.badge)
    const recommended = pool.filter((p) => p.price <= budget).sort((a, b) => b.price - a.price).slice(0, 3)
    const final = recommended.length > 0 ? recommended : pool.sort((a, b) => a.price - b.price).slice(0, 2)
    return [
      makeBot(
        `Berdasarkan bisnis **${bisnisType}** dengan kebutuhan **${need}** dan budget kamu, ini rekomendasi yang paling pas:`,
        { products: final, chips: ['Konsultasi langsung via WA', 'Lihat semua produk', 'Mulai ulang konsultasi'] },
      ),
    ]
  }

  // ── Normal intents ──
  switch (intent) {
    case 'name_intro': {
      const match = userText.match(/(?:nama saya|nama ku|panggil saya|saya adalah)\s+([A-Za-z]+)/i)
      const extracted = match ? match[1] : ''
      if (extracted) setCtx({ ...updatedCtx, userName: extracted })
      return [
        makeBot(
          extracted
            ? `Senang berkenalan, **${extracted}**! 👋 Saya Nara, asisten virtual KINARYALOKA Digital Studio.\n\nAda yang bisa saya bantu untuk bisnis kamu?`
            : `Senang berkenalan! 😊 Saya Nara, asisten virtual KINARYALOKA. Mau mulai dari mana?`,
          { chips: MAIN_CHIPS },
        ),
      ]
    }

    case 'followup': {
      const elaborateMap: Partial<Record<Intent, string>> = {
        about: `**Lebih dalam tentang KINARYALOKA:**\n\nKami berdiri dengan satu misi — bantu UMKM yang mau serius go digital tapi tidak tahu harus mulai dari mana.\n\nKami tidak sekadar membangun website. Kami duduk bareng kamu, pelajari alur bisnis kamu, lalu rancang sistem yang benar-benar bisa dipakai sehari-hari — bukan cuma kelihatan bagus di portofolio.`,
        process: `**Detail alur kerja kami:**\n\n1. **Hubungi via WA** — Tim kami merespons dalam jam kerja\n2. **Discovery session** — Kami dengarkan cerita bisnis kamu, gratis tanpa komitmen\n3. **Proposal & brief** — Rekomendasi paket + timeline yang jelas\n4. **Kickoff** — Pengerjaan dimulai setelah DP dan brief disetujui\n5. **Progress update** — Kamu selalu tahu perkembangan project\n6. **Delivery & handover** — Produk selesai, kami pastikan kamu bisa pakainya`,
        commitment: `**Detail komitmen kami:**\n\n✓ **90% akurasi** — Hasil akhir sesuai brief & design yang disepakati bersama\n✓ **24/7 komunikasi** — Kamu bisa tanya kapan saja via WhatsApp, kami aktif merespons\n✓ **100% integrasi** — Sistem yang kami bangun berjalan mulus, tidak ada yang setengah jadi`,
        values: `**Nilai-nilai kami lebih dalam:**\n\n• **Tepat Sasaran** — Kami pelajari bisnis kamu dulu sebelum mulai desain atau coding\n• **Partner bukan Vendor** — Setelah project selesai, kami tetap ada dan bisa dihubungi\n• **Langsung Kepakai** — Tidak ada sistem yang rumit atau butuh training panjang\n• **Transparan & Jelas** — Harga, progress, dan hasil selalu terbuka, tidak ada kejutan`,
        timeline: `**Faktor yang mempengaruhi timeline:**\n\n• Kompleksitas fitur yang diminta\n• Kecepatan feedback & approval dari kamu\n• Jumlah revisi desain\n• Ketersediaan konten (foto produk, teks, dll)\n\nKami selalu komunikasikan estimasi yang realistis di awal, bukan janji kosong.`,
      }
      const elaboration = elaborateMap[ctx.lastIntent]
      if (elaboration) return [makeBot(elaboration, { chips: ['Mulai Konsultasi', 'Lihat Semua Produk', 'Hubungi via WA'] })]
      return [makeBot(`Bisa ceritakan lebih spesifik apa yang ingin kamu ketahui${name}? 😊`, { chips: MAIN_CHIPS })]
    }

    case 'greeting':
      return [
        makeBot(
          pick([
            `Halo${name}! 👋 Selamat datang di **KINARYALOKA Digital Studio**.\n\nSaya Nara, asisten virtual yang siap bantu kamu. Mau tahu lebih tentang kami, lihat produk, atau langsung mulai konsultasi?`,
            `Hai${name}! 😊 Saya Nara dari **KINARYALOKA Digital Studio**.\n\nAda yang bisa saya bantu hari ini? Info produk, harga, sampai konsultasi paket — saya siap!`,
            `Halo${name}! ✨ Selamat datang di KINARYALOKA!\n\nSaya Nara, asisten virtual di sini. Yuk, saya bantu cari solusi digital terbaik untuk bisnis kamu!`,
          ]),
          { chips: MAIN_CHIPS },
        ),
      ]

    case 'about':
      return [
        makeBot(
          `**KINARYALOKA Digital Studio** adalah studio digital yang lahir untuk membantu UMKM menerjemahkan bisnis mereka ke sistem digital yang rapi dan fungsional.\n\nKami tidak cuma bikin yang kelihatan bagus — kami benar-benar duduk bareng kamu, pelajari bisnis kamu, lalu bangun sistem yang beneran kepakai sehari-hari.\n\n*"Website bukan tujuan akhir, tapi alat agar bisnis jadi lebih rapi dan bisa berkembang."*`,
          { chips: ['Nilai-nilai kami', 'Proses kerja', 'Lihat produk', 'Detail lebih lanjut'], nav: [{ label: 'Baca selengkapnya', sectionId: 'tentang' }] },
        ),
      ]

    case 'values':
      return [
        makeBot(
          `4 nilai utama yang jadi fondasi KINARYALOKA:\n\n${KB.company.values.map((v) => `• ${v}`).join('\n')}`,
          { chips: ['Detail lebih lanjut', 'Lihat produk', 'Mulai konsultasi'], nav: [{ label: 'Section Tentang', sectionId: 'tentang' }] },
        ),
      ]

    case 'process':
      return [
        makeBot(
          `Proses kerja kami simpel dan transparan:\n\n${KB.process.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\nKami tidak langsung nawarin paket di awal — kami dengerin bisnis kamu dulu, baru rekomendasiin yang paling masuk akal.`,
          { chips: ['Detail lebih lanjut', 'Mulai konsultasi', 'Hubungi via WA'] },
        ),
      ]

    case 'commitment':
      return [
        makeBot(
          `Komitmen kami ke setiap klien:\n\n${KB.company.commitment.map((c) => `✓ ${c}`).join('\n')}\n\nKami partner jangka panjang, bukan vendor yang pergi setelah project selesai.`,
          { chips: ['Detail lebih lanjut', 'Lihat produk', 'Mulai konsultasi'], nav: [{ label: 'Komitmen Kami', sectionId: 'komitmen' }] },
        ),
      ]

    case 'sharia':
      return [
        makeBot(
          `**Kebijakan Syariah KINARYALOKA**\n\n${KB.company.sharia}\n\nIni bagian dari identitas kami sebagai studio digital yang berprinsip. Kami dengan bangga menolak project yang tidak sesuai nilai Islam.`,
          { chips: ['Tentang Kinaryaloka', 'Lihat produk'] },
        ),
      ]

    case 'payment':
      return [
        makeBot(
          `**Metode & Sistem Pembayaran KINARYALOKA:**\n\n💳 **Transfer Bank** — BCA, Mandiri, BNI, BRI\n📱 **E-Wallet** — GoPay, OVO, Dana, QRIS\n\n📋 **Sistem Pembayaran:**\n• **DP 50%** di awal sebelum pengerjaan dimulai\n• **50% pelunasan** setelah project selesai & disetujui\n\nSemua transaksi terdokumentasi rapi dengan invoice resmi. Tidak ada biaya tersembunyi.`,
          { chips: ['Lihat harga paket', 'Mulai konsultasi', 'Hubungi via WA'] },
        ),
      ]

    case 'timeline':
      return [
        makeBot(
          `**Estimasi Waktu Pengerjaan:**\n\n🛒 **E-Commerce**\n• Katalog Digital — 5–7 hari kerja\n• Toko Online — 10–14 hari kerja\n• Olshop Full — 14–21 hari kerja\n• E-Commerce Full Brand — 21–30 hari kerja\n\n🌐 **Web Design**\n• Paket Reservasi — 3–5 hari kerja\n• Website & Reservasi — 7–10 hari kerja\n• Website Pro — 14–21 hari kerja\n\n🎨 **Branding**\n• Paket Branding — 5–7 hari kerja\n• Branding + Copywriting — 7–10 hari kerja\n\nWaktu bisa bervariasi tergantung kompleksitas & kecepatan feedback kamu.`,
          { chips: ['Detail lebih lanjut', 'Lihat harga paket', 'Mulai konsultasi'] },
        ),
      ]

    case 'revision':
      return [
        makeBot(
          `**Kebijakan Revisi KINARYALOKA:**\n\n✏️ Kami percaya hasil akhir harus benar-benar sesuai harapan kamu.\n\n• **Revisi desain** — Hingga puas (sesuai brief awal yang disepakati)\n• **Revisi konten** — 2–3 putaran revisi tergantung paket\n• **Major changes** — Di luar scope awal, didiskusikan bersama secara transparan\n\nKami tidak pergi setelah selesai — komunikasi tetap terbuka.`,
          { chips: ['Lihat paket', 'Mulai konsultasi', 'Hubungi via WA'] },
        ),
      ]

    case 'portfolio':
      return [
        makeBot(
          `Untuk melihat portofolio & hasil kerja kami, tim KINARYALOKA akan mengirimkannya langsung via WhatsApp. 📁\n\nKami punya koleksi project di bidang:\n• E-Commerce & Toko Online\n• Web Design & Sistem Reservasi\n• Branding & Identitas Visual\n\nHubungi kami dan kami kirimkan contoh yang relevan dengan bisnis kamu!`,
          { waLink: `https://wa.me/${KB.company.whatsapp}?text=${encodeURIComponent('Halo KINARYALOKA! Saya ingin melihat portofolio kalian.')}`, chips: ['Mulai konsultasi', 'Lihat produk'] },
        ),
      ]

    case 'team':
      return [
        makeBot(
          `**Tim KINARYALOKA Digital Studio:**\n\n👨‍💻 **Web Developer** — Spesialis React, Next.js & backend systems\n🎨 **UI/UX Designer** — Berpengalaman di Figma, desain brand & visual identity\n✍️ **Copywriter** — Penulis konten marketing & website copy\n📊 **Project Manager** — Koordinasi project & komunikasi klien\n\nKami tim kecil yang solid — setiap project ditangani langsung, tidak di-outsource ke pihak lain.`,
          { chips: ['Tentang Kinaryaloka', 'Proses kerja', 'Hubungi via WA'] },
        ),
      ]

    case 'location':
      return [
        makeBot(
          `KINARYALOKA beroperasi secara **remote-first** 🌐\n\nKami melayani klien dari seluruh Indonesia tanpa batasan lokasi.\n\n📞 **Komunikasi via:**\n• WhatsApp (utama & paling cepat)\n• Video call — Zoom / Google Meet\n• Email\n\nMeski tidak ketemu langsung, kami pastikan komunikasi selalu lancar dan transparan sepanjang project.`,
          { chips: ['Hubungi via WA', 'Proses kerja', 'Mulai konsultasi'] },
        ),
      ]

    case 'after_project':
      return [
        makeBot(
          `**Support Setelah Project Selesai:**\n\nKami tidak menghilang setelah delivery! 💪\n\n• **Bug fixing gratis** — Selama masa support aktif\n• **Support teknis** — Durasi sesuai paket (1–6 bulan)\n• **Konsultasi lanjutan** — Tetap bisa tanya via WhatsApp kapan saja\n• **Update & maintenance** — Bisa didiskusikan untuk kebutuhan jangka panjang\n\nPrinsip kami: partner jangka panjang, bukan vendor satu kali pakai.`,
          { chips: ['Lihat paket', 'Mulai konsultasi', 'Hubungi via WA'] },
        ),
      ]

    case 'product_ecommerce':
      return [
        makeBot(
          `Kami punya **4 paket E-Commerce** yang bisa disesuaikan dengan skala bisnis kamu:`,
          { products: KB.products.ecommerce, chips: ['Mulai konsultasi', 'Lihat Web Design', 'Lihat Branding'], nav: [{ label: 'Lihat di halaman produk', sectionId: 'produk' }] },
        ),
      ]

    case 'product_webdesign':
      return [
        makeBot(
          `Kami punya **4 paket Web Design & Reservasi** — dari booking simpel hingga website multi-halaman profesional:`,
          { products: KB.products.webdesign, chips: ['Mulai konsultasi', 'Lihat E-Commerce', 'Lihat Branding'], nav: [{ label: 'Lihat di halaman produk', sectionId: 'produk' }] },
        ),
      ]

    case 'product_branding':
      return [
        makeBot(
          `Kami punya **3 paket Branding** dari identitas visual dasar hingga solusi end-to-end:`,
          { products: KB.products.branding, chips: ['Mulai konsultasi', 'Lihat E-Commerce', 'Lihat Web Design'], nav: [{ label: 'Lihat di halaman produk', sectionId: 'produk' }] },
        ),
      ]

    case 'product_all':
      return [
        makeBot(
          `KINARYALOKA memiliki **${allProducts.length} paket layanan** dalam **3 kategori**${name}:

🛒 **E-Commerce (${KB.products.ecommerce.length} paket)**
${KB.products.ecommerce.map((p, i) => `${i + 1}. ${p.name}${p.badge ? ' ⭐' : ''} — IDR ${p.price.toLocaleString('id-ID')}K`).join('\n')}

🌐 **Web Design & Reservasi (${KB.products.webdesign.length} paket)**
${KB.products.webdesign.map((p, i) => `${KB.products.ecommerce.length + i + 1}. ${p.name}${p.badge ? ' ⭐' : ''} — IDR ${p.price.toLocaleString('id-ID')}K`).join('\n')}

🎨 **Branding (${KB.products.branding.length} paket)**
${KB.products.branding.map((p, i) => `${KB.products.ecommerce.length + KB.products.webdesign.length + i + 1}. ${p.name}${p.badge ? ' ⭐' : ''} — IDR ${p.price.toLocaleString('id-ID')}K`).join('\n')}

⭐ = Paket Flagship

Mau tahu lebih detail salah satu kategori?`,
          { chips: ['E-Commerce', 'Web Design & Reservasi', 'Branding & Logo', 'Lihat Semua Harga', 'Mulai Konsultasi'], nav: [{ label: 'Lihat semua produk', sectionId: 'produk' }] },
        ),
      ]

    case 'price':
      return [
        makeBot(
          `**Ringkasan Harga KINARYALOKA:**\n\n🛒 **E-Commerce**\n• Katalog Digital — IDR 2.500K\n• Toko Online — IDR 5.000K\n• Olshop Full — IDR 8.000K\n• E-Commerce Full Brand — IDR 15.000K\n\n🌐 **Web Design**\n• Paket Reservasi — IDR 2.500K\n• Website & Reservasi — IDR 5.000K\n• Website Pro — IDR 8.000K\n• Full Digital Package — IDR 12.000K\n\n🎨 **Branding**\n• Paket Branding — IDR 1.500K\n• Branding + Copywriting — IDR 2.500K\n• Complete Branding — IDR 4.000K\n\nSemua harga transparan — tidak ada biaya tersembunyi.`,
          { chips: ['Mulai konsultasi', 'Metode pembayaran', 'Hubungi via WA'], nav: [{ label: 'Lihat detail produk', sectionId: 'produk' }] },
        ),
      ]

    case 'consult':
      setConsult({ step: 'bisnis_type', bisnisType: '', need: '', budget: 0 })
      return [
        makeBot(
          `Senang bisa bantu${name}! Mari mulai konsultasi singkat — hanya 3 pertanyaan. 🎯\n\n**Pertama, bisnis kamu bergerak di bidang apa?**`,
          { chips: ['Kuliner / F&B', 'Fashion & Pakaian', 'Kecantikan & Salon', 'Jasa & Layanan', 'Retail / Toko Fisik', 'Lainnya'] },
        ),
      ]

    case 'history':
      return [
        makeBot(
          `**KINARYALOKA Digital Studio** mulai beroperasi pada **${KB.company.founded}** 🎉

Meski terbilang baru, kami hadir dengan tim berpengalaman dan tekad kuat untuk membantu UMKM Indonesia bertransformasi digital.

Sejak hari pertama, fokus kami satu: membangun sistem digital yang benar-benar bisa dipakai sehari-hari — bukan sekadar tampil bagus di layar.`,
          { chips: ['Tentang Kinaryaloka', 'Lihat Produk', 'Tim Kami', 'Mulai Konsultasi'], nav: [{ label: 'Kenali Kami', sectionId: 'tentang' }] },
        ),
      ]

    case 'nav_tentang': scrollTo('tentang'); return [makeBot(`Scroll ke **Tentang Kami** ya! 👆`, { chips: MAIN_CHIPS })]
    case 'nav_produk': scrollTo('produk'); return [makeBot(`Scroll ke **Produk & Paket** ya! 👆`, { chips: MAIN_CHIPS })]
    case 'nav_komitmen': scrollTo('komitmen'); return [makeBot(`Scroll ke **Komitmen Kami** ya! 👆`, { chips: MAIN_CHIPS })]
    case 'nav_digital': scrollTo('digital'); return [makeBot(`Scroll ke **Mengapa Digital?** ya! 👆`, { chips: MAIN_CHIPS })]

    case 'whatsapp':
      return [
        makeBot(
          `Langsung chat tim kami via WhatsApp — konsultasi gratis 30 menit, tanpa komitmen, tanpa dipaksa beli. 😊`,
          { waLink: `https://wa.me/${KB.company.whatsapp}?text=${encodeURIComponent(KB.company.whatsappMessage)}`, chips: ['Mulai konsultasi', 'Lihat produk'] },
        ),
      ]

    case 'thanks':
      return [
        makeBot(
          pick([
            `Sama-sama${name}! 🙌 Semangat untuk bisnisnya ya! Jangan ragu balik lagi kalau ada pertanyaan.`,
            `Senang bisa bantu${name}! 😊 Sukses terus untuk bisnisnya. Ada yang lain?`,
            `Tentu${name}! 💪 Semangat go digital! Kami di sini kalau butuh apa-apa.`,
          ]),
          { chips: MAIN_CHIPS },
        ),
      ]

    case 'custom': {
      const t = normalize(userText)
      let customLabel = ''
      for (const [key, label] of customIntentResponses) {
        if (t.includes(key)) { customLabel = label; break }
      }
      return [
        makeBot(
          `Ah, kamu bertanya tentang **${customLabel || 'topik ini'}**! 💡\n\nUntuk pertanyaan ini, tim KINARYALOKA siap bantu kamu secara langsung — hubungi kami dan ceritakan kebutuhanmu!`,
          {
            chips: ['Hubungi via WA', 'Mulai Konsultasi', 'Lihat Semua Produk'],
            waLink: `https://wa.me/${KB.company.whatsapp}?text=${encodeURIComponent(`Halo KINARYALOKA! Saya ingin bertanya tentang ${customLabel || 'layanan kalian'}.`)}`,
          },
        ),
      ]
    }

    default: {
      const CLARIFY_BATCH = 4
      const isInClarify = ctx.pendingClarification !== null
      const originalText = isInClarify
        ? ctx.pendingClarification!.originalText
        : userText.trim()
      const offeredIntents: Intent[] = isInClarify
        ? ctx.pendingClarification!.offeredIntents
        : []

      const newLoopCount = updatedCtx.clarifyLoopCount + 1

      // ── After 2 clarification loops, ask user to teach Nara ──
      if (newLoopCount > 2) {
        setCtx({ ...updatedCtx, clarifyLoopCount: newLoopCount, awaitingCustomContext: originalText, pendingClarification: null })
        return [
          makeBot(
            `Saya sudah coba bantu 2 kali tapi belum menemukan yang tepat untuk **\u201c${originalText}\u201d** 😅\n\nBoleh bantu saya belajar? **Ceritain dalam 1–2 kalimat, apa yang kamu maksud dengan itu?** Saya akan simpan dan gunakan untuk menjawab lebih baik ke depannya!`,
            { chips: ['Hubungi via WA', 'Mulai Konsultasi'] },
          ),
        ]
      }

      const remaining = CLARIFICATION_OPTIONS.filter((o) => !offeredIntents.includes(o.intent))
      const batch = remaining.slice(0, CLARIFY_BATCH)

      if (batch.length === 0) {
        setCtx({ ...updatedCtx, pendingClarification: null, clarifyLoopCount: 0 })
        return [
          makeBot(
            `Saya sudah coba semua kemungkinan tapi tidak menemukan yang relevan untuk **\u201c${originalText}\u201d** 🙏\n\nTim kami bisa bantu lebih lanjut secara langsung!`,
            { chips: MAIN_CHIPS, waLink: `https://wa.me/${KB.company.whatsapp}?text=${encodeURIComponent(KB.company.whatsappMessage)}` },
          ),
        ]
      }

      const newOffered: Intent[] = [...offeredIntents, ...batch.map((b) => b.intent)]
      setCtx({ ...updatedCtx, pendingClarification: { originalText, offeredIntents: newOffered }, clarifyLoopCount: newLoopCount })

      const hasMore = remaining.length > CLARIFY_BATCH
      const chips = [...batch.map((b) => b.chip), ...(hasMore ? ['Tidak ada yang cocok'] : [])]

      return [
        makeBot(
          isInClarify
            ? `Masih mencari yang cocok untuk **\u201c${originalText}\u201d**? Mungkin salah satu dari ini?`
            : `Hmm, saya tidak mengenal **\u201c${originalText}\u201d** secara spesifik 🤔\n\nApakah yang kamu maksud salah satu dari berikut ini?`,
          { chips },
        ),
      ]
    }
  }
}

// ─── ProductCard mini ─────────────────────────────────────────────────────
function ProductCard({ p }: { p: (typeof allProducts)[0] }) {
  const tagColor = p.tag === 'ecommerce' ? '#831449' : p.tag === 'webdesign' ? '#004896' : '#207224'
  const tagLabel = p.tag === 'ecommerce' ? 'E-Commerce' : p.tag === 'webdesign' ? 'Web Design' : 'Branding'
  return (
    <motion.div
      className="rounded-xl border border-white/10 bg-white/5 p-3 mt-2"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        <div>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded mr-1" style={{ backgroundColor: tagColor + '30', color: tagColor }}>
            {tagLabel}
          </span>
          {p.badge && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-600/80 text-white">{p.badge}</span>
          )}
          <p className="font-bold text-white text-sm mt-1">{p.name}</p>
        </div>
        <p className="font-bold text-sm whitespace-nowrap" style={{ color: tagColor }}>
          IDR {p.price.toLocaleString('id-ID')}K
        </p>
      </div>
      <p className="text-white/60 text-xs leading-relaxed mb-2">{p.description}</p>
      <ul className="space-y-0.5 mb-2">
        {p.features.slice(0, 3).map((f, i) => (
          <li key={i} className="text-white/50 text-[10px] flex gap-1.5 items-start">
            <span style={{ color: tagColor }}>✓</span> {f}
          </li>
        ))}
        {p.features.length > 3 && (
          <li className="text-white/40 text-[10px]">+{p.features.length - 3} fitur lainnya...</li>
        )}
      </ul>
      <button
        onClick={() => { scrollTo('produk') }}
        className="text-[11px] font-semibold flex items-center gap-1 mt-1"
        style={{ color: tagColor }}
      >
        Lihat detail <ChevronRight className="w-3 h-3" />
      </button>
    </motion.div>
  )
}

// ─── Format bot text (markdown-lite) ─────────────────────────────────────────
function BotText({ text }: { text: string }) {
  const lines = text.split('\n')
  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
        const formatted = line
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
        return formatted ? (
          <p key={i} className="text-white/90 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: formatted }} />
        ) : (
          <br key={i} />
        )
      })}
    </div>
  )
}

// ─── Main Chatbot Component ───────────────────────────────────────────────────
export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    makeBot(
      `Halo! Saya Nara, asisten virtual **KINARYALOKA Digital Studio**.\n\nSaya siap bantu jawab pertanyaan tentang kami, rekomendasiin produk yang cocok, atau mulai konsultasi singkat buat kamu.\n\nYuk, mau mulai dari mana?`,
      { chips: MAIN_CHIPS },
    ),
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [consult, setConsult] = useState<ConsultState>({ step: 'idle', bisnisType: '', need: '', budget: 0 })
  const [convCtx, setConvCtx] = useState<ConvContext>({ userName: '', lastIntent: 'unknown', topicsDiscussed: [], pendingClarification: null, clarifyLoopCount: 0, awaitingCustomContext: null })
  const [hasNew, setHasNew] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  useEffect(() => {
    if (open) {
      setHasNew(false)
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  const handleChip = (chip: string) => {
    // Map chip shortcuts
    const chipMap: Record<string, string> = {
      'Tentang Kinaryaloka': 'tentang kinaryaloka',
      'Lihat Semua Produk': 'semua produk',
      'Mulai Konsultasi': 'konsultasi',
      'Hubungi via WA': 'whatsapp',
      'Konsultasi langsung via WA': 'whatsapp',
      'Lihat semua produk': 'semua produk',
      'Mulai ulang konsultasi': 'konsultasi',
      'E-Commerce': 'ecommerce',
      'Web Design & Reservasi': 'website web design',
      'Branding & Logo': 'branding logo',
      'Lihat produk': 'semua produk',
      'Nilai-nilai kami': 'nilai filosofi',
      'Proses kerja': 'proses kerja',
      'Lihat detail E-Commerce': 'ecommerce',
      'Lihat Web Design': 'website web design',
      'Lihat Branding': 'branding',
      'Detail lebih lanjut': 'lebih lanjut ceritain lebih',
      'Metode pembayaran': 'metode bayar pembayaran',
      'Lihat harga paket': 'harga biaya tarif',
      'Lihat paket': 'semua produk layanan',
      'Lihat paket support': 'semua produk layanan',
    }
    const mapped = chipMap[chip] || chip
    send(chip, mapped)
  }

  const send = (displayText: string, queryText?: string) => {
    const query = queryText || displayText
    const userMsg = makeUser(displayText)
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setTyping(true)

    setTimeout(
      () => {
        setTyping(false)
        const responses = getResponse(query, consult, setConsult, convCtx, setConvCtx)
        setMessages((prev) => [...prev, ...responses])
        if (!open) setHasNew(true)
      },
      500 + Math.random() * 400,
    )
  }

  const handleSend = () => {
    if (!input.trim()) return
    send(input.trim())
  }

  const handleReset = () => {
    setConsult({ step: 'idle', bisnisType: '', need: '', budget: 0 })
    setConvCtx({ userName: '', lastIntent: 'unknown', topicsDiscussed: [], pendingClarification: null, clarifyLoopCount: 0, awaitingCustomContext: null })
    clearDynamicKeywords()
    setMessages([
      makeBot(
        `Halo lagi! 👋 Saya siap bantu dari awal. Mau mulai dari mana?`,
        { chips: MAIN_CHIPS },
      ),
    ])
  }

  const lastMsg = messages[messages.length - 1]

  return (
    <>
      {/* FAB */}
      <div className="fixed bottom-6 left-5 z-[9990]">
        <AnimatePresence>
          {!open && hasNew && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: -10 }}
              className="absolute -top-12 left-0 bg-[#1a1a1a] border border-[#2e2e2e] text-white rounded-xl px-3 py-2 shadow-xl whitespace-nowrap text-xs font-semibold"
            >
              Ada yang bisa kami bantu? 💬
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          onClick={() => setOpen((v) => !v)}
          className="relative w-14 h-14 md:w-16 md:h-16 rounded-full shadow-2xl flex items-center justify-center text-white"
          style={{ backgroundColor: '#1E1E1E' }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Open Chatbot"
        >
          {/* Pulse */}
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: '#1E1E1E' }}
            animate={{ scale: [1, 1.5, 1.5], opacity: [0.4, 0, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
          />
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X className="w-6 h-6" />
              </motion.span>
            ) : (
              <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <img src={naraImg} alt="Nara" className="w-10 h-10 rounded-full object-cover ring-2 ring-white/20" style={{ objectPosition: 'center top' }} />
              </motion.span>
            )}
          </AnimatePresence>
          {/* Badge */}
          {hasNew && !open && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">1</span>
          )}
        </motion.button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            className="fixed bottom-24 left-5 z-[9991] w-[calc(100vw-40px)] max-w-[380px] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            style={{ height: '520px', backgroundColor: '#1E1E1E', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #831449, #5a0e32)' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-tight">Nara</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <p className="text-white/70 text-[10px]">Online · Siap membantu</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={handleReset}
                  className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors"
                  whileTap={{ scale: 0.9 }}
                  title="Reset chat"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </motion.button>
                <motion.button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors"
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 scrollbar-thin">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'bot' ? (
                    <div className="max-w-[92%] space-y-2">
                      {/* Bot avatar + bubble */}
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5" style={{ backgroundColor: '#831449' }}>
                          <MessageCircle className="w-3.5 h-3.5 text-white" />
                        </div>
                        <div className="rounded-2xl rounded-tl-sm px-3 py-2.5 bg-[#1e1e1e] border border-white/5 flex-1">
                          <BotText text={msg.text} />
                        </div>
                      </div>

                      {/* Products */}
                      {msg.products && msg.products.length > 0 && (
                        <div className="ml-8 space-y-1">
                          {msg.products.map((p) => (
                            <ProductCard key={p.id} p={p} />
                          ))}
                        </div>
                      )}

                      {/* Nav shortcuts */}
                      {msg.nav && msg.nav.length > 0 && (
                        <div className="ml-8 flex flex-wrap gap-1.5">
                          {msg.nav.map((n) => (
                            <button
                              key={n.sectionId}
                              onClick={() => scrollTo(n.sectionId)}
                              className="text-[10px] font-semibold flex items-center gap-1 px-2.5 py-1 rounded-full border transition-colors"
                              style={{ borderColor: '#831449', color: '#c9547a' }}
                            >
                              <ExternalLink className="w-2.5 h-2.5" /> {n.label}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* WA link */}
                      {msg.waLink && (
                        <div className="ml-8">
                          <button
                            onClick={() => openWA()}
                            className="text-[11px] font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white"
                            style={{ backgroundColor: '#25D366' }}
                          >
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                            Chat via WhatsApp
                          </button>
                        </div>
                      )}

                      {/* Chips — only on last bot message */}
                      {msg.chips && msg.id === lastMsg.id && (
                        <div className="ml-8 flex flex-wrap gap-1.5 mt-1">
                          {msg.chips.map((chip) => (
                            <motion.button
                              key={chip}
                              onClick={() => handleChip(chip)}
                              className="text-[11px] font-semibold px-2.5 py-1.5 rounded-full border border-white/15 text-white/80 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all whitespace-nowrap"
                              whileTap={{ scale: 0.95 }}
                            >
                              {chip}
                            </motion.button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      className="max-w-[80%] rounded-2xl rounded-tr-sm px-3 py-2.5 text-white text-sm"
                      style={{ background: 'linear-gradient(135deg, #831449, #5a0e32)' }}
                    >
                      {msg.text}
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-start gap-2"
                >
                  <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5" style={{ backgroundColor: '#831449' }}>
                    <MessageCircle className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="rounded-2xl rounded-tl-sm px-3 py-2.5 bg-[#1e1e1e] border border-white/5 flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-white/40"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="flex-shrink-0 p-3 border-t border-white/5">
              <div className="flex gap-2 items-center">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ketik pertanyaanmu..."
                  className="flex-1 bg-[#1e1e1e] border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#831449]/60 transition-colors"
                />
                <motion.button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 disabled:opacity-40 transition-opacity"
                  style={{ backgroundColor: '#831449' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
              <p className="text-white/20 text-[10px] text-center mt-2">KINARYALOKA Digital Studio · Semua info berdasarkan layanan kami</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
