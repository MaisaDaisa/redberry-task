import TitleH4Component from "@/components/GlobalComponents/TitleH4Component";
import { useState, useRef } from "react";
import plusCircle from "@/assets/svg/plus-circle.svg";
import trashCan from "@/assets/svg/trashCan.svg";

interface FileUploaderProps {
	title: string;
	customStyles?: string;
	required: boolean;
	setFileState: (file: File | null) => void;
}

const FileUploader = ({
	title = "",
	customStyles = "",
	setFileState,
	required = false,
}: FileUploaderProps) => {
	const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
	const [dropRejected, setDropRejected] = useState(false);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setDropRejected(false);
		const file = event.dataTransfer.files[0];

		if (file && file.size <= 1048576) {
			// 1MB
			setFileState(file);

			const reader = new FileReader();
			reader.onload = () => {
				setPreview(reader.result);
			};
			reader.readAsDataURL(file);
		} else {
			setDropRejected(true);
		}
	};

	const handleDelete = () => {
		setPreview(null);
		setFileState(null);
	};

	return (
		<TitleH4Component
			title={title}
			customStyles={customStyles}
			required={required}>
			<div
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				onClick={() => inputRef.current?.click()}
				className={`group flex justify-center items-center h-[120px] border border-dashed ${
					!dropRejected ? "border-primary-text-100" : "border-invalid-red"
				} rounded-lg w-full select-none ${
					preview ? "cursor-default" : "cursor-pointer"
				}`}
				aria-label="File upload area"
				role="button">
				<input
					type="file"
					disabled={!!preview}
					onChange={(event) => {
						const file = event.target.files ? event.target.files[0] : null;
						if (file) {
							setFileState(file);
							const reader = new FileReader();
							reader.onload = () => {
								setPreview(reader.result);
							};
							reader.readAsDataURL(file);
						}
					}}
					hidden
					accept="image/png, image/jpeg"
					ref={inputRef}
				/>
				{preview ? (
					<div className="relative flex flex-col items-end justify-end">
						<img
							src={preview as string}
							alt="preview"
							className="w-[96px] h-[82px] object-cover rounded-[4px]"
						/>
						<img
							src={trashCan}
							alt="delete"
							width={14}
							height={14}
							className="absolute translate-x-[3px] translate-y-[3px] cursor-pointer"
							onClick={handleDelete}
						/>
					</div>
				) : (
					<img
						src={plusCircle}
						alt="plus-circle"
						className={`w-[24px] h-[24px] scale-100 transition-transform group-hover:scale-125`}
					/>
				)}
			</div>

			<div>
				<p
					className={`main-text-sm-100-400 mt-2 !text-invalid-red ${
						!dropRejected ? "invisible" : ""
					}`}>
					Please input an image file under 1MB
				</p>
			</div>
		</TitleH4Component>
	);
};

export default FileUploader;
