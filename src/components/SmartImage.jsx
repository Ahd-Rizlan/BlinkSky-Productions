import { useState } from 'react'

/** Image with shimmer skeleton until loaded + lazy loading. */
export default function SmartImage({ src, alt, className = '', eager = false }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className={`relative h-full w-full ${loaded ? '' : 'shimmer'}`}>
      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
      />
    </div>
  )
}
