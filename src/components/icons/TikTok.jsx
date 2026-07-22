// TikTok glyph, lucide-react doesn't ship brand icons, so we inline it.
export default function TikTok({ size = 18, className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.5 3c.3 2.1 1.5 3.4 3.5 3.6v2.3c-1.2.1-2.3-.2-3.5-.8v5.9c0 3.5-2.6 5.9-5.9 5.9-3 0-5.4-2.2-5.4-5.2 0-3.2 2.6-5.3 6.1-5v2.5c-.5 0-1 .1-1.5.3-1.1.4-1.8 1.3-1.7 2.4.1 1.3 1.1 2.1 2.4 2.1 1.5 0 2.6-1.1 2.6-2.8V3h2.9z" />
    </svg>
  )
}
