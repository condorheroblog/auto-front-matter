export class Notification {
	public static info(message: string, ...optionalParams: any[]) {
		// eslint-disable-next-line no-console
		console.info(`${message}`, ...optionalParams);
		return Promise.resolve("INFO");
	}

	public static error(message: string, ...optionalParams: any[]) {
		console.error(`\u001B[31m${message}\u001B[39m`, ...optionalParams);
		return Promise.resolve("ERROR");
	}

	public static warning(message: string, ...optionalParams: any[]) {
		console.warn(`\u001B[33m${message}\u001B[39m`, ...optionalParams);
		return Promise.resolve("WARNING");
	}
}
