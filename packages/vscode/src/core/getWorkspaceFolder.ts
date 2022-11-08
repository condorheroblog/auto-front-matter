import { existsSync } from "node:fs";
import { join } from "node:path";
import { commands, window, workspace } from "vscode";

import { CONFIG_FILE_NAME } from "../constant";
import { createConfigFile } from "../helpers/createConfigFile";

/**
 * Retrieve the workspace folder
 */
export const getWorkspaceFolder = () => {
	const folders = workspace.workspaceFolders;
	if (folders) {
		if (folders.length === 1) {
			return folders[0].uri;
		}
		else if (folders.length > 1) {
			const projectFolder = folders.find(
				folder => existsSync(join(folder.uri.fsPath, CONFIG_FILE_NAME)),
			);
			if (!projectFolder) {
				window.showWorkspaceFolderPick({
					placeHolder: "Please select the main workspace folder for Front Matter to use.",
				}).then((selectedFolder) => {
					if (selectedFolder) {
						// create config file
						createConfigFile(selectedFolder.uri);
						// Full reload to make sure the whole extension is reloaded correctly
						commands.executeCommand("workbench.action.reloadWindow");
					}
				});
			}
			else {
				return projectFolder.uri;
			}
		}
	}
	window.showWarningMessage("You have no workspace, please open a new workspace");
	return undefined;
};
