import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import arrowLeft from "@/assets/svg/arrowLeft.svg";
import locationIcon from "@/assets/svg/location-marker.svg";
import sizeIcon from "@/assets/svg/Size.svg";
import bedIcon from "@/assets/svg/bed.svg";
import zipCodeIcon from "@/assets/svg/ZipCode.svg";
import phoneIcon from "@/assets/svg/phoneIcon.svg";
import emailIcon from "@/assets/svg/emailIcon.svg";
import Cta, { CtaTypes } from "@/components/Cta";
import ListingCard from "@/components/ListingCard";
import { getAllListings, getListingById } from "@/api/getRequests";
import { realEstateMany, realEstateOne } from "@/api/apiTypes";
import { checkNumbers } from "@/lib/validationChecker";
import { formatDate } from "@/lib/formatData";

const ListingPage = () => {
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [recommendedListings, setRecommendedListings] = useState<
		realEstateMany[] | null
	>(null);
	const [specificListing, setSpecificListing] = useState<realEstateOne | null>(
		null
	);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const recommendedListingsResponse = await getAllListings();
				setRecommendedListings(recommendedListingsResponse);

				if (id && checkNumbers(id)) {
					const specificListingResponse = await getListingById(id);
					setSpecificListing(specificListingResponse);
				}
			} catch (error) {
				setError("Failed to load data.");
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, [id]);

	const navigate = useNavigate();

	const handleBackClick = useCallback(() => {
		navigate("/");
	}, [navigate]);

	const handleDeleteListing = useCallback(() => {
		// Implement the delete listing logic here
	}, []);

	let agent = specificListing?.agent;
	let phoneNumber = specificListing?.agent.phone;
	let listingDate = new Date(specificListing?.created_at ?? "");

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<div className="mt-16 flex flex-col items-start w-full">
			<div className="self-start cursor-pointer">
				<img
					src={arrowLeft}
					alt="arrow to go back"
					width={32}
					height={32}
					onClick={handleBackClick}
				/>
			</div>
			<div className="mt-[29px] flex flex-row justify-start gap-[68px]">
				<div className="flex flex-col items-end relative">
					<div className="absolute top-[41px] left-[41px] rounded-[20px] bg-primary-text-50 w-[142px] h-[41px] p-[6xp] flex justify-center items-center">
						<p className="white-text-xl-500">
							{specificListing?.is_rental ? "ქირავდება" : "იყიდება"}
						</p>
					</div>
					<img
						src={specificListing?.image}
						alt="listing image"
						className="object-cover rounded-t-[14px] bg-no-repeat w-[839px] h-[670px]"
					/>
					<div className="mt-[9px] flex flex-row flex-nowrap gap-[10px]">
						<p className="gray-text">გამოქვეყნების თარიღი:</p>
						<p className="gray-text">{formatDate(listingDate)}</p>
					</div>
				</div>
				<div className="pt-[30px] flex flex-col gap-10 w-[503px] h-[714px]">
					<div className="flex flex-col items-start gap-6">
						<h2 className="main-text-5xl-100">
							{specificListing?.price.toLocaleString().replace(/,/g, ", ")} ₾
						</h2>
						<div className="flex flex-col gap-4">
							<div className="flex flex-row items-center gap-1">
								<img src={locationIcon} alt="icon" width={22} height={22} />
								<p className="gray-text-2xl">{specificListing?.address}</p>
							</div>
							<div className="flex flex-row items-center gap-1">
								<img src={sizeIcon} alt="icon" width={22} height={22} />
								<p className="gray-text-2xl">
									ფართობი {specificListing?.area} მ<sup>2</sup>
								</p>
							</div>
							<div className="flex flex-row items-center gap-1">
								<img src={bedIcon} alt="icon" width={22} height={22} />
								<p className="gray-text-2xl">
									საძინებელი {specificListing?.bedrooms}
								</p>
							</div>
							<div className="flex flex-row items-center gap-1">
								<img src={zipCodeIcon} alt="icon" width={22} height={22} />
								<p className="gray-text-2xl">
									საფოსტო ინდექსი {specificListing?.zip_code}
								</p>
							</div>
						</div>
					</div>
					<div className="flex gap-[50px] flex-col">
						<p className="gray-text">{specificListing?.description}</p>
						<div className="flex gap-5 flex-col items-start">
							<div className="rounded-lg border border-primary-gray-border h-[172px] self-stretch w-full flex flex-col px-5 py-6 gap-4">
								<div className="flex flex-row items-center gap-[14px]">
									<img
										src={agent?.avatar}
										alt=""
										className="flex-shrink-0 rounded-full object-cover w-[72px] h-[72px] object-top"
									/>
									<div className="flex flex-col items-start gap-1">
										<p className="main-text-100-400">
											{agent?.name + " " + agent?.surname}
										</p>
										<p className="gray-text-sm-400">აგენტი</p>
									</div>
								</div>
								<div className="flex flex-col gap-1 items-start flex-nowrap">
									<div className="flex flex-row items-center gap-[5px]">
										<img src={emailIcon} alt="icon" className="w-4 h-[13px]" />
										<p className="gray-text-sm-400">{agent?.email}</p>
									</div>
									<div className="flex flex-row items-center gap-[5px]">
										<img src={phoneIcon} alt="icon" className="w-4 h-[13px]" />
										<p className="gray-text-sm-400">
											{`${phoneNumber?.slice(0, 3)} ${phoneNumber?.slice(
												3,
												6
											)} ${phoneNumber?.slice(6)}`}
										</p>
									</div>
								</div>
							</div>
							<Cta
								ctaText="ლისტინგის წაშლა"
								type={CtaTypes.gray}
								onClickHandler={handleDeleteListing}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="mt-[53px] w-full">
				<h2 className="main-text-3xl-100">ბინები მსგავს ლოკაციაზე</h2>
				<div className="relative mt-[52px] flex flex-row items-center justify-start w-full">
					<img
						src={arrowLeft}
						alt=""
						className="absolute -left-[65px] z-10 cursor-pointer"
					/>
					<div className="flex flex-row gap-5">
						{recommendedListings?.map((listing) => (
							<ListingCard listing={listing} key={listing.id} />
						))}
					</div>
					<img
						src={arrowLeft}
						alt=""
						className="absolute justify-self-end -right-[65px] rotate-180 z-10 cursor-pointer"
					/>
				</div>
			</div>
		</div>
	);
};

export default ListingPage;
