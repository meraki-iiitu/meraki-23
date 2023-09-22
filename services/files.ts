import { FileExtension } from "@/types/files";

export const getContentType = (extension: FileExtension) => {
	switch (extension) {
		case "txt":
			return "text/plain";
		case "md":
			return "text/markdown";
		case "json":
			return "application/json";
		case "csv":
			return "text/csv";
		default:
			return "text/plain";
	}
};

export const saveFile = (
	content: string,
	name: string,
	extension: FileExtension
) => {
	try {
		const blob = new Blob([content], { type: getContentType(extension) });
		const url = window.URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = `${name}.${extension}`;
		link.click();
		window.URL.revokeObjectURL(url);
		document.body.removeChild(link);
	} catch (error) {
		console.error(error);
	}
};

export const readFile = (file: File) => {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			resolve(reader.result as string);
		};
		reader.onerror = () => {
			reject(reader.error);
		};
		reader.readAsText(file);
	});
};

export const exportAsJSON = (data: any, name: string) => {
	const json = JSON.stringify(data, null, 2);
	saveFile(json, name, "json");
};