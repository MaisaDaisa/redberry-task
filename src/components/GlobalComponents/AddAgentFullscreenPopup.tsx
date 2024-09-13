import { useEffect, useState } from "react";
import InputSectionWrapper from "@/components/GlobalComponents/InputSectionWrapper";
import AddListPageSectionWrapper from "@/components/AddListingPage/AddListPageSectionWrapper";
import InputField from "@/components/GlobalComponents/InputField";
import FileUploader from "@/components/GlobalComponents/FileUploader";
import { CtaTypes } from "@/components/GlobalComponents/Cta";
import Cta from "@/components/GlobalComponents/Cta";
import { postAgents } from "@/api/postRequests";

// Importing CheckerFunctions
import {
	minimumSymbols,
	checkEmail,
	checkNumbers,
} from "@/lib/validationChecker";

interface AddAgentFullscreenPopupProps {
	isActive: boolean;
	setIsActiveState: (state: boolean) => void;
}

const AddAgentFullscreenPopup = ({
	isActive,
	setIsActiveState,
}: AddAgentFullscreenPopupProps) => {
	const [agentName, setAgentName] = useState("");
	const [agentLastName, setAgentLastName] = useState("");
	const [agentEmail, setAgentEmail] = useState("");
	const [agentPhone, setAgentPhone] = useState("");
	const [agentProfile, setAgentProfile] = useState<File | null>(null);

	useEffect(() => {
		// Testing the values
		console.log(agentName);
		console.log(agentLastName);
		console.log(agentEmail);
		console.log(agentPhone);
		console.log(agentProfile);
	}, [agentName, agentLastName, agentEmail, agentPhone, agentProfile]);

	// Convert file to Base64
	const handleAddAgent = async () => {
		if (
			minimumSymbols(agentName) &&
			checkEmail(agentEmail) &&
			checkNumbers(agentPhone) &&
			agentProfile
		) {
			const formData = new FormData();
			// Creating the agent object
			formData.append("name", agentName);
			formData.append("surname", agentLastName);
			formData.append("email", agentEmail);
			formData.append("phone", agentPhone);
			formData.append("avatar", agentProfile);
			// Posting the agent
			console.log(formData);

			await postAgents(formData);

			// Closing the popup
			setIsActiveState(false);
		}
	};

	useEffect(() => {
		// Disable scrolling when the popup is active
		if (isActive) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [isActive]);

	return (
		<section
			className={`fixed w-full h-dvh bg-blur backdrop-blur-[5px] z-20 top-0 left-0 items-center justify-center ${
				isActive ? "flex animate-fade-in-up" : "hidden"
			}`}
			id={"agent-adder"}>
			<div className="w-[1009px] h-[784px] flex-shrink-0 rounded-[10px] bg-primary-white shadow-primary-shadow flex flex-col items-center py-[87px]">
				<h1 className="main-text-3xl-100">აგენტის დამატება</h1>
				<InputSectionWrapper>
					<AddListPageSectionWrapper>
						<InputField
							key={111}
							title="სახელი"
							value={agentName}
							required={true}
							stateSetter={setAgentName}
							checker={{
								checkerTime: 500,
								checkerText: "მინიმუმ ორი სიმბოლო",
								checkerTextOnError: "ჩაწერეთ ვალიდური მონაცემები",
								validationFunction: minimumSymbols,
							}}
						/>
						<InputField
							key={222}
							title="გვარი"
							required={false}
							value={agentLastName}
							stateSetter={setAgentLastName}
							checker={{
								checkerTime: 500,
								validationFunction: minimumSymbols,
								checkerText: "მინიმუმ ორი სიმბოლო",
								checkerTextOnError: "ჩაწერეთ ვალიდური მონაცემები",
							}}
						/>
						<InputField
							title="ელ-ფოსტა"
							required={true}
							value={agentEmail}
							stateSetter={setAgentEmail}
							checker={{
								checkerTime: 1000,
								validationFunction: checkEmail,
								checkerText: "გამოიყენეთ @redberry.ge ფოსტა",
								checkerTextOnError: "ჩაწერეთ ვალიდური მონაცემები",
							}}
						/>
						<InputField
							title="ტელეფონის ნომერი"
							required={false}
							stateSetter={setAgentPhone}
							value={agentPhone}
							checker={{
								checkerTime: 1000,
								validationFunction: checkNumbers,
								checkerText: "მხოლოდ რიცხვები",
								checkerTextOnError: "ჩაწერეთ ვალიდური მონაცემები",
							}}
						/>
						<FileUploader
							setFileState={setAgentProfile}
							title="ატვირთეთ ფოტო"
							customStyles="col-span-2"
							required={true}
						/>
					</AddListPageSectionWrapper>
					<div className="flex flex-row justify-end gap-[15px] w-full">
						<Cta
							type={CtaTypes.secondary}
							ctaText="გაუქმება"
							onClickHandler={() => setIsActiveState(false)}
						/>
						<Cta
							type={CtaTypes.primary}
							ctaText="დაამატე აგენტი"
							onClickHandler={handleAddAgent}
						/>
					</div>
				</InputSectionWrapper>
			</div>
		</section>
	);
};

export default AddAgentFullscreenPopup;
