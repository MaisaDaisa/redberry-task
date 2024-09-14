import Tag from "@/components/Tag";

interface isRentalProps {
	isRental: boolean;
	customClass?: string;
}

const IsRental = ({ isRental, customClass = "" }: isRentalProps) => {
	return isRental ? (
		<Tag text="ქირავდება" customClass={customClass} />
	) : (
		<Tag text="იყიდება" customClass={customClass} />
	);
};

export default IsRental;
