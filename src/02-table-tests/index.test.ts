// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 10, b: 5, action: Action.Divide, expected: 2 },
  { a: 12, b: 6, action: Action.Divide, expected: 2 },
  { a: 5, b: 3, action: Action.Exponentiate, expected: 125 },
  { a: 3, b: 4, action: Action.Exponentiate, expected: 81 },
  { a: 8, b: 2, action: Action.Exponentiate, expected: 64 },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    `expected output with a, b and action`,
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a: a, b: b, action: action })).toBe(expected);
    },
  );
});
