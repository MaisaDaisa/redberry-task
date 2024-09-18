import { useState, useCallback, useEffect, memo } from 'react'
import CheckBoxWithText from '@/components/CheckBoxWithText'
import { region } from '@/api/apiTypes'
import FilterConfirmButton from '@/Pages/MainPage/Filter/FilterConfirmButton'

interface FilterDropDownRegionProps {
  firstValues: region[]
  regionsData: region[]
  setParentSelectedRegions: (updatedRegions: region[]) => void
}

const FilterDropDownRegion = memo(
  ({
    firstValues,
    regionsData,
    setParentSelectedRegions,
  }: FilterDropDownRegionProps) => {
    const [selectedRegionIds, setSelectedRegionIds] = useState<Set<number>>(
      new Set(firstValues.map((region) => region.id))
    )

    useEffect(() => {
      setSelectedRegionIds(new Set(firstValues.map((region) => region.id)))
    }, [firstValues])

    const isRegionSelected = useCallback(
      (regionValue: region) => selectedRegionIds.has(regionValue.id),
      [selectedRegionIds]
    )

    const handleMultiChoiceRegionClick = useCallback((regionValue: region) => {
      setSelectedRegionIds((prev) => {
        const newSet = new Set(prev)
        if (newSet.has(regionValue.id)) {
          newSet.delete(regionValue.id)
        } else {
          newSet.add(regionValue.id)
        }
        return newSet
      })
    }, [])

    const localSelectedRegions = regionsData.filter((region) =>
      selectedRegionIds.has(region.id)
    )

    return (
      <>
        <div className="flex w-[678px] flex-wrap content-end items-end gap-x-[50px] gap-y-4">
          {regionsData.map((region) => (
            <CheckBoxWithText
              isChecked={isRegionSelected(region)}
              key={region.id}
              text={region.name}
              onClickHandler={() => handleMultiChoiceRegionClick(region)}
            />
          ))}
        </div>
        <FilterConfirmButton
          onConfirm={() => setParentSelectedRegions(localSelectedRegions)}
        />
      </>
    )
  },
  (prevProps, nextProps) => {
    return (
      prevProps.firstValues === nextProps.firstValues &&
      prevProps.regionsData === nextProps.regionsData
    )
  }
)

export default FilterDropDownRegion
