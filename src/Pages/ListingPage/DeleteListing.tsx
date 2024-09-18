import {
  forwardRef,
  useState,
  MutableRefObject,
  useCallback,
  useImperativeHandle,
} from 'react'
import { CtaTypes } from '@/components/Cta'
import Cta from '@/components/Cta'
import { deleteListing } from '@/api/deleteRequests'
import { useNavigate } from 'react-router-dom'
import FullScreenBlur from '@/components/Layout/FullScreenBlur'

interface DeleteListingProps {
  activateDeleteListingRef: MutableRefObject<any>
  id: string | null
}

const DeleteListing = forwardRef<HTMLDivElement, DeleteListingProps>(
  ({ activateDeleteListingRef, id }, ref) => {
    const [displayDeleteListing, setDisplayDeleteListing] = useState(false)

    const activateDeleteListing = useCallback(() => {
      setDisplayDeleteListing(true)
    }, [])

    useImperativeHandle(activateDeleteListingRef, () => {
      return { activateDeleteListing: activateDeleteListing }
    })

    const handleDeleteListing = useCallback(() => {
      if (id) deleteListing(id.toString()).then(() => navigate('/'))
    }, [])

    const navigate = useNavigate()
    return (
      <FullScreenBlur
        isActive={displayDeleteListing}
        setActiveState={setDisplayDeleteListing}
      >
        <section
          className="relative flex h-[222px] w-[623px] flex-shrink-0 items-center justify-center rounded-[20px] bg-primary-white shadow-primary-shadow"
          onMouseDown={(e) => e.stopPropagation()}
          ref={ref}
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
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
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
        </section>
      </FullScreenBlur>
    )
  }
)

export default DeleteListing
