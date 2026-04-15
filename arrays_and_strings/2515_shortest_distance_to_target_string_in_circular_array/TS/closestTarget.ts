export {};

function closestTarget(
  words: string[],
  target: string,
  startIndex: number,
): number {
  let idxs = words.reduce((acc: number[], word: string, index: number) => {
    if (word == target) acc.push(index);
    return acc;
  }, []);
//   console.log("valid idxs:", idxs);

  if (idxs.length < 1) return -1;

  //map to calculate the steps to target idx from both directions of start index
  let steps = idxs.map((targetIdx) =>
    Math.min(
      Math.abs(targetIdx - startIndex),
      words.length - Math.abs(startIndex - targetIdx),
    ),
  );
  
//   console.log('smallest step for each idx:', steps)
  return Math.min(...steps);
}

const testCases: [string[], string, number][] = [
  [["hello", "i", "am", "leetcode", "here"], "leetcode", 3],
  [["hello", "i", "am", "leetcode", "here"], "here", 2],
  [["hello", "i", "am", "leetcode", "here"], "hello", 1],
  [["a", "b", "leetcode"], "leetcode", 0],
  [["a"], "a", 0],
  [["i", "eat", "leetcode"], "ate", 0],
];

for (const [words, target, startIndex] of testCases) {
  console.log(
    `Input:       words=${JSON.stringify(words)}, target=${JSON.stringify(target)}, startIndex=${startIndex}`,
  );
  console.log(`Output:      ${closestTarget(words, target, startIndex)}`);
  console.log("-".repeat(35));
}
