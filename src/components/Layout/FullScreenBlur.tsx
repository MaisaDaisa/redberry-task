import React from "react";

interface FullScreenBlurProps {
	isActive: boolean;
	children: React.ReactNode;
}

const FullScreenBlur = ({ children, isActive }: FullScreenBlurProps) => {
	return (
		<section
			className={`fixed w-full h-dvh bg-blur backdrop-blur-[5px] z-20 top-0 left-0 items-center justify-center ${
				isActive ? "flex animate-fade-in-up" : "hidden"
			}`}>
			{children}
		</section>
	);
};

export default FullScreenBlur;
