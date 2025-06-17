//mobile_version_max_width - any mobile component version swaps occur at this value
export const mobile_version_max_width = 768

export const BREAKPOINTS = {
  mobile: 'mobile',
  tablet_portrait: 'tablet_portrait',
  tablet_landscape: 'tablet_landscape',
  desktop: 'desktop',
}

export const breakpoints = {
  mobile: {
    width: 375
  },

  tablet_portrait : {
    maxWidth: mobile_version_max_width
  },

  tablet_landscape : {
    maxWidth: 1024
  },

  desktop : {
    width: 1440
  }

}
