/* ============================================================
   DSA Roadmap — Static Notes & Complexity Database
   Keyed by question ID (matches QUESTION_BANK.questions keys).
   Each entry: { notes: string, time: string, space: string }
   ============================================================ */
const NOTES_DB = {

  /* ── Arrays: Binary Search ─────────────────────────────── */
  'lc:binary-search': {
    notes: 'Classic binary search. Compare mid to target; move lo or hi. Return lo if not found.',
    time: 'O(log n)', space: 'O(1)'
  },
  'lc:search-insert-position': {
    notes: 'Standard binary search; when lo > hi, lo is the correct insert position.',
    time: 'O(log n)', space: 'O(1)'
  },
  'lc:find-first-and-last-position-of-element-in-sorted-array': {
    notes: 'Run two binary searches — one biased left (find first) and one biased right (find last).',
    time: 'O(log n)', space: 'O(1)'
  },
  'lc:find-peak-element': {
    notes: 'Binary search on slope: if nums[mid] < nums[mid+1], peak is to the right; else to the left.',
    time: 'O(log n)', space: 'O(1)'
  },
  'lc:single-element-in-a-sorted-array': {
    notes: 'Binary search on even indices. If nums[mid] == nums[mid+1], single is on the right; else left.',
    time: 'O(log n)', space: 'O(1)'
  },
  'gfg:floor-in-a-sorted-array-1587115620': {
    notes: 'Track the last position where arr[mid] <= x during binary search. Ceil uses arr[mid] >= x.',
    time: 'O(log n)', space: 'O(1)'
  },
  'gfg:number-of-occurrence2259': {
    notes: 'Count = (last index of x) − (first index of x) + 1, using two binary searches.',
    time: 'O(log n)', space: 'O(1)'
  },
  'lc:search-in-rotated-sorted-array': {
    notes: 'Identify which half is sorted, then check if target lies in it; adjust lo/hi accordingly.',
    time: 'O(log n)', space: 'O(1)'
  },
  'lc:search-in-rotated-sorted-array-ii': {
    notes: 'Same as I but duplicates allow arr[lo] == arr[mid] == arr[hi] — shrink both ends in that case.',
    time: 'O(log n) avg, O(n) worst', space: 'O(1)'
  },
  'lc:find-minimum-in-rotated-sorted-array': {
    notes: 'Minimum is at the pivot. If nums[mid] > nums[hi], pivot is right; else left (or mid is min).',
    time: 'O(log n)', space: 'O(1)'
  },
  'lc:find-minimum-in-rotated-sorted-array-ii': {
    notes: 'Same idea with duplicates; when nums[lo] == nums[hi], do hi-- to eliminate ambiguity.',
    time: 'O(log n) avg, O(n) worst', space: 'O(1)'
  },
  'lc:search-a-2d-matrix': {
    notes: 'Treat the m×n matrix as a single sorted array; binary search with mid = matrix[mid/n][mid%n].',
    time: 'O(log(mn))', space: 'O(1)'
  },
  'lc:search-a-2d-matrix-ii': {
    notes: 'Start at top-right: if value > target move left; if value < target move down.',
    time: 'O(m + n)', space: 'O(1)'
  },
  'lc:median-of-two-sorted-arrays': {
    notes: 'Binary search on partition point of the smaller array; balance left/right halves across both arrays.',
    time: 'O(log(min(m,n)))', space: 'O(1)'
  },
  'lc:sqrtx': {
    notes: 'Binary search in [0, x]; find the largest m where m*m <= x.',
    time: 'O(log x)', space: 'O(1)'
  },
  'gfg:find-nth-root-of-m5843': {
    notes: 'Binary search on [1.0, m] with floating-point mid; compare mid^n to m.',
    time: 'O(n · log(m/ε))', space: 'O(1)'
  },
  'lc:koko-eating-bananas': {
    notes: 'Binary search on speed k in [1, max(piles)]; greedily check if all piles can be eaten in h hours.',
    time: 'O(n log(max))', space: 'O(1)'
  },
  'lc:capacity-to-ship-packages-within-d-days': {
    notes: 'Binary search on capacity in [max(weights), sum(weights)]; check if d days are enough.',
    time: 'O(n log(sum))', space: 'O(1)'
  },
  'lc:minimum-number-of-days-to-make-m-bouquets': {
    notes: 'Binary search on days; for each candidate day count achievable bouquets greedily.',
    time: 'O(n log(max_bloom))', space: 'O(1)'
  },
  'lc:find-the-smallest-divisor-given-a-threshold': {
    notes: 'Binary search on divisor in [1, max(nums)]; sum of ceilings must be ≤ threshold.',
    time: 'O(n log(max))', space: 'O(1)'
  },
  'lc:minimum-time-to-complete-trips': {
    notes: 'Binary search on time t; total trips = sum(t // time[i]) must be ≥ totalTrips.',
    time: 'O(n log(ans))', space: 'O(1)'
  },
  'lc:minimum-speed-to-arrive-on-time': {
    notes: 'Binary search on speed; all but last trip use ceil division; last trip is exact.',
    time: 'O(n log(1e7))', space: 'O(1)'
  },
  'lc:split-array-largest-sum': {
    notes: 'Binary search on the answer (max subarray sum); greedy check how many subarrays are needed.',
    time: 'O(n log(sum))', space: 'O(1)'
  },
  'gfg:allocate-minimum-number-of-pages0937': {
    notes: 'Binary search on max pages per student; greedy allocation check.',
    time: 'O(n log(sum))', space: 'O(1)'
  },
  'gfg:the-painters-partition-problem1535': {
    notes: 'Binary search on max boards per painter; check if k painters can cover all boards.',
    time: 'O(n log(sum))', space: 'O(1)'
  },
  'lc:minimize-maximum-of-array': {
    notes: 'Binary search on the answer; or observe that optimal max = ceil(prefix_avg) at each index.',
    time: 'O(n log(max))', space: 'O(1)'
  },
  'gfg:aggressive-cows': {
    notes: 'Sort stalls; binary search on minimum distance; greedy check if k cows can be placed.',
    time: 'O(n log(max−min))', space: 'O(1)'
  },
  'lc:magnetic-force-between-two-balls': {
    notes: 'Sort positions; binary search on minimum force (distance); greedy placement check.',
    time: 'O(n log(max−min))', space: 'O(1)'
  },
  'lc:kth-smallest-element-in-a-sorted-matrix': {
    notes: 'Binary search on value [min, max]; count elements ≤ mid using step-wise traversal.',
    time: 'O(n log(max−min))', space: 'O(1)'
  },
  'lc:kth-missing-positive-number': {
    notes: 'Binary search: missing count at index i = arr[i] − (i+1). Find first index where missing ≥ k.',
    time: 'O(log n)', space: 'O(1)'
  },
  'lc:find-k-th-smallest-pair-distance': {
    notes: 'Sort array; binary search on distance; count pairs with distance ≤ mid using two pointers.',
    time: 'O(n log n + n log W)', space: 'O(1)'
  },
  'gfg:median-in-a-row-wise-sorted-matrix1527': {
    notes: 'Binary search on value; count elements ≤ mid across all rows; find first value where count > mn/2.',
    time: 'O(r log c · log(max−min))', space: 'O(1)'
  },

  /* ── Arrays: Kadane / Prefix Sum ───────────────────────── */
  'lc:maximum-subarray': {
    notes: "Kadane's algorithm: track running sum; reset to 0 when negative; update global max.",
    time: 'O(n)', space: 'O(1)'
  },
  'lc:maximum-sum-circular-subarray': {
    notes: 'Answer is max(normal Kadane, total_sum − min_subarray_sum). Handle all-negative edge case.',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:maximum-absolute-sum-of-any-subarray': {
    notes: 'Max absolute sum = max(max_subarray, |min_subarray|). Run both Kadane variants.',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:maximum-subarray-sum-after-one-operation': {
    notes: 'Track two DPs: max sum ending here (no flip yet) and max sum ending here (flip used). Transition between them.',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:maximum-product-subarray': {
    notes: 'Track both max and min product ending at i (negatives can flip signs). Answer = max of all maxProd values.',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:subarray-sum-equals-k': {
    notes: 'Prefix sum + hashmap: count how many prefix sums equal (currentSum − k).',
    time: 'O(n)', space: 'O(n)'
  },
  'lc:continuous-subarray-sum': {
    notes: 'Prefix sum mod k + hashmap storing first occurrence index. Subarray length must be ≥ 2.',
    time: 'O(n)', space: 'O(k)'
  },
  'lc:subarray-sums-divisible-by-k': {
    notes: 'Track prefix sum mod k; normalize negative remainders. Count pairs with equal remainders.',
    time: 'O(n)', space: 'O(k)'
  },
  'lc:binary-subarrays-with-sum': {
    notes: 'Prefix sum + hashmap, or atMost(goal) − atMost(goal−1) with sliding window.',
    time: 'O(n)', space: 'O(n)'
  },
  'lc:number-of-subarrays-with-bounded-maximum': {
    notes: 'Count subarrays with max ≤ R minus those with max ≤ L−1 (atMost trick).',
    time: 'O(n)', space: 'O(1)'
  },
  'gfg:count-subarrays-with-given-xor': {
    notes: 'Prefix XOR + hashmap: count prefix XORs equal to (currentXOR ^ k).',
    time: 'O(n)', space: 'O(n)'
  },
  'gfg:longest-sub-array-with-sum-k0809': {
    notes: 'Prefix sum + hashmap storing the first index where each prefix sum occurred.',
    time: 'O(n)', space: 'O(n)'
  },
  'gfg:largest-subarray-with-0-sum': {
    notes: 'Prefix sum + hashmap; if same sum seen before, the subarray between those indices sums to 0.',
    time: 'O(n)', space: 'O(n)'
  },
  'lc:maximum-size-subarray-sum-equals-k': {
    notes: 'Prefix sum + hashmap tracking the earliest index of each prefix sum.',
    time: 'O(n)', space: 'O(n)'
  },
  'lc:range-sum-query-immutable': {
    notes: 'Build prefix sum array once. Query [l,r] = prefix[r+1] − prefix[l] in O(1).',
    time: 'O(n) build / O(1) query', space: 'O(n)'
  },
  'lc:count-number-of-nice-subarrays': {
    notes: 'Convert odd numbers to 1, even to 0. Then count subarrays with sum = k using prefix sum + hashmap.',
    time: 'O(n)', space: 'O(n)'
  },
  'lc:product-of-array-except-self': {
    notes: 'Two-pass: fill left products left-to-right, then multiply right products right-to-left in-place.',
    time: 'O(n)', space: 'O(1) extra'
  },
  'lc:single-number': {
    notes: 'XOR all elements. Pairs cancel (a^a=0); the lonely element remains.',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:single-number-ii': {
    notes: 'For each bit, count appearances mod 3. The bit that appears once contributes to the answer.',
    time: 'O(n)', space: 'O(1)'
  },
  'gfg:find-xor-of-numbers-from-l-to-r': {
    notes: 'Use the pattern: XOR(1..n) cycles with period 4. XOR(l..r) = XOR(1..r) ^ XOR(1..l−1).',
    time: 'O(1)', space: 'O(1)'
  },
  'lc:range-sum-query-2d-immutable': {
    notes: '2D prefix sum. Query = P[r2][c2] − P[r1−1][c2] − P[r2][c1−1] + P[r1−1][c1−1].',
    time: 'O(mn) build / O(1) query', space: 'O(mn)'
  },
  'lc:matrix-block-sum': {
    notes: 'Build 2D prefix sum; each cell (i,j) answer is the region sum over the K-radius block.',
    time: 'O(mn)', space: 'O(mn)'
  },
  'lc:number-of-submatrices-that-sum-to-target': {
    notes: 'Fix top and bottom rows; reduce to 1D subarray sum = target using prefix sum + hashmap.',
    time: 'O(m²n)', space: 'O(n)'
  },
  'lc:max-sum-of-rectangle-no-larger-than-k': {
    notes: 'Fix row pair; collapse to 1D sums; use sorted set to find largest prefix sum ≤ currentSum − k.',
    time: 'O(m²n log n)', space: 'O(n)'
  },

  /* ── Arrays: Sliding Window ─────────────────────────────── */
  'lc:maximum-average-subarray-i': {
    notes: 'Maintain a fixed-size window of k elements; slide right updating sum and tracking max.',
    time: 'O(n)', space: 'O(1)'
  },
  'gfg:max-sum-subarray-of-size-k5313': {
    notes: 'Fixed window of size k; track running sum and update max each step.',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:find-all-anagrams-in-a-string': {
    notes: 'Sliding window of size len(p); track character frequency difference; add start index when diff = 0.',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:permutation-in-string': {
    notes: 'Same as Find All Anagrams but return true as soon as frequency counts match.',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:longest-substring-without-repeating-characters': {
    notes: 'Two pointers (l, r); move l past the previous occurrence of s[r] whenever a duplicate is found.',
    time: 'O(n)', space: 'O(min(n, charset))'
  },
  'lc:longest-repeating-character-replacement': {
    notes: 'Slide window; window is valid when (size − maxFreq) ≤ k. Expand right; shrink left when invalid.',
    time: 'O(n)', space: 'O(26)'
  },
  'lc:minimum-window-substring': {
    notes: 'Expand right until all required chars are covered; shrink left to minimize window length.',
    time: 'O(n + m)', space: 'O(m)'
  },
  'lc:fruit-into-baskets': {
    notes: 'Longest subarray with at most 2 distinct values. Sliding window with frequency map.',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:max-consecutive-ones-iii': {
    notes: 'Sliding window; count zeros in window. When zeros > k, shrink from left.',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:subarrays-with-k-different-integers': {
    notes: 'atMost(k) − atMost(k−1). Each atMost call uses a sliding window with a frequency map.',
    time: 'O(n)', space: 'O(n)'
  },
  'lc:sliding-window-maximum': {
    notes: 'Monotonic deque (decreasing values). Front = current window max; pop front when out of window.',
    time: 'O(n)', space: 'O(k)'
  },
  'gfg:minimum-of-all-subarrays-of-size-k3101': {
    notes: 'Monotonic deque (increasing values). Front = current window min.',
    time: 'O(n)', space: 'O(k)'
  },
  'lc:constrained-subsequence-sum': {
    notes: 'DP where dp[i] = nums[i] + max(dp[j]) for j in [i−k, i−1]. Use deque to track window max.',
    time: 'O(n)', space: 'O(k)'
  },
  'lc:jump-game-vi': {
    notes: 'DP: dp[i] = nums[i] + max(dp[i−k..i−1]). Maintain max in a sliding window deque.',
    time: 'O(n)', space: 'O(k)'
  },

  /* ── Arrays: Two Pointers ────────────────────────────────── */
  'lc:two-sum-ii-input-array-is-sorted': {
    notes: 'Left and right pointers on sorted array. Sum too big → move right left; too small → move left right.',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:valid-palindrome': {
    notes: 'Left and right pointers; skip non-alphanumeric characters; compare lowercased values.',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:container-with-most-water': {
    notes: 'Two pointers from ends. Always move the pointer with the shorter line inward.',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:trapping-rain-water': {
    notes: 'Two pointers: water at position = min(maxLeft, maxRight) − height[i]. Move the lower side.',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:3sum': {
    notes: 'Sort; fix one element and use two pointers for the remaining pair. Skip duplicates at each level.',
    time: 'O(n²)', space: 'O(1)'
  },
  'lc:4sum': {
    notes: 'Extend 3Sum: fix two elements with nested loops, then two pointers for the pair.',
    time: 'O(n³)', space: 'O(1)'
  },
  'lc:squares-of-a-sorted-array': {
    notes: 'Two pointers from both ends; larger square goes to the back of the result array.',
    time: 'O(n)', space: 'O(n)'
  },
  'lc:remove-duplicates-from-sorted-array': {
    notes: 'Slow-fast pointers; advance slow pointer only when a new unique value is found.',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:remove-element': {
    notes: 'Write-pointer skips elements equal to val; all others get written to front.',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:move-zeroes': {
    notes: 'Write-pointer places all non-zero elements first; fill the remaining positions with 0.',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:linked-list-cycle': {
    notes: "Floyd's cycle detection: slow = 1 step, fast = 2 steps. If they meet, cycle exists.",
    time: 'O(n)', space: 'O(1)'
  },
  'lc:middle-of-the-linked-list': {
    notes: 'Fast/slow pointers; when fast reaches the end, slow is at the middle.',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:merge-sorted-array': {
    notes: 'Merge from back using three pointers (i at end of nums1, j at end of nums2, k at total end).',
    time: 'O(m + n)', space: 'O(1)'
  },
  'lc:sort-colors': {
    notes: 'Dutch National Flag: three-way partition with lo, mid, hi pointers.',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:partition-array-according-to-given-pivot': {
    notes: 'Two-pass: first collect < pivot, then == pivot, then > pivot. Or stable 3-way partition.',
    time: 'O(n)', space: 'O(n)'
  },
  'lc:wiggle-sort': {
    notes: 'One-pass: if i is even and nums[i] > nums[i+1], swap; if i is odd and nums[i] < nums[i+1], swap.',
    time: 'O(n)', space: 'O(1)'
  },
  'gfg:three-way-partitioning': {
    notes: 'Dutch National Flag on a value range [lo, hi]. Elements < lo go left, > hi go right.',
    time: 'O(n)', space: 'O(1)'
  },

  /* ── Hash Map ────────────────────────────────────────────── */
  'lc:two-sum': {
    notes: 'Store each number\'s index in a hashmap. For each num, check if (target − num) is already stored.',
    time: 'O(n)', space: 'O(n)'
  },
  'lc:contains-duplicate-ii': {
    notes: 'Sliding window hashmap of size k; check if new element already exists within the window.',
    time: 'O(n)', space: 'O(k)'
  },
  'lc:longest-consecutive-sequence': {
    notes: 'Put all numbers in a set. Only start counting from sequence beginnings (num−1 not in set).',
    time: 'O(n)', space: 'O(n)'
  },
  'lc:group-anagrams': {
    notes: 'Use sorted string or character-frequency tuple as hashmap key; group words by key.',
    time: 'O(nk log k)', space: 'O(nk)'
  },
  'lc:top-k-frequent-elements': {
    notes: 'Build frequency map; then use a min-heap of size k, or bucket sort by frequency.',
    time: 'O(n log k)', space: 'O(n)'
  },
  'lc:sort-characters-by-frequency': {
    notes: 'Build frequency map, sort characters by frequency descending, reconstruct string.',
    time: 'O(n log n)', space: 'O(n)'
  },
  'lc:first-unique-character-in-a-string': {
    notes: 'Two-pass: first count all frequencies, then find the first character with count = 1.',
    time: 'O(n)', space: 'O(26)'
  },
  'lc:contains-duplicate': {
    notes: 'Insert into a HashSet; return true if an element is already present.',
    time: 'O(n)', space: 'O(n)'
  },
  'lc:intersection-of-two-arrays': {
    notes: 'Convert both arrays to sets; return the intersection using set operations.',
    time: 'O(m + n)', space: 'O(m + n)'
  },
  'lc:happy-number': {
    notes: "Floyd's cycle detection on the digit-square-sum sequence. Terminates at 1 (happy) or loops.",
    time: 'O(log n)', space: 'O(1)'
  },
  'lc:isomorphic-strings': {
    notes: 'Maintain two maps: s→t and t→s. Both must be consistent bijections.',
    time: 'O(n)', space: 'O(1)'
  },
  'gfg:pattern-searching5231': {
    notes: 'Split pattern into words; map each word to a pattern character using two maps.',
    time: 'O(n)', space: 'O(n)'
  },

  /* ── Strings ─────────────────────────────────────────────── */
  'lc:longest-substring-with-at-most-k-distinct-characters': {
    notes: 'Sliding window with a frequency map; shrink from left when distinct count exceeds k.',
    time: 'O(n)', space: 'O(k)'
  },
  'lc:valid-palindrome-ii': {
    notes: 'Two pointers; on first mismatch try skipping s[lo] or s[hi] and check if remainder is palindrome.',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:reverse-words-in-a-string': {
    notes: 'Split on whitespace (handles multiple spaces), reverse the word array, join with single space.',
    time: 'O(n)', space: 'O(n)'
  },
  'lc:reverse-string': {
    notes: 'Two pointers from both ends; swap characters until they meet.',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:find-the-index-of-the-first-occurrence-in-a-string': {
    notes: 'KMP: build failure function (longest proper prefix that is also suffix); search in O(n+m).',
    time: 'O(n + m)', space: 'O(m)'
  },
  'lc:repeated-substring-pattern': {
    notes: 'If s = s+s with first and last characters removed, it contains s as a proper repetition.',
    time: 'O(n)', space: 'O(n)'
  },
  'lc:longest-happy-prefix': {
    notes: 'The KMP failure (partial match) table itself is the answer; last value = longest happy prefix length.',
    time: 'O(n)', space: 'O(n)'
  },
  'lc:repeated-dna-sequences': {
    notes: 'Sliding window of length 10; use a HashSet to track seen substrings; add to result on second visit.',
    time: 'O(n)', space: 'O(n)'
  },
  'gfg:z-function': {
    notes: "Z[i] = length of the longest substring starting at i that matches a prefix of s. Use Z-box window to compute in O(n).",
    time: 'O(n)', space: 'O(n)'
  },
  'lc:valid-anagram': {
    notes: 'Count character frequencies for both strings; compare the counts.',
    time: 'O(n)', space: 'O(26)'
  },
  'lc:ransom-note': {
    notes: 'Build frequency map from magazine; decrement for each character in ransomNote; fail if any goes negative.',
    time: 'O(m + n)', space: 'O(26)'
  },
  'lc:longest-palindrome': {
    notes: 'Sum floor(freq/2)*2 for all chars; add 1 if any character has an odd frequency (can be center).',
    time: 'O(n)', space: 'O(26)'
  },
  'lc:count-and-say': {
    notes: 'Iterate n−1 times from "1"; each step run-length encode the previous string.',
    time: 'O(n · |result|)', space: 'O(|result|)'
  },
  'lc:string-compression': {
    notes: 'Two-pointer in-place run-length encoding; write count as individual digits.',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:longest-common-prefix': {
    notes: 'Sort the array; the LCP of the first and last string is the LCP of all.',
    time: 'O(n log n + m)', space: 'O(1)'
  },
  'lc:decode-string': {
    notes: 'Stack-based: push (currentString, count) on \'[\'; on \']\' pop and repeat inner string.',
    time: 'O(output size)', space: 'O(n)'
  },
  'lc:multiply-strings': {
    notes: 'Simulate grade-school multiplication; result[i+j+1] += (num1[i] − \'0\') × (num2[j] − \'0\').',
    time: 'O(mn)', space: 'O(m + n)'
  },

  /* ── Linked List ─────────────────────────────────────────── */
  'lc:linked-list-cycle-ii': {
    notes: "Floyd's: find meeting point, then reset one pointer to head. They meet at cycle start.",
    time: 'O(n)', space: 'O(1)'
  },
  'lc:find-the-duplicate-number': {
    notes: "Treat array values as next-pointers; apply Floyd's cycle detection to find the duplicate.",
    time: 'O(n)', space: 'O(1)'
  },
  'lc:reverse-linked-list': {
    notes: 'Iterative: maintain prev, cur, next. Redirect cur.next to prev each step.',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:reverse-linked-list-ii': {
    notes: 'Find the (left−1)th node; reverse the sublist from left to right in-place.',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:reverse-nodes-in-k-group': {
    notes: 'Reverse each group of k nodes; link the tail of each reversed group to the head of the next group.',
    time: 'O(n)', space: 'O(n/k) recursion'
  },
  'lc:palindrome-linked-list': {
    notes: 'Find middle (fast/slow), reverse second half, compare both halves, then restore.',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:swap-nodes-in-pairs': {
    notes: 'Dummy head; for each pair: track prev, first, second; redirect pointers then advance.',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:merge-two-sorted-lists': {
    notes: 'Dummy head; compare both heads; attach the smaller node; advance that pointer.',
    time: 'O(m + n)', space: 'O(1)'
  },
  'lc:merge-k-sorted-lists': {
    notes: 'Min-heap of (value, node) from each list head; pop smallest, push its next.',
    time: 'O(n log k)', space: 'O(k)'
  },
  'lc:sort-list': {
    notes: 'Merge sort: find mid (fast/slow), split, recursively sort halves, merge.',
    time: 'O(n log n)', space: 'O(log n)'
  },
  'lc:reorder-list': {
    notes: 'Find middle, reverse second half, interleave: take one from front then one from back.',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:add-two-numbers': {
    notes: 'Traverse both lists simultaneously; sum digits with carry; create new nodes.',
    time: 'O(max(m,n))', space: 'O(max(m,n))'
  },
  'lc:remove-nth-node-from-end-of-list': {
    notes: 'Two pointers n+1 apart; when fast reaches end, slow.next is the node to remove.',
    time: 'O(n)', space: 'O(1)'
  },

  /* ── Stack ───────────────────────────────────────────────── */
  'lc:valid-parentheses': {
    notes: 'Push opening brackets; on closing bracket, pop and check if it matches.',
    time: 'O(n)', space: 'O(n)'
  },
  'lc:baseball-game': {
    notes: 'Simulate with a stack: "+": sum top two, "D": double top, "C": remove top.',
    time: 'O(n)', space: 'O(n)'
  },
  'lc:backspace-string-compare': {
    notes: 'Two-pointer from back: skip characters based on backspace count, compare character by character.',
    time: 'O(m + n)', space: 'O(1)'
  },
  'lc:remove-all-adjacent-duplicates-in-string': {
    notes: 'Stack: if top equals current char, pop; otherwise push. Remaining stack is the answer.',
    time: 'O(n)', space: 'O(n)'
  },
  'lc:make-the-string-great': {
    notes: 'Same as remove adjacent duplicates but condition is same letter in opposite case.',
    time: 'O(n)', space: 'O(n)'
  },
  'lc:next-greater-element-i': {
    notes: 'Monotonic decreasing stack on nums2; store next-greater in a map; look up each num1 element.',
    time: 'O(m + n)', space: 'O(n)'
  },
  'lc:daily-temperatures': {
    notes: 'Monotonic decreasing stack storing indices; when a warmer day is found, resolve waiting days.',
    time: 'O(n)', space: 'O(n)'
  },
  'lc:final-prices-with-a-special-discount-in-a-shop': {
    notes: 'Monotonic increasing stack; next smaller or equal element gives the discount.',
    time: 'O(n)', space: 'O(n)'
  },
  'lc:buildings-with-an-ocean-view': {
    notes: 'Traverse right-to-left; maintain a stack/set of buildings taller than all to their right.',
    time: 'O(n)', space: 'O(n)'
  },
  'lc:next-greater-element-ii': {
    notes: 'Circular array: iterate twice (0 to 2n−1) with index mod n; monotonic decreasing stack.',
    time: 'O(n)', space: 'O(n)'
  },
  'lc:online-stock-span': {
    notes: 'Monotonic stack storing (price, span); merge spans of all smaller-or-equal prices.',
    time: 'O(1) amortized', space: 'O(n)'
  },
  'lc:remove-k-digits': {
    notes: 'Monotonic increasing stack; pop when current digit is smaller than top and k > 0.',
    time: 'O(n)', space: 'O(n)'
  },
  'lc:asteroid-collision': {
    notes: 'Stack: positive asteroids push; negative asteroids collide with positive stack top until stable.',
    time: 'O(n)', space: 'O(n)'
  },
  'lc:sum-of-subarray-minimums': {
    notes: 'For each element find its left and right boundaries (prev/next smaller). Contribution = left_span × right_span × val.',
    time: 'O(n)', space: 'O(n)'
  },
  'lc:maximum-width-ramp': {
    notes: 'Build decreasing stack of candidates (left bounds). Scan right-to-left; pop when A[i] ≥ stack top.',
    time: 'O(n)', space: 'O(n)'
  },
  'lc:number-of-visible-people-in-a-queue': {
    notes: 'Monotonic decreasing stack right-to-left; count how many people are visible from each position.',
    time: 'O(n)', space: 'O(n)'
  },
  'gfg:stock-span-problem-1587115621': {
    notes: 'Monotonic stack storing (price, span). For each new price, merge spans of all ≤ prices.',
    time: 'O(n)', space: 'O(n)'
  },
  'gfg:next-smaller-element': {
    notes: 'Monotonic increasing stack; when a smaller element is found, it answers waiting elements.',
    time: 'O(n)', space: 'O(n)'
  },
  'lc:min-stack': {
    notes: 'Maintain a second "min stack"; push current min alongside each value push.',
    time: 'O(1) all ops', space: 'O(n)'
  },
  'lc:evaluate-reverse-polish-notation': {
    notes: 'Stack: numbers push; operators pop two operands, compute, push result.',
    time: 'O(n)', space: 'O(n)'
  },

  /* ── Trees ───────────────────────────────────────────────── */
  'lc:binary-tree-inorder-traversal': {
    notes: 'Left → Root → Right. Iterative: push nodes going left; process on pop, then go right.',
    time: 'O(n)', space: 'O(h)'
  },
  'lc:binary-tree-preorder-traversal': {
    notes: 'Root → Left → Right. Iterative: push right child first, then left.',
    time: 'O(n)', space: 'O(h)'
  },
  'lc:binary-tree-postorder-traversal': {
    notes: 'Left → Right → Root. Iterative: modified preorder (root, right, left) then reverse.',
    time: 'O(n)', space: 'O(h)'
  },
  'lc:same-tree': {
    notes: 'Recursively check: both null (true), one null (false), values differ (false), else recurse both sides.',
    time: 'O(n)', space: 'O(h)'
  },
  'lc:symmetric-tree': {
    notes: 'Check if left and right subtrees are mirrors: compare (L.left, R.right) and (L.right, R.left).',
    time: 'O(n)', space: 'O(h)'
  },
  'lc:flatten-binary-tree-to-linked-list': {
    notes: 'Reverse preorder (right, left, root); maintain a prev pointer; set cur.right = prev each step.',
    time: 'O(n)', space: 'O(h)'
  },
  'lc:binary-tree-level-order-traversal': {
    notes: 'BFS with a queue; record queue size at start of each level to separate levels.',
    time: 'O(n)', space: 'O(w) where w = max width'
  },
  'lc:binary-tree-right-side-view': {
    notes: 'BFS level by level; add the last node value of each level to the result.',
    time: 'O(n)', space: 'O(w)'
  },
  'lc:binary-tree-zigzag-level-order-traversal': {
    notes: 'BFS; alternate direction of insertion each level (append vs prepend).',
    time: 'O(n)', space: 'O(w)'
  },
  'lc:maximum-width-of-binary-tree': {
    notes: 'BFS with index tracking; width = rightmost_idx − leftmost_idx + 1. Normalize indices to prevent overflow.',
    time: 'O(n)', space: 'O(w)'
  },
  'lc:vertical-order-traversal-of-a-binary-tree': {
    notes: 'BFS storing (col, row, val); group by col, sort each group by (row, val).',
    time: 'O(n log n)', space: 'O(n)'
  },
  'lc:maximum-depth-of-binary-tree': {
    notes: 'DFS: depth = 1 + max(depth(left), depth(right)). Base case: null → 0.',
    time: 'O(n)', space: 'O(h)'
  },
  'lc:balanced-binary-tree': {
    notes: 'DFS returning height; if |left_height − right_height| > 1 return −1 (unbalanced signal).',
    time: 'O(n)', space: 'O(h)'
  },
  'lc:invert-binary-tree': {
    notes: 'Swap left and right children recursively (or iteratively with BFS).',
    time: 'O(n)', space: 'O(h)'
  },
  'lc:lowest-common-ancestor-of-a-binary-tree': {
    notes: 'DFS: if current node is p or q, return it. LCA is where both left and right returns are non-null.',
    time: 'O(n)', space: 'O(h)'
  },
  'lc:count-good-nodes-in-binary-tree': {
    notes: 'DFS tracking maxSoFar on the path. A node is "good" if its value ≥ maxSoFar.',
    time: 'O(n)', space: 'O(h)'
  },
  'lc:subtree-of-another-tree': {
    notes: 'At each node of the main tree check if isSameTree(node, subRoot).',
    time: 'O(m · n)', space: 'O(h)'
  },
  'lc:binary-tree-maximum-path-sum': {
    notes: 'DFS: at each node, max gain = val + max(0, left_gain) + max(0, right_gain). Track global max.',
    time: 'O(n)', space: 'O(h)'
  },
  'lc:diameter-of-binary-tree': {
    notes: 'DFS: diameter through node = left_height + right_height. Track global max diameter.',
    time: 'O(n)', space: 'O(h)'
  },
  'lc:path-sum-ii': {
    notes: 'DFS backtracking: add node to path, recurse, then remove (backtrack). Add to result at leaves.',
    time: 'O(n)', space: 'O(h)'
  },
  'lc:sum-root-to-leaf-numbers': {
    notes: 'DFS: running value = running_val × 10 + node.val. Add to total at leaves.',
    time: 'O(n)', space: 'O(h)'
  },
  'lc:pseudo-palindromic-paths-in-a-binary-tree': {
    notes: 'XOR node values on path (toggle bits). At leaf, path is pseudo-palindromic if at most 1 bit set.',
    time: 'O(n)', space: 'O(h)'
  },
  'lc:validate-binary-search-tree': {
    notes: 'DFS passing (min_bound, max_bound); node value must be strictly between bounds.',
    time: 'O(n)', space: 'O(h)'
  },
  'lc:kth-smallest-element-in-a-bst': {
    notes: 'Inorder traversal (sorted order); return the k-th element visited.',
    time: 'O(k)', space: 'O(h)'
  },
  'lc:insert-into-a-binary-search-tree': {
    notes: 'Go left if val < node.val, right if val > node.val; insert at null position.',
    time: 'O(h)', space: 'O(h)'
  },
  'lc:delete-node-in-a-bst': {
    notes: 'Find node; if two children replace with inorder successor (smallest in right subtree).',
    time: 'O(h)', space: 'O(h)'
  },
  'lc:lowest-common-ancestor-of-a-binary-search-tree': {
    notes: 'If both < node → go left; if both > node → go right; else current node is LCA.',
    time: 'O(h)', space: 'O(1)'
  },
  'lc:convert-sorted-array-to-binary-search-tree': {
    notes: 'Mid element becomes root; recurse on left half and right half.',
    time: 'O(n)', space: 'O(log n)'
  },
  'lc:balance-a-binary-search-tree': {
    notes: 'Inorder traversal to sorted array, then build height-balanced BST from sorted array.',
    time: 'O(n)', space: 'O(n)'
  },

  /* ── Recursion / Backtracking ────────────────────────────── */
  'lc:subsets': {
    notes: 'At each element: branch into "include" and "exclude". Collect all leaves.',
    time: 'O(2ⁿ)', space: 'O(n)'
  },
  'lc:subsets-ii': {
    notes: 'Sort first. Skip duplicate elements at the same recursion depth to avoid duplicate subsets.',
    time: 'O(2ⁿ)', space: 'O(n)'
  },
  'lc:letter-case-permutation': {
    notes: 'Branch on letters (try both upper and lower); recurse on digits without branching.',
    time: 'O(2ⁿ)', space: 'O(n)'
  },
  'lc:permutations': {
    notes: 'Swap element at index i with each element from i onwards; recurse; swap back (backtrack).',
    time: 'O(n! × n)', space: 'O(n)'
  },
  'lc:permutations-ii': {
    notes: 'Sort; use a "used" array; skip duplicates at the same depth (skip if nums[i] == nums[i−1] and !used[i−1]).',
    time: 'O(n!)', space: 'O(n)'
  },
  'lc:combinations': {
    notes: 'Choose k elements from n; prune early when remaining elements < still-needed count.',
    time: 'O(C(n,k))', space: 'O(k)'
  },
  'lc:combination-sum': {
    notes: 'Unlimited reuse of each element; explore from current index (not i+1) to allow repeats.',
    time: 'O(n^(T/min))', space: 'O(T/min)'
  },
  'lc:combination-sum-ii': {
    notes: 'Sort; each element used at most once; skip consecutive duplicates at same depth.',
    time: 'O(2ⁿ)', space: 'O(n)'
  },
  'lc:combination-sum-iii': {
    notes: 'Choose exactly k digits from 1–9 summing to n. Prune when sum exceeds n or digits run out.',
    time: 'O(C(9,k))', space: 'O(k)'
  },
  'lc:word-search': {
    notes: 'DFS from each cell; mark cell visited (e.g. temp char); backtrack on return.',
    time: 'O(mn × 4^L)', space: 'O(L)'
  },
  'lc:word-search-ii': {
    notes: 'Build a Trie of all words. DFS from each cell; prune when trie node has no children to explore.',
    time: 'O(mn × 4^L)', space: 'O(W×L)'
  },
  'lc:n-queens': {
    notes: 'Place queens column by column; track occupied rows, diagonals, anti-diagonals with sets.',
    time: 'O(n!)', space: 'O(n)'
  },
  'lc:sudoku-solver': {
    notes: 'Try digits 1–9 in each empty cell; validate row/col/box constraints; backtrack on failure.',
    time: 'O(9^81) worst case', space: 'O(81)'
  },
  'gfg:rat-in-a-maze-problem': {
    notes: 'DFS from (0,0); mark cell visited; try all 4 directions; backtrack when stuck.',
    time: 'O(4^(mn))', space: 'O(mn)'
  },
  'lc:palindrome-partitioning': {
    notes: 'Backtrack: at each index try all palindrome prefixes; only recurse if prefix is a palindrome.',
    time: 'O(n × 2ⁿ)', space: 'O(n)'
  },
  'lc:restore-ip-addresses': {
    notes: 'Backtrack placing 3 dots; each segment must be 0–255 with no leading zeros.',
    time: 'O(3^4) = O(1)', space: 'O(4)'
  },
  'lc:generate-parentheses': {
    notes: 'Add \'(\' if open < n; add \')\' if close < open. Only valid sequences are formed.',
    time: 'O(4ⁿ / √n) Catalan', space: 'O(n)'
  },
  'lc:letter-combinations-of-a-phone-number': {
    notes: 'Map each digit to its letters; backtracking or BFS to build all combinations.',
    time: 'O(4^n × n)', space: 'O(n)'
  },

  /* ── Sorting ─────────────────────────────────────────────── */
  'lc:sort-an-array': {
    notes: 'Implement merge sort: divide into halves, sort each, merge. Stable and predictable.',
    time: 'O(n log n)', space: 'O(n)'
  },
  'lc:kth-largest-element-in-an-array': {
    notes: 'QuickSelect: partition array around pivot; recurse only into the relevant half.',
    time: 'O(n) average', space: 'O(1)'
  },
  'gfg:inversion-of-array-1587115620': {
    notes: 'Modified merge sort: count right-before-left merges during the merge step.',
    time: 'O(n log n)', space: 'O(n)'
  },
  'lc:count-of-smaller-numbers-after-self': {
    notes: 'Merge sort tracking original indices; count how many right-side elements land before left-side during merge.',
    time: 'O(n log n)', space: 'O(n)'
  },

  /* ── DP Basic ────────────────────────────────────────────── */
  'lc:climbing-stairs': {
    notes: 'dp[i] = dp[i−1] + dp[i−2]. Same as Fibonacci. Space-optimize to two variables.',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:min-cost-climbing-stairs': {
    notes: 'dp[i] = cost[i] + min(dp[i−1], dp[i−2]). Answer is min(dp[n−1], dp[n−2]).',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:house-robber': {
    notes: 'dp[i] = max(dp[i−2] + nums[i], dp[i−1]). Rob or skip current house.',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:house-robber-ii': {
    notes: 'Circular array → run House Robber I on [0..n−2] and [1..n−1]; take the maximum.',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:decode-ways': {
    notes: 'dp[i] = dp[i−1] (if valid single digit) + dp[i−2] (if valid two-digit). Handle leading zeros.',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:word-break': {
    notes: 'dp[i] = true if any dp[j] is true and s[j..i−1] is in the dictionary.',
    time: 'O(n² × m)', space: 'O(n)'
  },
  'lc:longest-increasing-subsequence': {
    notes: 'Binary search (patience sort): maintain a tails array; replace/extend with each element.',
    time: 'O(n log n)', space: 'O(n)'
  },
  'lc:coin-change': {
    notes: 'dp[i] = min(dp[i − coin] + 1) for each coin. Initialize dp[0]=0, rest=∞.',
    time: 'O(n × C)', space: 'O(n)'
  },
  'lc:target-sum': {
    notes: 'Partition into P (positive) and N (negative): P − N = target, P + N = sum. Find subsets summing to (sum+target)/2.',
    time: 'O(n × sum)', space: 'O(sum)'
  },
  'lc:partition-equal-subset-sum': {
    notes: 'Subset-sum DP: can we make sum/2? If sum is odd, impossible. Use 1D boolean DP.',
    time: 'O(n × sum)', space: 'O(sum)'
  },
  'lc:coin-change-ii': {
    notes: 'dp[i] += dp[i − coin]. Iterate coins in outer loop (order of coins doesn\'t matter).',
    time: 'O(n × C)', space: 'O(n)'
  },
  'lc:ones-and-zeroes': {
    notes: '2D knapsack with dimensions (zeros, ones). For each string, update dp[i][j] from dp[i−z][j−o]+1.',
    time: 'O(mn × len)', space: 'O(mn)'
  },
  'lc:last-stone-weight-ii': {
    notes: 'Partition into two groups minimizing |sum1 − sum2|; equivalent to subset sum closest to total/2.',
    time: 'O(n × sum)', space: 'O(sum)'
  },
  'lc:length-of-the-longest-subsequence-that-sums-to-target': {
    notes: 'Standard 0/1 knapsack: dp[j] = max length subsequence summing to j.',
    time: 'O(n × target)', space: 'O(target)'
  },

  /* ── Greedy ──────────────────────────────────────────────── */
  'lc:merge-intervals': {
    notes: 'Sort by start time; if next interval starts ≤ current end, merge by extending end.',
    time: 'O(n log n)', space: 'O(n)'
  },
  'lc:non-overlapping-intervals': {
    notes: 'Sort by end time; greedily keep the interval with the earliest end; count removals.',
    time: 'O(n log n)', space: 'O(1)'
  },
  'lc:insert-interval': {
    notes: 'Three phases: add all non-overlapping before, merge all overlapping, add all after.',
    time: 'O(n)', space: 'O(n)'
  },
  'lc:minimum-number-of-arrows-to-burst-balloons': {
    notes: 'Sort by end; shoot at each balloon\'s end; an arrow bursts all overlapping balloons with same end.',
    time: 'O(n log n)', space: 'O(1)'
  },
  'gfg:n-meetings-in-one-room-1587115620': {
    notes: 'Activity selection: sort by finish time; greedily pick meetings that start after the last selected ends.',
    time: 'O(n log n)', space: 'O(1)'
  },
  'lc:jump-game': {
    notes: 'Track maxReach; if current index > maxReach, return false. Update maxReach = max(maxReach, i + nums[i]).',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:jump-game-ii': {
    notes: 'Greedy BFS "levels": expand as far as possible within current level; increment jumps per level.',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:jump-game-vii': {
    notes: 'BFS with sliding window to avoid reprocessing indices already queued.',
    time: 'O(n)', space: 'O(n)'
  },
  'gfg:activity-selection-1587115620': {
    notes: 'Sort by finish time; select activity if its start ≥ previous selected finish.',
    time: 'O(n log n)', space: 'O(1)'
  },
  'gfg:job-sequencing-problem-1587115620': {
    notes: 'Sort by profit descending; assign each job to the latest available slot ≤ its deadline.',
    time: 'O(n log n + n×d)', space: 'O(d)'
  },
  'lc:task-scheduler': {
    notes: 'Answer = max(n, (maxFreq−1)×(n+1) + countOfMaxFreq). Fill idle slots with other tasks.',
    time: 'O(n)', space: 'O(26)'
  },
  'gfg:minimum-number-of-platforms-required-for-a-railway-station-1587115620': {
    notes: 'Sort arrivals and departures separately; two-pointer sweep to track concurrent trains.',
    time: 'O(n log n)', space: 'O(1)'
  },
  'lc:assign-cookies': {
    notes: 'Sort both; greedily assign the smallest sufficient cookie to each child in order.',
    time: 'O(n log n)', space: 'O(1)'
  },
  'lc:candy': {
    notes: 'Two passes: left-to-right (increasing runs), right-to-left (decreasing runs); take max at each position.',
    time: 'O(n)', space: 'O(n)'
  },
  'lc:gas-station': {
    notes: 'If total gas ≥ total cost, a solution exists. Start from any reset point (where running sum goes < 0).',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:boats-to-save-people': {
    notes: 'Sort; two pointers. Try to pair heaviest with lightest; if they fit, advance both; else only lightest stays.',
    time: 'O(n log n)', space: 'O(1)'
  },
  'lc:lemonade-change': {
    notes: 'Track $5 and $10 bill counts. For $20 change: prefer $10+$5 over three $5s.',
    time: 'O(n)', space: 'O(1)'
  },
  'gfg:minimum-cost-of-ropes-1587115620': {
    notes: 'Min-heap: always merge the two smallest ropes; cost = sum of merged lengths.',
    time: 'O(n log n)', space: 'O(n)'
  },
  'lc:minimum-cost-to-connect-sticks': {
    notes: 'Same as minimum cost of ropes: merge two smallest via min-heap each step.',
    time: 'O(n log n)', space: 'O(n)'
  },

  /* ── Heap ────────────────────────────────────────────────── */
  'lc:k-closest-points-to-origin': {
    notes: 'Max-heap of size k (by distance); pop when size > k. Remaining = k closest points.',
    time: 'O(n log k)', space: 'O(k)'
  },
  'lc:kth-largest-element-in-a-stream': {
    notes: 'Min-heap of size k; the top = k-th largest. Add and pop to maintain size k.',
    time: 'O(log k) per add', space: 'O(k)'
  },
  'lc:find-k-pairs-with-smallest-sums': {
    notes: 'Min-heap seeded with (nums1[0], nums2[j]) for j=0..k−1. Pop and push next from nums1.',
    time: 'O(k log k)', space: 'O(k)'
  },
  'lc:smallest-range-covering-elements-from-k-lists': {
    notes: 'Min-heap with one element from each list; track current max; shrink range by advancing min.',
    time: 'O(kn log k)', space: 'O(k)'
  },
  'lc:reorganize-string': {
    notes: 'Max-heap by frequency; alternate top-two characters. Impossible if maxFreq > (n+1)/2.',
    time: 'O(n log 26)', space: 'O(26)'
  },
  'lc:ipo': {
    notes: 'Sort projects by capital. Greedily unlock affordable projects into a max-heap by profit; pick top k times.',
    time: 'O(n log n)', space: 'O(n)'
  },
  'gfg:huffman-encoding3345': {
    notes: 'Min-heap: repeatedly merge two lowest-frequency nodes until one tree remains.',
    time: 'O(n log n)', space: 'O(n)'
  },
  'lc:find-median-from-data-stream': {
    notes: 'Two heaps: maxHeap for lower half, minHeap for upper half. Balance sizes after each insert.',
    time: 'O(log n) add / O(1) median', space: 'O(n)'
  },
  'lc:sliding-window-median': {
    notes: 'Two heaps with lazy deletion (mark removed elements); rebalance on each window slide.',
    time: 'O(n log k)', space: 'O(k)'
  },

  /* ── Graphs ──────────────────────────────────────────────── */
  'lc:number-of-islands': {
    notes: 'DFS/BFS from each unvisited \'1\'; flood-fill by setting visited cells to \'0\'.',
    time: 'O(mn)', space: 'O(mn)'
  },
  'lc:flood-fill': {
    notes: 'DFS from source pixel; change all reachable same-colored cells to new color.',
    time: 'O(mn)', space: 'O(mn)'
  },
  'lc:clone-graph': {
    notes: 'BFS/DFS + hashmap: old_node → new_node. For each neighbor, clone if not seen.',
    time: 'O(V + E)', space: 'O(V)'
  },
  'lc:number-of-provinces': {
    notes: 'DFS on adjacency matrix, or Union-Find; count connected components.',
    time: 'O(n²)', space: 'O(n)'
  },
  'lc:max-area-of-island': {
    notes: 'DFS from each unvisited \'1\'; accumulate and return the size of each connected component.',
    time: 'O(mn)', space: 'O(mn)'
  },
  'lc:course-schedule': {
    notes: 'Cycle detection in directed graph. Kahn\'s topological sort: impossible if not all nodes processed.',
    time: 'O(V + E)', space: 'O(V + E)'
  },
  'lc:course-schedule-ii': {
    notes: 'Topological sort (Kahn\'s BFS or DFS); return order if no cycle, else empty array.',
    time: 'O(V + E)', space: 'O(V + E)'
  },
  'lc:find-eventual-safe-states': {
    notes: 'Reverse graph direction; nodes with no outgoing edges (originally terminal) are safe sources.',
    time: 'O(V + E)', space: 'O(V + E)'
  },
  'gfg:alien-dictionary': {
    notes: 'Compare adjacent words to build ordering constraints; topological sort those constraints.',
    time: 'O(C) where C = total chars', space: 'O(1) — 26 chars'
  },
  'lc:longest-path-with-different-adjacent-characters': {
    notes: 'Topological sort on the DAG (tree); propagate max path length bottom-up.',
    time: 'O(n + edges)', space: 'O(n)'
  },
  'lc:redundant-connection': {
    notes: 'Union-Find: the edge whose union call fails (both nodes already in same component) is redundant.',
    time: 'O(n α(n))', space: 'O(n)'
  },
  'lc:accounts-merge': {
    notes: 'Union-Find: union all emails within each account; group emails by their root representative.',
    time: 'O(n log n)', space: 'O(n)'
  },
  'lc:number-of-operations-to-make-network-connected': {
    notes: 'Need n−1 edges for n nodes. Count components; need (components−1) extra cables.',
    time: 'O(n α(n))', space: 'O(n)'
  },
  'lc:satisfiability-of-equality-equations': {
    notes: 'Union-Find: union all "==" pairs first; then check "!=" pairs for contradictions.',
    time: 'O(n α(n))', space: 'O(26)'
  },
  'lc:most-stones-removed-with-same-row-or-column': {
    notes: 'Union-Find stones sharing a row or column; can remove all but one per component.',
    time: 'O(n α(n))', space: 'O(n)'
  },
  'lc:rotting-oranges': {
    notes: 'Multi-source BFS from all rotten oranges simultaneously; count minutes to reach all fresh oranges.',
    time: 'O(mn)', space: 'O(mn)'
  },
  'lc:01-matrix': {
    notes: 'Multi-source BFS from all 0-cells simultaneously; distance propagates outward.',
    time: 'O(mn)', space: 'O(mn)'
  },
  'lc:pacific-atlantic-water-flow': {
    notes: 'BFS/DFS inland from both ocean borders; find cells reachable from both oceans.',
    time: 'O(mn)', space: 'O(mn)'
  },
  'gfg:distance-of-nearest-cell-having-1-1587115620': {
    notes: 'Multi-source BFS from all 1-cells; propagate distance to all 0-cells.',
    time: 'O(mn)', space: 'O(mn)'
  },
  'lc:shortest-path-in-binary-matrix': {
    notes: '8-directional BFS from (0,0) on 0-cells; shortest path in terms of cell count.',
    time: 'O(n²)', space: 'O(n²)'
  },
  'gfg:nearest-1-in-binary-matrix': {
    notes: 'Multi-source BFS from all 1s simultaneously; spreads distance to all 0s.',
    time: 'O(mn)', space: 'O(mn)'
  },
  'gfg:detect-cycle-in-a-directed-graph': {
    notes: 'DFS with a recursion stack. Cycle exists if a visited node is encountered on the current path.',
    time: 'O(V + E)', space: 'O(V)'
  },
  'gfg:detect-cycle-in-an-undirected-graph': {
    notes: 'DFS/BFS: cycle if a visited neighbor is not the direct parent.',
    time: 'O(V + E)', space: 'O(V)'
  },
  'lc:network-delay-time': {
    notes: 'Dijkstra from source k; max of all shortest distances = answer (−1 if unreachable).',
    time: 'O((V + E) log V)', space: 'O(V + E)'
  },
  'lc:cheapest-flights-within-k-stops': {
    notes: 'Bellman-Ford relaxation for exactly k+1 rounds (using snapshot of previous round).',
    time: 'O(k × E)', space: 'O(V)'
  },
  'lc:path-with-minimum-effort': {
    notes: 'Dijkstra where cost = max absolute height difference along path.',
    time: 'O(mn log(mn))', space: 'O(mn)'
  },
  'lc:find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance': {
    notes: 'Floyd-Warshall all-pairs shortest paths; for each city count reachable cities within threshold.',
    time: 'O(n³)', space: 'O(n²)'
  },
  'gfg:implementing-dijkstra-set-1-adjacency-matrix': {
    notes: 'Dijkstra with a min-heap (dist, node); relax neighbors and push updated distances.',
    time: 'O((V + E) log V)', space: 'O(V + E)'
  },
  'lc:min-cost-to-connect-all-points': {
    notes: "Prim's MST for dense graph: at each step pick the minimum-cost edge to an unvisited node.",
    time: 'O(n²)', space: 'O(n)'
  },
  'gfg:minimum-spanning-tree': {
    notes: "Kruskal's: sort edges by weight; union-find to add edges without forming cycles.",
    time: 'O(E log E)', space: 'O(V)'
  },
  'lc:swim-in-rising-water': {
    notes: 'Dijkstra/binary search: cost to reach (n−1, n−1) = max cell value on the path.',
    time: 'O(n² log n)', space: 'O(n²)'
  },
  'lc:is-graph-bipartite': {
    notes: '2-color BFS/DFS; assign alternating colors; return false if adjacent nodes share a color.',
    time: 'O(V + E)', space: 'O(V)'
  },
  'lc:possible-bipartition': {
    notes: 'Build dislikes graph; check bipartiteness with 2-coloring BFS.',
    time: 'O(V + E)', space: 'O(V)'
  },

  /* ── DP Advanced (Grid / Sequence) ─────────────────────── */
  'lc:unique-paths': {
    notes: 'dp[i][j] = dp[i−1][j] + dp[i][j−1]. Reduce to 1D by rolling the dp array.',
    time: 'O(mn)', space: 'O(n)'
  },
  'lc:unique-paths-ii': {
    notes: 'Same recurrence; set dp[i][j] = 0 for obstacles.',
    time: 'O(mn)', space: 'O(n)'
  },
  'lc:minimum-path-sum': {
    notes: 'dp[i][j] = min(dp[i−1][j], dp[i][j−1]) + grid[i][j].',
    time: 'O(mn)', space: 'O(n)'
  },
  'lc:longest-common-subsequence': {
    notes: 'dp[i][j] = dp[i−1][j−1]+1 if match, else max(dp[i−1][j], dp[i][j−1]).',
    time: 'O(mn)', space: 'O(n)'
  },
  'lc:edit-distance': {
    notes: 'dp[i][j] = min(insert, delete, replace). Replace: dp[i−1][j−1] + (s1[i]!=s2[j] ? 1 : 0).',
    time: 'O(mn)', space: 'O(n)'
  },
  'lc:maximal-square': {
    notes: "dp[i][j] = min(dp[i−1][j], dp[i][j−1], dp[i−1][j−1]) + 1 if cell is '1'.",
    time: 'O(mn)', space: 'O(n)'
  },
  'lc:is-subsequence': {
    notes: 'Two pointers: advance s-pointer when characters match; return s_ptr == len(s).',
    time: 'O(m + n)', space: 'O(1)'
  },
  'lc:longest-palindromic-substring': {
    notes: 'Expand around each center (both odd and even); track the longest expansion.',
    time: 'O(n²)', space: 'O(1)'
  },
  'lc:palindromic-substrings': {
    notes: 'Expand around every center (2n−1 centers); count each valid expansion.',
    time: 'O(n²)', space: 'O(1)'
  },
  'lc:shortest-common-supersequence': {
    notes: 'Build LCS; SCS = merge both strings keeping LCS chars once. Length = m + n − LCS.',
    time: 'O(mn)', space: 'O(mn)'
  },
  'lc:distinct-subsequences': {
    notes: 'dp[i][j] = dp[i−1][j] + (s[i]==t[j] ? dp[i−1][j−1] : 0).',
    time: 'O(mn)', space: 'O(n)'
  },
  'lc:minimum-insertion-steps-to-make-a-string-palindrome': {
    notes: 'Minimum insertions = n − LPS (Longest Palindromic Subsequence). LPS = LCS(s, reverse(s)).',
    time: 'O(n²)', space: 'O(n)'
  },
  'lc:number-of-longest-increasing-subsequence': {
    notes: 'Track both dp[i] (length) and count[i] (count of LIS ending at i). Update count carefully.',
    time: 'O(n²)', space: 'O(n)'
  },
  'lc:longest-arithmetic-subsequence': {
    notes: 'dp[i][diff] = dp[j][diff] + 1 for all j < i with nums[i]−nums[j] = diff.',
    time: 'O(n²)', space: 'O(n × D)'
  },
  'lc:minimum-falling-path-sum': {
    notes: 'dp[i][j] = min(dp[i−1][j−1], dp[i−1][j], dp[i−1][j+1]) + A[i][j].',
    time: 'O(mn)', space: 'O(n)'
  },
  'lc:longest-increasing-path-in-a-matrix': {
    notes: 'DFS with memoization from each cell; only move to strictly larger neighbors.',
    time: 'O(mn)', space: 'O(mn)'
  },
  'lc:dungeon-game': {
    notes: 'Bottom-up DP: min HP needed at (i,j) = max(1, min(dp[i+1][j], dp[i][j+1]) − dungeon[i][j]).',
    time: 'O(mn)', space: 'O(n)'
  },

  /* ── Stock DP ────────────────────────────────────────────── */
  'lc:best-time-to-buy-and-sell-stock': {
    notes: 'Track minPrice seen so far; maxProfit = max(maxProfit, price − minPrice).',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:best-time-to-buy-and-sell-stock-ii': {
    notes: 'Sum all positive consecutive differences (buy every dip, sell every peak).',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:best-time-to-buy-and-sell-stock-iii': {
    notes: 'DP with 4 states: buy1, sell1, buy2, sell2. Update all four on each price.',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:best-time-to-buy-and-sell-stock-iv': {
    notes: 'Generalize III: k transactions. If k ≥ n/2 treat as unlimited. Use 2D DP otherwise.',
    time: 'O(nk)', space: 'O(k)'
  },
  'lc:best-time-to-buy-and-sell-stock-with-cooldown': {
    notes: 'States: held (has stock), sold (cooldown), rest (can buy). Transition each day.',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:best-time-to-buy-and-sell-stock-with-transaction-fee': {
    notes: 'dp[hold] = max(hold, rest − price); dp[rest] = max(rest, hold + price − fee).',
    time: 'O(n)', space: 'O(1)'
  },

  /* ── DP Partition / Interval ─────────────────────────────── */
  'lc:palindrome-partitioning-ii': {
    notes: 'Precompute palindrome table; dp[i] = min cuts for s[0..i]; dp[i] = min(dp[j−1]+1) for palindrome s[j..i].',
    time: 'O(n²)', space: 'O(n²)'
  },
  'lc:largest-sum-of-averages': {
    notes: 'dp[i][k] = max average sum dividing first i elements into k groups. Use prefix sums.',
    time: 'O(n²k)', space: 'O(nk)'
  },
  'lc:minimum-cost-to-cut-a-stick': {
    notes: 'Interval DP: dp[i][j] = min cost to cut all positions between cuts[i] and cuts[j].',
    time: 'O(n³)', space: 'O(n²)'
  },
  'lc:partition-array-for-maximum-sum': {
    notes: 'dp[i] = max(dp[i−k] + k × max(arr[i−k..i−1])) for k = 1..K.',
    time: 'O(nk)', space: 'O(n)'
  },
  'lc:longest-palindromic-subsequence': {
    notes: 'LPS(s) = LCS(s, reverse(s)). Or dp[i][j] = dp[i+1][j−1]+2 if match, else max(dp[i+1][j], dp[i][j−1]).',
    time: 'O(n²)', space: 'O(n)'
  },
  'lc:burst-balloons': {
    notes: 'Interval DP: dp[i][j] = max coins bursting all balloons between i and j with k as the last.',
    time: 'O(n³)', space: 'O(n²)'
  },
  'lc:minimum-score-triangulation-of-polygon': {
    notes: 'Interval DP: dp[i][j] = min score for triangle fan on polygon[i..j].',
    time: 'O(n³)', space: 'O(n²)'
  },
  'lc:guess-number-higher-or-lower-ii': {
    notes: 'Interval DP: cost(i,j) = min over k { k + max(cost(i,k−1), cost(k+1,j)) }.',
    time: 'O(n³)', space: 'O(n²)'
  },
  'lc:strange-printer': {
    notes: 'Interval DP: turns[i][j] = turns[i][j−1] then merge if s[k] == s[j] for k in [i, j−1].',
    time: 'O(n³)', space: 'O(n²)'
  },
  'lc:beautiful-arrangement': {
    notes: 'Bitmask DP: dp[mask] = number of valid arrangements using the positions in mask.',
    time: 'O(n × 2ⁿ)', space: 'O(2ⁿ)'
  },
  'lc:fair-distribution-of-cookies': {
    notes: 'Bitmask backtracking: distribute 2^n subsets across k children; minimize the maximum.',
    time: 'O(k × 3ⁿ)', space: 'O(2ⁿ)'
  },
  'lc:shortest-path-visiting-all-nodes': {
    notes: 'BFS with state (current_node, visited_bitmask). Start from all nodes simultaneously.',
    time: 'O(2ⁿ × n)', space: 'O(2ⁿ × n)'
  },
  'lc:smallest-sufficient-team': {
    notes: 'Bitmask DP over skill coverage. dp[skill_mask] = minimum team covering those skills.',
    time: 'O(n × 2^m)', space: 'O(2^m)'
  },
  'lc:stickers-to-spell-word': {
    notes: 'BFS/DP with bitmask for needed characters; reduce target using each sticker.',
    time: 'O(2^T × S)', space: 'O(2^T)'
  },
  'lc:count-numbers-with-unique-digits': {
    notes: 'Math: for d digits → 9 × 9 × 8 × ... × (11−d). Sum over 1..n.',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:count-sorted-vowel-strings': {
    notes: 'dp[i][v] = strings of length i ending in vowel v. Answer = sum of dp[n][all vowels].',
    time: 'O(n)', space: 'O(n)'
  },
  'lc:number-of-digit-one': {
    notes: 'Digit DP: for each position count how many numbers up to n have a 1 in that position.',
    time: 'O(log n)', space: 'O(1)'
  },
  'lc:count-special-integers': {
    notes: 'Digit DP with tight flag and a used-digit bitmask.',
    time: 'O(log n × 10)', space: 'O(log n)'
  },
  'lc:numbers-at-most-n-given-digit-set': {
    notes: 'Digit DP: count valid numbers with fewer digits, then count valid numbers with same digit count.',
    time: 'O(log n × |D|)', space: 'O(1)'
  },
  'lc:house-robber-iii': {
    notes: 'Tree DP: each node returns (rob_this, skip_this). Parent chooses the better option.',
    time: 'O(n)', space: 'O(h)'
  },
  'lc:binary-tree-cameras': {
    notes: 'Greedy post-order: 3 states per node (uncovered, covered_no_cam, has_cam). Place cameras at leaves\' parents.',
    time: 'O(n)', space: 'O(h)'
  },
  'lc:maximum-product-of-splitted-binary-tree': {
    notes: 'DFS computes subtree sums; for each edge removal, product = subtree_sum × (total − subtree_sum).',
    time: 'O(n)', space: 'O(n)'
  },
  'lc:out-of-boundary-paths': {
    notes: 'dp[steps][i][j] = paths from (i,j) in exactly steps steps that go out. Roll the steps dimension.',
    time: 'O(N × mn)', space: 'O(mn)'
  },
  'lc:word-break-ii': {
    notes: 'Backtracking with memoization: memo[i] = list of all sentences for s[i:].',
    time: 'O(n² + output)', space: 'O(n² + output)'
  },
  'lc:number-of-ways-of-cutting-a-pizza': {
    notes: '3D DP with 2D prefix sum of apples: dp[k][r][c] = ways to cut remaining pizza into k pieces.',
    time: 'O(k × m × n × (m+n))', space: 'O(k × mn)'
  },
  'lc:count-ways-to-build-good-strings': {
    notes: 'dp[i] = number of ways to build a string of length i. Transition: dp[i] += dp[i−zero] + dp[i−one].',
    time: 'O(high)', space: 'O(high)'
  },

  /* ── Sorting Extended ────────────────────────────────────── */
  'lc:largest-number': {
    notes: 'Custom comparator: prefer a+b over b+a. Sort descending by this rule.',
    time: 'O(n log n)', space: 'O(n)'
  },
  'lc:maximum-gap': {
    notes: 'Bucket sort: n−1 buckets spanning [min, max]; max gap must span bucket boundaries.',
    time: 'O(n)', space: 'O(n)'
  },
  'lc:wiggle-sort-ii': {
    notes: 'Find median; place larger-than-median elements at odd indices, smaller at even indices.',
    time: 'O(n) average', space: 'O(n)'
  },
  'lc:top-k-frequent-words': {
    notes: 'Frequency map + min-heap: sort by frequency desc, then alphabetically for ties.',
    time: 'O(n log k)', space: 'O(n)'
  },
  'gfg:merge-sort': {
    notes: 'Divide array into halves; recursively sort; merge sorted halves. Stable sort.',
    time: 'O(n log n)', space: 'O(n)'
  },
  'gfg:quick-sort': {
    notes: 'Partition around pivot; recursively sort left and right partitions.',
    time: 'O(n log n) avg', space: 'O(log n)'
  },
  'gfg:heap-sort': {
    notes: 'Build max-heap; swap root (max) to end; heapify; repeat.',
    time: 'O(n log n)', space: 'O(1)'
  },
  'gfg:counting-sort': {
    notes: 'Count occurrences of each value; reconstruct sorted array from counts.',
    time: 'O(n + k)', space: 'O(k)'
  },

  /* ── Trie ────────────────────────────────────────────────── */
  'lc:implement-trie-prefix-tree': {
    notes: 'TrieNode has children[26] and isEnd flag. Insert, search, and startsWith traverse character by character.',
    time: 'O(m) per op', space: 'O(TOTAL × 26)'
  },
  'lc:add-and-search-word-data-structure': {
    notes: 'Trie with DFS for \'.\' wildcard: branch on all 26 children when encountering a dot.',
    time: 'O(26^m) worst search', space: 'O(TOTAL)'
  },
  'lc:replace-words': {
    notes: 'Build trie of all roots; for each word in the sentence, find shortest matching prefix.',
    time: 'O(sum of lengths)', space: 'O(total root length)'
  },
  'lc:search-suggestions-system': {
    notes: 'Sort products; for each prefix binary search the range and return up to 3 suggestions.',
    time: 'O(n log n + q×log n)', space: 'O(1)'
  },
  'lc:implement-magic-dictionary': {
    notes: 'Trie-based search: allow exactly one mismatch by branching on wrong characters.',
    time: 'O(26^m) worst search', space: 'O(TOTAL)'
  },
  'lc:prefix-and-suffix-search': {
    notes: 'Build trie of (suffix + # + word) for every suffix of each word. Query = search suffix#prefix.',
    time: 'O(W × L²) build / O(L²) query', space: 'O(W × L²)'
  },
  'lc:maximum-xor-of-two-numbers-in-an-array': {
    notes: 'Bitwise trie: for each number, greedily pick the opposite bit at each level.',
    time: 'O(n × 32)', space: 'O(n × 32)'
  },
  'lc:maximum-xor-with-an-element-from-array': {
    notes: 'Sort queries and array; process in order, adding elements ≤ limit to trie; answer each query greedily.',
    time: 'O((n + q) log max)', space: 'O(n × 32)'
  },
  'gfg:count-pairs-with-given-xor': {
    notes: 'Bitwise trie: for each element, count how many previous trie paths give XOR in [L, R].',
    time: 'O(n log max)', space: 'O(n)'
  },

  /* ── Bit Manipulation ────────────────────────────────────── */
  'lc:single-number-iii': {
    notes: 'XOR all → XOR of the two unique numbers. Find a set bit; use it to split numbers into two groups, XOR each.',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:missing-number': {
    notes: 'XOR all indices 0..n with all array values; duplicate XORs cancel, leaving the missing number.',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:xor-queries-of-a-subarray': {
    notes: 'Prefix XOR array; query[l,r] = prefix[r+1] ^ prefix[l].',
    time: 'O(n + q)', space: 'O(n)'
  },
  'lc:maximum-xor-after-operations': {
    notes: 'Answer = OR of all elements (any bit can be set in some element via allowed operations).',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:reverse-bits': {
    notes: 'Swap bit pairs with masks (16-bit swap, 8-bit swap, 4-bit swap, etc.).',
    time: 'O(1)', space: 'O(1)'
  },
  'lc:power-of-two': {
    notes: 'n > 0 and (n & (n−1)) == 0. A power of two has exactly one set bit.',
    time: 'O(1)', space: 'O(1)'
  },
  'lc:binary-number-with-alternating-bits': {
    notes: '(n ^ (n>>1)) should be all 1s: check (n ^ (n>>1)) & ((n^(n>>1))+1) == 0.',
    time: 'O(1)', space: 'O(1)'
  },
  'lc:number-of-steps-to-reduce-a-number-in-binary-representation': {
    notes: 'Simulate: even → right shift (÷2); odd → add 1. Count steps. Or: count bits + carries.',
    time: 'O(log n)', space: 'O(1)'
  },
  'lc:number-of-1-bits': {
    notes: 'Brian Kernighan: n &= (n−1) clears the lowest set bit each iteration; count iterations.',
    time: 'O(k) where k = number of set bits', space: 'O(1)'
  },
  'lc:counting-bits': {
    notes: 'dp[i] = dp[i >> 1] + (i & 1). Pop count of i = pop count of i/2 plus its last bit.',
    time: 'O(n)', space: 'O(n)'
  },
  'lc:bitwise-and-of-numbers-range': {
    notes: 'Right-shift both numbers until equal; the common prefix is the answer.',
    time: 'O(log n)', space: 'O(1)'
  },
  'lc:sum-of-two-integers': {
    notes: 'XOR = sum without carry; AND<<1 = carry. Repeat until carry = 0.',
    time: 'O(1)', space: 'O(1)'
  },
  'lc:minimum-flips-to-make-a-or-b-equal-to-c': {
    notes: 'Check each bit: if c-bit=0, both a-bit and b-bit must be 0 (flip both if needed); if c-bit=1, at least one must be 1.',
    time: 'O(32)', space: 'O(1)'
  },
  'lc:minimum-operations-to-make-binary-array-elements-equal-to-one-i': {
    notes: 'Sliding window XOR flip of size k; flip at each 0 encountered; track flips with a queue.',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:count-number-of-maximum-bitwise-or-subsets': {
    notes: 'Max OR = OR of all elements. Count subsets achieving this max by backtracking or iterating 2^n.',
    time: 'O(2ⁿ)', space: 'O(n)'
  },
  'lc:maximum-product-of-word-lengths': {
    notes: 'Bitmask each word\'s character set; product is valid if bitmasks have no common bits (AND == 0).',
    time: 'O(n²)', space: 'O(n)'
  },
  'lc:maximum-score-words-formed-by-letters': {
    notes: 'Bitmask DP over word selection; check if available letters support the chosen subset.',
    time: 'O(2^n × m)', space: 'O(2^n)'
  },
  'lc:count-complete-tree-nodes': {
    notes: 'Binary search on the last row; use level-order index. Height comparison in O(log n) each.',
    time: 'O(log²n)', space: 'O(log n)'
  },
  'lc:check-if-a-string-contains-all-binary-codes-of-size-k': {
    notes: 'Sliding window of length k; track unique patterns. Need 2^k distinct patterns.',
    time: 'O(n)', space: 'O(2^k)'
  },
  'lc:k-th-symbol-in-grammar': {
    notes: 'Observe parent(k) = parent at ceil(k/2). If k is odd same as parent, if even flipped.',
    time: 'O(log n)', space: 'O(1)'
  },
  'lc:minimum-bit-flips-to-convert-number': {
    notes: 'XOR start and goal; the number of set bits in the result = number of flips needed.',
    time: 'O(1)', space: 'O(1)'
  },
  'lc:smallest-subarrays-with-maximum-bitwise-or': {
    notes: 'For each bit, track the last position where it is set; answer[i] = max last-set-position across all bits ≥ i.',
    time: 'O(n × 30)', space: 'O(n)'
  },
  'lc:largest-number-after-digit-swaps-by-parity': {
    notes: 'Sort odd-indexed digits and even-indexed digits separately (within parity groups).',
    time: 'O(n log n)', space: 'O(n)'
  },
  'lc:total-hamming-distance': {
    notes: 'For each bit position, total pairs = count_of_0s × count_of_1s at that bit.',
    time: 'O(32n)', space: 'O(1)'
  },
  'lc:find-kth-largest-xor-coordinate-value': {
    notes: '2D prefix XOR; XOR(i,j) = XOR of top-left rectangle. Find k-th largest via heap or quickselect.',
    time: 'O(mn log(mn))', space: 'O(mn)'
  },
  'lc:count-triplets-that-can-form-two-arrays-of-equal-xor': {
    notes: 'For each pair (i,j): if XOR(arr[i..j]) = 0, it contributes j−i valid triplets.',
    time: 'O(n²)', space: 'O(n)'
  },

  /* ── Queue ───────────────────────────────────────────────── */
  'lc:implement-queue-using-stacks': {
    notes: 'Two stacks: push to stack1; on dequeue, transfer all to stack2 if empty then pop from stack2.',
    time: 'O(1) amortized', space: 'O(n)'
  },
  'lc:design-circular-queue': {
    notes: 'Array with head, tail pointers and a count. Use modular arithmetic for wrap-around.',
    time: 'O(1) all ops', space: 'O(k)'
  },
  'lc:design-circular-deque': {
    notes: 'Array with front and rear pointers; wrap both ends with modular arithmetic.',
    time: 'O(1) all ops', space: 'O(k)'
  },
  'gfg:first-negative-integer-in-every-window-of-size-k3345': {
    notes: 'Deque storing indices of negative elements; pop front when out of window.',
    time: 'O(n)', space: 'O(k)'
  },

  /* ── Range ───────────────────────────────────────────────── */
  'lc:range-sum-query-mutable': {
    notes: 'Fenwick Tree (BIT) or Segment Tree: O(log n) point updates and prefix sum queries.',
    time: 'O(log n) update/query', space: 'O(n)'
  },
  'gfg:segment-tree': {
    notes: 'Build in O(n); each node stores aggregate of a range. Update and query in O(log n).',
    time: 'O(n) build / O(log n) query', space: 'O(n)'
  },
  'gfg:range-minimum-query': {
    notes: 'Sparse Table: precompute min for all [i, i+2^k) intervals; overlap-friendly query in O(1).',
    time: 'O(n log n) build / O(1) query', space: 'O(n log n)'
  },
  'lc:falling-squares': {
    notes: 'Coordinate compression + segment tree with lazy propagation for max-height range updates.',
    time: 'O(n log n)', space: 'O(n)'
  },
  'lc:reverse-pairs': {
    notes: 'Merge sort: count pairs where nums[i] > 2×nums[j] for i<j during the merge step.',
    time: 'O(n log n)', space: 'O(n)'
  },
  'gfg:binary-indexed-tree-or-fenwick-tree': {
    notes: 'Fenwick Tree: i += (i & -i) to update; i -= (i & -i) to query prefix sum. O(log n) each.',
    time: 'O(log n) per op', space: 'O(n)'
  },
  'lc:count-of-range-sum': {
    notes: 'Merge sort on prefix sums; count pairs (i, j) where prefix[j] − prefix[i] is in [lower, upper].',
    time: 'O(n log n)', space: 'O(n)'
  },
  'gfg:sparse-table': {
    notes: 'Precompute st[i][j] = min/max of 2^j elements starting at i. Query uses overlapping intervals.',
    time: 'O(n log n) build / O(1) query', space: 'O(n log n)'
  },

  /* ── Misc DP ─────────────────────────────────────────────── */
  'lc:n-th-tribonacci-number': {
    notes: 'dp[i] = dp[i−1] + dp[i−2] + dp[i−3]. Space-optimize to 3 variables.',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:delete-and-earn': {
    notes: 'Convert to House Robber: earn[v] = v × count(v). dp[i] = max(dp[i−2] + earn[i], dp[i−1]).',
    time: 'O(max_val)', space: 'O(max_val)'
  },
  'lc:paint-house': {
    notes: 'dp[i][c] = cost to paint house i with color c = costs[i][c] + min(dp[i−1][other colors]).',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:minimum-cost-for-tickets': {
    notes: 'dp[i] = min cost to cover all travel days up to day i. Travel day: consider 1/7/30-day passes.',
    time: 'O(365)', space: 'O(365)'
  },
  'lc:count-vowels-permutation': {
    notes: 'Track count per ending vowel; each vowel has fixed transition rules. dp[i] = sum of valid predecessors.',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:integer-break': {
    notes: 'dp[i] = max(j × (i−j), j × dp[i−j]) for j in [2, i−1]. Key insight: only factors of 2 and 3.',
    time: 'O(n²)', space: 'O(n)'
  },
  'lc:stone-game': {
    notes: 'Player 1 always wins (proof by parity). Or dp[i][j] = max score advantage for current player on piles[i..j].',
    time: 'O(1) math / O(n²) DP', space: 'O(1) / O(n²)'
  },
  'lc:combination-sum-iv': {
    notes: 'dp[target] = sum of dp[target − num] for each num. Order matters (permutation count).',
    time: 'O(target × n)', space: 'O(target)'
  },
  'lc:perfect-squares': {
    notes: 'dp[i] = min(dp[i − j²] + 1) for j where j² ≤ i. BFS by level also works.',
    time: 'O(n√n)', space: 'O(n)'
  },
  'lc:triangle': {
    notes: 'Bottom-up DP: dp[j] = min(dp[j], dp[j+1]) + triangle[i][j] for each row from bottom.',
    time: 'O(n²)', space: 'O(n)'
  },
  'lc:maximum-alternating-subsequence-sum': {
    notes: 'Greedy or DP: even = max(even, odd + nums[i]); odd = max(odd, even − nums[i]).',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:interleaving-string': {
    notes: 'dp[i][j] = can s1[0..i−1] and s2[0..j−1] interleave to form s3[0..i+j−1].',
    time: 'O(mn)', space: 'O(n)'
  },
  'lc:regular-expression-matching': {
    notes: 'dp[i][j] = s[0..i−1] matches p[0..j−1]. Handle \'.\' and \'*\' carefully.',
    time: 'O(mn)', space: 'O(mn)'
  },
  'lc:fibonacci-number': {
    notes: 'F(n) = F(n−1) + F(n−2). Space-optimize to two variables.',
    time: 'O(n)', space: 'O(1)'
  },
  'lc:last-stone-weight': {
    notes: 'Max-heap: repeatedly smash the two heaviest stones; push remainder if non-zero.',
    time: 'O(n log n)', space: 'O(n)'
  },
  'lc:number-of-paths-with-max-score': {
    notes: 'DP bottom-right to top-left tracking max score and path count simultaneously.',
    time: 'O(n²)', space: 'O(n²)'
  },
  'lc:minimum-falling-path-sum-ii': {
    notes: 'For each row only need the min and 2nd-min of the previous row to avoid the same column.',
    time: 'O(n²)', space: 'O(1)'
  },
  'lc:cherry-pickup-ii': {
    notes: '3D DP (row, col1, col2): two robots move simultaneously. dp[r][c1][c2] = max cherries.',
    time: 'O(n × m²)', space: 'O(m²)'
  },
  'lc:partition-to-k-equal-sum-subsets': {
    notes: 'Backtracking with bitmask memoization: try placing each number into one of k buckets.',
    time: 'O(k × 2ⁿ)', space: 'O(2ⁿ)'
  },
  'lc:matchsticks-to-square': {
    notes: 'Backtracking: try fitting each matchstick into 4 sides of equal length.',
    time: 'O(4^n)', space: 'O(n)'
  },
  'lc:jump-game-iii': {
    notes: 'BFS/DFS from start; can jump to i + arr[i] or i − arr[i]; check if any index with value 0 is reachable.',
    time: 'O(n)', space: 'O(n)'
  }
};
