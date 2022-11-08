import type { TextDocumentWillSaveEvent } from "vscode";
import fg from "fast-glob";
import { isSupportedFile } from "../helpers";
import { fileWillSave, getWorkspaceFolder, readConfigFile } from ".";

export const triggerFileSave = (event: TextDocumentWillSaveEvent) => {
	const wsFolder = getWorkspaceFolder();
	if (!wsFolder) return;

	const fnConfig = readConfigFile(wsFolder);
	if (!fnConfig) return;

	const document = event.document;
	if (document && isSupportedFile(document)) {
		const { dirname } = fnConfig;

		if (dirname) {
			// Is article located in one of the content folders
			const fileMatch = fg.sync(dirname, fnConfig.globOptions);
			if (fileMatch.includes(document.fileName)) {
				event.waitUntil(
					fileWillSave(document, fnConfig, wsFolder),
				);
			}
		}
		else {
			event.waitUntil(
				fileWillSave(document, fnConfig, wsFolder),
			);
		}
	}
};
