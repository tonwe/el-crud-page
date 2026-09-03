function easeInOutQuad(t, b, c, d) {
  t /= d / 2
  if (t < 1) {
    return c / 2 * t * t + b
  }
  t--
  return -c / 2 * (t * (t - 2) - 1) + b
}

function requestAnimFrame(callback) {
  const request = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame
  if (request) {
    return request.call(window, callback)
  }
  return window.setTimeout(callback, 1000 / 60)
}

/**
 * Because it's so fucking difficult to detect the scrolling element, just move them all
 * @param {number} amount
 */
function move(amount) {
  document.documentElement.scrollTop = amount
  if (document.body) {
    if (document.body.parentNode) {
      document.body.parentNode.scrollTop = amount
    }
    document.body.scrollTop = amount
  }
}

function position() {
  const body = document.body
  return document.documentElement.scrollTop ||
    (body && body.parentNode && body.parentNode.scrollTop) ||
    (body && body.scrollTop) ||
    0
}

/**
 * @param {number} to
 * @param {number} duration
 * @param {Function} callback
 */
export function scrollTo(to, duration, callback) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    if (typeof callback === 'function') callback()
    return
  }

  const start = position()
  const change = to - start
  const increment = 20
  let currentTime = 0
  duration = (typeof (duration) === 'undefined') ? 500 : duration

  if (duration <= 0) {
    move(to)
    if (typeof callback === 'function') callback()
    return
  }

  var animateScroll = function() {
    // increment the time
    currentTime += increment
    // find the value with the quadratic in-out easing function
    var val = easeInOutQuad(currentTime, start, change, duration)
    // move the document.body
    move(val)
    // do the animation unless its over
    if (currentTime < duration) {
      requestAnimFrame(animateScroll)
    } else {
      if (callback && typeof (callback) === 'function') {
        // the animation is done so lets callback
        callback()
      }
    }
  }
  animateScroll()
}
