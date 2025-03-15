import { useEffect, useRef, useState } from 'react'
import useStore from '../GlobalState'
import { useViewportStore } from '../components/ViewportManager'

const AutoScroller = () => {
  const windowHeight = useViewportStore(state => state.availableHeight)
  const sectionCount = useStore(state => state.sectionCount) // Get section count from Zustand
  const [currentSection, setCurrentSection] = useState(0)
  const { isPaused, setIsPaused } = useStore()
  const timeoutRef = useRef(null)
  const inactivityTimeoutRef = useRef(null)
  const autoScrollRef = useRef(null) // Ref to store the autoScroll function

  // Define the auto-scroll function
  const autoScroll = () => {
    if (!isPaused && currentSection < sectionCount - 1) {
      window.scrollTo({
        top: windowHeight * (currentSection + 1),
        behavior: 'smooth'
      })
      setCurrentSection(prev => prev + 1)
    } else if (!isPaused) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      setCurrentSection(0)
    }
  }

  // Store the autoScroll function in a ref
  autoScrollRef.current = autoScroll

  // Set up the auto-scroll timeout
  useEffect(() => {
    const startAutoScroll = () => {
      if (!isPaused) {
        timeoutRef.current = setTimeout(() => {
          autoScrollRef.current() // Call the autoScroll function
          startAutoScroll() // Schedule the next auto-scroll
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
      setIsPaused(true) // Pause auto-scroll on interaction
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current)
      }
      //     console.log('isPaused', isPaused)
      // Resume auto-scroll after 10 seconds of inactivity
      inactivityTimeoutRef.current = setTimeout(() => {
        handleInteraction()
        setIsPaused(false)
      }, 60000) // 60 seconds
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
