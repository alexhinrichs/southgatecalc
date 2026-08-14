/**
 * Pure calculator engine — no DOM.
 * Immediate / pending-operator model (classic pocket calculator).
 */

const MAX_DISPLAY_LENGTH = 12;
const ERROR = "Error";

const OP_MAP = {
  "+": "+",
  "-": "-",
  "−": "-",
  "*": "*",
  "×": "*",
  "/": "/",
  "÷": "/",
};

function normalizeOp(op) {
  return OP_MAP[op] ?? null;
}

function formatNumber(n) {
  if (!Number.isFinite(n)) {
    return ERROR;
  }

  // Reduce binary floating-point noise (e.g. 0.1 + 0.2)
  const rounded = Math.round(n * 1e10) / 1e10;
  let s = String(rounded);

  if (s.includes("e") || s.includes("E")) {
    s = rounded.toPrecision(10).replace(/(?:\.0+|(\.\d*?[1-9])0+)(?:e|$)/i, "$1");
  }

  if (s.includes(".") && !s.includes("e") && !s.includes("E")) {
    s = s.replace(/(\.\d*?[1-9])0+$/, "$1").replace(/\.0+$/, "");
  }

  if (s.length > MAX_DISPLAY_LENGTH) {
    s = rounded.toPrecision(MAX_DISPLAY_LENGTH - 4);
    s = s.replace(/(?:\.0+|(\.\d*?[1-9])0+)(?:e|$)/i, "$1");
  }

  if (s.length > MAX_DISPLAY_LENGTH) {
    return ERROR;
  }

  return s;
}

function compute(left, op, right) {
  switch (op) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "*":
      return left * right;
    case "/":
      if (right === 0) {
        return NaN;
      }
      return left / right;
    default:
      return right;
  }
}

export function createCalculator() {
  let display = "0";
  let accumulator = null;
  let pendingOp = null;
  let overwrite = true;
  let error = false;
  let justEvaluated = false;

  function getDisplay() {
    return display;
  }

  function setError() {
    display = ERROR;
    error = true;
    accumulator = null;
    pendingOp = null;
    overwrite = true;
    justEvaluated = false;
  }

  function clearErrorIfNeeded() {
    if (!error) {
      return false;
    }
    display = "0";
    error = false;
    accumulator = null;
    pendingOp = null;
    overwrite = true;
    justEvaluated = false;
    return true;
  }

  function parseDisplay() {
    return Number(display);
  }

  function inputClear() {
    display = "0";
    accumulator = null;
    pendingOp = null;
    overwrite = true;
    error = false;
    justEvaluated = false;
  }

  function inputDigit(digit) {
    const d = String(digit);
    if (!/^[0-9]$/.test(d)) {
      return;
    }

    if (error) {
      clearErrorIfNeeded();
      display = d;
      overwrite = false;
      return;
    }

    if (overwrite || justEvaluated) {
      display = d;
      overwrite = false;
      justEvaluated = false;
      return;
    }

    if (display === "0") {
      display = d;
      return;
    }

    if (display.length >= MAX_DISPLAY_LENGTH) {
      return;
    }

    display += d;
  }

  function inputDecimal() {
    if (error) {
      clearErrorIfNeeded();
      display = "0.";
      overwrite = false;
      return;
    }

    if (overwrite || justEvaluated) {
      display = "0.";
      overwrite = false;
      justEvaluated = false;
      return;
    }

    if (display.includes(".")) {
      return;
    }

    if (display.length >= MAX_DISPLAY_LENGTH) {
      return;
    }

    display += ".";
  }

  function inputOperator(rawOp) {
    const op = normalizeOp(rawOp);
    if (!op) {
      return;
    }

    if (error) {
      clearErrorIfNeeded();
    }

    const current = parseDisplay();

    if (pendingOp !== null && !overwrite) {
      const result = compute(accumulator, pendingOp, current);
      if (!Number.isFinite(result)) {
        setError();
        return;
      }
      display = formatNumber(result);
      accumulator = result;
    } else if (pendingOp === null || justEvaluated) {
      accumulator = current;
    }
    // else: overwrite && pendingOp — replace operator only; keep accumulator

    pendingOp = op;
    overwrite = true;
    justEvaluated = false;
  }

  function inputEquals() {
    if (error) {
      return;
    }

    if (pendingOp === null || justEvaluated) {
      return;
    }

    const right = overwrite ? accumulator : parseDisplay();
    const result = compute(accumulator, pendingOp, right);

    if (!Number.isFinite(result)) {
      setError();
      return;
    }

    display = formatNumber(result);
    accumulator = null;
    pendingOp = null;
    overwrite = true;
    justEvaluated = true;
  }

  return {
    getDisplay,
    inputDigit,
    inputDecimal,
    inputOperator,
    inputEquals,
    inputClear,
  };
}
