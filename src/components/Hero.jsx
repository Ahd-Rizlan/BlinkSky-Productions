import { motion } from 'framer-motion'
import { ArrowDown, Instagram } from 'lucide-react'

const heroImg =
  'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1920&q=80'

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Background image with cinematic wash */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={heroImg}
          alt="A couple photographed at golden hour by BlinkSky Productions"
          className="h-full w-full object-cover"
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/50 to-ink-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/80 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="container-x relative flex min-h-[100svh] flex-col justify-center pt-28 pb-16">
        <motion.div
          className="mb-6 flex items-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <img
            src="/logo-portrait.png"
            alt="BlinkSky Productions emblem"
            className="h-14 w-14 md:h-16 md:w-16"
            width="64"
            height="64"
          />
          <span className="eyebrow">Photography &amp; Videography Studio</span>
        </motion.div>

        <motion.h1
          className="max-w-4xl font-serif text-5xl leading-[1.02] text-cloud sm:text-6xl md:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          We frame the moments
          <span className="block italic text-champagne">worth keeping.</span>
        </motion.h1>

        <motion.p
          className="mt-8 max-w-xl text-base leading-relaxed text-cloud/70 md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9 }}
        >
          From weddings and bridal portraits to model, commercial and celebration
          shoots — BlinkSky Productions turns fleeting moments into cinematic
          stories you&apos;ll return to for a lifetime.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9 }}
        >
          <a href="#work" className="btn-primary">
            View Our Work
          </a>
          <a href="#instagram" className="btn-ghost">
            <Instagram size={16} /> Follow the Studio
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <a
        href="#services"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-cloud/50 hover:text-champagne transition-colors"
        aria-label="Scroll to content"
      >
        <ArrowDown size={22} />
      </a>
    </section>
  )
}
