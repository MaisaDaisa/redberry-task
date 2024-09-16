import Cta from '@/components/Cta'
import { CtaTypes } from '@/components/Cta'

interface CtaLProps {
  ctaText: string
  type?: CtaTypes
  onClickHandler: () => void
}

const CtaL = ({
  ctaText,
  type = CtaTypes.primary,
  onClickHandler,
}: CtaLProps) => {
  return (
    <Cta
      ctaText={ctaText}
      onClickHandler={onClickHandler}
      type={type}
      textClass="main-text-customCLR"
      customPaddings="px-4 py-[10px] h-[47px]"
    >
      <svg
        className={`h-[22px] w-[22px] transition-all duration-300 ${
          type === CtaTypes.primary
            ? 'fill-primary-white'
            : 'fill-primary-orange group-hover:fill-primary-white'
        }`}
        viewBox="0 0 22 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="ic:round-plus">
          <path
            id="Vector"
            d="M16.5002 12.4144H11.9168V16.9977C11.9168 17.2408 11.8203 17.474 11.6483 17.6459C11.4764 17.8178 11.2433 17.9144 11.0002 17.9144C10.757 17.9144 10.5239 17.8178 10.352 17.6459C10.1801 17.474 10.0835 17.2408 10.0835 16.9977V12.4144H5.50016C5.25705 12.4144 5.02389 12.3178 4.85198 12.1459C4.68007 11.974 4.5835 11.7408 4.5835 11.4977C4.5835 11.2546 4.68007 11.0214 4.85198 10.8495C5.02389 10.6776 5.25705 10.5811 5.50016 10.5811H10.0835V5.99772C10.0835 5.75461 10.1801 5.52145 10.352 5.34954C10.5239 5.17763 10.757 5.08105 11.0002 5.08105C11.2433 5.08105 11.4764 5.17763 11.6483 5.34954C11.8203 5.52145 11.9168 5.75461 11.9168 5.99772V10.5811H16.5002C16.7433 10.5811 16.9764 10.6776 17.1483 10.8495C17.3203 11.0214 17.4168 11.2546 17.4168 11.4977C17.4168 11.7408 17.3203 11.974 17.1483 12.1459C16.9764 12.3178 16.7433 12.4144 16.5002 12.4144Z"
          />
        </g>
      </svg>
    </Cta>
  )
}

export default CtaL
