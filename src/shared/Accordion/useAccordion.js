import { ref, onMounted, onBeforeUnmount } from 'vue'
import useGsap from "@/_internals/composables/useGsap";

import './Accordion.scss'

export default function useAccordion(el) {
  const { gsap } = useGsap()

  const isOpen = ref(false)
  const trigger = ref(null)
  const target  = ref(null)
  let onClick, onTransitionEnd

  function handleOpen(e) {
    const fullH = target.value.scrollHeight
    gsap.to(target.value, {
      height: fullH,
      duration: 0.3,
      ease: 'power1.out',
      onStart() {
        el.value.classList.add('open')
      },
      onComplete() {
        target.value.style.height = 'auto'
      }
    })
  }

  function handleClose(e) {
    gsap.to(target.value, {
      height: 0,
      duration: 0.3,
      ease: 'power1.in',
      onComplete() {
        el.value.classList.remove('open')
      }
    })
  }

  function handleToggleClick(e) {
    e.preventDefault()

    if (isOpen.value) {
      handleClose(e)
    } else {
      handleOpen(e)
    }
    isOpen.value = !isOpen.value
  }

  function attachEventsOnMounted() {
    const drop = el.value
    if (!drop) return

    trigger.value = drop.querySelector('[data-trigger]')
    target.value  = drop.querySelector('[data-target]')

    if (!trigger.value || !target.value) {
      return
    }

    isOpen.value = false
    detachEvents()
    onClick = e => handleToggleClick(e)
    trigger.value.addEventListener('click', onClick)
}

  function detachEvents() {
    if (trigger.value && onClick) {
      trigger.value.removeEventListener('click', onClick)
    }
    if (target.value && onTransitionEnd) {
      target.value.removeEventListener('transitionend', onTransitionEnd)
    }
  }

  onBeforeUnmount(detachEvents)

  return {
    isOpen,
    trigger,
    target,
    attachEventsOnMounted
  }
}