import Main from "@/components/Main";
import Filters from "@/components/ListingPage/Filter/Filters";
import CtaL from "@/components/GlobalComponents/CtaL";
import { CtaLType } from "@/components/GlobalComponents/CtaL";
import FilterDisplay from "@/components/ListingPage/Filter/FilterDisplay";
import ListingCard from "@/components/ListingPage/ListingCard";

const ListingPage = () => {
	return (
		<Main>
			<div className="flex justify-between items-center">
				<Filters />
				<div className="flex items-center justify-center gap-4">
					<CtaL ctaText="ლისტინგის დამატება" type={CtaLType.primary} />
					<CtaL ctaText="აგენტის დამატება" type={CtaLType.secondary} />
				</div>
			</div>
			<FilterDisplay />
			<div className="mt-8 pb-[300px] flex items-center justify-center gap-20 flex-wrap">
				<ListingCard />
			</div>
		</Main>
	);
};

export default ListingPage;
