const skipAds = () => {
  const btn = document.querySelector(
    '.ytp-ad-skip-button',
  )

  if (!btn) return
  btn.click()
}

window.addEventListener('load', () => {
  console.info('loaded')
  setInterval(skipAds, 1000)
})

let lastUrl = location.href
new MutationObserver(() => {
  const url = location.href
  if (url !== lastUrl) {
    lastUrl = url
    setInterval(skipAds, 1000)
  }
}).observe(document, { subtree: true, childList: true })
