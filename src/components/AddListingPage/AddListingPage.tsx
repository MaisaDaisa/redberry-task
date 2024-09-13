import InputField from "@/components/GlobalComponents/InputField";
import { useEffect, useState } from "react";
import DropDownSelect from "../GlobalComponents/DropDownSelect";
import { getRegions, getCities } from "@/api/getRequests";
import { region, city } from "@/api/apiTypes";
import AddListPageSectionWrapper from "./AddListPageSectionWrapper";
import { InputFieldType } from "@/components/GlobalComponents/InputField";
import FileUploader from "@/components/GlobalComponents/FileUploader";
import { CtaTypes } from "@/components/GlobalComponents/Cta";
import Cta from "@/components/GlobalComponents/Cta";
import InputSectionWrapper from "@/components/GlobalComponents/InputSectionWrapper";
import TwoChoice from "@/components/AddListingPage/TwoChoice";
import {
	minimumSymbols,
	checkNumbers,
	checkWordCount,
} from "@/lib/validationChecker";

// Importing Dummy Data
import { agents } from "@/api/DummyData";

const AddListingPage = () => {
	const [towChoiceNumber, setTwoChoiceNumber] = useState<0 | 1>(0);
	const [cities, setCities] = useState<city[] | null>(null);
	const [filteredCities, setFilteredCities] = useState<city[] | null>(null);
	const [regions, setRegions] = useState<region[] | null>(null);
	const [chosenRegion, setChosenRegion] = useState<region | null>(null);
	const [chosenCity, setChosenCity] = useState<city | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [address, setAddress] = useState("");
	const [zipCode, setZipCode] = useState("");
	const [price, setPrice] = useState("");
	const [area, setArea] = useState("");
	const [roomCount, setRoomCount] = useState("");
	const [description, setDescription] = useState("");
	const [agent, setAgent] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const regionResponse = await getRegions();
				const cityResponse = await getCities();
				setRegions(regionResponse);
				setCities(cityResponse);
				setChosenRegion(regionResponse[0]);
				setIsLoading(false);
			} catch (error) {
				console.error("Failed to fetch regions or cities:", error);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (chosenRegion !== null) {
			if (cities !== null) {
				const filteredCities = cities.filter(
					(city) => city.region_id === chosenRegion.id
				);
				setFilteredCities(filteredCities);
			}
		}
	}, [chosenRegion]);

	useEffect(() => {
		console.log("Chosen city:", chosenCity);
	}, [chosenCity]);

	return isLoading ? (
		""
	) : (
		<div className="flex flex-col items-center">
			{/* Due to this section having different gaps and size margins it is not
			reused as a component for later use please use AddListPageSectionWrapper
			component */}
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
						value={roomCount}
						stateSetter={setRoomCount}
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
						title="ატვირთეთ ფოტო"
						customStyles="col-span-2"
						required={true}
					/>
				</AddListPageSectionWrapper>
				<AddListPageSectionWrapper title="აგენტი">
					<DropDownSelect
						title="აირჩიე"
						required={true}
						items={agents}
						parentStateSetter={setAgent}
					/>
				</AddListPageSectionWrapper>
				<div className="mt-[90px] flex flex-row justify-end gap-[15px] w-full">
					<Cta
						type={CtaTypes.secondary}
						ctaText="გაუქმება"
						onClickHandler={() => {}}
					/>
					<Cta
						type={CtaTypes.primary}
						ctaText="დაამატე ლისტინგი"
						onClickHandler={() => {}}
					/>
				</div>
			</InputSectionWrapper>
		</div>
	);
};

export default AddListingPage;
