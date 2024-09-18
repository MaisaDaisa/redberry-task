import React, { useState, useEffect, useCallback, memo } from 'react'
import { cityGet, region } from '@/api/apiTypes'
import { getCities, getRegions } from '@/api/getRequests'
import DropDownSelect from '@/components/DropDownSelect'

interface RegionCityDropDownsProps {
  chosenCityRef: React.MutableRefObject<cityGet | null>
  chosenRegionRef: React.MutableRefObject<region | null>
}

const RegionCityDropDowns = memo(
  ({ chosenCityRef, chosenRegionRef }: RegionCityDropDownsProps) => {
    const [regions, setRegions] = useState<region[]>([])
    const [cities, setCities] = useState<cityGet[]>([])
    const [chosenRegion, setChosenRegion] = useState<region | null>(null)
    const [filteredCities, setFilteredCities] = useState<cityGet[] | null>(null)

    useEffect(() => {
      const fetchCities = async () => {
        try {
          const regionsData = await getRegions()
          const citiesData = await getCities()
          setRegions(regionsData)
          setCities(citiesData)
          setChosenRegion(regionsData[0])
          chosenRegionRef.current = regionsData[0]
          if (regionsData.length > 0) {
            setChosenRegion(regionsData[0])
          }
        } catch (error) {
          console.error('Failed to fetch regions or cities:', error)
        }
      }

      fetchCities()
    }, [])

    // When the user changes the region, filter the cities to display
    // only the cities that belong to the chosen region
    useEffect(() => {
      if (chosenRegion) {
        const FilterData = cities.filter(
          (city) => city.region_id === chosenRegion.id
        )
        setFilteredCities(FilterData)
        chosenCityRef.current = FilterData[0]
      }
    }, [chosenRegion, cities])

    const handleChangeCity = useCallback(
      (city: cityGet) => {
        chosenCityRef.current = city
      },
      [chosenCityRef]
    )

    const handleChangeRegion = useCallback((region: region) => {
      chosenRegionRef.current = region
      setChosenRegion(region)
    }, [])

    // If there are no regions or cities, return null
    if (regions.length === 0 || cities.length === 0) {
      return null
    }

    return (
      <>
        <DropDownSelect
          parentStateSetter={handleChangeRegion}
          selectedValue={chosenRegion}
          items={regions}
          title="Region"
          required={true}
        />

        {filteredCities && (
          <DropDownSelect
            key={filteredCities[0]?.id}
            parentStateSetter={handleChangeCity}
            items={filteredCities}
            title="City"
            required={true}
          />
        )}
      </>
    )
  },
  (prevProps, nextProps) =>
    prevProps.chosenCityRef === nextProps.chosenCityRef &&
    prevProps.chosenRegionRef === nextProps.chosenRegionRef
)

export default RegionCityDropDowns
