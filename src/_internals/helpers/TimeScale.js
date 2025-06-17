export function clamp(n, min = 0, max = 1) {
  if (n < min) {
    return min
  }
  if (n > max) {
    return max
  }
  return n
}

export class TimeScale {
  current=0 // seconds
  previous=0 // seconds
  delta=1/60 // seconds
  baseDelta=1/60 // seconds
  get deltaScale(){
    const delta = clamp(this.delta, 0.000001,10000000)
    return clamp(delta/this.baseDelta, 0.1, 4.0) // allow 10fps to 240fps
  } // allow 30fps to 240fps

  get inverseDeltaScale() {
    return 1/this.deltaScale
  }

  processTimeStep =()=>{
    this.current = performance.now() * 0.001
    this.delta = clamp(this.current-this.previous, 0.0, 0.1)// min 10fps, no max FPS
    this.previous = this.current
  }
}