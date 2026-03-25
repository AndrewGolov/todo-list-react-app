export const normalizeData = (data) => (Array.isArray(data) ? data : [data]);
export const normalizeDataFirebase = (data) =>
	Object.entries(data).map(([key, { title, completed }]) => ({ id: key, title, completed }));
