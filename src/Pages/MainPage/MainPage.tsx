import CtaL from "@/components/CtaL";
import { CtaTypes } from "@/components/Cta";
import FilterDisplay from "@/Pages/MainPage/Filter/FilterDisplay";
import ListingCard from "@/components/ListingCard";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddAgentFullscreenPopup from "@/components/AddAgentFullscreenPopup";
import { realEstateMany, region } from "@/api/apiTypes";
import { getAllListings, getRegions } from "@/api/getRequests";
import FilterDropDownButtons from "@/Pages/MainPage/Filter/FilterDropDownButtons";
import CheckBoxWithText from "@/components/CheckBoxWithText";
import RangePicker, { PostFixTypesEnum } from "@/components/RangePicker";

console.log(import.meta.env.VITE_TOKEN);

const ListingPage = () => {
	const navigate = useNavigate();
	const [isAgentPopupActive, setIsAgentPopupActive] = useState(false);
	const [listings, setListings] = useState<realEstateMany[] | null>(null);
	const regionsData = useRef<region[]>([]);
	const [selectedRegionIDs, setSelectedRegionIDs] = useState<number[]>([]);

	useEffect(() => {
		const fetchListings = async () => {
			try {
				const response = await getAllListings();
				const regionsResponse = await getRegions();
				setListings(response);
				regionsData.current = regionsResponse as region[];
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchListings();
	}, []);

	const handleMultiChoiceRegionClick = (id: number) => {
		if (selectedRegionIDs.includes(id)) {
			setSelectedRegionIDs(
				selectedRegionIDs.filter((regionID) => regionID !== id)
			);
		} else {
			setSelectedRegionIDs([...selectedRegionIDs, id]);
		}
	};

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
				<div className="flex p-[6px] items-center gap-6 border rounded-[10px] border-main-primary-gray-border w-auto">
					<FilterDropDownButtons
						filterText="რეგიონი"
						dropDownTitle="რეგიონის მიხედვით">
						<div className="flex  items-end gap-y-4 gap-x-[50px] content-end flex-wrap w-[678px]">
							{regionsData.current.map((region) => (
								<CheckBoxWithText
									isChecked={selectedRegionIDs.includes(region.id)}
									key={region.id}
									text={region.name}
									onClickHandler={() => handleMultiChoiceRegionClick(region.id)}
								/>
							))}
						</div>
					</FilterDropDownButtons>
					<FilterDropDownButtons
						filterText="საფასო კატეგორია"
						dropDownTitle="ფასის მიხედვით">
						<RangePicker postFixType={PostFixTypesEnum.GEL} />
					</FilterDropDownButtons>
					<FilterDropDownButtons
						filterText="ფართობი"
						dropDownTitle="ფართობის მიხედვით">
						<RangePicker postFixType={PostFixTypesEnum.areaSize} />
					</FilterDropDownButtons>
					<FilterDropDownButtons
						filterText="საძინებლების რაოდენობა"
						dropDownTitle="საძინებლების რაოდენობა">
						<input
							type="text"
							className="h-[42px] p-[10px] w-[42px] self-start main-text-sm-40-400 text-center border border-gary-text-color rounded-md outline-none"
						/>
					</FilterDropDownButtons>
				</div>
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
