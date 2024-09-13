import { useEffect, useState, useRef } from "react";
import TitleH4Component from "@/components/GlobalComponents/TitleH4Component";
import { clear } from "console";

export enum CheckerStateTypes {
	VALID,
	INVALID,
	NORMAL,
}

export enum InputFieldType {
	TEXT = "text",
	TEXTAREA = "textarea",
}

interface InputFieldProps {
	type?: InputFieldType;
	title: string;
	value: string;
	required?: boolean;
	stateSetter: (value: string) => void;
	customStyles?: string;
	checker?:
		| false
		| {
				checkerTime?: number;
				checkerText: string;
				checkerTextOnError: string;
				validationFunction: (value: string) => boolean;
		  };
}

const InputField = ({
	type = InputFieldType.TEXT,
	title,
	value,
	required = false,
	checker = false,
	stateSetter,
	customStyles = "",
}: InputFieldProps) => {
	const [checkerState, setCheckerState] = useState<CheckerStateTypes>(
		CheckerStateTypes.NORMAL
	);
	const [hasInteracted, setHasInteracted] = useState(false);

	// UseRef because each reusable component should have their own timeout or else they will interfere with each other
	// P.S Spent 3 hours debugging this issue
	const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (checker && hasInteracted) {
			// Clear any existing timeout before starting a new one
			if (typingTimeoutRef.current) {
				clearTimeout(typingTimeoutRef.current);
			}

			// Set a new timeout
			typingTimeoutRef.current = setTimeout(() => {
				if (checker.validationFunction(value)) {
					setCheckerState(CheckerStateTypes.VALID);
				} else {
					setCheckerState(CheckerStateTypes.INVALID);
				}
				// Developers may pass checkerTime as prop or it will be defaulted to 2000ms
			}, checker.checkerTime || 2000);

			// Cleanup timeout when the component unmounts or value changes
			return () => {
				if (typingTimeoutRef.current) {
					clearTimeout(typingTimeoutRef.current);
				}
			};
		}
	}, [value]);

	// Handle input/textarea change
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		if (!hasInteracted) {
			setHasInteracted(true);
		}
		stateSetter(e.target.value);
	};

	return (
		<TitleH4Component
			title={title}
			required={required}
			customStyles={customStyles}>
			{type === InputFieldType.TEXT ? (
				<input
					id="input_1"
					type="text"
					value={value}
					className={`input-field rounded-md h-[42px] border border-primary-gray-border w-full p-[10px] main-text-100-400 
						${
							checker && checkerState === CheckerStateTypes.INVALID
								? "border-red-500"
								: ""
						}`}
					onChange={handleChange}
				/>
			) : type === InputFieldType.TEXTAREA ? (
				<textarea
					id="input_1"
					rows={5}
					value={value}
					className={`input-field rounded-md border border-primary-gray-border w-full p-[10px] main-text-100-400 
						${
							checker && checkerState === CheckerStateTypes.INVALID
								? "border-red-500"
								: ""
						} `}
					onChange={handleChange}
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
							checkerState === CheckerStateTypes.NORMAL
								? "stroke-[#021526]"
								: checkerState === CheckerStateTypes.VALID
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
							checkerState === CheckerStateTypes.NORMAL
								? "text-primary-text-100"
								: checkerState === CheckerStateTypes.INVALID
								? "!text-invalid-red"
								: "!text-valid-green"
						}`}>
						{checkerState === CheckerStateTypes.INVALID
							? checker.checkerTextOnError
							: checker.checkerText}
					</p>
				</div>
			)}
		</TitleH4Component>
	);
};

export default InputField;
