import { window } from "vscode";

export class Notification {
	public static info(message: string, ...items: any[]) {
		return window.showInformationMessage(`${message}`, ...items) as Promise<string>;
	}

	public static error(message: string, ...items: any[]) {
		return window.showErrorMessage<string>(`${message}`, ...items) as Promise<string>;
	}

	public static warning(message: string, ...items: any[]) {
		return window.showWarningMessage<string>(`${message}`, ...items) as Promise<string>;
	}
}
