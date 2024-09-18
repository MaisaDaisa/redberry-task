import CtaL from '@/components/CtaL'
import { CtaTypes } from '@/components/Cta'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useBeforeUnload, useNavigate } from 'react-router-dom'
import AddAgentFullscreenPopup, {
  SetAddAgentActiveRef,
} from '@/components/AddAgentFullscreenPopup'
import { realEstateMany, region } from '@/api/apiTypes'
import { getAllListings } from '@/api/getRequests'
import DisplayListings from '@/Pages/MainPage/DisplayListings'
import FilterWrapper from './Filter/Filter'
import FilterDisplay, {
  FilterDisplayRef,
} from './Filter/FilterDisplay/FilterDisplay'

export type FilterType = {
  selectedRegions: region[]
  minPrice: string
  maxPrice: string
  minArea: string
  maxArea: string
  numberOfBedrooms: string
}

const MainPage = () => {
  // Navigation Control
  const navigate = useNavigate()

  // Refs for invoking functions from child components
  const setActiveRef = useRef<SetAddAgentActiveRef>(null)
  const rerenderFilets = useRef<FilterDisplayRef>(null)

  // Listing Control
  const [listings, setListings] = useState<realEstateMany[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const invokeFilterListingsRef = useRef<{ filterListings: () => void } | null>(
    null
  )

  // Filter Control
  const FilterRef = useRef<FilterType>({
    selectedRegions: [],
    minPrice: '',
    maxPrice: '',
    minArea: '',
    maxArea: '',
    numberOfBedrooms: '0',
  })

  // Clear Filter
  const handleClear = () => {
    invokeFilterListingsRef.current?.filterListings()
  }

  // When the user confirms the filter
  const handleOnConfirm = () => {
    invokeFilterListingsRef.current?.filterListings()
    rerenderFilets.current?.rerenderFilterDisplay()
  }

  // Saving the data to the local storage when page is unloaded
  useBeforeUnload(
    useCallback(() => {
      localStorage.filterInputs = JSON.stringify({
        minPrice: FilterRef.current.minPrice,
        maxPrice: FilterRef.current.maxPrice,
        minArea: FilterRef.current.minArea,
        maxArea: FilterRef.current.maxArea,
        numberOfBedrooms: FilterRef.current.numberOfBedrooms,
      })
      localStorage.selectedRegions = JSON.stringify(
        FilterRef.current.selectedRegions
      )
    }, [FilterRef])
  )

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get Listings
        const AllListings: realEstateMany[] = await getAllListings()
        setListings(AllListings)

        // Get Filter Data from local storage
        const savedData = localStorage.filterInputs
        const savedRegions = localStorage.selectedRegions
        if (savedData) {
          const parsedData = JSON.parse(savedData)
          FilterRef.current.minPrice = parsedData.minPrice
          FilterRef.current.maxPrice = parsedData.maxPrice
          FilterRef.current.minArea = parsedData.minArea
          FilterRef.current.maxArea = parsedData.maxArea
          FilterRef.current.numberOfBedrooms = parsedData.numberOfBedrooms
        }
        if (savedRegions) {
          FilterRef.current.selectedRegions = JSON.parse(savedRegions)
        }

        // Set loading to false
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching FilterRef:', error)
      }
    }
    fetchListings()
  }, [])

  const handleActivateAgentPopup = useCallback(() => {
    if (setActiveRef.current) {
      setActiveRef.current.setActive(true)
    }
  }, [])

  if (isLoading) return null

  return (
    <>
      <div className="flex items-center justify-between">
        {/* Filter Wrapper to display filter options */}
        <FilterWrapper FiltersRef={FilterRef} onConfirm={handleOnConfirm} />
        {/* Add Listing and Add Agent CTA */}
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
      {/* Filter Display to display active filters */}
      <FilterDisplay
        FilterRef={FilterRef}
        onClear={() => handleClear()}
        ref={rerenderFilets}
      />
      {/* Display Listings to display Listings Cars*/}
      <DisplayListings
        FilterRef={FilterRef}
        allListings={listings}
        ref={invokeFilterListingsRef}
      />
      {/* Invisible component hidden by default until state updated */}
      <AddAgentFullscreenPopup ref={setActiveRef} />
    </>
  )
}

export default MainPage
