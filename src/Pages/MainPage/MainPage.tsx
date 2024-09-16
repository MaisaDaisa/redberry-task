import CtaL from '@/components/CtaL'
import { CtaTypes } from '@/components/Cta'
import ListingCard from '@/components/ListingCard'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AddAgentFullscreenPopup from '@/components/AddAgentFullscreenPopup'
import { realEstateMany, region } from '@/api/apiTypes'
import { getAllListings, getRegions } from '@/api/getRequests'
import FilterDropDownButtons from '@/Pages/MainPage/Filter/FilterDropDownButtons'
import RangePicker, { PostFixTypesEnum } from '@/components/RangePicker'
import FilterDropDownRegion from '@/Pages/MainPage/Filter/FilterDropDownSections/FilterDropDownRegion'
import FilterDropDownBedrooms from '@/Pages/MainPage/Filter/FilterDropDownSections/FilterDropDownBedrooms'

import FilterDisplayText from '@/Pages/MainPage/Filter/FilterDisplayText'

const ListingPage = () => {
  const navigate = useNavigate()
  const [isAgentPopupActive, setIsAgentPopupActive] = useState(false)
  const [listings, setListings] = useState<realEstateMany[]>([])
  const [filteredListings, setFilteredListings] = useState<realEstateMany[]>([])

  // Regions
  const regionsData = useRef<region[]>([])
  const [selectedRegions, setSelectedRegions] = useState<region[]>([])
  // Dropdown Filters State
  const [activeFilters, setActiveFilters] = useState<number>(0)
  // Filters Data
  const [numberOfBedrooms, setNumberOfBedrooms] = useState<string>('0')
  const [minPrice, setMinPrice] = useState<string>('')
  const [maxPrice, setMaxPrice] = useState<string>('')
  const [minArea, setMinArea] = useState<string>('')
  const [maxArea, setMaxArea] = useState<string>('')
  // FilterBy

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Listings
        const AllListings: realEstateMany[] = await getAllListings()
        setListings(AllListings)
        setFilteredListings(AllListings)
        // Regions
        const regionsResponse: region[] = await getRegions()
        regionsData.current = regionsResponse
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchListings()
  }, [])

  const handleSetActiveFilter = useCallback(
    (filterNumber: number) => {
      if (activeFilters === filterNumber) {
        setActiveFilters(0)
      } else {
        setActiveFilters(filterNumber)
      }
    },
    [activeFilters]
  )

  const handleClear = () => {
    // Reset all filters
    setSelectedRegions([])
    setNumberOfBedrooms('0')
    setMinPrice('')
    setMaxPrice('')
    setMinArea('')
    setMaxArea('')

    // Reset Filtered Listings to include all listings
    setFilteredListings(listings)
  }

  const filterListings = () => {
    if (
      selectedRegions.length === 0 &&
      numberOfBedrooms === '0' &&
      minPrice === '' &&
      maxPrice === '' &&
      minArea === '' &&
      maxArea === ''
    ) {
      // If no filters are applied
      setFilteredListings(listings)
    } else {
      const NewData = listings.filter((listing) => {
        // Please Keep in mind that this is a very simple filter logic and i know, that
        // the filtering logic should be done on the backend and not on the client side especially if the data is large

        // NOTE:
        // გაფილტვრის შედეგად დაბრუნდება მხოლოდ ის ლისტინგები,
        // რომლებიც დააკმაყოფილებს ერთ-ერთ კრიტერიუმს მაინც
        return (
          // Filter by Regions (if any regions are selected)
          (selectedRegions.length === 0 ||
            selectedRegions.some(
              (region) => region.id === listing.city.region.id
            )) &&
          // Filter by Bedrooms (if a bedroom filter is selected)
          (numberOfBedrooms === '0' ||
            listing.bedrooms === parseInt(numberOfBedrooms)) &&
          // Filter by Price (if price filters are selected)
          (minPrice === '' || listing.price >= parseInt(minPrice)) &&
          (maxPrice === '' || listing.price <= parseInt(maxPrice)) &&
          // Filter by Area (if area filters are selected)
          (minArea === '' || listing.area >= parseInt(minArea)) &&
          (maxArea === '' || listing.area <= parseInt(maxArea))
        )
      })
      setFilteredListings(NewData)
    }
  }

  useEffect(() => {
    filterListings()
  }, [selectedRegions, numberOfBedrooms, minPrice, maxPrice, minArea, maxArea])

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="border-main-primary-gray-border flex w-auto items-center gap-6 rounded-[10px] border p-[6px]">
          {/* 

		Very Simple Logic:

		Every Filter has its own Number if number of active filter is equal to the number of the filter
		then the dropdown will be active otherwise it will be inactive

		TODO: This Logic can be improved by having a state for each filter and then toggling the state
		But it is not heavy on the Device to render this simple Element
			
		*/}
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
        </div>
        <div className="flex items-center justify-center gap-4">
          <CtaL
            ctaText="ლისტინგის დამატება"
            type={CtaTypes.primary}
            onClickHandler={() => navigate('/add-listing')}
          />
          <CtaL
            ctaText="აგენტის დამატება"
            type={CtaTypes.secondary}
            onClickHandler={() => setIsAgentPopupActive(true)}
          />
        </div>
      </div>
      <div className="mt-4 inline-flex h-[29px] items-center justify-center gap-4">
        {selectedRegions.map((region) => (
          <FilterDisplayText
            key={region.id}
            text={region.name}
            onClickHandler={() =>
              setSelectedRegions(
                selectedRegions.filter(
                  (selectedRegion) => selectedRegion !== region
                )
              )
            }
          />
        ))}
        {(maxArea !== '' || minArea !== '') && (
          <FilterDisplayText
            text={
              minArea !== '' && maxArea !== ''
                ? `${minArea}მ² - ${maxArea}მ²`
                : minArea !== ''
                  ? `${minArea}მ² - დან`
                  : maxArea !== ''
                    ? `მდე - ${maxArea}მ²`
                    : ''
            }
            onClickHandler={() => {
              setMinArea('')
              setMaxArea('')
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
              setMinPrice('')
              setMaxPrice('')
            }}
          />
        )}
        {numberOfBedrooms !== '0' && (
          <FilterDisplayText
            text={numberOfBedrooms}
            onClickHandler={() => setNumberOfBedrooms('0')}
          />
        )}
        <p
          className={`main-text-sm-100 cursor-pointer ${
            selectedRegions.length !== 0 ||
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
      <div className="mt-8 flex flex-wrap items-center justify-center gap-5 pb-[300px]">
        {filteredListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
      <AddAgentFullscreenPopup
        isActive={isAgentPopupActive}
        setIsActiveState={setIsAgentPopupActive}
      />
    </>
  )
}

export default ListingPage
