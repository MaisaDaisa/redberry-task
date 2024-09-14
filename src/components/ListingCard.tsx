import LocationIcon from "@/assets/svg/location-marker.svg";
import Bed from "@/assets/svg/bed.svg";
import Size from "@/assets/svg/Size.svg";
import ZipCodeIcon from "@/assets/svg/ZipCode.svg";
import { realEstateMany } from "@/api/apiTypes";
import { useNavigate } from "react-router-dom";
import Tag from "./Tag";

interface ListingCardProps {
	listing: realEstateMany;
}

// ListingCard component

const ListingCard = ({ listing }: ListingCardProps) => {
	const navigate = useNavigate();
	return (
		<div
			onClick={() => console.log(navigate(`/listing/${listing.id}`))}
			className="flex cursor-pointer flex-col items-start flex-shrink-0 w-[384px] h-[] hover:shadow-primary-shadow duration-300 transition-all">
			<div className="relative h-[307px] w-full self-stretch">
				<Tag
					text={listing.is_rental === 1 ? "ქირავდება" : "იყიდება"}
					customClass="absolute top-[23px] left-[23px]"
				/>
				<img
					src={listing.image}
					alt="Listing"
					className="rounded-t-[14px] object-cover w-full h-full"
				/>
			</div>
			<div className="flex w-full py-[22px] px-[25px] flex-col justify-center items-start gap-5 align-stretch border border-t-0 border-primary-gray-border bg-transparent rounded-b-[14px]">
				<div className="flex flex-col items-start gap-[6px] self-stretch bg-transparent">
					<p className="main-text-2xl-100">
						{" "}
						{listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₾
					</p>
					<div className="flex justify-start gap-1 self-stretch">
						<img
							className="flex-shrink-0 w-5 h-5"
							src={LocationIcon}
							alt="Location marker"
						/>
						<p className="main-text-70">
							{listing.city.name}, {listing.address}
						</p>
					</div>
				</div>
				<div className="flex gap-8 items-center">
					<div className="flex items-center gap-[5px]">
						<img className="flex-shrink-0 w-6 h-6" src={Bed} alt="Bed icon" />
						<p className="main-text-70">{listing.bedrooms}</p>
					</div>
					<div className="flex items-center gap-[5px]">
						<img
							className="flex-shrink-0 w-[18px] h-[18px]"
							src={Size}
							alt="Size icon"
						/>
						<p className="main-text-70">
							{listing.area} მ<sup>2</sup>
						</p>
					</div>
					<div className="flex items-center gap-[5px]">
						<img
							className="flex-shrink-0 w-4 h-4"
							src={ZipCodeIcon}
							alt="ZipCode icon"
						/>
						<p className="main-text-70">{listing.zip_code}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListingCard;
