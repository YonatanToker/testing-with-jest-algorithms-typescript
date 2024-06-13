//return an array excluding odd numbers
export const removeOddsFromArray = (numArr: number[]) => {
  const filteredArr = numArr.filter((element) => element % 2 === 0);
  return filteredArr;
};
//Return an array of its values plus the value's index
export const arrayPlusIndexValues = (numArray: number[]) => {
  const arrPlusIndexValues = numArray.map((item, index) => item + index);
  return arrPlusIndexValues;
};

// shuffle and array of integers
export const shuffleNumArr = (numArray: number[]) => {
  if (numArray.length <= 1) return numArray;

  //array is at list [x, x]:
  for (let i = 0; i < numArray.length; i++) {
    const randomIndex = Math.floor(Math.random() * numArray.length);
    //we got a random index of the array
    let secondIndex;
    if (randomIndex === 0) {
      //if first
      secondIndex = Math.floor(Math.random() * numArray.length - 1 + 1);
    } else if (randomIndex === numArray.length - 1) {
      //if last
      secondIndex = Math.floor(Math.random() * numArray.length - 1);
    } else {
      //if middle
      secondIndex =
        Math.random() > 0.5
          ? Math.floor(Math.random() * randomIndex)
          : Math.floor(
              Math.random() * (numArray.length - randomIndex) + randomIndex
            );
    }

    const randomIndexValue = numArray[randomIndex];
    numArray[randomIndex] = numArray[secondIndex];
    numArray[secondIndex] = randomIndexValue;
  }
  return numArray;
};

//Time complexity: O(n) and Space Complexity: O(n)
export const twoSum = (nums: number[], target: number) => {
  const complementsMap = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (complementsMap.has(complement) && complement !== nums[i]) {
      return [complementsMap.get(complement), i];
    }
    complementsMap.set(nums[i] + 1, i + 1);
  }
};

//assuming twoSum gets a sorted array in an ascending order
//T: O(n) S: O(1)
export const efficientTwoSum = (numbers: number[], target: number) => {
  let leftIndex = 0;
  let rightIndex = numbers.length - 1;
  while (leftIndex < rightIndex) {
    const leftValue = numbers[leftIndex];
    const rightValue = numbers[rightIndex];
    if (leftValue + rightValue === target) {
      return [leftIndex + 1, rightIndex + 1];
    } else if (leftValue + rightValue > target) {
      rightIndex--;
    } else {
      leftIndex++;
    }
  }
};

//Time complexity: O(n^2) + O(n*lgn) = O(n^2)
//S: O(n) due to the triplets
export const threeSum = (nums: number[]): number[][] => {
  const triplets: number[][] = [];
  nums.sort((a, b) => a - b); //Ascending O(n*lgn)
  //[-1,0,1,2,-1,-4] --> [-4, -1, -1, 0, 1, 2]
  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    //skip duplicate
    let leftIndex = i + 1;
    let rightIndex = nums.length - 1;
    //two pointer approach
    while (leftIndex < rightIndex) {
      const sum = nums[i] + nums[leftIndex] + nums[rightIndex];
      if (sum > 0) {
        rightIndex--;
      } else if (sum < 0) {
        leftIndex++;
      } else {
        triplets.push([nums[i], nums[leftIndex], nums[rightIndex]]);
        leftIndex++;
        //the next value can be the same as the one before
        while (
          leftIndex < rightIndex &&
          nums[leftIndex] === nums[leftIndex - 1]
        ) {
          leftIndex++;
        }
      }
    }
  }
  return triplets;
};

export const findingLowerNumberInSet = (num: number) => {
  const nums = new Set();
  for (let i = 0; i < 10; i++) {
    nums.add(i + 1);
  }
  return nums;
};
//leetcode 643
export const findMaxAverage = (nums: number[], k: number) => {
  if (k < 1 || k > nums.length) {
    return 0;
  }
  let maxAvg = 0;
  for (let i = 0; i < k; i++) {
    maxAvg += nums[i];
  }
  maxAvg = maxAvg;
  let i = 0;
  let currentMaxAvg = maxAvg;
  while (i < nums.length - k + 1) {
    currentMaxAvg = currentMaxAvg + nums[i + k] - nums[i];
    if (currentMaxAvg > maxAvg) maxAvg = currentMaxAvg;
    i++;
  }
  return maxAvg / k;
};
console.log(findMaxAverage([1, 12, -5, -6, 50, 3], 4));
// [1, 2, 3, 4, 5, 6, 7] arr.length = 7, 7 - k + 1 = 3
// k = 3
// [1, 2, 3]
