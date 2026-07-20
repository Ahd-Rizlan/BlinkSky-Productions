// Landscape wordmark used in the header and footer.
// Files live in /public: logo-landscape.png (wide) and logo-portrait.png (square).
export default function Logo({ className = '' }) {
  return (
    <a
      href="#top"
      className={`inline-flex items-center ${className}`}
      aria-label="BlinkSky Productions — home"
    >
      <img
        src="/logo-landscape.png"
        alt="BlinkSky Productions"
        className="h-9 w-auto md:h-10"
        width="240"
        height="96"
      />
    </a>
  )
}
