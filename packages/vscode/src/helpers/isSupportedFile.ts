import type { TextDocument } from "vscode";
/**
 * Checks if the current file is a markdown file
 */
export const isSupportedFile = (document: TextDocument) => {
	const supportedLanguages = ["markdown", "mdx"];
	const languageId = document.languageId.toLowerCase();
	return languageId && supportedLanguages.includes(languageId);
};
