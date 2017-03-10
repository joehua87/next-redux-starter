const LRUCache = require('lru-cache')

const dev = process.env.NODE_ENV !== 'production'

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60, // 60 minutes
})

/*
* NB: make sure to modify this to take into account anything that should trigger
* an immediate page change (e.g a locale stored in req.session)
*/
function getCacheKey(req) {
  return `${req.url}`
}

export default app => function renderAndCache(req, res, pagePath, queryParams) {
  const key = getCacheKey(req)

// If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    if (dev) console.log(`CACHE HIT: ${key}`)
    res.send(ssrCache.get(key))
    return
  }

// If not let's render the page into HTML
  app.renderToHTML(req, res, pagePath, queryParams)
    .then((html) => {
    // Let's cache this page
      if (dev) console.log(`CACHE MISS: ${key}`)
      ssrCache.set(key, html)

      res.send(html)
    })
    .catch((err) => {
      app.renderError(err, req, res, pagePath, queryParams)
    })
}
