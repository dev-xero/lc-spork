from typing import List


def minimum_dist(targetidx: int, startidx: int, length: int)->int:
    return min(abs(targetidx - startidx), length - abs(startidx - targetidx))

class Solution:
    def closestTarget(self, words: List[str], target: str, startIndex: int) -> int:
        valid_idxs =[]
        for idx, word in enumerate(words):
            if word == target:
                valid_idxs.append(idx)
        if not valid_idxs:
            return -1
        
        return min(map(lambda valid_idx: minimum_dist(valid_idx, startIndex, len(words)), valid_idxs))
        
                
    
    
    
if __name__ == "__main__":
    test_cases = [
        (["hello", "i", "am", "leetcode", "here"], "leetcode", 3),  # → 1
        (["hello", "i", "am", "leetcode", "here"], "here", 2),      # → 3
        (["hello", "i", "am", "leetcode", "here"], "hello", 1),     # → 1, wraps around
        (["a", "b", "leetcode"], "leetcode", 0),                    # → 1, wraps backward
        (["a"], "a", 0),                                            # → 0, single element
        (["i","eat","leetcode"], "ate", 0),
    ]

    for words, target, startIndex in test_cases:
        print(f"Input:       words={words}, target={target!r}, startIndex={startIndex}")
        print(f"Output:      {Solution().closestTarget(words, target, startIndex)}")
        print("-" * 35)