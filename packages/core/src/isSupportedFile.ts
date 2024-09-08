/**
 * Checks if the current file is a markdown file
 */
export function isSupportedFile(languageName: string) {
	const supportedLanguages = ["markdown", "mdx", "md"];
	const languageId = languageName.toLowerCase();
	return supportedLanguages.includes(languageId);
}
