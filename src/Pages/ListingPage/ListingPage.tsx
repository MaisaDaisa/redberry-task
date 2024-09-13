import arrowLeft from "@/assets/svg/arrowLeft.svg";
import image from "./image.png";
import { useNavigate } from "react-router-dom";
import locationIcon from "@/assets/svg/location-marker.svg";
import sizeIcon from "@/assets/svg/Size.svg";
import bedIcon from "@/assets/svg/bed.svg";
import zipCodeIcon from "@/assets/svg/ZipCode.svg";

const ListingPage = () => {
	const navigate = useNavigate();
	return (
		<div className="mt-16 flex flex-col items-center w-full">
			<div className="self-start">
				<img
					src={arrowLeft}
					alt="arrow to go back"
					width={32}
					height={32}
					onClick={() => navigate("/")}
				/>
			</div>
			<div className="mt-[29px] flex flex-row justify-start gap-[68px]">
				<div className="flex flex-col items-end">
					<img
						src={image}
						alt="listing image"
						width={839}
						height={670}
						className="object-cover rounded-t-[14px] bg-no-repeat"
					/>
					<div className="mt-[9px] flex flex-row flex-nowrap gap-[10px]">
						<p className="gray-text">გამოქვეყნების თარიღი:</p>
						<p className="gray-text">08/08/24</p>
					</div>
				</div>
				<div className="pt-[30px] gap-10">
					<div className="flex flex-col items-start gap-6">
						<h2 className="main-text-5xl-100">80, 458 ₾</h2>
						<div className="flex flex-col gap-4">
							<div className="flex flex-row items-center gap-1">
								<img src={locationIcon} alt="icon" width={22} height={22} />
								<p className="gray-text-2xl">თბილისი, ი. ჭავჭავაძის 53</p>
							</div>
							<div className="flex flex-row items-center gap-1">
								<img src={sizeIcon} alt="icon" width={22} height={22} />
								<p className="gray-text-2xl">
									ფართობი 120 მ<sup>2</sup>
								</p>
							</div>
							<div className="flex flex-row items-center gap-1">
								<img src={bedIcon} alt="icon" width={22} height={22} />
								<p className="gray-text-2xl">საძინებელი 2</p>
							</div>
							<div className="flex flex-row items-center gap-1">
								<img src={zipCodeIcon} alt="icon" width={22} height={22} />
								<p className="gray-text-2xl">საფოსტო ინდექსი 2525</p>
							</div>
						</div>
					</div>
					<div className="flex gap-[50px]">
						<p className="gray-text">
							იყიდება ბინა ჭავჭავაძის ქუჩაზე, ვაკეში. ბინა არის ახალი რემონტით,
							ორი საძინებლითა და დიდი აივნებით. მოწყობილია ავეჯითა და ტექნიკით.
						</p>
						<div className="flex gap-5">
							<div className="rounded-lg border border-primary-gray-border h-[172px] self-stretch"></div>
							<div></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListingPage;
