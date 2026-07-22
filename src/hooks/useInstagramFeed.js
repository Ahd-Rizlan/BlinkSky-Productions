import { useEffect, useState } from 'react'
import { categorise } from '../data/instagramCategories'

/**
 * useInstagramFeed, fetches recent media from the Instagram Graph API.
 *
 * SETUP (see README.md "Instagram Graph API" section for full walkthrough):
 *   1. Convert the IG account to a Business/Creator account and link it to a
 *      Facebook Page.
 *   2. Create a Meta app, add the "Instagram Graph API" product, and generate a
 *      long-lived access token + your IG user id.
 *   3. Put them in a `.env` file at the project root:
 *          VITE_IG_ACCESS_TOKEN=your_long_lived_token
 *          VITE_IG_USER_ID=1784xxxxxxxxxxx
 *   4. Restart `npm run dev`.
 *
 * If no token is present (or the request fails), the hook returns
 * `usingFallback: true` and the component shows curated placeholder tiles so the
 * section never looks broken.
 *
 * SECURITY NOTE: a token embedded in a VITE_ variable ships to the browser.
 * That is acceptable for a low-risk, read-only display token, but the more
 * robust production pattern is a tiny serverless proxy (see README) that keeps
 * the token server-side. This hook supports both: point VITE_IG_PROXY_URL at
 * your proxy and it will be used instead of calling Graph API directly.
 */

const FIELDS = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp'
const LIMIT = 12

const FALLBACK = [
  'photo-1519741497674-611481863552',
  'photo-1524504388940-b1c1722653e1',
  'photo-1595777457583-95e059d581b8',
  'photo-1511285560929-80b456fea0bc',
  'photo-1488161628813-04466f872be2',
  'photo-1523275335684-37898b6baf30',
  'photo-1465495976277-4387d4b0b4c6',
  'photo-1594552072238-b8a33785b261',
  'photo-1483985988355-763728e1935b',
  'photo-1470784789206-3d76d4b5dae0',
  'photo-1530103862676-de8c9debad1d',
  'photo-1519689680058-324335c77eba',
].map((id, i) => ({
  id: `fallback-${i}`,
  media_type: 'IMAGE',
  media_url: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=80`,
  permalink: 'https://instagram.com/',
  // Sample captions carry hashtags so the category filter is demonstrable
  // before the real API is connected.
  caption: [
    'Wedding day #wedding',
    'Studio session #model',
    'Getting ready #bridal',
    'The vows #wedding',
    'Street portrait #model',
    'Brand campaign #commercial',
    'Engagement evening #wedding',
    'Veil and light #bridal',
    'Fashion movement #model',
    'The send off #film #cinematic',
    'Golden hour party #birthday',
    'Ceremony #comingofage',
  ][i],
}))

/**
 * Instagram returns no category field, so we derive one from each caption
 * (see src/data/instagramCategories.js). Every post gets `category` and
 * `categoryLabel` attached here, once, so the UI can just filter on it.
 */
function withCategories(list) {
  return list.map((p) => {
    const c = categorise(p.caption, p.media_type)
    return { ...p, category: c.id, categoryLabel: c.label }
  })
}

export function useInstagramFeed() {
  const [posts, setPosts] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | fallback

  useEffect(() => {
    const token = import.meta.env.VITE_IG_ACCESS_TOKEN
    const userId = import.meta.env.VITE_IG_USER_ID
    const proxy = import.meta.env.VITE_IG_PROXY_URL

    const controller = new AbortController()

    async function load() {
      // Prefer a server-side proxy if configured.
      const url = proxy
        ? `${proxy}?limit=${LIMIT}`
        : token && userId
          ? `https://graph.instagram.com/${userId}/media?fields=${FIELDS}&limit=${LIMIT}&access_token=${token}`
          : null

      if (!url) {
        setPosts(withCategories(FALLBACK))
        setStatus('fallback')
        return
      }

      try {
        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) throw new Error(`IG ${res.status}`)
        const json = await res.json()
        const data = (json.data || []).filter(
          (m) => m.media_type !== 'VIDEO' || m.thumbnail_url,
        )
        if (!data.length) throw new Error('no media')
        setPosts(withCategories(data))
        setStatus('ready')
      } catch (err) {
        if (err.name === 'AbortError') return
        console.warn('[Instagram] falling back to placeholders:', err.message)
        setPosts(withCategories(FALLBACK))
        setStatus('fallback')
      }
    }

    load()
    return () => controller.abort()
  }, [])

  return { posts, status }
}
