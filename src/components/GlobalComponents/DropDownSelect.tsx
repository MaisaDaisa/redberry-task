import { useState } from "react";
import arrowIcon from "@/assets/svg/filterarrow.svg";
import TitleH4Component from "./TitleH4Component";
import { useEffect } from "react";

interface DropDownSelectProps {
	additionalComponent?: JSX.Element;
	items: any[];
	title: string;
	required?: boolean;
	parentStateSetter: (value: any) => void;
}

const DropDownSelect = ({
	additionalComponent,
	items,
	title,
	required = false,
	parentStateSetter,
}: DropDownSelectProps) => {
	const [selected, setSelected] = useState(items[0] || "");
	const [toggleCombo, setToggleCombo] = useState(false);

	useEffect(() => {
		parentStateSetter(items[0]);
	}, []);

	const handleSelectedItem = (item: any) => {
		setSelected(item);
		setToggleCombo(false);
		parentStateSetter(item);
	};

	return (
		<TitleH4Component title={title} required={required}>
			<div className="relative w-full">
				<div
					onClick={() => setToggleCombo(!toggleCombo)}
					className={`border rounded-t-md border-primary-gray-border cursor-pointer p-[10px] flex justify-between ${
						!toggleCombo ? "rounded-b-md" : "border-b-0"
					}`}>
					<span className="main-text-sm-100-400">{selected.name}</span>
					<img
						src={arrowIcon}
						alt="arrow"
						className={`transition-all duration-300 ${
							toggleCombo ? "-rotate-180" : "rotate-0"
						}`}
					/>
				</div>
				{toggleCombo && (
					<ul className="absolute w-full border border-primary-gray-border z-10 rounded-b-md">
						{additionalComponent}
						{items.map((item) => (
							<li
								key={item.id}
								onClick={() => handleSelectedItem(item)}
								className="p-[10px] hover:bg-blue-100 cursor-pointer bg-primary-white main-text-sm-100-400 border-primary-gray-border border-b-[1px]">
								{item.name}
							</li>
						))}
					</ul>
				)}
			</div>
			{/* Hidden input to store the selected value for forms*/}
			<input type="hidden" value={selected.name} id={selected.id} />
		</TitleH4Component>
	);
};

export default DropDownSelect;
