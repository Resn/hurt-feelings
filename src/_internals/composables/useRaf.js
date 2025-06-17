import { onMounted, onUnmounted } from 'vue'
import Raf from '@components/_internals/helpers/Raf'

export const useRaf = function (func, order = -1) {
  onMounted(() => {
    Raf.add(func, order)
  })

  onUnmounted(() => {
    Raf.remove(func)
  })
}

export default useRaf
