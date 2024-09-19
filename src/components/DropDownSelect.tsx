import { useState, memo } from 'react'
import arrowIcon from '@/assets/svg/filterarrow.svg'
import TitleH4Component from '@/components/TitleH4Component'
import { agentGetMany, cityGet, region } from '@/api/apiTypes'

interface DropDownSelectProps {
  additionalComponent?: JSX.Element
  items: agentGetMany[] | cityGet[] | region[]
  title: string
  required?: boolean
  isAgents?: boolean
  parentStateSetter: (value: any) => void
  selectedValue?: agentGetMany | cityGet | region | null
  placeHolderText?: string
  isRejected: boolean
}

const DropDownSelect = memo(
  ({
    isRejected,
    placeHolderText = 'Select an Item',
    selectedValue = null,
    isAgents = false,
    additionalComponent,
    items,
    title,
    required = false,
    parentStateSetter,
  }: DropDownSelectProps) => {
    // State to store the selected item
    const [selected, setSelected] = useState<
      agentGetMany | cityGet | region | null
    >(selectedValue)
    // State to toggle the dropdown to active or inactive
    const [toggleCombo, setToggleCombo] = useState(false)

    const handleSelectedItem = (item: agentGetMany | cityGet | region) => {
      setSelected(item)
      setToggleCombo(false)
      parentStateSetter(item)
    }

    return (
      <TitleH4Component title={title} required={required}>
        <div className="relative w-full">
          <div
            onClick={() => setToggleCombo(!toggleCombo)}
            className={`flex cursor-pointer justify-between rounded-t-md border ${isRejected && selectedValue === null ? 'border-invalid-red' : 'border-primary-gray-border'} p-[10px] ${
              !toggleCombo ? 'rounded-b-md' : 'border-b-0'
            }`}
          >
            <span className="main-text-sm-100-400">
              {selected ? (
                isAgents && 'surname' in selected ? (
                  `${selected.name} ${selected.surname}`
                ) : (
                  selected.name
                )
              ) : (
                <span className="main-text-sm-40-400">{placeHolderText}</span>
              )}
            </span>
            <img
              src={arrowIcon}
              alt="arrow"
              className={`transition-all duration-300 ${
                toggleCombo ? '-rotate-180' : 'rotate-0'
              }`}
            />
          </div>
          {toggleCombo && (
            <ul className="absolute z-10 w-full rounded-b-md border border-primary-gray-border">
              {additionalComponent}
              {items.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleSelectedItem(item)}
                  className="main-text-sm-100-400 cursor-pointer border-b-[1px] border-primary-gray-border bg-primary-white p-[10px] hover:bg-blue-100"
                >
                  {item.name}{' '}
                  {isAgents && 'surname' in item && `${item.surname}`}
                </li>
              ))}
            </ul>
          )}
        </div>
        <input type="hidden" value={selected ? selected.name : ''} />
      </TitleH4Component>
    )
  },
  (prevProps, nextProps) => {
    return (
      prevProps.isRejected === nextProps.isRejected &&
      prevProps.selectedValue === nextProps.selectedValue
    )
  }
)

export default DropDownSelect
