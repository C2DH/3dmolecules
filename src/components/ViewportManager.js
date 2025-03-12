import { useEffect, useRef, useState } from 'react'
import { UAParser } from 'ua-parser-js'
import { create } from 'zustand'

export const useViewportStore = create(set => ({
  availableHeight: window.innerHeight,
  availableWidth: window.innerWidth,
  setAvailableHeight: availableHeight => set({ availableHeight }),
  setAvailableWidth: availableWidth => set({ availableWidth }),
  updateAvailableDimensions: () =>
    set({
      availableHeight: window.innerHeight,
      availableWidth: window.innerWidth
    }),
  isPortrait: window.innerHeight > window.innerWidth,
  isLandscape: window.innerHeight < window.innerWidth,
  updateOrientation: () =>
    set({
      isPortrait: window.innerHeight > window.innerWidth,
      isLandscape: window.innerHeight < window.innerWidth
    }),
  isBackgroundVideoReady: false,
  setBackgroundVideoReady: isBackgroundVideoReady => set({ isBackgroundVideoReady }),

  isBottomVisible: false,
  setBottomVisible: isBottomVisible => set({ isBottomVisible })
}))

const ViewportManager = () => {
  const [device] = useState(() => new UAParser().getDevice())

  const isPortrait = useRef(window.innerHeight > window.innerWidth)

  const updateOrientation = useViewportStore(state => state.updateOrientation)
  const updateAvailableDimensions = useViewportStore(state => state.updateAvailableDimensions)

  console.info(
    '[ViewportManager] \n - navigator.userAgent',
    navigator.userAgent,
    '\n - device:',
    device,
    '\n',
    '- isPortrait',
    isPortrait.current
  )

  useEffect(() => {
    console.info('[ViewportManager] @useEffect')
    const resize = () => {
      console.info('[ViewportManager] @resize', device.type)
      // windowHeight.current = window.innerHeight
      if (device.type === 'mobile') {
        // detect if the device CHANGED from portrait to landscape mode
        if (!isPortrait.current && window.innerHeight > window.innerWidth) {
          console.log('[ViewportManager] @useEffect MOBILE resize dimensions...')
          isPortrait.current = true
          updateAvailableDimensions()
          updateOrientation()
        } else if (isPortrait.current && window.innerHeight < window.innerWidth) {
          console.info('[ViewportManager] @useEffect MOBILE resize dimensions...')
          isPortrait.current = false
          updateOrientation()
          updateAvailableDimensions()
        }
      } else {
        console.info('[ViewportManager] @useEffect resize dimensions...')
        updateAvailableDimensions()
      }
    }

    window.addEventListener('resize', resize)

    return () => {
      console.info('[ViewportManager] @useEffect cleanup')
      window.removeEventListener('resize', resize)
    }
  }, [])
}

export default ViewportManager
