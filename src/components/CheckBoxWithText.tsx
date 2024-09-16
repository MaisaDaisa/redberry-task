import checkedCheckbox from '@/assets/svg/checkedCheckbox.svg'
import uncheckedCheckbox from '@/assets/svg/uncheckedCheckbox.svg'

interface CheckBoxWithTextProps {
  isChecked?: boolean
  text: string
  onClickHandler?: () => void
}
const CheckBoxWithText = ({
  isChecked = false,
  text,
  onClickHandler,
}: CheckBoxWithTextProps) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <img
        src={isChecked ? checkedCheckbox : uncheckedCheckbox}
        alt={`checkbox for ${text}`}
        className="h-5 w-5 cursor-pointer"
        onClick={onClickHandler}
      />
      <p className="main-text-sm-100-400 w-[163px]">{text}</p>
    </div>
  )
}

export default CheckBoxWithText
