import Reveal from './Reveal'
import SmartImage from './SmartImage'

const stats = [
  { value: '8+', label: 'Years Behind the Lens' },
  { value: '500+', label: 'Shoots Delivered' },
  { value: '120+', label: 'Weddings Filmed' },
  { value: '100%', label: 'Moments, Never Staged' },
]

const aboutImg =
  'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=1000&q=80'

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 bg-ink-900/40">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <SmartImage
              src={aboutImg}
              alt="A BlinkSky Productions photographer at work"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 hidden rounded-2xl border border-champagne/30 bg-ink-950/90 p-5 backdrop-blur sm:block">
            <img
              src="/logo-portrait.png"
              alt="BlinkSky Productions"
              className="h-20 w-20"
              width="80"
              height="80"
            />
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="eyebrow mb-4">The Studio</p>
            <h2 className="font-serif text-4xl leading-tight text-cloud sm:text-5xl">
              We don&apos;t just take photos, we keep time.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 leading-relaxed text-cloud/65">
              BlinkSky Productions is a photography and videography studio built on
              a simple belief: the best images feel like memories, not poses. We
              blend documentary instinct with cinematic craft, reading the light,
              the room and the people in it, so every frame carries the feeling of
              the moment it came from.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 leading-relaxed text-cloud/65">
              From intimate bridal portraits to full-scale commercial productions,
              our team brings the same obsessive care to the details that others
              overlook. Big day or quiet milestone, we&apos;re there to make it
              last.
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.1 + i * 0.06}>
                <div>
                  <p className="font-serif text-4xl text-champagne">{s.value}</p>
                  <p className="mt-1 text-xs leading-snug text-cloud/55">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
