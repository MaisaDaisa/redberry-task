import React from "react";
import xDelete from "../../../assets/svg/x-delete.svg";

type FilterDisplayTextProps = {
	text: string;
	setState?: React.Dispatch<React.SetStateAction<null>>;
};

const FilterDisplayText = ({ text, setState }: FilterDisplayTextProps) => {
	return (
		<div className="flex py-[6px] px-[10px] gap-1 rounded-full border border-primary-gray-border">
			<p className="main-text-sm-80 select-none">{text}</p>
			<img
				className="cursor-pointer"
				src={xDelete}
				alt="delete"
				width={14}
				height={14}
			/>
		</div>
	);
};

export default FilterDisplayText;
