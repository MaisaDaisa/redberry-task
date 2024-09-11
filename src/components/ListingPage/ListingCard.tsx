import LocationIcon from "./../../assets/svg/location-marker.svg";
import Bed from "./../../assets/svg/bed.svg";
import Size from "./../../assets/svg/Size.svg";
import ZipCodeIcon from "./../../assets/svg/ZipCode.svg";
import imagePhoto from "./image.png";

interface ListingCardProps {
	imageUrl?: string;
	price?: number;
	location?: string;
	numOfBedrooms?: number;
	areaSize?: number;
	zipCode?: number;
	id?: number;
}

// ListingCard component

const ListingCard = ({
	imageUrl = imagePhoto,
	price = 80000,
	location = "თბილისი, ი. ჭავჭავაძის 53",
	numOfBedrooms = 2,
	areaSize = 55,
	zipCode = 160,
	id,
}: ListingCardProps) => {
	return (
		<div
			onClick={() => console.log(id)}
			className="flex cursor-pointer flex-col items-start flex-shrink-0 w-[384px] hover:shadow-primary-shadow duration-300 transition-all">
			<div className="relative h-[307px] w-full self-stretch">
				{/* Image container should be relative */}
				<img
					src={imageUrl || imagePhoto}
					alt="Listing" // Ensures the image fills the container // Ensures the image covers the entire container without distortion
					className="rounded-t-[14px] object-cover w-full h-full"
				/>
			</div>
			<div className="flex w-full py-[22px] px-[25px] flex-col justify-center items-start gap-5 align-stretch border border-t-0 border-primary-gray-border bg-transparent rounded-b-[14px]">
				<div className="flex flex-col items-start gap-[6px] self-stretch bg-transparent">
					<p className="main-text-2xl-100">
						{" "}
						{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₾
					</p>
					<div className="flex justify-start gap-1 self-stretch">
						<img
							className="flex-shrink-0"
							src={LocationIcon}
							width={20}
							height={20}
							alt="Location marker"
						/>
						<p className="main-text-70">{location}</p>
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
						<p className="main-text-70">{numOfBedrooms}</p>
					</div>
					<div className="flex items-center gap-[5px]">
						<img
							className="flex-shrink-0"
							src={Size}
							width={18}
							height={18}
							alt="Size icon"
						/>
						<p className="main-text-70">
							{areaSize} მ<sup>2</sup>
						</p>
					</div>
					<div className="flex items-center gap-[5px]">
						<img
							className="flex-shrink-0"
							src={ZipCodeIcon}
							width={16}
							height={18}
							alt="ZipCode icon"
						/>
						<p className="main-text-70">{zipCode}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListingCard;
