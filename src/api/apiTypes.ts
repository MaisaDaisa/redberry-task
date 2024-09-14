export type agentGetMany = {
	id: number;
	name: string;
	surname: string;
	avatar: string;
};

export type agentPost = {
	name: string;
	surname: string;
	email: string;
	phone: string;
	avatar: string;
};

export type region = {
	id: number;
	name: string;
};
export type cityPost = {
	id: number;
	name: string;
	region_id: number;
};

export type cityGet = {
	id: number;
	name: string;
	region_id: number;
	region: {
        id: number,
        name: string
      }
};



export type realEstateMany = {
	id: number;
	address: string;
	zip_code: number;
	price: number;
	area: number;
	bedrooms: number;
	is_rental: 1 | 0;
	image: string;
	city_id: number;
	city: cityGet;
};

export type realEstatePost = {
	price: number;
	zip_code: number;
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
	zip_code: number;
	price: number;
	area: number;
	bedrooms: number;
	is_rental: boolean;
	image: string;
	city_id: number;
	description: string;
	created_at: string;
	city: cityGet;
	agent_id: number;
	agent: {
		id: number;
		name: string;
		surname: string;
		email: string;
		phone: string;
		avatar: string;
	};
};
