/**
 * Filters an array to return only unique elements.
 *
 * @param {Array} arr - The input array containing elements.
 * @returns {Array} - A new array containing only unique elements from the input array.
 *
 * The function uses an object (`seenValues`) to track elements that have already been added to the result (`uniqueArray`).
 * If an element is not in `seenValues`, it is added to `uniqueArray` and marked as seen.
 */
function uniqueElArray(arr) {
    const uniqueArray = [];
    const seenValues = {};
  
    for (const value of arr) {
      if (!seenValues[value]) {
        uniqueArray.push(value);
        seenValues[value] = true;
      }
    }
    return uniqueArray;
}
const uniqueArray = (arr) => [...new Set(arr)];


/**
 * Splits an array into two arrays: one with elements at even indices and another with elements at odd indices.
 *
 * @param {Array} srcArr - The source array to be split.
 * @returns {Array[]} - A two-element array:
 *                      - The first element contains values from even indices of the source array.
 *                      - The second element contains values from odd indices of the source array.
 *
 * The function iterates through the source array and distributes elements based on their index parity (even or odd).
 */
function explodeArrayInterleave(srcArr) {
    const evenArr = [];
    const oddArr = [];
    
    // Iterate through the array
    for (let i = 0; i < srcArr.length; i++) {
      if (i % 2 === 0) {
        evenArr.push(srcArr[i]); // Add elements at even indices
      } else {
        oddArr.push(srcArr[i]);  // Add elements at odd indices
      }
    }
    return [evenArr, oddArr];
}
// direct and inverse action on the array
function mergeArraysInterleave(arr1, arr2) {
    if (arr1.length !== arr2.length) throw new Error('diff arr len');
    const result = [];
    for (let i = 0; i < arr1.length; i++) {
      result.push(arr1[i]);
      result.push(arr2[i]);
    }
    return result;
}


/**
 * Separates an array of numbers into two categories: odd and even.
 *
 * @param {number[]} numbers - An array of numbers to be categorized.
 * @returns {Object} - An object with two properties:
 *                     - `odd`: An array containing all odd numbers from the input.
 *                     - `even`: An array containing all even numbers from the input.
 *
 * The function uses the `reduce` method to iterate through the array and categorize each number based on its parity.
 */
function separateOddEven(numbers) {
    return numbers.reduce((result, number) => {
      (number % 2 === 0 ? result.even : result.odd).push(number); // Check if the number is even or odd
      return result; // Return the updated result object
    }, { odd: [], even: [] }); // Initialize the result object with empty arrays for odd and even numbers
}
  

/**
 * Sorts an array of objects by a specific numeric property (key) in ascending order.
 *
 * @param {Object[]} arr - An array of objects to be sorted.
 * @param {string} key - The key (property name) within each object to sort by. 
 *                       The value of this key should be numeric for correct sorting.
 * @returns {Object[]} - A new array sorted in ascending order based on the specified key.
 *
 * The function uses the `Array.prototype.sort()` method to compare objects by their nested key values.
 */
function sortByNestedKey(arr, key) {
    return arr.sort((a, b) => a[key] - b[key]);
}


/**
 * Compares two arrays and returns a new array containing elements that are present in both arrays.
 *
 * - compare array  ( LIKE INTERSECT IN MYSQL )
 * - indexes from two array (arrEnable, arrDisable)
 * 
 * @param {Array} arr - The main array to compare.
 * @param {Array} arrForCompare - The array to compare against.
 * @returns {Array} - A new array containing elements that exist in both `arr` and `arrForCompare`.
 *
 * The function uses `Array.prototype.filter()` to iterate through `arr` and checks for inclusion 
 * of each element in `arrForCompare` using `Array.prototype.includes()`.
 */
const compareArrays2 = (arr, arrForCompare) => {
  return arr.filter(value => arrForCompare.includes(value));
};


/**
 * Identifies and returns an array of duplicate values from the input array.
 *
 * @param {Array} arr - The input array to check for duplicate values.
 * @returns {Array} - An array containing all unique duplicate values from the input array.
 *
 * The function iterates through the input array and identifies duplicates by comparing 
 * the current index of a value with the index of its first occurrence in the array. 
 * If a duplicate is found, it is added to the result only if it hasn't been added already.
 */
