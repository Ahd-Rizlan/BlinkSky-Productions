/**
 * Subtle BlinkSky watermark laid over gallery imagery so the brand travels with
 * every screenshot and share.
 *
 * NOTE: this is a display overlay. It appears in screenshots and screen
 * recordings, but it is NOT baked into the source file — someone who
 * right-clicks "Save image" gets the clean original. To protect the files
 * themselves the watermark has to be burned into the images before upload.
 */
export default function Watermark({ size = 'md', position = 'br' }) {
  const sizes = {
    sm: 'h-4 md:h-5',
    md: 'h-5 md:h-7',
    lg: 'h-8 md:h-10',
  }
  const positions = {
    br: 'bottom-2 right-2 md:bottom-3 md:right-3',
    bl: 'bottom-2 left-2 md:bottom-3 md:left-3',
    center: 'inset-0 flex items-center justify-center',
  }

  return (
    <span
      className={`pointer-events-none absolute z-10 ${positions[position]}`}
      aria-hidden="true"
    >
      <img
        src="/logo-landscape.png"
        alt=""
        className={`w-auto opacity-50 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] ${sizes[size]}`}
        loading="lazy"
      />
    </span>
  )
}
