import type { TextDocument } from "vscode";

import { isCommittedFile, isEditable, isSupportedFile } from "../../../core/src";
import type { DefaultUserSetting } from "../../../core/src";

/**
 * merge user config and vscode text document
 * @param document - text document
 * @param userConfig - user config
 * @param workspaceFolder - workspace folder
 * @returns GlobalConfig
 */
export async function loadGlobalConfig(document: TextDocument,	userConfig: DefaultUserSetting,	workspaceFolder: string) {
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
		isCommittedFile: await isCommittedFile(workspaceFolder, editFileName),
	};
}

export type GlobalConfig = Awaited<ReturnType<typeof loadGlobalConfig>>;
