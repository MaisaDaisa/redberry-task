import LocationIcon from '@/assets/svg/location-marker.svg'
import Bed from '@/assets/svg/bed.svg'
import Size from '@/assets/svg/Size.svg'
import ZipCodeIcon from '@/assets/svg/ZipCode.svg'
import { realEstateMany } from '@/api/apiTypes'
import { useNavigate } from 'react-router-dom'
import Tag from './Tag'

interface ListingCardProps {
  listing: realEstateMany
}

// ListingCard component

const ListingCard = ({ listing }: ListingCardProps) => {
  const navigate = useNavigate()
  return (
    <article
      onClick={() => console.log(navigate(`/listing/${listing.id}`))}
      className="flex h-[] w-[384px] flex-shrink-0 cursor-pointer flex-col items-start transition-all duration-300 hover:shadow-primary-shadow"
    >
      <div className="relative h-[307px] w-full self-stretch">
        <Tag
          text={listing.is_rental === 1 ? 'ქირავდება' : 'იყიდება'}
          customClass="absolute top-[23px] left-[23px]"
        />
        <img
          src={listing.image}
          alt="Listing"
          className="h-full w-full rounded-t-[14px] object-cover"
        />
      </div>
      <div className="align-stretch flex w-full flex-col items-start justify-center gap-5 rounded-b-[14px] border border-t-0 border-primary-gray-border bg-transparent px-[25px] py-[22px]">
        <div className="flex flex-col items-start gap-[6px] self-stretch bg-transparent">
          <p className="main-text-2xl-100">
            {' '}
            {listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ₾
          </p>
          <div className="flex justify-start gap-1 self-stretch">
            <img
              className="h-5 w-5 flex-shrink-0"
              src={LocationIcon}
              alt="Location marker"
            />
            <p className="main-text-70">
              {listing.city.name}, {listing.address}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-[5px]">
            <img className="h-6 w-6 flex-shrink-0" src={Bed} alt="Bed icon" />
            <p className="main-text-70">{listing.bedrooms}</p>
          </div>
          <div className="flex items-center gap-[5px]">
            <img
              className="h-[18px] w-[18px] flex-shrink-0"
              src={Size}
              alt="Size icon"
            />
            <p className="main-text-70">
              {listing.area} მ<sup>2</sup>
            </p>
          </div>
          <div className="flex items-center gap-[5px]">
            <img
              className="h-4 w-4 flex-shrink-0"
              src={ZipCodeIcon}
              alt="ZipCode icon"
            />
            <p className="main-text-70">{listing.zip_code}</p>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ListingCard
