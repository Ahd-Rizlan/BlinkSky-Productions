import { useState } from 'react'
import { Mail, Phone, MapPin, Instagram, Facebook, Check } from 'lucide-react'
import TikTok from './icons/TikTok'
import Reveal from './Reveal'
import { services } from '../data/services'
import { studio as STUDIO, whatsappLink } from '../data/socials'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    service: services[0].title,
    message: '',
  })

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    // No backend required: compose a pre-filled email to the studio.
    const subject = encodeURIComponent(`Shoot enquiry — ${form.service}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nService: ${form.service}\n\n${form.message}`,
    )
    window.location.href = `mailto:${STUDIO.email}?subject=${subject}&body=${body}`
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  const inputBase =
    'w-full rounded-xl border border-ink-600 bg-ink-900/60 px-4 py-3 text-cloud placeholder:text-cloud/35 ' +
    'transition-colors duration-300 focus:border-champagne focus:outline-none focus:ring-1 focus:ring-champagne'

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Left: pitch + details */}
        <div>
          <Reveal>
            <p className="eyebrow mb-4">Let&apos;s Create</p>
            <h2 className="font-serif text-4xl leading-tight text-cloud sm:text-5xl">
              Have a moment worth keeping? Let&apos;s talk.
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-cloud/65">
              Tell us about your shoot — the date, the vibe, the story you want to
              tell. We&apos;ll get back within 24 hours with availability and a
              tailored quote.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-10 space-y-5">
              <li>
                <a
                  href={`mailto:${STUDIO.email}`}
                  className="group flex items-center gap-4 text-cloud/80 hover:text-champagne transition-colors"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-600 group-hover:border-champagne">
                    <Mail size={18} />
                  </span>
                  {STUDIO.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${STUDIO.phone.replace(/\s/g, '')}`}
                  className="group flex items-center gap-4 text-cloud/80 hover:text-champagne transition-colors"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-600 group-hover:border-champagne">
                    <Phone size={18} />
                  </span>
                  {STUDIO.phone}
                </a>
              </li>
              <li className="flex items-center gap-4 text-cloud/80">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-600">
                  <MapPin size={18} />
                </span>
                {STUDIO.location}
              </li>
              <li>
                <a
                  href={STUDIO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 text-cloud/80 hover:text-champagne transition-colors"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-600 group-hover:border-champagne">
                    <Instagram size={18} />
                  </span>
                  @{STUDIO.instagramHandle}
                </a>
              </li>
              <li>
                <a
                  href={STUDIO.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 text-cloud/80 hover:text-champagne transition-colors"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-600 group-hover:border-champagne">
                    <Facebook size={18} />
                  </span>
                  BlinkSky Productions
                </a>
              </li>
              <li>
                <a
                  href={STUDIO.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 text-cloud/80 hover:text-champagne transition-colors"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-600 group-hover:border-champagne">
                    <TikTok size={18} />
                  </span>
                  @blinkskyproduction
                </a>
              </li>
            </ul>
          </Reveal>
        </div>

        {/* Right: form */}
        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-ink-700 bg-ink-900/50 p-6 sm:p-8"
          >
            <div className="grid gap-5">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm text-cloud/70">
                  Your name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={update('name')}
                  placeholder="Jane Perera"
                  className={inputBase}
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm text-cloud/70">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={update('email')}
                  placeholder="you@email.com"
                  className={inputBase}
                />
              </div>
              <div>
                <label
                  htmlFor="service"
                  className="mb-2 block text-sm text-cloud/70"
                >
                  What are you after?
                </label>
                <select
                  id="service"
                  value={form.service}
                  onChange={update('service')}
                  className={inputBase}
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.title} className="bg-ink-900">
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm text-cloud/70"
                >
                  Tell us about it
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  value={form.message}
                  onChange={update('message')}
                  placeholder="Date, location, and the story you want to capture…"
                  className={`${inputBase} resize-none`}
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                {sent ? (
                  <>
                    <Check size={16} /> Opening your email…
                  </>
                ) : (
                  'Get a Customised Quote'
                )}
              </button>

              <a
                href={whatsappLink(
                  `Hi BlinkSky! I'd like a customised quote for a ${form.service}.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full
                           border border-[#25D366]/60 px-7 py-3 text-sm font-medium text-[#25D366]
                           transition-colors duration-300 hover:bg-[#25D366] hover:text-ink-950 cursor-pointer"
              >
                Quote me on WhatsApp — fastest reply
              </a>
              <p className="text-center text-xs text-cloud/40">
                This opens your email app pre-filled. Prefer a live form? Wire it to
                Formspree or a serverless function (see README).
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
