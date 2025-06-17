import EventEmitter from "@components/_internals/helpers/EventEmitter.js";
import { breakpoints, BREAKPOINTS } from './config.js'

export const EVENTS = {
  currentBreakpoint:'currentBreakpoint', // see BREAKPOINTS
  useMobileComponent:'currentBreakpoint', // boolean
  resize:'resize', // {width, height}
  portrait:'portrait' // boolean
}

/**
 * ResizeService
 * (singleton)
 * use to detect changing css-breakpoint and mobile-component-swap
 *
 * eg:
 *
 * resizeService.on(resizeService.EVENTS.useMobileComponent, (v)=>{
 *   useMobileComponent.value = v
 * }
 *
 * resizeService.on(resizeService.EVENTS.resize, ({width, height})=>{
 *   //  own resize update logic
 *   showTabletDesktop.value = resizeService.breakpoint_tablet_desktop
 * }
 *
 * -----------------------------------------------------------------------
 *
 * !! remove events on unmount/destroy
 *  resizeService.off(resizeService.EVENTS.resize, myOnResizeFunc)
 *
 *  or
 *
 *  let sub = resizeService.subscribe(resizeService.EVENTS.resize, myOnResizeFunc))
 *  ...
 *  sub?.() // removes subscription
 *
 */


/*
allow SSR
 */

const hasWindow = typeof window !== "undefined"

class ResizeService {
  EVENTS = EVENTS
  breakpoints = breakpoints
  rafId = -1

  //properties are evented
  viewport = {
    width:0,
    height:0
  }

  _currentBreakpoint = BREAKPOINTS.mobile
  _useMobileComponent = true
  _portrait = true

  constructor(){
    Object.assign(this , EventEmitter)
    hasWindow && this.update(true)
    hasWindow && this.onRaf()
  }

  // currentBreakpoint eventing
  set currentBreakpoint(v){
    this.set('_currentBreakpoint', v, EVENTS.currentBreakpoint)
  }

  get currentBreakpoint(){
    return this._currentBreakpoint
  }

  // useMobileComponent eventing
  set useMobileComponent(v){
    this.set('_useMobileComponent', v, EVENTS.useMobileComponent)
  }

  get useMobileComponent(){
    return this._useMobileComponent
  }

  // portrait eventing
  set portrait(v){
    this.set('_portrait', v, EVENTS.portrait)
  }

  get portrait(){
    return this._portrait
  }


  //-----align with breakpoint query logic in CSS--------------------
  // components/src/styles/shared/mixins/breakpoints.scss
  get breakpoint_tablet_desktop(){
    return [
      BREAKPOINTS.desktop,
      BREAKPOINTS.tablet_landscape,
      BREAKPOINTS.tablet_portrait
    ].includes( this.currentBreakpoint)
  }

  get breakpoint_desktop(){
    return BREAKPOINTS.desktop  === this.currentBreakpoint
  }

  get breakpoint_tablet(){
    return [
      BREAKPOINTS.tablet_landscape,
      BREAKPOINTS.tablet_portrait
    ].includes( this.currentBreakpoint)
  }

  get breakpoint_tablet_landscape_desktop(){
    return [
      BREAKPOINTS.tablet_landscape,
      BREAKPOINTS.desktop,
    ].includes( this.currentBreakpoint)
  }

  get breakpoint_tablet_landscape(){
    return BREAKPOINTS.tablet_landscape === this.currentBreakpoint
  }

  get breakpoint_tablet_portrait(){
    return BREAKPOINTS.tablet_portrait === this.currentBreakpoint
  }

  get breakpoint_mobile(){
    return BREAKPOINTS.mobile === this.currentBreakpoint
  }
  //-----END align with breakpoint query logic in CSS--------------------

  testBreakPoint(){
    const { width, height } = this.viewport
    if (width <= breakpoints.tablet_portrait.maxWidth){
      this.currentBreakpoint = BREAKPOINTS.mobile

    } else if(width < breakpoints.tablet_portrait.maxWidth) {
      this.currentBreakpoint = BREAKPOINTS.tablet_portrait

    } else if(width < breakpoints.tablet_landscape.maxWidth){
        this.currentBreakpoint = BREAKPOINTS.tablet_landscape
    } else {
      this.currentBreakpoint = BREAKPOINTS.desktop
    }

    this.useMobileComponent = (width <= breakpoints.tablet_portrait.maxWidth)
    this.portrait = width < height
 }

  update = (force) => {
    const w = window.innerWidth
    const h = window.innerHeight
    const widthChange = this.viewport.width !== w
    const heightChange = this.viewport.height !== h
    if (force || widthChange || heightChange){
      this.viewport.width = w
      this.viewport.height = h
      this.testBreakPoint()
      this.emit(EVENTS.resize, this.viewport)
    }
  }

  onRaf = () => {
    this.update()
    cancelAnimationFrame(this.rafId)
    this.rafId = requestAnimationFrame(this.onRaf)
  }
}


export const resizeService = new ResizeService()
