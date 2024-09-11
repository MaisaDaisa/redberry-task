import Location from "./../../assets/svg/location-marker.svg";
import Bed from "./../../assets/svg/bed.svg";
import Size from "./../../assets/svg/Size.svg";
import ZipCode from "./../../assets/svg/ZipCode.svg";
import imagePhoto from "./image.png";

const ListingCard = () => {
	return (
		<div className="flex flex-col items-start flex-shrink-0 w-[384px]">
			<div className="relative h-[307px] w-full self-stretch">
				{/* Image container should be relative */}
				<img
					src={imagePhoto}
					alt="Listing" // Ensures the image fills the container // Ensures the image covers the entire container without distortion
					className="rounded-t-[14px]"
				/>
			</div>
			<div className="flex w-full py-[22px] px-[25px] flex-col justify-center items-start gap-5 align-stretch border border-t-0 border-primary-gray-border rounded-b-[14px]">
				<div className="flex flex-col items-start gap-[6px] self-stretch">
					<p className="main-text-2xl-100">80 000₾</p>
					<div className="flex justify-start gap-1 self-stretch">
						<img
							className="flex-shrink-0"
							src={Location}
							width={20}
							height={20}
							alt="Location marker"
						/>
						<p className="main-text-70">თბილისი, ი. ჭავჭავაძის 53</p>
					</div>
				</div>
				<div className="flex gap-8 items-center">
					<div className="flex items-center gap-[5px]">
						<img
							className="flex-shrink-0"
							src={Bed}
							width={24}
							height={24}
							alt="Bed icon"
						/>
						<p className="main-text-70">2</p>
					</div>
					<div className="flex items-center gap-[5px]">
						<img
							className="flex-shrink-0"
							src={Size}
							width={18}
							height={18}
							alt="Size icon"
						/>
						<p className="main-text-70">55მ</p>
					</div>
					<div className="flex items-center gap-[5px]">
						<img
							className="flex-shrink-0"
							src={ZipCode}
							width={16}
							height={18}
							alt="ZipCode icon"
						/>
						<p className="main-text-70">0160</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListingCard;
