import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { portfolio, categories } from '../data/portfolio'
import SectionHeading from './SectionHeading'
import SmartImage from './SmartImage'
import Watermark from './Watermark'
import Lightbox from './Lightbox'

const spanClasses = {
  tall: 'row-span-2',
  wide: 'sm:col-span-2',
}

export default function Portfolio() {
  const [filter, setFilter] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const items = useMemo(
    () =>
      filter === 'all'
        ? portfolio
        : portfolio.filter((p) => p.category === filter),
    [filter],
  )

  const navLightbox = (dir) =>
    setLightboxIndex((i) => (i + dir + items.length) % items.length)

  return (
    <section id="work" className="relative py-24 md:py-32 bg-ink-900/40">
      <div className="container-x">
        <SectionHeading
          eyebrow="Selected Work"
          title="A gallery of frames we're proud of."
          intro="A living portfolio across every kind of shoot. Filter by category, and tap any frame to view it full-size."
        />

        {/* Filter pills — a swipeable snap row on phones so they never wrap into
            a cramped block; normal wrapping from sm up. 44px touch targets. */}
        <div
          className="-mx-6 mt-10 flex snap-x gap-2.5 overflow-x-auto px-6 pb-1
                     [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                     sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        >
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              aria-pressed={filter === c.id}
              className={`min-h-[44px] shrink-0 snap-start rounded-full px-5 text-sm
                          transition-all duration-300 ease-smooth cursor-pointer active:scale-95 ${
                            filter === c.id
                              ? 'bg-champagne text-ink-950 font-medium'
                              : 'border border-ink-600 text-cloud/70 hover:border-champagne/50 hover:text-cloud'
                          }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Masonry-ish grid */}
        <motion.div
          layout
          className="mt-10 grid auto-rows-[220px] grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <motion.button
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setLightboxIndex(i)}
                className={`group relative overflow-hidden rounded-xl cursor-pointer transition-transform active:scale-[0.97] ${
                  spanClasses[item.span] || ''
                }`}
                aria-label={`Open ${item.title}`}
              >
                <SmartImage
                  src={item.src}
                  alt={item.title}
                  className="transition-transform duration-700 ease-smooth group-hover:scale-105"
                />
                <Watermark size="sm" />
                {/* On touch there is no hover, so the title/gradient stay
                    visible by default and only hide-until-hover from md up. */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-transparent to-transparent transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 transition-all duration-300 md:p-4 md:opacity-0 md:group-hover:opacity-100">
                  <span className="font-serif text-base leading-tight text-cloud md:text-lg">
                    {item.title}
                  </span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-champagne text-ink-950">
                    <Plus size={16} />
                  </span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Lightbox
        items={items}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNav={navLightbox}
      />
    </section>
  )
}
