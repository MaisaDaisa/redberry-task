import {
  useState,
  useCallback,
  memo,
  useRef,
  useImperativeHandle,
  forwardRef,
  Ref,
} from 'react'
import InputSectionWrapper from '@/components/InputSectionWrapper'
import AddListPageSectionWrapper from '@/Pages/AddListingPage/AddListPageSectionWrapper'
import InputField from '@/components/InputField'
import FileUploader from '@/components/FileUploader'
import { CtaTypes } from '@/components/Cta'
import Cta from '@/components/Cta'
import { postAgents } from '@/api/postRequests'
import {
  minimumSymbols,
  checkEmail,
  checkPhoneNumbers,
} from '@/lib/validationChecker'
import FullScreenBlur from './Layout/FullScreenBlur'

export type SetAddAgentActiveRef = {
  setActive: (value: boolean) => void
}
interface AddAgentFullscreenPopupProps {
  invokeOnSend?: () => void
}

const AddAgentFullscreenPopup = (
  { invokeOnSend }: AddAgentFullscreenPopupProps,
  ref: Ref<SetAddAgentActiveRef>
) => {
  const [isActive, setIsActiveState] = useState(false)
  const agentName = useRef<string>('')
  const agentLastName = useRef<string>('')
  const agentEmail = useRef<string>('')
  const agentPhone = useRef<string>('')
  const agentProfile = useRef<File | null>(null)

  const setActive = useCallback((value: boolean) => {
    setIsActiveState(value)
  }, [])

  useImperativeHandle(ref, () => {
    return { setActive: setActive }
  })

  const handleAddAgent = async () => {
    if (
      minimumSymbols(agentName.current) &&
      checkEmail(agentEmail.current) &&
      checkPhoneNumbers(agentPhone.current) &&
      agentProfile
    ) {
      const formData = new FormData()
      formData.append('name', agentName.current)
      formData.append('surname', agentLastName.current)
      formData.append('email', agentEmail.current)
      formData.append('phone', agentPhone.current)
      formData.append('avatar', agentProfile.current as Blob)
      // Posting the agent
      await postAgents(formData).then(() => {
        localStorage.removeItem('agentInputs')
        agentName.current = ''
        agentLastName.current = ''
        agentEmail.current = ''
        agentPhone.current = ''
        agentProfile.current = null
      })
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
        onMouseDown={(e) => e.stopPropagation()}
      >
        <h1 className="main-text-3xl-100">აგენტის დამატება</h1>
        <InputSectionWrapper>
          <AddListPageSectionWrapper>
            <InputField
              title="სახელი"
              valueRef={agentName}
              required={true}
              checker={{
                checkerTime: 500,
                checkerText: 'მინიმუმ ორი სიმბოლო',
                checkerTextOnError: 'ჩაწერეთ ვალიდური მონაცემები',
                validationFunction: minimumSymbols,
              }}
            />
            {/*DESIGN MISGUIDANCE:  Keep in mind by documentation this field is required but it is not required by the design */}
            <InputField
              title="გვარი"
              required={true}
              valueRef={agentLastName}
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
              valueRef={agentEmail}
              checker={{
                checkerTime: 1000,
                validationFunction: checkEmail,
                checkerText: 'გამოიყენეთ @redberry.ge ფოსტა',
                checkerTextOnError: 'ჩაწერეთ ვალიდური მონაცემები',
              }}
            />
            {/*DESIGN MISGUIDANCE:  Keep in mind by documentation this field is required but it is not required by the design */}
            <InputField
              title="ტელეფონის ნომერი"
              required={true}
              valueRef={agentPhone}
              checker={{
                checkerTime: 1000,
                validationFunction: checkPhoneNumbers,
                checkerText: 'მხოლოდ რიცხვები',
                checkerTextOnError: 'ჩაწერეთ ვალიდური მონაცემები',
              }}
            />
            <FileUploader
              fileRef={agentProfile}
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

export default memo(forwardRef(AddAgentFullscreenPopup))
