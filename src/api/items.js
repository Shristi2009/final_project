const BASE_URL = "WE DONT KNOW YET";

const handleItems = async () => {
	try {
		const response = await fetch(BASE_URL + "/items", {
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		return data;
	} catch (error) {
		throw error;
	}
};



export default handleItems;