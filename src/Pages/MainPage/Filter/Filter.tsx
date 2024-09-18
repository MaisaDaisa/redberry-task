import React from 'react'
import FilterDropDownButtons from '@/Pages/MainPage/Filter/FilterDropDownButtons'
import FilterDropDownBedrooms from '@/Pages/MainPage/Filter/FilterDropDownSections/FilterDropDownBedrooms'
import FilterDropDownRegion from '@/Pages/MainPage/Filter/FilterDropDownSections/FilterDropDownRegion'
import { useState } from 'react'
import RangePicker, { PostFixTypesEnum } from '@/components/RangePicker'

const Filter = () => {
  const [activeFilters, setActiveFilters] = useState<number>(0)
  const regionsData = useRef<region[]>([])
  return (
    <>
      <FilterDropDownButtons
        filterText="რეგიონი"
        dropDownTitle="რეგიონის მიხედვით"
        isActive={activeFilters === 1}
        handleSetActive={() => handleSetActiveFilter(1)}
      >
        <FilterDropDownRegion
          selectedRegions={selectedRegions}
          regionsData={regionsData.current}
          setParentRegions={setSelectedRegions}
        />
      </FilterDropDownButtons>
      <FilterDropDownButtons
        filterText="საფასო კატეგორია"
        dropDownTitle="ფასის მიხედვით"
        isActive={activeFilters === 2}
        handleSetActive={() => handleSetActiveFilter(2)}
      >
        <RangePicker
          maxValueState={maxPrice}
          minValueState={minPrice}
          setMaxValue={setMaxPrice}
          setMinValue={setMinPrice}
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
          maxValueState={maxArea}
          minValueState={minArea}
          setMaxValue={setMaxArea}
          setMinValue={setMinArea}
        />
      </FilterDropDownButtons>
      <FilterDropDownButtons
        filterText="საძინებლების რაოდენობა"
        dropDownTitle="საძინებლების რაოდენობა"
        isActive={activeFilters === 4}
        handleSetActive={() => handleSetActiveFilter(4)}
      >
        <FilterDropDownBedrooms
          valueState={numberOfBedrooms.toString()}
          setValueState={setNumberOfBedrooms}
        />
      </FilterDropDownButtons>
    </>
  )
}

export default Filter
