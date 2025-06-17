export const DEG_TO_RAD = Math.PI / 180
export const RAD_TO_DEG = 180 / Math.PI
export const TAU = Math.PI * 2

const  {max, min, cos, sin} = Math

export const isOdd = (num) => num % 2 === 1;
export const positiveModulo = (value, m) => ((value % m) + m) % m

export const clamp = (n, min = 0, max = 1) =>
  n < min ? min : max < n ? max : n

/* GL API EASING */

export const linearstep_gl = (edge0, edge1, x) => {
  const t = max( min((x - edge0) / (edge1 - edge0), 1.0), 0.0)
  return t
}

export const smoothstep_gl = (edge0, edge1, x) => {
  const t = max( min((x - edge0) / (edge1 - edge0), 1.0), 0.0)
  return t * t * (3 - 2 * t)
}



export const roundToPlaces = (value, decimalPlaces) => {
  const roundMultiplier = 10 ** decimalPlaces
  return Math.round(value * roundMultiplier) / roundMultiplier
}

export const timeFormat = secs => {
  const secNum = Number.parseInt(secs, 10) // don't forget the second param
  let hours = Math.floor(secNum / 3600)
  let minutes = Math.floor((secNum - hours * 3600) / 60)
  let seconds = secNum - hours * 3600 - minutes * 60

  if (hours < 10) {
    hours = `0 ${hours}`
  }
  if (minutes < 10) {
    minutes = `0 ${minutes}`
  }
  if (seconds < 10) {
    seconds = `0 ${seconds}`
  }
  return `${minutes}:${seconds}`
}

export const copyMaskedValues = (sourceObject, keys, destObject = {}) => {
  keys.forEach(key => {
    destObject[key] = sourceObject[key]
  })
  return destObject
}





/* MAPPED EASING */
export const linearStep = (x, min, max, destMin = 0, destMax = 1, doClamp = true) => {
  const t = (x - min) / (max - min)
  return doClamp ? clamp(t, destMin, destMax) : t
}

export const smoothStep = (x, min, max, destMin = 0, destMax = 1) => {
  let t = linearStep(x, min, max) // 0 to 1
  t = t * t * (3.0 - 2.0 * t)
  return linearStep(t, 0, 1, destMin, destMax)
}

export const smoothBumpStep = (x, min, max, destMin = 0, destMax = 1) => {
  let t = linearStep(x, min, max)
  t = 1.0 - Math.abs(t - 0.5) * 2.0
  t = t * t * (3.0 - t - t)
  return linearStep(t, 0, 1, destMin, destMax)
}

/* DISTANCE */

export const distance2D = (x1, y1, x2, y2) => {
  const deltaX = x2 - x1
  const deltaY = y2 - y1
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY)
}

export const distance1D = (x1, x2) => {
  return Math.abs(x1 - x2)
}

/* POINTS */

export const lerpPoint = (sourcePoint, targetPoint, blendAmount) => {
  const point = {}
  point.x = sourcePoint.x + blendAmount * (targetPoint.x - sourcePoint.x)
  point.y = sourcePoint.y + blendAmount * (targetPoint.y - sourcePoint.y)
  return point
}

export const copyPoint = sourcePoint => {
  return {
    x: sourcePoint.x,
    y: sourcePoint.y,
  }
}

export const getVector = (valueA, valueB) => {
  return valueB - valueA
}

export const getPointDistance = (sourcePoint, targetPoint) => {
  const deltaX = getVector(targetPoint.x, sourcePoint.x)
  const deltaY = getVector(targetPoint.y, sourcePoint.y)
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY)
}

export const getRotatedPoint = (point, angle) => {
  const angleRad = angle * DEG_TO_RAD
  const rotatedPoint = {}
  rotatedPoint.x = point.x * Math.cos(angleRad) + point.y * Math.sin(angleRad)
  rotatedPoint.y = point.y * Math.cos(angleRad) - point.x * Math.sin(angleRad)
  return rotatedPoint
}

/* ANGLES */

