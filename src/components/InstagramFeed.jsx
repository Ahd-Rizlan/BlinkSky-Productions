import { Instagram, ExternalLink, Play } from 'lucide-react'
import { useInstagramFeed } from '../hooks/useInstagramFeed'
import SectionHeading from './SectionHeading'
import Watermark from './Watermark'
import Reveal from './Reveal'
import { studio } from '../data/socials'

const IG_HANDLE = studio.instagramHandle
const IG_URL = studio.instagram

export default function InstagramFeed() {
  const { posts, status } = useInstagramFeed()

  return (
    <section id="instagram" className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Straight From The Studio"
            title="Latest on Instagram"
            intro="Fresh frames as we post them. Follow along for behind-the-scenes, reels and new releases."
          />
          <Reveal delay={0.1}>
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost whitespace-nowrap"
            >
              <Instagram size={16} /> @{IG_HANDLE}
            </a>
          </Reveal>
        </div>

        <div className="mt-12 columns-2 gap-3 sm:columns-3 md:gap-4 lg:columns-4 [column-fill:_balance]">
          {(status === 'loading' ? Array.from({ length: 12 }) : posts).map(
            (post, i) => {
              if (!post) {
                return (
                  <div
                    key={i}
                    className="shimmer mb-3 break-inside-avoid rounded-lg md:mb-4"
                    style={{ height: [180, 240, 200, 280][i % 4] }}
                    aria-hidden="true"
                  />
                )
              }
              // Videos & reels return a still cover in thumbnail_url.
              const isVideo =
                post.media_type === 'VIDEO' ||
                post.media_type === 'REELS' ||
                post.media_product_type === 'REELS'
              const img = post.thumbnail_url || post.media_url
              return (
                <a
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative mb-3 block break-inside-avoid overflow-hidden rounded-lg bg-ink-800 md:mb-4"
                  aria-label={
                    (isVideo ? 'Play video — ' : '') +
                    (post.caption?.slice(0, 60) || 'View on Instagram')
                  }
                >
                  <img
                    src={img}
                    alt={post.caption?.slice(0, 80) || 'Instagram post'}
                    loading="lazy"
                    decoding="async"
                    className="block w-full h-auto transition-transform duration-700 ease-smooth group-hover:scale-105"
                  />

                  <Watermark size="sm" />

                  {/* Persistent play badge for videos / reels */}
                  {isVideo && (
                    <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-ink-950/70 text-cloud backdrop-blur-sm">
                      <Play size={14} fill="currentColor" />
                    </span>
                  )}

                  <div className="absolute inset-0 flex items-center justify-center bg-ink-950/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {isVideo ? (
                      <Play className="text-cloud" size={26} fill="currentColor" />
                    ) : (
                      <Instagram className="text-cloud" size={22} />
                    )}
                  </div>
                </a>
              )
            },
          )}
        </div>

        {status === 'fallback' && (
          <p className="mt-6 flex items-center gap-2 text-xs text-cloud/40">
            <ExternalLink size={13} />
            Showing sample images. Connect the Instagram Graph API (see README) to
            display live posts from @{IG_HANDLE}.
          </p>
        )}
      </div>
    </section>
  )
}
