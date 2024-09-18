import InputField from '@/components/InputField'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState, useCallback } from 'react'
import { region, cityGet, agentGetMany } from '@/api/apiTypes'
import AddListPageSectionWrapper from './AddListPageSectionWrapper'
import { InputFieldType } from '@/components/InputField'
import FileUploader from '@/components/FileUploader'
import { CtaTypes } from '@/components/Cta'
import Cta from '@/components/Cta'
import InputSectionWrapper from '@/components/InputSectionWrapper'
import TwoChoice from '@/Pages/AddListingPage/TwoChoice'
import plus from '@/assets/svg/plus-circle.svg'
import {
  minimumSymbols,
  checkNumbers,
  checkWordCount,
} from '@/lib/validationChecker'
import AddAgentFullscreenPopup from '../../components/AddAgentFullscreenPopup'
import { postListing } from '@/api/postRequests'
import { useBeforeUnload } from 'react-router-dom'
import RegionCityDropDowns from './RegionCityDropDowns'
import AgentDropdown from './AgentDropdown'

const AddListingPage = () => {
  const setAddAgentsPopup = useRef<{
    setActive: (value: boolean) => void
  } | null>(null)
  // 0 for sale, 1 for rent
  const [isLoading, setIsLoading] = useState(true)
  //

  // cities never contribute to the rendering of the component
  // filteredCities are used to render the dropdown select
  // filteredCities
  const reloadAgents = useRef<{ fetchAgents: () => void } | null>(null)
  const isRental = useRef<0 | 1>(0)
  const chosenRegion = useRef<region | null>(null)
  const chosenCity = useRef<cityGet | null>(null)
  const address = useRef<string>('')
  const zipCode = useRef<string>('')
  const price = useRef<string>('')
  const area = useRef<string>('')
  const image = useRef<File | null>(null)
  const bedroomsCount = useRef<string>('')
  const description = useRef<string>('')
  const agent = useRef<agentGetMany | null>(null)

  const navigate = useNavigate()

  const deleteAndGoHome = useCallback(() => {
    localStorage.removeItem('listingInputs')
    navigate('/')
  }, [])

  const handleAddListing = () => {
    if (
      checkWordCount(description.current) &&
      checkNumbers(price.current) &&
      checkNumbers(area.current) &&
      checkNumbers(bedroomsCount.current) &&
      minimumSymbols(address.current) &&
      checkNumbers(zipCode.current)
    ) {
      const formData = new FormData()
      formData.append('address', address.current)
      if (image.current) formData.append('image', image.current)
      if (chosenRegion.current)
        formData.append('region_id', chosenRegion.current.id.toString())
      if (chosenCity.current)
        formData.append('city_id', chosenCity.current.id.toString())
      formData.append('description', description.current)
      formData.append('zip_code', zipCode.current)
      formData.append('price', price.current)
      formData.append('area', area.current)
      formData.append('bedrooms', bedroomsCount.current)
      formData.append('is_rental', isRental.current.toString())
      if (agent.current)
        formData.append('agent_id', agent.current.id.toString())

      postListing(formData).then(() => {
        deleteAndGoHome()
      })
    }
  }

  useBeforeUnload(
    useCallback(() => {
      // Saving the data to the local storage
      // Not saving the profile picture
      localStorage.listingInputs = JSON.stringify({
        address: address.current,
        zipCode: zipCode.current,
        price: price.current,
        area: area.current,
        bedroomsCount: bedroomsCount.current,
        description: description.current,
        agent: agent.current,
        towChoiceNumber: isRental.current,
        chosenRegion: chosenRegion.current,
        chosenCity: chosenCity.current,
      })
    }, [
      address,
      zipCode,
      price,
      area,
      bedroomsCount,
      description,
      agent,
      isRental,
      chosenRegion,
      chosenCity,
    ])
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        const savedData = localStorage.listingInputs
        if (savedData) {
          const parsedData = JSON.parse(savedData)
          console.log('parsedData', parsedData)
          isRental.current = parsedData.towChoiceNumber
          chosenRegion.current = parsedData.chosenRegion
          address.current = parsedData.address
          zipCode.current = parsedData.zipCode
          price.current = parsedData.price
          area.current = parsedData.area
          bedroomsCount.current = parsedData.bedroomsCount
          description.current = parsedData.description
          agent.current = parsedData.agent
          chosenCity.current = parsedData.chosenCity
        }
        setIsLoading(false)
      } catch (error) {
        console.error('Failed to fetch regions or cities:', error)
      }
    }
    fetchData()
  }, [])

  // Filtering cities based on the chosen region

  // This component is used to add agents to the dropdown select
  const addAgentsButton = (
    <li
      key={0}
      onClick={() => setAddAgentsPopup.current?.setActive(true)}
      className="main-text-sm-100-400 flex cursor-pointer flex-row items-center justify-start gap-2 border-b-[1px] border-primary-gray-border bg-primary-white p-[10px] hover:bg-blue-100"
    >
      <img src={plus} alt="add-button" width={20} height={20} />{' '}
      <p>დაამატე აგენტი</p>
    </li>
  )

  return isLoading ? (
    ''
  ) : (
    <div className="flex flex-col items-center">
      <h1 className="main-text-3xl-100">ლისტინგის დამატება</h1>
      <InputSectionWrapper>
        <div className="flex flex-col flex-wrap gap-y-2 self-start">
          <h3 className="secondary-text">გარიგების ტიპი</h3>
          <TwoChoice isRentalRef={isRental} />
        </div>
        <AddListPageSectionWrapper title="მდებარეობა">
          <InputField
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
        <AddListPageSectionWrapper title="მიწოდება">
          <InputField
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
            title="ფართობი"
            required={true}
            valueRef={area}
            checker={{
              validationFunction: checkNumbers,
              checkerText: 'მხოლოდ რიცხვები',
              checkerTextOnError: 'ჩაწერეთ ვალიდური მონაცემები',
            }}
          />
          <InputField
            title="საძინებლის რაოდენობა"
            required={true}
            valueRef={bedroomsCount}
            checker={{
              checkerTime: 100,
              validationFunction: checkNumbers,
              checkerText: 'მხოლოდ რიცხვები',
              checkerTextOnError: 'ჩაწერეთ ვალიდური მონაცემები',
            }}
          />
          <InputField
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
            fileRef={image}
            title="ატვირთეთ ფოტო"
            customStyles="col-span-2"
            required={true}
          />
        </AddListPageSectionWrapper>
        <AddListPageSectionWrapper title="აგენტი">
          <AgentDropdown
            reloadAgents={reloadAgents}
            chosenAgentsRef={agent}
            addAgentsButton={addAgentsButton}
          />
        </AddListPageSectionWrapper>
        <div className="mt-[90px] flex w-full flex-row justify-end gap-[15px]">
          <Cta
            type={CtaTypes.secondary}
            ctaText="გაუქმება"
            onClickHandler={() => deleteAndGoHome()}
          />
          <Cta
            type={CtaTypes.primary}
            ctaText="დაამატე ლისტინგი"
            onClickHandler={() => handleAddListing()}
          />
        </div>
        <AddAgentFullscreenPopup
          setActiveRef={setAddAgentsPopup}
          invokeOnSend={() => reloadAgents.current?.fetchAgents()}
        />
      </InputSectionWrapper>
    </div>
  )
}

export default AddListingPage
