import { useState } from "react";
import InputSectionWrapper from "@/components/GlobalComponents/InputSectionWrapper";
import AddListPageSectionWrapper from "@/components/AddListingPage/AddListPageSectionWrapper";
import InputField from "@/components/GlobalComponents/InputField";
import { CheckerState } from "@/components/GlobalComponents/InputField";
import FileUploader from "@/components/GlobalComponents/FileUploader";
import { CtaTypes } from "@/components/GlobalComponents/Cta";
import Cta from "@/components/GlobalComponents/Cta";

const AddAgentPopup = ({ status }) => {
	const [agentName, setAgentName] = useState("");
	const [agentLastName, setAgentLastName] = useState("");
	const [agentEmail, setAgentEmail] = useState("");
	const [agentPhone, setAgentPhone] = useState("");
	const [agentProfile, setAgentProfile] = useState("");
	return (
		<div className="w-[1009px] h-[784px] flex-shrink-0 rounded-[10px] bg-primary-white shadow-primary-shadow flex flex-col items-center">
			<h1 className="main-text-3xl-100">აგენტის დამატება</h1>
			<InputSectionWrapper>
				<AddListPageSectionWrapper>
					<InputField
						title="სახელი"
						required={true}
						stateSetter={setAgentName}
						checker={{
							checkerText: "მინიმუმ ორი სიმბოლო",
							checkerState: CheckerState.INVALID,
							checkerTextOnError: "ჩაწერეთ ვალიდური მონაცემები",
						}}
					/>
					<InputField
						title="გვარი"
						required={false}
						stateSetter={setAgentLastName}
						checker={{
							checkerText: "მინიმუმ ორი სიმბოლო",
							checkerState: CheckerState.INVALID,
							checkerTextOnError: "ჩაწერეთ ვალიდური მონაცემები",
						}}
					/>
					<InputField
						title="ელ-ფოსტა"
						required={true}
						stateSetter={setAgentEmail}
						checker={{
							checkerText: "გამოიყენეთ @redberry.ge ფოსტა",
							checkerState: CheckerState.INVALID,
							checkerTextOnError: "ჩაწერეთ ვალიდური მონაცემები",
						}}
					/>
					<InputField
						title="ტელეფონის ნომერი"
						required={false}
						stateSetter={setAgentEmail}
						checker={{
							checkerText: "მხოლოდ რიცხვები",
							checkerState: CheckerState.INVALID,
							checkerTextOnError: "ჩაწერეთ ვალიდური მონაცემები",
						}}
					/>
					<FileUploader
						title="ატვირთეთ ფოტო"
						customStyles="col-span-2"
						required={true}
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

export default AddAgentPopup;
