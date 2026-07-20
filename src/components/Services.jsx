import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { services } from '../data/services'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

/**
 * Interactive services showcase.
 *
 * Desktop: an editorial list on the left; hovering (or keyboard-focusing) a row
 * cross-fades that service's photograph and copy into the panel on the right —
 * so the section shows the work rather than just describing it.
 *
 * Mobile: the same list behaves as an accordion — tapping a row expands its
 * image and copy inline.
 */
export default function Services() {
  const [active, setActive] = useState(services[0].id)
  const [openMobile, setOpenMobile] = useState(null)

  const current = services.find((s) => s.id === active) ?? services[0]

  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="What We Shoot"
          title="Every milestone deserves a frame."
          intro="One studio, many stories. Hover a service to see the work — whatever the occasion, we bring the same cinematic craft to every frame."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* ── The list ──────────────────────────────────────────────── */}
          <Reveal>
            <ul className="border-t border-ink-700">
              {services.map((s, i) => {
                const Icon = s.icon
                const isActive = active === s.id
                const isOpen = openMobile === s.id

                return (
                  <li key={s.id} className="border-b border-ink-700">
                    <button
                      type="button"
                      onMouseEnter={() => setActive(s.id)}
                      onFocus={() => setActive(s.id)}
                      onClick={() => {
                        setActive(s.id)
                        setOpenMobile(isOpen ? null : s.id)
                      }}
                      aria-expanded={isOpen}
                      className="group flex w-full items-center gap-4 py-5 text-left transition-colors
                                 duration-300 ease-smooth cursor-pointer focus-visible:outline-none
                                 focus-visible:ring-2 focus-visible:ring-champagne md:py-6"
                    >
                      <span
                        className={`font-sans text-xs tabular-nums transition-colors duration-300 ${
                          isActive ? 'text-champagne' : 'text-cloud/35'
                        }`}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>

                      <Icon
                        size={20}
                        strokeWidth={1.5}
                        className={`shrink-0 transition-colors duration-300 ${
                          isActive ? 'text-champagne' : 'text-cloud/45'
                        }`}
                      />

                      <span
                        className={`flex-1 font-serif text-2xl transition-all duration-300 ease-smooth
                                    md:text-3xl lg:group-hover:translate-x-1 ${
                                      isActive ? 'text-champagne' : 'text-cloud'
                                    }`}
                      >
                        {s.title}
                      </span>

                      <ArrowUpRight
                        size={20}
                        className={`shrink-0 transition-all duration-300 ${
                          isActive
                            ? 'text-champagne opacity-100'
                            : 'text-cloud/30 opacity-0 lg:group-hover:opacity-100'
                        }`}
                      />
                    </button>

                    {/* Mobile accordion body */}
                    <div
                      className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-smooth lg:hidden ${
                        isOpen ? 'max-h-[36rem] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="pb-6">
                        <div className="overflow-hidden rounded-xl">
                          <img
                            src={s.image}
                            alt={s.title}
                            loading="lazy"
                            className="aspect-[4/3] w-full object-cover"
                          />
                        </div>
                        <p className="mt-4 text-sm leading-relaxed text-cloud/65">
                          {s.blurb}
                        </p>
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {s.tags.map((t) => (
                            <li
                              key={t}
                              className="rounded-full border border-ink-600 px-3 py-1 text-xs text-cloud/55"
                            >
                              {t}
                            </li>
                          ))}
                        </ul>
                        <a href="#contact" className="btn-primary mt-5 w-full">
                          Enquire about this
                        </a>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </Reveal>

          {/* ── The preview panel (desktop) ───────────────────────────── */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink-800">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={current.id}
                    src={current.image}
                    alt={current.title}
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-transparent" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    className="absolute inset-x-0 bottom-0 p-7"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h3 className="font-serif text-3xl text-cloud">
                      {current.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-cloud/75">
                      {current.blurb}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {current.tags.map((t) => (
                        <li
                          key={t}
                          className="rounded-full border border-cloud/25 bg-ink-950/40 px-3 py-1 text-xs text-cloud/80 backdrop-blur-sm"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>

              <a href="#contact" className="btn-primary mt-5 w-full">
                Get a Customised Quote
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