function getDuplicates(arr) {
  const duplicates = [];
  for (let i = 0; i < arr.length; i++) {
    // Check if the current value has appeared before in the array
    if (arr.indexOf(arr[i]) !== i) {
      // Add to the result array if not already included
      if (!duplicates.includes(arr[i])) {
        duplicates.push(arr[i]);
      }
    }
  }
  return duplicates;
}

/**
 * Returns an array of elements that are common between the source array and the comparison array.
 *
 * @param {Array} arrSrc - The source array to check elements from.
 * @param {Array} arr - The comparison array to find common elements with.
 * @returns {Array} - An array of elements that exist in both input arrays.
 *
 * This function identifies the intersection of two arrays by filtering elements in the source array that are present in the comparison array.
 */
function getCommonElements(arrSrc, arr) {
  return arrSrc.filter((el) => arr.includes(el));
}
// getCommonElements - getDifferentElements - union = compareArrays


/**
 * Returns the elements present in the source array that are not present in the comparison array.
 * Optionally checks for duplicates in the arrays before comparison.
 *
 * @param {Array} arrSrc - The source array to compare elements from.
 * @param {Array} arr - The comparison array to check against.
 * @param {boolean} [checkDuplicate=true] - Whether to handle duplicates in the arrays.
 * @returns {Array} - An array of elements unique to the source array based on the selected mode.
 *
 * This function compares two arrays and identifies elements in the source array that are not in the comparison array.
 * It has two modes:
 * 1. With duplicate handling (`checkDuplicate = true`): Removes duplicates first and then finds differences.
 * 2. Without duplicate handling (`checkDuplicate = false`): Handles duplicates explicitly by analyzing unique and duplicate elements separately.
 * console.log( compareArrays(arrBig2, arrBig, 'com') );
 * console.log( compareArrays(arrBig2, arrBig, 'diff') );
*/
function getDifferentElements(arrSrc, arr, checkDuplicate = true) {
  // Mode 1: Check for duplicates before comparison
  if (checkDuplicate) {
    // Remove duplicates from both arrays using `uniqueElArray`
    let arr1 = uniqueElArray(arrSrc);
    let arr2 = uniqueElArray(arr);

    // Return elements from arr1 that are not in arr2
    return arr1.filter((el) => !arr2.includes(el));
  } else {
  // Mode 2: Without duplicate handling

    // Extract unique elements from both arrays
    let ar1 = uniqueElArray(arrSrc);
    let ar2 = uniqueElArray(arr);

    // Find elements unique to arrSrc
    let res = ar1.filter((el) => !ar2.includes(el));

    // Find duplicate elements from both arrays using `getDuplicates`
    let arr1Duplicates = getDuplicates(arrSrc);
    let arr2Duplicates = getDuplicates(arr);

    // Combine duplicates and unique elements, ensuring no duplicates in the final result
    let result = uniqueElArray(
      joinArrays(joinArrays(arr1Duplicates, arr2Duplicates), res)
    );

    return result;
  }
}

/**
 * Combines two arrays into one by concatenation.
 *
 * @param {Array} arr1 - The first array to combine.
 * @param {Array} arr2 - The second array to combine.
 * @returns {Array} - A new array containing all elements from both arrays.
 */
function joinArrays(arr1, arr2) {
  return arr1.concat(arr2);
}


/**
 * Compares two arrays based on the specified mode.
 *
 * @param {Array} arr1 - The first array to compare.
 * @param {Array} arr2 - The second array to compare.
 * @param {boolean|string} [mod=true] - The mode of comparison:
 *   - If `mod` is `'com'`, it finds and returns unique common elements.
 *   - If `mod` is `'diff'`, it returns unique elements that differ between the arrays.
 *   - If `mod` is any other truthy value, it checks if the arrays are equal.
 *   - If `mod` is `false`, the function returns `undefined`.
 * @returns {Array|boolean|undefined} - The result of the comparison:
 *   - An array of unique common elements for `'com'` mode.
 *   - An array of unique differing elements for `'diff'` mode.
 *   - A boolean indicating whether the arrays are equal for other truthy `mod` values.
 *   - `undefined` if `mod` is `false`.
 */