export const toRadians = value => {
  return value * DEG_TO_RAD
}

export const toDeg = value => {
  return value * RAD_TO_DEG
}

export const getProjectionOfAngle = angle => {
  const point = {
    x: Math.sin(angle * DEG_TO_RAD),
    y: -Math.cos(angle * DEG_TO_RAD),
  }
  return point
}

export const getAngle = (deltaY, deltaX) => {
  const rad = Math.atan2(deltaX, -deltaY)
  return rad * RAD_TO_DEG
}

export const getAngleBetweenPoints = (sourcePoint, targetPoint) => {
  const deltaX = targetPoint.x - sourcePoint.x
  const deltaY = targetPoint.y - sourcePoint.y
  return getAngle(deltaY, deltaX)
}

/* RANDOM */

/*
this does not create correct distrubtions for integers between start and
end ints (more inclined to round to center numbers, below function more balanced)
*/
export const randomIntInRange = (int1, int2) => {
  return Math.round(int1 + Math.random() * (int2 - int1))
}

export const randomIntRange = (int1, int2) => {
  return Math.floor(int1 + Math.random() * (int2 - int1 + 0.99999))
}

export const randomInRange = (num1, num2) => {
  return num1 + Math.random() * (num2 - num1)
}

export const randomDist = (min, max, iterations) => {
  let total = 0
  for (let i = 0; i < iterations; i += 1) {
    total += randomInRange(min, max)
  }
  return total / iterations
}

export const randomSign = () => {
  return Math.random() < 0.5 ? -1 : 1
}

/* MAPPING */

export const norm = (value, min, max) => {
  return (value - min) / (max - min)
}

export const lerp = (unitary, num1, num2) => {
  return num1 + unitary * (num2 - num1)
}

export const mix = (num1, num2, amount) => {
  return num1 + amount * (num2 - num1)
}

/**
 * Maps a value from a (source) scale, to another (destination) scale.
 * Scales must be ascending - if they are descending, the min and max
 * values will need to be swapped.
 *
 * e.g. 0.8 on a (0 - 1) source scale maps to 160 on a (0 to 200) destination scale
 *
 * @param {number} value The source value to map
 * @param {number} sourceMin The minimum value of the source scale
 * @param {number} sourceMax The maximum value of the source scale
 * @param {number} destMin The minimum value of the destination scale
 * @param {number} destMax The maximum value of the destination scale
 * @param {boolean} doClamp whether the value should always be in bounds of the min/max
 * @returns {number} The mapped destination value
 */
export const mapRange = (value, sourceMin, sourceMax, destMin, destMax, _clamp) => {
  value = lerp(norm(value, sourceMin, sourceMax), destMin, destMax)
  if (_clamp) {
    value = clamp(value, destMin, destMax)
  }
  return value
}

export const mapTo = (value, destMin, destMax, _clamp) => {
  value = lerp(value, destMin, destMax)
  if (_clamp) {
    value = clamp(value, destMin, destMax)
  }
  return value
}

export const sinBlend = value => {
  return 0.5 - 0.5 * Math.cos(value * Math.PI)
}

export const mapFrom = (value, sourceMin, sourceMax, _clamp) => {
  value = lerp(norm(value, sourceMin, sourceMax), 0, 1)
  if (_clamp) {
    value = clamp(value, 0, 1)
  }
  return value
}

export const fitRectInBounds = (rect, bounds) => {
  const rectRatio = rect.width / rect.height
  const boundsRatio = bounds.width / bounds.height

  const fitRect = {}

  // Rect is more landscape than bounds - fit to width
  if (rectRatio > boundsRatio) {
    fitRect.width = bounds.width
    fitRect.height = rect.height * (bounds.width / rect.width)
  }
  // Rect is more portrait than bounds - fit to height
  else {
    fitRect.width = rect.width * (bounds.height / rect.height)
    fitRect.height = bounds.height
  }

  fitRect.y = (bounds.height - fitRect.height) * 0.5
  fitRect.x = (bounds.width - fitRect.width) * 0.5

  return fitRect
}
