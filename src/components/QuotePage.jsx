import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Mail, Send, X } from 'lucide-react'
import { services } from '../data/services'
import { quoteGroups, stepGroups, budgets } from '../data/quoteOptions'
import { studio, whatsappLink } from '../data/socials'

const TOTAL = 4
const STEP_TITLES = {
  1: 'What are we shooting?',
  2: 'Tell us the shape of it',
  3: 'What do you want delivered?',
  4: 'Where do we send the quote?',
}

/** Pill selector used for both single- and multi-select groups. */
function Pills({ group, value, onChange }) {
  const multi = group.type === 'multi'
  const selected = multi ? value ?? [] : value

  const toggle = (opt) => {
    if (!multi) return onChange(opt)
    const set = new Set(selected)
    set.has(opt) ? set.delete(opt) : set.add(opt)
    onChange([...set])
  }

  const isOn = (opt) => (multi ? selected.includes(opt) : selected === opt)

  return (
    <fieldset className="mb-8">
      <legend className="mb-1 font-serif text-xl text-cloud">{group.label}</legend>
      {group.hint && <p className="mb-4 text-sm text-cloud/50">{group.hint}</p>}
      <div className="flex flex-wrap gap-2.5">
        {group.options.map((opt) => (
          <button
            key={opt}
            type="button"
            role={multi ? 'checkbox' : 'radio'}
            aria-checked={isOn(opt)}
            onClick={() => toggle(opt)}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm
                        transition-all duration-300 ease-smooth cursor-pointer
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne ${
                          isOn(opt)
                            ? 'border-champagne bg-champagne text-ink-950 font-medium'
                            : 'border-ink-600 text-cloud/75 hover:border-champagne/60 hover:text-cloud'
                        }`}
          >
            {isOn(opt) && <Check size={14} />}
            {opt}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

export default function QuotePage() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState({
    shootType: '',
    coverage: '',
    team: '',
    location: '',
    deliverables: [],
    addOns: [],
    budget: '',
    date: '',
    name: '',
    email: '',
    phone: '',
    notes: '',
  })
  const headingRef = useRef(null)

  // Start at the top, and move focus to the heading on each step so keyboard
  // and screen-reader users aren't left at the bottom of the previous step.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    headingRef.current?.focus()
  }, [step])

  const set = (k, v) => setData((d) => ({ ...d, [k]: v }))

  const canContinue =
    step === 1
      ? !!data.shootType
      : step === 2
        ? !!data.coverage && !!data.team && !!data.location
        : step === 3
          ? data.deliverables.length > 0
          : !!data.name && !!data.email

  const summary = () => {
    const L = [
      `Shoot type: ${data.shootType}`,
      `Coverage: ${data.coverage}`,
      `Team: ${data.team}`,
      `Location: ${data.location}`,
      `Deliverables: ${data.deliverables.join(', ') || '-'}`,
      `Add-ons: ${data.addOns.join(', ') || 'None'}`,
      data.budget && `Budget: ${data.budget}`,
      data.date && `Preferred date: ${data.date}`,
      '',
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      data.phone && `Phone: ${data.phone}`,
      data.notes && `Notes: ${data.notes}`,
    ].filter(Boolean)
    return L.join('\n')
  }

  const sendEmail = () => {
    const subject = encodeURIComponent(`Quote request, ${data.shootType}`)
    const body = encodeURIComponent(
      `Hi BlinkSky,\n\nI'd like a quote for the following:\n\n${summary()}\n`,
    )
    window.location.href = `mailto:${studio.email}?subject=${subject}&body=${body}`
  }

  const goHome = () => {
    window.location.hash = ''
  }

  return (
    <div className="min-h-screen bg-ink-950">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-ink-700 bg-ink-950/90 backdrop-blur-md">
        <div className="container-x flex items-center justify-between py-4">
          <a href="#" onClick={goHome} aria-label="Back to BlinkSky Productions">
            <img src="/logo-landscape.png" alt="BlinkSky Productions" className="h-10 w-auto md:h-12" />
          </a>
          <button
            type="button"
            onClick={goHome}
            className="flex items-center gap-2 rounded-full border border-ink-600 px-4 py-2 text-sm
                       text-cloud/75 transition-colors hover:border-champagne hover:text-champagne cursor-pointer"
          >
            <X size={16} /> Close
          </button>
        </div>

        {/* Progress */}
        <div className="container-x pb-4">
          <div
            className="flex items-center gap-2"
            role="progressbar"
            aria-valuenow={step}
            aria-valuemin={1}
            aria-valuemax={TOTAL}
            aria-label={`Step ${step} of ${TOTAL}`}
          >
            {Array.from({ length: TOTAL }, (_, i) => (
              <span
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                  i < step ? 'bg-champagne' : 'bg-ink-700'
                }`}
              />
            ))}
          </div>
          <p className="mt-2 text-xs uppercase tracking-widest2 text-cloud/45">
            Step {step} of {TOTAL}
          </p>
        </div>
      </header>

      {/* Body */}
      <main className="container-x py-10 md:py-14">
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="font-serif text-3xl leading-tight text-cloud outline-none sm:text-4xl md:text-5xl"
        >
          {STEP_TITLES[step]}
        </h1>
        <p className="mt-3 max-w-xl text-cloud/60">
          No obligation, this just helps us price it accurately. Takes about a
          minute.
        </p>

        <div className="mt-10 max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Step 1, shoot type */}
              {step === 1 && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {services.map((s) => {
                    const on = data.shootType === s.title
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => set('shootType', s.title)}
                        aria-pressed={on}
                        className={`group relative aspect-[4/3] overflow-hidden rounded-xl ring-1
                                    transition-all duration-300 cursor-pointer
                                    focus-visible:outline-none focus-visible:ring-2 ${
                                      on
                                        ? 'ring-2 ring-champagne'
                                        : 'ring-ink-700 hover:ring-champagne/60'
                                    }`}
                      >
                        <img
                          src={s.image}
                          alt=""
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
                        {on && (
                          <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-champagne text-ink-950">
                            <Check size={14} />
                          </span>
                        )}
                        <span className="absolute inset-x-0 bottom-0 p-3 text-left font-serif text-base leading-tight text-cloud">
                          {s.title}
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}

              {/* Steps 2 & 3, option groups */}
              {(step === 2 || step === 3) &&
                stepGroups[step].map((key) => (
                  <Pills
                    key={key}
                    group={quoteGroups[key]}
                    value={data[key]}
                    onChange={(v) => set(key, v)}
                  />
                ))}

              {/* Step 3 extras */}
              {step === 3 && (
                <>
                  <Pills
                    group={{ label: 'Rough budget?', hint: 'Optional, helps us tailor the options.', type: 'single', options: budgets }}
                    value={data.budget}
                    onChange={(v) => set('budget', v)}
                  />
                  <div className="mb-2 max-w-xs">
                    <label htmlFor="date" className="mb-2 block text-sm text-cloud/70">
                      Preferred date (optional)
                    </label>
                    <input
                      id="date"
                      type="date"
                      value={data.date}
                      onChange={(e) => set('date', e.target.value)}
                      className="w-full rounded-xl border border-ink-600 bg-ink-900/60 px-4 py-3 text-cloud
                                 focus:border-champagne focus:outline-none focus:ring-1 focus:ring-champagne"
                    />
                  </div>
                </>
              )}

              {/* Step 4, details + review */}
              {step === 4 && (
                <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
                  <div className="grid gap-5">
                    {[
                      { id: 'name', label: 'Your name', type: 'text', req: true, ph: 'Jane Perera' },
                      { id: 'email', label: 'Email', type: 'email', req: true, ph: 'you@email.com' },
                      { id: 'phone', label: 'Phone / WhatsApp', type: 'tel', req: false, ph: '+94 77 123 4567' },
                    ].map((f) => (
                      <div key={f.id}>
                        <label htmlFor={f.id} className="mb-2 block text-sm text-cloud/70">
                          {f.label} {f.req && <span className="text-champagne">*</span>}
                        </label>
                        <input
                          id={f.id}
                          type={f.type}
                          required={f.req}
                          value={data[f.id]}
                          placeholder={f.ph}
                          onChange={(e) => set(f.id, e.target.value)}
                          className="w-full rounded-xl border border-ink-600 bg-ink-900/60 px-4 py-3 text-cloud
                                     placeholder:text-cloud/35 focus:border-champagne focus:outline-none
                                     focus:ring-1 focus:ring-champagne"
                        />
                      </div>
                    ))}
                    <div>
                      <label htmlFor="notes" className="mb-2 block text-sm text-cloud/70">
                        Anything else we should know?
                      </label>
                      <textarea
                        id="notes"
                        rows={4}
                        value={data.notes}
                        placeholder="Venue, guest count, the mood you're after…"
                        onChange={(e) => set('notes', e.target.value)}
                        className="w-full resize-none rounded-xl border border-ink-600 bg-ink-900/60 px-4 py-3
                                   text-cloud placeholder:text-cloud/35 focus:border-champagne
                                   focus:outline-none focus:ring-1 focus:ring-champagne"
                      />
                    </div>
                  </div>

                  {/* Review */}
                  <aside className="rounded-2xl border border-ink-700 bg-ink-900/50 p-6">
                    <h2 className="font-serif text-xl text-cloud">Your request</h2>
                    <dl className="mt-4 space-y-3 text-sm">
                      {[
                        ['Shoot', data.shootType],
                        ['Coverage', data.coverage],
                        ['Team', data.team],
                        ['Location', data.location],
                        ['Deliverables', data.deliverables.join(', ')],
                        ['Add-ons', data.addOns.join(', ') || 'None'],
                        ['Budget', data.budget],
                        ['Date', data.date],
                      ]
                        .filter(([, v]) => v)
                        .map(([k, v]) => (
                          <div key={k} className="flex gap-3">
                            <dt className="w-28 shrink-0 text-cloud/45">{k}</dt>
                            <dd className="text-cloud/85">{v}</dd>
                          </div>
                        ))}
                    </dl>

                    <div className="mt-6 grid gap-3">
                      <a
                        href={whatsappLink(
                          `Hi BlinkSky! I'd like a quote:\n\n${summary()}`,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-disabled={!canContinue}
                        onClick={(e) => !canContinue && e.preventDefault()}
                        className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3
                                    text-sm font-semibold transition-all duration-300 ${
                                      canContinue
                                        ? 'bg-[#25D366] text-ink-950 hover:brightness-110 cursor-pointer'
                                        : 'bg-ink-700 text-cloud/40 cursor-not-allowed'
                                    }`}
                      >
                        <Send size={16} /> Send on WhatsApp
                      </a>
                      <button
                        type="button"
                        onClick={sendEmail}
                        disabled={!canContinue}
                        className="btn-ghost w-full disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Mail size={16} /> Send by email
                      </button>
                      {!canContinue && (
                        <p className="text-center text-xs text-cloud/45">
                          Add your name and email to send.
                        </p>
                      )}
                    </div>
                  </aside>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Wizard nav */}
        <div className="mt-12 flex max-w-3xl items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => (step === 1 ? goHome() : setStep((s) => s - 1))}
            className="btn-ghost"
          >
            <ArrowLeft size={16} /> {step === 1 ? 'Back to site' : 'Back'}
          </button>

          {step < TOTAL && (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              disabled={!canContinue}
              className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue <ArrowRight size={16} />
            </button>
          )}
        </div>
      </main>
    </div>
  )
}
