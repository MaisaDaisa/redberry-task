import TitleH4Component from "@/components/GlobalComponents/TitleH4Component";

export enum CheckerState {
	VALID,
	INVALID,
	EMPTY,
}

export enum InputFieldType {
	TEXT = "text",
	TEXTAREA = "textarea",
}

interface InputFieldProps {
	type?: InputFieldType;
	title: string;
	required?: boolean;
	stateSetter: (value: string) => void;
	customStyles?: string;
	checker?:
		| false
		| {
				checkerText: string;
				checkerState: CheckerState;
				checkerTextOnError: string;
		  };
}

const InputField = ({
	type = InputFieldType.TEXT,
	title,
	required = false,
	checker = false,
	stateSetter,
	customStyles = "",
}: InputFieldProps) => {
	return (
		<TitleH4Component
			title={title}
			required={required}
			customStyles={customStyles}>
			{type === InputFieldType.TEXT ? (
				<input
					id="input_1"
					type="text"
					className={`input-field rounded-md h-[42px] border border-primary-gray-border w-full p-[10px] main-text-100-400 focus:outline-none focus:border-primary-blue 
						${
							checker && checker.checkerState === CheckerState.INVALID
								? "border-red-500"
								: ""
						} 
					`}
					onChange={(e) => {
						stateSetter(e.target.value);
					}}
				/>
			) : type === InputFieldType.TEXTAREA ? (
				<textarea
					id="input_1"
					rows={5}
					className={`input-field rounded-md border border-primary-gray-border w-full p-[10px] main-text-100-400 focus:outline-none focus:border-primary-blue 
						${
							checker && checker.checkerState === CheckerState.INVALID
								? "border-red-500"
								: ""
						} 
						${customStyles}`}
					onChange={(e) => {
						stateSetter(e.target.value);
					}}
				/>
			) : null}

			{checker && (
				<div className="flex flex-row gap-[7px] mt-1 items-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="12"
						height="11"
						viewBox="0 0 12 11"
						fill="none"
						className={`${
							checker.checkerState === CheckerState.EMPTY
								? "stroke-[#021526]"
								: checker.checkerState === CheckerState.VALID
								? "stroke-valid-green"
								: "stroke-invalid-red"
						}`}>
						<path
							d="M11 1.40918L4.125 9.591L1 5.87199"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					<p
						className={`main-text-sm-100-400 ${
							checker.checkerState === CheckerState.EMPTY
								? "text-primary-text-100"
								: checker.checkerState === CheckerState.INVALID
								? "!text-invalid-red"
								: "!text-valid-green"
						}`}>
						{checker.checkerState === CheckerState.INVALID
							? checker.checkerTextOnError
							: checker.checkerText}
					</p>
				</div>
			)}
		</TitleH4Component>
	);
};

export default InputField;
