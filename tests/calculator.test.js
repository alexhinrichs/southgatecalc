import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createCalculator } from "../src/calculator.js";

function press(calc, sequence) {
  for (const step of sequence) {
    if (step === "=") {
      calc.inputEquals();
    } else if (step === "C") {
      calc.inputClear();
    } else if (step === ".") {
      calc.inputDecimal();
    } else if ("+-*/×÷−".includes(step)) {
      calc.inputOperator(step);
    } else if (/^[0-9]$/.test(step)) {
      calc.inputDigit(step);
    } else {
      throw new Error(`Unknown step: ${step}`);
    }
  }
  return calc.getDisplay();
}

describe("calculator engine", () => {
  it("starts at 0", () => {
    const calc = createCalculator();
    assert.equal(calc.getDisplay(), "0");
  });

  describe("digits (F1)", () => {
    it("enters multi-digit numbers", () => {
      const calc = createCalculator();
      assert.equal(press(calc, ["1", "2", "3"]), "123");
    });

    it("normalizes leading zeros", () => {
      const calc = createCalculator();
      assert.equal(press(calc, ["0", "0", "0", "7"]), "7");
    });
  });

  describe("operations and equals (F2, F3)", () => {
    it("adds", () => {
      const calc = createCalculator();
      assert.equal(press(calc, ["1", "2", "+", "3", "="]), "15");
    });

    it("subtracts", () => {
      const calc = createCalculator();
      assert.equal(press(calc, ["9", "−", "4", "="]), "5");
    });

    it("multiplies", () => {
      const calc = createCalculator();
      assert.equal(press(calc, ["6", "×", "7", "="]), "42");
    });

    it("divides", () => {
      const calc = createCalculator();
      assert.equal(press(calc, ["1", "2", "÷", "4", "="]), "3");
    });

    it("accepts ASCII operators", () => {
      const calc = createCalculator();
      assert.equal(press(calc, ["8", "*", "2", "="]), "16");
    });
  });

  describe("clear (F4)", () => {
    it("resets display and pending state", () => {
      const calc = createCalculator();
      press(calc, ["9", "+", "1"]);
      assert.equal(press(calc, ["C"]), "0");
      assert.equal(press(calc, ["2", "="]), "2");
    });
  });

  describe("decimal (F5)", () => {
    it("accepts a decimal point", () => {
      const calc = createCalculator();
      assert.equal(press(calc, ["3", ".", "1", "4"]), "3.14");
    });

    it("ignores a second decimal in the same operand", () => {
      const calc = createCalculator();
      assert.equal(press(calc, ["1", ".", "2", ".", "3"]), "1.23");
    });

    it("starts 0. when decimal is first", () => {
      const calc = createCalculator();
      assert.equal(press(calc, [".", "5"]), "0.5");
    });
  });

  describe("divide by zero (F6)", () => {
    it("shows Error", () => {
      const calc = createCalculator();
      assert.equal(press(calc, ["8", "÷", "0", "="]), "Error");
    });

    it("recovers on clear", () => {
      const calc = createCalculator();
      press(calc, ["8", "÷", "0", "="]);
      assert.equal(press(calc, ["C"]), "0");
      assert.equal(press(calc, ["1", "+", "1", "="]), "2");
    });

    it("recovers on digit", () => {
      const calc = createCalculator();
      press(calc, ["8", "÷", "0", "="]);
      assert.equal(press(calc, ["7"]), "7");
    });
  });

  describe("after equals (F7)", () => {
    it("starts a fresh operand on new digit", () => {
      const calc = createCalculator();
      press(calc, ["1", "+", "1", "="]);
      assert.equal(press(calc, ["9"]), "9");
    });

    it("further equals is a no-op", () => {
      const calc = createCalculator();
      press(calc, ["2", "+", "3", "="]);
      assert.equal(press(calc, ["="]), "5");
    });
  });

  describe("edge cases", () => {
    it("replaces pending operator when pressed again", () => {
      const calc = createCalculator();
      assert.equal(press(calc, ["5", "+", "+", "3", "="]), "8");
      const calc2 = createCalculator();
      assert.equal(press(calc2, ["5", "+", "−", "3", "="]), "2");
    });

    it("treats missing second operand as first on equals (5+= → 10)", () => {
      const calc = createCalculator();
      assert.equal(press(calc, ["5", "+", "="]), "10");
    });

    it("chains operators with immediate evaluation", () => {
      const calc = createCalculator();
      assert.equal(press(calc, ["2", "+", "3", "×", "4", "="]), "20");
    });

    it("caps input length at 12 characters", () => {
      const calc = createCalculator();
      const digits = Array(15).fill("9");
      assert.equal(press(calc, digits).length, 12);
      assert.equal(calc.getDisplay(), "999999999999");
    });

    it("multiplies decimals", () => {
      const calc = createCalculator();
      assert.equal(press(calc, ["3", ".", "1", "4", "×", "2", "="]), "6.28");
    });

    it("avoids floating-point noise for 0.1 + 0.2", () => {
      const calc = createCalculator();
      assert.equal(press(calc, ["0", ".", "1", "+", "0", ".", "2", "="]), "0.3");
    });
  });
});
