import { useState, useCallback } from 'react'
import CheckBoxWithText from '@/components/CheckBoxWithText'
import { region } from '@/api/apiTypes'
import FilterConfirmButton from '@/Pages/MainPage/Filter/FilterConfirmButton'

interface FilterDropDownRegionProps {
  selectedRegions: region[]
  regionsData: region[]
  setParentRegions: (regions: region[]) => void
}

const FilterDropDownRegion = ({
  selectedRegions,
  regionsData,
  setParentRegions,
}: FilterDropDownRegionProps) => {
  const [localSelectedRegions, setLocalSelectedRegions] =
    useState<region[]>(selectedRegions)

  const handleMultiChoiceRegionClick = useCallback(
    (regionValue: region) => {
      if (localSelectedRegions.includes(regionValue)) {
        setLocalSelectedRegions(
          localSelectedRegions.filter((region) => region !== regionValue)
        )
      } else {
        setLocalSelectedRegions([...localSelectedRegions, regionValue])
      }
    },
    [localSelectedRegions]
  )

  return (
    <>
      <div className="flex w-[678px] flex-wrap content-end items-end gap-x-[50px] gap-y-4">
        {regionsData.map((region) => (
          <CheckBoxWithText
            isChecked={localSelectedRegions.includes(region)}
            key={region.id}
            text={region.name}
            onClickHandler={() => handleMultiChoiceRegionClick(region)}
          />
        ))}
      </div>
      <FilterConfirmButton
        onConfirm={() => {
          setParentRegions(localSelectedRegions)
        }}
      />
    </>
  )
}

export default FilterDropDownRegion
