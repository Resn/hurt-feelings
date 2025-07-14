import { ref, onMounted, onBeforeUnmount } from 'vue'

export default function useMenuTrigger(el) {
  const trigger = ref(null)
  const target  = ref(null)
  let onHoverIn, onHoverOut

  function hoverIn(e) {
    if (!target.value) return
    target.value.classList.add('js-hover')
  }

  function hoverOut(e) {
    if (!target.value) return
    target.value.classList.remove('js-hover')
  }

  function attachEventsOnMounted() {
    trigger.value = el.value
    if (!trigger.value) return

    target.value = document.querySelector('[data-menu-fake-trigger]')

    if (!trigger.value || !target.value) {
      return
    }

    detachEvents()
    onHoverIn = e => hoverIn(e)
    trigger.value.addEventListener('mouseenter', onHoverIn)
    onHoverOut = e => hoverOut(e)
    trigger.value.addEventListener('mouseleave', onHoverOut)
  }

  function detachEvents() {
    if (!trigger.value) return

    if (onHoverIn) {
      trigger.value.removeEventListener('mouseenter', onHoverIn)
    }

    if (onHoverOut) {
      trigger.value.removeEventListener('mouseleave', onHoverOut)
    }
  }

  onBeforeUnmount(detachEvents)

  return {
    trigger,
    target,
    attachEventsOnMounted
  }
}