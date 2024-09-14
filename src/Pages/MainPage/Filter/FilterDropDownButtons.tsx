import Cta, { CtaTypes } from "@/components/Cta";
import arrowIcon from "../../../assets/svg/filterarrow.svg";
import React, { useState } from "react";

interface FilterDropDownButtonsProps {
	filterText: string;
	active?: boolean;
	children: React.ReactNode;
	dropDownTitle?: string;
	onConfirm?: () => void;
}

const FilterDropDownButtons = ({
	onConfirm,
	filterText,
	active = false,
	children,
	dropDownTitle,
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
					className={`
						absolute z-10  translate-y-4  p-6 bg-primary-white self-start justify-self-start 
						border border-primary-gray-border rounded-[10px] 
						shadow-primary-shadow flex flex-col items-end gap-8
						transition-opacity transform duration-500 ease-in-out 
						${isActive ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
					<p className="main-text self-start">{dropDownTitle}</p>
					{/* Children here as dropdown content this will better to avoid prop drilling */}
					{children}
					<div className="w-[234px] flex flex-row justify-end">
						<Cta
							ctaText="არჩევა"
							type={CtaTypes.primary}
							onClickHandler={() => onConfirm}
						/>
					</div>
				</div>
			}
		</div>
	);
};

export default FilterDropDownButtons;
