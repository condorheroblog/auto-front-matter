import type { TextDocumentWillSaveEvent } from "vscode";
import fg from "fast-glob";
import { isSupportedFile } from "../helpers";
import { fillWillSave, getWorkspaceFolder, readConfigFile } from ".";

export const triggerFileSave = (event: TextDocumentWillSaveEvent) => {
	const wsFolder = getWorkspaceFolder();
	if (!wsFolder) return;

	const fnConfig = readConfigFile(wsFolder);
	if (!fnConfig) return;

	const document = event.document;
	if (document && isSupportedFile(document)) {
		const { dirname, initialFileInsertLastMod } = fnConfig;

		if (dirname) {
			// Is article located in one of the content folders
			const fileMatch = fg.sync(dirname, fnConfig.globOptions);
			if (fileMatch.includes(document.fileName)) {
				event.waitUntil(
					fillWillSave(document, initialFileInsertLastMod!, wsFolder),
				);
			}
		}
		else {
			event.waitUntil(
				fillWillSave(document, initialFileInsertLastMod!, wsFolder),
			);
		}
	}
};
