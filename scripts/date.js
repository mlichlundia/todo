export function formatDate(date) {
	return new Date(date).toLocaleString("en-GB", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}
export function tomorrow(date) {
	return new Date(date).setDate(new Date(date).getDate(date) + 1);
}
