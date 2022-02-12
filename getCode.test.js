const { getCode } = require('./main');

const functionName = 'getCode';
console.log(`Test ${functionName} function`);

// Creates a combination of specified size
const sizeTestCases = [
  {
    size: 4,
    colors: ['blue', 'red', 'green', 'yellow'],
  },
  {
    size: 2,
    colors: ['blue', 'red', 'green', 'yellow'],
  },
  {
    size: 5,
    colors: ['blue', 'red', 'green', 'yellow', 'pink'],
  },
];

sizeTestCases.forEach(({ size, colors }, i) => {
  const code = getCode(size, colors);
  const errorMsg = `Size test case ${i} failed.`;
  console.assert(code.length === size, errorMsg);
});

// Only uses specified colors
const colorTestCases = [
  {
    size: 2,
    colors: ['blue', 'red'],
  },
  {
    size: 2,
    colors: ['green', 'yellow'],
  },
  {
    size: 4,
    colors: ['blue', 'red', 'green', 'yellow'],
  },
];

colorTestCases.forEach(({ size, colors }, i) => {
  const code = getCode(size, colors);
  const errorMsg = `Color test case ${i} failed.`;

  // Ensure all colors from the code are specified
  for (let i = 0; i < code.length; i++) {
    const codeColor = code[i];
    const isColorIncluded = colors.includes(codeColor)

    // Fail if color is not inside specified colors array
    console.assert(isColorIncluded === true, errorMsg);
    if (!isColorIncluded) {
      // Stop looping over other colors
      break;
    }
  }
});

// Allows repeated colors by default
const allowsRepeatedColors = () => {
  const size = 10;
  const colors = ['blue', 'red'];
  const code = getCode(size, colors);
  return code.length === 10;
};

console.assert(allowsRepeatedColors(), 'Allows repeated colors test failed.');

// Creates code without repeating colors when specified
const allowsNotRepeatingColors = () => {
  const size = 10;
  const colors = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  const code = getCode(size, colors, false);

  // Check all colors
  while (colors.length > 0) {
    // Get first color
    const color = colors[0];

    // All colors should appear once, if a color isn't included
    // we can conclude that a color was repeated.
    if (!code.includes(color)) {
      return false;
    }

    // Remove first color
    colors.shift();
  }

  // All colors were included, which means none was repeated
  return true;
};

console.assert(allowsNotRepeatingColors(), 'Allows not repeating colors test failed.');

// Randomly creates a code with same parameters
const isRandom = () => {
  const size = 10;
  const colors = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

  const code = getCode(size, colors);

  // Call function and compare code 10 times, ensuring the output is random
  // (almost impossible probability of false negative)
  for (let i = 0; i < 10; i++) {
    const newCode = getCode(size, colors);

    for (let j = 0; j < code.length; j++) {
      const codeColor = code[j];
      const newCodeColor = newCode[j];

      // At least one is different, conclude that output is random
      if (codeColor !== newCodeColor) {
        return true;
      }
    }
  }

  // All 11 codes were exactly the same, conclude function isn't random
  return false;
};

console.assert(isRandom() === true, 'Random test failed.');

console.log(`Finished tests for ${functionName} function`);
