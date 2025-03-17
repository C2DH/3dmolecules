import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import useStore from '../GlobalState'
import { useViewportStore } from '../components/ViewportManager'
import { useLocation } from 'react-router-dom'

const AutoScroller = () => {
  const windowHeight = useViewportStore(state => state.availableHeight)
  const sectionCount = useStore(state => state.sectionCount) // Get section count from Zustand
  const { currentPage, setCurrentPage } = useStore()
  const { isPaused, setIsPaused } = useStore()
  const timeoutRef = useRef(null)
  const inactivityTimeoutRef = useRef(null)
  const autoScrollRef = useRef(null) // Ref to store the autoScroll function
  const location = useLocation()
  const pathname = location.pathname

  // Define the auto-scroll function
  const autoScroll = () => {
    if (!isPaused && currentPage < sectionCount - 1) {
      window.scrollTo({
        top: windowHeight * (currentPage + 1),
        behavior: 'smooth'
      })
      setCurrentPage(prev => prev + 1)
    } else if (!isPaused) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      setCurrentPage(0)
    }
  }

  useLayoutEffect(() => {
    setIsPaused(true), setCurrentPage(0)
    console.log('[currentPage]', currentPage)
  }, [pathname])

  // Store the autoScroll function in a ref
  autoScrollRef.current = autoScroll

  // Set up the auto-scroll timeout
  useEffect(() => {
    const startAutoScroll = () => {
      if (!isPaused) {
        timeoutRef.current = setTimeout(() => {
          autoScrollRef.current() // Call the autoScroll function
          startAutoScroll() // Schedule the next auto-scroll
          console.log('[Autoscroll]', currentPage)
        }, 8000) // 4 seconds
      }
    }

    startAutoScroll() // Start the auto-scroll loop

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isPaused])

  // Pause on user interaction (scroll, mouse move, or touch)
  useEffect(() => {
    const handleInteraction = () => {
      // setIsPaused(true) // Pause auto-scroll on interaction
      // if (inactivityTimeoutRef.current) {
      //   clearTimeout(inactivityTimeoutRef.current)
      // }
      //     console.log('isPaused', isPaused)
      // Resume auto-scroll after 10 seconds of inactivity
      // inactivityTimeoutRef.current = setTimeout(() => {
      // }, 60000) // 60 seconds
      setIsPaused(true)
      setCurrentPage(0)
    }

    // window.addEventListener('scroll', handleInteraction)

    return () => {
      // window.removeEventListener('scroll', handleInteraction)

      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current)
      }
    }
  }, [setIsPaused])

  return null // This component doesn't render anything
}

export default AutoScroller
