const QUESTION_BANK = {
  "tiers": [
    {
      "id": 1,
      "title": "Tier 1 - Do these first, no compromise",
      "note": "(Every company, every round - OA + interview)"
    },
    {
      "id": 2,
      "title": "Tier 2 - Finish before your first OA",
      "note": "(Wells Fargo, Fidelity, Amazon all test these)"
    },
    {
      "id": 3,
      "title": "Tier 3 - Finish before your technical interviews",
      "note": "(Amazon, product companies, and good BFSI rounds)"
    },
    {
      "id": 4,
      "title": "Tier 4 - Only if you have extra time",
      "note": "(FAANG full-time, not internship level)"
    }
  ],
  "prioritySections": [
    {
      "id": "arrays",
      "label": "Arrays",
      "tier": 1,
      "cards": [
        {
          "id": "bs-index",
          "title": "Binary search — on index",
          "color": "#378ADD",
          "sections": [
            {
              "label": "Basics",
              "questions": [
                {
                  "id": "lc:binary-search"
                },
                {
                  "id": "lc:search-insert-position"
                },
                {
                  "id": "lc:find-first-and-last-position-of-element-in-sorted-array"
                },
                {
                  "id": "lc:find-peak-element"
                },
                {
                  "id": "lc:single-element-in-a-sorted-array"
                },
                {
                  "id": "gfg:floor-in-a-sorted-array-1587115620",
                  "add": true
                },
                {
                  "id": "gfg:number-of-occurrence2259",
                  "add": true
                }
              ]
            },
            {
              "label": "Rotated arrays",
              "questions": [
                {
                  "id": "lc:search-in-rotated-sorted-array"
                },
                {
                  "id": "lc:search-in-rotated-sorted-array-ii"
                },
                {
                  "id": "lc:find-minimum-in-rotated-sorted-array"
                },
                {
                  "id": "lc:find-minimum-in-rotated-sorted-array-ii",
                  "add": true
                }
              ]
            },
            {
              "label": "Matrix / 2D",
              "questions": [
                {
                  "id": "lc:search-a-2d-matrix"
                },
                {
                  "id": "lc:search-a-2d-matrix-ii"
                }
              ]
            },
            {
              "label": "Advanced",
              "questions": [
                {
                  "id": "lc:median-of-two-sorted-arrays"
                }
              ]
            }
          ]
        },
        {
          "id": "bs-answer",
          "title": "Binary search — on answer",
          "color": "#1D9E75",
          "sections": [
            {
              "label": "Math / Basics",
              "questions": [
                {
                  "id": "lc:sqrtx"
                },
                {
                  "id": "gfg:find-nth-root-of-m5843"
                }
              ]
            },
            {
              "label": "Capacity / Rate",
              "questions": [
                {
                  "id": "lc:koko-eating-bananas"
                },
                {
                  "id": "lc:capacity-to-ship-packages-within-d-days"
                },
                {
                  "id": "lc:minimum-number-of-days-to-make-m-bouquets"
                },
                {
                  "id": "lc:find-the-smallest-divisor-given-a-threshold"
                }
              ]
            },
            {
              "label": "Time / Speed",
              "questions": [
                {
                  "id": "lc:minimum-time-to-complete-trips"
                },
                {
                  "id": "lc:minimum-speed-to-arrive-on-time"
                }
              ]
            },
            {
              "label": "Allocation / Partition",
              "questions": [
                {
                  "id": "lc:split-array-largest-sum"
                },
                {
                  "id": "gfg:allocate-minimum-number-of-pages0937"
                },
                {
                  "id": "gfg:the-painters-partition-problem1535"
                },
                {
                  "id": "lc:minimize-maximum-of-array",
                  "add": true
                }
              ]
            },
            {
              "label": "Distance / Placement",
              "questions": [
                {
                  "id": "gfg:aggressive-cows"
                },
                {
                  "id": "lc:magnetic-force-between-two-balls"
                }
              ]
            },
            {
              "label": "Search space (values)",
              "questions": [
                {
                  "id": "lc:kth-smallest-element-in-a-sorted-matrix"
                },
                {
                  "id": "lc:kth-missing-positive-number"
                },
                {
                  "id": "lc:find-k-th-smallest-pair-distance"
                },
                {
                  "id": "gfg:median-in-a-row-wise-sorted-matrix1527",
                  "add": true
                }
              ]
            }
          ]
        },
        {
          "id": "kadane",
          "title": "Kadane's / Subarray",
          "color": "#D85A30",
          "sections": [
            {
              "label": "Max subarray sum (Kadane core)",
              "questions": [
                {
                  "id": "lc:maximum-subarray"
                },
                {
                  "id": "lc:maximum-sum-circular-subarray"
                },
                {
                  "id": "lc:maximum-absolute-sum-of-any-subarray"
                },
                {
                  "id": "lc:maximum-subarray-sum-after-one-operation",
                  "add": true
                }
              ]
            },
            {
              "label": "Max product subarray",
              "questions": [
                {
                  "id": "lc:maximum-product-subarray"
                }
              ]
            },
            {
              "label": "Subarray with given sum",
              "questions": [
                {
                  "id": "lc:subarray-sum-equals-k"
                },
                {
                  "id": "lc:continuous-subarray-sum"
                },
                {
                  "id": "lc:subarray-sums-divisible-by-k"
                },
                {
                  "id": "lc:binary-subarrays-with-sum"
                },
                {
                  "id": "lc:number-of-subarrays-with-bounded-maximum",
                  "add": true
                }
              ]
            },
            {
              "label": "Subarray with given XOR",
              "questions": [
                {
                  "id": "gfg:subarray-with-given-xor"
                },
                {
                  "id": "gfg:count-subarrays-with-given-xor"
                }
              ]
            },
            {
              "label": "Advanced",
              "questions": [
                {
                  "id": "gfg:longest-sub-array-with-sum-k0809"
                },
                {
                  "id": "gfg:largest-subarray-with-0-sum"
                },
                {
                  "id": "lc:maximum-size-subarray-sum-equals-k"
                }
              ]
            }
          ]
        },
        {
          "id": "prefix",
          "title": "Prefix based",
          "color": "#7F77DD",
          "sections": [
            {
              "label": "1D prefix sum",
              "questions": [
                {
                  "id": "lc:range-sum-query-immutable"
                },
                {
                  "id": "lc:subarray-sum-equals-k"
                },
                {
                  "id": "lc:continuous-subarray-sum"
                },
                {
                  "id": "lc:subarray-sums-divisible-by-k"
                },
                {
                  "id": "lc:maximum-size-subarray-sum-equals-k"
                },
                {
                  "id": "lc:count-number-of-nice-subarrays"
                },
                {
                  "id": "lc:product-of-array-except-self",
                  "add": true
                }
              ]
            },
            {
              "label": "Prefix XOR",
              "questions": [
                {
                  "id": "gfg:subarray-with-given-xor"
                },
                {
                  "id": "gfg:count-subarrays-with-given-xor"
                },
                {
                  "id": "lc:single-number"
                },
                {
                  "id": "lc:single-number-ii"
                },
                {
                  "id": "gfg:find-xor-of-numbers-from-l-to-r",
                  "add": true
                }
              ]
            },
            {
              "label": "2D prefix sum",
              "questions": [
                {
                  "id": "lc:range-sum-query-2d-immutable"
                },
                {
                  "id": "lc:matrix-block-sum"
                },
                {
                  "id": "lc:number-of-submatrices-that-sum-to-target"
                },
                {
                  "id": "lc:max-sum-of-rectangle-no-larger-than-k"
                }
              ]
            }
          ]
        },
        {
          "id": "sliding",
          "title": "Sliding window",
          "color": "#BA7517",
          "sections": [
            {
              "label": "Fixed size window",
              "questions": [
                {
                  "id": "lc:maximum-average-subarray-i"
                },
                {
                  "id": "gfg:max-sum-subarray-of-size-k5313"
                },
                {
                  "id": "lc:find-all-anagrams-in-a-string"
                },
                {
                  "id": "lc:permutation-in-string"
                }
              ]
            },
            {
              "label": "Variable size (expand–shrink)",
              "questions": [
                {
                  "id": "lc:longest-substring-without-repeating-characters"
                },
                {
                  "id": "lc:longest-repeating-character-replacement"
                },
                {
                  "id": "lc:minimum-window-substring"
                },
                {
                  "id": "lc:fruit-into-baskets"
                },
                {
                  "id": "gfg:longest-sub-array-with-sum-k0809"
                },
                {
                  "id": "lc:max-consecutive-ones-iii",
                  "add": true
                },
                {
                  "id": "lc:subarrays-with-k-different-integers",
                  "add": true
                }
              ]
            },
            {
              "label": "Monotonic window (deque)",
              "questions": [
                {
                  "id": "lc:sliding-window-maximum"
                },
                {
                  "id": "gfg:minimum-of-all-subarrays-of-size-k3101"
                },
                {
                  "id": "lc:constrained-subsequence-sum"
                },
                {
                  "id": "lc:jump-game-vi",
                  "add": true
                }
              ]
            }
          ]
        },
        {
          "id": "twoptr",
          "title": "Two pointer",
          "color": "#639922",
          "sections": [
            {
              "label": "Opposite ends (left + right)",
              "questions": [
                {
                  "id": "lc:two-sum-ii-input-array-is-sorted"
                },
                {
                  "id": "lc:valid-palindrome"
                },
                {
                  "id": "lc:container-with-most-water"
                },
                {
                  "id": "lc:trapping-rain-water"
                },
                {
                  "id": "lc:3sum"
                },
                {
                  "id": "lc:4sum"
                },
                {
                  "id": "lc:squares-of-a-sorted-array",
                  "add": true
                }
              ]
            },
            {
              "label": "Same direction (fast & slow)",
              "questions": [
                {
                  "id": "lc:remove-duplicates-from-sorted-array"
                },
                {
                  "id": "lc:remove-element"
                },
                {
                  "id": "lc:move-zeroes"
                },
                {
                  "id": "lc:longest-substring-without-repeating-characters"
                },
                {
                  "id": "lc:linked-list-cycle"
                },
                {
                  "id": "lc:middle-of-the-linked-list"
                },
                {
                  "id": "lc:merge-sorted-array",
                  "add": true
                }
              ]
            },
            {
              "label": "Partition / Dutch national flag",
              "questions": [
                {
                  "id": "lc:sort-colors"
                },
                {
                  "id": "lc:partition-array-according-to-given-pivot"
                },
                {
                  "id": "lc:wiggle-sort"
                },
                {
                  "id": "gfg:three-way-partitioning",
                  "add": true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "hash-map",
      "label": "Hash Map",
      "tier": 1,
      "cards": [
        {
          "id": "hm",
          "title": "Hash Map",
          "color": "#3b82f6",
          "sections": [
            {
              "label": "Index mapping (classic)",
              "questions": [
                {
                  "id": "lc:two-sum"
                },
                {
                  "id": "lc:subarray-sum-equals-k"
                },
                {
                  "id": "lc:contains-duplicate-ii"
                },
                {
                  "id": "lc:longest-consecutive-sequence"
                }
              ]
            },
            {
              "label": "Grouping pattern",
              "questions": [
                {
                  "id": "lc:group-anagrams"
                },
                {
                  "id": "lc:top-k-frequent-elements",
                  "add": true
                },
                {
                  "id": "lc:sort-characters-by-frequency",
                  "add": true
                },
                {
                  "id": "lc:first-unique-character-in-a-string",
                  "add": true
                }
              ]
            },
            {
              "label": "Set based",
              "questions": [
                {
                  "id": "lc:contains-duplicate"
                },
                {
                  "id": "lc:intersection-of-two-arrays",
                  "add": true
                },
                {
                  "id": "lc:happy-number"
                },
                {
                  "id": "lc:isomorphic-strings",
                  "add": true
                },
                {
                  "id": "gfg:pattern-searching5231",
                  "add": true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "strings",
      "label": "Strings",
      "tier": 1,
      "cards": [
        {
          "id": "str",
          "title": "Strings",
          "color": "#d946ef",
          "sections": [
            {
              "label": "Sliding window",
              "questions": [
                {
                  "id": "lc:longest-substring-without-repeating-characters"
                },
                {
                  "id": "lc:minimum-window-substring"
                },
                {
                  "id": "lc:longest-substring-with-at-most-k-distinct-characters",
                  "add": true
                },
                {
                  "id": "lc:permutation-in-string"
                },
                {
                  "id": "lc:find-all-anagrams-in-a-string"
                }
              ]
            },
            {
              "label": "Two pointers on strings",
              "questions": [
                {
                  "id": "lc:valid-palindrome"
                },
                {
                  "id": "lc:valid-palindrome-ii",
                  "add": true
                },
                {
                  "id": "lc:reverse-words-in-a-string",
                  "add": true
                },
                {
                  "id": "lc:reverse-string",
                  "add": true
                }
              ]
            },
            {
              "label": "Pattern matching (KMP / Z / Rabin-Karp)",
              "questions": [
                {
                  "id": "lc:find-the-index-of-the-first-occurrence-in-a-string"
                },
                {
                  "id": "lc:repeated-substring-pattern",
                  "add": true
                },
                {
                  "id": "lc:longest-happy-prefix",
                  "add": true
                },
                {
                  "id": "lc:repeated-dna-sequences"
                },
                {
                  "id": "gfg:z-function",
                  "add": true
                }
              ]
            },
            {
              "label": "Frequency & lookup based",
              "questions": [
                {
                  "id": "lc:valid-anagram"
                },
                {
                  "id": "lc:group-anagrams"
                },
                {
                  "id": "lc:ransom-note"
                },
                {
                  "id": "lc:longest-palindrome",
                  "add": true
                },
                {
                  "id": "lc:count-and-say"
                }
              ]
            },
            {
              "label": "String compression & manipulation",
              "questions": [
                {
                  "id": "lc:string-compression",
                  "add": true
                },
                {
                  "id": "lc:longest-common-prefix"
                },
                {
                  "id": "lc:decode-string",
                  "add": true
                },
                {
                  "id": "lc:multiply-strings",
                  "add": true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "linked-list",
      "label": "Linked List",
      "tier": 1,
      "cards": [
        {
          "id": "ll",
          "title": "Linked List",
          "color": "#eab308",
          "sections": [
            {
              "label": "Fast-slow pointer / cycle detection",
              "questions": [
                {
                  "id": "lc:linked-list-cycle"
                },
                {
                  "id": "lc:linked-list-cycle-ii",
                  "add": true
                },
                {
                  "id": "lc:middle-of-the-linked-list"
                },
                {
                  "id": "lc:happy-number"
                },
                {
                  "id": "lc:find-the-duplicate-number"
                }
              ]
            },
            {
              "label": "Reversal",
              "questions": [
                {
                  "id": "lc:reverse-linked-list",
                  "add": true
                },
                {
                  "id": "lc:reverse-linked-list-ii",
                  "add": true
                },
                {
                  "id": "lc:reverse-nodes-in-k-group",
                  "add": true
                },
                {
                  "id": "lc:palindrome-linked-list"
                },
                {
                  "id": "lc:swap-nodes-in-pairs",
                  "add": true
                }
              ]
            },
            {
              "label": "Merge & rearrange",
              "questions": [
                {
                  "id": "lc:merge-two-sorted-lists",
                  "add": true
                },
                {
                  "id": "lc:merge-k-sorted-lists",
                  "add": true
                },
                {
                  "id": "lc:sort-list"
                },
                {
                  "id": "lc:reorder-list",
                  "add": true
                },
                {
                  "id": "lc:add-two-numbers",
                  "add": true
                },
                {
                  "id": "lc:remove-nth-node-from-end-of-list",
                  "add": true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "stack",
      "label": "Stack",
      "tier": 1,
      "cards": [
        {
          "id": "stk",
          "title": "Stack",
          "color": "#14b8a6",
          "sections": [
            {
              "label": "Beginner stack",
              "questions": [
                {
                  "id": "lc:valid-parentheses",
                  "add": true
                },
                {
                  "id": "lc:baseball-game",
                  "add": true
                },
                {
                  "id": "lc:backspace-string-compare",
                  "add": true
                },
                {
                  "id": "lc:remove-all-adjacent-duplicates-in-string",
                  "add": true
                },
                {
                  "id": "lc:make-the-string-great",
                  "add": true
                }
              ]
            },
            {
              "label": "Easy monotonic stack",
              "questions": [
                {
                  "id": "lc:next-greater-element-i"
                },
                {
                  "id": "lc:daily-temperatures"
                },
                {
                  "id": "lc:final-prices-with-a-special-discount-in-a-shop",
                  "add": true
                },
                {
                  "id": "lc:buildings-with-an-ocean-view",
                  "add": true
                },
                {
                  "id": "lc:next-greater-element-ii",
                  "add": true
                }
              ]
            },
            {
              "label": "Medium monotonic stack",
              "questions": [
                {
                  "id": "lc:online-stock-span",
                  "add": true
                },
                {
                  "id": "lc:remove-k-digits",
                  "add": true
                },
                {
                  "id": "lc:asteroid-collision",
                  "add": true
                },
                {
                  "id": "lc:sum-of-subarray-minimums",
                  "add": true
                },
                {
                  "id": "lc:maximum-width-ramp",
                  "add": true
                },
                {
                  "id": "lc:number-of-visible-people-in-a-queue",
                  "add": true
                }
              ]
            },
            {
              "label": "Previous variants / span",
              "questions": [
                {
                  "id": "gfg:stock-span-problem-1587115621",
                  "add": true
                },
                {
                  "id": "gfg:next-smaller-element",
                  "add": true
                }
              ]
            },
            {
              "label": "Min/Max stack",
              "questions": [
                {
                  "id": "lc:min-stack",
                  "add": true
                }
              ]
            },
            {
              "label": "Expression handling",
              "questions": [
                {
                  "id": "lc:evaluate-reverse-polish-notation"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "trees",
      "label": "Trees",
      "tier": 2,
      "cards": [
        {
          "id": "tree",
          "title": "Trees",
          "color": "#ef4444",
          "sections": [
            {
              "label": "DFS — pre / in / post order",
              "questions": [
                {
                  "id": "lc:binary-tree-inorder-traversal"
                },
                {
                  "id": "lc:binary-tree-preorder-traversal",
                  "add": true
                },
                {
                  "id": "lc:binary-tree-postorder-traversal"
                },
                {
                  "id": "lc:same-tree"
                },
                {
                  "id": "lc:symmetric-tree"
                },
                {
                  "id": "lc:flatten-binary-tree-to-linked-list"
                }
              ]
            },
            {
              "label": "BFS — level order / zigzag / right view",
              "questions": [
                {
                  "id": "lc:binary-tree-level-order-traversal"
                },
                {
                  "id": "lc:binary-tree-right-side-view"
                },
                {
                  "id": "lc:binary-tree-zigzag-level-order-traversal",
                  "add": true
                },
                {
                  "id": "lc:maximum-width-of-binary-tree"
                },
                {
                  "id": "lc:vertical-order-traversal-of-a-binary-tree",
                  "add": true
                }
              ]
            },
            {
              "label": "Recursion — top-down / bottom-up",
              "questions": [
                {
                  "id": "lc:maximum-depth-of-binary-tree"
                },
                {
                  "id": "lc:balanced-binary-tree"
                },
                {
                  "id": "lc:invert-binary-tree"
                },
                {
                  "id": "lc:lowest-common-ancestor-of-a-binary-tree"
                },
                {
                  "id": "lc:count-good-nodes-in-binary-tree"
                },
                {
                  "id": "lc:subtree-of-another-tree"
                }
              ]
            },
            {
              "label": "Path based — max path / diameter",
              "questions": [
                {
                  "id": "lc:binary-tree-maximum-path-sum",
                  "add": true
                },
                {
                  "id": "lc:diameter-of-binary-tree"
                },
                {
                  "id": "lc:path-sum-ii"
                },
                {
                  "id": "lc:sum-root-to-leaf-numbers",
                  "add": true
                },
                {
                  "id": "lc:pseudo-palindromic-paths-in-a-binary-tree",
                  "add": true
                }
              ]
            },
            {
              "label": "BST",
              "questions": [
                {
                  "id": "lc:validate-binary-search-tree"
                },
                {
                  "id": "lc:kth-smallest-element-in-a-bst"
                },
                {
                  "id": "lc:insert-into-a-binary-search-tree"
                },
                {
                  "id": "lc:delete-node-in-a-bst",
                  "add": true
                },
                {
                  "id": "lc:lowest-common-ancestor-of-a-binary-search-tree"
                },
                {
                  "id": "lc:convert-sorted-array-to-binary-search-tree"
                },
                {
                  "id": "lc:balance-a-binary-search-tree"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "recursion",
      "label": "Recursion & Backtracking",
      "tier": 2,
      "cards": [
        {
          "id": "bt",
          "title": "Recursion & Backtracking",
          "color": "#8b5cf6",
          "sections": [
            {
              "label": "Subsets / power set",
              "questions": [
                {
                  "id": "lc:subsets"
                },
                {
                  "id": "lc:subsets-ii"
                },
                {
                  "id": "lc:letter-case-permutation",
                  "add": true
                }
              ]
            },
            {
              "label": "Permutations & combinations",
              "questions": [
                {
                  "id": "lc:permutations"
                },
                {
                  "id": "lc:permutations-ii",
                  "add": true
                },
                {
                  "id": "lc:combinations",
                  "add": true
                },
                {
                  "id": "lc:combination-sum"
                },
                {
                  "id": "lc:combination-sum-ii",
                  "add": true
                },
                {
                  "id": "lc:combination-sum-iii"
                }
              ]
            },
            {
              "label": "Grid & word backtracking",
              "questions": [
                {
                  "id": "lc:word-search"
                },
                {
                  "id": "lc:word-search-ii",
                  "add": true
                },
                {
                  "id": "lc:n-queens",
                  "add": true
                },
                {
                  "id": "lc:sudoku-solver",
                  "add": true
                },
                {
                  "id": "gfg:rat-in-a-maze-problem",
                  "add": true
                }
              ]
            },
            {
              "label": "Partition & special patterns",
              "questions": [
                {
                  "id": "lc:palindrome-partitioning",
                  "add": true
                },
                {
                  "id": "lc:restore-ip-addresses",
                  "add": true
                },
                {
                  "id": "lc:generate-parentheses"
                },
                {
                  "id": "lc:letter-combinations-of-a-phone-number",
                  "add": true
                }
              ]
            },
            {
              "label": "Divide & conquer",
              "questions": [
                {
                  "id": "lc:sort-an-array",
                  "add": true
                },
                {
                  "id": "lc:kth-largest-element-in-an-array"
                },
                {
                  "id": "gfg:inversion-of-array-1587115620",
                  "add": true
                },
                {
                  "id": "lc:median-of-two-sorted-arrays"
                },
                {
                  "id": "lc:count-of-smaller-numbers-after-self",
                  "add": true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "dp-basic",
      "label": "DP - 1D + Knapsack only",
      "tier": 2,
      "cards": [
        {
          "id": "c1d",
          "title": "1D DP",
          "color": "#378ADD",
          "sections": [
            {
              "label": "",
              "questions": [
                {
                  "id": "lc:climbing-stairs",
                  "initialStatus": "mastered"
                },
                {
                  "id": "lc:min-cost-climbing-stairs",
                  "initialStatus": "mastered"
                },
                {
                  "id": "lc:house-robber",
                  "initialStatus": "mastered"
                },
                {
                  "id": "lc:house-robber-ii",
                  "initialStatus": "mastered"
                },
                {
                  "id": "lc:maximum-subarray",
                  "initialStatus": "mastered"
                },
                {
                  "id": "lc:maximum-product-subarray",
                  "initialStatus": "mastered"
                },
                {
                  "id": "lc:decode-ways",
                  "add": true
                },
                {
                  "id": "lc:word-break",
                  "add": true
                },
                {
                  "id": "lc:longest-increasing-subsequence",
                  "add": true
                }
              ]
            }
          ],
          "group": "Core"
        },
        {
          "id": "pknap",
          "title": "Knapsack",
          "color": "#D85A30",
          "sections": [
            {
              "label": "",
              "questions": [
                {
                  "id": "lc:coin-change",
                  "initialStatus": "mastered"
                },
                {
                  "id": "lc:target-sum",
                  "initialStatus": "mastered"
                },
                {
                  "id": "lc:partition-equal-subset-sum",
                  "add": true
                },
                {
                  "id": "lc:coin-change-ii",
                  "add": true
                },
                {
                  "id": "lc:ones-and-zeroes",
                  "add": true
                },
                {
                  "id": "lc:last-stone-weight-ii",
                  "add": true
                },
                {
                  "id": "lc:length-of-the-longest-subsequence-that-sums-to-target",
                  "add": true
                }
              ]
            }
          ],
          "group": "Pattern Types"
        }
      ]
    },
    {
      "id": "greedy",
      "label": "Greedy - Intervals + Jump Game",
      "tier": 2,
      "cards": [
        {
          "id": "grd",
          "title": "Greedy",
          "color": "#d946ef",
          "sections": [
            {
              "label": "Interval greedy",
              "questions": [
                {
                  "id": "lc:merge-intervals"
                },
                {
                  "id": "lc:non-overlapping-intervals",
                  "add": true
                },
                {
                  "id": "lc:insert-interval",
                  "add": true
                },
                {
                  "id": "lc:minimum-number-of-arrows-to-burst-balloons",
                  "add": true
                },
                {
                  "id": "gfg:n-meetings-in-one-room-1587115620",
                  "add": true
                }
              ]
            },
            {
              "label": "Jump game pattern",
              "questions": [
                {
                  "id": "lc:jump-game",
                  "add": true
                },
                {
                  "id": "lc:jump-game-ii",
                  "add": true
                },
                {
                  "id": "lc:jump-game-vii",
                  "add": true
                }
              ]
            },
            {
              "label": "Scheduling",
              "questions": [
                {
                  "id": "gfg:activity-selection-1587115620",
                  "add": true
                },
                {
                  "id": "gfg:job-sequencing-problem-1587115620",
                  "add": true
                },
                {
                  "id": "lc:task-scheduler"
                },
                {
                  "id": "gfg:minimum-number-of-platforms-required-for-a-railway-station-1587115620",
                  "add": true
                }
              ]
            },
            {
              "label": "Resource allocation",
              "questions": [
                {
                  "id": "lc:assign-cookies"
                },
                {
                  "id": "lc:candy",
                  "add": true
                },
                {
                  "id": "lc:gas-station",
                  "add": true
                },
                {
                  "id": "lc:boats-to-save-people",
                  "add": true
                },
                {
                  "id": "lc:lemonade-change"
                }
              ]
            },
            {
              "label": "Huffman / merge cost",
              "questions": [
                {
                  "id": "gfg:minimum-cost-of-ropes-1587115620",
                  "add": true
                },
                {
                  "id": "lc:minimum-cost-to-connect-sticks",
                  "add": true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "heap",
      "label": "Heap",
      "tier": 3,
      "cards": [
        {
          "id": "heap",
          "title": "Heap",
          "color": "#10b981",
          "sections": [
            {
              "label": "Top K / Kth element / K closest",
              "questions": [
                {
                  "id": "lc:kth-largest-element-in-an-array"
                },
                {
                  "id": "lc:top-k-frequent-elements",
                  "add": true
                },
                {
                  "id": "lc:k-closest-points-to-origin"
                },
                {
                  "id": "lc:kth-largest-element-in-a-stream"
                },
                {
                  "id": "lc:find-k-pairs-with-smallest-sums",
                  "add": true
                }
              ]
            },
            {
              "label": "K-way merge",
              "questions": [
                {
                  "id": "lc:merge-k-sorted-lists",
                  "add": true
                },
                {
                  "id": "lc:kth-smallest-element-in-a-sorted-matrix"
                },
                {
                  "id": "lc:smallest-range-covering-elements-from-k-lists",
                  "add": true
                }
              ]
            },
            {
              "label": "Greedy + heap (scheduling)",
              "questions": [
                {
                  "id": "lc:task-scheduler"
                },
                {
                  "id": "lc:reorganize-string",
                  "add": true
                },
                {
                  "id": "lc:minimum-cost-to-connect-sticks",
                  "add": true
                },
                {
                  "id": "lc:ipo",
                  "add": true
                },
                {
                  "id": "gfg:huffman-encoding3345",
                  "add": true
                }
              ]
            },
            {
              "label": "Running median",
              "questions": [
                {
                  "id": "lc:find-median-from-data-stream",
                  "add": true
                },
                {
                  "id": "lc:sliding-window-median",
                  "add": true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "graphs",
      "label": "Graphs - BFS/DFS + Topo sort + DSU",
      "tier": 3,
      "cards": [
        {
          "id": "grph",
          "title": "Graphs",
          "color": "#8b4513",
          "sections": [
            {
              "label": "BFS / DFS — basics",
              "questions": [
                {
                  "id": "lc:number-of-islands"
                },
                {
                  "id": "lc:flood-fill"
                },
                {
                  "id": "lc:clone-graph"
                },
                {
                  "id": "lc:number-of-provinces",
                  "add": true
                },
                {
                  "id": "lc:max-area-of-island"
                }
              ]
            },
            {
              "label": "Topological sort",
              "questions": [
                {
                  "id": "lc:course-schedule",
                  "add": true
                },
                {
                  "id": "lc:course-schedule-ii",
                  "add": true
                },
                {
                  "id": "lc:find-eventual-safe-states",
                  "add": true
                },
                {
                  "id": "gfg:alien-dictionary",
                  "add": true
                },
                {
                  "id": "lc:longest-path-with-different-adjacent-characters",
                  "add": true
                }
              ]
            },
            {
              "label": "Union-Find / DSU",
              "questions": [
                {
                  "id": "lc:redundant-connection",
                  "add": true
                },
                {
                  "id": "lc:accounts-merge",
                  "add": true
                },
                {
                  "id": "lc:number-of-operations-to-make-network-connected",
                  "add": true
                },
                {
                  "id": "lc:satisfiability-of-equality-equations",
                  "add": true
                },
                {
                  "id": "lc:most-stones-removed-with-same-row-or-column",
                  "add": true
                }
              ]
            },
            {
              "label": "Multi-source BFS / 0-1 BFS",
              "questions": [
                {
                  "id": "lc:rotting-oranges"
                },
                {
                  "id": "lc:01-matrix",
                  "add": true
                },
                {
                  "id": "lc:pacific-atlantic-water-flow"
                },
                {
                  "id": "gfg:distance-of-nearest-cell-having-1-1587115620",
                  "add": true
                },
                {
                  "id": "lc:shortest-path-in-binary-matrix",
                  "add": true
                },
                {
                  "id": "gfg:nearest-1-in-binary-matrix",
                  "add": true
                }
              ]
            },
            {
              "label": "Cycle detection",
              "questions": [
                {
                  "id": "gfg:detect-cycle-in-a-directed-graph",
                  "add": true
                },
                {
                  "id": "gfg:detect-cycle-in-an-undirected-graph",
                  "add": true
                },
                {
                  "id": "lc:redundant-connection",
                  "add": true
                }
              ]
            },
            {
              "label": "Shortest path — Dijkstra / Bellman-Ford / Floyd",
              "questions": [
                {
                  "id": "lc:network-delay-time",
                  "add": true
                },
                {
                  "id": "lc:cheapest-flights-within-k-stops",
                  "add": true
                },
                {
                  "id": "lc:path-with-minimum-effort",
                  "add": true
                },
                {
                  "id": "lc:find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance",
                  "add": true
                },
                {
                  "id": "gfg:implementing-dijkstra-set-1-adjacency-matrix",
                  "add": true
                }
              ]
            },
            {
              "label": "Spanning tree — Kruskal / Prim",
              "questions": [
                {
                  "id": "lc:min-cost-to-connect-all-points",
                  "add": true
                },
                {
                  "id": "gfg:minimum-spanning-tree",
                  "add": true
                },
                {
                  "id": "lc:swim-in-rising-water",
                  "add": true
                }
              ]
            },
            {
              "label": "Bipartite check",
              "questions": [
                {
                  "id": "lc:is-graph-bipartite",
                  "add": true
                },
                {
                  "id": "lc:possible-bipartition",
                  "add": true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "dp-advanced",
      "label": "DP - 2D + Sequence",
      "tier": 3,
      "cards": [
        {
          "id": "c2d",
          "title": "2D DP",
          "color": "#378ADD",
          "sections": [
            {
              "label": "",
              "questions": [
                {
                  "id": "lc:unique-paths",
                  "add": true
                },
                {
                  "id": "lc:unique-paths-ii",
                  "add": true
                },
                {
                  "id": "lc:minimum-path-sum",
                  "add": true
                },
                {
                  "id": "lc:longest-common-subsequence",
                  "add": true
                },
                {
                  "id": "lc:edit-distance",
                  "add": true
                },
                {
                  "id": "lc:maximal-square",
                  "add": true
                }
              ]
            }
          ],
          "group": "Core"
        },
        {
          "id": "pseq",
          "title": "Sequence DP",
          "color": "#D85A30",
          "sections": [
            {
              "label": "",
              "questions": [
                {
                  "id": "lc:is-subsequence",
                  "initialStatus": "mastered"
                },
                {
                  "id": "lc:longest-palindromic-substring",
                  "initialStatus": "mastered"
                },
                {
                  "id": "lc:palindromic-substrings",
                  "initialStatus": "mastered"
                },
                {
                  "id": "lc:longest-common-subsequence",
                  "add": true
                },
                {
                  "id": "lc:edit-distance",
                  "add": true
                },
                {
                  "id": "lc:shortest-common-supersequence",
                  "add": true
                },
                {
                  "id": "lc:distinct-subsequences",
                  "add": true
                },
                {
                  "id": "lc:minimum-insertion-steps-to-make-a-string-palindrome",
                  "add": true
                }
              ]
            }
          ],
          "group": "Pattern Types"
        },
        {
          "id": "tlin",
          "title": "Linear DP",
          "color": "#1D9E75",
          "sections": [
            {
              "label": "",
              "questions": [
                {
                  "id": "lc:climbing-stairs",
                  "initialStatus": "mastered"
                },
                {
                  "id": "lc:min-cost-climbing-stairs",
                  "initialStatus": "mastered"
                },
                {
                  "id": "lc:maximum-subarray",
                  "initialStatus": "mastered"
                },
                {
                  "id": "lc:longest-increasing-subsequence",
                  "add": true
                },
                {
                  "id": "lc:number-of-longest-increasing-subsequence",
                  "add": true
                },
                {
                  "id": "lc:longest-arithmetic-subsequence",
                  "add": true
                }
              ]
            }
          ],
          "group": "Transition Type"
        },
        {
          "id": "tgrid",
          "title": "Grid DP",
          "color": "#1D9E75",
          "sections": [
            {
              "label": "",
              "questions": [
                {
                  "id": "lc:unique-paths",
                  "add": true
                },
                {
                  "id": "lc:unique-paths-ii",
                  "add": true
                },
                {
                  "id": "lc:minimum-path-sum",
                  "add": true
                },
                {
                  "id": "lc:minimum-falling-path-sum",
                  "add": true
                },
                {
                  "id": "lc:longest-increasing-path-in-a-matrix",
                  "add": true
                },
                {
                  "id": "lc:dungeon-game",
                  "add": true
                }
              ]
            }
          ]
        },
        {
          "id": "tdec",
          "title": "Decision DP",
          "color": "#1D9E75",
          "sections": [
            {
              "label": "",
              "questions": [
                {
                  "id": "lc:house-robber",
                  "initialStatus": "mastered"
                },
                {
                  "id": "lc:house-robber-ii",
                  "initialStatus": "mastered"
                },
                {
                  "id": "lc:best-time-to-buy-and-sell-stock",
                  "initialStatus": "mastered"
                },
                {
                  "id": "lc:best-time-to-buy-and-sell-stock-ii",
                  "add": true
                },
                {
                  "id": "lc:best-time-to-buy-and-sell-stock-iii",
                  "add": true
                },
                {
                  "id": "lc:best-time-to-buy-and-sell-stock-iv",
                  "add": true
                },
                {
                  "id": "lc:best-time-to-buy-and-sell-stock-with-cooldown",
                  "add": true
                },
                {
                  "id": "lc:best-time-to-buy-and-sell-stock-with-transaction-fee",
                  "add": true
                }
              ]
            }
          ]
        },
        {
          "id": "ppart",
          "title": "Partition DP",
          "color": "#D85A30",
          "sections": [
            {
              "label": "",
              "questions": [
                {
                  "id": "lc:split-array-largest-sum",
                  "initialStatus": "mastered"
                },
                {
                  "id": "lc:palindrome-partitioning-ii",
                  "add": true
                },
                {
                  "id": "lc:largest-sum-of-averages",
                  "add": true
                },
                {
                  "id": "lc:minimum-cost-to-cut-a-stick",
                  "add": true
                },
                {
                  "id": "lc:partition-array-for-maximum-sum",
                  "add": true
                }
              ]
            }
          ],
          "group": "Pattern Types"
        },
        {
          "id": "pint",
          "title": "Interval DP",
          "color": "#D85A30",
          "sections": [
            {
              "label": "",
              "questions": [
                {
                  "id": "lc:longest-palindromic-subsequence",
                  "add": true
                },
                {
                  "id": "lc:burst-balloons",
                  "add": true
                },
                {
                  "id": "lc:minimum-score-triangulation-of-polygon",
                  "add": true
                },
                {
                  "id": "lc:minimum-insertion-steps-to-make-a-string-palindrome",
                  "add": true
                },
                {
                  "id": "lc:guess-number-higher-or-lower-ii",
                  "add": true
                },
                {
                  "id": "lc:strange-printer",
                  "add": true
                }
              ]
            }
          ]
        },
        {
          "id": "abm",
          "title": "Bitmask DP",
          "color": "#7F77DD",
          "sections": [
            {
              "label": "",
              "questions": [
                {
                  "id": "lc:beautiful-arrangement",
                  "add": true
                },
                {
                  "id": "lc:fair-distribution-of-cookies",
                  "add": true
                },
                {
                  "id": "lc:shortest-path-visiting-all-nodes",
                  "add": true
                },
                {
                  "id": "lc:smallest-sufficient-team",
                  "add": true
                },
                {
                  "id": "lc:stickers-to-spell-word",
                  "add": true
                }
              ]
            }
          ],
          "group": "Advanced"
        },
        {
          "id": "adgt",
          "title": "Digit DP",
          "color": "#7F77DD",
          "sections": [
            {
              "label": "",
              "questions": [
                {
                  "id": "lc:count-numbers-with-unique-digits",
                  "add": true
                },
                {
                  "id": "lc:count-sorted-vowel-strings",
                  "add": true
                },
                {
                  "id": "lc:number-of-digit-one",
                  "add": true
                },
                {
                  "id": "lc:count-special-integers",
                  "add": true
                },
                {
                  "id": "lc:numbers-at-most-n-given-digit-set",
                  "add": true
                }
              ]
            }
          ]
        },
        {
          "id": "adtr",
          "title": "DP on Trees",
          "color": "#7F77DD",
          "sections": [
            {
              "label": "",
              "questions": [
                {
                  "id": "lc:house-robber-iii",
                  "add": true
                },
                {
                  "id": "lc:diameter-of-binary-tree",
                  "add": true
                },
                {
                  "id": "lc:binary-tree-maximum-path-sum",
                  "add": true
                },
                {
                  "id": "lc:binary-tree-cameras",
                  "add": true
                },
                {
                  "id": "lc:maximum-product-of-splitted-binary-tree",
                  "add": true
                }
              ]
            }
          ]
        },
        {
          "id": "omem",
          "title": "Memoization (top-down)",
          "color": "#BA7517",
          "sections": [
            {
              "label": "",
              "questions": [
                {
                  "id": "lc:target-sum",
                  "initialStatus": "mastered"
                },
                {
                  "id": "lc:out-of-boundary-paths",
                  "add": true
                },
                {
                  "id": "lc:word-break-ii",
                  "add": true
                },
                {
                  "id": "lc:palindrome-partitioning",
                  "add": true
                },
                {
                  "id": "lc:number-of-ways-of-cutting-a-pizza",
                  "add": true
                }
              ]
            }
          ],
          "group": "Optimization"
        },
        {
          "id": "otab",
          "title": "Tabulation (bottom-up)",
          "color": "#BA7517",
          "sections": [
            {
              "label": "",
              "questions": [
                {
                  "id": "lc:coin-change",
                  "initialStatus": "mastered"
                },
                {
                  "id": "lc:unique-paths",
                  "add": true
                },
                {
                  "id": "lc:longest-common-subsequence",
                  "add": true
                },
                {
                  "id": "lc:maximal-square",
                  "add": true
                },
                {
                  "id": "lc:count-ways-to-build-good-strings",
                  "add": true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "sorting",
      "label": "Sorting Applications",
      "tier": 3,
      "cards": [
        {
          "id": "sort",
          "title": "Sorting Applications",
          "color": "#475569",
          "sections": [
            {
              "label": "Sort applications (interview staples)",
              "questions": [
                {
                  "id": "lc:sort-colors"
                },
                {
                  "id": "lc:largest-number",
                  "add": true
                },
                {
                  "id": "lc:maximum-gap",
                  "add": true
                },
                {
                  "id": "gfg:inversion-of-array-1587115620",
                  "add": true
                },
                {
                  "id": "lc:wiggle-sort-ii",
                  "add": true
                }
              ]
            },
            {
              "label": "Quick select pattern",
              "questions": [
                {
                  "id": "lc:kth-largest-element-in-an-array"
                },
                {
                  "id": "lc:find-k-th-smallest-pair-distance"
                },
                {
                  "id": "lc:top-k-frequent-words",
                  "add": true
                }
              ]
            },
            {
              "label": "Implementation (understand the mechanics)",
              "questions": [
                {
                  "id": "lc:sort-an-array",
                  "add": true
                },
                {
                  "id": "gfg:merge-sort",
                  "add": true
                },
                {
                  "id": "gfg:quick-sort",
                  "add": true
                },
                {
                  "id": "gfg:heap-sort",
                  "add": true
                },
                {
                  "id": "gfg:counting-sort",
                  "add": true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "trie",
      "label": "Trie",
      "tier": 4,
      "cards": [
        {
          "id": "trie",
          "title": "Trie",
          "color": "#991b1b",
          "sections": [
            {
              "label": "Core — insert / search / prefix",
              "questions": [
                {
                  "id": "lc:implement-trie-prefix-tree",
                  "add": true
                },
                {
                  "id": "lc:add-and-search-word-data-structure",
                  "add": true
                },
                {
                  "id": "lc:word-search-ii",
                  "add": true
                },
                {
                  "id": "lc:replace-words",
                  "add": true
                },
                {
                  "id": "lc:search-suggestions-system",
                  "add": true
                }
              ]
            },
            {
              "label": "Prefix based",
              "questions": [
                {
                  "id": "lc:longest-common-prefix"
                },
                {
                  "id": "lc:implement-magic-dictionary",
                  "add": true
                },
                {
                  "id": "lc:prefix-and-suffix-search",
                  "add": true
                }
              ]
            },
            {
              "label": "Bitwise trie (XOR problems)",
              "questions": [
                {
                  "id": "lc:maximum-xor-of-two-numbers-in-an-array",
                  "add": true
                },
                {
                  "id": "lc:maximum-xor-with-an-element-from-array",
                  "add": true
                },
                {
                  "id": "gfg:count-pairs-with-given-xor",
                  "add": true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "bit",
      "label": "Bit Manipulation",
      "tier": 4,
      "cards": [
        {
          "id": "xor",
          "title": "XOR pattern",
          "color": "#378ADD",
          "sections": [
            {
              "label": "",
              "questions": [
                {
                  "id": "lc:single-number",
                  "initialStatus": "mastered"
                },
                {
                  "id": "lc:single-number-ii",
                  "initialStatus": "mastered"
                },
                {
                  "id": "lc:single-number-iii",
                  "initialStatus": "mastered"
                },
                {
                  "id": "lc:missing-number",
                  "initialStatus": "mastered"
                },
                {
                  "id": "lc:find-the-duplicate-number",
                  "initialStatus": "mastered"
                },
                {
                  "id": "lc:xor-queries-of-a-subarray"
                },
                {
                  "id": "lc:maximum-xor-of-two-numbers-in-an-array",
                  "add": true
                },
                {
                  "id": "lc:maximum-xor-after-operations",
                  "add": true
                }
              ]
            }
          ],
          "group": "Core"
        },
        {
          "id": "mask",
          "title": "Bit masking",
          "color": "#1D9E75",
          "sections": [
            {
              "label": "",
              "questions": [
                {
                  "id": "lc:reverse-bits",
                  "initialStatus": "mastered"
                },
                {
                  "id": "lc:power-of-two",
                  "initialStatus": "mastered"
                },
                {
                  "id": "lc:binary-number-with-alternating-bits",
                  "initialStatus": "mastered"
                },
                {
                  "id": "lc:number-of-steps-to-reduce-a-number-in-binary-representation",
                  "initialStatus": "mastered"
                },
                {
                  "id": "lc:number-of-1-bits",
                  "add": true
                },
                {
                  "id": "lc:counting-bits",
                  "add": true
                },
                {
                  "id": "lc:bitwise-and-of-numbers-range",
                  "add": true
                },
                {
                  "id": "lc:sum-of-two-integers",
                  "add": true
                },
                {
                  "id": "lc:minimum-flips-to-make-a-or-b-equal-to-c",
                  "add": true
                },
                {
                  "id": "lc:minimum-operations-to-make-binary-array-elements-equal-to-one-i",
                  "initialStatus": "mastered"
                }
              ]
            }
          ]
        },
        {
          "id": "subset",
          "title": "Subset via bits",
          "color": "#7F77DD",
          "sections": [
            {
              "label": "",
              "questions": [
                {
                  "id": "lc:subsets",
                  "initialStatus": "mastered"
                },
                {
                  "id": "lc:subsets-ii",
                  "initialStatus": "mastered"
                },
                {
                  "id": "lc:letter-case-permutation",
                  "add": true
                },
                {
                  "id": "lc:count-number-of-maximum-bitwise-or-subsets",
                  "add": true
                },
                {
                  "id": "lc:maximum-product-of-word-lengths",
                  "add": true
                },
                {
                  "id": "lc:beautiful-arrangement",
                  "add": true
                },
                {
                  "id": "lc:maximum-score-words-formed-by-letters",
                  "add": true
                }
              ]
            }
          ],
          "group": "Usage"
        },
        {
          "id": "checks",
          "title": "Bit checks",
          "color": "#BA7517",
          "sections": [
            {
              "label": "",
              "questions": [
                {
                  "id": "lc:count-complete-tree-nodes",
                  "initialStatus": "mastered"
                },
                {
                  "id": "lc:repeated-dna-sequences",
                  "initialStatus": "mastered"
                },
                {
                  "id": "lc:check-if-a-string-contains-all-binary-codes-of-size-k",
                  "initialStatus": "mastered"
                },
                {
                  "id": "lc:k-th-symbol-in-grammar",
                  "add": true
                },
                {
                  "id": "lc:minimum-bit-flips-to-convert-number",
                  "add": true
                },
                {
                  "id": "lc:smallest-subarrays-with-maximum-bitwise-or",
                  "add": true
                },
                {
                  "id": "lc:largest-number-after-digit-swaps-by-parity",
                  "add": true
                },
                {
                  "id": "lc:total-hamming-distance",
                  "add": true
                }
              ]
            }
          ]
        },
        {
          "id": "pxor",
          "title": "Prefix XOR",
          "color": "#D85A30",
          "sections": [
            {
              "label": "",
              "questions": [
                {
                  "id": "gfg:subarray-with-given-xor"
                },
                {
                  "id": "gfg:count-subarrays-with-given-xor"
                },
                {
                  "id": "lc:xor-queries-of-a-subarray",
                  "add": true
                },
                {
                  "id": "gfg:find-xor-of-numbers-from-l-to-r",
                  "add": true
                },
                {
                  "id": "lc:find-kth-largest-xor-coordinate-value",
                  "add": true
                },
                {
                  "id": "lc:count-triplets-that-can-form-two-arrays-of-equal-xor",
                  "add": true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "queue",
      "label": "Queue/Deque",
      "tier": 4,
      "cards": [
        {
          "id": "que",
          "title": "Queue/Deque",
          "color": "#d97706",
          "sections": [
            {
              "label": "Queue design",
              "questions": [
                {
                  "id": "lc:implement-queue-using-stacks",
                  "add": true
                },
                {
                  "id": "lc:design-circular-queue",
                  "add": true
                },
                {
                  "id": "lc:design-circular-deque",
                  "add": true
                }
              ]
            },
            {
              "label": "Monotonic deque",
              "questions": [
                {
                  "id": "lc:sliding-window-maximum"
                },
                {
                  "id": "gfg:first-negative-integer-in-every-window-of-size-k3345",
                  "add": true
                },
                {
                  "id": "lc:constrained-subsequence-sum",
                  "add": true
                },
                {
                  "id": "lc:jump-game-vi",
                  "add": true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "range",
      "label": "Range Structures",
      "tier": 4,
      "cards": [
        {
          "id": "rng",
          "title": "Range Structures",
          "color": "#14b8a6",
          "sections": [
            {
              "label": "Segment tree",
              "questions": [
                {
                  "id": "lc:range-sum-query-mutable",
                  "add": true
                },
                {
                  "id": "gfg:segment-tree",
                  "add": true
                },
                {
                  "id": "gfg:range-minimum-query",
                  "add": true
                },
                {
                  "id": "lc:falling-squares",
                  "add": true
                }
              ]
            },
            {
              "label": "BIT / Fenwick tree",
              "questions": [
                {
                  "id": "lc:count-of-smaller-numbers-after-self",
                  "add": true
                },
                {
                  "id": "lc:reverse-pairs",
                  "add": true
                },
                {
                  "id": "gfg:binary-indexed-tree-or-fenwick-tree",
                  "add": true
                },
                {
                  "id": "lc:count-of-range-sum",
                  "add": true
                }
              ]
            },
            {
              "label": "Sparse table",
              "questions": [
                {
                  "id": "gfg:sparse-table",
                  "add": true
                },
                {
                  "id": "lc:sliding-window-maximum"
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  "questions": {
    "lc:binary-search": {
      "name": "Binary Search",
      "url": "https://leetcode.com/problems/binary-search/",
      "source": "leetcode",
      "hard": false
    },
    "lc:search-insert-position": {
      "name": "Search Insert Position",
      "url": "https://leetcode.com/problems/search-insert-position/",
      "source": "leetcode",
      "hard": false
    },
    "lc:find-first-and-last-position-of-element-in-sorted-array": {
      "name": "First and Last Position of Element in Sorted Array",
      "url": "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
      "source": "leetcode",
      "hard": false
    },
    "lc:find-peak-element": {
      "name": "Find Peak Element",
      "url": "https://leetcode.com/problems/find-peak-element/",
      "source": "leetcode",
      "hard": false
    },
    "lc:single-element-in-a-sorted-array": {
      "name": "Single Element in a Sorted Array",
      "url": "https://leetcode.com/problems/single-element-in-a-sorted-array/",
      "source": "leetcode",
      "hard": false
    },
    "gfg:floor-in-a-sorted-array-1587115620": {
      "name": "Floor and Ceil in Sorted Array (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/floor-in-a-sorted-array-1587115620/1",
      "source": "gfg",
      "hard": false
    },
    "gfg:number-of-occurrence2259": {
      "name": "Count Occurrences in Sorted Array (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/number-of-occurrence2259/1",
      "source": "gfg",
      "hard": false
    },
    "lc:search-in-rotated-sorted-array": {
      "name": "Search in Rotated Sorted Array",
      "url": "https://leetcode.com/problems/search-in-rotated-sorted-array/",
      "source": "leetcode",
      "hard": false
    },
    "lc:search-in-rotated-sorted-array-ii": {
      "name": "Search in Rotated Sorted Array II",
      "url": "https://leetcode.com/problems/search-in-rotated-sorted-array-ii/",
      "source": "leetcode",
      "hard": false
    },
    "lc:find-minimum-in-rotated-sorted-array": {
      "name": "Find Minimum in Rotated Sorted Array",
      "url": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
      "source": "leetcode",
      "hard": false
    },
    "lc:find-minimum-in-rotated-sorted-array-ii": {
      "name": "Find Minimum in Rotated Sorted Array II",
      "url": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/",
      "source": "leetcode",
      "hard": false
    },
    "lc:search-a-2d-matrix": {
      "name": "Search a 2D Matrix",
      "url": "https://leetcode.com/problems/search-a-2d-matrix/",
      "source": "leetcode",
      "hard": false
    },
    "lc:search-a-2d-matrix-ii": {
      "name": "Search a 2D Matrix II",
      "url": "https://leetcode.com/problems/search-a-2d-matrix-ii/",
      "source": "leetcode",
      "hard": false
    },
    "lc:median-of-two-sorted-arrays": {
      "name": "Median of Two Sorted Arrays",
      "url": "https://leetcode.com/problems/median-of-two-sorted-arrays/",
      "source": "leetcode",
      "hard": false
    },
    "lc:sqrtx": {
      "name": "Sqrt(x)",
      "url": "https://leetcode.com/problems/sqrtx/",
      "source": "leetcode",
      "hard": false
    },
    "gfg:find-nth-root-of-m5843": {
      "name": "Nth Root of Number (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/find-nth-root-of-m5843/1",
      "source": "gfg",
      "hard": false
    },
    "lc:koko-eating-bananas": {
      "name": "Koko Eating Bananas",
      "url": "https://leetcode.com/problems/koko-eating-bananas/",
      "source": "leetcode",
      "hard": false
    },
    "lc:capacity-to-ship-packages-within-d-days": {
      "name": "Capacity to Ship Packages Within D Days",
      "url": "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/",
      "source": "leetcode",
      "hard": false
    },
    "lc:minimum-number-of-days-to-make-m-bouquets": {
      "name": "Minimum Number of Days to Make M Bouquets",
      "url": "https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/",
      "source": "leetcode",
      "hard": false
    },
    "lc:find-the-smallest-divisor-given-a-threshold": {
      "name": "Find the Smallest Divisor Given a Threshold",
      "url": "https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/",
      "source": "leetcode",
      "hard": false
    },
    "lc:minimum-time-to-complete-trips": {
      "name": "Minimum Time to Complete Trips",
      "url": "https://leetcode.com/problems/minimum-time-to-complete-trips/",
      "source": "leetcode",
      "hard": false
    },
    "lc:minimum-speed-to-arrive-on-time": {
      "name": "Minimum Speed to Arrive on Time",
      "url": "https://leetcode.com/problems/minimum-speed-to-arrive-on-time/",
      "source": "leetcode",
      "hard": false
    },
    "lc:split-array-largest-sum": {
      "name": "Split Array Largest Sum",
      "url": "https://leetcode.com/problems/split-array-largest-sum/",
      "source": "leetcode",
      "hard": false
    },
    "gfg:allocate-minimum-number-of-pages0937": {
      "name": "Allocate Minimum Pages (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/allocate-minimum-number-of-pages0937/1",
      "source": "gfg",
      "hard": false
    },
    "gfg:the-painters-partition-problem1535": {
      "name": "Painter's Partition Problem (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/the-painters-partition-problem1535/1",
      "source": "gfg",
      "hard": false
    },
    "lc:minimize-maximum-of-array": {
      "name": "Minimize Maximum of Array",
      "url": "https://leetcode.com/problems/minimize-maximum-of-array/",
      "source": "leetcode",
      "hard": false
    },
    "gfg:aggressive-cows": {
      "name": "Aggressive Cows (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/aggressive-cows/1",
      "source": "gfg",
      "hard": false
    },
    "lc:magnetic-force-between-two-balls": {
      "name": "Magnetic Force Between Two Balls",
      "url": "https://leetcode.com/problems/magnetic-force-between-two-balls/",
      "source": "leetcode",
      "hard": false
    },
    "lc:kth-smallest-element-in-a-sorted-matrix": {
      "name": "Kth Smallest Element in a Sorted Matrix",
      "url": "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/",
      "source": "leetcode",
      "hard": false
    },
    "lc:kth-missing-positive-number": {
      "name": "Kth Missing Positive Number",
      "url": "https://leetcode.com/problems/kth-missing-positive-number/",
      "source": "leetcode",
      "hard": false
    },
    "lc:find-k-th-smallest-pair-distance": {
      "name": "Find K-th Smallest Pair Distance",
      "url": "https://leetcode.com/problems/find-k-th-smallest-pair-distance/",
      "source": "leetcode",
      "hard": false
    },
    "gfg:median-in-a-row-wise-sorted-matrix1527": {
      "name": "Median in a Row-Wise Sorted Matrix (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/median-in-a-row-wise-sorted-matrix1527/1",
      "source": "gfg",
      "hard": false
    },
    "lc:maximum-subarray": {
      "name": "Maximum Subarray",
      "url": "https://leetcode.com/problems/maximum-subarray/",
      "source": "leetcode",
      "hard": false
    },
    "lc:maximum-sum-circular-subarray": {
      "name": "Maximum Sum Circular Subarray",
      "url": "https://leetcode.com/problems/maximum-sum-circular-subarray/",
      "source": "leetcode",
      "hard": false
    },
    "lc:maximum-absolute-sum-of-any-subarray": {
      "name": "Maximum Absolute Sum of Any Subarray",
      "url": "https://leetcode.com/problems/maximum-absolute-sum-of-any-subarray/",
      "source": "leetcode",
      "hard": false
    },
    "lc:maximum-subarray-sum-after-one-operation": {
      "name": "Maximum Subarray Sum After One Operation",
      "url": "https://leetcode.com/problems/maximum-subarray-sum-after-one-operation/",
      "source": "leetcode",
      "hard": false
    },
    "lc:maximum-product-subarray": {
      "name": "Maximum Product Subarray",
      "url": "https://leetcode.com/problems/maximum-product-subarray/",
      "source": "leetcode",
      "hard": false
    },
    "lc:subarray-sum-equals-k": {
      "name": "Subarray Sum Equals K",
      "url": "https://leetcode.com/problems/subarray-sum-equals-k/",
      "source": "leetcode",
      "hard": false
    },
    "lc:continuous-subarray-sum": {
      "name": "Continuous Subarray Sum",
      "url": "https://leetcode.com/problems/continuous-subarray-sum/",
      "source": "leetcode",
      "hard": false
    },
    "lc:subarray-sums-divisible-by-k": {
      "name": "Subarray Sums Divisible by K",
      "url": "https://leetcode.com/problems/subarray-sums-divisible-by-k/",
      "source": "leetcode",
      "hard": false
    },
    "lc:binary-subarrays-with-sum": {
      "name": "Binary Subarrays With Sum",
      "url": "https://leetcode.com/problems/binary-subarrays-with-sum/",
      "source": "leetcode",
      "hard": false
    },
    "lc:number-of-subarrays-with-bounded-maximum": {
      "name": "Number of Subarrays with Bounded Maximum",
      "url": "https://leetcode.com/problems/number-of-subarrays-with-bounded-maximum/",
      "source": "leetcode",
      "hard": false
    },
    "gfg:subarray-with-given-xor": {
      "name": "Subarray XOR Equals K (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/subarray-with-given-xor/1",
      "source": "gfg",
      "hard": false
    },
    "gfg:count-subarrays-with-given-xor": {
      "name": "Count Subarrays with XOR K (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/count-subarray-with-given-xor/1",
      "source": "gfg",
      "hard": false
    },
    "gfg:longest-sub-array-with-sum-k0809": {
      "name": "Longest Sub-Array with Sum K (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/longest-sub-array-with-sum-k0809/1",
      "source": "gfg",
      "hard": false
    },
    "gfg:largest-subarray-with-0-sum": {
      "name": "Largest Subarray with 0 Sum (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/largest-subarray-with-0-sum/1",
      "source": "gfg",
      "hard": false
    },
    "lc:maximum-size-subarray-sum-equals-k": {
      "name": "Maximum Size Subarray Sum Equals K",
      "url": "https://leetcode.com/problems/maximum-size-subarray-sum-equals-k/",
      "source": "leetcode",
      "hard": false
    },
    "lc:range-sum-query-immutable": {
      "name": "Range Sum Query – Immutable",
      "url": "https://leetcode.com/problems/range-sum-query-immutable/",
      "source": "leetcode",
      "hard": false
    },
    "lc:count-number-of-nice-subarrays": {
      "name": "Count Number of Nice Subarrays",
      "url": "https://leetcode.com/problems/count-number-of-nice-subarrays/",
      "source": "leetcode",
      "hard": false
    },
    "lc:product-of-array-except-self": {
      "name": "Product of Array Except Self",
      "url": "https://leetcode.com/problems/product-of-array-except-self/",
      "source": "leetcode",
      "hard": false
    },
    "lc:single-number": {
      "name": "Single Number",
      "url": "https://leetcode.com/problems/single-number/",
      "source": "leetcode",
      "hard": false
    },
    "lc:single-number-ii": {
      "name": "Single Number II",
      "url": "https://leetcode.com/problems/single-number-ii/",
      "source": "leetcode",
      "hard": false
    },
    "gfg:find-xor-of-numbers-from-l-to-r": {
      "name": "Find XOR of Numbers in Range (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/find-xor-of-numbers-from-l-to-r/1",
      "source": "gfg",
      "hard": false
    },
    "lc:range-sum-query-2d-immutable": {
      "name": "Range Sum Query 2D – Immutable",
      "url": "https://leetcode.com/problems/range-sum-query-2d-immutable/",
      "source": "leetcode",
      "hard": false
    },
    "lc:matrix-block-sum": {
      "name": "Matrix Block Sum",
      "url": "https://leetcode.com/problems/matrix-block-sum/",
      "source": "leetcode",
      "hard": false
    },
    "lc:number-of-submatrices-that-sum-to-target": {
      "name": "Number of Submatrices that Sum to Target",
      "url": "https://leetcode.com/problems/number-of-submatrices-that-sum-to-target/",
      "source": "leetcode",
      "hard": false
    },
    "lc:max-sum-of-rectangle-no-larger-than-k": {
      "name": "Max Sum of Rectangle No Larger Than K",
      "url": "https://leetcode.com/problems/max-sum-of-rectangle-no-larger-than-k/",
      "source": "leetcode",
      "hard": false
    },
    "lc:maximum-average-subarray-i": {
      "name": "Maximum Average Subarray I",
      "url": "https://leetcode.com/problems/maximum-average-subarray-i/",
      "source": "leetcode",
      "hard": false
    },
    "gfg:max-sum-subarray-of-size-k5313": {
      "name": "Maximum Sum Subarray of Size K (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/max-sum-subarray-of-size-k5313/1",
      "source": "gfg",
      "hard": false
    },
    "lc:find-all-anagrams-in-a-string": {
      "name": "Find All Anagrams in a String",
      "url": "https://leetcode.com/problems/find-all-anagrams-in-a-string/",
      "source": "leetcode",
      "hard": false
    },
    "lc:permutation-in-string": {
      "name": "Permutation in String",
      "url": "https://leetcode.com/problems/permutation-in-string/",
      "source": "leetcode",
      "hard": false
    },
    "lc:longest-substring-without-repeating-characters": {
      "name": "Longest Substring Without Repeating Characters",
      "url": "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
      "source": "leetcode",
      "hard": false
    },
    "lc:longest-repeating-character-replacement": {
      "name": "Longest Repeating Character Replacement",
      "url": "https://leetcode.com/problems/longest-repeating-character-replacement/",
      "source": "leetcode",
      "hard": false
    },
    "lc:minimum-window-substring": {
      "name": "Minimum Window Substring",
      "url": "https://leetcode.com/problems/minimum-window-substring/",
      "source": "leetcode",
      "hard": false
    },
    "lc:fruit-into-baskets": {
      "name": "Fruit Into Baskets",
      "url": "https://leetcode.com/problems/fruit-into-baskets/",
      "source": "leetcode",
      "hard": false
    },
    "lc:max-consecutive-ones-iii": {
      "name": "Max Consecutive Ones III",
      "url": "https://leetcode.com/problems/max-consecutive-ones-iii/",
      "source": "leetcode",
      "hard": false
    },
    "lc:subarrays-with-k-different-integers": {
      "name": "Subarrays with K Different Integers",
      "url": "https://leetcode.com/problems/subarrays-with-k-different-integers/",
      "source": "leetcode",
      "hard": false
    },
    "lc:sliding-window-maximum": {
      "name": "Sliding Window Maximum",
      "url": "https://leetcode.com/problems/sliding-window-maximum/",
      "source": "leetcode",
      "hard": false
    },
    "gfg:minimum-of-all-subarrays-of-size-k3101": {
      "name": "Sliding Window Minimum (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/minimum-of-all-subarrays-of-size-k3101/1",
      "source": "gfg",
      "hard": false
    },
    "lc:constrained-subsequence-sum": {
      "name": "Constrained Subsequence Sum",
      "url": "https://leetcode.com/problems/constrained-subsequence-sum/",
      "source": "leetcode",
      "hard": false
    },
    "lc:jump-game-vi": {
      "name": "Jump Game VI",
      "url": "https://leetcode.com/problems/jump-game-vi/",
      "source": "leetcode",
      "hard": false
    },
    "lc:two-sum-ii-input-array-is-sorted": {
      "name": "Two Sum II – Input Array Is Sorted",
      "url": "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
      "source": "leetcode",
      "hard": false
    },
    "lc:valid-palindrome": {
      "name": "Valid Palindrome",
      "url": "https://leetcode.com/problems/valid-palindrome/",
      "source": "leetcode",
      "hard": false
    },
    "lc:container-with-most-water": {
      "name": "Container With Most Water",
      "url": "https://leetcode.com/problems/container-with-most-water/",
      "source": "leetcode",
      "hard": false
    },
    "lc:trapping-rain-water": {
      "name": "Trapping Rain Water",
      "url": "https://leetcode.com/problems/trapping-rain-water/",
      "source": "leetcode",
      "hard": false
    },
    "lc:3sum": {
      "name": "3Sum",
      "url": "https://leetcode.com/problems/3sum/",
      "source": "leetcode",
      "hard": false
    },
    "lc:4sum": {
      "name": "4Sum",
      "url": "https://leetcode.com/problems/4sum/",
      "source": "leetcode",
      "hard": false
    },
    "lc:squares-of-a-sorted-array": {
      "name": "Squares of a Sorted Array",
      "url": "https://leetcode.com/problems/squares-of-a-sorted-array/",
      "source": "leetcode",
      "hard": false
    },
    "lc:remove-duplicates-from-sorted-array": {
      "name": "Remove Duplicates from Sorted Array",
      "url": "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
      "source": "leetcode",
      "hard": false
    },
    "lc:remove-element": {
      "name": "Remove Element",
      "url": "https://leetcode.com/problems/remove-element/",
      "source": "leetcode",
      "hard": false
    },
    "lc:move-zeroes": {
      "name": "Move Zeroes",
      "url": "https://leetcode.com/problems/move-zeroes/",
      "source": "leetcode",
      "hard": false
    },
    "lc:linked-list-cycle": {
      "name": "Linked List Cycle",
      "url": "https://leetcode.com/problems/linked-list-cycle/",
      "source": "leetcode",
      "hard": false
    },
    "lc:middle-of-the-linked-list": {
      "name": "Middle of the Linked List",
      "url": "https://leetcode.com/problems/middle-of-the-linked-list/",
      "source": "leetcode",
      "hard": false
    },
    "lc:merge-sorted-array": {
      "name": "Merge Sorted Array",
      "url": "https://leetcode.com/problems/merge-sorted-array/",
      "source": "leetcode",
      "hard": false
    },
    "lc:sort-colors": {
      "name": "Sort Colors",
      "url": "https://leetcode.com/problems/sort-colors/",
      "source": "leetcode",
      "hard": false
    },
    "lc:partition-array-according-to-given-pivot": {
      "name": "Partition Array According to Given Pivot",
      "url": "https://leetcode.com/problems/partition-array-according-to-given-pivot/",
      "source": "leetcode",
      "hard": false
    },
    "lc:wiggle-sort": {
      "name": "Wiggle Sort",
      "url": "https://leetcode.com/problems/wiggle-sort/",
      "source": "leetcode",
      "hard": false
    },
    "gfg:three-way-partitioning": {
      "name": "3-Way Partitioning (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/three-way-partitioning/1",
      "source": "gfg",
      "hard": false
    },
    "lc:two-sum": {
      "name": "Two Sum",
      "url": "https://leetcode.com/problems/two-sum/",
      "source": "leetcode",
      "hard": false
    },
    "lc:contains-duplicate-ii": {
      "name": "Contains Duplicate II",
      "url": "https://leetcode.com/problems/contains-duplicate-ii/",
      "source": "leetcode",
      "hard": false
    },
    "lc:longest-consecutive-sequence": {
      "name": "Longest Consecutive Sequence",
      "url": "https://leetcode.com/problems/longest-consecutive-sequence/",
      "source": "leetcode",
      "hard": false
    },
    "lc:group-anagrams": {
      "name": "Group Anagrams",
      "url": "https://leetcode.com/problems/group-anagrams/",
      "source": "leetcode",
      "hard": false
    },
    "lc:top-k-frequent-elements": {
      "name": "Top K Frequent Elements",
      "url": "https://leetcode.com/problems/top-k-frequent-elements/",
      "source": "leetcode",
      "hard": false
    },
    "lc:sort-characters-by-frequency": {
      "name": "Sort Characters by Frequency",
      "url": "https://leetcode.com/problems/sort-characters-by-frequency/",
      "source": "leetcode",
      "hard": false
    },
    "lc:first-unique-character-in-a-string": {
      "name": "First Unique Character in a String",
      "url": "https://leetcode.com/problems/first-unique-character-in-a-string/",
      "source": "leetcode",
      "hard": false
    },
    "lc:contains-duplicate": {
      "name": "Contains Duplicate",
      "url": "https://leetcode.com/problems/contains-duplicate/",
      "source": "leetcode",
      "hard": false
    },
    "lc:intersection-of-two-arrays": {
      "name": "Intersection of Two Arrays",
      "url": "https://leetcode.com/problems/intersection-of-two-arrays/",
      "source": "leetcode",
      "hard": false
    },
    "lc:happy-number": {
      "name": "Happy Number",
      "url": "https://leetcode.com/problems/happy-number/",
      "source": "leetcode",
      "hard": false
    },
    "lc:isomorphic-strings": {
      "name": "Isomorphic Strings",
      "url": "https://leetcode.com/problems/isomorphic-strings/",
      "source": "leetcode",
      "hard": false
    },
    "gfg:pattern-searching5231": {
      "name": "Pattern Matching (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/pattern-searching5231/1",
      "source": "gfg",
      "hard": false
    },
    "lc:longest-substring-with-at-most-k-distinct-characters": {
      "name": "Longest Substring with At Most K Distinct Characters",
      "url": "https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/",
      "source": "leetcode",
      "hard": false
    },
    "lc:valid-palindrome-ii": {
      "name": "Valid Palindrome II",
      "url": "https://leetcode.com/problems/valid-palindrome-ii/",
      "source": "leetcode",
      "hard": false
    },
    "lc:reverse-words-in-a-string": {
      "name": "Reverse Words in a String",
      "url": "https://leetcode.com/problems/reverse-words-in-a-string/",
      "source": "leetcode",
      "hard": false
    },
    "lc:reverse-string": {
      "name": "Reverse String",
      "url": "https://leetcode.com/problems/reverse-string/",
      "source": "leetcode",
      "hard": false
    },
    "lc:find-the-index-of-the-first-occurrence-in-a-string": {
      "name": "Find the Index of First Occurrence (KMP)",
      "url": "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/",
      "source": "leetcode",
      "hard": false
    },
    "lc:repeated-substring-pattern": {
      "name": "Repeated Substring Pattern",
      "url": "https://leetcode.com/problems/repeated-substring-pattern/",
      "source": "leetcode",
      "hard": false
    },
    "lc:longest-happy-prefix": {
      "name": "Longest Happy Prefix (KMP)",
      "url": "https://leetcode.com/problems/longest-happy-prefix/",
      "source": "leetcode",
      "hard": false
    },
    "lc:repeated-dna-sequences": {
      "name": "Repeated DNA Sequences (Rabin-Karp)",
      "url": "https://leetcode.com/problems/repeated-dna-sequences/",
      "source": "leetcode",
      "hard": false
    },
    "gfg:z-function": {
      "name": "Z-Algorithm (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/z-function/1",
      "source": "gfg",
      "hard": false
    },
    "lc:valid-anagram": {
      "name": "Valid Anagram",
      "url": "https://leetcode.com/problems/valid-anagram/",
      "source": "leetcode",
      "hard": false
    },
    "lc:ransom-note": {
      "name": "Ransom Note",
      "url": "https://leetcode.com/problems/ransom-note/",
      "source": "leetcode",
      "hard": false
    },
    "lc:longest-palindrome": {
      "name": "Longest Palindrome (frequency)",
      "url": "https://leetcode.com/problems/longest-palindrome/",
      "source": "leetcode",
      "hard": false
    },
    "lc:count-and-say": {
      "name": "Count and Say",
      "url": "https://leetcode.com/problems/count-and-say/",
      "source": "leetcode",
      "hard": false
    },
    "lc:string-compression": {
      "name": "String Compression",
      "url": "https://leetcode.com/problems/string-compression/",
      "source": "leetcode",
      "hard": false
    },
    "lc:longest-common-prefix": {
      "name": "Longest Common Prefix",
      "url": "https://leetcode.com/problems/longest-common-prefix/",
      "source": "leetcode",
      "hard": false
    },
    "lc:decode-string": {
      "name": "Decode String",
      "url": "https://leetcode.com/problems/decode-string/",
      "source": "leetcode",
      "hard": false
    },
    "lc:multiply-strings": {
      "name": "Multiply Strings",
      "url": "https://leetcode.com/problems/multiply-strings/",
      "source": "leetcode",
      "hard": false
    },
    "lc:linked-list-cycle-ii": {
      "name": "Linked List Cycle II",
      "url": "https://leetcode.com/problems/linked-list-cycle-ii/",
      "source": "leetcode",
      "hard": false
    },
    "lc:find-the-duplicate-number": {
      "name": "Find the Duplicate Number",
      "url": "https://leetcode.com/problems/find-the-duplicate-number/",
      "source": "leetcode",
      "hard": false
    },
    "lc:reverse-linked-list": {
      "name": "Reverse Linked List",
      "url": "https://leetcode.com/problems/reverse-linked-list/",
      "source": "leetcode",
      "hard": false
    },
    "lc:reverse-linked-list-ii": {
      "name": "Reverse Linked List II",
      "url": "https://leetcode.com/problems/reverse-linked-list-ii/",
      "source": "leetcode",
      "hard": false
    },
    "lc:reverse-nodes-in-k-group": {
      "name": "Reverse Nodes in k-Group",
      "url": "https://leetcode.com/problems/reverse-nodes-in-k-group/",
      "source": "leetcode",
      "hard": true
    },
    "lc:palindrome-linked-list": {
      "name": "Palindrome Linked List",
      "url": "https://leetcode.com/problems/palindrome-linked-list/",
      "source": "leetcode",
      "hard": false
    },
    "lc:swap-nodes-in-pairs": {
      "name": "Swap Nodes in Pairs",
      "url": "https://leetcode.com/problems/swap-nodes-in-pairs/",
      "source": "leetcode",
      "hard": false
    },
    "lc:merge-two-sorted-lists": {
      "name": "Merge Two Sorted Lists",
      "url": "https://leetcode.com/problems/merge-two-sorted-lists/",
      "source": "leetcode",
      "hard": false
    },
    "lc:merge-k-sorted-lists": {
      "name": "Merge k Sorted Lists",
      "url": "https://leetcode.com/problems/merge-k-sorted-lists/",
      "source": "leetcode",
      "hard": true
    },
    "lc:sort-list": {
      "name": "Sort List",
      "url": "https://leetcode.com/problems/sort-list/",
      "source": "leetcode",
      "hard": false
    },
    "lc:reorder-list": {
      "name": "Reorder List",
      "url": "https://leetcode.com/problems/reorder-list/",
      "source": "leetcode",
      "hard": false
    },
    "lc:add-two-numbers": {
      "name": "Add Two Numbers",
      "url": "https://leetcode.com/problems/add-two-numbers/",
      "source": "leetcode",
      "hard": false
    },
    "lc:remove-nth-node-from-end-of-list": {
      "name": "Remove Nth Node From End",
      "url": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
      "source": "leetcode",
      "hard": false
    },
    "lc:valid-parentheses": {
      "name": "Valid Parentheses",
      "url": "https://leetcode.com/problems/valid-parentheses/",
      "source": "leetcode",
      "hard": false
    },
    "lc:baseball-game": {
      "name": "Baseball Game",
      "url": "https://leetcode.com/problems/baseball-game/",
      "source": "leetcode",
      "hard": false
    },
    "lc:backspace-string-compare": {
      "name": "Backspace String Compare",
      "url": "https://leetcode.com/problems/backspace-string-compare/",
      "source": "leetcode",
      "hard": false
    },
    "lc:remove-all-adjacent-duplicates-in-string": {
      "name": "Remove All Adjacent Duplicates In String",
      "url": "https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/",
      "source": "leetcode",
      "hard": false
    },
    "lc:make-the-string-great": {
      "name": "Make The String Great",
      "url": "https://leetcode.com/problems/make-the-string-great/",
      "source": "leetcode",
      "hard": false
    },
    "lc:next-greater-element-i": {
      "name": "Next Greater Element I",
      "url": "https://leetcode.com/problems/next-greater-element-i/",
      "source": "leetcode",
      "hard": false
    },
    "lc:daily-temperatures": {
      "name": "Daily Temperatures",
      "url": "https://leetcode.com/problems/daily-temperatures/",
      "source": "leetcode",
      "hard": false
    },
    "lc:final-prices-with-a-special-discount-in-a-shop": {
      "name": "Final Prices With a Special Discount in a Shop",
      "url": "https://leetcode.com/problems/final-prices-with-a-special-discount-in-a-shop/",
      "source": "leetcode",
      "hard": false
    },
    "lc:buildings-with-an-ocean-view": {
      "name": "Buildings With an Ocean View (Premium)",
      "url": "https://leetcode.com/problems/buildings-with-an-ocean-view/",
      "source": "leetcode",
      "hard": false
    },
    "lc:next-greater-element-ii": {
      "name": "Next Greater Element II",
      "url": "https://leetcode.com/problems/next-greater-element-ii/",
      "source": "leetcode",
      "hard": false
    },
    "lc:online-stock-span": {
      "name": "Online Stock Span",
      "url": "https://leetcode.com/problems/online-stock-span/",
      "source": "leetcode",
      "hard": false
    },
    "lc:remove-k-digits": {
      "name": "Remove K Digits",
      "url": "https://leetcode.com/problems/remove-k-digits/",
      "source": "leetcode",
      "hard": false
    },
    "lc:asteroid-collision": {
      "name": "Asteroid Collision",
      "url": "https://leetcode.com/problems/asteroid-collision/",
      "source": "leetcode",
      "hard": false
    },
    "lc:sum-of-subarray-minimums": {
      "name": "Sum of Subarray Minimums",
      "url": "https://leetcode.com/problems/sum-of-subarray-minimums/",
      "source": "leetcode",
      "hard": false
    },
    "lc:maximum-width-ramp": {
      "name": "Maximum Width Ramp",
      "url": "https://leetcode.com/problems/maximum-width-ramp/",
      "source": "leetcode",
      "hard": false
    },
    "lc:number-of-visible-people-in-a-queue": {
      "name": "Number of Visible People in a Queue",
      "url": "https://leetcode.com/problems/number-of-visible-people-in-a-queue/",
      "source": "leetcode",
      "hard": false
    },
    "gfg:stock-span-problem-1587115621": {
      "name": "Stock Span Problem (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/stock-span-problem-1587115621/1",
      "source": "gfg",
      "hard": false
    },
    "gfg:next-smaller-element": {
      "name": "Next Smaller Element (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/next-smaller-element/1",
      "source": "gfg",
      "hard": false
    },
    "lc:min-stack": {
      "name": "Min Stack",
      "url": "https://leetcode.com/problems/min-stack/",
      "source": "leetcode",
      "hard": false
    },
    "lc:evaluate-reverse-polish-notation": {
      "name": "Evaluate Reverse Polish Notation",
      "url": "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
      "source": "leetcode",
      "hard": false
    },
    "lc:binary-tree-inorder-traversal": {
      "name": "Binary Tree Inorder Traversal",
      "url": "https://leetcode.com/problems/binary-tree-inorder-traversal/",
      "source": "leetcode",
      "hard": false
    },
    "lc:binary-tree-preorder-traversal": {
      "name": "Binary Tree Preorder Traversal",
      "url": "https://leetcode.com/problems/binary-tree-preorder-traversal/",
      "source": "leetcode",
      "hard": false
    },
    "lc:binary-tree-postorder-traversal": {
      "name": "Binary Tree Postorder Traversal",
      "url": "https://leetcode.com/problems/binary-tree-postorder-traversal/",
      "source": "leetcode",
      "hard": false
    },
    "lc:same-tree": {
      "name": "Same Tree",
      "url": "https://leetcode.com/problems/same-tree/",
      "source": "leetcode",
      "hard": false
    },
    "lc:symmetric-tree": {
      "name": "Symmetric Tree",
      "url": "https://leetcode.com/problems/symmetric-tree/",
      "source": "leetcode",
      "hard": false
    },
    "lc:flatten-binary-tree-to-linked-list": {
      "name": "Flatten Binary Tree to Linked List",
      "url": "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/",
      "source": "leetcode",
      "hard": false
    },
    "lc:binary-tree-level-order-traversal": {
      "name": "Binary Tree Level Order Traversal",
      "url": "https://leetcode.com/problems/binary-tree-level-order-traversal/",
      "source": "leetcode",
      "hard": false
    },
    "lc:binary-tree-right-side-view": {
      "name": "Binary Tree Right Side View",
      "url": "https://leetcode.com/problems/binary-tree-right-side-view/",
      "source": "leetcode",
      "hard": false
    },
    "lc:binary-tree-zigzag-level-order-traversal": {
      "name": "Binary Tree Zigzag Level Order",
      "url": "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/",
      "source": "leetcode",
      "hard": false
    },
    "lc:maximum-width-of-binary-tree": {
      "name": "Maximum Width of Binary Tree",
      "url": "https://leetcode.com/problems/maximum-width-of-binary-tree/",
      "source": "leetcode",
      "hard": false
    },
    "lc:vertical-order-traversal-of-a-binary-tree": {
      "name": "Vertical Order Traversal",
      "url": "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/",
      "source": "leetcode",
      "hard": false
    },
    "lc:maximum-depth-of-binary-tree": {
      "name": "Maximum Depth of Binary Tree",
      "url": "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
      "source": "leetcode",
      "hard": false
    },
    "lc:balanced-binary-tree": {
      "name": "Balanced Binary Tree",
      "url": "https://leetcode.com/problems/balanced-binary-tree/",
      "source": "leetcode",
      "hard": false
    },
    "lc:invert-binary-tree": {
      "name": "Invert Binary Tree",
      "url": "https://leetcode.com/problems/invert-binary-tree/",
      "source": "leetcode",
      "hard": false
    },
    "lc:lowest-common-ancestor-of-a-binary-tree": {
      "name": "Lowest Common Ancestor of Binary Tree",
      "url": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
      "source": "leetcode",
      "hard": false
    },
    "lc:count-good-nodes-in-binary-tree": {
      "name": "Count Good Nodes in Binary Tree",
      "url": "https://leetcode.com/problems/count-good-nodes-in-binary-tree/",
      "source": "leetcode",
      "hard": false
    },
    "lc:subtree-of-another-tree": {
      "name": "Subtree of Another Tree",
      "url": "https://leetcode.com/problems/subtree-of-another-tree/",
      "source": "leetcode",
      "hard": false
    },
    "lc:binary-tree-maximum-path-sum": {
      "name": "Binary Tree Maximum Path Sum",
      "url": "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
      "source": "leetcode",
      "hard": true
    },
    "lc:diameter-of-binary-tree": {
      "name": "Diameter of Binary Tree",
      "url": "https://leetcode.com/problems/diameter-of-binary-tree/",
      "source": "leetcode",
      "hard": false
    },
    "lc:path-sum-ii": {
      "name": "Path Sum II",
      "url": "https://leetcode.com/problems/path-sum-ii/",
      "source": "leetcode",
      "hard": false
    },
    "lc:sum-root-to-leaf-numbers": {
      "name": "Sum Root to Leaf Numbers",
      "url": "https://leetcode.com/problems/sum-root-to-leaf-numbers/",
      "source": "leetcode",
      "hard": false
    },
    "lc:pseudo-palindromic-paths-in-a-binary-tree": {
      "name": "Pseudo-Palindromic Paths in Binary Tree",
      "url": "https://leetcode.com/problems/pseudo-palindromic-paths-in-a-binary-tree/",
      "source": "leetcode",
      "hard": false
    },
    "lc:validate-binary-search-tree": {
      "name": "Validate BST",
      "url": "https://leetcode.com/problems/validate-binary-search-tree/",
      "source": "leetcode",
      "hard": false
    },
    "lc:kth-smallest-element-in-a-bst": {
      "name": "Kth Smallest Element in BST",
      "url": "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
      "source": "leetcode",
      "hard": false
    },
    "lc:insert-into-a-binary-search-tree": {
      "name": "Insert into BST",
      "url": "https://leetcode.com/problems/insert-into-a-binary-search-tree/",
      "source": "leetcode",
      "hard": false
    },
    "lc:delete-node-in-a-bst": {
      "name": "Delete Node in BST",
      "url": "https://leetcode.com/problems/delete-node-in-a-bst/",
      "source": "leetcode",
      "hard": false
    },
    "lc:lowest-common-ancestor-of-a-binary-search-tree": {
      "name": "Lowest Common Ancestor of BST",
      "url": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
      "source": "leetcode",
      "hard": false
    },
    "lc:convert-sorted-array-to-binary-search-tree": {
      "name": "Convert Sorted Array to BST",
      "url": "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/",
      "source": "leetcode",
      "hard": false
    },
    "lc:balance-a-binary-search-tree": {
      "name": "Balance a Binary Search Tree",
      "url": "https://leetcode.com/problems/balance-a-binary-search-tree/",
      "source": "leetcode",
      "hard": false
    },
    "lc:subsets": {
      "name": "Subsets",
      "url": "https://leetcode.com/problems/subsets/",
      "source": "leetcode",
      "hard": false
    },
    "lc:subsets-ii": {
      "name": "Subsets II",
      "url": "https://leetcode.com/problems/subsets-ii/",
      "source": "leetcode",
      "hard": false
    },
    "lc:letter-case-permutation": {
      "name": "Letter Case Permutation",
      "url": "https://leetcode.com/problems/letter-case-permutation/",
      "source": "leetcode",
      "hard": false
    },
    "lc:permutations": {
      "name": "Permutations",
      "url": "https://leetcode.com/problems/permutations/",
      "source": "leetcode",
      "hard": false
    },
    "lc:permutations-ii": {
      "name": "Permutations II",
      "url": "https://leetcode.com/problems/permutations-ii/",
      "source": "leetcode",
      "hard": false
    },
    "lc:combinations": {
      "name": "Combinations",
      "url": "https://leetcode.com/problems/combinations/",
      "source": "leetcode",
      "hard": false
    },
    "lc:combination-sum": {
      "name": "Combination Sum",
      "url": "https://leetcode.com/problems/combination-sum/",
      "source": "leetcode",
      "hard": false
    },
    "lc:combination-sum-ii": {
      "name": "Combination Sum II",
      "url": "https://leetcode.com/problems/combination-sum-ii/",
      "source": "leetcode",
      "hard": false
    },
    "lc:combination-sum-iii": {
      "name": "Combination Sum III",
      "url": "https://leetcode.com/problems/combination-sum-iii/",
      "source": "leetcode",
      "hard": false
    },
    "lc:word-search": {
      "name": "Word Search",
      "url": "https://leetcode.com/problems/word-search/",
      "source": "leetcode",
      "hard": false
    },
    "lc:word-search-ii": {
      "name": "Word Search II (Trie + BT)",
      "url": "https://leetcode.com/problems/word-search-ii/",
      "source": "leetcode",
      "hard": true
    },
    "lc:n-queens": {
      "name": "N-Queens",
      "url": "https://leetcode.com/problems/n-queens/",
      "source": "leetcode",
      "hard": true
    },
    "lc:sudoku-solver": {
      "name": "Sudoku Solver",
      "url": "https://leetcode.com/problems/sudoku-solver/",
      "source": "leetcode",
      "hard": true
    },
    "gfg:rat-in-a-maze-problem": {
      "name": "Rat in a Maze (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/rat-in-a-maze-problem/1",
      "source": "gfg",
      "hard": false
    },
    "lc:palindrome-partitioning": {
      "name": "Palindrome Partitioning",
      "url": "https://leetcode.com/problems/palindrome-partitioning/",
      "source": "leetcode",
      "hard": false
    },
    "lc:restore-ip-addresses": {
      "name": "Restore IP Addresses",
      "url": "https://leetcode.com/problems/restore-ip-addresses/",
      "source": "leetcode",
      "hard": false
    },
    "lc:generate-parentheses": {
      "name": "Generate Parentheses",
      "url": "https://leetcode.com/problems/generate-parentheses/",
      "source": "leetcode",
      "hard": false
    },
    "lc:letter-combinations-of-a-phone-number": {
      "name": "Letter Combinations of Phone Number",
      "url": "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
      "source": "leetcode",
      "hard": false
    },
    "lc:sort-an-array": {
      "name": "Sort an Array (Merge Sort)",
      "url": "https://leetcode.com/problems/sort-an-array/",
      "source": "leetcode",
      "hard": false
    },
    "lc:kth-largest-element-in-an-array": {
      "name": "Kth Largest Element (Quick Select)",
      "url": "https://leetcode.com/problems/kth-largest-element-in-an-array/",
      "source": "leetcode",
      "hard": false
    },
    "gfg:inversion-of-array-1587115620": {
      "name": "Count Inversions (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/inversion-of-array-1587115620/1",
      "source": "gfg",
      "hard": false
    },
    "lc:count-of-smaller-numbers-after-self": {
      "name": "Count Smaller Numbers After Self",
      "url": "https://leetcode.com/problems/count-of-smaller-numbers-after-self/",
      "source": "leetcode",
      "hard": true
    },
    "lc:climbing-stairs": {
      "name": "70. Climbing Stairs",
      "url": "https://leetcode.com/problems/climbing-stairs/",
      "source": "leetcode",
      "hard": false
    },
    "lc:min-cost-climbing-stairs": {
      "name": "746. Min Cost Climbing Stairs",
      "url": "https://leetcode.com/problems/min-cost-climbing-stairs/",
      "source": "leetcode",
      "hard": false
    },
    "lc:house-robber": {
      "name": "198. House Robber",
      "url": "https://leetcode.com/problems/house-robber/",
      "source": "leetcode",
      "hard": false
    },
    "lc:house-robber-ii": {
      "name": "213. House Robber II",
      "url": "https://leetcode.com/problems/house-robber-ii/",
      "source": "leetcode",
      "hard": false
    },
    "lc:decode-ways": {
      "name": "91. Decode Ways",
      "url": "https://leetcode.com/problems/decode-ways/",
      "source": "leetcode",
      "hard": false
    },
    "lc:word-break": {
      "name": "139. Word Break",
      "url": "https://leetcode.com/problems/word-break/",
      "source": "leetcode",
      "hard": false
    },
    "lc:longest-increasing-subsequence": {
      "name": "300. Longest Increasing Subsequence",
      "url": "https://leetcode.com/problems/longest-increasing-subsequence/",
      "source": "leetcode",
      "hard": false
    },
    "lc:coin-change": {
      "name": "322. Coin Change",
      "url": "https://leetcode.com/problems/coin-change/",
      "source": "leetcode",
      "hard": false
    },
    "lc:target-sum": {
      "name": "494. Target Sum",
      "url": "https://leetcode.com/problems/target-sum/",
      "source": "leetcode",
      "hard": false
    },
    "lc:partition-equal-subset-sum": {
      "name": "416. Partition Equal Subset Sum",
      "url": "https://leetcode.com/problems/partition-equal-subset-sum/",
      "source": "leetcode",
      "hard": false
    },
    "lc:coin-change-ii": {
      "name": "518. Coin Change II",
      "url": "https://leetcode.com/problems/coin-change-ii/",
      "source": "leetcode",
      "hard": false
    },
    "lc:ones-and-zeroes": {
      "name": "474. Ones and Zeroes",
      "url": "https://leetcode.com/problems/ones-and-zeroes/",
      "source": "leetcode",
      "hard": false
    },
    "lc:last-stone-weight-ii": {
      "name": "1049. Last Stone Weight II",
      "url": "https://leetcode.com/problems/last-stone-weight-ii/",
      "source": "leetcode",
      "hard": false
    },
    "lc:length-of-the-longest-subsequence-that-sums-to-target": {
      "name": "2915. Length of the Longest Subsequence That Sums to Target",
      "url": "https://leetcode.com/problems/length-of-the-longest-subsequence-that-sums-to-target/",
      "source": "leetcode",
      "hard": false
    },
    "lc:merge-intervals": {
      "name": "Merge Intervals",
      "url": "https://leetcode.com/problems/merge-intervals/",
      "source": "leetcode",
      "hard": false
    },
    "lc:non-overlapping-intervals": {
      "name": "Non-overlapping Intervals",
      "url": "https://leetcode.com/problems/non-overlapping-intervals/",
      "source": "leetcode",
      "hard": false
    },
    "lc:insert-interval": {
      "name": "Insert Interval",
      "url": "https://leetcode.com/problems/insert-interval/",
      "source": "leetcode",
      "hard": false
    },
    "lc:minimum-number-of-arrows-to-burst-balloons": {
      "name": "Minimum Number of Arrows to Burst Balloons",
      "url": "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/",
      "source": "leetcode",
      "hard": false
    },
    "gfg:n-meetings-in-one-room-1587115620": {
      "name": "Meeting Rooms II (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/n-meetings-in-one-room-1587115620/1",
      "source": "gfg",
      "hard": false
    },
    "lc:jump-game": {
      "name": "Jump Game",
      "url": "https://leetcode.com/problems/jump-game/",
      "source": "leetcode",
      "hard": false
    },
    "lc:jump-game-ii": {
      "name": "Jump Game II",
      "url": "https://leetcode.com/problems/jump-game-ii/",
      "source": "leetcode",
      "hard": false
    },
    "lc:jump-game-vii": {
      "name": "Jump Game VII",
      "url": "https://leetcode.com/problems/jump-game-vii/",
      "source": "leetcode",
      "hard": false
    },
    "gfg:activity-selection-1587115620": {
      "name": "Activity Selection (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/activity-selection-1587115620/1",
      "source": "gfg",
      "hard": false
    },
    "gfg:job-sequencing-problem-1587115620": {
      "name": "Job Sequencing with Deadlines (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/job-sequencing-problem-1587115620/1",
      "source": "gfg",
      "hard": false
    },
    "lc:task-scheduler": {
      "name": "Task Scheduler",
      "url": "https://leetcode.com/problems/task-scheduler/",
      "source": "leetcode",
      "hard": false
    },
    "gfg:minimum-number-of-platforms-required-for-a-railway-station-1587115620": {
      "name": "Minimum Platforms (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/minimum-number-of-platforms-required-for-a-railway-station-1587115620/1",
      "source": "gfg",
      "hard": false
    },
    "lc:assign-cookies": {
      "name": "Assign Cookies",
      "url": "https://leetcode.com/problems/assign-cookies/",
      "source": "leetcode",
      "hard": false
    },
    "lc:candy": {
      "name": "Candy",
      "url": "https://leetcode.com/problems/candy/",
      "source": "leetcode",
      "hard": true
    },
    "lc:gas-station": {
      "name": "Gas Station",
      "url": "https://leetcode.com/problems/gas-station/",
      "source": "leetcode",
      "hard": false
    },
    "lc:boats-to-save-people": {
      "name": "Boats to Save People",
      "url": "https://leetcode.com/problems/boats-to-save-people/",
      "source": "leetcode",
      "hard": false
    },
    "lc:lemonade-change": {
      "name": "Lemonade Change",
      "url": "https://leetcode.com/problems/lemonade-change/",
      "source": "leetcode",
      "hard": false
    },
    "gfg:minimum-cost-of-ropes-1587115620": {
      "name": "Minimum Cost of Ropes (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/minimum-cost-of-ropes-1587115620/1",
      "source": "gfg",
      "hard": false
    },
    "lc:minimum-cost-to-connect-sticks": {
      "name": "Minimum Cost to Connect Sticks",
      "url": "https://leetcode.com/problems/minimum-cost-to-connect-sticks/",
      "source": "leetcode",
      "hard": false
    },
    "lc:k-closest-points-to-origin": {
      "name": "K Closest Points to Origin",
      "url": "https://leetcode.com/problems/k-closest-points-to-origin/",
      "source": "leetcode",
      "hard": false
    },
    "lc:kth-largest-element-in-a-stream": {
      "name": "Kth Largest Element in a Stream",
      "url": "https://leetcode.com/problems/kth-largest-element-in-a-stream/",
      "source": "leetcode",
      "hard": false
    },
    "lc:find-k-pairs-with-smallest-sums": {
      "name": "Find K Pairs with Smallest Sums",
      "url": "https://leetcode.com/problems/find-k-pairs-with-smallest-sums/",
      "source": "leetcode",
      "hard": false
    },
    "lc:smallest-range-covering-elements-from-k-lists": {
      "name": "Smallest Range Covering Elements from K Lists",
      "url": "https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/",
      "source": "leetcode",
      "hard": true
    },
    "lc:reorganize-string": {
      "name": "Reorganize String",
      "url": "https://leetcode.com/problems/reorganize-string/",
      "source": "leetcode",
      "hard": false
    },
    "lc:ipo": {
      "name": "IPO",
      "url": "https://leetcode.com/problems/ipo/",
      "source": "leetcode",
      "hard": false
    },
    "gfg:huffman-encoding3345": {
      "name": "Huffman Encoding (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/huffman-encoding3345/1",
      "source": "gfg",
      "hard": false
    },
    "lc:find-median-from-data-stream": {
      "name": "Find Median from Data Stream",
      "url": "https://leetcode.com/problems/find-median-from-data-stream/",
      "source": "leetcode",
      "hard": true
    },
    "lc:sliding-window-median": {
      "name": "Sliding Window Median",
      "url": "https://leetcode.com/problems/sliding-window-median/",
      "source": "leetcode",
      "hard": true
    },
    "lc:number-of-islands": {
      "name": "Number of Islands",
      "url": "https://leetcode.com/problems/number-of-islands/",
      "source": "leetcode",
      "hard": false
    },
    "lc:flood-fill": {
      "name": "Flood Fill",
      "url": "https://leetcode.com/problems/flood-fill/",
      "source": "leetcode",
      "hard": false
    },
    "lc:clone-graph": {
      "name": "Clone Graph",
      "url": "https://leetcode.com/problems/clone-graph/",
      "source": "leetcode",
      "hard": false
    },
    "lc:number-of-provinces": {
      "name": "Number of Provinces",
      "url": "https://leetcode.com/problems/number-of-provinces/",
      "source": "leetcode",
      "hard": false
    },
    "lc:max-area-of-island": {
      "name": "Max Area of Island",
      "url": "https://leetcode.com/problems/max-area-of-island/",
      "source": "leetcode",
      "hard": false
    },
    "lc:course-schedule": {
      "name": "Course Schedule",
      "url": "https://leetcode.com/problems/course-schedule/",
      "source": "leetcode",
      "hard": false
    },
    "lc:course-schedule-ii": {
      "name": "Course Schedule II",
      "url": "https://leetcode.com/problems/course-schedule-ii/",
      "source": "leetcode",
      "hard": false
    },
    "lc:find-eventual-safe-states": {
      "name": "Find Eventual Safe States",
      "url": "https://leetcode.com/problems/find-eventual-safe-states/",
      "source": "leetcode",
      "hard": false
    },
    "gfg:alien-dictionary": {
      "name": "Alien Dictionary (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/alien-dictionary/1",
      "source": "gfg",
      "hard": false
    },
    "lc:longest-path-with-different-adjacent-characters": {
      "name": "Longest Path With Different Adjacent Characters",
      "url": "https://leetcode.com/problems/longest-path-with-different-adjacent-characters/",
      "source": "leetcode",
      "hard": false
    },
    "lc:redundant-connection": {
      "name": "Redundant Connection",
      "url": "https://leetcode.com/problems/redundant-connection/",
      "source": "leetcode",
      "hard": false
    },
    "lc:accounts-merge": {
      "name": "Accounts Merge",
      "url": "https://leetcode.com/problems/accounts-merge/",
      "source": "leetcode",
      "hard": false
    },
    "lc:number-of-operations-to-make-network-connected": {
      "name": "Number of Operations to Make Network Connected",
      "url": "https://leetcode.com/problems/number-of-operations-to-make-network-connected/",
      "source": "leetcode",
      "hard": false
    },
    "lc:satisfiability-of-equality-equations": {
      "name": "Satisfiability of Equality Equations",
      "url": "https://leetcode.com/problems/satisfiability-of-equality-equations/",
      "source": "leetcode",
      "hard": false
    },
    "lc:most-stones-removed-with-same-row-or-column": {
      "name": "Most Stones Removed",
      "url": "https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/",
      "source": "leetcode",
      "hard": false
    },
    "lc:rotting-oranges": {
      "name": "Rotten Oranges",
      "url": "https://leetcode.com/problems/rotting-oranges/",
      "source": "leetcode",
      "hard": false
    },
    "lc:01-matrix": {
      "name": "01 Matrix",
      "url": "https://leetcode.com/problems/01-matrix/",
      "source": "leetcode",
      "hard": false
    },
    "lc:pacific-atlantic-water-flow": {
      "name": "Pacific Atlantic Water Flow",
      "url": "https://leetcode.com/problems/pacific-atlantic-water-flow/",
      "source": "leetcode",
      "hard": false
    },
    "gfg:distance-of-nearest-cell-having-1-1587115620": {
      "name": "Walls and Gates (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/distance-of-nearest-cell-having-1-1587115620/1",
      "source": "gfg",
      "hard": false
    },
    "lc:shortest-path-in-binary-matrix": {
      "name": "Shortest Path in Binary Matrix",
      "url": "https://leetcode.com/problems/shortest-path-in-binary-matrix/",
      "source": "leetcode",
      "hard": false
    },
    "gfg:nearest-1-in-binary-matrix": {
      "name": "Nearest 1 in Binary Matrix (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/nearest-1-in-binary-matrix/1",
      "source": "gfg",
      "hard": false
    },
    "gfg:detect-cycle-in-a-directed-graph": {
      "name": "Detect Cycle in Directed Graph (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/detect-cycle-in-a-directed-graph/1",
      "source": "gfg",
      "hard": false
    },
    "gfg:detect-cycle-in-an-undirected-graph": {
      "name": "Detect Cycle in Undirected Graph (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/detect-cycle-in-an-undirected-graph/1",
      "source": "gfg",
      "hard": false
    },
    "lc:network-delay-time": {
      "name": "Network Delay Time (Dijkstra)",
      "url": "https://leetcode.com/problems/network-delay-time/",
      "source": "leetcode",
      "hard": false
    },
    "lc:cheapest-flights-within-k-stops": {
      "name": "Cheapest Flights Within K Stops (Bellman-Ford)",
      "url": "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
      "source": "leetcode",
      "hard": false
    },
    "lc:path-with-minimum-effort": {
      "name": "Path With Minimum Effort",
      "url": "https://leetcode.com/problems/path-with-minimum-effort/",
      "source": "leetcode",
      "hard": false
    },
    "lc:find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance": {
      "name": "Find the City (Floyd-Warshall)",
      "url": "https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/",
      "source": "leetcode",
      "hard": false
    },
    "gfg:implementing-dijkstra-set-1-adjacency-matrix": {
      "name": "Dijkstra Algorithm (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/implementing-dijkstra-set-1-adjacency-matrix/1",
      "source": "gfg",
      "hard": false
    },
    "lc:min-cost-to-connect-all-points": {
      "name": "Min Cost to Connect All Points",
      "url": "https://leetcode.com/problems/min-cost-to-connect-all-points/",
      "source": "leetcode",
      "hard": false
    },
    "gfg:minimum-spanning-tree": {
      "name": "Kruskal Algorithm (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/minimum-spanning-tree/1",
      "source": "gfg",
      "hard": false
    },
    "lc:swim-in-rising-water": {
      "name": "Swim in Rising Water",
      "url": "https://leetcode.com/problems/swim-in-rising-water/",
      "source": "leetcode",
      "hard": true
    },
    "lc:is-graph-bipartite": {
      "name": "Is Graph Bipartite",
      "url": "https://leetcode.com/problems/is-graph-bipartite/",
      "source": "leetcode",
      "hard": false
    },
    "lc:possible-bipartition": {
      "name": "Possible Bipartition",
      "url": "https://leetcode.com/problems/possible-bipartition/",
      "source": "leetcode",
      "hard": false
    },
    "lc:unique-paths": {
      "name": "62. Unique Paths",
      "url": "https://leetcode.com/problems/unique-paths/",
      "source": "leetcode",
      "hard": false
    },
    "lc:unique-paths-ii": {
      "name": "63. Unique Paths II",
      "url": "https://leetcode.com/problems/unique-paths-ii/",
      "source": "leetcode",
      "hard": false
    },
    "lc:minimum-path-sum": {
      "name": "64. Minimum Path Sum",
      "url": "https://leetcode.com/problems/minimum-path-sum/",
      "source": "leetcode",
      "hard": false
    },
    "lc:longest-common-subsequence": {
      "name": "1143. Longest Common Subsequence",
      "url": "https://leetcode.com/problems/longest-common-subsequence/",
      "source": "leetcode",
      "hard": false
    },
    "lc:edit-distance": {
      "name": "72. Edit Distance",
      "url": "https://leetcode.com/problems/edit-distance/",
      "source": "leetcode",
      "hard": false
    },
    "lc:maximal-square": {
      "name": "221. Maximal Square",
      "url": "https://leetcode.com/problems/maximal-square/",
      "source": "leetcode",
      "hard": false
    },
    "lc:is-subsequence": {
      "name": "392. Is Subsequence",
      "url": "https://leetcode.com/problems/is-subsequence/",
      "source": "leetcode",
      "hard": false
    },
    "lc:longest-palindromic-substring": {
      "name": "5. Longest Palindromic Substring",
      "url": "https://leetcode.com/problems/longest-palindromic-substring/",
      "source": "leetcode",
      "hard": false
    },
    "lc:palindromic-substrings": {
      "name": "647. Palindromic Substrings",
      "url": "https://leetcode.com/problems/palindromic-substrings/",
      "source": "leetcode",
      "hard": false
    },
    "lc:shortest-common-supersequence": {
      "name": "1092. Shortest Common Supersequence",
      "url": "https://leetcode.com/problems/shortest-common-supersequence/",
      "source": "leetcode",
      "hard": true
    },
    "lc:distinct-subsequences": {
      "name": "115. Distinct Subsequences",
      "url": "https://leetcode.com/problems/distinct-subsequences/",
      "source": "leetcode",
      "hard": true
    },
    "lc:minimum-insertion-steps-to-make-a-string-palindrome": {
      "name": "1312. Minimum Insertion Steps to Make a String Palindrome",
      "url": "https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/",
      "source": "leetcode",
      "hard": false
    },
    "lc:number-of-longest-increasing-subsequence": {
      "name": "673. Number of Longest Increasing Subsequences",
      "url": "https://leetcode.com/problems/number-of-longest-increasing-subsequence/",
      "source": "leetcode",
      "hard": false
    },
    "lc:longest-arithmetic-subsequence": {
      "name": "1027. Longest Arithmetic Subsequence",
      "url": "https://leetcode.com/problems/longest-arithmetic-subsequence/",
      "source": "leetcode",
      "hard": false
    },
    "lc:minimum-falling-path-sum": {
      "name": "931. Minimum Falling Path Sum",
      "url": "https://leetcode.com/problems/minimum-falling-path-sum/",
      "source": "leetcode",
      "hard": false
    },
    "lc:longest-increasing-path-in-a-matrix": {
      "name": "329. Longest Increasing Path in a Matrix",
      "url": "https://leetcode.com/problems/longest-increasing-path-in-a-matrix/",
      "source": "leetcode",
      "hard": false
    },
    "lc:dungeon-game": {
      "name": "174. Dungeon Game",
      "url": "https://leetcode.com/problems/dungeon-game/",
      "source": "leetcode",
      "hard": true
    },
    "lc:best-time-to-buy-and-sell-stock": {
      "name": "121. Best Time to Buy and Sell Stock",
      "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
      "source": "leetcode",
      "hard": false
    },
    "lc:best-time-to-buy-and-sell-stock-ii": {
      "name": "122. Best Time to Buy and Sell Stock II",
      "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/",
      "source": "leetcode",
      "hard": false
    },
    "lc:best-time-to-buy-and-sell-stock-iii": {
      "name": "123. Best Time to Buy and Sell Stock III",
      "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/",
      "source": "leetcode",
      "hard": true
    },
    "lc:best-time-to-buy-and-sell-stock-iv": {
      "name": "188. Best Time to Buy and Sell Stock IV",
      "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/",
      "source": "leetcode",
      "hard": true
    },
    "lc:best-time-to-buy-and-sell-stock-with-cooldown": {
      "name": "309. Best Time to Buy and Sell Stock with Cooldown",
      "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/",
      "source": "leetcode",
      "hard": false
    },
    "lc:best-time-to-buy-and-sell-stock-with-transaction-fee": {
      "name": "714. Best Time to Buy and Sell Stock with Transaction Fee",
      "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/",
      "source": "leetcode",
      "hard": false
    },
    "lc:palindrome-partitioning-ii": {
      "name": "132. Palindrome Partitioning II",
      "url": "https://leetcode.com/problems/palindrome-partitioning-ii/",
      "source": "leetcode",
      "hard": true
    },
    "lc:largest-sum-of-averages": {
      "name": "813. Largest Sum of Averages",
      "url": "https://leetcode.com/problems/largest-sum-of-averages/",
      "source": "leetcode",
      "hard": false
    },
    "lc:minimum-cost-to-cut-a-stick": {
      "name": "1547. Minimum Cost to Cut a Stick",
      "url": "https://leetcode.com/problems/minimum-cost-to-cut-a-stick/",
      "source": "leetcode",
      "hard": true
    },
    "lc:partition-array-for-maximum-sum": {
      "name": "1043. Partition Array for Maximum Sum",
      "url": "https://leetcode.com/problems/partition-array-for-maximum-sum/",
      "source": "leetcode",
      "hard": false
    },
    "lc:longest-palindromic-subsequence": {
      "name": "516. Longest Palindromic Subsequence",
      "url": "https://leetcode.com/problems/longest-palindromic-subsequence/",
      "source": "leetcode",
      "hard": false
    },
    "lc:burst-balloons": {
      "name": "312. Burst Balloons",
      "url": "https://leetcode.com/problems/burst-balloons/",
      "source": "leetcode",
      "hard": true
    },
    "lc:minimum-score-triangulation-of-polygon": {
      "name": "1039. Minimum Score Triangulation of Polygon",
      "url": "https://leetcode.com/problems/minimum-score-triangulation-of-polygon/",
      "source": "leetcode",
      "hard": false
    },
    "lc:guess-number-higher-or-lower-ii": {
      "name": "375. Guess Number Higher or Lower II",
      "url": "https://leetcode.com/problems/guess-number-higher-or-lower-ii/",
      "source": "leetcode",
      "hard": false
    },
    "lc:strange-printer": {
      "name": "664. Strange Printer",
      "url": "https://leetcode.com/problems/strange-printer/",
      "source": "leetcode",
      "hard": true
    },
    "lc:beautiful-arrangement": {
      "name": "526. Beautiful Arrangement",
      "url": "https://leetcode.com/problems/beautiful-arrangement/",
      "source": "leetcode",
      "hard": false
    },
    "lc:fair-distribution-of-cookies": {
      "name": "2305. Fair Distribution of Cookies",
      "url": "https://leetcode.com/problems/fair-distribution-of-cookies/",
      "source": "leetcode",
      "hard": false
    },
    "lc:shortest-path-visiting-all-nodes": {
      "name": "847. Shortest Path Visiting All Nodes",
      "url": "https://leetcode.com/problems/shortest-path-visiting-all-nodes/",
      "source": "leetcode",
      "hard": true
    },
    "lc:smallest-sufficient-team": {
      "name": "1125. Smallest Sufficient Team",
      "url": "https://leetcode.com/problems/smallest-sufficient-team/",
      "source": "leetcode",
      "hard": true
    },
    "lc:stickers-to-spell-word": {
      "name": "691. Stickers to Spell Word",
      "url": "https://leetcode.com/problems/stickers-to-spell-word/",
      "source": "leetcode",
      "hard": true
    },
    "lc:count-numbers-with-unique-digits": {
      "name": "357. Count Numbers with Unique Digits",
      "url": "https://leetcode.com/problems/count-numbers-with-unique-digits/",
      "source": "leetcode",
      "hard": false
    },
    "lc:count-sorted-vowel-strings": {
      "name": "1641. Count Sorted Vowel Strings",
      "url": "https://leetcode.com/problems/count-sorted-vowel-strings/",
      "source": "leetcode",
      "hard": false
    },
    "lc:number-of-digit-one": {
      "name": "233. Number of Digit One",
      "url": "https://leetcode.com/problems/number-of-digit-one/",
      "source": "leetcode",
      "hard": true
    },
    "lc:count-special-integers": {
      "name": "2376. Count Special Integers",
      "url": "https://leetcode.com/problems/count-special-integers/",
      "source": "leetcode",
      "hard": false
    },
    "lc:numbers-at-most-n-given-digit-set": {
      "name": "902. Numbers At Most N Given Digit Set",
      "url": "https://leetcode.com/problems/numbers-at-most-n-given-digit-set/",
      "source": "leetcode",
      "hard": true
    },
    "lc:house-robber-iii": {
      "name": "337. House Robber III",
      "url": "https://leetcode.com/problems/house-robber-iii/",
      "source": "leetcode",
      "hard": false
    },
    "lc:binary-tree-cameras": {
      "name": "968. Binary Tree Cameras",
      "url": "https://leetcode.com/problems/binary-tree-cameras/",
      "source": "leetcode",
      "hard": true
    },
    "lc:maximum-product-of-splitted-binary-tree": {
      "name": "1339. Maximum Product of Splitted Binary Tree",
      "url": "https://leetcode.com/problems/maximum-product-of-splitted-binary-tree/",
      "source": "leetcode",
      "hard": false
    },
    "lc:out-of-boundary-paths": {
      "name": "576. Out of Boundary Paths",
      "url": "https://leetcode.com/problems/out-of-boundary-paths/",
      "source": "leetcode",
      "hard": false
    },
    "lc:word-break-ii": {
      "name": "140. Word Break II",
      "url": "https://leetcode.com/problems/word-break-ii/",
      "source": "leetcode",
      "hard": true
    },
    "lc:number-of-ways-of-cutting-a-pizza": {
      "name": "1444. Number of Ways of Cutting a Pizza",
      "url": "https://leetcode.com/problems/number-of-ways-of-cutting-a-pizza/",
      "source": "leetcode",
      "hard": true
    },
    "lc:count-ways-to-build-good-strings": {
      "name": "2466. Count Ways to Build Good Strings",
      "url": "https://leetcode.com/problems/count-ways-to-build-good-strings/",
      "source": "leetcode",
      "hard": false
    },
    "lc:largest-number": {
      "name": "Largest Number",
      "url": "https://leetcode.com/problems/largest-number/",
      "source": "leetcode",
      "hard": false
    },
    "lc:maximum-gap": {
      "name": "Maximum Gap (Bucket Sort)",
      "url": "https://leetcode.com/problems/maximum-gap/",
      "source": "leetcode",
      "hard": true
    },
    "lc:wiggle-sort-ii": {
      "name": "Wiggle Sort II",
      "url": "https://leetcode.com/problems/wiggle-sort-ii/",
      "source": "leetcode",
      "hard": false
    },
    "lc:top-k-frequent-words": {
      "name": "Top K Frequent Words",
      "url": "https://leetcode.com/problems/top-k-frequent-words/",
      "source": "leetcode",
      "hard": false
    },
    "gfg:merge-sort": {
      "name": "Merge Sort (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/merge-sort/1",
      "source": "gfg",
      "hard": false
    },
    "gfg:quick-sort": {
      "name": "Quick Sort (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/quick-sort/1",
      "source": "gfg",
      "hard": false
    },
    "gfg:heap-sort": {
      "name": "Heap Sort (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/heap-sort/1",
      "source": "gfg",
      "hard": false
    },
    "gfg:counting-sort": {
      "name": "Counting Sort (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/counting-sort/1",
      "source": "gfg",
      "hard": false
    },
    "lc:implement-trie-prefix-tree": {
      "name": "Implement Trie (Prefix Tree)",
      "url": "https://leetcode.com/problems/implement-trie-prefix-tree/",
      "source": "leetcode",
      "hard": false
    },
    "lc:add-and-search-word-data-structure": {
      "name": "Add and Search Word",
      "url": "https://leetcode.com/problems/add-and-search-word-data-structure/",
      "source": "leetcode",
      "hard": false
    },
    "lc:replace-words": {
      "name": "Replace Words",
      "url": "https://leetcode.com/problems/replace-words/",
      "source": "leetcode",
      "hard": false
    },
    "lc:search-suggestions-system": {
      "name": "Search Suggestions System",
      "url": "https://leetcode.com/problems/search-suggestions-system/",
      "source": "leetcode",
      "hard": false
    },
    "lc:implement-magic-dictionary": {
      "name": "Implement Magic Dictionary",
      "url": "https://leetcode.com/problems/implement-magic-dictionary/",
      "source": "leetcode",
      "hard": false
    },
    "lc:prefix-and-suffix-search": {
      "name": "Prefix and Suffix Search",
      "url": "https://leetcode.com/problems/prefix-and-suffix-search/",
      "source": "leetcode",
      "hard": true
    },
    "lc:maximum-xor-of-two-numbers-in-an-array": {
      "name": "Maximum XOR of Two Numbers",
      "url": "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",
      "source": "leetcode",
      "hard": false
    },
    "lc:maximum-xor-with-an-element-from-array": {
      "name": "Maximum XOR With an Element From Array",
      "url": "https://leetcode.com/problems/maximum-xor-with-an-element-from-array/",
      "source": "leetcode",
      "hard": true
    },
    "gfg:count-pairs-with-given-xor": {
      "name": "Count Pairs With XOR in a Range (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/count-pairs-with-given-xor/1",
      "source": "gfg",
      "hard": false
    },
    "lc:single-number-iii": {
      "name": "260. Single Number III",
      "url": "https://leetcode.com/problems/single-number-iii/",
      "source": "leetcode",
      "hard": false
    },
    "lc:missing-number": {
      "name": "268. Missing Number",
      "url": "https://leetcode.com/problems/missing-number/",
      "source": "leetcode",
      "hard": false
    },
    "lc:xor-queries-of-a-subarray": {
      "name": "1829. XOR Queries of a Subarray",
      "url": "https://leetcode.com/problems/xor-queries-of-a-subarray/",
      "source": "leetcode",
      "hard": false
    },
    "lc:maximum-xor-after-operations": {
      "name": "2317. Maximum XOR After Operations",
      "url": "https://leetcode.com/problems/maximum-xor-after-operations/",
      "source": "leetcode",
      "hard": false
    },
    "lc:reverse-bits": {
      "name": "190. Reverse Bits",
      "url": "https://leetcode.com/problems/reverse-bits/",
      "source": "leetcode",
      "hard": false
    },
    "lc:power-of-two": {
      "name": "231. Power of Two",
      "url": "https://leetcode.com/problems/power-of-two/",
      "source": "leetcode",
      "hard": false
    },
    "lc:binary-number-with-alternating-bits": {
      "name": "693. Binary Number with Alternating Bits",
      "url": "https://leetcode.com/problems/binary-number-with-alternating-bits/",
      "source": "leetcode",
      "hard": false
    },
    "lc:number-of-steps-to-reduce-a-number-in-binary-representation": {
      "name": "1404. Number of Steps to Reduce a Number in Binary",
      "url": "https://leetcode.com/problems/number-of-steps-to-reduce-a-number-in-binary-representation/",
      "source": "leetcode",
      "hard": false
    },
    "lc:number-of-1-bits": {
      "name": "191. Number of 1 Bits",
      "url": "https://leetcode.com/problems/number-of-1-bits/",
      "source": "leetcode",
      "hard": false
    },
    "lc:counting-bits": {
      "name": "338. Counting Bits",
      "url": "https://leetcode.com/problems/counting-bits/",
      "source": "leetcode",
      "hard": false
    },
    "lc:bitwise-and-of-numbers-range": {
      "name": "201. Bitwise AND of Numbers Range",
      "url": "https://leetcode.com/problems/bitwise-and-of-numbers-range/",
      "source": "leetcode",
      "hard": false
    },
    "lc:sum-of-two-integers": {
      "name": "371. Sum of Two Integers",
      "url": "https://leetcode.com/problems/sum-of-two-integers/",
      "source": "leetcode",
      "hard": false
    },
    "lc:minimum-flips-to-make-a-or-b-equal-to-c": {
      "name": "1318. Minimum Flips to Make a OR b Equal to c",
      "url": "https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c/",
      "source": "leetcode",
      "hard": false
    },
    "lc:minimum-operations-to-make-binary-array-elements-equal-to-one-i": {
      "name": "3191. Minimum Operations to Make Binary Array Elements Equal to One I",
      "url": "https://leetcode.com/problems/minimum-operations-to-make-binary-array-elements-equal-to-one-i/",
      "source": "leetcode",
      "hard": false
    },
    "lc:count-number-of-maximum-bitwise-or-subsets": {
      "name": "2044. Count Number of Maximum Bitwise-OR Subsets",
      "url": "https://leetcode.com/problems/count-number-of-maximum-bitwise-or-subsets/",
      "source": "leetcode",
      "hard": false
    },
    "lc:maximum-product-of-word-lengths": {
      "name": "318. Maximum Product of Word Lengths",
      "url": "https://leetcode.com/problems/maximum-product-of-word-lengths/",
      "source": "leetcode",
      "hard": false
    },
    "lc:maximum-score-words-formed-by-letters": {
      "name": "1255. Maximum Score Words Formed by Letters",
      "url": "https://leetcode.com/problems/maximum-score-words-formed-by-letters/",
      "source": "leetcode",
      "hard": false
    },
    "lc:count-complete-tree-nodes": {
      "name": "222. Count Complete Tree Nodes",
      "url": "https://leetcode.com/problems/count-complete-tree-nodes/",
      "source": "leetcode",
      "hard": false
    },
    "lc:check-if-a-string-contains-all-binary-codes-of-size-k": {
      "name": "1461. Check If a String Contains All Binary Codes of Size K",
      "url": "https://leetcode.com/problems/check-if-a-string-contains-all-binary-codes-of-size-k/",
      "source": "leetcode",
      "hard": false
    },
    "lc:k-th-symbol-in-grammar": {
      "name": "779. K-th Symbol in Grammar",
      "url": "https://leetcode.com/problems/k-th-symbol-in-grammar/",
      "source": "leetcode",
      "hard": false
    },
    "lc:minimum-bit-flips-to-convert-number": {
      "name": "2220. Minimum Bit Flips to Convert Number",
      "url": "https://leetcode.com/problems/minimum-bit-flips-to-convert-number/",
      "source": "leetcode",
      "hard": false
    },
    "lc:smallest-subarrays-with-maximum-bitwise-or": {
      "name": "2411. Smallest Subarrays With Maximum Bitwise OR",
      "url": "https://leetcode.com/problems/smallest-subarrays-with-maximum-bitwise-or/",
      "source": "leetcode",
      "hard": false
    },
    "lc:largest-number-after-digit-swaps-by-parity": {
      "name": "2419. Largest Number After Digit Swaps by Parity",
      "url": "https://leetcode.com/problems/largest-number-after-digit-swaps-by-parity/",
      "source": "leetcode",
      "hard": false
    },
    "lc:total-hamming-distance": {
      "name": "477. Total Hamming Distance",
      "url": "https://leetcode.com/problems/total-hamming-distance/",
      "source": "leetcode",
      "hard": false
    },
    "lc:find-kth-largest-xor-coordinate-value": {
      "name": "1738. Find Kth Largest XOR Coordinate Value",
      "url": "https://leetcode.com/problems/find-kth-largest-xor-coordinate-value/",
      "source": "leetcode",
      "hard": false
    },
    "lc:count-triplets-that-can-form-two-arrays-of-equal-xor": {
      "name": "1442. Count Triplets That Can Form Two Arrays of Equal XOR",
      "url": "https://leetcode.com/problems/count-triplets-that-can-form-two-arrays-of-equal-xor/",
      "source": "leetcode",
      "hard": false
    },
    "lc:implement-queue-using-stacks": {
      "name": "Implement Queue using Stacks",
      "url": "https://leetcode.com/problems/implement-queue-using-stacks/",
      "source": "leetcode",
      "hard": false
    },
    "lc:design-circular-queue": {
      "name": "Design Circular Queue",
      "url": "https://leetcode.com/problems/design-circular-queue/",
      "source": "leetcode",
      "hard": false
    },
    "lc:design-circular-deque": {
      "name": "Design Circular Deque",
      "url": "https://leetcode.com/problems/design-circular-deque/",
      "source": "leetcode",
      "hard": false
    },
    "gfg:first-negative-integer-in-every-window-of-size-k3345": {
      "name": "First Negative in Window (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/first-negative-integer-in-every-window-of-size-k3345/1",
      "source": "gfg",
      "hard": false
    },
    "lc:range-sum-query-mutable": {
      "name": "Range Sum Query — Mutable",
      "url": "https://leetcode.com/problems/range-sum-query-mutable/",
      "source": "leetcode",
      "hard": false
    },
    "gfg:segment-tree": {
      "name": "Segment Tree (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/segment-tree/1",
      "source": "gfg",
      "hard": false
    },
    "gfg:range-minimum-query": {
      "name": "Range Minimum Query (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/range-minimum-query/1",
      "source": "gfg",
      "hard": false
    },
    "lc:falling-squares": {
      "name": "Falling Squares",
      "url": "https://leetcode.com/problems/falling-squares/",
      "source": "leetcode",
      "hard": true
    },
    "lc:reverse-pairs": {
      "name": "Number of Reverse Pairs",
      "url": "https://leetcode.com/problems/reverse-pairs/",
      "source": "leetcode",
      "hard": true
    },
    "gfg:binary-indexed-tree-or-fenwick-tree": {
      "name": "BIT / Fenwick Tree (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/binary-indexed-tree-or-fenwick-tree/1",
      "source": "gfg",
      "hard": false
    },
    "lc:count-of-range-sum": {
      "name": "Count Range Sum",
      "url": "https://leetcode.com/problems/count-of-range-sum/",
      "source": "leetcode",
      "hard": true
    },
    "gfg:sparse-table": {
      "name": "Range Min Query — Sparse Table (GFG)",
      "url": "https://www.geeksforgeeks.org/problems/sparse-table/1",
      "source": "gfg",
      "hard": false
    }
  }
};
