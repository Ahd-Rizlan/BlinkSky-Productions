import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Lightbox({ items, index, onClose, onNav }) {
  const open = index !== null && index >= 0
  const item = open ? items[index] : null

  const handleKey = useCallback(
    (e) => {
      if (!open) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNav(1)
      if (e.key === 'ArrowLeft') onNav(-1)
    },
    [open, onClose, onNav],
  )

  useEffect(() => {
    if (!open) return
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [open, handleKey])

  return createPortal(
    <AnimatePresence>
      {open && item && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950/95 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={item.title || 'Image preview'}
        >
          <button
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-ink-600 text-cloud/80 hover:text-champagne hover:border-champagne cursor-pointer"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} />
          </button>

          <button
            className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full border border-ink-600 text-cloud/80 hover:text-champagne hover:border-champagne cursor-pointer md:left-8"
            onClick={(e) => {
              e.stopPropagation()
              onNav(-1)
            }}
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          <motion.figure
            key={item.id}
            className="max-h-[85vh] max-w-5xl"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={item.src}
              alt={item.title || ''}
              className="max-h-[78vh] w-auto rounded-lg object-contain"
            />
            {item.title && (
              <figcaption className="mt-4 text-center font-serif text-lg text-cloud/80">
                {item.title}
              </figcaption>
            )}
          </motion.figure>

          <button
            className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full border border-ink-600 text-cloud/80 hover:text-champagne hover:border-champagne cursor-pointer md:right-8"
            onClick={(e) => {
              e.stopPropagation()
              onNav(1)
            }}
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
