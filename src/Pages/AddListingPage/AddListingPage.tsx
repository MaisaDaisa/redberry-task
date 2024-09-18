import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { region, cityGet, agentGetMany } from '@/api/apiTypes'
import AddListPageSectionWrapper from './AddListPageSectionWrapper'
import Cta, { CtaTypes } from '@/components/Cta'
import InputSectionWrapper from '@/components/InputSectionWrapper'
import TwoChoice from '@/Pages/AddListingPage/TwoChoice'
import plus from '@/assets/svg/plus-circle.svg'
import {
  minimumSymbols,
  checkNumbers,
  checkWordCount,
  smallIntChecker,
} from '@/lib/validationChecker'
import AddAgentFullscreenPopup from '@/components/AddAgentFullscreenPopup'
import { postListing } from '@/api/postRequests'
import AgentDropdown, {
  AgentDropdownRef,
} from '@/Pages/AddListingPage/AgentDropdown'
import { SetAddAgentActiveRef } from '@/components/AddAgentFullscreenPopup'
import AddListingInputsSections, {
  ValidationCheckerRef,
} from '@/Pages/AddListingPage/AddListingInputsSections'

const AddListingPage = () => {
  // Refs for Invoking functions from child components
  const setAddAgentsPopup = useRef<SetAddAgentActiveRef>(null)
  const reloadAgents = useRef<AgentDropdownRef>(null)
  const setValidationChecker = useRef<ValidationCheckerRef>(null)
  // Refs for the input fields
  // 0 for sale, 1 for rent
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
  // Ref for the agent dropdown
  const agent = useRef<agentGetMany | null>(null)

  const navigate = useNavigate()

  const handleAddListing = () => {
    if (
      checkWordCount(description.current) &&
      checkNumbers(price.current) &&
      checkNumbers(area.current) &&
      smallIntChecker(bedroomsCount.current) &&
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

      postListing(formData)
        .then(() => {
          navigate('/')
        })
        .catch((err) => {
          console.error(err)
        })
    } else {
      setValidationChecker.current?.validationChecker()
    }
  }

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

  return (
    <div className="flex flex-col items-center">
      <h1 className="main-text-3xl-100">ლისტინგის დამატება</h1>
      <InputSectionWrapper>
        <div className="flex flex-col flex-wrap gap-y-2 self-start">
          <h3 className="secondary-text">გარიგების ტიპი</h3>
          <TwoChoice isRentalRef={isRental} />
        </div>
        <AddListingInputsSections
          address={address}
          area={area}
          bedroomsCount={bedroomsCount}
          description={description}
          image={image}
          price={price}
          zipCode={zipCode}
          chosenCity={chosenCity}
          chosenRegion={chosenRegion}
          ref={setValidationChecker}
        />
        <AddListPageSectionWrapper title="აგენტი">
          <AgentDropdown
            ref={reloadAgents}
            chosenAgentsRef={agent}
            addAgentsButton={addAgentsButton}
          />
        </AddListPageSectionWrapper>
        <div className="mt-[90px] flex w-full flex-row justify-end gap-[15px]">
          <Cta
            type={CtaTypes.secondary}
            ctaText="გაუქმება"
            onClickHandler={() => navigate('/')}
          />
          <Cta
            type={CtaTypes.primary}
            ctaText="დაამატე ლისტინგი"
            onClickHandler={() => handleAddListing()}
          />
        </div>
        <AddAgentFullscreenPopup
          ref={setAddAgentsPopup}
          invokeOnSend={() => reloadAgents.current?.fetchAgents()}
        />
      </InputSectionWrapper>
    </div>
  )
}

export default AddListingPage