function compareArrays(arr1, arr2, mod = true) {
  if (mod !== false) {
    if (mod === 'com') {
      // Finds and returns unique common elements between the arrays
      return uniqueElArray(getCommonElements(arr1, arr2));
    } else if (mod === 'diff') {
      // Finds and returns unique differing elements between the arrays
      return getDifferentElements(arr1, arr2, false);
    } else {
      // Compares the arrays for equality
      return equalArrays(arr1, arr2);
    }
  }
}


/**
 * Compares two arrays to determine if they are equal.
 *
 * @param {Array} array1 - The first array to compare.
 * @param {Array} array2 - The second array to compare.
 * @returns {boolean} - Returns `true` if the arrays are equal, `false` otherwise.
 * 
 * The arrays are considered equal if:
 *   - They have the same length.
 *   - They contain the same elements, regardless of their order.
 */
function equalArrays(array1, array2) {
  // Check if the arrays have the same length
  if (array1.length !== array2.length) return false;

  // Sort both arrays to ensure order doesn't affect comparison
  array1.sort();
  array2.sort();

  // Compare the sorted arrays element by element
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) return false;
  }

  // If all elements are equal, the arrays are equal
  return true;
}


/**
 * Returns an array of objects from `mainArr` that do not have matching `key` values in `compareArr`.
 *
 * @param {Array} mainArr - The main array of objects to filter.
 * @param {Array} compareArr - The array of objects to compare against.
 * @param {string} key - The key in the objects to use for comparison.
 * @returns {Array} - A filtered array of objects from `mainArr`.
 */
function arrayOfObjDiff(mainArr, compareArr, key) {
  const valueSet = new Set(compareArr.map((obj) => obj[key]));
  return mainArr.filter((obj) => !valueSet.has(obj[key]));
}

const array1 = [
  { id: 275, ipUsr: '444.42.22.109', name: 'bank' },
  { id: 28, ipUsr: '444.63.22.127', name: 'airport' },
  { id: 12, ipUsr: '544.43.32.246', name: 'bank' },
  { id: 18, ipUsr: '545.46.92.122', name: 'airport' },
  { id: 15, ipUsr: '564.75.66.136', name: 'bank' },
];
const array2 = [
  { id: 75, ipUsr: '222.63.62.339', name: 'bank' },
  { id: 14, ipUsr: '544.43.32.246', name: 'pharmacy' },
  { id: 58, ipUsr: '545.46.92.122', name: 'airport' },
];
// Filter by `ipUsr`
console.log(arrayOfObjDiff(array1, array2, 'ipUsr'));
// Output: [
//   { id: 275, ipUsr: '444.42.22.109', name: 'bank' },
//   { id: 28, ipUsr: '444.63.22.127', name: 'airport' },
//   { id: 15, ipUsr: '564.75.66.136', name: 'bank' }
// ]

// Filter by `name`
console.log(arrayOfObjDiff(array1, array2, 'name'));
// Output: [
//   { id: 12, ipUsr: '544.43.32.246', name: 'bank' },
//   { id: 15, ipUsr: '564.75.66.136', name: 'bank' }
// ]


/**
 * Moves a specified number of elements from the start of `sourceArray` to `targetArray`.
 * from sourceArray to targetArray move qty elements 
 * 
 * @param {Array} sourceArray - The array from which elements will be moved.
 * @param {Array} targetArray - The array to which elements will be added.
 * @param {number} qty - The number of elements to move from the sourceArray.
 * @returns {Array} - A new array containing the contents of `targetArray` with the moved elements.
 *
 * @throws {Error} If `sourceArray` or `targetArray` are not arrays, or if `count` is negative.
 */
function draggingElements(sourceArray, targetArray, qty) {
  // isArr - use here ? 
  if (!Array.isArray(sourceArray) || !Array.isArray(targetArray) || qty < 0) {
    throw new Error('incorrect params');
  }
  const elementsToMove = sourceArray.slice(0, qty); // Copy elements, don't delete them
  const newTargetArray = [...targetArray, ...elementsToMove];
  return newTargetArray;
}



/**
 * Retrieves a random element from an array without modifying the array.
 * 
 * getting random element from array 
 * 
 * @param {Array} arr - The input array from which to retrieve a random element.
 * @returns {*} - A random element from the array.
 *
 * @throws {Error} If the array is empty or not an array.
 */
