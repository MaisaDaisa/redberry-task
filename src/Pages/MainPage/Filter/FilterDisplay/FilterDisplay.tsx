import React, {
  useCallback,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  Ref,
} from 'react'
import { FilterType } from '../../MainPage'
import FilterDisplayText from './FilterDisplayText' // Ensure this component is properly imported
import { region } from '@/api/apiTypes'

export type FilterDisplayRef = {
  rerenderFilterDisplay: () => void
}

interface FilterDisplayProps {
  FilterRef: React.MutableRefObject<FilterType>
  onClear: () => void
}

const FilterDisplay = (
  { FilterRef, onClear }: FilterDisplayProps,
  ref: Ref<FilterDisplayRef>
) => {
  const [selectedRegions, setSelectedRegions] = useState<region[]>(
    FilterRef.current.selectedRegions
  )
  const [minPrice, setMinPrice] = useState<string>(FilterRef.current.minPrice)
  const [maxPrice, setMaxPrice] = useState<string>(FilterRef.current.maxPrice)
  const [minArea, setMinArea] = useState<string>(FilterRef.current.minArea)
  const [maxArea, setMaxArea] = useState<string>(FilterRef.current.maxArea)
  const [numberOfBedrooms, setNumberOfBedrooms] = useState<string>(
    FilterRef.current.numberOfBedrooms
  )

  const handleClear = useCallback(() => {
    FilterRef.current.selectedRegions = []
    FilterRef.current.minPrice = ''
    FilterRef.current.maxPrice = ''
    FilterRef.current.minArea = ''
    FilterRef.current.maxArea = ''
    FilterRef.current.numberOfBedrooms = '0'
    setSelectedRegions([])
    setMinPrice('')
    setMaxPrice('')
    setMinArea('')
    setMaxArea('')
    setNumberOfBedrooms('0')
    onClear()
  }, [])

  const resetStates = useCallback(() => {
    setSelectedRegions(FilterRef.current.selectedRegions)
    setMinPrice(FilterRef.current.minPrice)
    setMaxPrice(FilterRef.current.maxPrice)
    setMinArea(FilterRef.current.minArea)
    setMaxArea(FilterRef.current.maxArea)
    setNumberOfBedrooms(FilterRef.current.numberOfBedrooms)
  }, [FilterRef])

  useImperativeHandle(ref, () => ({
    rerenderFilterDisplay: resetStates,
  }))

  useEffect(() => {
    setSelectedRegions(FilterRef.current.selectedRegions)
    setMinPrice(FilterRef.current.minPrice)
    setMaxPrice(FilterRef.current.maxPrice)
    setMinArea(FilterRef.current.minArea)
    setMaxArea(FilterRef.current.maxArea)
    setNumberOfBedrooms(FilterRef.current.numberOfBedrooms)
  }, [FilterRef])

  return (
    <div className="mt-4 inline-flex h-[29px] items-center justify-center gap-4">
      {selectedRegions.length > 0 &&
        selectedRegions.map((region) => (
          <FilterDisplayText
            key={region.id}
            text={region.name}
            onClickHandler={() => {
              const filteredData = FilterRef.current.selectedRegions.filter(
                (selectedRegion) => selectedRegion.id !== region.id
              )
              FilterRef.current.selectedRegions = filteredData
              setSelectedRegions(filteredData)
              onClear()
            }}
          />
        ))}

      {(maxArea !== '' || minArea !== '') && (
        <FilterDisplayText
          text={
            minArea !== '' && maxArea !== ''
              ? `${minArea} მ² - ${maxArea} მ²`
              : minArea !== ''
                ? `${minArea} მ² - დან`
                : maxArea !== ''
                  ? `${maxArea} მ² - მდე`
                  : ''
          }
          onClickHandler={() => {
            setMinArea('')
            setMaxArea('')
            FilterRef.current.minArea = ''
            FilterRef.current.maxArea = ''
            onClear()
          }}
        />
      )}

      {(maxPrice !== '' || minPrice !== '') && (
        <FilterDisplayText
          text={`${
            minPrice !== '' && maxPrice !== ''
              ? `${minPrice}₾ - ${maxPrice}₾`
              : minPrice !== ''
                ? `${minPrice}₾ - დან`
                : maxPrice !== ''
                  ? `${maxPrice}₾ - მდე`
                  : ''
          }`}
          onClickHandler={() => {
            FilterRef.current.minPrice = ''
            FilterRef.current.maxPrice = ''
            setMinPrice('')
            setMaxPrice('')
            onClear()
          }}
        />
      )}

      {numberOfBedrooms !== '0' && (
        <FilterDisplayText
          text={numberOfBedrooms}
          onClickHandler={() => {
            FilterRef.current.numberOfBedrooms = '0'
            setNumberOfBedrooms('0')
            onClear()
          }}
        />
      )}

      <p
        className={`main-text-sm-100 cursor-pointer ${
          selectedRegions.length > 0 ||
          numberOfBedrooms !== '0' ||
          maxArea !== '' ||
          minArea !== '' ||
          minPrice !== '' ||
          maxPrice !== ''
            ? ''
            : 'invisible'
        }`}
        onClick={handleClear}
      >
        გასუფთავება
      </p>
    </div>
  )
}

export default forwardRef(FilterDisplay)
