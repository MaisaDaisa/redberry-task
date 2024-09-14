interface TagProps {
	text: string;
	customClass?: string;
}

const Tag = ({ text, customClass = "" }: TagProps) => {
	return (
		<div
			className={`bg-primary-text-50 rounded-[15px] w-[90px] p-[6px] ${customClass}`}>
			<p className="white-text-xs-500">{text}</p>
		</div>
	);
};

export default Tag;
