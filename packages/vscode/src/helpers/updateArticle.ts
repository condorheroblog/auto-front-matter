import { Position, Range, TextEdit } from "vscode";

/**
 * replace text document
 * @param lineCount - number of lines
 * @param frontMatterMd - replace the content
 * @returns {TextEdit}
 */
export const updateArticle = (lineCount: number, frontMatterMd: string) => {
	const range = new Range(new Position(0, 0), new Position(lineCount, 0));
	return TextEdit.replace(range, frontMatterMd);
};
