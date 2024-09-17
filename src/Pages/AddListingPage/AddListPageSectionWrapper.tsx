import { ReactNode } from 'react'

interface AddListPageSectionWrapperProps {
  title?: string
  children: ReactNode
}

const AddListPageSectionWrapper = ({
  title,
  children,
}: AddListPageSectionWrapperProps) => {
  return (
    <div className="flex w-full flex-col items-start gap-[22px] self-stretch">
      {title && <h2 className="secondary-text">{title}</h2>}
      <div className="grid w-full grid-cols-2 gap-5">{children}</div>
    </div>
  )
}

export default AddListPageSectionWrapper
