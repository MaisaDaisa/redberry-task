import singleChoiceSelected from "@/assets/svg/singleChoiceSelected.svg";
import singleChoiceUnselected from "@/assets/svg/singleChoiceUnselected.svg";
import InputField from "@/components/GlobalComponents/InputField";
import { useState } from "react";
import { CheckerState } from "@/components/GlobalComponents/InputField";

const AddListingPage = () => {
	const [cityState, setCityState] = useState<string>("");
	return (
		<div className="flex flex-col items-center">
			<h1 className="main-text-3xl-100">ლისტინგის დამატება</h1>
			<div className="mt-[61px] flex flex-col items-center gap-20 w-[790px]">
				<div className="flex flex-col gap-y-2 flex-wrap self-start ">
					<h3 className="secondary-text">გარიგების ტიპი</h3>
					<div className="flex flex-row gap-x-8 ">
						<div className="flex w-[134px] flex-row justify-start flex-shrink-0 flex-nowrap gap-[7px]">
							<img
								src={singleChoiceSelected}
								alt=""
								width="17"
								height="17"
								className="cursor-pointer"
							/>
							<p className="main-text-sm-100-400">იყიდება</p>
						</div>
						<div className="flex w-[134px] flex-row justify-start flex-shrink-0 flex-nowrap gap-[7px]">
							<img
								src={singleChoiceUnselected}
								alt=""
								width="17"
								height="17"
								className="cursor-pointer"
							/>
							<p className="main-text-sm-100-400">ქირავდება</p>
						</div>
					</div>
				</div>
				<div className="flex flex-col items-start gap-[22px] w-full self-stretch">
					<h3 className="secondary-text">მდებარეობა</h3>
					<div className="grid grid-cols-2 gap-5 w-full">
						<InputField
							title="მისამართი"
							required={true}
							stateSetter={setCityState}
							checker={{
								checkerText: "მინიმუმ ორი სიმბოლო",
								checkerState: CheckerState.INVALID,
								checkerTextOnError: "ჩაწერეთ ვალიდური მონაცემები",
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddListingPage;
