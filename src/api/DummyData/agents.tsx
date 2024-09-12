export interface agentGetMany {
	id: number;
	name: string;
	surname: string;
	avatar: string;
}

export interface agentPost {
	id: number;
	name: string;
	email: string;
	phone: string;
	avatar: string;
}

export interface region {
	id: number;
	name: string;
}
export interface city {
	id: number;
	name: string;
	region_id: number;
	region: region;
}

export interface realEstateMany {
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
}

export interface realEstatePost {
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
}

export interface realEstateOne {
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
}
