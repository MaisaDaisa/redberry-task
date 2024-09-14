import { formatPriceWithCommas } from "@/lib/formatData";

export enum PostFixTypesEnum {
	GEL,
	areaSize,
}

interface RangePickerProps {
	postFixType: PostFixTypesEnum;
}
const RangePicker = ({ postFixType }: RangePickerProps) => {
	const numberInputs = [50000, 100000, 150000, 200000, 300000];

	type Input = {
		id: string;
		placeholder: string;
		title: string;
	};
	const inputs: Input[] = [
		{ id: "from", placeholder: "დან", title: "მინ. " },
		{ id: "to", placeholder: "მდე", title: "მაქს. " },
	];

	let postfix;

	switch (postFixType) {
		case PostFixTypesEnum.GEL:
			postfix = "₾";
			break;
		case PostFixTypesEnum.areaSize:
			postfix = (
				<>
					მ<sup>2</sup>
				</>
			);
			break;
		default:
			postfix = "";
	}

	return (
		<>
			<div className="w-[325px] self-start flex flex-row items-center gap-[15px]">
				{inputs.map((inputField: Input) => (
					<div className="relative flex flex-row items-center flex-grow basis-0">
						<input
							type="text"
							id={inputField.id}
							placeholder={inputField.placeholder}
							className="h-[42px] w-full p-[10px] main-text-sm-100-400 placeholder:main-text-sm-40-400 rounded-md border border-gray-text-color outline-none"
						/>
						<p className="absolute right-[10px] top-[50%] transform -translate-y-1/2 main-text-xs-100-400">
							{postfix}
						</p>
					</div>
				))}
			</div>
			<div className="flex items-start gap-6">
				{inputs.map((inputField: Input) => (
					<div className="w-[155px] flex flex-col items-start gap-4 ">
						<p className="main-text-sm-100">
							{inputField.title}{" "}
							{postFixType === PostFixTypesEnum.GEL ? "ფასი" : postfix}
						</p>
						<div className="flex flex-col gap-2">
							{numberInputs.map((number) => (
								<p
									className="main-text-sm-100-400 cursor-pointer"
									key={number}
									onClick={() => {
										const input = document.getElementById(inputField.id);
										input?.setAttribute("value", number.toString());
									}}>
									{formatPriceWithCommas(number)} {postfix}
								</p>
							))}
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default RangePicker;
