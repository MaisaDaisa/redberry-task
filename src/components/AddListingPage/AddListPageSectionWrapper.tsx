import { ReactNode } from "react";

interface AddListPageSectionWrapperProps {
	title?: string;
	children: ReactNode;
}

const AddListPageSectionWrapper = ({
	title,
	children,
}: AddListPageSectionWrapperProps) => {
	return (
		<div className="flex flex-col items-start gap-[22px] w-full self-stretch">
			{title && <h2 className="secondary-text">{title}</h2>}
			<div className="grid grid-cols-2 gap-5 w-full">{children}</div>
		</div>
	);
};

export default AddListPageSectionWrapper;
