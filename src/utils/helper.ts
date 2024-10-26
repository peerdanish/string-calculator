import { DEFAULT_DELIMITER, DELIMITER, ERROR_MESSAGE } from "../global/constants";

export const add = (numbers: string) => {
  if (!numbers) return 0;
  numbers = numbers.replace(/\\n/g, "\n");
  let delimiter = DEFAULT_DELIMITER;
  if (numbers.startsWith(DELIMITER.CUSTOM_DELIMITER)) {
    const parts = numbers.split(DELIMITER.NEWLINE);
    delimiter = new RegExp(parts[0].slice(2) + '|'+ DELIMITER.NEWLINE);
    numbers = numbers.slice(parts[0].length + 1);
  }

  const nums = numbers.split(delimiter).map(Number);
  const negatives = nums.filter((n) => n < 0);
  if (negatives.length) {
    throw new Error(
      `${ERROR_MESSAGE.NEGATIVE_INPUT} ${negatives.join(DELIMITER.COMMA)}`
    );
  }
  const sum = nums.reduce((sum, num) => sum + num, 0);
  if (isNaN(sum)) {
    throw new Error(ERROR_MESSAGE.INVALID_INPUT);
  }

  return sum;
};
