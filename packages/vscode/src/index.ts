import type { ExtensionContext } from "vscode";
import { commands, workspace } from "vscode";

import { createTemplate, triggerFileSave } from "./helpers";

export function activate({ subscriptions }: ExtensionContext) {
	const commandId = "auto-front-matter.createTemplate";
	const disposable = commands.registerCommand(commandId, () => {
		createTemplate();
	});

	// save md files to the disk
	subscriptions.push(workspace.onWillSaveTextDocument(triggerFileSave));
	subscriptions.push(disposable);
}

export function deactivate() {}
