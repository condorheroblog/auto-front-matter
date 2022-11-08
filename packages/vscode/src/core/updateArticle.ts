import type { TextDocument } from "vscode";
import { Position, Range, TextEdit } from "vscode";

export const updateArticle = (document: TextDocument, frontMatterMd: string) => {
	const nrOfLines = document.lineCount;
	const range = new Range(new Position(0, 0), new Position(nrOfLines, 0));
	return TextEdit.replace(range, frontMatterMd);
};
