import { memo, useState } from 'react'
import FilterConfirmButton from '../FilterConfirmButton'
import { checkOneNumber } from '@/lib/validationChecker'

interface FilterDropDownBedroomsProps {
  valueState: string
  setValueState: (value: string) => void
}

const FilterDropDownBedrooms = memo(
  ({ valueState, setValueState }: FilterDropDownBedroomsProps) => {
    const [localValue, setLocalValue] = useState(valueState)

    const handleSetNumberOfBedrooms = (value: string) => {
      if (checkOneNumber(value) || value === '') {
        setLocalValue(value)
      }
    }

    return (
      <>
        <input
          value={localValue}
          type="text"
          onChange={(e) => handleSetNumberOfBedrooms(e.target.value)}
          className="main-text-sm-40-400 border-gary-text-color h-[42px] w-[42px] self-start rounded-md border p-[10px] text-center outline-none"
        />
        <FilterConfirmButton onConfirm={() => setValueState(localValue)} />
      </>
    )
  }
)

export default FilterDropDownBedrooms
