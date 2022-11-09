import type { ExtensionContext } from "vscode";
import { commands, workspace } from "vscode";

import { triggerFileSave } from "./core";
import { createTemplate } from "./helpers";

export async function activate({ subscriptions }: ExtensionContext) {
	const commandId = "auto-front-matter.createTemplate";

	const disposable = commands.registerCommand(commandId, () => {
		createTemplate();
	});

	subscriptions.push(workspace.onWillSaveTextDocument(triggerFileSave));
	subscriptions.push(disposable);
}

export function deactivate() {}
