import { existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { window, workspace } from "vscode";

import { getWorkspaceFolder, Notification } from ".";
import { ensureMarkdownExtension, getDay, getFullYear, getMonth, readUserConfigFile, toMd } from "../../../core/src";

/**
 * use template create a new markdown file
 */
export async function createMdFromTemplate() {
	const wsFolder = getWorkspaceFolder();
	if (!wsFolder)
		return;

	const userConfig = readUserConfigFile(wsFolder.path, Notification);
	if (!userConfig)
		return;

	const inputFileName = await window.showInputBox({
		title: "File Name",
		value: `${getFullYear()}-${getMonth()}-${getDay()}`,
		placeHolder: "please input markdown's file name",
		ignoreFocusOut: true,
	});

	if (!inputFileName) {
		Notification.warning("You did not specify a template title.");
	}
	else {
		const filePath = ensureMarkdownExtension(inputFileName);
		const absFilePath = join(wsFolder.path, filePath);
		if (existsSync(absFilePath)) {
			Notification.warning(`(${filePath}) file already exist.`);
		}
		else {
			const fileContents = toMd(userConfig.template.content ?? "", userConfig.template.data);
			writeFileSync(absFilePath, fileContents, { encoding: "utf-8" });
			const doc = await workspace.openTextDocument(absFilePath);
			if (doc) {
				window.showTextDocument(doc);
			}
			Notification.info(`${filePath} file created successfully.`);
		}
	}
}