function getRandElFromArray(arr) {
  isArr(arr);
  const randomIndex = Math.floor(Math.random() * arr.length); // Generate a random index
  return arr[randomIndex]; // Return the element at the random index
}


/**
 * Validates if the input is a non-empty array.
 *
 * @param {Array} arr - The input to validate.
 * @throws {Error} Throws an error if the input is not an array or if the array is empty.
 *
 * @example
 * isArr([1, 2, 3]); // Passes, no error thrown.
 * isArr([]); // Throws an error: "empty array"
 * isArr('not an array'); // Throws an error: "empty array"
 */
function isArr(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error("empty array");
  }
}


/**
 * Randomly shuffles the elements of an array/ Randomizes the order of elements in an array.
 *
 * @param {Array} arr - The array to shuffle.
 * @returns {Array} - A new array with the elements shuffled.
 *
 * @throws {Error} If the input is not a valid array.
 */
function shuffleArray(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("Input must be an array.");
  }

  const shuffled = [...arr]; // Create a copy of the array to avoid mutating the original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]]; // Swap elements
  }

  return shuffled;
}
const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);


/**
 * Splits an array into two halves and an optional pivot element.
 * 
 * If the array has an even length, it is divided into two equal halves, and the pivot array is empty.
 * If the array has an odd length, the middle element is included in the second half, or it can be manipulated using the `mod` parameter.
 * 
 * @param {Array} arr - The input array to split.
 * @param {number} [mod=0] - Determines the rearrangement of elements when the array has an odd length:
 *   - `0` (default): Keeps the middle element in the second half.
 *   - `1`: Swaps the first and second halves.
 *   - `2`: Moves the pivot element to the end of the second half.
 * @returns {Array[]} An array containing three arrays: [firstHalf, secondHalf, pivotArr].
 *   - `firstHalf`: The first half of the input array.
 *   - `secondHalf`: The second half of the input array.
 *   - `pivotArr`: An array containing the pivot element (or empty if the input array length is even).
 */
function splitArrayInHalf(arr, mod = 0) {
  if (arr.length === 0) {
    return []; // Return an empty array for an empty input.
  }

  const pivotEl = Math.floor(arr.length / 2);
  let firstHalf, secondHalf, pivotArr;

  if (arr.length % 2 === 0) {
    // If the array length is even
    firstHalf = arr.slice(0, pivotEl);
    secondHalf = arr.slice(pivotEl);
    pivotArr = []; 
  } else {
    // If the array length is odd
    firstHalf = arr.slice(0, pivotEl);
    secondHalf = [arr[pivotEl]]; // Middle element is placed in the second half
    pivotArr = arr.slice(pivotEl + 1);

    // Modify the split based on the `mod` parameter
    if (mod === 1) {
        // [firstHalf, secondHalf] = [secondHalf, firstHalf];
        const middleIndex = Math.floor(arr.length / 2);
        const firstHalf = arr.slice(0, middleIndex);
        const secondHalf = arr.slice(middleIndex);
        let pivotArr = [];
        return [firstHalf, secondHalf, pivotArr];
    } else if (mod === 2) {
      [secondHalf, pivotArr] = [pivotArr, secondHalf];
    }
  }
  return [firstHalf, secondHalf, pivotArr];
}
// Example usage
let arr0 = [
  8, 9, 7, 7, 6, 1, 8, 3, 9, 9, 4, 4, 6, 4, 3, 5, 2, 8, 1, 6, 1
];
let [half1, pivot, half2] = splitArrayInHalf(arr0);
console.log(half1); 
console.log(half2); 
console.log(pivot); 


/**
 * Flattens a nested array into a single-level array. array_merge in php
 *  
 * This function utilizes the `Array.prototype.flat` method with an `Infinity` depth,
 * ensuring that all nested levels of the input array are recursively flattened.
 * 
 * @param {Array} arr - The input array, which may contain nested arrays at any depth.
 * @returns {Array} A new array that is a flattened version of the input array.
 * 
 * @example
 * const arr1 = [1, 3, [4, [5, [2]]], 6, 7];
 * console.log(flattenArray(arr1)); // Output: [1, 3, 4, 5, 2, 6, 7]
 */
