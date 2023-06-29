export function useTimer() {
  let timer: any

  // time: second
  const initTimer = (time = 0, cb?: any) => {
    clearTimer()
    timer = setInterval(() => {
      cb?.()
    }, time * 1000)
  }

  const clearTimer = () => {
    clearInterval(timer)
    timer = null
  }

  return { timer, initTimer, clearTimer }
}
