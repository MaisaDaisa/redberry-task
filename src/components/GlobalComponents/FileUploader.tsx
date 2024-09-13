import TitleH4Component from "@/components/GlobalComponents/TitleH4Component";
import { useState, useCallback } from "react";
import plusCircle from "@/assets/svg/plus-circle.svg";
import trashCan from "@/assets/svg/trashCan.svg";
import { useDropzone } from "react-dropzone";

interface FileUploaderProps {
	title: string;
	customStyles?: string;
	required: boolean;
}

const FileUploader = ({
	title = "",
	customStyles = "",
	required = false,
}: FileUploaderProps) => {
	const [file, setFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
	// I understand that this is not necessary and was not stated in the requirements, however I added this to give the user feedback
	const [dorpRejected, setDropRejected] = useState(false);

	// Invoke once the file is dropped
	const onDropHandler = useCallback((acceptedFiles: File[]) => {
		// Drop may have rejected prior
		setDropRejected(false);
		const file = acceptedFiles[0];
		setFile(file);

		const reader = new FileReader();
		reader.onload = () => {
			setPreview(reader.result);
		};
		reader.readAsDataURL(file);
	}, []);

	const onDropRejectedHandler = useCallback(() => {
		setDropRejected(true);
	}, []);

	const handleDelete = () => {
		setPreview(null);
		setFile(null);
	};

	const maxSize = 1048576; // 1MB

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDropAccepted: onDropHandler,
		accept: { "image/*": [".jpg", ".jpeg", ".png"] },
		disabled: !!preview, // Disable if preview is present
		maxSize: maxSize,
		onDropRejected: onDropRejectedHandler,
	});

	return (
		<TitleH4Component
			title={title}
			customStyles={customStyles}
			required={required}>
			<div
				{...getRootProps()}
				className={`group flex justify-center items-center h-[120px] border border-dashed ${
					!dorpRejected ? "border-primary-text-100" : "border-invalid-red"
				} rounded-lg w-full select-none ${
					preview ? "cursor-not-allowed" : "cursor-pointer"
				}`}>
				<input {...getInputProps()} disabled={!!preview} />
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
						className={`w-[24px] h-[24px] scale-100 transition-transform group-hover:scale-125 ${
							isDragActive ? "transform scale-125" : ""
						}`}
					/>
				)}
			</div>

			<div>
				<p
					className={`main-text-sm-100-400 mt-2 !text-invalid-red ${
						!dorpRejected ? " invisible " : ""
					}`}>
					Please Input An Image file Under 1MB{" "}
				</p>
			</div>
		</TitleH4Component>
	);
};

export default FileUploader;
