import { useState, useEffect } from "react";
import arrowIcon from "@/assets/svg/filterarrow.svg";
import TitleH4Component from "./TitleH4Component";
import { agentGetMany, cityGet, region } from "@/api/apiTypes";

interface DropDownSelectProps {
	additionalComponent?: JSX.Element;
	items: agentGetMany[] | cityGet[] | region[];
	title: string;
	required?: boolean;
	isAgents?: boolean;
	parentStateSetter: (value: any) => void;
}

const DropDownSelect = ({
	isAgents = false,
	additionalComponent,
	items,
	title,
	required = false,
	parentStateSetter,
}: DropDownSelectProps) => {
	const [selected, setSelected] = useState<agentGetMany | cityGet | region>(
		items[0] || ({} as agentGetMany | cityGet | region)
	);
	const [toggleCombo, setToggleCombo] = useState(false);

	useEffect(() => {
		if (items.length > 0) {
			setSelected(items[0]);
			parentStateSetter(items[0]);
		}
	}, [items]);

	const handleSelectedItem = (item: agentGetMany | cityGet | region) => {
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
					<span className="main-text-sm-100-400">
						{"surname" in selected && isAgents
							? `${selected.name} ${selected.surname}`
							: selected.name}
					</span>
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
								{item.name} {isAgents && "surname" in item && `${item.surname}`}
							</li>
						))}
					</ul>
				)}
			</div>
			<input type="hidden" value={selected.name} />
		</TitleH4Component>
	);
};

export default DropDownSelect;
