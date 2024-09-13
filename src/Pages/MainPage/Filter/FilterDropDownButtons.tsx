import arrowIcon from "../../../assets/svg/filterarrow.svg";
import React, { useState } from "react";

interface FilterDropDownButtonsProps {
	filterText: string;
	active?: boolean;
}

const FilterDropDownButtons = ({
	filterText,
	active = false,
}: FilterDropDownButtonsProps) => {
	const [isActive, setIsActive] = useState(active);

	return (
		<div className="relative">
			<div
				className={`relative transition-all duration-300 flex justify-center items-center px-2 py-[14px] gap-1 cursor-pointer ${
					isActive ? "rounded-[6px] bg-secondary-gray-background" : ""
				}`}
				onClick={() => setIsActive(!isActive)}>
				<p className="main-text select-none">{filterText}</p>
				<img
					src={arrowIcon}
					alt="arrow"
					className={`transition-all duration-300 ${
						isActive ? "-rotate-180" : "rotate-0"
					}`}
				/>
			</div>

			{
				// Dropdown content with fade-in effect
				<div
					className={`absolute z-10 w-[600px] translate-y-4 h-[100px] p-6 bg-primary-white self-start justify-self-start border border-primary-gray-border rounded-[10px] shadow-primary-shadow flex flex-col items-start transition-opacity transform duration-500 ease-in-out ${
						isActive ? "opacity-100" : "opacity-0 pointer-events-none"
					}`}>
					<p className="main-text">რეგიონის მიხედვით</p>
					<div className="flex items-end gap-y-4 gap-x-[50px] content-end"></div>
				</div>
			}
		</div>
	);
};

export default FilterDropDownButtons;
