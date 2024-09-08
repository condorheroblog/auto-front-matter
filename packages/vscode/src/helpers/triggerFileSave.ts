import type { TextDocumentWillSaveEvent } from "vscode";
import { getWorkspaceFolder, loadGlobalConfig, Notification, updateArticle } from ".";
import { readUserConfigFile, updateFrontMatter } from "../../../core/src";

export function triggerFileSave(event: TextDocumentWillSaveEvent) {
	const document = event.document;

	const wsFolder = getWorkspaceFolder();
	if (!wsFolder)
		return;

	const userConfig = readUserConfigFile(wsFolder.path, Notification);
	if (!userConfig)
		return;

	// return a promise TextEdit Array
	const fillSavePromise = async () => {
		const globalConfig = await loadGlobalConfig(document, userConfig, wsFolder.path);
		const doc = updateFrontMatter(globalConfig);

		if (doc)
			return [updateArticle(globalConfig.lineCount, doc)];

		return [];
	};
	event.waitUntil(fillSavePromise());
}
