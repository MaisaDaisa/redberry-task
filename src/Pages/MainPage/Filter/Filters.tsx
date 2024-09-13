import FilterDropDownButtons from "./FilterDropDownButtons";

const Filters = () => {
	return (
		<div className="flex p-[6px] items-center gap-6 border rounded-[10px] border-main-primary-gray-border w-auto">
			<FilterDropDownButtons filterText="რეგიონი" />
			<FilterDropDownButtons filterText="საფასო კატეგორია" />
			<FilterDropDownButtons filterText="ფართობი" />
			<FilterDropDownButtons filterText="საძინებლების რაოდენობა" />
		</div>
	);
};

export default Filters;
