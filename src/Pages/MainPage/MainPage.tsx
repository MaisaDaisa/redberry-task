import Filters from "@/Pages/MainPage/Filter/Filters";
import CtaL from "@/components/CtaL";
import { CtaTypes } from "@/components/Cta";
import FilterDisplay from "@/Pages/MainPage/Filter/FilterDisplay";
import ListingCard from "@/components/ListingCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddAgentFullscreenPopup from "@/components/AddAgentFullscreenPopup";
import { realEstateMany } from "@/api/apiTypes";
import { getAllListings } from "@/api/getRequests";

console.log(import.meta.env.VITE_TOKEN);

const ListingPage = () => {
	const navigate = useNavigate();
	const [isAgentPopupActive, setIsAgentPopupActive] = useState(false);
	const [listings, setListings] = useState<realEstateMany[] | null>(null);

	useEffect(() => {
		const fetchListings = async () => {
			try {
				const response = await getAllListings();
				setListings(response);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchListings();
	}, []);

	useEffect(() => {
		console.log(listings);
	}, [listings]);

	const handleAddListing = () => {
		navigate("/add-listing");
	};
	const handleAddAgent = () => {
		setIsAgentPopupActive(true);
	};
	return (
		<>
			<div className="flex justify-between items-center">
				<Filters />
				<div className="flex items-center justify-center gap-4">
					<CtaL
						ctaText="ლისტინგის დამატება"
						type={CtaTypes.primary}
						onClickHandler={handleAddListing}
					/>
					<CtaL
						ctaText="აგენტის დამატება"
						type={CtaTypes.secondary}
						onClickHandler={handleAddAgent}
					/>
				</div>
			</div>
			<FilterDisplay />
			<div className="mt-8 flex items-center justify-center gap-5 flex-wrap pb-[300px]">
				{listings &&
					[...listings, ...listings, ...listings, ...listings].map(
						(listing) => <ListingCard key={listing.id} listing={listing} />
					)}
			</div>
			<AddAgentFullscreenPopup
				isActive={isAgentPopupActive}
				setIsActiveState={setIsAgentPopupActive}
			/>
		</>
	);
};

export default ListingPage;
