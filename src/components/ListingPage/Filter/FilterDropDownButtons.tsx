import arrowIcon from "../../../assets/svg/filterarrow.svg";

interface FilterDropDownButtonsProps {
	filterText: string;
}
const FilterDropDownButtons = ({ filterText }: FilterDropDownButtonsProps) => {
	return (
		<div className="flex justify-center items-center px-2 py-[14px] gap-1 cursor-pointer">
			<p className="main-text">{filterText}</p>
			<img src={arrowIcon} alt="arrow" />
		</div>
	);
};

export default FilterDropDownButtons;
