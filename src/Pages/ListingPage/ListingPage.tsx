import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import arrowLeft from '@/assets/svg/arrowLeft.svg'
import locationIcon from '@/assets/svg/location-marker.svg'
import sizeIcon from '@/assets/svg/Size.svg'
import bedIcon from '@/assets/svg/bed.svg'
import zipCodeIcon from '@/assets/svg/ZipCode.svg'
import phoneIcon from '@/assets/svg/phoneIcon.svg'
import emailIcon from '@/assets/svg/emailIcon.svg'
import Cta, { CtaTypes } from '@/components/Cta'
import { getAllListings, getListingById } from '@/api/getRequests'
import { realEstateMany, realEstateOne } from '@/api/apiTypes'
import { checkNumbers } from '@/lib/validationChecker'
import { formatDate, formatPriceWithCommas } from '@/lib/formatData'
import Carousel from './Carousel'
import DeleteListing, { DeleteListingRef } from './DeleteListing'

const ListingPage = () => {
  // Fetching the id from the URL
  const { idParam } = useParams()

  // Ref for invoking the delete listing popup
  const activateDeleteListing = useRef<DeleteListingRef>(null)

  // State management
  const [isLoading, setIsLoading] = useState(true)
  const [recommendedListings, setRecommendedListings] = useState<
    realEstateMany[] | null
  >(null)
  // the specific listing will not change
  const specificListing = useRef<realEstateOne | null>(null)
  // Ref for the delete listing popup

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the specific listing by id
        if (idParam && checkNumbers(idParam)) {
          // Fetch listing by id
          const specificListingResponse = await getListingById(idParam)
          specificListing.current = specificListingResponse
          // Filter listings by region
          getAllListings().then((allCities: realEstateMany[]) => {
            if (allCities.length > 0 && specificListingResponse) {
              let recommendedListings = allCities.filter((listing) => {
                return (
                  listing.city.region_id ===
                    specificListingResponse?.city.region_id &&
                  listing.id !== specificListingResponse.id
                )
              })
              setRecommendedListings(recommendedListings)
            }
          })
          // Set loading to false
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [idParam, specificListing])

  const navigate = useNavigate()

  const handleBackClick = useCallback(() => {
    navigate('/')
  }, [navigate])

  // Deconstructing for easier access
  let agent = specificListing.current?.agent
  let phoneNumber = specificListing.current?.agent.phone
  let listingDate = new Date(specificListing.current?.created_at ?? '')

  // If data never gets fetched
  // A Page not found component can be displayed here
  // But design didnt have one
  if (isLoading) {
    return <div></div>
  }

  return (
    <div className="mt-16 flex w-full flex-col items-start">
      <div className="cursor-pointer self-start">
        <img
          src={arrowLeft}
          alt="arrow to go back"
          width={32}
          height={32}
          onClick={handleBackClick}
        />
      </div>
      <div className="mt-[29px] flex flex-row justify-start gap-[68px]">
        <div className="relative flex flex-col items-end">
          <div className="absolute left-[41px] top-[41px] flex h-[41px] w-[142px] items-center justify-center rounded-[20px] bg-primary-text-50 p-[6xp]">
            <p className="white-text-xl-500 select-none">
              {specificListing.current?.is_rental ? 'ქირავდება' : 'იყიდება'}
            </p>
          </div>
          <img
            src={specificListing.current?.image}
            alt="listing image"
            className="h-[670px] w-[839px] rounded-t-[14px] bg-no-repeat object-cover"
          />
          <div className="mt-[9px] flex flex-row flex-nowrap gap-[10px]">
            <p className="gray-text">გამოქვეყნების თარიღი:</p>
            <p className="gray-text">{formatDate(listingDate)}</p>
          </div>
        </div>
        {specificListing ? (
          <div className="flex h-[714px] w-[503px] flex-col gap-10 pt-[30px]">
            <div className="flex flex-col items-start gap-6">
              <h2 className="main-text-5xl-100">
                {specificListing.current?.price &&
                  formatPriceWithCommas(specificListing.current?.price)}{' '}
                ₾
              </h2>
              <div className="flex flex-col gap-4">
                <div className="flex flex-row items-center gap-1">
                  <div className="flex h-[22px] w-[22px] items-center justify-center">
                    <img src={locationIcon} alt="icon" />
                  </div>
                  <p className="gray-text-2xl">
                    {specificListing.current?.city.name},{' '}
                    {specificListing.current?.address}
                  </p>
                </div>
                <div className="flex flex-row items-center gap-1">
                  <div className="flex h-[22px] w-[22px] items-center justify-center">
                    <img src={sizeIcon} alt="icon" />
                  </div>
                  <p className="gray-text-2xl">
                    ფართობი {specificListing.current?.area} მ<sup>2</sup>
                  </p>
                </div>
                <div className="flex flex-row items-center gap-1">
                  <div className="flex h-[22px] w-[22px] items-center justify-center">
                    <img src={bedIcon} alt="icon" />
                  </div>
                  <p className="gray-text-2xl">
                    საძინებელი {specificListing.current?.bedrooms}
                  </p>
                </div>
                <div className="flex flex-row items-center gap-1">
                  <div className="flex h-[22px] w-[22px] items-center justify-center">
                    <img src={zipCodeIcon} alt="icon" />
                  </div>
                  <p className="gray-text-2xl">
                    საფოსტო ინდექსი {specificListing.current?.zip_code}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[50px]">
              <p className="gray-text">
                {specificListing.current?.description}
              </p>
              <div className="flex flex-col items-start gap-5">
                <div className="flex h-[172px] w-full flex-col gap-4 self-stretch rounded-lg border border-primary-gray-border px-5 py-6">
                  <div className="flex flex-row items-center gap-[14px]">
                    <img
                      src={agent?.avatar}
                      alt=""
                      className="h-[72px] w-[72px] flex-shrink-0 rounded-full object-cover object-top"
                    />
                    <div className="flex flex-col items-start gap-1">
                      <p className="main-text-100-400">
                        {agent?.name + ' ' + agent?.surname}
                      </p>
                      <p className="gray-text-sm-400">აგენტი</p>
                    </div>
                  </div>
                  <div className="flex flex-col flex-nowrap items-start gap-1">
                    <div className="flex flex-row items-center gap-[5px]">
                      <img
                        src={emailIcon}
                        alt="icon"
                        className="h-[13px] w-4"
                      />
                      <p className="gray-text-sm-400">{agent?.email}</p>
                    </div>
                    <div className="flex flex-row items-center gap-[5px]">
                      <img
                        src={phoneIcon}
                        alt="icon"
                        className="h-[13px] w-4"
                      />
                      <p className="gray-text-sm-400">
                        {`${phoneNumber?.slice(0, 3)} ${phoneNumber?.slice(
                          3,
                          6
                        )} ${phoneNumber?.slice(6)}`}
                      </p>
                    </div>
                  </div>
                </div>
                {/*DESIGN MISGUIDANCE: Gray CTA in section 1 is like this by default, by design this button contains different color and paddings */}
                <Cta
                  ctaText="ლისტინგის წაშლა"
                  type={CtaTypes.gray}
                  onClickHandler={() =>
                    activateDeleteListing.current?.activateDeleteListing()
                  }
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
      {recommendedListings !== null ? (
        <Carousel recommendedListings={recommendedListings} />
      ) : null}

      {/* Hidden Section of the page that will be displayed as a popup */}

      {idParam && <DeleteListing id={idParam} ref={activateDeleteListing} />}
    </div>
  )
}

export default ListingPage
