Here's the README:
markdown# Minimum Absolute Distance Between Mirror Pairs

**Platform:** LeetCode — [Problem 3761](https://leetcode.com/problems/minimum-absolute-distance-between-mirror-pairs/)  
**Difficulty:** Medium  
**Topic:** Arrays, Hash Map

---

## Problem

Given an integer array `nums`, a mirror pair is a pair of indices `(i, j)` where `reverse(nums[i]) == nums[j]`. Return the minimum absolute distance between the indices of any mirror pair. If no mirror pair exists, return `-1`.

Leading zeros are omitted after reversing — for example `reverse(120) = 21`.

**Example:**
Input:  [12, 21, 11]
Output: 1

---

## Approach — Single Pass with Hash Map
I first used a brute force approach which evaluated to O(n^2). In my first brute force approach, as I iterated through i, I then iterated through j to find a valid pair. However, just as expected, it blew on Leetcode's testcases. 

I then decided to optimize the brute force approach. Since j would always be bigger than i, I only needed to check from i+1 to n instead of the whole array, and instead of store a tuple of mirror pairs which I loop through after the first one, I calculate the min distance as I iterated. O(n) in the most lucky scenario but still O(n^2) worst case.

After some brainstorming with GPT, I learnt I could do it in one traversal with a data structure. GPT's comment of for every i jump straight to the valid j seemed impossible, but I thought what if I could remember valid reverse(nums[i]) for every j as I iterated.

Hence, In a single traversal, for each element at index `i`, I check if it already exists as a key in the hash map I construct as I iterate. If it does, a mirror pair has been found since the stored key is the reverse of some earlier element, satisfying `reverse(nums[j]) == nums[i]` where `j < i`. The current index is always greater than the stored index, so the distance is always `i - stored_index`.

If no match is found, I store the reverse of the current number mapped to its index. When duplicate values exist, I store the most recent index so that the minimum distance between occurrences is always considered.

A running minimum tracks the closest valid mirror pair seen so far and is returned at the end.

- **Time:** O(n)
- **Space:** O(n)

---

## Implementations

| Language | File |
|----------|------|
| Python | `python/min_mirror_pair.py` |
| Rust | `rust/src/main.rs` |
| TypeScript | `TS/minMirrorPair.ts` |

---

## Running Locally

**Python**
```bash
python3 min_mirror_pair.py && python3 bt_min_mirror.py && python3 bt_2_min_mirror.py 
```
bt is for the brute force solutions

**Rust**
```bash
cargo run
```

**TypeScript**
```bash
tsx minMirrorPair.ts
```