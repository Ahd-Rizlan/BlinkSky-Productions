import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'

const links = [
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#instagram', label: 'Instagram' },
  { href: '#about', label: 'About' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-smooth ${
        scrolled
          ? 'bg-ink-950/80 backdrop-blur-md border-b border-ink-700/60 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="container-x flex items-center justify-between">
        <Logo size={scrolled ? 'sm' : 'md'} />

        <div className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-sm text-cloud/80 transition-colors duration-300 hover:text-cloud
                         after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-champagne
                         after:transition-all after:duration-300 hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
          <a href="#quote" className="btn-primary">
            Get Quote
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-600 text-cloud md:hidden cursor-pointer"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-500 ease-smooth ${
          open ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="container-x flex flex-col gap-1 pt-4 pb-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-cloud/85 transition-colors hover:bg-ink-800 hover:text-cloud"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#quote"
            onClick={() => setOpen(false)}
            className="btn-primary mt-2 w-full"
          >
            Get Quote
          </a>
        </div>
      </div>
    </header>
  )
}
