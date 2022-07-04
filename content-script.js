const skipAds = () => {
  const btn = document.querySelector(
    '.ytp-ad-skip-button',
  )

  if (!btn) return
  btn.click()
}

window.addEventListener('load', () => {
  skipAds()
  setTimeout(skipAds, 250)
  setTimeout(skipAds, 500)
})

let lastUrl = location.href
new MutationObserver(() => {
  const url = location.href
  if (url !== lastUrl) {
    lastUrl = url
    setTimeout(skipAds, 250)
    setTimeout(skipAds, 500)
    setTimeout(skipAds, 750)
    setTimeout(skipAds, 1000)
  }
}).observe(document, { subtree: true, childList: true })
