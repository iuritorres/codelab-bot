function solution(array) {
  let result = Array.from(array);
  const sortedArray = Array.from(array).sort();

  let i = 1;
  sortedArray.forEach((number) => {
    const originalIndex = result.indexOf(number);
    result[originalIndex] = i++;
  });

  return result;
}

(() => {
  console.clear();

  const testCases = {
    test_1: {
      originalArray: [40, 10, 20, 30],
      expectedResult: [4, 1, 2, 3],
    },
    test_2: {
      originalArray: [40, 10, 20, 30, 23, 49],
      expectedResult: [5, 1, 2, 4, 3, 6],
    },
  };

  Object.keys(testCases).forEach((test) => {
    const testName = test
      .charAt(0)
      .toUpperCase()
      .concat(test.slice(1))
      .replace("_", " ");

    console.time(`${testName} execution duration`);
    const result = solution(testCases[test].originalArray);
    console.timeEnd(`${testName} execution duration`);
    const expectedResult = testCases[test].expectedResult;

    if (result.toString() !== expectedResult.toString()) {
      console.error(`${testName} Failed.
        Returned result: ${result}
        Expected result: ${expectedResult}
      `);
      return;
    }

    console.log(`${testName} Passed!`);
  });
})();
