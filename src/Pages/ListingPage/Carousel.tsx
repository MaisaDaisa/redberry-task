import { useState } from 'react'
import ListingCard from '@/components/ListingCard'
import arrowLeft from '@/assets/svg/arrowLeft.svg'
import { realEstateMany } from '@/api/apiTypes'

interface CarouselProps {
  recommendedListings: realEstateMany[]
}

const Carousel = ({ recommendedListings }: CarouselProps) => {
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0)

  // Constants for the carousel
  const carouselItemWidth = 404 // Width of each carousel item plus gap
  const carouselMaxItems = recommendedListings?.length || 0
  const increment = 4 // Number to increment by

  // Function to handle left click (decrease index)
  const handleCarouselLeft = () => {
    setCurrentCarouselIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - increment : carouselMaxItems - increment
    )
  }

  // Function to handle right click (increase index)
  const handleCarouselRight = () => {
    setCurrentCarouselIndex((prevIndex) =>
      prevIndex < carouselMaxItems - increment ? prevIndex + increment : 0
    )
  }

  if (recommendedListings.length === 0) return null

  return (
    <div className="mt-[53px] w-full">
      <h2 className="main-text-3xl-100">ბინები მსგავს ლოკაციაზე</h2>
      <div className="relative mt-[52px] flex w-full items-center">
        {/* Left Arrow */}
        <img
          src={arrowLeft}
          key={'left'}
          alt="go-left"
          className="absolute -left-[65px] z-10 cursor-pointer"
          onClick={handleCarouselLeft}
        />

        {/* Carousel Container */}
        <div className="w-full overflow-hidden">
          <div
            className="flex gap-5 transition-transform duration-500 ease-in-out"
            style={{
              width: `${carouselItemWidth * carouselMaxItems}px`,
              transform: `translateX(-${
                currentCarouselIndex * carouselItemWidth
              }px)`,
            }}
          >
            {/* NOTE: Keep in mind the spread operator will not work due to 
            the limitations carouselMaxItems for testing purposes multiply 
            the constant by the amount of times you used the spread operator */}
            {recommendedListings.map((listing, index) => (
              <ListingCard key={listing.id || index} listing={listing} />
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <img
          src={arrowLeft}
          alt="go-right"
          key={'right'}
          className="absolute -right-[65px] z-10 rotate-180 cursor-pointer"
          onClick={handleCarouselRight}
        />
      </div>
    </div>
  )
}

export default Carousel
