import redberryLogo from "@/assets/redberryLogo.png";

const Header = () => {
	return (
		<header className="flex justify-start px-globalPx py-[38px] border border-primary-gray-border">
			<div>
				<a href="/">
					<img src={redberryLogo} alt="Logo" width={150} height={24} />
				</a>
			</div>
		</header>
	);
};

export default Header;
