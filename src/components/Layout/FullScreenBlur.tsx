import React, { useEffect } from 'react'

interface FullScreenBlurProps {
  isActive: boolean
  children: React.ReactNode
  setActiveState: (state: boolean) => void
}

const FullScreenBlur = ({
  children,
  isActive,
  setActiveState,
}: FullScreenBlurProps) => {
  useEffect(() => {
    // Disable scrolling when the popup is active
    if (isActive) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isActive])
  return (
    <section
      className={`bg-blur fixed left-0 top-0 z-20 h-dvh w-full items-center justify-center backdrop-blur-[5px] ${
        isActive ? 'flex animate-fade-in-up' : 'hidden'
      }`}
      onMouseDown={() => setActiveState(false)}
    >
      {/* NOTE: KEEP IN MIND! that the children require onMouseDown event.stopPropagation() to prevent the parent from closing when clicked  */}
      {children}
    </section>
  )
}

export default FullScreenBlur
