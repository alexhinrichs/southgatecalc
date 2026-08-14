/**
 * DOM wiring — connects keypad to the pure calculator engine.
 */

import { createCalculator } from "./calculator.js";

const calculator = createCalculator();
const display = document.getElementById("display");
const keypad = document.querySelector(".keypad");

function render() {
  if (!display) {
    return;
  }

  const value = calculator.getDisplay();
  const changed = display.textContent !== value;
  display.textContent = value;
  display.classList.toggle("is-error", value === "Error");

  if (changed) {
    display.classList.remove("is-updating");
    // Force reflow so the settle animation can replay
    void display.offsetWidth;
    display.classList.add("is-updating");
  }
}

function handleAction(action, value) {
  switch (action) {
    case "digit":
      calculator.inputDigit(value);
      break;
    case "operator":
      calculator.inputOperator(value);
      break;
    case "decimal":
      calculator.inputDecimal();
      break;
    case "equals":
      calculator.inputEquals();
      break;
    case "clear":
      calculator.inputClear();
      break;
    default:
      break;
  }

  render();
}

render();

if (keypad) {
  keypad.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) {
      return;
    }

    handleAction(button.dataset.action, button.dataset.value);
  });
}
