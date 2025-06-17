const supportsWebp = async () => {
  return new Promise(resolve => {
    // 1x1 webp with alpha
    const data =
      'UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA=='

    const img = new Image()

    img.onload = function () {
      const result = img.width > 0 && img.height > 0
      resolve(result)
    }

    img.onerror = function () {
      resolve(false)
    }

    img.src = `data:image/webp;base64,${data}`
  })
}

let webp

const hasWindow = typeof window !== 'undefined'
const isSSR = !hasWindow // import.meta.env.SSR
const isClient = typeof window !== 'undefined'

const ua = hasWindow ? window.navigator.userAgent : ''
const href = hasWindow ? window.location.href : ''
const queryString = hasWindow ? window.location.search : ''
const winSafari = hasWindow ? window.safari : false
const vendor = hasWindow ? navigator.vendor : ''
const platform = hasWindow ? navigator.platform : ''
const maxTouchPoints = hasWindow ? navigator.maxTouchPoints : 0

const ua_lc = ua.toLowerCase()

const urlParams = new URLSearchParams(queryString)

const mac = ua_lc.includes('mac')
const windows = ua_lc.includes('windows')

const safari = /apple/i.test(vendor) || winSafari // / safari/.test(ua_lc) && !ua_lc.includes('chrome')
const firefox = /firefox/.test(ua_lc)
const edge = /edge\/\d+/.test(ua)
const ie11 = ua_lc.includes('trident') && ua.includes('rv:11')

const iphone = /(iphone|ipod)/.test(ua_lc)
const ipad =
  /(ipad)/.test(ua_lc) ||
  platform === 'iPad' ||
  (!iphone && /MacIntel/.test(platform) && maxTouchPoints > 0)
//
const ios = iphone || ipad
const android = /(android)/.test(ua_lc)

const tablet = ipad || /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua_lc)
const mobile = ios || tablet || android
const desktop = !mobile
const phone = mobile && !tablet

const learnMobile = mobile && !tablet

const desktop_safari = !ios && safari && !maxTouchPoints

const messenger = /fban\/messengerforios/.test(ua_lc) || /fb_iab\/messenger/.test(ua_lc)

let facebook_video_ad = false
if (hasWindow) {
  const facebook_video_ad_urlparam = window?.location.href.includes('fbvideo')
  const el_vh = document.createElement('div')
  el_vh.style.cssText = `position: absolute;
                    pointer-events:none;
                    top:0px;
                    width:1px;
                    height:100vh;`
  document.body.appendChild(el_vh)
  const vh = el_vh.clientHeight
  facebook_video_ad = ios
    ? facebook_video_ad_urlparam && window?.screen.height - vh < 30
    : facebook_video_ad_urlparam && window?.screen.height - window?.innerHeight < 30
  document.body.removeChild(el_vh)
}

const facebook = /(fban|fbav)/.test(ua_lc) && !messenger && !facebook_video_ad

const instagram = /instagram/.test(ua_lc)
const wechat = /micromessenger/.test(ua_lc)
const weibo = /weibo/.test(ua_lc)
const ucbrowser = /ucbrowser/.test(ua_lc)
const samsung = /samsung/.test(ua_lc)

const other_ios_browsers = /(crios|fxios|opios|mercury|ucbrowser|fbav|fban|instagram)/.test(ua_lc)
const other_android_browsers = /(opera|ucbrowser|samsung|fbav|fban|instagram)/.test(ua_lc)

const ios_safari = ios && !other_ios_browsers
const ios_chrome = ios && /crios/.test(ua_lc)

const android_chrome = android && !other_android_browsers && /chrome/.test(ua_lc) && !messenger

const desktop_chrome = desktop && /Chrome/.test(ua) && /Google Inc/.test(vendor) && !/Edg/.test(ua)
const desktop_edge = desktop && /Chrome/.test(ua) && /Google Inc/.test(vendor) && /Edg/.test(ua)

const localhost = import.meta.env.VITE_IS_LOCALHOST === 'true'

// const pixelRatioMax = desktop ? 1.3 : 2
// const pixelRatio = hasWindow ? Math.min(window.devicePixelRatio || 1, pixelRatioMax) : 1

const init = async function () {
  webp = await supportsWebp()
  return webp
}

const env = {
  hasWindow,
  window: hasWindow ? window : {},
  isSSR,
  isClient,

  mobile,
  tablet,
  desktop,
  phone,

  mac,
  windows,

  href,
  queryString,
  urlParams,

  ios,
  iphone,
  ipad,
  android,

  learnMobile,

  facebook_video_ad,
  facebook,
  messenger,
  instagram,

  wechat,
  weibo,
  ucbrowser,
  samsung,

  edge,
  ie11,
  safari,
  ios_safari,
  ios_chrome,
  desktop_safari,
  desktop_chrome,
  desktop_edge,
  webp: () => webp,
  android_chrome,
  firefox,

  init,
  localhost,
}

const setDeviceClasses = () => {
  if (!hasWindow) {
    return
  }
  const html = isSSR ? null : document.querySelector('html')
  const mapN = {
    // desktop: 'deviceDesktop',
    // tablet: 'deviceTablet',
    // phone: 'devicePhone',
  }
  for (const n in env) {
    if (html && env[n] === true) {
      html.classList.add(mapN[n] || n)
    }
  }
}

setDeviceClasses()
export default env
