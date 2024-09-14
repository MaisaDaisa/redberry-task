import React from "react";

const AddListingPageWholeWrapper = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<div className="mt-[61px] flex flex-col items-center gap-20 w-[799px]">
			{children}
		</div>
	);
};

export default AddListingPageWholeWrapper;
