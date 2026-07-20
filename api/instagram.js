// Optional serverless proxy (Vercel / Netlify Functions style).
// Keeps your Instagram access token OFF the client. Deploy this, then set
// VITE_IG_PROXY_URL=/api/instagram in your .env.
//
// Server-side env vars needed (set them in your host's dashboard, NOT with the
// VITE_ prefix so they never reach the browser):
//   IG_ACCESS_TOKEN=<long-lived token>
//   IG_USER_ID=<instagram business user id>

export default async function handler(req, res) {
  const token = process.env.IG_ACCESS_TOKEN
  const userId = process.env.IG_USER_ID
  const limit = Number(req.query?.limit) || 12

  if (!token || !userId) {
    res.status(500).json({ error: 'Instagram credentials not configured' })
    return
  }

  const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp'
  const url = `https://graph.instagram.com/${userId}/media?fields=${fields}&limit=${limit}&access_token=${token}`

  try {
    const r = await fetch(url)
    if (!r.ok) throw new Error(`Graph API ${r.status}`)
    const json = await r.json()
    // Cache at the edge for 10 min so we don't hammer the API.
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=1200')
    res.status(200).json({ data: json.data || [] })
  } catch (err) {
    res.status(502).json({ error: err.message })
  }
}
