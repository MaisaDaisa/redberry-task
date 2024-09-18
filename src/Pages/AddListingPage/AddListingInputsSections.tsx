import React, { forwardRef, useState, Ref, useImperativeHandle } from 'react'
import AddListPageSectionWrapper from '@/Pages/AddListingPage/AddListPageSectionWrapper'
import InputField, { InputFieldType } from '@/components/InputField'
import FileUploader from '@/components/FileUploader'
import RegionCityDropDowns from '@/Pages/AddListingPage/RegionCityDropDowns'
import {
  minimumSymbols,
  checkNumbers,
  checkWordCount,
  smallIntChecker,
} from '@/lib/validationChecker'
import { cityGet, region } from '@/api/apiTypes'

// Define prop types for the AddListingInputsSections component
export type AddListingInputsSections = {
  chosenCity: React.MutableRefObject<cityGet | null>
  chosenRegion: React.MutableRefObject<region | null>
  address: React.MutableRefObject<string>
  zipCode: React.MutableRefObject<string>
  price: React.MutableRefObject<string>
  area: React.MutableRefObject<string>
  image: React.MutableRefObject<File | null>
  bedroomsCount: React.MutableRefObject<string>
  description: React.MutableRefObject<string>
}

// Define the reference type for the validationChecker method
export type ValidationCheckerRef = {
  validationChecker: () => void
}

const AddListingInputsSections = forwardRef<
  ValidationCheckerRef,
  AddListingInputsSections
>(
  (
    {
      address,
      area,
      bedroomsCount,
      chosenCity,
      chosenRegion,
      description,
      image,
      price,
      zipCode,
    }: AddListingInputsSections,
    ref: Ref<ValidationCheckerRef>
  ) => {
    // State for tracking invalid input fields
    const [invalidInput, setInvalidInput] = useState({
      address: false,
      area: false,
      bedroomsCount: false,
      description: false,
      image: false,
      price: false,
      zipCode: false,
    })

    // Validation function for form inputs
    const validationChecker = () => {
      setInvalidInput({
        address: !minimumSymbols(address.current),
        area: !checkNumbers(area.current),
        bedroomsCount: !smallIntChecker(bedroomsCount.current),
        description: !checkWordCount(description.current),
        image: !image.current, // Check if the image exists
        price: !checkNumbers(price.current),
        zipCode: !checkNumbers(zipCode.current),
      })
    }

    // Use imperatively handled ref to expose the validationChecker method
    useImperativeHandle(ref, () => ({
      validationChecker,
    }))

    return (
      <>
        {/* Section: Location */}
        <AddListPageSectionWrapper title="მდებარეობა">
          <InputField
            initialCheckerStateIsInvalid={invalidInput.address}
            title="მისამართი"
            valueRef={address}
            required={true}
            checker={{
              checkerTime: 1000,
              validationFunction: minimumSymbols,
              checkerText: 'მინიმუმ ორი სიმბოლო',
              checkerTextOnError: 'ჩაწერეთ ვალიდური მონაცემები',
            }}
          />
          <InputField
            initialCheckerStateIsInvalid={invalidInput.zipCode}
            title="საფოსტო ინდექსი"
            required={true}
            valueRef={zipCode}
            checker={{
              checkerTime: 2000,
              validationFunction: checkNumbers,
              checkerText: 'მხოლოდ რიცხვები',
              checkerTextOnError: 'ჩაწერეთ ვალიდური მონაცემები',
            }}
          />
          {/* Region and city dropdowns */}
          <RegionCityDropDowns
            chosenCityRef={chosenCity}
            chosenRegionRef={chosenRegion}
          />
        </AddListPageSectionWrapper>

        {/* Section: Delivery */}
        <AddListPageSectionWrapper title="მიწოდება">
          <InputField
            initialCheckerStateIsInvalid={invalidInput.price}
            title="ფასი"
            valueRef={price}
            required={true}
            checker={{
              checkerTime: 2000,
              validationFunction: checkNumbers,
              checkerText: 'მხოლოდ რიცხვები',
              checkerTextOnError: 'ჩაწერეთ ვალიდური მონაცემები',
            }}
          />
          <InputField
            initialCheckerStateIsInvalid={invalidInput.area}
            title="ფართობი"
            required={true}
            valueRef={area}
            checker={{
              validationFunction: checkNumbers,
              checkerText: 'მხოლოდ რიცხვები',
              checkerTextOnError: 'ჩაწერეთ ვალიდური მონაცემები',
            }}
          />
          {/* // DESIGN MISGUIDANCE: The design says 'მხოლოდ რიცხვები' but the
          documentation says 'მთელი რიცხვი' and api does not say it must not be over 255 
          but the error does, so it is TinyInt type*/}
          <InputField
            initialCheckerStateIsInvalid={invalidInput.bedroomsCount}
            title="საძინებლის რაოდენობა"
            required={true}
            valueRef={bedroomsCount}
            checker={{
              checkerTime: 1000,
              validationFunction: smallIntChecker,
              checkerText: 'მხოლოდ რიცხვები',
              checkerTextOnError: 'ჩაწერეთ ვალიდური მონაცემები',
            }}
          />
          <InputField
            initialCheckerStateIsInvalid={invalidInput.description}
            title="აღწერა"
            required={true}
            valueRef={description}
            type={InputFieldType.TEXTAREA}
            customStyles="col-span-2"
            checker={{
              checkerTime: 1000,
              validationFunction: checkWordCount,
              checkerText: 'მინიმუმ ხუთი სიტყვა',
              checkerTextOnError: 'ჩაწერეთ ვალიდური მონაცემები',
            }}
          />
          <FileUploader
            initialStateInvalid={invalidInput.image}
            fileRef={image}
            title="ატვირთეთ ფოტო"
            customStyles="col-span-2"
            required={true}
          />
        </AddListPageSectionWrapper>
      </>
    )
  }
)

export default AddListingInputsSections
