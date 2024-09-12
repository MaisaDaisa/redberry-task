export type agentGetMany = {
	id: number;
	name: string;
	surname: string;
	avatar: string;
};

export type agentPost = {
	id: number;
	name: string;
	email: string;
	phone: string;
	avatar: string;
};

export type region = {
	id: number;
	name: string;
};
export type city = {
	id: number;
	name: string;
	region_id: number;
};

export type realEstateMany = {
	id: number;
	address: string;
	zip_code: `${number}${number}${number}${number}`;
	price: number;
	area: number;
	bedrooms: number;
	is_rental: 1 | 0;
	image: string;
	city_id: number;
	city: city;
};

export type realEstatePost = {
	price: number;
	zip_code: `${number}${number}${number}${number}`;
	description: string;
	area: number;
	city_id: number;
	address: string;
	agent_id: number;
	bedrooms: number;
	is_rental: 1 | 0;
	image: string;
};

export type realEstateOne = {
	id: number;
	address: string;
	zip_code: `${number}${number}${number}${number}`;
	price: number;
	area: number;
	bedrooms: number;
	is_rental: boolean;
	image: string;
	city_id: number;
	description: string;
	created_at: string;
	city: city;
	agent_id: number;
	agent: agentPost;
};
