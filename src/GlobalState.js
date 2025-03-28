import { atom } from 'jotai'
import { create } from 'zustand'

export const currentPageAtom = atom(0)
export const currentSceneAtom = atom(1)
export const watchLoadedAtom = atom(false)

export const showFullscreenMode = atom(false)

export const buttonClickCounterAtom = atom(0)

export const scrollOffset = atom(0)
export const currentPage = atom(0)

export const modalVisible = atom(false)
export const modalImage = atom(0)

const useGlobalStore = create(set => ({
  isMenuOpen: false,
  toggleMenu: () => set(state => ({ isMenuOpen: !state.isMenuOpen })),
  showFullscreenMode: false,
  toggleShowFullscreenMode: () => set(state => ({ showFullscreenMode: !state.showFullscreenMode })),
  clickedSlideId: false,
  setClickedSlideId: clickedSlideId => set({ clickedSlideId }),
  scrollToTopEf: false,
  setScrollToTopEf: scrollToTopEf => set({ scrollToTopEf }),
  sectionCount: 0, // Initial state
  setSectionCount: count => set({ sectionCount: count }), // Action to update the count
  isPaused: true, // isPaused is true by default
  setIsPaused: value => set({ isPaused: value }), // Action to update isPaused
  setIsPausedOnlyWhenDifferent: value => set(state => (state.isPaused === value ? state : { isPaused: value })), // Action to update isPaused only when different
  currentPage: 0, // isPaused is true by default
  setCurrentPage: currentPage => set({ currentPage }) // Add setter for currentPage
}))

export default useGlobalStore
