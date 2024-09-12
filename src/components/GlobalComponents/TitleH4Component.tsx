import React, { ReactNode } from "react";

interface TitleH4ComponentProps {
	title: string;
	required?: boolean;
	children?: ReactNode;
	customStyles?: string;
}

const TitleH4Component = ({
	title,
	required = false,
	children,
	customStyles = "",
}: TitleH4ComponentProps) => {
	return (
		<div className={`flex flex-col justify-start items-start  ${customStyles}`}>
			<h4 className="main-text-sm-100 mb-[5px]">
				{title} {required ? "*" : ""}
			</h4>
			{children}
		</div>
	);
};

export default TitleH4Component;
