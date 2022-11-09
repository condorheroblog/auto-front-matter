import { join } from "node:path";
import { existsSync, writeFileSync } from "node:fs";
import { window, workspace } from "vscode";
import matter from "gray-matter";

import { getWorkspaceFolder, readConfigFile } from "../core";
import { getDay, getFullYear, getMonth, isAddmdExtension } from ".";

export const createTemplate = async () => {
	const wsFolder = getWorkspaceFolder();
	if (!wsFolder) return;

	const fnConfig = readConfigFile(wsFolder);
	if (!fnConfig) return;

	const inputFileName = await window.showInputBox({
		title: "File Name",
		value: `${getFullYear()}-${getMonth()}-${getDay()}`,
		placeHolder: "please input markdown's file name",
		ignoreFocusOut: true,
	});

	if (!inputFileName) {
		window.showWarningMessage("You did not specify a template title.");
	}
	else {
		const filePath = isAddmdExtension(inputFileName);
		const absFilePath = join(wsFolder.path, filePath);
		if (existsSync(absFilePath)) {
			window.showWarningMessage(`(${filePath}) file already exist.`);
		}
		else {
			const fileContents = matter.stringify(fnConfig.template.content ?? "", fnConfig.template.data);
			writeFileSync(absFilePath, fileContents, { encoding: "utf-8" });
			const doc = await workspace.openTextDocument(absFilePath);
			doc && window.showTextDocument(doc);
			window.showInformationMessage(`${filePath} file created successfully.`);
		}
	}
};
