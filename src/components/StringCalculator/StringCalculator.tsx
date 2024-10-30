import { useState } from "react";

import { calculate } from "@/utils/helper";
import "./StringCalculator.css";

export function StringCalculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  const handleCalculate = () => {
    try {
      setError("");
      const normalizedInput = input.replace(/\\n/g, "\n");
      const result = calculate(normalizedInput);
      setResult(result);
    } catch (err) {
      setError((err as Error)?.message);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleCalculate();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter numbers"
        className="string-input"
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleCalculate} className="calculate-btn">
        Calculate
      </button>
      {error ? <p className="error">{error}</p> : <p>Result: {result}</p>}
    </div>
  );
}
