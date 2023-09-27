let currentInput = '';
let operator = '';
let displayValue = '0';
let history = [];

function updateDisplay() {
  document.getElementById('display').textContent = displayValue;
}

function appendToDisplay(value) {
  if (displayValue === '0' || displayValue === 'Error') {
    displayValue = value;
  } else {
    displayValue += value;
  }
  updateDisplay();
}

function addToHistory(value) {
  history.push(value);
  updateHistory();
}

function operate(op) {
  if (currentInput === '') {
    operator = op;
    addToHistory(displayValue + ' ' + operator);
    currentInput = displayValue;
    displayValue = '0';
    updateDisplay();
  }
}

function clearDisplay() {
  currentInput = '';
  operator = '';
  displayValue = '0';
  updateDisplay();
}

function calculateResult() {
  if (currentInput !== '') {
    let result;
    switch (operator) {
      case '+':
        result = parseFloat(currentInput) + parseFloat(displayValue);
        break;
      case '-':
        result = parseFloat(currentInput) - parseFloat(displayValue);
        break;
      case '*':
        result = parseFloat(currentInput) * parseFloat(displayValue);
        break;
      case '/':
        if (displayValue === '0') {
          displayValue = 'Error';
          updateDisplay();
          return;
        }
        result = parseFloat(currentInput) / parseFloat(displayValue);
        break;
      default:
        return;
    }
    displayValue = result.toString();
    addToHistory(currentInput +  '=' + displayValue);
    currentInput = '';
    operator = '';
    updateDisplay();
  }
}

function updateHistory() {
  const historyList = document.getElementById('history-list');
  historyList.innerHTML = '';
  for (const item of history) {
    const li = document.createElement('li');
    li.textContent = item;
    historyList.appendChild(li);
  }
}

updateDisplay();
