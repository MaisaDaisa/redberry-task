import ListingCard from '@/components/ListingCard'
import { realEstateMany, region } from '@/api/apiTypes'
import { FilterType } from '@/Pages/MainPage/MainPage'
import {
  forwardRef,
  useEffect,
  useState,
  useImperativeHandle,
  Ref,
} from 'react'

export type DisplayListingsRef = {
  filterListings: () => void
}
interface DisplayListingsProps {
  allListings: realEstateMany[]
  FilterRef: React.MutableRefObject<FilterType>
}

const DisplayListings = (
  { allListings, FilterRef }: DisplayListingsProps,
  ref: Ref<DisplayListingsRef>
) => {
  const [filteredListings, setFilteredListings] = useState<realEstateMany[]>([])

  // The filtering logic based on the FilterRef criteria
  const filterListings = () => {
    if (
      FilterRef.current.selectedRegions.length === 0 &&
      FilterRef.current.numberOfBedrooms === '0' &&
      FilterRef.current.minPrice === '' &&
      FilterRef.current.maxPrice === '' &&
      FilterRef.current.minArea === '' &&
      FilterRef.current.maxArea === ''
    ) {
      // No filters applied, show all listings
      setFilteredListings(allListings)
    } else {
      const filteredData = allListings.filter((listing) => {
        // NORMAL LOGIC
        /*
        // Filter by regions
        const regionMatch =
          FilterRef.current.selectedRegions.length === 0 ||
          FilterRef.current.selectedRegions.some(
            (region: region) => region.id === listing.city.region.id
          )
        // Filter by bedrooms
        const bedroomMatch =
          FilterRef.current.numberOfBedrooms === '0' ||
          listing.bedrooms === parseInt(FilterRef.current.numberOfBedrooms)

        // Filter by price
        const minPriceMatch =
          FilterRef.current.minPrice === '' ||
          listing.price >= parseInt(FilterRef.current.minPrice)
        const maxPriceMatch =
          FilterRef.current.maxPrice === '' ||
          listing.price <= parseInt(FilterRef.current.maxPrice)
        const priceMatch = minPriceMatch && maxPriceMatch

        // Filter by area
        const minAreaMatch =
          FilterRef.current.minArea === '' ||
          listing.area >= parseInt(FilterRef.current.minArea)
        const maxAreaMatch =
          FilterRef.current.maxArea === '' ||
          listing.area <= parseInt(FilterRef.current.maxArea)
        const areaMatch = minAreaMatch && maxAreaMatch

        return regionMatch && bedroomMatch && priceMatch && !areaMatch
        */

        // OR LOGIC
        // გაფილტვრის შედეგად დაბრუნდება მხოლოდ
        // ის ლისტინგები, რომლებიც დააკმაყოფილებს ერთ-ერთ კრიტერიუმს მაინც.

        // Filter by regions
        const regionMatch =
          FilterRef.current.selectedRegions.length !== 0 &&
          FilterRef.current.selectedRegions.some(
            (region: region) => region.id === listing.city.region.id
          )
        // Filter by bedrooms
        const bedroomMatch =
          FilterRef.current.numberOfBedrooms !== '0' &&
          listing.bedrooms === parseInt(FilterRef.current.numberOfBedrooms)

        // Filter by price
        const minPriceMatch =
          FilterRef.current.minPrice !== '' &&
          listing.price >= parseInt(FilterRef.current.minPrice)
        const maxPriceMatch =
          FilterRef.current.maxPrice !== '' &&
          listing.price <= parseInt(FilterRef.current.maxPrice)
        const priceMatch = minPriceMatch || maxPriceMatch

        // Filter by area
        const minAreaMatch =
          FilterRef.current.minArea !== '' &&
          listing.area >= parseInt(FilterRef.current.minArea)
        const maxAreaMatch =
          FilterRef.current.maxArea !== '' &&
          listing.area <= parseInt(FilterRef.current.maxArea)
        const areaMatch = minAreaMatch || maxAreaMatch

        return regionMatch || bedroomMatch || priceMatch || areaMatch
      })

      setFilteredListings(filteredData)
    }
  }

  // Expose filterListings to the parent through the ref
  useImperativeHandle(ref, () => {
    return { filterListings: filterListings }
  })

  // Initial listing load (display all listings if no filters are applied initially)
  useEffect(() => {
    filterListings()
  }, [allListings])

  return (
    <div className="justify-left mt-8 flex flex-wrap items-center gap-5 pb-[300px]">
      {filteredListings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  )
}

export default forwardRef(DisplayListings)
