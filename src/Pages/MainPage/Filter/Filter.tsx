import { MutableRefObject, useEffect } from 'react'
import FilterDropDownButtons from '@/Pages/MainPage/Filter/FilterDropDownButtons'
import FilterDropDownBedrooms from '@/Pages/MainPage/Filter/FilterDropDownSections/FilterDropDownBedrooms'
import FilterDropDownRegion from '@/Pages/MainPage/Filter/FilterDropDownSections/FilterDropDownRegion'
import { useState, useRef } from 'react'
import { region } from '@/api/apiTypes'
import { getRegions } from '@/api/getRequests'
import RangePicker, { PostFixTypesEnum } from '@/components/RangePicker'
import { FilterType } from '@/Pages/MainPage/MainPage'

interface FilterProps {
  FiltersRef: MutableRefObject<FilterType>
  onConfirm: () => void
}

const Filter = ({ FiltersRef, onConfirm }: FilterProps) => {
  // ActiveFilter State 0 means no filter is active
  const [activeFilters, setActiveFilters] = useState<number>(0)
  // constant region FiltersRef
  const regionsData = useRef<region[]>([])
  // Regions

  const handleSetActiveFilter = (filterNumber: number) => {
    if (activeFilters === filterNumber) {
      setActiveFilters(0)
    } else {
      setActiveFilters(filterNumber)
    }
  }

  const handleSetMinPrice = (value: string) => {
    FiltersRef.current.minPrice = value
    onConfirm()
  }

  const handleSetMaxPrice = (value: string) => {
    FiltersRef.current.maxPrice = value
    onConfirm()
  }

  const handleSetMinArea = (value: string) => {
    FiltersRef.current.minArea = value
    onConfirm()
  }

  const handleSetMaxArea = (value: string) => {
    FiltersRef.current.maxArea = value
    onConfirm()
  }

  const handleSetNumberOfBedrooms = (value: string) => {
    FiltersRef.current.numberOfBedrooms = value
    onConfirm()
  }

  const handleRegionChange = (updatedRegions: region[]) => {
    FiltersRef.current.selectedRegions = updatedRegions
    onConfirm()
  }

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        regionsData.current = await getRegions()
      } catch (error) {
        console.error('Error fetching regions:', error)
      }
    }
    fetchRegions()
  }, [])

  return (
    <div className="border-main-primary-gray-border flex w-auto items-center gap-6 rounded-[10px] border p-[6px]">
      <FilterDropDownButtons
        filterText="რეგიონი"
        dropDownTitle="რეგიონის მიხედვით"
        isActive={activeFilters === 1}
        handleSetActive={() => handleSetActiveFilter(1)}
      >
        <FilterDropDownRegion
          firstValues={FiltersRef.current.selectedRegions}
          regionsData={regionsData.current}
          setParentSelectedRegions={handleRegionChange}
        />
      </FilterDropDownButtons>
      <FilterDropDownButtons
        filterText="საფასო კატეგორია"
        dropDownTitle="ფასის მიხედვით"
        isActive={activeFilters === 2}
        handleSetActive={() => handleSetActiveFilter(2)}
      >
        <RangePicker
          setParentMinValue={handleSetMinPrice}
          setParentMaxValue={handleSetMaxPrice}
          firstMaxValue={FiltersRef.current.maxPrice}
          firstMinValue={FiltersRef.current.minPrice}
          postFixType={PostFixTypesEnum.GEL}
          key={'price-picker'}
        />
      </FilterDropDownButtons>
      <FilterDropDownButtons
        filterText="ფართობი"
        dropDownTitle="ფართობის მიხედვით"
        isActive={activeFilters === 3}
        handleSetActive={() => handleSetActiveFilter(3)}
      >
        <RangePicker
          postFixType={PostFixTypesEnum.areaSize}
          key={'area-picker'}
          setParentMinValue={handleSetMinArea}
          setParentMaxValue={handleSetMaxArea}
          firstMaxValue={FiltersRef.current.maxArea}
          firstMinValue={FiltersRef.current.minArea}
        />
      </FilterDropDownButtons>
      <FilterDropDownButtons
        filterText="საძინებლების რაოდენობა"
        dropDownTitle="საძინებლების რაოდენობა"
        isActive={activeFilters === 4}
        handleSetActive={() => handleSetActiveFilter(4)}
      >
        <FilterDropDownBedrooms
          firstValue={FiltersRef.current.numberOfBedrooms}
          setParentValue={handleSetNumberOfBedrooms}
        />
      </FilterDropDownButtons>
    </div>
  )
}

export default Filter
