import {
  DEFAULT_DELIMITER,
  DELIMITER,
  ERROR_MESSAGE,
} from "@/global/constants";
import { OperationType } from "./type";


export const calculate = (input: string) => {
  if (!input) return 0;
  let delimiterPattern = DEFAULT_DELIMITER;
  let operationMode: OperationType = "add";

  if (input.startsWith(DELIMITER.CUSTOM_DELIMITER)) {
    const parts = input.split(DELIMITER.NEWLINE);
    const delimiterString = parts[0].slice(2);
    delimiterPattern = new RegExp(parseDelimiters(delimiterString));
    operationMode = delimiterString === DELIMITER.ASTERISK ? "multiply" : "add";
    input = input.slice(parts[0].length + 1);
  }

  const parsedNumbers = input.split(delimiterPattern).map(Number);
  const negativeNumbers = parsedNumbers.filter((n) => n < 0);
  if (negativeNumbers.length) {
    throw new Error(
      `${ERROR_MESSAGE.NEGATIVE_INPUT} ${negativeNumbers.join(DELIMITER.COMMA)}`
    );
  }
  const result = calculateResult(parsedNumbers, operationMode);

  if (isNaN(result)) {
    throw new Error(ERROR_MESSAGE.INVALID_INPUT);
  }

  return result;
};

const calculateResult = (numbers: number[], mode: OperationType) => {
  switch (mode) {
    case "multiply":
      return numbers.reduce((product, num) => product * num, 1);
    case "add":
    default:
      return numbers.reduce((total, num) => {
        return num > 1000 ? total : total + num;
      }, 0);
  }
};
const parseDelimiters = (delimiterString: string) => {
  const delimiters = delimiterString
    .split(/[\\[\]]/)
    .filter((item) => item !== "");
  return "[" + delimiters.join("|") + `]|${DELIMITER.NEWLINE}`;
};
