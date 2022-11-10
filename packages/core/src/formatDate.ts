export const getFullYear = (date = new Date()) => {
	return date.getFullYear();
};

export const getMonth = (date = new Date()) => {
	const month = date.getMonth();
	return `${month + 1}`.padStart(2, "0");
};

export const getDay = (date = new Date()) => {
	const days = date.getDate();
	return `${days}`.padStart(2, "0");
};
