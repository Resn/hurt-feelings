import { gsap } from 'gsap'

import { CSSRulePlugin } from 'gsap/CSSRulePlugin'
import { CustomEase } from 'gsap/CustomEase'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'

import env from '@/_internals/config/env'

export const useGsap = function () {
  if (!env.isSSR) {
    gsap.registerPlugin(
      CustomEase,
      ScrollSmoother,
      CSSRulePlugin,
      SplitText,
      ScrollTrigger,
      ScrollToPlugin,
      DrawSVGPlugin
    )

    gsap.defaults({ ease: 'linear' })
  }

  return {
    gsap,
    CustomEase,
    ScrollSmoother,
    CSSRulePlugin,
    SplitText,
    ScrollTrigger,
    ScrollToPlugin,
  }
}

export default useGsap
