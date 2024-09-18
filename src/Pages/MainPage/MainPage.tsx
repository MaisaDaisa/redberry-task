import CtaL from '@/components/CtaL'
import { CtaTypes } from '@/components/Cta'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AddAgentFullscreenPopup from '@/components/AddAgentFullscreenPopup'
import { realEstateMany, region } from '@/api/apiTypes'
import { getAllListings, getRegions } from '@/api/getRequests'
import FilterDropDownButtons from '@/Pages/MainPage/Filter/FilterDropDownButtons'
import RangePicker, { PostFixTypesEnum } from '@/components/RangePicker'
import FilterDropDownRegion from '@/Pages/MainPage/Filter/FilterDropDownSections/FilterDropDownRegion'
import FilterDropDownBedrooms from '@/Pages/MainPage/Filter/FilterDropDownSections/FilterDropDownBedrooms'
import DisplayListings from '@/Pages/MainPage/DisplayListings'
import FilterDisplayText from '@/Pages/MainPage/Filter/FilterDisplayText'
import FilterWrapper from './Filter/Filter'

const ListingPage = () => {
  const navigate = useNavigate()
  // Agent Popup Control
  const setActiveRef = useRef<{ setActive: (value: boolean) => void } | null>(
    null
  )
  // Listing Control
  const listings = useRef<realEstateMany[]>([])
  const [filteredListings, setFilteredListings] = useState<realEstateMany[]>([])

  // Regions
  const [selectedRegions, setSelectedRegions] = useState<region[]>([])
  // Dropdown Filters State, 0 means no filter is active
  const [activeFilters, setActiveFilters] = useState<number>(0)
  // Filters Data
  const [numberOfBedrooms, setNumberOfBedrooms] = useState<string>('0')
  // Price
  const [minPrice, setMinPrice] = useState<string>('')
  const [maxPrice, setMaxPrice] = useState<string>('')
  // Area
  const [minArea, setMinArea] = useState<string>('')
  const [maxArea, setMaxArea] = useState<string>('')
  // FilterBy

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get Listings
        const AllListings: realEstateMany[] = await getAllListings()
        listings.current = AllListings
        setFilteredListings(AllListings)
        // Get Regions
        const regionsResponse: region[] = await getRegions()
        regionsData.current = regionsResponse
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchListings()
  }, [])

  const handleActivateAgentPopup = useCallback(() => {
    if (setActiveRef.current) {
      setActiveRef.current.setActive(true)
    }
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
    setFilteredListings(listings.current)
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
      // If no filters are applied, return all listings
      setFilteredListings(listings.current)
    } else {
      const NewData = listings.current.filter((listing) => {
        // Filter by Regions
        const regionMatch =
          selectedRegions.length !== 0 &&
          selectedRegions.some((region) => region.id === listing.city.region.id)

        // Filter by Bedrooms
        const bedroomMatch = numberOfBedrooms !== '0'
        listing.bedrooms === parseInt(numberOfBedrooms)

        // Filter by Price
        const minPriceMatch =
          minPrice !== '' && listing.price >= parseInt(minPrice)
        const maxPriceMatch =
          maxPrice !== '' && listing.price <= parseInt(maxPrice)

        const priceMatch = minPriceMatch || maxPriceMatch

        // Filter by Area
        const minAreaMatch = minArea !== '' && listing.area >= parseInt(minArea)
        const maxAreaMatch = maxArea !== '' && listing.area <= parseInt(maxArea)

        const areaMatch = minAreaMatch || maxAreaMatch

        console.log(
          `Region: ${regionMatch}, Bedrooms: ${bedroomMatch}, Price: ${priceMatch}, Area: ${areaMatch}`
        )
        /*

        გაფილტვრის შედეგად დაბრუნდება მხოლოდ ის
        ლისტინგები, რომლებიც დააკმაყოფილებს ერთ-ერთ კრიტერიუმს მაინც

        */
        // Return listings that satisfy at least one of the conditions
        return regionMatch || bedroomMatch || priceMatch || areaMatch
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
            NOTE: This Logic can be improved by having a state for each filter and then toggling the state
            But it is not heavy on the Device to render this simple Element    
		    */}
         <FilterWrapper
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
            onClickHandler={() => handleActivateAgentPopup()}
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
      {/* Display Listings here */}
      <DisplayListings filteredListings={filteredListings} />

      {/* Invisible component hidden by default until state updated */}
      <AddAgentFullscreenPopup setActiveRef={setActiveRef} />
    </>
  )
}

export default ListingPage
