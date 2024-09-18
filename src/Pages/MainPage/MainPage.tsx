import CtaL from '@/components/CtaL'
import { CtaTypes } from '@/components/Cta'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useBeforeUnload, useNavigate } from 'react-router-dom'
import AddAgentFullscreenPopup from '@/components/AddAgentFullscreenPopup'
import { realEstateMany, region } from '@/api/apiTypes'
import { getAllListings } from '@/api/getRequests'
import DisplayListings from '@/Pages/MainPage/DisplayListings'
import FilterWrapper from './Filter/Filter'
import FilterDisplay from './Filter/FilterDisplay/FilterDisplay'

export type FilterType = {
  selectedRegions: region[]
  minPrice: string
  maxPrice: string
  minArea: string
  maxArea: string
  numberOfBedrooms: string
}

export type rerenderFiltersType = {
  rerenderFilterDisplay: () => void
} | null

const MainPage = () => {
  const navigate = useNavigate()
  // Agent Popup Control
  const setActiveRef = useRef<{ setActive: (value: boolean) => void } | null>(
    null
  )
  // Listing Control
  const [listings, setListings] = useState<realEstateMany[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const invokeFilterListingsRef = useRef<{ filterListings: () => void } | null>(
    null
  )
  const rerenderFilets = useRef<rerenderFiltersType>(null)
  // Filter Control
  const FilterRef = useRef<FilterType>({
    selectedRegions: [],
    minPrice: '',
    maxPrice: '',
    minArea: '',
    maxArea: '',
    numberOfBedrooms: '0',
  })

  const handleClear = () => {
    invokeFilterListingsRef.current?.filterListings()
  }

  const handleOnConfirm = () => {
    invokeFilterListingsRef.current?.filterListings()
    rerenderFilets.current?.rerenderFilterDisplay()
  }

  useBeforeUnload(
    useCallback(() => {
      // Saving the data to the local storage when page is unloaded
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
        const savedData = localStorage.filterInputs
        const savedRegions = localStorage.selectedRegions
        if (savedData) {
          const parsedData = JSON.parse(savedData)
          FilterRef.current.minPrice = parsedData.minPrice
          FilterRef.current.maxPrice = parsedData.maxPrice
          FilterRef.current.minArea = parsedData.minArea
          FilterRef.current.maxArea = parsedData.maxArea
        }
        if (savedRegions) {
          FilterRef.current.selectedRegions = JSON.parse(savedRegions)
        }
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
        <FilterWrapper FiltersRef={FilterRef} onConfirm={handleOnConfirm} />

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

      <FilterDisplay
        FilterRef={FilterRef}
        onClear={() => handleClear()}
        rerenderFilters={rerenderFilets}
      />

      {/* Display Listings here */}
      <DisplayListings
        FilterRef={FilterRef}
        allListings={listings}
        invokeFilterListingsRef={invokeFilterListingsRef}
      />

      {/* Invisible component hidden by default until state updated */}
      <AddAgentFullscreenPopup setActiveRef={setActiveRef} />
    </>
  )
}

export default MainPage
