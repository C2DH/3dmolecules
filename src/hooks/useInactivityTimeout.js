import { useEffect, useRef } from 'react'

function useInactivityTimeout(
  timeout = 10000,
  onTimeout = () => {},
  { deps, enabled } = {
    deps: [],
    enabled: true
  }
) {
  const timeoutRef = useRef(null)
  // const initialized = useRef(null)
  const resetTimer = () => {
    if (timeoutRef.current) {
      // console.debug('[useInactivityTimeout] cleared.')
      clearTimeout(timeoutRef.current)
    }
    // console.debug('[useInactivityTimeout] resetTimer, enabled', enabled)
    if (!enabled) {
      return
    }
    // console.debug('[useInactivityTimeout] resetTimer, timeout', timeout)
    timeoutRef.current = setTimeout(() => {
      console.debug('[useInactivityTimeout] timeout')
      onTimeout()
    }, timeout)
  }

  const handleActivity = () => {
    resetTimer()
  }
  useEffect(() => {
    // console.debug('[useInactivityTimeout] enabled', enabled)

    window.addEventListener('mousemove', handleActivity)
    window.addEventListener('touchmove', handleActivity)

    resetTimer()

    return () => {
      if (timeoutRef.current) {
        console.debug('[useInactivityTimeout] cleanup')
        clearTimeout(timeoutRef.current)
      }
      window.removeEventListener('mousemove', handleActivity)
      window.removeEventListener('touchmove', handleActivity)
    }
  }, [timeout, enabled, deps])
}

export default useInactivityTimeout
