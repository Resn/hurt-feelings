// easing functions from "Tween.js"

export const linear = function (n) {
  return n
}

export const inQuad = function (n) {
  return n * n
}

export const outQuad = function (n) {
  return n * (2 - n)
}

export const inOutQuad = function (n) {
  n *= 2
  if (n < 1) {
    return 0.5 * n * n
  }
  return -0.5 * (--n * (n - 2) - 1)
}

export const inCube = function (n) {
  return n * n * n
}

export const outCube = function (n) {
  return --n * n * n + 1
}

export const inOutCube = function (n) {
  n *= 2
  if (n < 1) {
    return 0.5 * n * n * n
  }
  return 0.5 * ((n -= 2) * n * n + 2)
}

export const inQuart = function (n) {
  return n * n * n * n
}

export const outQuart = function (n) {
  return 1 - --n * n * n * n
}

export const inOutQuart = function (n) {
  n *= 2
  if (n < 1) {
    return 0.5 * n * n * n * n
  }
  return -0.5 * ((n -= 2) * n * n * n - 2)
}

export const inQuint = function (n) {
  return n * n * n * n * n
}

export const outQuint = function (n) {
  return --n * n * n * n * n + 1
}

export const inOutQuint = function (n) {
  n *= 2
  if (n < 1) {
    return 0.5 * n * n * n * n * n
  }
  return 0.5 * ((n -= 2) * n * n * n * n + 2)
}

export const inSine = function (n) {
  return 1 - Math.cos((n * Math.PI) / 2)
}

export const outSine = function (n) {
  return Math.sin((n * Math.PI) / 2)
}

export const inOutSine = function (n) {
  return 0.5 * (1 - Math.cos(Math.PI * n))
}

export const inExpo = function (n) {
  return n === 0 ? 0 : 1024 ** (n - 1)
}

export const outExpo = function (n) {
  return n === 1 ? n : 1 - 2 ** (-10 * n)
}

export const inOutExpo = function (n) {
  if (n === 0) {
    return 0
  }
  if (n === 1) {
    return 1
  }
  if (n * 2 < 1) {
    n = n * 2
    return 0.5 * 1024 ** (n - 1)
  }
  return 0.5 * (-(2 ** (-10 * (n - 1))) + 2)
}

export const inCirc = function (n) {
  return 1 - Math.sqrt(1 - n * n)
}

export const outCirc = function (n) {
  return Math.sqrt(1 - --n * n)
}

export const inOutCirc = function (n) {
  n *= 2
  if (n < 1) {
    return -0.5 * (Math.sqrt(1 - n * n) - 1)
  }
  return 0.5 * (Math.sqrt(1 - (n -= 2) * n) + 1)
}

export const inBack = function (n) {
  const s = 1.70158
  return n * n * ((s + 1) * n - s)
}

export const outBack = function (n) {
  const s = 1.70158
  return --n * n * ((s + 1) * n + s) + 1
}

export const inOutBack = function (n) {
  const s = 1.70158 * 1.525
  if (n * 2 < 1) {
    n = n * 2
    return 0.5 * (n * n * ((s + 1) * n - s))
  }
  return 0.5 * ((n -= 2) * n * ((s + 1) * n + s) + 2)
}

export const inBounce = function (n) {
  return 1 - outBounce(1 - n)
}

export const outBounce = function (n) {
  if (n < 1 / 2.75) {
    return 7.5625 * n * n
  } else if (n < 2 / 2.75) {
    return 7.5625 * (n -= 1.5 / 2.75) * n + 0.75
  } else if (n < 2.5 / 2.75) {
    return 7.5625 * (n -= 2.25 / 2.75) * n + 0.9375
  } else {
    return 7.5625 * (n -= 2.625 / 2.75) * n + 0.984375
  }
}

export const inOutBounce = function (n) {
  if (n < 0.5) {
    return inBounce(n * 2) * 0.5
  }
  return outBounce(n * 2 - 1) * 0.5 + 0.5
}

export const inElastic = function (n) {
  let s
  let a = 0.1
  const p = 0.4
  if (n === 0) {
    return 0
  }
  if (n === 1) {
    return 1
  }
  if (!a || a < 1) {
    a = 1
    s = p / 4
  } else s = (p * Math.asin(1 / a)) / (2 * Math.PI)
  return -(a * 2 ** (10 * (n -= 1)) * Math.sin(((n - s) * (2 * Math.PI)) / p))
}

export const outElastic = function (n) {
  let s
  let a = 0.1
  const p = 0.4
  if (n === 0) {
    return 0
  }
  if (n === 1) {
    return 1
  }
  if (!a || a < 1) {
    a = 1
    s = p / 4
  } else {
    s = (p * Math.asin(1 / a)) / (2 * Math.PI)
  }
  return a * 2 ** (-10 * n) * Math.sin(((n - s) * (2 * Math.PI)) / p) + 1
}

export const inOutElastic = function (n) {
  let s
  let a = 0.1
  const p = 0.4
  if (n === 0) {
    return 0
  }
  if (n === 1) {
    return 1
  }
  if (!a || a < 1) {
    a = 1
    s = p / 4
  } else {
    s = (p * Math.asin(1 / a)) / (2 * Math.PI)
  }
  if (n * 2 < 1) {
    n = n * 2
    return -0.5 * (a * 2 ** (10 * (n -= 1)) * Math.sin(((n - s) * (2 * Math.PI)) / p))
  }
  return a * 2 ** (-10 * (n -= 1)) * Math.sin(((n - s) * (2 * Math.PI)) / p) * 0.5 + 1
}
