import type { ExtensionContext } from "vscode";
import { commands, window, workspace } from "vscode";

import { triggerFileSave } from "./core";

export async function activate({ subscriptions }: ExtensionContext) {
	const commandId = "auto-front-matter.helloWorld";

	const disposable = commands.registerCommand(commandId, () => {
		window.showInformationMessage("Hello World from auto-front-matter!");
	});

	console.error("自己启动");
	subscriptions.push(workspace.onWillSaveTextDocument(triggerFileSave));
	subscriptions.push(disposable);
}

export function deactivate() {}
