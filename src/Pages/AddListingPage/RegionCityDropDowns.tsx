import React, { useState, useEffect } from 'react'
import { cityGet, region } from '@/api/apiTypes'
import { getCities, getRegions } from '@/api/getRequests'
import DropDownSelect from '@/components/DropDownSelect'

interface RegionCityDropDownsProps {
  chosenCityRef: React.MutableRefObject<cityGet | null>
  chosenRegionRef: React.MutableRefObject<region | null>
  initialChosenCity: cityGet | null
  initialChosenRegion: region | null
  isRegionRejected: boolean
  isCityRejected: boolean
}

const RegionCityDropDowns = ({
  chosenCityRef,
  chosenRegionRef,
  initialChosenCity,
  initialChosenRegion,
  isRegionRejected,
  isCityRejected,
}: RegionCityDropDownsProps) => {
  const [regions, setRegions] = useState<region[]>()
  const [cities, setCities] = useState<cityGet[]>()
  const [chosenRegion, setChosenRegion] = useState<region | null>(
    initialChosenRegion
  ) // Initially null
  const [chosenCity, setChosenCity] = useState<cityGet | null>(
    initialChosenCity
  ) // Initially null
  const [filteredCities, setFilteredCities] = useState<cityGet[] | null>(null)

  useEffect(() => {
    const fetchCitiesAndRegions = async () => {
      try {
        // Getting First Data
        const regionsData = await getRegions()
        const citiesData = await getCities()
        setRegions(regionsData)
        setCities(citiesData)

        // Filter cities based on the initial region if initial
        if (initialChosenRegion) {
          const initialFilteredCities = citiesData.filter(
            (city) => city.region_id === initialChosenRegion.id
          )
          setFilteredCities(initialFilteredCities)
        }
      } catch (error) {
        console.error('Failed to fetch regions or cities:', error)
      }
    }
    fetchCitiesAndRegions()
  }, [chosenRegionRef, chosenCityRef])

  // Handler when region is selected
  const setRegionHandler = (region: region) => {
    setChosenRegion(region)
    chosenRegionRef.current = region

    // Filter cities based on the selected region
    const filteredCitiesData = cities.filter(
      (city) => city.region_id === region.id
    )
    setFilteredCities(filteredCitiesData)

    setChosenCity(null)
    // Reset the chosen city when the region changes
  }

  // Handler when city is selected
  const setCityHandler = (city: cityGet) => {
    setChosenCity(city)
    chosenCityRef.current = city
  }

  return (
    <>
      {regions && (
        <DropDownSelect
          isRejected={isRegionRejected}
          parentStateSetter={setRegionHandler}
          selectedValue={chosenRegion}
          items={regions}
          title="რეგიონი"
          required={false}
          placeHolderText="აირჩიე რეგიონი"
        />
      )}
      {filteredCities && cities && (
        <DropDownSelect
          isRejected={isCityRejected}
          placeHolderText="აირჩიე ქალაქი"
          selectedValue={chosenCity}
          key={chosenRegion?.id} // Ensure re-render when region changes
          parentStateSetter={setCityHandler}
          items={filteredCities as cityGet[]}
          title="ქალაქი"
          required={false}
        />
      )}
    </>
  )
}

export default RegionCityDropDowns
