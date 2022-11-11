import type { ExtensionContext } from "vscode";
import { commands, workspace } from "vscode";

import { createMdFromTemplate, triggerFileSave } from "./helpers";

export function activate({ subscriptions }: ExtensionContext) {
	const commandId = "auto-front-matter.createMdFromTemplate";
	const disposable = commands.registerCommand(commandId, () => {
		createMdFromTemplate();
	});

	// save md files to the disk
	subscriptions.push(workspace.onWillSaveTextDocument(triggerFileSave));
	subscriptions.push(disposable);
}

export function deactivate() {}
