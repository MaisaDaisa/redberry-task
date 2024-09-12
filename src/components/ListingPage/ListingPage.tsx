import Filters from "@/components/ListingPage/Filter/Filters";
import CtaL from "@/components/GlobalComponents/CtaL";
import { CtaLType } from "@/components/GlobalComponents/CtaL";
import FilterDisplay from "@/components/ListingPage/Filter/FilterDisplay";
import ListingCard from "@/components/ListingPage/ListingCard";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

console.log(import.meta.env.VITE_TOKEN);

const ListingPage = () => {
	const navigate = useNavigate();
	useEffect(() => {
		return console.log("ListingPage unmounted");
	}, []);

	const handleAddListing = () => {
		navigate("/add-listing");
	};
	const handleAddAgent = () => {
		console.log("Add Listing");
	};
	return (
		<>
			<div className="flex justify-between items-center">
				<Filters />
				<div className="flex items-center justify-center gap-4">
					<CtaL
						ctaText="ლისტინგის დამატება"
						type={CtaLType.primary}
						onClickHandler={handleAddListing}
					/>
					<CtaL
						ctaText="აგენტის დამატება"
						type={CtaLType.secondary}
						onClickHandler={handleAddAgent}
					/>
				</div>
			</div>
			<FilterDisplay />
			<div className="mt-8 pb-[300px] flex items-center justify-center gap-5 flex-wrap">
				<ListingCard id={2} />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
				<ListingCard />
			</div>
		</>
	);
};

export default ListingPage;
