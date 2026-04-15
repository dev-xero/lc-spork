# Shortest Distance to Target String in a Circular Array

**Platform:** LeetCode — [Problem 2515](https://leetcode.com/problems/shortest-distance-to-target-string-in-a-circular-array/)  
**Difficulty:** Easy  
**Topic:** Arrays, Circular Array

---

## Problem

Given a circular array `words` and a `target` string, return the shortest distance from `startIndex` to any index where `words[i] == target`. If the target does not exist, return `-1`. The array is circular, so you can traverse forward or backward.

**Example:**
Input:  words = ["hello", "i", "am", "leetcode", "here"], target = "leetcode", startIndex = 3
Output: 1

---

## Approach

Given a starting index and set of target indexes, I noticed a pattern after observing some examples. The sum of steps approached from the left and steps approached from the right is the length of the words array, N. Hence I derived these formulas.

steps_1 + steps_2 = N

where steps_1 is:
- => target - start

Hence:
- => target - start + steps_2 = N
- => steps_2 = N - (start - target)

Since we only care about the distance, D, we can take the absolute value of target - start.
- |target - start| = |start - target|

Hence:
- steps_1 = D
- steps_2 = N - D

So I compare the smaller between steps_1 and steps_2 -approaching target from left and right- for all valid indexes of the target word. This will give me an array and I can apply the min helper to return the minimum value of the array following the language in use's paradigm.

### Pseudocode

```
function closestTarget(words, target, startIndex):
    N = length of words

    target_indexes = [i for every i where words[i] == target]

    if target_indexes is empty:
        return -1

    distances = for each idx in target_indexes:
        D = |idx - startIndex|
        steps_1 = D
        steps_2 = N - D
        yield min(steps_1, steps_2)

    return min(distances)
```

- **Time:** O(n)
- **Space:** O(1)

---

## Implementations

| Language | File |
|----------|------|
| Python | `python/closest_target.py` |
| Rust | `rust/src/main.rs` |
| TypeScript | `TS/closestTarget.ts` |

---

## Running Locally

**Python**
```bash
python3 closest_target.py
```

**Rust**
```bash
cargo run
```

**TypeScript**
```bash
tsx closestTarget.ts
```