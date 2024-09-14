import Status from "@/Pages/AddListingPage/Status";

interface TwoChoiceProps {
	selected: 0 | 1;
	setSelected: (value: 0 | 1) => void;
}

const TwoChoice = ({ selected, setSelected }: TwoChoiceProps) => {
	return (
		<div className="flex flex-row gap-x-8 ">
			<Status
				selected={selected}
				index={0}
				setSelected={setSelected}
				key={0}
				title="იყიდება"
			/>
			<Status
				selected={selected}
				index={1}
				setSelected={setSelected}
				key={1}
				title="ქირავდება"
			/>
		</div>
	);
};

export default TwoChoice;
