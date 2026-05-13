import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Monitor, Palette, Zap, ShieldCheck, ChevronDown } from 'lucide-react'

const valueCards = [
  {
    icon: Monitor,
    title: ['Tepat', 'Sasaran.'],
    description: 'Kami tidak akan jual fitur sebanyak-banyaknya. Kami pelajari bisnis kamu dulu, baru bikin sistemnya.',
    gradient: 'linear-gradient(137deg, #FF3D77 0%, #FFB1CE 45%, #FF9D3C 100%)',
    image: '/Assets/tepatsasaran.png',
    delay: 0.1,
  },
  {
    icon: Palette,
    title: ['Partner,', 'Bukan Vendor.'],
    description: 'Kami tidak pergi setelah project selesai. Support dan komunikasi tetap berjalan.',
    gradient: 'linear-gradient(137deg, #FFFFFF 0%, #7DD3FC 45%, #06B6D4 100%)',
    image: '/Assets/partner_vendor.png',
    delay: 0.2,
  },
  {
    icon: Zap,
    title: ['Langsung', 'Kepakai.'],
    description: 'Semua yang kami bangun dirancang agar bisa dipakai sehari-hari, tanpa perlu teknikal tinggi.',
    gradient: 'linear-gradient(137deg, #4361EE 0%, #E0AEFF 45%, #F72585 100%)',
    image: '/Assets/langsungkepakai.png',
    delay: 0.3,
  },
  {
    icon: ShieldCheck,
    title: ['Transparan', '& Jelas.'],
    description: 'Harga jelas, progress jelas, hasil jelas. Tidak ada biaya tersembunyi ataupun janji kosong.',
    gradient: 'linear-gradient(137deg, #22c55e 0%, #86efac 45%, #14532d 100%)',
    image: '/Assets/harga_jelas.png',
    delay: 0.2,
  },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  return (
    <section id="tentang" className="bg-black py-12 md:py-20 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10" ref={ref}>
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left - 4 Value Cards in 2x2 Grid */}
          <div className="grid grid-cols-2 gap-4 md:gap-5 w-full">
            {valueCards.map((card, index) => (
              <motion.div
                key={card.title.join(' ')}
                className="relative flex flex-col justify-start items-start w-full group"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: 'easeOut', delay: card.delay }}
              >
                {/* Glow Background */}
                <div
                  className="absolute inset-0 opacity-60 rounded-[32px] pointer-events-none"
                  style={{
                    background: card.gradient,
                    filter: 'blur(45px)',
                  }}
                />

                {/* Foreground Card with Gradient Border */}
                <div
                  className="relative self-stretch rounded-[32px] z-10 w-full overflow-hidden"
                  style={{
                    minHeight: 300,
                    border: '6px solid transparent',
                    background: `linear-gradient(#1A1A1C, #1A1A1C) padding-box, ${card.gradient} border-box`,
                  }}
                >
                  {/* Image panel */}
                  <div
                    className="relative overflow-hidden"
                    style={{ height: 148, backgroundColor: '#000', margin: '6px 6px 0 6px', borderRadius: '16px' }}
                  >
                    <motion.img
                      src={card.image}
                      alt={card.title.join(' ')}
                      className="absolute inset-0 w-full h-full object-cover"
                      draggable={false}
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.65, delay: 0.18 + card.delay, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>

                  {/* Floating circular icon */}
                  <div className="px-4 relative z-10" style={{ marginTop: -16 }}>
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center border border-white/25"
                      style={{
                        background: 'rgba(0,0,0,0.50)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
                      }}
                    >
                      <card.icon size={16} strokeWidth={2.5} className="text-white" />
                    </div>
                  </div>

                  {/* Text + Button */}
                  <div className="px-4 pb-4 pt-2 flex flex-col">
                    <h3 className="text-white font-bold text-[15px] sm:text-[17px] leading-tight mb-1.5">
                      {card.title.map((line, i) => (
                        <span key={i} className="block">{line}</span>
                      ))}
                    </h3>

                    {/* Expandable description */}
                    <AnimatePresence initial={false}>
                      {expandedCard === index && (
                        <motion.div
                          key="desc"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="text-gray-400 text-[11px] leading-[1.6] font-normal selection:bg-white/20 pb-2">
                            {card.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Toggle button */}
                    <div className="mt-2">
                      <motion.button
                        onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                        className="w-full h-9 rounded-xl flex items-center justify-between px-3 overflow-hidden relative"
                        style={{
                          background: expandedCard === index
                            ? 'rgba(255,255,255,0.18)'
                            : 'rgba(255,255,255,0.08)',
                          border: '1px solid rgba(255,255,255,0.18)',
                          backdropFilter: 'blur(8px)',
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.18 }}
                      >
                        {/* Shine sweep */}
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          initial={{ x: '-100%', opacity: 0 }}
                          whileHover={{ x: '100%', opacity: 1 }}
                          transition={{ duration: 0.5, ease: 'easeInOut' }}
                          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)' }}
                        />
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.span
                            key={expandedCard === index ? 'close' : 'open'}
                            className="text-white text-[10px] sm:text-[11px] font-semibold tracking-wide relative z-10"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.18 }}
                          >
                            {expandedCard === index ? 'Dimengerti.' : 'Maksudnya?'}
                          </motion.span>
                        </AnimatePresence>
                        <motion.span
                          animate={{ rotate: expandedCard === index ? 180 : 0 }}
                          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                          className="inline-flex relative z-10 flex-shrink-0"
                        >
                          <ChevronDown className="w-3.5 h-3.5 text-white/70" />
                        </motion.span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right - Content */}
          <motion.div
            className="text-white space-y-5 md:space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Main Title */}
            <h2 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-bold leading-[1.1]">
              <span className="block">Bukan Agency Biasa.</span>
              <span className="block">Partner yang Ngerti</span>
              <span className="block">Bisnis Kamu.</span>
            </h2>
            
            {/* Description paragraphs */}
            <div className="space-y-3 md:space-y-4 text-white text-[14px] sm:text-[16px] md:text-[18px] leading-[1.5] text-justify">
              <p>
                KINARYALOKA Digital Studio lahir dari pemahaman satu hal: kebanyakan UMKM bukan tidak mau digital, tetapi mereka tidak tahu mulai dari mana, atau sudah coba tapi hasilnya tidak kepakai.
              </p>
              <p>
                Kami tidak duduk di balik layar dan desain sesuatu yang kelihatan bagus di portofolio. Kami duduk bareng kamu untuk mempelajari cara bisnis kamu berjalan di lapangan, lalu bantu terjemahkannya ke sistem digital yang rapi, jelas, dan bisa dikontrol.
              </p>
            </div>

            {/* Quote Section */}
            <div className="flex gap-3 md:gap-4 mt-4 md:mt-8">
              <div className="w-[5px] md:w-[7px] bg-[#898989] rounded-full flex-shrink-0" />
              <div className="space-y-2">
                <p className="text-white text-[18px] sm:text-[22px] md:text-[28px] leading-[1.2] font-bold text-right">
                  "Website itu bukan tujuan akhir, tapi alat biar operasional jadi lebih rapi dan jelas."
                </p>
                <p className="text-white text-[14px] sm:text-[16px] md:text-[18px] font-bold text-right">
                  — KINARYALOKA Digital Studio
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
