export function generateId() {
	return `a${Math.random().toString(36).slice(3, 9)}`;
}
