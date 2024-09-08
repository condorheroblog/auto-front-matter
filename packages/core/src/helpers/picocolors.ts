import tty from "node:tty";

const hasColors = tty.WriteStream.prototype.hasColors();

const formatter = (startCode: string, endCode: string) => hasColors ? (str: string) => `${startCode}${str}${endCode}` : (str: any) => str;

export const reset = (s: string) => `\x1B[0m${s}\x1B[0m`;
export const italic = formatter("\x1B[3m", "\x1B[23m");
export const underline = formatter("\x1B[4m", "\x1B[24m");
export const inverse = formatter("\x1B[7m", "\x1B[27m");
export const hidden = formatter("\x1B[8m", "\x1B[28m");
export const strikethrough = formatter("\x1B[9m", "\x1B[29m");
export const black = formatter("\x1B[30m", "\x1B[39m");
export const red = formatter("\x1B[31m", "\x1B[39m");
export const green = formatter("\x1B[32m", "\x1B[39m");
export const yellow = formatter("\x1B[33m", "\x1B[39m");
export const blue = formatter("\x1B[34m", "\x1B[39m");
export const magenta = formatter("\x1B[35m", "\x1B[39m");
export const cyan = formatter("\x1B[36m", "\x1B[39m");
export const white = formatter("\x1B[37m", "\x1B[39m");
export const gray = formatter("\x1B[90m", "\x1B[39m");
export const bgBlack = formatter("\x1B[40m", "\x1B[49m");
export const bgRed = formatter("\x1B[41m", "\x1B[49m");
export const bgGreen = formatter("\x1B[42m", "\x1B[49m");
export const bgYellow = formatter("\x1B[43m", "\x1B[49m");
export const bgBlue = formatter("\x1B[44m", "\x1B[49m");
export const bgMagenta = formatter("\x1B[45m", "\x1B[49m");
export const bgCyan = formatter("\x1B[46m", "\x1B[49m");
export const bgWhite = formatter("\x1B[47m", "\x1B[49m");

export const picocolors = {
	reset,
	italic,
	underline,
	inverse,
	hidden,
	strikethrough,
	black,
	red,
	green,
	yellow,
	blue,
	magenta,
	cyan,
	white,
	gray,
	bgBlack,
	bgRed,
	bgGreen,
	bgYellow,
	bgBlue,
	bgMagenta,
	bgCyan,
	bgWhite,
};
