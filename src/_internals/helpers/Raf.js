class Raf {
  constructor() {
    this.running = false
    this.rafId = null
    this._fns = []
    this._prevElapsed = 0
  }

  _update = elapsed => {
    const delta = elapsed - this._prevElapsed
    this._prevElapsed = elapsed

    let i = this._fns.length
    while (i--) {
      let fn = this._fns[i]
      if (fn) this._fns[i]({ elapsed, delta })
    }
    this.rafId = window.requestAnimationFrame(this._update)
  }

  _updateWithStats = elapsed => {
    const delta = elapsed - this._prevElapsed
    this._prevElapsed = elapsed

    this.stats.begin()
    let L = this._fns.length
    //first to last - using order system
    for (let i = 0; i < L; i++) {
      let fn = this._fns[i]
      if (fn) this._fns[i]({ elapsed, delta })
    }
    this.stats.end()
    if (typeof window !== "undefined") {
      this.rafId = window.requestAnimationFrame(this._updateWithStats)
    }
  }

  start = () => {
    if (this.running) return
    this.running = true
    this.rafId = typeof window === "undefined" ? 0 : window.requestAnimationFrame(this._update)
  }

  async startWithStats() {
    const Stats = await import('stats.js')

    this.stats = new Stats.default()
    this.stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
    this.stats.dom.id = 'stats'
    document.querySelector('html').appendChild(this.stats.dom)

    if (this.running) return
    this.running = true
    this.rafId = window.requestAnimationFrame(this._updateWithStats)
  }

  stop = () => {
    window.cancelAnimationFrame(this.rafId)
    this.running = false
  }

  //order will dictate triggered order, lower number triggered before higher number
  //test code:
  // Raf.add(()=>{console.log('raf 2')}, 2)
  // Raf.add(()=>{console.log('raf 5')}, 5)
  // Raf.add(()=>{console.log('raf 4')}, 4)
  // Raf.add(()=>{console.log('raf 1')}, 1)
  // Raf.add(()=>{console.log('raf 3')}, 3)
  //will output: 1 2 3 4 5
  add = (fn, order = -1) => {
    if (typeof fn === 'function') {
      if (this._fns.indexOf(fn) >= 0) return false
      this._fns.push(fn)

      //only sort if not using default order (default order is last in queue)
      fn._callback_order = order === -1 ? 1000000 : order
      if (order > -1) {
        this._fns.sort((a, b) => {
          return a._callback_order - b._callback_order
        })
      }
      return true
    } else {
      return false
    }
  }

  remove = fn => {
    const idx = this._fns.indexOf(fn)
    if (idx >= 0) this._fns.splice(idx, 1)
  }
}

const raf = new Raf()
export default raf
