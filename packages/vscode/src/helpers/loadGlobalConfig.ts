import type { TextDocument } from "vscode";

import type { UserConfig } from "../../../core/src";
import { isEditable, isSupportedFile, isUntrackedFile } from "../../../core/src";

/**
 * merge user config and vscode text document
 * @param document - text document
 * @param userConfig - user config
 * @param workspaceFolder - workspace folder
 * @returns GlobalConfig
 */
export const loadGlobalConfig = async (
	document: TextDocument,
	userConfig: UserConfig,
	workspaceFolder: string,
) => {
	const { languageId, fileName: editFileName, lineCount } = document;
	const editFileContents = document.getText();

	return {
		workspaceFolder,
		userConfig,
		isSupportedFile: isSupportedFile(languageId),
		isEditable: isEditable(userConfig.dirname, userConfig.globOptions, editFileName),
		editFileName,
		editFileContents,
		lineCount,
		isUntrackedFile: await isUntrackedFile(workspaceFolder, editFileName),
	};
};

export type GlobalConfig = Awaited<ReturnType<typeof loadGlobalConfig>>;
