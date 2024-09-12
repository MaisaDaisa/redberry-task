import React, { ReactNode } from "react";

interface TitleH4ComponentProps {
	title: string;
	required?: boolean;
	children?: ReactNode;
}

const TitleH4Component = ({
	title,
	required = false,
	children,
}: TitleH4ComponentProps) => {
	return (
		<div className="flex flex-col justify-start items-start max-w-[384px] ">
			<h4 className="main-text-sm-100 mb-[5px]">
				{title} {required ? "*" : ""}
			</h4>
			{children}
		</div>
	);
};

export default TitleH4Component;
