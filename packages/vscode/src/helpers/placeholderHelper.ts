
import { getDay, getFullYear, getMonth } from ".";

/**
 * Replace the known placeholders
 * @param value
 * @returns
 */

export const placeholderHelper = (value: string) => {
	if (typeof value === "string") {
		if (value.includes("{{now}}")) {
			const regex = /{{now}}/g;
			return new Date(value.replace(regex, new Date().toISOString()));
		}

		if (value.includes("{{year}}")) {
			const regex = /{{year}}/g;
			value = value.replace(regex, getFullYear().toString());
		}

		if (value.includes("{{month}}")) {
			const regex = /{{month}}/g;
			value = value.replace(regex, getMonth());
		}

		if (value.includes("{{day}}")) {
			const regex = /{{day}}/g;
			value = value.replace(regex, getDay());
		}
		return value;
	}

	return value;
};
