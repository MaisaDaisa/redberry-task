import Tag from '@/components/Tag'

interface isRentalProps {
  isRental: boolean
  customClass?: string
}

// This component is used to display a tag that shows if a listing is for sale or for rent
const IsRental = ({ isRental, customClass = '' }: isRentalProps) => {
  return isRental ? (
    <Tag text="ქირავდება" customClass={customClass} />
  ) : (
    <Tag text="იყიდება" customClass={customClass} />
  )
}

export default IsRental
