import {
  DEFAULT_DELIMITER,
  DELIMITER,
  ERROR_MESSAGE,
} from "@/global/constants";

export const add = (numbers: string) => {
  if (!numbers) return 0;
  numbers = numbers.replace(/\\n/g, "\n");
  let delimiter = DEFAULT_DELIMITER;

  if (numbers.startsWith(DELIMITER.CUSTOM_DELIMITER)) {
    const parts = numbers.split(DELIMITER.NEWLINE);
    delimiter = new RegExp(extractDelimiters(parts[0]));

    numbers = numbers.slice(parts[0].length + 1);
  }

  const nums = numbers.split(delimiter).map(Number);
  const negatives = nums.filter((n) => n < 0);
  if (negatives.length) {
    throw new Error(
      `${ERROR_MESSAGE.NEGATIVE_INPUT} ${negatives.join(DELIMITER.COMMA)}`
    );
  }
  let multpliedNum = 0;
  if (delimiter.source === "[*]|\\n") {
    multpliedNum = nums.reduce((sum, num) => {
      return sum * num;
    }, 1);

    return multpliedNum;
  }

  const sum = nums.reduce((sum, num) => {
    if (num > 1000) {
      return sum;
    }
    return sum + num;
  }, 0);

  if (isNaN(sum)) {
    throw new Error(ERROR_MESSAGE.INVALID_INPUT);
  }

  return sum;
};

const extractDelimiters = (numbers: string) => {
  const delimiter = numbers.slice(2);
  const delimiterArr = delimiter.split(/[\\[\]]/).filter((item) => item !== "");
  const delimiters = "[" + delimiterArr.join("|") + `]|${DELIMITER.NEWLINE}`;
  return delimiters;
};
