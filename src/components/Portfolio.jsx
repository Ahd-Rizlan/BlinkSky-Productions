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

        {/* Filter pills */}
        <div className="mt-10 flex flex-wrap gap-2.5">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={`rounded-full px-5 py-2 text-sm transition-all duration-300 ease-smooth cursor-pointer ${
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
                className={`group relative overflow-hidden rounded-xl cursor-pointer ${
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
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <span className="font-serif text-lg text-cloud">
                    {item.title}
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-champagne text-ink-950">
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
