export const ANIM_CONSTS = {
  time2at60fps: 2 / 60,
  time5at60fps: 5 / 60,
  time10at60fps: 10 / 60,
  time30at60fps: 30 / 60,
  time20at60fps: 20 / 60,
  time40at60fps: 40 / 60,
}


const mobileDevice = (navigator.maxTouchPoints || 'ontouchstart' in document.documentElement);
const spring = {
  desktop:{ decel: 0.64, accel: 0.3, maxSpeed: 0.5 },  //0.64
  mobile: { decel: 0.54, accel: 0.3, maxSpeed: 1000.0 }, //0.64
}
 export const springConfig = mobileDevice ? spring.mobile : spring.desktop
