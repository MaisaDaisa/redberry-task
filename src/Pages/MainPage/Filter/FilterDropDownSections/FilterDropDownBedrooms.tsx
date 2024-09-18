import { memo, useState } from 'react'
import FilterConfirmButton from '@/Pages/MainPage/Filter/FilterConfirmButton'
import { smallIntChecker } from '@/lib/validationChecker'

interface FilterDropDownBedroomsProps {
  firstValue: string
  setParentValue: (value: string) => void
}

const FilterDropDownBedrooms = memo(
  ({ firstValue, setParentValue }: FilterDropDownBedroomsProps) => {
    const [localValue, setLocalValue] = useState(firstValue)

    const handleSetNumberOfBedrooms = (value: string) => {
      // Get last character of the input
      if (value !== '') {
        const valueToSet = value.startsWith('0') ? value.slice(1) : value
        smallIntChecker(valueToSet) && setLocalValue(valueToSet)
      } else {
        setLocalValue('0')
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
        <FilterConfirmButton onConfirm={() => setParentValue(localValue)} />
      </>
    )
  },
  (prevProps, nextProps) => prevProps.firstValue === nextProps.firstValue
)

export default FilterDropDownBedrooms
