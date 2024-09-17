import { formatPriceWithCommas } from '@/lib/formatData'
import React, { memo, useCallback, useState } from 'react'
import { checkNumbers } from '@/lib/validationChecker'
import FilterConfirmButton from '@/Pages/MainPage/Filter/FilterConfirmButton'

export enum PostFixTypesEnum {
  GEL,
  areaSize,
}

interface RangePickerProps {
  postFixType: PostFixTypesEnum
  minValueState: string
  maxValueState: string
  setMinValue: (value: string) => void
  setMaxValue: (value: string) => void
}
const RangePicker = ({
  postFixType,
  maxValueState,
  minValueState,
  setMaxValue,
  setMinValue,
}: RangePickerProps) => {
  const [invalidInput, setInvalidInput] = useState(false)
  const [localMinValue, setLocalMinValue] = useState(minValueState)
  const [localMaxValue, setLocalMaxValue] = useState(maxValueState)

  // DESIGN MISGUIDANCE: The design shows that the values for the Area size is 50000 for all the inputs
  // According to the design, these values are as such:
  const numberInputsForGel = [50000, 100000, 150000, 200000, 300000]
  const numberInputsForArea = [50000, 50000, 50000, 50000, 50000]

  enum InputEnums {
    from = 'from',
    to = 'to',
  }
  type Input = {
    id: InputEnums
    placeholder: string
    title: string
  }
  const inputs: Input[] = [
    { id: InputEnums.from, placeholder: 'დან', title: 'მინ. ' },
    { id: InputEnums.to, placeholder: 'მდე', title: 'მაქს. ' },
  ]

  let postfix

  switch (postFixType) {
    case PostFixTypesEnum.GEL:
      postfix = '₾'
      break
    case PostFixTypesEnum.areaSize:
      postfix = (
        <>
          მ<sup>2</sup>
        </>
      )
      break
    default:
      postfix = ''
  }

  const handleInputChange = useCallback(
    (value: string, setState: React.Dispatch<React.SetStateAction<string>>) => {
      if (checkNumbers(value) || value === '') {
        setState(value)
      }
    },
    []
  )

  return (
    <>
      <div className="relative flex w-[325px] flex-row items-center gap-[15px] self-start">
        {inputs.map((inputField: Input) => (
          <div
            className="relative flex flex-grow basis-0 flex-row items-center"
            key={inputField.id}
          >
            <input
              type="text"
              value={
                inputField.id === InputEnums.from
                  ? localMinValue
                  : localMaxValue
              }
              id={`${postFixType}-${inputField.placeholder}`}
              placeholder={inputField.placeholder}
              className={`main-text-sm-100-400 placeholder:main-text-sm-40-400 h-[42px] w-full rounded-md border ${invalidInput ? 'border-invalid-red' : 'border-gray-text-color'} p-[10px] outline-none`}
              onChange={(e) =>
                handleInputChange(
                  e.target.value,
                  inputField.id === InputEnums.from
                    ? setLocalMinValue
                    : setLocalMaxValue
                )
              }
            />
            <p className="main-text-xs-100-400 absolute right-[10px] top-[50%] -translate-y-1/2 transform">
              {postfix}
            </p>
          </div>
        ))}
        <div
          className={`absolute -bottom-6 flex flex-row items-center gap-[7px] ${!invalidInput ? 'invisible' : ''}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="11"
            viewBox="0 0 12 11"
            fill="none"
            className="stroke-invalid-red"
          >
            <path
              d="M11 1.40918L4.125 9.591L1 5.87199"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="main-text-sm-40-400-customCLR text-invalid-red">
            გთხოვთ შეიყვანოთ ვალიდური რიცხვები
          </p>
        </div>
      </div>

      <div className="flex items-start gap-6">
        {inputs.map((inputField: Input) => (
          <div
            className="flex w-[155px] flex-col items-start gap-4"
            key={inputField.placeholder}
          >
            <p className="main-text-sm-100">
              {inputField.title}{' '}
              {postFixType === PostFixTypesEnum.GEL ? 'ფასი' : postfix}
            </p>
            <div className="flex flex-col gap-2">
              {(postFixType === PostFixTypesEnum.GEL
                ? numberInputsForGel
                : numberInputsForArea
              ).map((number, index) => (
                <p
                  className="main-text-sm-100-400 cursor-pointer"
                  key={inputField.id + index}
                  onClick={() => {
                    if (inputField.id === InputEnums.from) {
                      setLocalMinValue(number.toString())
                    } else {
                      setLocalMaxValue(number.toString())
                    }
                  }}
                >
                  {formatPriceWithCommas(number)} {postfix}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
      <FilterConfirmButton
        onConfirm={() => {
          if (localMaxValue !== '' && localMinValue !== '') {
            if (parseInt(localMinValue) > parseInt(localMaxValue)) {
              setInvalidInput(true)
            } else {
              setInvalidInput(false)
              setMinValue(localMinValue)
              setMaxValue(localMaxValue)
            }
          } else {
            if (localMinValue === '') {
              setMinValue('')
            } else {
              setMinValue(localMinValue)
            }

            if (localMaxValue === '') {
              setMaxValue('')
            } else {
              setMaxValue(localMaxValue)
            }
          }
        }}
      />
    </>
  )
}

export default memo(RangePicker)
