import { join } from "node:path";
import { existsSync, writeFileSync } from "node:fs";
import { window, workspace } from "vscode";

import { getDay, getFullYear, getMonth, isAddmdExtension, readUserConfigFile, toMd } from "../../../core/src";
import { Notification, getWorkspaceFolder } from ".";

/**
 * use template create a new md file
 */
export const createTemplate = async () => {
	const wsFolder = getWorkspaceFolder();
	if (!wsFolder) return;

	const fnConfig = readUserConfigFile(wsFolder.path, Notification);
	if (!fnConfig) return;

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
		const filePath = isAddmdExtension(inputFileName);
		const absFilePath = join(wsFolder.path, filePath);
		if (existsSync(absFilePath)) {
			Notification.warning(`(${filePath}) file already exist.`);
		}
		else {
			const fileContents = toMd(fnConfig.template.content ?? "", fnConfig.template.data);
			writeFileSync(absFilePath, fileContents, { encoding: "utf-8" });
			const doc = await workspace.openTextDocument(absFilePath);
			doc && window.showTextDocument(doc);
			Notification.info(`${filePath} file created successfully.`);
		}
	}
};
