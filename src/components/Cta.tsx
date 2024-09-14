import React from "react";

export enum CtaTypes {
	primary = "primary",
	secondary = "secondary",
	gray = "gray",
}

interface CtaProps {
	ctaText: string;
	type?: CtaTypes;
	onClickHandler: () => any;
	children?: React.ReactNode;
	textClass?: string;
}

const Cta = ({
	ctaText,
	type = CtaTypes.primary,
	onClickHandler,
	children = "",
	textClass = "main-text-sm-100-500-customCLR",
}: CtaProps) => {
	let buttonStyle = "";
	let textStyle = "";

	// Set button style based on the type
	switch (type) {
		case CtaTypes.primary:
			buttonStyle = "bg-primary-orange hover:bg-primary-orange-hover";
			textStyle = "text-primary-white";
			break;
		case CtaTypes.secondary:
			buttonStyle =
				"border border-primary-orange group hover:bg-primary-orange";
			textStyle = "text-primary-orange group-hover:text-primary-white";
			break;
		case CtaTypes.gray:
			buttonStyle =
				"border border-gray-text-color group hover:bg-gray-text-color";
			textStyle = "text-gray-text-color group-hover:text-primary-white";
			break;
		// Default to primary ( never reaches here )
		default:
			buttonStyle = "bg-primary-orange hover:bg-primary-orange-hover";
			textStyle = "text-primary-white";
			break;
	}

	return (
		<div
			className={`transition-all duration-300 cursor-pointer inline-flex px-[10px] py-4 justify-center items-center gap-[2px] flex-shrink-0 rounded-[10px] select-none ${buttonStyle}`}
			onClick={() => onClickHandler()}>
			{children}
			<p className={`${textClass} text-nowrap ${textStyle}`}>{ctaText}</p>
		</div>
	);
};

export default Cta;
