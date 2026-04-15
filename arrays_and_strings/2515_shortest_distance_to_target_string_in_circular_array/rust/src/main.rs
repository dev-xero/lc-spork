
struct Solution();

fn main() {
    let test_cases = vec![
        (vec!["hello", "i", "am", "leetcode", "here"], "leetcode", 3),
        (vec!["hello", "i", "am", "leetcode", "here"], "here", 2),
        (vec!["hello", "i", "am", "leetcode", "here"], "hello", 1),
        (vec!["a", "b", "leetcode"], "leetcode", 0),
        (vec!["a"], "a", 0),
        (vec!["i","eat","leetcode"], "ate", 0),
    ];

    for (words, target, start_index) in test_cases {
        let words_owned: Vec<String> = words.iter().map(|s| s.to_string()).collect();
        println!("Input:       words={:?}, target={:?}, startIndex={}", words, target, start_index);
        println!("Output:      {}", Solution::closest_target(words_owned, target.to_string(), start_index));
        println!("{}", "-".repeat(35));
    }
}

impl Solution {
    pub fn closest_target(words: Vec<String>, target: String, start_index: i32) -> i32 {
        let mut valid_idxs: Vec<i32> = Vec::new();
        for (i, item) in words.iter().enumerate(){
            if item == &target {
                valid_idxs.push(i as i32);
            };
        };

        //minimum distance using my derived formula
        let steps = {
            valid_idxs.iter().map(|idx| {
                let steps_to_right = (idx - start_index).abs();
                let steps_to_left = (words.len() as i32 - steps_to_right).abs();

                if steps_to_right < steps_to_left { steps_to_right} else { steps_to_left }
            }).min().unwrap_or(-1)
        };
        steps
    }

    //someone else's solution
    #[allow(unused)]
    pub fn closest_target2(words: Vec<String>, target: String, start_index: i32) -> i32 {
        let start = start_index as usize;
        let length = words.len();
        words
            .into_iter()
            .enumerate()
            .filter_map(|(i, w)| {
                if w == target {
                    let d = start.abs_diff(i);
                    Some(d.min(length - d) as i32)
                } else {
                    None
                }
            })
            .min()
            .unwrap_or(-1)
    }
}