const passwordDisplay = document.querySelector('#password-display');
const form = document.querySelector('#password-form');
const characterAmountNumber = document.querySelector('#character-amount');
const includeUppercase = document.querySelector('#include-uppercase'); 
const includeNumbers = document.querySelector('#include-numbers');
const includeSymbols = document.querySelector('#include-symbols');
const copyIcon = document.querySelector('#copy-icon');

characterAmountNumber.addEventListener('input', syncCharacterAmount);
 
form.addEventListener('submit', e => {
  e.preventDefault();
  
  const charAmount = characterAmountNumber.value;
  const useUpper = includeUppercase.checked;
  const useNumber = includeNumbers.checked;
  const useSymbol = includeSymbols.checked;
  const password = generatePassword(charAmount, useUpper, useNumber, useSymbol);
   passwordDisplay.value = password;
});

const lowercase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const uppercase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const symbols = ['^', '!', '$', '%', '&', '|', '[', ']', '(', ')', '{', '}', ':', ';', '.', ',', '*', '+', '-', '#', '@', '<', '>', '~', '/', '?', '£', '¢', '€', '™', '✓', '©', '¥', '•', '×', 'π', '¶', '√'];

function generatePassword(charAmount, useUpper, useNumber, useSymbol) {
  
  let charCodes = lowercase;
  if (useUpper) {
    charCodes = charCodes.concat(uppercase);
  }
  if (useNumber) {
    charCodes = charCodes.concat(numbers);
  }
  if (useSymbol) {
    charCodes = charCodes.concat(symbols);
  }
  
  const passwordCharacters = [];
  
  for(let i = 0; i < charAmount; i++) {
    const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters.push(characterCode);
  }
  return passwordCharacters.join('');
}

function copyPassword() {
  passwordDisplay.select();
  passwordDisplay.setSelectionRange(0, 99999); // For mobile devices

  navigator.clipboard.writeText(passwordDisplay.value);

  alert("Copied the text: " + passwordDisplay.value);
  setTimeout(() => {
    copyIcon.style.color = "#4285F4";
  }, 1500);
}

copyIcon.addEventListener('click', copyPassword);

function syncCharacterAmount(e) { 
  const value = e.target.value; 
  characterAmountNumber.value = value;
}