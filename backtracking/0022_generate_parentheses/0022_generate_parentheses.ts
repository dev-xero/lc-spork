// 22. Generate Parentheses
//
// Given n pairs of parentheses, write a function to generate all combinations
// of well-formed parentheses.
//
// Example: n = 3 -> ["((()))","(()())","(())()","()(())","()()()"]

// Strategy: backtracking
// At every step we have two choices — add '(' or add ')'.
// We prune invalid paths early using two rules:
//   1. Never place more '(' than the allowed max (open < n).
//   2. Never place ')' when there is no unmatched '(' to close (close < open).
// These two guards ensure every complete path we reach is already valid,
// so there is no need for a separate validation step.

function generateParenthesis(n: number): string[] {
    const result: string[] = [];
    backtrack('', 0, 0, n, result);
    return result;
}

function backtrack(
    s: string,
    open: number,   // number of '(' placed so far
    close: number,  // number of ')' placed so far
    max: number,    // n — the target pair count
    result: string[]
): void {
    // Base case: string is complete (used all n pairs).
    if (s.length === max * 2) {
        result.push(s);
        return;
    }

    // Branch 1: place an opening bracket if we haven't used all n yet.
    if (open < max) {
        backtrack(s + '(', open + 1, close, max, result);
    }

    // Branch 2: place a closing bracket only if there is an open one to match.
    if (close < open) {
        backtrack(s + ')', open, close + 1, max, result);
    }
}

/*
Walkthrough — n = 2

generateParenthesis(2)
backtrack('', 0, 0, 2)
  open < 2 -> backtrack('(', 1, 0, 2)
    open < 2 -> backtrack('((', 2, 0, 2)
      open == 2, skip branch 1
      close < open -> backtrack('(()', 2, 1, 2)
        open == 2, skip branch 1
        close < open -> backtrack('(())', 2, 2, 2)
          length == 4 -> push "(())"
    close < open -> backtrack('()', 1, 1, 2)
      open < 2 -> backtrack('()(', 2, 1, 2)
        open == 2, skip branch 1
        close < open -> backtrack('()()', 2, 2, 2)
          length == 4 -> push "()()"

Result: ["(())", "()()"]

Decision tree shape (n = 2):
                 ''
                 |
                '('
              /      \
           '(('      '()'
            |          |
          '(()'      '()('
            |          |
          '(())'    '()()'

Time Complexity:  O(4^n / √n) — bounded by the nth Catalan number,
                  which counts the valid combinations generated
Space Complexity: O(n) — recursion depth reaches at most 2n frames
*/

export { generateParenthesis };
