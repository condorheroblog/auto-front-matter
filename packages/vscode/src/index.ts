import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
	const commandId = "auto-front-matter.helloWorld";

	const disposable = vscode.commands.registerCommand(commandId, () => {
		vscode.window.showInformationMessage("Hello World from auto-front-matter!");
	});

	context.subscriptions.push(disposable);
}
