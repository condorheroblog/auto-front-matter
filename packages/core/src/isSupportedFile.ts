/**
 * Checks if the current file is a markdown file
 */
export const isSupportedFile = (languageName: string) => {
	const supportedLanguages = ["markdown", "mdx"];
	const languageId = languageName.toLowerCase();
	return supportedLanguages.includes(languageId);
};
