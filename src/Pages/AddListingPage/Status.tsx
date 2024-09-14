import singleChoiceSelected from "@/assets/svg/singleChoiceSelected.svg";
import singleChoiceUnselected from "@/assets/svg/singleChoiceUnselected.svg";

interface TwoChoiceTextProps {
	selected: 0 | 1;
	index: 0 | 1;
	setSelected: (value: 0 | 1) => void;
	title: string;
}

const Status = ({
	selected,
	index,
	setSelected,
	title,
}: TwoChoiceTextProps) => {
	return (
		<div
			className="flex w-[134px] flex-row justify-start flex-shrink-0 flex-nowrap cursor-pointer gap-[7px]"
			onClick={() => setSelected(index)}>
			<img
				src={selected === index ? singleChoiceSelected : singleChoiceUnselected}
				alt={title}
				width="17"
				height="17"
				className="cursor-pointer"
			/>
			<p className="main-text-sm-100-400">{title}</p>
		</div>
	);
};

export default Status;
