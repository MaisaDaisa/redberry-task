import React from 'react'

interface MainProps {
  marginTop?: string
  children?: React.ReactNode
}

const Main = ({ marginTop = '77px', children }: MainProps) => {
  return (
    <main
      className="w-dvw px-globalPx pb-[100px]"
      style={{ marginTop: marginTop }}
    >
      {children}
    </main>
  )
}

export default Main
