import { useEffect, useState } from 'react'
import InputSectionWrapper from '@/components/InputSectionWrapper'
import AddListPageSectionWrapper from '@/Pages/AddListingPage/AddListPageSectionWrapper'
import InputField from '@/components/InputField'
import FileUploader from '@/components/FileUploader'
import { CtaTypes } from '@/components/Cta'
import Cta from '@/components/Cta'
import { postAgents } from '@/api/postRequests'

// Importing CheckerFunctions
import {
  minimumSymbols,
  checkEmail,
  checkPhoneNumbers,
} from '@/lib/validationChecker'
import FullScreenBlur from './Layout/FullScreenBlur'

interface AddAgentFullscreenPopupProps {
  isActive: boolean
  setIsActiveState: (state: boolean) => void
  invokeOnSend?: () => void
}

const AddAgentFullscreenPopup = ({
  isActive,
  setIsActiveState,
  invokeOnSend,
}: AddAgentFullscreenPopupProps) => {
  const [agentName, setAgentName] = useState('')
  const [agentLastName, setAgentLastName] = useState('')
  const [agentEmail, setAgentEmail] = useState('')
  const [agentPhone, setAgentPhone] = useState('')
  const [agentProfile, setAgentProfile] = useState<File | null>(null)

  const handleAddAgent = async () => {
    if (
      minimumSymbols(agentName) &&
      checkEmail(agentEmail) &&
      checkPhoneNumbers(agentPhone) &&
      agentProfile
    ) {
      const formData = {
        name: agentName,
        surname: agentLastName,
        email: agentEmail,
        phone: agentPhone,
        avatar: agentProfile,
      }
      await postAgents(formData)
      // Invoking the callback function to update the list

      invokeOnSend && invokeOnSend()
      // Closing the popup
      setIsActiveState(false)
    }
  }

  return (
    <FullScreenBlur isActive={isActive} setActiveState={setIsActiveState}>
      <div
        className="flex h-[784px] w-[1009px] flex-shrink-0 flex-col items-center rounded-[10px] bg-primary-white py-[87px] shadow-primary-shadow"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="main-text-3xl-100">აგენტის დამატება</h1>
        <InputSectionWrapper>
          <AddListPageSectionWrapper>
            <InputField
              title="სახელი"
              value={agentName}
              required={true}
              stateSetter={setAgentName}
              checker={{
                checkerTime: 500,
                checkerText: 'მინიმუმ ორი სიმბოლო',
                checkerTextOnError: 'ჩაწერეთ ვალიდური მონაცემები',
                validationFunction: minimumSymbols,
              }}
            />
            <InputField
              title="გვარი"
              required={false}
              value={agentLastName}
              stateSetter={setAgentLastName}
              checker={{
                checkerTime: 500,
                validationFunction: minimumSymbols,
                checkerText: 'მინიმუმ ორი სიმბოლო',
                checkerTextOnError: 'ჩაწერეთ ვალიდური მონაცემები',
              }}
            />
            <InputField
              title="ელ-ფოსტა"
              required={true}
              value={agentEmail}
              stateSetter={setAgentEmail}
              checker={{
                checkerTime: 1000,
                validationFunction: checkEmail,
                checkerText: 'გამოიყენეთ @redberry.ge ფოსტა',
                checkerTextOnError: 'ჩაწერეთ ვალიდური მონაცემები',
              }}
            />
            <InputField
              title="ტელეფონის ნომერი"
              required={false}
              stateSetter={setAgentPhone}
              value={agentPhone}
              checker={{
                checkerTime: 1000,
                validationFunction: checkPhoneNumbers,
                checkerText: 'მხოლოდ რიცხვები',
                checkerTextOnError: 'ჩაწერეთ ვალიდური მონაცემები',
              }}
            />
            <FileUploader
              setFileState={setAgentProfile}
              title="ატვირთეთ ფოტო"
              customStyles="col-span-2"
              required={true}
            />
          </AddListPageSectionWrapper>
          <div className="flex w-full flex-row justify-end gap-[15px]">
            <Cta
              type={CtaTypes.secondary}
              ctaText="გაუქმება"
              onClickHandler={() => setIsActiveState(false)}
            />
            <Cta
              type={CtaTypes.primary}
              ctaText="დაამატე აგენტი"
              onClickHandler={handleAddAgent}
            />
          </div>
        </InputSectionWrapper>
      </div>
    </FullScreenBlur>
  )
}

export default AddAgentFullscreenPopup
