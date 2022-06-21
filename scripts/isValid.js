export function isValid(input) {
	input.checkValidity()
		? input.classList.remove("invalid")
		: input.classList.add("invalid");
}
