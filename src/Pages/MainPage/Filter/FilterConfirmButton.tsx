import Cta, { CtaTypes } from '@/components/Cta'

const FilterConfirmButton = ({ onConfirm }: { onConfirm: () => void }) => {
  return (
    <div className="flex w-[234px] flex-row justify-end">
      <Cta
        ctaText="არჩევა"
        type={CtaTypes.primary}
        onClickHandler={() => onConfirm()}
      />
    </div>
  )
}

export default FilterConfirmButton
