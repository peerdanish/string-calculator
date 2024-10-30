import { add } from "@/utils/helper";
import { ERROR_MESSAGE } from "@/global/constants";
import { render, screen, fireEvent } from "@/utils/test-utils";
import { StringCalculator } from "@/components";

describe("add function", () => {
  it("Returns 0 for empty string", () => {
    expect(add("")).toBe(0);
  });

  it("Returns number for single number", () => {
    expect(add("1")).toBe(1);
  });

  it("Returns sum of numbers", () => {
    expect(add("1,5")).toBe(6);
  });

  it("Handles multiple numbers", () => {
    expect(add("1,2,3,4")).toBe(10);
  });

  it("supports newlines between numbers", () => {
    expect(add("1\\n2,3")).toBe(6);
  });

  it("should multiply when delimiter is * ", () => {
    expect(add("//*\n3*2")).toBe(6);
  })

  it("supports different delimiters", () => {
    expect(add("//;\\n1;2")).toBe(3);
  });

  it("handles invalid input", () => {
    expect(() => add("1,2,3,a")).toThrow(ERROR_MESSAGE.INVALID_INPUT);
  });

  it("throws error for negative numbers", () => {
    expect(() => add("1,-2,-3")).toThrow(
      `${ERROR_MESSAGE.NEGATIVE_INPUT} -2,-3`
    );
  });

  it("ignore numbers greater than 1000", () => {
    expect(add("2,1001")).toBe(2);
  });

  it('handles delimters of length greater than 1', () => {
    expect(add('//[***]\\n1***2***3')).toBe(6);
  });
  it('handles multiple delimiters', () => {
    expect(add('//[*][%]\\n1*2%3')).toBe(6);
  })
});

describe("StringCalculator component", () => {
  it("calculates and displays result on button click", () => {
    render(<StringCalculator />);
    const input = screen.getByPlaceholderText("Enter numbers");
    const button = screen.getByText("Calculate");

    fireEvent.change(input, { target: { value: "1,2,3,4" } });
    fireEvent.click(button);

    expect(screen.getByText("Result: 10")).toBeInTheDocument();
  });
});
