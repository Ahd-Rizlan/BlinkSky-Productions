import { services } from '../data/services'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="What We Shoot"
          title="Every milestone deserves a frame."
          intro="One studio, many stories. Whatever the occasion, we bring the same cinematic craft to every frame."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <Reveal key={s.id} delay={(i % 4) * 0.08}>
                <article
                  className="group h-full rounded-2xl border border-ink-700 bg-ink-900/60 p-7
                             transition-all duration-400 ease-smooth hover:-translate-y-1
                             hover:border-champagne/40 hover:bg-ink-800"
                >
                  <span
                    className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl
                               border border-ink-600 text-champagne transition-colors duration-400
                               group-hover:border-champagne/50 group-hover:bg-champagne/10"
                  >
                    <Icon size={22} strokeWidth={1.5} />
                  </span>
                  <h3 className="font-serif text-2xl text-cloud">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cloud/60">
                    {s.blurb}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-ink-600 px-3 py-1 text-xs text-cloud/50"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