const flattenArray = (arr) => arr.flat(Infinity);
const arr1 = [1, 3, [4, [5, [2]]], 6, 7];
console.log(flattenArray(arr1));



/**
 * Splits an array into chunks of a specified size./ Divides an array into smaller arrays of a specified size.
 * 
 * This function utilizes the `Array.prototype.reduce` method to divide the input array
 * into smaller arrays (chunks) of the specified size.
 * 
 * @param {Array} arr - The input array to be chunked.
 * @param {number} size - The size of each chunk.
 * @returns {Array[]} A new array containing sub-arrays (chunks) of the specified size.
 * 
 * @example
 * const arr = [8, 9, 7, 7, 6, 1, 8, 3, 9, 9, 4, 4, 6, 4, 3, 5, 2, 8, 1, 6];
 * console.log(chunkArray(arr, 5));
 * // Output: [[8, 9, 7, 7, 6], [1, 8, 3, 9, 9], [4, 4, 6, 4, 3], [5, 2, 8, 1, 6]]
 */
const chunkArray = (arr, size) => 
  arr.reduce(
    (acc, _, i) => (
      i % size === 0 ? [...acc, arr.slice(i, i + size)] : acc), []
  );

let arr = [
  8, 9, 7, 7, 6, 1, 8, 3, 9, 9, 4, 4, 6, 4, 3, 5, 2, 8, 1, 6,
];
console.log(chunkArray(arr, 5));


/**
 * Splits an array into a specified number of nearly equal-sized subarrays.
 * Distributes elements as evenly as possible, assigning extra elements to the first partitions.
 * array_chunk in php
 * 
 * @param {Array} list - The input array to be partitioned.
 * @param {number} parts - The number of subarrays to divide the list into.
 * @returns {Array[]} A new array containing `parts` subarrays with distributed elements.
 *
 * @example
 * const inputArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'r', 1, 4, 5, 6, 7];
 * const chunks = partition(inputArray, 4);
 * console.log(chunks);
 * // Output: [['a', 'b', 'c', 'd'], ['e', 'f', 'g'], ['r', 1, 4], [5, 6, 7]]
 */
function partition(list, parts) {
    const result = [];
    const listLen = list.length;
    const partLen = Math.floor(listLen / parts);
    let mark = 0;
    for (let i = 0; i < parts; i++) {
      const incr = i < listLen % parts ? partLen + 1 : partLen;
      result.push(list.slice(mark, mark + incr));
      mark += incr;
    }

    return result;
}

const inputArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'r', 1, 4, 5, 6, 7];
const qtyNestedEl = 4;
const chunks = partition(inputArray, qtyNestedEl);



/**
 * Groups an array of objects by a specified key.
 * - Group by Key
 * This function uses `Array.prototype.reduce` to transform an array of objects 
 * into an object where keys correspond to unique values of the specified property,
 * and values are arrays of objects that share that key.
 *
 * @param {Object[]} arr - The array of objects to be grouped.
 * @param {string} key - The object property to group by.
 * @returns {Object} An object where each key is a unique value from the specified property,
 *                   and its value is an array of objects that have that property value.
 *
 * @example
 * const people = [
 *   { name: 'Alice', age: 35 },
 *   { name: 'Bob', age: 25 },
 *   { name: 'El', age: 12 },
 * ];
 * 
 * const groupedByAge = groupBy(people, 'age');
 * console.log(groupedByAge);
 * // Output:
 * // { "35": [{ name: 'Alice', age: 35 }],
 * //   "25": [{ name: 'Bob', age: 25 }],
 * //   "30": [{ name: 'Charlie', age: 30 }, { name: 'Rob', age: 30 }],
 * //   "12": [{ name: 'El', age: 12 }] }
 */
const groupBy = (arr, key) =>
      arr.reduce((acc, obj) => 
        ({ ...acc, [obj[key]]: [...(acc[obj[key]] || []), obj] }), 
      {});

// use
const people = [
  { name: 'Alice', age: 35 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 30 },
  { name: 'Rob', age: 30 },
  { name: 'El', age: 12 },
];

const groupedByAge = groupBy(people, 'age');
console.log(groupedByAge);

