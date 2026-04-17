// u/algo-xero
// fun problem!
using umap = unordered_map<int, vector<int>>;

class Solution {
public:
    vector<int> solveQueries(vector<int>& nums, vector<int>& queries) {
        umap indices;
        for (int i = 0; i < nums.size(); ++i) {
            indices[nums[i]].push_back(i);
        }
        vector<int> res;
        for (int q : queries) {
            vector<int> &search_space = indices[nums[q]];
            int size = search_space.size();
            if (size == 1) {
                res.push_back(-1);
                continue;
            } 
            int lb = 0, ub = size;
            while (lb <= ub) {
                int idx = lb + (ub - lb) / 2;
                if (search_space[idx] == q) {
                    // for negatives, i need to apply corrective modulo
                    int q_right = search_space[(idx + 1) % size];
                    int q_left = search_space[((idx - 1) + size) % size];

                    int dl = q - q_left;
                    int dr = q_right - q;

                    int n = nums.size();
                    dl = ((dl % n) + n) % n;
                    dr = ((dr % n) + n) % n;

                    res.push_back(min(dl, dr));
                    break;
                } else if (search_space[idx] > q) {
                    ub = idx - 1;
                } else {
                    lb = idx + 1;
                }
            }
        }
        return res;
    }
};
