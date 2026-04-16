"""22. Generate Parentheses

Given n pairs of parentheses, write a function to generate all combinations
of well-formed parentheses.

Example: n = 3 -> ["((()))","(()())","(())()","()(())","()()()"]

Strategy: backtracking
At every step we have two choices — add '(' or add ')'.
We prune invalid paths early using two rules:
  1. Never place more '(' than the allowed max (open < n).
  2. Never place ')' when there is no unmatched '(' to close (close < open).
"""


def generateParenthesis(n: int) -> list[str]:
    result: list[str] = []
    backtrack("", 0, 0, n, result)
    return result


def backtrack(s: str, open: int, close: int, max: int, result: list[str]) -> None:
    # Base case: string is complete (used all n pairs).
    if len(s) == max * 2:
        result.append(s)
        return

    # Branch 1: place an opening bracket if we haven't used all n yet.
    if open < max:
        backtrack(s + "(", open + 1, close, max, result)

    # Branch 2: place a closing bracket only if there is an open one to match.
    if close < open:
        backtrack(s + ")", open, close + 1, max, result)


"""
Walkthrough — n = 2

generateParenthesis(2)
backtrack("", 0, 0, 2)
  open < 2 -> backtrack("(", 1, 0, 2)
    open < 2 -> backtrack("((", 2, 0, 2)
      close < open -> backtrack("(()", 2, 1, 2)
        close < open -> backtrack("(())", 2, 2, 2)
          len == 4 -> append "(())"
    close < open -> backtrack("()", 1, 1, 2)
      open < 2 -> backtrack("()(", 2, 1, 2)
        close < open -> backtrack("()()", 2, 2, 2)
          len == 4 -> append "()()"

Result: ["(())", "()()"]

Time Complexity:  O(4^n / √n) — bounded by the nth Catalan number,
                  which counts the valid combinations generated
Space Complexity: O(n) — recursion depth reaches at most 2n frames
"""
