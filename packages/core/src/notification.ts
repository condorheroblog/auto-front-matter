export class Notification {
	public static info(message: string, ...optionalParams: any[]) {
		// eslint-disable-next-line no-console
		console.info(`${message}`, ...optionalParams);
		return Promise.resolve("INFO");
	}

	public static error(message: string, ...optionalParams: any[]) {
		console.error(`${message}`, ...optionalParams);
		return Promise.resolve("ERROR");
	}

	public static warning(message: string, ...optionalParams: any[]) {
		console.warn(`${message}`, ...optionalParams);
		return Promise.resolve("WARNING");
	}
}
