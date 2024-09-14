import InputField from "@/components/InputField";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import DropDownSelect from "../../components/DropDownSelect";
import { getRegions, getCities, getAgents } from "@/api/getRequests";
import { region, cityGet, agentGetMany } from "@/api/apiTypes";
import AddListPageSectionWrapper from "./AddListPageSectionWrapper";
import { InputFieldType } from "@/components/InputField";
import FileUploader from "@/components/FileUploader";
import { CtaTypes } from "@/components/Cta";
import Cta from "@/components/Cta";
import InputSectionWrapper from "@/components/InputSectionWrapper";
import TwoChoice from "@/Pages/AddListingPage/TwoChoice";
import plus from "@/assets/svg/plus-circle.svg";
import {
	minimumSymbols,
	checkNumbers,
	checkWordCount,
} from "@/lib/validationChecker";
import AddAgentFullscreenPopup from "../../components/AddAgentFullscreenPopup";
import { postListing } from "@/api/postRequests";

const AddListingPage = () => {
	const [addAgentPopupActive, setAddAgentPopupActive] = useState(false);
	const [towChoiceNumber, setTwoChoiceNumber] = useState<0 | 1>(0);
	// cities never contribute to the rendering of the component
	const cities = useRef<cityGet[] | null>(null);
	// filteredCities are used to render the dropdown select
	const [filteredCities, setFilteredCities] = useState<cityGet[] | null>(null);
	const [regions, setRegions] = useState<region[] | null>(null);
	const [chosenRegion, setChosenRegion] = useState<region | null>(null);
	const [chosenCity, setChosenCity] = useState<cityGet | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [address, setAddress] = useState("");
	const [zipCode, setZipCode] = useState("");
	const [price, setPrice] = useState("");
	const [area, setArea] = useState("");
	const [image, setImage] = useState<File | null>(null);
	const [bedroomsCount, setBedroomsCount] = useState<string>("");
	const [description, setDescription] = useState("");
	const [agents, setAgents] = useState<agentGetMany[] | null>(null);
	const [agent, setAgent] = useState<agentGetMany | null>(null);

	const navigate = useNavigate();

	const handleAddListing = () => {
		if (
			checkWordCount(description) &&
			checkNumbers(price) &&
			checkNumbers(area) &&
			checkNumbers(bedroomsCount) &&
			minimumSymbols(address) &&
			checkNumbers(zipCode)
		) {
			const formData = new FormData();
			formData.append("address", address);
			if (image) formData.append("image", image);
			if (chosenRegion)
				formData.append("region_id", chosenRegion.id.toString());
			if (chosenCity) formData.append("city_id", chosenCity.id.toString());
			formData.append("description", description);
			formData.append("zip_code", zipCode);
			formData.append("price", price);
			formData.append("area", area);
			formData.append("bedrooms", bedroomsCount);
			formData.append("is_rental", towChoiceNumber.toString());
			if (agent) formData.append("agent_id", agent.id.toString());

			postListing(formData).then(() => navigate("/"));
		}
	};

	const fetchAgents = async () => {
		console.log("Fetching agents");
		try {
			const agentsResponse = await getAgents();
			setAgents(agentsResponse);
		} catch (error) {
			console.error("Failed to fetch agents:", error);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const regionResponse = await getRegions();
				const cityResponse = await getCities();
				setRegions(regionResponse);
				cities.current = cityResponse;
				setChosenRegion(regionResponse[0]);
				setIsLoading(false);
				fetchAgents();
			} catch (error) {
				console.error("Failed to fetch regions or cities:", error);
			}
		};
		fetchData();
	}, []);

	// Filtering cities based on the chosen region
	useEffect(() => {
		if (chosenRegion !== null) {
			if (cities.current !== null) {
				// Access cities.current here
				const filtered = cities.current.filter(
					(city) => city.region_id === chosenRegion.id
				);
				setFilteredCities(filtered);
			}
		}
	}, [chosenRegion]);

	// This component is used to add agents to the dropdown select
	const addAgentsButton = (
		<li
			key={0}
			onClick={() => setAddAgentPopupActive(true)}
			className="p-[10px] hover:bg-blue-100 cursor-pointer bg-primary-white main-text-sm-100-400 border-primary-gray-border border-b-[1px] flex flex-row justify-start items-center gap-2">
			<img src={plus} alt="add-button" width={20} height={20} />{" "}
			<p>დაამატე აგენტი</p>
		</li>
	);

	return isLoading ? (
		""
	) : (
		<div className="flex flex-col items-center">
			<h1 className="main-text-3xl-100">ლისტინგის დამატება</h1>
			<InputSectionWrapper>
				<div className="flex flex-col gap-y-2 flex-wrap self-start ">
					<h3 className="secondary-text">გარიგების ტიპი</h3>
					<TwoChoice
						selected={towChoiceNumber}
						setSelected={setTwoChoiceNumber}
					/>
				</div>
				<AddListPageSectionWrapper title="მდებარეობა">
					<InputField
						title="მისამართი"
						value={address}
						required={true}
						stateSetter={setAddress}
						checker={{
							checkerTime: 1000,
							validationFunction: minimumSymbols,
							checkerText: "მინიმუმ ორი სიმბოლო",
							checkerTextOnError: "ჩაწერეთ ვალიდური მონაცემები",
						}}
					/>
					<InputField
						title="საფოსტო ინდექსი"
						required={true}
						value={zipCode}
						stateSetter={setZipCode}
						checker={{
							checkerTime: 2000,
							validationFunction: checkNumbers,
							checkerText: "მხოლოდ რიცხვები",
							checkerTextOnError: "ჩაწერეთ ვალიდური მონაცემები",
						}}
					/>
					{regions && (
						<DropDownSelect
							items={regions}
							title="რეგიონი"
							required={true}
							parentStateSetter={setChosenRegion}
						/>
					)}
					{filteredCities && (
						<DropDownSelect
							// we pass in the key of the first city in the filteredCities array
							// because the region_id is always unique and forces the component to rerender
							key={filteredCities[0].region_id}
							items={filteredCities}
							title="ქალაქი"
							required={true}
							parentStateSetter={setChosenCity}
						/>
					)}
				</AddListPageSectionWrapper>
				<AddListPageSectionWrapper title="მიწოდება">
					<InputField
						title="ფასი"
						value={price}
						required={true}
						stateSetter={setPrice}
						checker={{
							checkerTime: 2000,
							validationFunction: checkNumbers,
							checkerText: "მხოლოდ რიცხვები",
							checkerTextOnError: "ჩაწერეთ ვალიდური მონაცემები",
						}}
					/>
					<InputField
						title="ფართობი"
						required={true}
						value={area}
						stateSetter={setArea}
						checker={{
							validationFunction: checkNumbers,
							checkerText: "მხოლოდ რიცხვები",
							checkerTextOnError: "ჩაწერეთ ვალიდური მონაცემები",
						}}
					/>
					<InputField
						title="საძინებლის რაოდენობა"
						required={true}
						value={bedroomsCount}
						stateSetter={setBedroomsCount}
						checker={{
							checkerTime: 100,
							validationFunction: checkNumbers,
							checkerText: "მხოლოდ რიცხვები",
							checkerTextOnError: "ჩაწერეთ ვალიდური მონაცემები",
						}}
					/>
					<InputField
						title="აღწერა"
						required={true}
						value={description}
						stateSetter={setDescription}
						type={InputFieldType.TEXTAREA}
						customStyles="col-span-2"
						checker={{
							checkerTime: 100,
							validationFunction: checkWordCount,
							checkerText: "მინიმუმ ხუთი სიტყვა",
							checkerTextOnError: "ჩაწერეთ ვალიდური მონაცემები",
						}}
					/>
					<FileUploader
						setFileState={setImage}
						title="ატვირთეთ ფოტო"
						customStyles="col-span-2"
						required={true}
					/>
				</AddListPageSectionWrapper>
				<AddListPageSectionWrapper title="აგენტი">
					{agents && (
						<DropDownSelect
							title="აირჩიე"
							required={true}
							isAgents={true}
							items={agents}
							additionalComponent={addAgentsButton}
							parentStateSetter={setAgent}
						/>
					)}
				</AddListPageSectionWrapper>
				<div className="mt-[90px] flex flex-row justify-end gap-[15px] w-full">
					<Cta
						type={CtaTypes.secondary}
						ctaText="გაუქმება"
						onClickHandler={() => {
							navigate("/");
						}}
					/>
					<Cta
						type={CtaTypes.primary}
						ctaText="დაამატე ლისტინგი"
						onClickHandler={() => handleAddListing()}
					/>
				</div>
				<AddAgentFullscreenPopup
					isActive={addAgentPopupActive}
					setIsActiveState={setAddAgentPopupActive}
					invokeOnSend={() => fetchAgents()}
				/>
			</InputSectionWrapper>
		</div>
	);
};

export default AddListingPage;
