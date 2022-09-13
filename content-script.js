const skipAds = () => {
  const btn = document.querySelector(
    '.ytp-ad-skip-button',
  )

  if (btn) {
    btn.click()
    return
  }

  const text = document.querySelector(
    '.ytp-ad-text',
  )

  if (text) {
    location.reload()
  }
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
