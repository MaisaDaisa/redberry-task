import Status from '@/Pages/AddListingPage/Status'
import React, { useEffect, useState } from 'react'

interface TwoChoiceProps {
  isRentalRef: React.MutableRefObject<0 | 1>
}

const TwoChoice = ({ isRentalRef }: TwoChoiceProps) => {
  const [selected, setSelected] = useState<0 | 1>(0)

  useEffect(() => {
    isRentalRef.current = selected
  }, [selected])

  return (
    <div className="flex flex-row gap-x-8">
      <Status
        selected={selected}
        index={0}
        setSelected={setSelected}
        key={0}
        title="იყიდება"
      />
      <Status
        selected={selected}
        index={1}
        setSelected={setSelected}
        key={1}
        title="ქირავდება"
      />
    </div>
  )
}

export default TwoChoice
