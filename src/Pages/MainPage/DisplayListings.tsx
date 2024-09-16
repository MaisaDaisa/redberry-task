import ListingCard from '@/components/ListingCard'
import { realEstateMany } from '@/api/apiTypes'
import { memo } from 'react'

interface DisplayListingsProps {
  filteredListings: realEstateMany[]
}

const DisplayListings = memo(
  ({ filteredListings }: DisplayListingsProps) => {
    console.log('DisplayListingsProps rerendered')
    return (
      <div className="justify-left mt-8 flex flex-wrap items-center gap-5 pb-[300px]">
        {filteredListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    )
  },

  (prevProps, nextProps) => {
    return prevProps.filteredListings === nextProps.filteredListings
  }
)
export default DisplayListings
