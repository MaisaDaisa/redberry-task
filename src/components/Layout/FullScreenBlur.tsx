import React from 'react'

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
  return (
    <section
      className={`bg-blur fixed left-0 top-0 z-20 h-dvh w-full items-center justify-center backdrop-blur-[5px] ${
        isActive ? 'flex animate-fade-in-up' : 'hidden'
      }`}
      onClick={() => setActiveState(false)}
    >
      {children}
    </section>
  )
}

export default FullScreenBlur
