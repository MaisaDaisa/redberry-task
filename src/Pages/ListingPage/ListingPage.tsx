import { useCallback, useEffect, useState } from 'react'
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
import FullScreenBlur from '@/components/Layout/FullScreenBlur'
import { deleteListing } from '@/api/deleteRequests'
import Carousel from './Carousel'

const ListingPage = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [displayDeleteListing, setDisplayDeleteListing] = useState(false)
  const [recommendedListings, setRecommendedListings] = useState<
    realEstateMany[] | null
  >(null)
  const [specificListing, setSpecificListing] = useState<realEstateOne | null>(
    null
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the specific listing by id
        if (id && checkNumbers(id)) {
          const specificListingResponse = await getListingById(id)
          console.log(specificListingResponse) // Debugging
          setSpecificListing(specificListingResponse)
          getAllListings().then((allCities: realEstateMany[]) => {
            console.log(allCities) // Debugging
            if (allCities.length > 0 && specificListingResponse) {
              let recommendedListings = allCities.filter((listing) => {
                console.log(listing)
                console.log(specificListing)
                return (
                  listing.city.region_id ===
                    specificListingResponse?.city.region_id &&
                  listing.id !== specificListingResponse.id
                )
              })
              setRecommendedListings(recommendedListings)
            }
          })
        }

        // Fetch all listings and filter the ones that are in the same region
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (specificListing === null) {
      fetchData()
    }
  }, [id, specificListing])

  const navigate = useNavigate()

  const handleBackClick = useCallback(() => {
    navigate('/')
  }, [navigate])

  const handleDeleteListing = useCallback(() => {
    if (id) deleteListing(id.toString()).then(() => navigate('/'))
  }, [])

  let agent = specificListing?.agent
  let phoneNumber = specificListing?.agent.phone
  let listingDate = new Date(specificListing?.created_at ?? '')

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
              {specificListing?.is_rental ? 'ქირავდება' : 'იყიდება'}
            </p>
          </div>
          <img
            src={specificListing?.image}
            alt="listing image"
            className="h-[670px] w-[839px] rounded-t-[14px] bg-no-repeat object-cover"
          />
          <div className="mt-[9px] flex flex-row flex-nowrap gap-[10px]">
            <p className="gray-text">გამოქვეყნების თარიღი:</p>
            <p className="gray-text">{formatDate(listingDate)}</p>
          </div>
        </div>
        {specificListing && (
          <div className="flex h-[714px] w-[503px] flex-col gap-10 pt-[30px]">
            <div className="flex flex-col items-start gap-6">
              <h2 className="main-text-5xl-100">
                {specificListing?.price &&
                  formatPriceWithCommas(specificListing?.price)}{' '}
                ₾
              </h2>
              <div className="flex flex-col gap-4">
                <div className="flex flex-row items-center gap-1">
                  <div className="flex h-[22px] w-[22px] items-center justify-center">
                    <img src={locationIcon} alt="icon" />
                  </div>
                  <p className="gray-text-2xl">
                    {specificListing?.city.name}, {specificListing?.address}
                  </p>
                </div>
                <div className="flex flex-row items-center gap-1">
                  <div className="flex h-[22px] w-[22px] items-center justify-center">
                    <img src={sizeIcon} alt="icon" />
                  </div>
                  <p className="gray-text-2xl">
                    ფართობი {specificListing?.area} მ<sup>2</sup>
                  </p>
                </div>
                <div className="flex flex-row items-center gap-1">
                  <div className="flex h-[22px] w-[22px] items-center justify-center">
                    <img src={bedIcon} alt="icon" />
                  </div>
                  <p className="gray-text-2xl">
                    საძინებელი {specificListing?.bedrooms}
                  </p>
                </div>
                <div className="flex flex-row items-center gap-1">
                  <div className="flex h-[22px] w-[22px] items-center justify-center">
                    <img src={zipCodeIcon} alt="icon" />
                  </div>
                  <p className="gray-text-2xl">
                    საფოსტო ინდექსი {specificListing?.zip_code}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[50px]">
              <p className="gray-text">{specificListing?.description}</p>
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
                <Cta
                  ctaText="ლისტინგის წაშლა"
                  type={CtaTypes.gray}
                  onClickHandler={() => setDisplayDeleteListing(true)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {recommendedListings !== null ? (
        <Carousel recommendedListings={recommendedListings} />
      ) : null}

      {/* Hidden Section of the page that will be displayed as a popup */}
      <FullScreenBlur
        isActive={displayDeleteListing}
        setActiveState={setDisplayDeleteListing}
      >
        <div
          className="relative flex h-[222px] w-[623px] flex-shrink-0 items-center justify-center rounded-[20px] bg-primary-white shadow-primary-shadow"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="47"
            height="47"
            viewBox="0 0 47 47"
            fill="none"
            className="absolute right-[13px] top-[6px] cursor-pointer"
            onClick={() => setDisplayDeleteListing(false)}
          >
            <path
              d="M23.5011 23.4999L29.0401 29.0389M17.9622 29.0389L23.5011 23.4999L17.9622 29.0389ZM29.0401 17.9609L23.5011 23.4999L29.0401 17.9609ZM23.5011 23.4999L17.9622 17.9609L23.5011 23.4999Z"
              stroke="#2D3648"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div className="flex flex-col items-center">
            <h4 className="main-text-xl-100-400">გსურთ წაშალოთ ლისტინგი?</h4>
            <div className="mt-[35px] flex flex-row gap-[15px]">
              <Cta
                textClass="main-text-customCLR"
                ctaText="გაუქმება"
                type={CtaTypes.secondary}
                onClickHandler={() => setDisplayDeleteListing(false)}
              />
              <Cta
                textClass="main-text-customCLR"
                ctaText="დადასტურება"
                type={CtaTypes.primary}
                onClickHandler={() => handleDeleteListing()}
              />
            </div>
          </div>
        </div>
      </FullScreenBlur>
    </div>
  )
}

export default ListingPage
