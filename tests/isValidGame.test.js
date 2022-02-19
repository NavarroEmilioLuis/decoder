const { isValidGame } = require('../main');

const functionName = 'isValidGame';
console.log(`Test ${functionName} function`);

const testCases = [
  // Guarantees attempts is an integer from 1 to Infinity
  {
    attempts: '',
    size: 4,
    colors: ['blue', 'red', 'green', 'yellow'],
    expected: false,
  },
  {
    attempts: 0,
    size: 4,
    colors: ['blue', 'red', 'green', 'yellow'],
    expected: false,
  },
  {
    attempts: 1,
    size: 4,
    colors: ['blue', 'red', 'green', 'yellow'],
    expected: true,
  },
  {
    attempts: 12,
    size: 4,
    colors: ['blue', 'red', 'green', 'yellow'],
    expected: true,
  },
  {
    attempts: Infinity,
    size: 4,
    colors: ['blue', 'red', 'green', 'yellow'],
    expected: true,
  },
  // Guarantees size is an integer from 1 to 16
  {
    attempts: 12,
    size: '',
    colors: ['blue', 'red', 'green', 'yellow'],
    expected: false,
  },
  {
    attempts: 12,
    size: 0,
    colors: ['blue', 'red', 'green', 'yellow'],
    expected: false,
  },
  {
    attempts: 12,
    size: Infinity,
    colors: ['blue', 'red', 'green', 'yellow'],
    expected: false,
  },
  {
    attempts: 12,
    size: 17,
    colors: ['blue', 'red', 'green', 'yellow'],
    expected: false,
  },
  {
    attempts: 12,
    size: 1,
    colors: ['blue', 'red', 'green', 'yellow'],
    expected: true,
  },
  {
    attempts: 12,
    size: 4,
    colors: ['blue', 'red', 'green', 'yellow'],
    expected: true,
  },
  {
    attempts: 12,
    size: 16,
    colors: ['blue', 'red', 'green', 'yellow'],
    expected: true,
  },
  // Guarantees colors is an array containing strings
  {
    attempts: 12,
    size: 4,
    colors: true,
    expected: false,
  },
  {
    attempts: 12,
    size: 4,
    colors: [],
    expected: false,
  },
  {
    attempts: 12,
    size: 4,
    colors: ['blue', 2, 'green', 'yellow'],
    expected: false,
  },
  {
    attempts: 12,
    size: 4,
    colors: ['blue', 'red', 'green', 'yellow'],
    expected: true,
  },
  {
    attempts: 12,
    size: 4,
    colors: ['a', 'b', 'c', '0'],
    expected: true,
  },
];

testCases.forEach(({ attempts, size, colors, expected }, i) => {
  const isValid = isValidGame(attempts, size, colors);
  const errorMsg = `Test case ${i} validity failed.`;
  console.assert(isValid === expected, errorMsg);
});

console.log(`Finished tests for ${functionName} function`);
