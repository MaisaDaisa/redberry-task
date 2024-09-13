import React from "react";

export enum CtaTypes {
	primary = "primary",
	secondary = "secondary",
}

interface CtaProps {
	ctaText: string;
	type?: CtaTypes;
	onClickHandler: () => any;
	children?: React.ReactNode;
}

const Cta = ({
	ctaText,
	type = CtaTypes.primary,
	onClickHandler,
	children = "",
}: CtaProps) => {
	return (
		<div
			className={`transition-all duration-300 cursor-pointer inline-flex px-[10px] py-4 justify-center items-center gap-[2px] flex-shrink-0 rounded-[10px] select-none ${
				type === CtaTypes.primary
					? "bg-primary-orange hover:bg-primary-orange-hover"
					: "border border-primary-orange group hover:bg-primary-orange"
			}`}
			onClick={() => onClickHandler()}>
			{children}
			<p
				className={`main-text-customCLR ${
					type === CtaTypes.primary
						? "text-primary-white"
						: "text-primary-orange group-hover:text-primary-white"
				}
				`}>
				{ctaText}
			</p>
		</div>
	);
};

export default Cta;
