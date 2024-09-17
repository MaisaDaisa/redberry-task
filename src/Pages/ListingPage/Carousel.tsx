import { useCallback, useState } from 'react'
import ListingCard from '@/components/ListingCard'
import arrowLeft from '@/assets/svg/arrowLeft.svg'
import { realEstateMany } from '@/api/apiTypes'

interface CarouselProps {
  recommendedListings: realEstateMany[]
}

const Carousel = ({ recommendedListings }: CarouselProps) => {
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0)
  // Constants for the carousel
  // Width of each carousel item plus the gap between them
  const carouselItemWidth = 404
  // Maximum number of items in the carousel
  const carouselMaxItems = recommendedListings?.length || 0
  // Number to increment the index by
  const increment = 4

  // Function to handle left click, decrease index
  const handleCarouselLeft = () => {
    setCurrentCarouselIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - increment : carouselMaxItems - increment
    )
  }

  // Function to handle right click, increase index
  const handleCarouselRight = useCallback(() => {
    setCurrentCarouselIndex((prevIndex) =>
      prevIndex < carouselMaxItems - increment ? prevIndex + increment : 0
    )
  }, [carouselMaxItems])

  if (recommendedListings.length === 0) return null
  return (
    <div className="h- mt-[53px] w-full">
      <h2 className="main-text-3xl-100">ბინები მსგავს ლოკაციაზე</h2>
      <div className="relative mt-[52px] flex w-full items-center">
        {/* Left Arrow */}
        <img
          src={arrowLeft}
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
            {recommendedListings?.map((listing) => (
              <ListingCard listing={listing} />
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <img
          src={arrowLeft}
          alt="go-right"
          className="absolute -right-[65px] z-10 rotate-180 cursor-pointer"
          onClick={handleCarouselRight}
        />
      </div>
    </div>
  )
}

export default Carousel
