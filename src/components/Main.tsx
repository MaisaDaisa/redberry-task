import React, { Children } from "react";

interface MainProps {
	marginTop?: string;
	children?: React.ReactNode;
}

const Main = ({ marginTop = "77px", children }: MainProps) => {
	return (
		<main className="mx-globalPx pb-[300px]" style={{ marginTop: marginTop }}>
			{children}
		</main>
	);
};

export default Main;
