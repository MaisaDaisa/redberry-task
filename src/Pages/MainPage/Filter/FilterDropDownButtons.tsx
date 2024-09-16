import arrowIcon from '../../../assets/svg/filterarrow.svg'
import React, { memo } from 'react'

interface FilterDropDownButtonsProps {
  filterText: string
  isActive?: boolean
  handleSetActive: () => void
  children?: React.ReactNode
  dropDownTitle?: string
}

const FilterDropDownButtons = memo(
  ({
    filterText,
    isActive = false,
    handleSetActive,
    children,
    dropDownTitle,
  }: FilterDropDownButtonsProps) => {
    return (
      <div>
        <div
          className={`relative flex cursor-pointer items-center justify-center gap-1 px-[14px] py-2 transition-all duration-300 ${
            isActive ? 'rounded-[6px] bg-secondary-gray-background' : ''
          }`}
          onClick={handleSetActive}
        >
          <p className="main-text select-none">{filterText}</p>
          <img
            src={arrowIcon}
            alt="arrow"
            className={`select-none transition-all duration-300 ${isActive ? '-rotate-180' : 'rotate-0'}`}
          />
        </div>

        {
          // Dropdown content with fade-in effect
          <div
            className={`absolute z-10 flex translate-y-4 transform flex-col items-end gap-8 self-start justify-self-start rounded-[10px] border border-primary-gray-border bg-primary-white p-6 shadow-primary-shadow transition-opacity duration-500 ease-in-out ${isActive ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
          >
            <p className="main-text self-start">{dropDownTitle}</p>
            {/* Children here as dropdown content this will better to avoid prop drilling */}
            {children}
          </div>
        }
      </div>
    )
  }
)

export default FilterDropDownButtons
