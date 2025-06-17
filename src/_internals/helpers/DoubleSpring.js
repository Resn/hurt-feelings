export function clamp(n, min = 0, max = 1) {
  if (n < min) {
    return min
  }
  if (n > max) {
    return max
  }
  return n
}

const defaultConfig = { decel :0.4, accel:0.06, maxSpeed:0.2 }
export class Spring {
  to = 0
  current = 0
  velocity = 0
  config = null

  constructor(config=defaultConfig) {
    this.config = config
  }

  set(to) {
    to = to === undefined ? this.to : to
    this.to = this.current = to
    this.velocity = 0
  }

  update(to) {
    this.to = to
    return this.process()
  }

  process() {
    // disabled deltaScale due to stuttering issues on Android
    const deltaScale = 1 // this.timeScale.inverseDeltaScale

    const C = this.config
    const accelNormalised =clamp(C.accel * deltaScale, 0, 1)
    const decelNormalised = 1 -clamp(C.decel * deltaScale, 0, 0.95)// cant go to 1 decel(no velocity)
    const dist = this.to - this.current
    this.velocity += dist * accelNormalised
    this.velocity *= decelNormalised
    this.velocity = clamp(this.velocity, 0 - C.maxSpeed, C.maxSpeed)
    this.current += this.velocity

    return this.current
  }
}

export class DoubleSpring {
  to = 0
  current = 0
  config1 = null
  config2 = null
  constructor(config1=defaultConfig, config2=defaultConfig) {
    this.config1 = config1
    this.config2 = config2
    this.s1 = new Spring(config1)
    this.s2 = new Spring(config2)
  }

  set(to) {
    to = to === undefined ? this.to : to
    this.s1.set(to)
    this.s2.set(to)
    this.to = this.current = to
  }

  update(to) {
    this.to = to
    return this.process()
  }

  process() {
    this.current = this.s2.update(this.s1.update(this.to))
    return this.current
  }
}
