import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, intro, align = 'left' }) {
  const center = align === 'center'
  return (
    <Reveal className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 className="font-serif text-4xl leading-tight text-cloud sm:text-5xl">
        {title}
      </h2>
      {intro && <p className="mt-5 text-cloud/65 leading-relaxed">{intro}</p>}
    </Reveal>
  )
}
