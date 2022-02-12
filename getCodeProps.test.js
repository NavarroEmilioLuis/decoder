const { getCodeProps } = require('./main');

const functionName = 'getCodeProps';
console.log(`Test ${functionName} function`);

const testCases = [
  {
    code: ['Red', 'Blue', 'Green', 'Yellow'],
    expected: { Red: 1, Blue: 1, Green: 1, Yellow: 1 },
  },
  {
    code: ['Red', 'Red', 'Green', 'Yellow'],
    expected: { Red: 2, Green: 1, Yellow: 1 },
  },
];

testCases.forEach(({ code, expected }, i) => {
  const props = getCodeProps(code);
  const errorMsg = `Test case ${i} match failed.`;

  // Make sure every key matches the expected value
  for (const color of Object.keys(props)) {
    const hasSameValue = props[color] === expected[color];
    console.assert(hasSameValue, errorMsg);

    // Stop checking other values
    if (!hasSameValue) {
      break;
    }
  }
});

console.log(`Finished tests for ${functionName} function`);
