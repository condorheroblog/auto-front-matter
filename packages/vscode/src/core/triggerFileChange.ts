import type { TextDocumentWillSaveEvent } from "vscode";
import fg from "fast-glob";
import { isSupportedFile, setLastModifiedDateOnSave } from "../helpers";
import { getWorkspaceFolder, readConfigFile } from ".";

export const triggerFileChange = (event: TextDocumentWillSaveEvent) => {
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
					setLastModifiedDateOnSave(document, initialFileInsertLastMod!, wsFolder),
				);
			}
		}
		else {
			event.waitUntil(
				setLastModifiedDateOnSave(document, initialFileInsertLastMod!, wsFolder),
			);
		}
	}
};
