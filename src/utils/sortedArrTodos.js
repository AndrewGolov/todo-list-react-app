export const sortedArrTodos = ({ arr, isSorted }) => {
	return isSorted
		? arr.toSorted((a, b) => a.title.localeCompare(b.title, undefined, { numeric: true, sensitivity: 'base' }))
		: arr;
};
