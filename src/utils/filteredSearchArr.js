export const filteredSearchArr = ({ arr, searchTask, isSearchFieldOpen }) => {
	return searchTask && isSearchFieldOpen
		? arr.filter((item) => item.title.toLowerCase().includes(searchTask.toLowerCase()))
		: arr;
};
