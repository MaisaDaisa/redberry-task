import React from 'react'
import xDelete from '../../../assets/svg/x-delete.svg'

type FilterDisplayTextProps = {
  text: string
  setState?: React.Dispatch<React.SetStateAction<null>>
  onClickHandler: () => void
}

const FilterDisplayText = ({
  text,
  onClickHandler,
}: FilterDisplayTextProps) => {
  return (
    <div className="flex gap-1 rounded-full border border-primary-gray-border px-[10px] py-[6px]">
      <p className="main-text-sm-80 select-none">{text}</p>
      <img
        className="cursor-pointer"
        src={xDelete}
        alt="delete"
        width={14}
        height={14}
        onClick={onClickHandler}
      />
    </div>
  )
}

export default FilterDisplayText
