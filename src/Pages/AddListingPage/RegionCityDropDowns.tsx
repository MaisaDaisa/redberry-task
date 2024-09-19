import React, { useState, useEffect } from 'react'
import { cityGet, region } from '@/api/apiTypes'
import { getCities, getRegions } from '@/api/getRequests'
import DropDownSelect from '@/components/DropDownSelect'
import arrowIcon from '@/assets/svg/filterarrow.svg'
import TitleH4Component from '@/components/TitleH4Component'

interface RegionCityDropDownsProps {
  chosenCityRef: React.MutableRefObject<cityGet | null>
  chosenRegionRef: React.MutableRefObject<region | null>
}

const RegionCityDropDowns = ({
  chosenCityRef,
  chosenRegionRef,
}: RegionCityDropDownsProps) => {
  const [regions, setRegions] = useState<region[]>([])
  const [cities, setCities] = useState<cityGet[]>([])
  const [chosenRegion, setChosenRegion] = useState<region | null>(null) // Initially null
  const [chosenCity, setChosenCity] = useState<cityGet | null>(null) // Initially null
  const [filteredCities, setFilteredCities] = useState<cityGet[] | null>(null)

  useEffect(() => {
    const fetchCitiesAndRegions = async () => {
      try {
        const regionsData = await getRegions()
        const citiesData = await getCities()

        setRegions(regionsData)
        setCities(citiesData)

        // Set the initial chosen region from ref or the first region
        const initialRegion = chosenRegionRef.current || regionsData[0]
        setChosenRegion(initialRegion)
        chosenRegionRef.current = initialRegion

        // Filter cities based on the initial region
        const initialFilteredCities = citiesData.filter(
          (city) => city.region_id === initialRegion.id
        )
        setFilteredCities(initialFilteredCities)

        // Set the initial city from ref or the first city of the filtered cities
        if (
          chosenCityRef.current === null &&
          initialFilteredCities.length > 0
        ) {
          const firstCity = initialFilteredCities[0]
          setChosenCity(firstCity)
          chosenCityRef.current = firstCity
        } else {
          setChosenCity(chosenCityRef.current)
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

    // Reset the chosen city when the region changes
    if (filteredCitiesData.length > 0) {
      setChosenCity(filteredCitiesData[0])
      chosenCityRef.current = filteredCitiesData[0]
    } else {
      setChosenCity(null)
      chosenCityRef.current = null
    }
  }

  // Handler when city is selected
  const setCityHandler = (city: cityGet) => {
    setChosenCity(city)
    chosenCityRef.current = city
  }

  // skeleton loading
  if (!chosenRegion) {
    return (
      <>
        <TitleH4Component title={'რეგიონი'} required={false}>
          <div
            className={`flex w-full cursor-pointer justify-between rounded-b-md rounded-t-md border border-primary-gray-border p-[10px]`}
          >
            <span className="main-text-sm-100-400 invisible">ქალაქი</span>
            <img
              src={arrowIcon}
              alt="arrow"
              className={`'rotate-0' transition-all duration-300`}
            />
          </div>
        </TitleH4Component>
        <TitleH4Component title={'ქალაქი'} required={false}>
          <div
            className={`flex w-full cursor-pointer justify-between rounded-b-md rounded-t-md border border-primary-gray-border p-[10px]`}
          >
            <span className="main-text-sm-100-400 invisible">11</span>
            <img
              src={arrowIcon}
              alt="arrow"
              className={`'rotate-0' transition-all duration-300`}
            />
          </div>
        </TitleH4Component>
      </>
    )
  }

  return (
    <>
      <DropDownSelect
        parentStateSetter={setRegionHandler}
        selectedValue={chosenRegion}
        items={regions}
        title="რეგიონი"
        required={false}
      />
      {filteredCities && (
        <DropDownSelect
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
