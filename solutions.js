/* ============================================================
   DSA Master Sheets — Revision data
   For every pattern: a short curated set of signature questions,
   each with a one-line approach, complexity, and a Python solution.
   Question metadata (name/url/hard) is pulled from QUESTION_BANK by id,
   so progress/status stays in sync with the rest of the app.
   ============================================================ */

const REVISION_DATA = [

  /* ===== Tier 1 · Arrays ================================================= */
  {
    id: 'bs-index', title: 'Binary search — on index', color: '#378ADD', tier: 1, section: 'Arrays',
    intro: 'Sorted/monotonic array → halve the search space each step. Watch the loop invariant (lo<=hi vs lo<hi) and which half is sorted.',
    questions: [
      {
        id: 'lc:binary-search',
        approach: 'Classic [lo, hi] search; move the boundary that cannot contain the target.',
        complexity: 'O(log n) time · O(1) space',
        code: `class Solution:
    def search(self, nums, target):
        lo, hi = 0, len(nums) - 1
        while lo <= hi:
            mid = (lo + hi) // 2
            if nums[mid] == target:
                return mid
            if nums[mid] < target:
                lo = mid + 1
            else:
                hi = mid - 1
        return -1`
      },
      {
        id: 'lc:find-first-and-last-position-of-element-in-sorted-array',
        approach: 'lower_bound(target) gives the first index; lower_bound(target+1)-1 gives the last.',
        complexity: 'O(log n) time · O(1) space',
        code: `class Solution:
    def searchRange(self, nums, target):
        def lower_bound(x):
            lo, hi = 0, len(nums)
            while lo < hi:
                mid = (lo + hi) // 2
                if nums[mid] < x:
                    lo = mid + 1
                else:
                    hi = mid
            return lo

        start = lower_bound(target)
        if start == len(nums) or nums[start] != target:
            return [-1, -1]
        return [start, lower_bound(target + 1) - 1]`
      },
      {
        id: 'lc:search-in-rotated-sorted-array',
        approach: 'One half is always sorted — decide which, then check if target lies inside it.',
        complexity: 'O(log n) time · O(1) space',
        code: `class Solution:
    def search(self, nums, target):
        lo, hi = 0, len(nums) - 1
        while lo <= hi:
            mid = (lo + hi) // 2
            if nums[mid] == target:
                return mid
            if nums[lo] <= nums[mid]:            # left half sorted
                if nums[lo] <= target < nums[mid]:
                    hi = mid - 1
                else:
                    lo = mid + 1
            else:                                 # right half sorted
                if nums[mid] < target <= nums[hi]:
                    lo = mid + 1
                else:
                    hi = mid - 1
        return -1`
      },
      {
        id: 'lc:search-a-2d-matrix',
        approach: 'Treat the m×n matrix as one sorted array of length m*n; map mid → (mid//n, mid%n).',
        complexity: 'O(log(m·n)) time · O(1) space',
        code: `class Solution:
    def searchMatrix(self, matrix, target):
        m, n = len(matrix), len(matrix[0])
        lo, hi = 0, m * n - 1
        while lo <= hi:
            mid = (lo + hi) // 2
            val = matrix[mid // n][mid % n]
            if val == target:
                return True
            if val < target:
                lo = mid + 1
            else:
                hi = mid - 1
        return False`
      }
    ]
  },

  {
    id: 'bs-answer', title: 'Binary search — on answer', color: '#1D9E75', tier: 1, section: 'Arrays',
    intro: 'Binary search over the *value range* of the answer. Write a feasible(x) check that is monotonic, then find the smallest/largest feasible x.',
    questions: [
      {
        id: 'lc:koko-eating-bananas',
        approach: 'Search speed in [1, max(pile)]; feasible if total hours at that speed ≤ h.',
        complexity: 'O(n log(max pile)) time · O(1) space',
        code: `class Solution:
    def minEatingSpeed(self, piles, h):
        def hours(speed):
            return sum((p + speed - 1) // speed for p in piles)

        lo, hi = 1, max(piles)
        while lo < hi:
            mid = (lo + hi) // 2
            if hours(mid) <= h:
                hi = mid
            else:
                lo = mid + 1
        return lo`
      },
      {
        id: 'lc:split-array-largest-sum',
        approach: 'Search the max allowed subarray sum in [max, total]; greedily count parts needed.',
        complexity: 'O(n log(total)) time · O(1) space',
        code: `class Solution:
    def splitArray(self, nums, k):
        def parts_needed(cap):
            parts, cur = 1, 0
            for x in nums:
                if cur + x > cap:
                    parts += 1
                    cur = x
                else:
                    cur += x
            return parts

        lo, hi = max(nums), sum(nums)
        while lo < hi:
            mid = (lo + hi) // 2
            if parts_needed(mid) <= k:
                hi = mid
            else:
                lo = mid + 1
        return lo`
      },
      {
        id: 'gfg:aggressive-cows',
        approach: 'Sort stalls, search the min gap; feasible if we can place all cows ≥ gap apart.',
        complexity: 'O(n log n + n log(range)) time · O(1) space',
        code: `def aggressiveCows(stalls, k):
    stalls.sort()

    def can_place(dist):
        count, last = 1, stalls[0]
        for s in stalls[1:]:
            if s - last >= dist:
                count += 1
                last = s
        return count >= k

    lo, hi, ans = 1, stalls[-1] - stalls[0], 0
    while lo <= hi:
        mid = (lo + hi) // 2
        if can_place(mid):
            ans = mid
            lo = mid + 1
        else:
            hi = mid - 1
    return ans`
      }
    ]
  },

  {
    id: 'kadane', title: "Kadane's / Subarray", color: '#D85A30', tier: 1, section: 'Arrays',
    intro: 'Running best ending at i. Reset when the prefix hurts you. For "sum = k" style counts, switch to prefix-sum + hashmap.',
    questions: [
      {
        id: 'lc:maximum-subarray',
        approach: 'cur = max(x, cur+x); track the global best.',
        complexity: 'O(n) time · O(1) space',
        code: `class Solution:
    def maxSubArray(self, nums):
        best = cur = nums[0]
        for x in nums[1:]:
            cur = max(x, cur + x)
            best = max(best, cur)
        return best`
      },
      {
        id: 'lc:maximum-product-subarray',
        approach: 'Track both max and min ending here — a negative number swaps them.',
        complexity: 'O(n) time · O(1) space',
        code: `class Solution:
    def maxProduct(self, nums):
        best = cur_max = cur_min = nums[0]
        for x in nums[1:]:
            if x < 0:
                cur_max, cur_min = cur_min, cur_max
            cur_max = max(x, cur_max * x)
            cur_min = min(x, cur_min * x)
            best = max(best, cur_max)
        return best`
      },
      {
        id: 'lc:subarray-sum-equals-k',
        approach: 'Prefix sum + hashmap: number of earlier prefixes equal to prefix-k.',
        complexity: 'O(n) time · O(n) space',
        code: `class Solution:
    def subarraySum(self, nums, k):
        from collections import defaultdict
        seen = defaultdict(int)
        seen[0] = 1
        prefix = res = 0
        for x in nums:
            prefix += x
            res += seen[prefix - k]
            seen[prefix] += 1
        return res`
      }
    ]
  },

  {
    id: 'prefix', title: 'Prefix based', color: '#7F77DD', tier: 1, section: 'Arrays',
    intro: 'Precompute cumulative sums so any range answer is O(1). 2D version uses inclusion–exclusion.',
    questions: [
      {
        id: 'lc:product-of-array-except-self',
        approach: 'Two passes: prefix products from the left, suffix products from the right.',
        complexity: 'O(n) time · O(1) extra space (output aside)',
        code: `class Solution:
    def productExceptSelf(self, nums):
        n = len(nums)
        res = [1] * n
        left = 1
        for i in range(n):
            res[i] = left
            left *= nums[i]
        right = 1
        for i in range(n - 1, -1, -1):
            res[i] *= right
            right *= nums[i]
        return res`
      },
      {
        id: 'lc:count-number-of-nice-subarrays',
        approach: 'Prefix count of odd numbers + hashmap (exactly k = at-most pattern via counts).',
        complexity: 'O(n) time · O(n) space',
        code: `class Solution:
    def numberOfSubarrays(self, nums, k):
        from collections import defaultdict
        seen = defaultdict(int)
        seen[0] = 1
        odds = res = 0
        for x in nums:
            odds += x & 1
            res += seen[odds - k]
            seen[odds] += 1
        return res`
      },
      {
        id: 'lc:range-sum-query-2d-immutable',
        approach: '2D prefix matrix; sumRegion via inclusion–exclusion of four corners.',
        complexity: 'O(m·n) build · O(1) per query',
        code: `class NumMatrix:
    def __init__(self, matrix):
        m, n = len(matrix), len(matrix[0])
        self.pre = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(m):
            for j in range(n):
                self.pre[i + 1][j + 1] = (matrix[i][j]
                                          + self.pre[i][j + 1]
                                          + self.pre[i + 1][j]
                                          - self.pre[i][j])

    def sumRegion(self, r1, c1, r2, c2):
        P = self.pre
        return P[r2 + 1][c2 + 1] - P[r1][c2 + 1] - P[r2 + 1][c1] + P[r1][c1]`
      }
    ]
  },

  {
    id: 'sliding', title: 'Sliding window', color: '#BA7517', tier: 1, section: 'Arrays',
    intro: 'Grow right; shrink left while the window is invalid. Fixed window = add/remove one element each step; monotonic = deque.',
    questions: [
      {
        id: 'lc:maximum-average-subarray-i',
        approach: 'Fixed window of size k: slide by adding nums[i], removing nums[i-k].',
        complexity: 'O(n) time · O(1) space',
        code: `class Solution:
    def findMaxAverage(self, nums, k):
        window = sum(nums[:k])
        best = window
        for i in range(k, len(nums)):
            window += nums[i] - nums[i - k]
            best = max(best, window)
        return best / k`
      },
      {
        id: 'lc:longest-substring-without-repeating-characters',
        approach: 'Variable window; jump left past the last occurrence of a repeat.',
        complexity: 'O(n) time · O(min(n, charset)) space',
        code: `class Solution:
    def lengthOfLongestSubstring(self, s):
        last = {}
        left = best = 0
        for right, ch in enumerate(s):
            if ch in last and last[ch] >= left:
                left = last[ch] + 1
            last[ch] = right
            best = max(best, right - left + 1)
        return best`
      },
      {
        id: 'lc:minimum-window-substring',
        approach: 'Expand to cover all of t (missing==0), then shrink to minimise.',
        complexity: 'O(|s| + |t|) time · O(charset) space',
        code: `class Solution:
    def minWindow(self, s, t):
        from collections import Counter
        need = Counter(t)
        missing = len(t)
        left = 0
        start, end = 0, 0          # end == 0 means "no window found"
        for right, ch in enumerate(s):
            if need[ch] > 0:
                missing -= 1
            need[ch] -= 1
            while missing == 0:
                if end == 0 or right - left + 1 < end - start:
                    start, end = left, right + 1
                need[s[left]] += 1
                if need[s[left]] > 0:
                    missing += 1
                left += 1
        return s[start:end]`
      },
      {
        id: 'lc:sliding-window-maximum',
        approach: 'Monotonic decreasing deque of indices; front is the window max.',
        complexity: 'O(n) time · O(k) space',
        code: `class Solution:
    def maxSlidingWindow(self, nums, k):
        from collections import deque
        dq = deque()          # indices, values decreasing
        res = []
        for i, x in enumerate(nums):
            while dq and nums[dq[-1]] <= x:
                dq.pop()
            dq.append(i)
            if dq[0] <= i - k:
                dq.popleft()
            if i >= k - 1:
                res.append(nums[dq[0]])
        return res`
      }
    ]
  },

  {
    id: 'twoptr', title: 'Two pointer', color: '#639922', tier: 1, section: 'Arrays',
    intro: 'Opposite ends for sorted pair/area problems; same-direction (fast/slow) for in-place compaction; three pointers for partitioning.',
    questions: [
      {
        id: 'lc:two-sum-ii-input-array-is-sorted',
        approach: 'Sorted array: move lo/hi inward based on the sum vs target.',
        complexity: 'O(n) time · O(1) space',
        code: `class Solution:
    def twoSum(self, numbers, target):
        lo, hi = 0, len(numbers) - 1
        while lo < hi:
            s = numbers[lo] + numbers[hi]
            if s == target:
                return [lo + 1, hi + 1]
            if s < target:
                lo += 1
            else:
                hi -= 1
        return []`
      },
      {
        id: 'lc:container-with-most-water',
        approach: 'Width × shorter wall; always move the shorter pointer inward.',
        complexity: 'O(n) time · O(1) space',
        code: `class Solution:
    def maxArea(self, height):
        lo, hi = 0, len(height) - 1
        best = 0
        while lo < hi:
            best = max(best, (hi - lo) * min(height[lo], height[hi]))
            if height[lo] < height[hi]:
                lo += 1
            else:
                hi -= 1
        return best`
      },
      {
        id: 'lc:3sum',
        approach: 'Sort; fix i, two-pointer the rest; skip duplicates at every level.',
        complexity: 'O(n²) time · O(1) extra space',
        code: `class Solution:
    def threeSum(self, nums):
        nums.sort()
        res = []
        n = len(nums)
        for i in range(n - 2):
            if i > 0 and nums[i] == nums[i - 1]:
                continue
            lo, hi = i + 1, n - 1
            while lo < hi:
                s = nums[i] + nums[lo] + nums[hi]
                if s < 0:
                    lo += 1
                elif s > 0:
                    hi -= 1
                else:
                    res.append([nums[i], nums[lo], nums[hi]])
                    lo += 1
                    hi -= 1
                    while lo < hi and nums[lo] == nums[lo - 1]:
                        lo += 1
                    while lo < hi and nums[hi] == nums[hi + 1]:
                        hi -= 1
        return res`
      },
      {
        id: 'lc:sort-colors',
        approach: 'Dutch national flag: low/mid/high pointers partition 0s, 1s, 2s in one pass.',
        complexity: 'O(n) time · O(1) space',
        code: `class Solution:
    def sortColors(self, nums):
        low, mid, high = 0, 0, len(nums) - 1
        while mid <= high:
            if nums[mid] == 0:
                nums[low], nums[mid] = nums[mid], nums[low]
                low += 1
                mid += 1
            elif nums[mid] == 1:
                mid += 1
            else:
                nums[mid], nums[high] = nums[high], nums[mid]
                high -= 1`
      }
    ]
  },

  /* ===== Tier 1 · Hash Map / Strings / Linked List / Stack ============== */
  {
    id: 'hm', title: 'Hash Map', color: '#3b82f6', tier: 1, section: 'Hash Map',
    intro: 'Trade space for time: store seen values/indices, group by a key, or use a set for O(1) membership.',
    questions: [
      {
        id: 'lc:two-sum',
        approach: 'Store value→index; for each x check if target-x was seen.',
        complexity: 'O(n) time · O(n) space',
        code: `class Solution:
    def twoSum(self, nums, target):
        seen = {}
        for i, x in enumerate(nums):
            if target - x in seen:
                return [seen[target - x], i]
            seen[x] = i
        return []`
      },
      {
        id: 'lc:group-anagrams',
        approach: 'Key each word by its sorted tuple (or letter-count signature).',
        complexity: 'O(n·k log k) time · O(n·k) space',
        code: `class Solution:
    def groupAnagrams(self, strs):
        from collections import defaultdict
        groups = defaultdict(list)
        for s in strs:
            groups[tuple(sorted(s))].append(s)
        return list(groups.values())`
      },
      {
        id: 'lc:longest-consecutive-sequence',
        approach: 'Set lookup; only start counting from numbers with no predecessor.',
        complexity: 'O(n) time · O(n) space',
        code: `class Solution:
    def longestConsecutive(self, nums):
        s = set(nums)
        best = 0
        for x in s:
            if x - 1 not in s:                # start of a run
                length = 1
                while x + length in s:
                    length += 1
                best = max(best, length)
        return best`
      }
    ]
  },

  {
    id: 'str', title: 'Strings', color: '#d946ef', tier: 1, section: 'Strings',
    intro: 'Most string interview problems reduce to frequency counts, two pointers, a sliding window, or KMP-style prefix matching.',
    questions: [
      {
        id: 'lc:valid-anagram',
        approach: 'Two strings are anagrams iff their character counts match.',
        complexity: 'O(n) time · O(1) space (fixed alphabet)',
        code: `class Solution:
    def isAnagram(self, s, t):
        from collections import Counter
        return Counter(s) == Counter(t)`
      },
      {
        id: 'lc:valid-palindrome',
        approach: 'Skip non-alphanumerics from both ends, compare lowercased characters.',
        complexity: 'O(n) time · O(1) space',
        code: `class Solution:
    def isPalindrome(self, s):
        lo, hi = 0, len(s) - 1
        while lo < hi:
            while lo < hi and not s[lo].isalnum():
                lo += 1
            while lo < hi and not s[hi].isalnum():
                hi -= 1
            if s[lo].lower() != s[hi].lower():
                return False
            lo += 1
            hi -= 1
        return True`
      },
      {
        id: 'lc:find-the-index-of-the-first-occurrence-in-a-string',
        approach: 'KMP: build the LPS (longest prefix-suffix) array, then scan without backtracking.',
        complexity: 'O(n + m) time · O(m) space',
        code: `class Solution:
    def strStr(self, haystack, needle):
        if not needle:
            return 0
        lps = [0] * len(needle)
        k = 0
        for i in range(1, len(needle)):          # build LPS
            while k and needle[i] != needle[k]:
                k = lps[k - 1]
            if needle[i] == needle[k]:
                k += 1
            lps[i] = k

        k = 0
        for i, ch in enumerate(haystack):         # scan
            while k and ch != needle[k]:
                k = lps[k - 1]
            if ch == needle[k]:
                k += 1
            if k == len(needle):
                return i - k + 1
        return -1`
      },
      {
        id: 'lc:string-compression',
        approach: 'Two pointers: read runs, write char then run length (in place).',
        complexity: 'O(n) time · O(1) space',
        code: `class Solution:
    def compress(self, chars):
        write = read = 0
        n = len(chars)
        while read < n:
            ch = chars[read]
            count = 0
            while read < n and chars[read] == ch:
                read += 1
                count += 1
            chars[write] = ch
            write += 1
            if count > 1:
                for digit in str(count):
                    chars[write] = digit
                    write += 1
        return write`
      }
    ]
  },

  {
    id: 'll', title: 'Linked List', color: '#eab308', tier: 1, section: 'Linked List',
    intro: 'A dummy head simplifies edge cases; fast/slow pointers find cycles and midpoints; reversal is the building block for most rearrangements.',
    questions: [
      {
        id: 'lc:reverse-linked-list',
        approach: 'Walk the list flipping each next pointer to the previous node.',
        complexity: 'O(n) time · O(1) space',
        code: `# class ListNode: def __init__(self, val=0, next=None): ...
class Solution:
    def reverseList(self, head):
        prev = None
        while head:
            nxt = head.next
            head.next = prev
            prev = head
            head = nxt
        return prev`
      },
      {
        id: 'lc:linked-list-cycle-ii',
        approach: "Floyd's: detect meeting point, then walk from head and meeting at equal pace.",
        complexity: 'O(n) time · O(1) space',
        code: `class Solution:
    def detectCycle(self, head):
        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow is fast:                     # cycle found
                ptr = head
                while ptr is not slow:
                    ptr = ptr.next
                    slow = slow.next
                return ptr
        return None`
      },
      {
        id: 'lc:merge-two-sorted-lists',
        approach: 'Dummy head; repeatedly attach the smaller front node.',
        complexity: 'O(n + m) time · O(1) space',
        code: `class Solution:
    def mergeTwoLists(self, list1, list2):
        dummy = tail = ListNode(0)
        while list1 and list2:
            if list1.val <= list2.val:
                tail.next, list1 = list1, list1.next
            else:
                tail.next, list2 = list2, list2.next
            tail = tail.next
        tail.next = list1 or list2
        return dummy.next`
      },
      {
        id: 'lc:remove-nth-node-from-end-of-list',
        approach: 'Advance fast by n, then move both until fast hits the end; slow stops before target.',
        complexity: 'O(n) time · O(1) space',
        code: `class Solution:
    def removeNthFromEnd(self, head, n):
        dummy = ListNode(0, head)
        fast = slow = dummy
        for _ in range(n):
            fast = fast.next
        while fast.next:
            fast = fast.next
            slow = slow.next
        slow.next = slow.next.next
        return dummy.next`
      }
    ]
  },

  {
    id: 'stk', title: 'Stack', color: '#14b8a6', tier: 1, section: 'Stack',
    intro: 'LIFO for matching/undo; a monotonic stack answers "next greater/smaller" in one pass.',
    questions: [
      {
        id: 'lc:valid-parentheses',
        approach: 'Push opens; on a close, the top must be its matching open.',
        complexity: 'O(n) time · O(n) space',
        code: `class Solution:
    def isValid(self, s):
        pairs = {')': '(', ']': '[', '}': '{'}
        stack = []
        for ch in s:
            if ch in pairs:
                if not stack or stack.pop() != pairs[ch]:
                    return False
            else:
                stack.append(ch)
        return not stack`
      },
      {
        id: 'lc:daily-temperatures',
        approach: 'Monotonic decreasing stack of indices; pop when a warmer day arrives.',
        complexity: 'O(n) time · O(n) space',
        code: `class Solution:
    def dailyTemperatures(self, temperatures):
        res = [0] * len(temperatures)
        stack = []                                # indices, decreasing temps
        for i, t in enumerate(temperatures):
            while stack and temperatures[stack[-1]] < t:
                j = stack.pop()
                res[j] = i - j
            stack.append(i)
        return res`
      },
      {
        id: 'lc:min-stack',
        approach: 'Store (value, running min) pairs so getMin is O(1).',
        complexity: 'O(1) per operation · O(n) space',
        code: `class MinStack:
    def __init__(self):
        self.stack = []                           # (value, min_so_far)

    def push(self, val):
        cur_min = val if not self.stack else min(val, self.stack[-1][1])
        self.stack.append((val, cur_min))

    def pop(self):
        self.stack.pop()

    def top(self):
        return self.stack[-1][0]

    def getMin(self):
        return self.stack[-1][1]`
      },
      {
        id: 'lc:evaluate-reverse-polish-notation',
        approach: 'Push numbers; on an operator pop two operands and push the result.',
        complexity: 'O(n) time · O(n) space',
        code: `class Solution:
    def evalRPN(self, tokens):
        stack = []
        ops = {'+', '-', '*', '/'}
        for tok in tokens:
            if tok in ops:
                b = stack.pop()
                a = stack.pop()
                if tok == '+':
                    stack.append(a + b)
                elif tok == '-':
                    stack.append(a - b)
                elif tok == '*':
                    stack.append(a * b)
                else:
                    stack.append(int(a / b))      # truncate toward zero
            else:
                stack.append(int(tok))
        return stack[0]`
      }
    ]
  },

  /* ===== Tier 2 · Trees / Backtracking / Core DP / Greedy ============== */
  {
    id: 'tree', title: 'Trees', color: '#ef4444', tier: 2, section: 'Trees',
    intro: 'DFS recursion returns info up the tree (bottom-up) or passes context down (top-down). BFS with a queue handles level-order. BST = inorder is sorted.',
    questions: [
      {
        id: 'lc:maximum-depth-of-binary-tree',
        approach: 'Depth = 1 + max(depth(left), depth(right)).',
        complexity: 'O(n) time · O(h) space',
        code: `# class TreeNode: val, left, right
class Solution:
    def maxDepth(self, root):
        if not root:
            return 0
        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))`
      },
      {
        id: 'lc:binary-tree-level-order-traversal',
        approach: 'BFS; process the queue one full level at a time.',
        complexity: 'O(n) time · O(n) space',
        code: `class Solution:
    def levelOrder(self, root):
        from collections import deque
        if not root:
            return []
        res, q = [], deque([root])
        while q:
            level = []
            for _ in range(len(q)):
                node = q.popleft()
                level.append(node.val)
                if node.left:
                    q.append(node.left)
                if node.right:
                    q.append(node.right)
            res.append(level)
        return res`
      },
      {
        id: 'lc:diameter-of-binary-tree',
        approach: 'At each node the longest path through it is left_depth + right_depth.',
        complexity: 'O(n) time · O(h) space',
        code: `class Solution:
    def diameterOfBinaryTree(self, root):
        self.best = 0

        def depth(node):
            if not node:
                return 0
            l = depth(node.left)
            r = depth(node.right)
            self.best = max(self.best, l + r)
            return 1 + max(l, r)

        depth(root)
        return self.best`
      },
      {
        id: 'lc:validate-binary-search-tree',
        approach: 'Carry an (low, high) open interval down; every node must fit strictly inside.',
        complexity: 'O(n) time · O(h) space',
        code: `class Solution:
    def isValidBST(self, root):
        def valid(node, lo, hi):
            if not node:
                return True
            if not (lo < node.val < hi):
                return False
            return valid(node.left, lo, node.val) and valid(node.right, node.val, hi)

        return valid(root, float('-inf'), float('inf'))`
      }
    ]
  },

  {
    id: 'bt', title: 'Recursion & Backtracking', color: '#8b5cf6', tier: 2, section: 'Recursion & Backtracking',
    intro: 'Choose → recurse → undo. A start index avoids reusing earlier elements (combinations); a used[] array tracks consumed elements (permutations).',
    questions: [
      {
        id: 'lc:subsets',
        approach: 'At each index, include-or-skip; record the path at every node.',
        complexity: 'O(n·2ⁿ) time · O(n) recursion depth',
        code: `class Solution:
    def subsets(self, nums):
        res = []

        def backtrack(start, path):
            res.append(path[:])
            for i in range(start, len(nums)):
                path.append(nums[i])
                backtrack(i + 1, path)
                path.pop()

        backtrack(0, [])
        return res`
      },
      {
        id: 'lc:permutations',
        approach: 'Pick any unused element at each level until the path is full.',
        complexity: 'O(n·n!) time · O(n) recursion depth',
        code: `class Solution:
    def permute(self, nums):
        res = []
        used = [False] * len(nums)

        def backtrack(path):
            if len(path) == len(nums):
                res.append(path[:])
                return
            for i in range(len(nums)):
                if used[i]:
                    continue
                used[i] = True
                path.append(nums[i])
                backtrack(path)
                path.pop()
                used[i] = False

        backtrack([])
        return res`
      },
      {
        id: 'lc:combination-sum',
        approach: 'Sort; reuse the same index to allow repeats; prune when candidate > remaining.',
        complexity: 'O(2^target) worst case · O(target) depth',
        code: `class Solution:
    def combinationSum(self, candidates, target):
        candidates.sort()
        res = []

        def backtrack(start, remaining, path):
            if remaining == 0:
                res.append(path[:])
                return
            for i in range(start, len(candidates)):
                if candidates[i] > remaining:
                    break
                path.append(candidates[i])
                backtrack(i, remaining - candidates[i], path)   # i, not i+1
                path.pop()

        backtrack(0, target, [])
        return res`
      },
      {
        id: 'lc:n-queens',
        approach: 'Place one queen per row; sets track used columns and both diagonals (r-c, r+c).',
        complexity: 'O(n!) time · O(n²) space for the board',
        code: `class Solution:
    def solveNQueens(self, n):
        res = []
        cols, diag, anti = set(), set(), set()
        board = [['.'] * n for _ in range(n)]

        def backtrack(r):
            if r == n:
                res.append([''.join(row) for row in board])
                return
            for c in range(n):
                if c in cols or (r - c) in diag or (r + c) in anti:
                    continue
                cols.add(c); diag.add(r - c); anti.add(r + c)
                board[r][c] = 'Q'
                backtrack(r + 1)
                board[r][c] = '.'
                cols.discard(c); diag.discard(r - c); anti.discard(r + c)

        backtrack(0)
        return res`
      }
    ]
  },

  {
    id: 'dp-linear', title: 'Fibonacci / Linear DP', color: '#60a5fa', tier: 2, section: 'DP — Core Patterns',
    intro: 'State depends on a few previous indices. Roll the array down to O(1) space once the recurrence is clear.',
    questions: [
      {
        id: 'lc:climbing-stairs',
        approach: 'ways(n) = ways(n-1) + ways(n-2) — Fibonacci.',
        complexity: 'O(n) time · O(1) space',
        code: `class Solution:
    def climbStairs(self, n):
        a, b = 1, 1
        for _ in range(n):
            a, b = b, a + b
        return a`
      },
      {
        id: 'lc:house-robber',
        approach: 'At each house: skip (keep prev) or rob (prev2 + value).',
        complexity: 'O(n) time · O(1) space',
        code: `class Solution:
    def rob(self, nums):
        prev, cur = 0, 0
        for x in nums:
            prev, cur = cur, max(cur, prev + x)
        return cur`
      },
      {
        id: 'lc:decode-ways',
        approach: 'dp[i] depends on a valid 1-digit (s[i]) and 2-digit (s[i-1:i+1] in 10..26) step.',
        complexity: 'O(n) time · O(1) space',
        code: `class Solution:
    def numDecodings(self, s):
        if not s or s[0] == '0':
            return 0
        prev, cur = 1, 1                          # dp[i-2], dp[i-1]
        for i in range(1, len(s)):
            nxt = 0
            if s[i] != '0':
                nxt += cur
            if 10 <= int(s[i - 1:i + 1]) <= 26:
                nxt += prev
            prev, cur = cur, nxt
        return cur`
      },
      {
        id: 'lc:word-break',
        approach: 'dp[i] true if some split point j has dp[j] and s[j:i] is a word.',
        complexity: 'O(n²) time · O(n) space',
        code: `class Solution:
    def wordBreak(self, s, wordDict):
        words = set(wordDict)
        n = len(s)
        dp = [False] * (n + 1)
        dp[0] = True
        for i in range(1, n + 1):
            for j in range(i):
                if dp[j] and s[j:i] in words:
                    dp[i] = True
                    break
        return dp[n]`
      }
    ]
  },

  {
    id: 'dp-01knap', title: '0/1 Knapsack', color: '#f59e0b', tier: 2, section: 'DP — Core Patterns',
    intro: 'Each item used at most once → iterate the capacity dimension backwards to avoid reusing an item.',
    questions: [
      {
        id: 'lc:partition-equal-subset-sum',
        approach: 'Subset-sum to total/2; boolean dp over reachable sums, looped backwards.',
        complexity: 'O(n·sum) time · O(sum) space',
        code: `class Solution:
    def canPartition(self, nums):
        total = sum(nums)
        if total % 2:
            return False
        target = total // 2
        dp = [False] * (target + 1)
        dp[0] = True
        for x in nums:
            for s in range(target, x - 1, -1):
                dp[s] = dp[s] or dp[s - x]
        return dp[target]`
      },
      {
        id: 'lc:target-sum',
        approach: 'Assign +/- signs → count subsets summing to (total+target)/2.',
        complexity: 'O(n·sum) time · O(sum) space',
        code: `class Solution:
    def findTargetSumWays(self, nums, target):
        total = sum(nums)
        if abs(target) > total or (total + target) % 2:
            return 0
        s = (total + target) // 2
        dp = [0] * (s + 1)
        dp[0] = 1
        for x in nums:
            for j in range(s, x - 1, -1):
                dp[j] += dp[j - x]
        return dp[s]`
      }
    ]
  },

  {
    id: 'dp-unbounded', title: 'Unbounded Knapsack', color: '#34d399', tier: 2, section: 'DP — Core Patterns',
    intro: 'Items reusable → iterate capacity forwards. Order of the two loops decides combinations (ways) vs permutations.',
    questions: [
      {
        id: 'lc:coin-change',
        approach: 'Min coins: dp[a] = min over coins of dp[a-c] + 1.',
        complexity: 'O(amount·coins) time · O(amount) space',
        code: `class Solution:
    def coinChange(self, coins, amount):
        INF = amount + 1
        dp = [0] + [INF] * amount
        for a in range(1, amount + 1):
            for c in coins:
                if c <= a:
                    dp[a] = min(dp[a], dp[a - c] + 1)
        return dp[amount] if dp[amount] != INF else -1`
      },
      {
        id: 'lc:coin-change-ii',
        approach: 'Count combinations: loop coins outer so each combo is counted once.',
        complexity: 'O(amount·coins) time · O(amount) space',
        code: `class Solution:
    def change(self, amount, coins):
        dp = [1] + [0] * amount
        for c in coins:
            for a in range(c, amount + 1):
                dp[a] += dp[a - c]
        return dp[amount]`
      }
    ]
  },

  /* ── GREEDY TEMPLATES ─────────────────────────────── */

  {
    id: 'grd-interval-merge', title: '① Interval — Sort by Start (Merge)', color: '#d946ef', tier: 2, section: 'Greedy · Interval Greedy',
    intro: 'Sort by start time. Walk intervals left-to-right: if the next starts before the current ends, extend the end; otherwise push a new interval.',
    questions: [
      {
        id: 'lc:merge-intervals',
        approach: 'Sort by start; merge when next start ≤ current end.',
        complexity: 'O(n log n) time · O(n) space',
        code: `# TEMPLATE — Sort by Start (Merge Overlapping)
# Problems: Merge Intervals, Insert Interval
class Solution:
    def merge(self, intervals):
        intervals.sort(key=lambda x: x[0])
        ans = []
        for s, e in intervals:
            if not ans or ans[-1][1] < s:
                ans.append([s, e])
            else:
                ans[-1][1] = max(ans[-1][1], e)
        return ans`
      },
      {
        id: 'lc:insert-interval',
        approach: 'Three phases: add all before, merge overlapping, add all after.',
        complexity: 'O(n) time · O(n) space',
        code: `class Solution:
    def insert(self, intervals, newInterval):
        res = []
        i, n = 0, len(intervals)
        # Phase 1: all intervals before newInterval
        while i < n and intervals[i][1] < newInterval[0]:
            res.append(intervals[i]); i += 1
        # Phase 2: merge overlapping
        while i < n and intervals[i][0] <= newInterval[1]:
            newInterval[0] = min(newInterval[0], intervals[i][0])
            newInterval[1] = max(newInterval[1], intervals[i][1])
            i += 1
        res.append(newInterval)
        # Phase 3: all intervals after
        while i < n:
            res.append(intervals[i]); i += 1
        return res`
      }
    ]
  },

  {
    id: 'grd-interval-select', title: '② Interval — Sort by End (Max Non-Overlapping)', color: '#a855f7', tier: 2, section: 'Greedy · Interval Greedy',
    intro: 'Sort by end time. Greedily pick intervals that start at/after the last selected end. Gives the max set of non-overlapping intervals (Activity Selection).',
    questions: [
      {
        id: 'lc:non-overlapping-intervals',
        approach: 'Sort by end; keep count of non-overlapping; answer = total − keep.',
        complexity: 'O(n log n) time · O(1) space',
        code: `# TEMPLATE — Sort by End (Max Non-Overlapping)
# Problems: Non-overlapping Intervals, Activity Selection, Minimum Arrows
class Solution:
    def eraseOverlapIntervals(self, intervals):
        intervals.sort(key=lambda x: x[1])
        end = float('-inf')
        keep = 0
        for s, e in intervals:
            if s >= end:        # non-overlapping → keep it
                keep += 1
                end = e
        return len(intervals) - keep`
      },
      {
        id: 'lc:minimum-number-of-arrows-to-burst-balloons',
        approach: 'Sort by end; one arrow at each balloon end bursts all overlapping.',
        complexity: 'O(n log n) time · O(1) space',
        code: `class Solution:
    def findMinArrowShots(self, points):
        points.sort(key=lambda x: x[1])
        arrows, end = 0, float('-inf')
        for s, e in points:
            if s > end:         # new arrow needed
                arrows += 1
                end = e
        return arrows`
      }
    ]
  },

  {
    id: 'grd-sweep', title: '③ Interval — Sweep Line (Starts vs Ends)', color: '#8b5cf6', tier: 2, section: 'Greedy · Interval Greedy',
    intro: 'Separate start and end arrays, sort both, two-pointer sweep. Current overlap tells you the peak resource usage (rooms/platforms needed).',
    questions: [
      {
        id: 'gfg:minimum-number-of-platforms-required-for-a-railway-station-1587115620',
        approach: 'Sort arrivals & departures; sweep with i/j pointers tracking concurrent trains.',
        complexity: 'O(n log n) time · O(1) space',
        code: `# TEMPLATE — Sweep Line (Starts vs Ends)
# Problems: Meeting Rooms II, Minimum Platforms
def minPlatforms(arr, dep):
    arr.sort(); dep.sort()
    i = j = current = answer = 0
    n = len(arr)
    while i < n:
        if arr[i] <= dep[j]:   # train arrives before the earliest departure
            current += 1
            answer = max(answer, current)
            i += 1
        else:
            current -= 1       # one platform freed
            j += 1
    return answer`
      }
    ]
  },

  {
    id: 'grd-jump', title: '④ Jump Game Patterns', color: '#ec4899', tier: 2, section: 'Greedy · Jump Game',
    intro: 'Three variants: (A) can you reach the end? → track farthest reachable. (B) minimum jumps? → treat each jump range as a BFS level. (C) constrained jumps? → BFS with sliding window.',
    questions: [
      {
        id: 'lc:jump-game',
        approach: '(A) Reachability — track reach; fail if i > reach.',
        complexity: 'O(n) time · O(1) space',
        code: `# TEMPLATE A — Reachability
class Solution:
    def canJump(self, nums):
        reach = 0
        for i in range(len(nums)):
            if i > reach:
                return False
            reach = max(reach, i + nums[i])
        return True`
      },
      {
        id: 'lc:jump-game-ii',
        approach: '(B) Minimum jumps — BFS levels: jump when i == currentEnd.',
        complexity: 'O(n) time · O(1) space',
        code: `# TEMPLATE B — Minimum Jumps (BFS Window Expansion)
class Solution:
    def jump(self, nums):
        jumps = currentEnd = farthest = 0
        for i in range(len(nums) - 1):
            farthest = max(farthest, i + nums[i])
            if i == currentEnd:      # exhausted current level
                jumps += 1
                currentEnd = farthest
        return jumps`
      },
      {
        id: 'lc:jump-game-vii',
        approach: '(C) Constrained jumps — BFS + sliding window avoiding re-queuing.',
        complexity: 'O(n) time · O(n) space',
        code: `# TEMPLATE C — BFS Window Expansion
from collections import deque
class Solution:
    def canReach(self, s, minJump, maxJump):
        n = len(s)
        if s[-1] != '0':
            return False
        queue = deque([0])
        farthest = 0               # rightmost index already added to queue
        while queue:
            i = queue.popleft()
            left  = max(i + minJump, farthest + 1)   # skip already-visited
            right = min(i + maxJump, n - 1)
            for j in range(left, right + 1):
                if s[j] == '0':
                    if j == n - 1:
                        return True
                    queue.append(j)
            farthest = right
        return False`
      }
    ]
  },

  {
    id: 'grd-scheduling', title: '⑤ Scheduling Patterns', color: '#f43f5e', tier: 2, section: 'Greedy · Scheduling',
    intro: 'Three flavours: (A) max activities → earliest finish first. (B) max profit before deadline → sort by profit, fill latest slot. (C) fixed cooldown → max-heap + cooldown queue.',
    questions: [
      {
        id: 'gfg:activity-selection-1587115620',
        approach: '(A) Earliest Finish First — sort by end, pick if start ≥ last end.',
        complexity: 'O(n log n) time · O(1) space',
        code: `# TEMPLATE A — Earliest Finish First
# Problems: Activity Selection, N Meetings in One Room
def activitySelection(jobs):
    jobs.sort(key=lambda x: x[1])   # sort by end/finish time
    count = 0
    last_end = -1
    for start, end in jobs:
        if start >= last_end:
            count += 1
            last_end = end
    return count`
      },
      {
        id: 'gfg:job-sequencing-problem-1587115620',
        approach: '(B) Max Profit Before Deadline — sort by profit desc, fill latest free slot.',
        complexity: 'O(n log n + n·d) time · O(d) space',
        code: `# TEMPLATE B — Max Profit Before Deadline
def jobSequencing(jobs, max_deadline):
    jobs.sort(key=lambda x: -x[2])    # sort by profit desc
    slots = [-1] * (max_deadline + 1)
    profit = count = 0
    for job_id, deadline, job_profit in jobs:
        for d in range(deadline, 0, -1):  # fill latest free slot ≤ deadline
            if slots[d] == -1:
                slots[d] = job_id
                profit += job_profit
                count += 1
                break
    return count, profit`
      },
      {
        id: 'lc:task-scheduler',
        approach: '(C) Fixed Cooldown — formula: max(n, (maxFreq-1)*(n+1) + count_of_max_freq).',
        complexity: 'O(n) time · O(26) space',
        code: `# TEMPLATE C — Fixed Cooldown Scheduling
from collections import Counter
class Solution:
    def leastInterval(self, tasks, n):
        freq = sorted(Counter(tasks).values())
        max_freq = freq[-1]
        count_max = freq.count(max_freq)
        # idle slots: (max_freq-1) blocks of size (n+1), last block has count_max tasks
        return max(len(tasks), (max_freq - 1) * (n + 1) + count_max)`
      }
    ]
  },

  {
    id: 'grd-resource', title: '⑥ Resource Allocation Patterns', color: '#f97316', tier: 2, section: 'Greedy · Resource Allocation',
    intro: 'Five sub-patterns: smallest-fit (Cookies), pair L+R (Boats), prefix balance (Gas Station), bidirectional pass (Candy), optimal-resource consumption (Lemonade).',
    questions: [
      {
        id: 'lc:assign-cookies',
        approach: '(A) Smallest Resource That Fits — two sorted pointers.',
        complexity: 'O(n log n) time · O(1) space',
        code: `# TEMPLATE A — Smallest Sufficient Resource
class Solution:
    def findContentChildren(self, g, s):
        g.sort(); s.sort()
        child = cookie = 0
        while child < len(g) and cookie < len(s):
            if s[cookie] >= g[child]:   # cookie satisfies child
                child += 1
            cookie += 1
        return child`
      },
      {
        id: 'lc:boats-to-save-people',
        approach: '(B) Pair Smallest + Largest — sort, two pointers from ends.',
        complexity: 'O(n log n) time · O(1) space',
        code: `# TEMPLATE B — Pair Largest with Smallest
class Solution:
    def numRescueBoats(self, people, limit):
        people.sort()
        l, r, boats = 0, len(people) - 1, 0
        while l <= r:
            if people[l] + people[r] <= limit:
                l += 1        # pair them together
            r -= 1            # heaviest person always boards
            boats += 1
        return boats`
      },
      {
        id: 'lc:gas-station',
        approach: '(C) Prefix Balance — running current tank; reset start when it dips negative.',
        complexity: 'O(n) time · O(1) space',
        code: `# TEMPLATE C — Prefix Balance (Running Surplus)
class Solution:
    def canCompleteCircuit(self, gas, cost):
        current = total = start = 0
        for i in range(len(gas)):
            gain = gas[i] - cost[i]
            current += gain
            total   += gain
            if current < 0:
                current = 0
                start = i + 1
        return start if total >= 0 else -1`
      },
      {
        id: 'lc:candy',
        approach: '(D) Bidirectional Greedy — left pass then right pass, take max.',
        complexity: 'O(n) time · O(n) space',
        code: `# TEMPLATE D — Bidirectional Constraint (Two Passes)
class Solution:
    def candy(self, ratings):
        n = len(ratings)
        left  = [1] * n
        right = [1] * n
        for i in range(1, n):
            if ratings[i] > ratings[i - 1]:
                left[i] = left[i - 1] + 1
        for i in range(n - 2, -1, -1):
            if ratings[i] > ratings[i + 1]:
                right[i] = right[i + 1] + 1
        return sum(max(l, r) for l, r in zip(left, right))`
      },
      {
        id: 'lc:lemonade-change',
        approach: '(E) Greedy Resource Consumption — prefer $10+$5 over three $5s.',
        complexity: 'O(n) time · O(1) space',
        code: `# TEMPLATE E — Greedy Resource Consumption
class Solution:
    def lemonadeChange(self, bills):
        five = ten = 0
        for bill in bills:
            if bill == 5:
                five += 1
            elif bill == 10:
                if not five: return False
                five -= 1; ten += 1
            else:           # bill == 20
                if ten and five:
                    ten -= 1; five -= 1
                elif five >= 3:
                    five -= 3
                else:
                    return False
        return True`
      }
    ]
  },

  {
    id: 'grd-huffman', title: '⑦ Huffman — Merge Two Smallest', color: '#14b8a6', tier: 2, section: 'Greedy · Huffman / Merge Cost',
    intro: 'Repeatedly merge the two smallest elements into one new element and pay their sum. A min-heap does each merge in O(log n). Classic Huffman encoding.',
    questions: [
      {
        id: 'lc:minimum-cost-to-connect-sticks',
        approach: 'Min-heap: pop two smallest, push their sum, accumulate cost.',
        complexity: 'O(n log n) time · O(n) space',
        code: `# TEMPLATE — Always Merge Two Smallest (Huffman)
# Problems: Minimum Cost of Ropes, Connect Sticks
import heapq
class Solution:
    def connectSticks(self, sticks):
        heapq.heapify(sticks)
        cost = 0
        while len(sticks) > 1:
            a = heapq.heappop(sticks)
            b = heapq.heappop(sticks)
            cost += a + b
            heapq.heappush(sticks, a + b)
        return cost`
      },
      {
        id: 'gfg:minimum-cost-of-ropes-1587115620',
        approach: 'Identical to connect sticks — min-heap merge of two smallest ropes.',
        complexity: 'O(n log n) time · O(n) space',
        code: `import heapq
def minCost(arr):
    heapq.heapify(arr)
    cost = 0
    while len(arr) > 1:
        a = heapq.heappop(arr)
        b = heapq.heappop(arr)
        cost += a + b
        heapq.heappush(arr, a + b)
    return cost`
      }
    ]
  },

  {
    id: 'grd-heap', title: '⑧ Greedy + Heap (Best-Candidate)', color: '#0ea5e9', tier: 2, section: 'Greedy · Greedy + Heap',
    intro: 'Sort items, then dynamically grow/shrink a heap to always pick the best available option. Used when you unlock new choices as you iterate (IPO, Course Schedule III).',
    questions: [
      {
        id: 'lc:ipo',
        approach: 'Sort by capital; unlock affordable projects into a max-profit heap; greedily pick top k times.',
        complexity: 'O(n log n) time · O(n) space',
        code: `# TEMPLATE — Greedy + Heap (Best Available Option)
# Problems: IPO, Course Schedule III, Furthest Building
import heapq
class Solution:
    def findMaximizedCapital(self, k, w, profits, capital):
        projects = sorted(zip(capital, profits))
        max_heap = []       # max-heap of profits (negated)
        i = 0
        for _ in range(k):
            # unlock all affordable projects
            while i < len(projects) and projects[i][0] <= w:
                heapq.heappush(max_heap, -projects[i][1])
                i += 1
            if not max_heap:
                break
            w += -heapq.heappop(max_heap)   # pick best profit
        return w`
      }
    ]
  },

  /* ===== Tier 3 · Heap / Graphs ========================================= */
  {
    id: 'heap', title: 'Heap', color: '#10b981', tier: 3, section: 'Heap',
    intro: 'Keep a size-k heap for "top-K", two heaps for a running median, a min-heap for k-way merges and Dijkstra.',
    questions: [
      {
        id: 'lc:kth-largest-element-in-an-array',
        approach: 'Maintain a min-heap of size k; its root is the kth largest.',
        complexity: 'O(n log k) time · O(k) space',
        code: `import heapq
class Solution:
    def findKthLargest(self, nums, k):
        heap = []
        for x in nums:
            heapq.heappush(heap, x)
            if len(heap) > k:
                heapq.heappop(heap)
        return heap[0]`
      },
      {
        id: 'lc:top-k-frequent-elements',
        approach: 'Count frequencies, then take the k largest by count.',
        complexity: 'O(n log k) time · O(n) space',
        code: `import heapq
from collections import Counter
class Solution:
    def topKFrequent(self, nums, k):
        freq = Counter(nums)
        return [num for num, _ in heapq.nlargest(k, freq.items(), key=lambda kv: kv[1])]`
      },
      {
        id: 'lc:find-median-from-data-stream',
        approach: 'Max-heap for the lower half, min-heap for the upper; keep sizes balanced.',
        complexity: 'O(log n) add · O(1) median',
        code: `import heapq
class MedianFinder:
    def __init__(self):
        self.small = []                           # max-heap (negated)
        self.large = []                           # min-heap

    def addNum(self, num):
        heapq.heappush(self.small, -num)
        heapq.heappush(self.large, -heapq.heappop(self.small))
        if len(self.large) > len(self.small):
            heapq.heappush(self.small, -heapq.heappop(self.large))

    def findMedian(self):
        if len(self.small) > len(self.large):
            return -self.small[0]
        return (-self.small[0] + self.large[0]) / 2`
      },
      {
        id: 'lc:k-closest-points-to-origin',
        approach: 'Take the k smallest by squared distance (no sqrt needed).',
        complexity: 'O(n log k) time · O(k) space',
        code: `import heapq
class Solution:
    def kClosest(self, points, k):
        return heapq.nsmallest(k, points, key=lambda p: p[0] ** 2 + p[1] ** 2)`
      }
    ]
  },

  {
    id: 'grph', title: 'Graphs', color: '#8b4513', tier: 3, section: 'Graphs - BFS/DFS + Topo sort + DSU',
    intro: 'Grid flood-fill = DFS/BFS; ordering with prerequisites = topological sort; shortest unweighted = BFS; weighted non-negative = Dijkstra.',
    questions: [
      {
        id: 'lc:number-of-islands',
        approach: 'DFS/BFS from each unvisited land cell, sinking the whole island.',
        complexity: 'O(m·n) time · O(m·n) space',
        code: `class Solution:
    def numIslands(self, grid):
        if not grid:
            return 0
        m, n = len(grid), len(grid[0])

        def dfs(r, c):
            if r < 0 or r >= m or c < 0 or c >= n or grid[r][c] != '1':
                return
            grid[r][c] = '0'
            dfs(r + 1, c); dfs(r - 1, c)
            dfs(r, c + 1); dfs(r, c - 1)

        count = 0
        for r in range(m):
            for c in range(n):
                if grid[r][c] == '1':
                    count += 1
                    dfs(r, c)
        return count`
      },
      {
        id: 'lc:course-schedule',
        approach: "Kahn's topological sort: repeatedly remove zero-indegree nodes; cycle iff not all removed.",
        complexity: 'O(V + E) time · O(V + E) space',
        code: `from collections import deque
class Solution:
    def canFinish(self, numCourses, prerequisites):
        graph = [[] for _ in range(numCourses)]
        indeg = [0] * numCourses
        for a, b in prerequisites:
            graph[b].append(a)
            indeg[a] += 1
        q = deque(i for i in range(numCourses) if indeg[i] == 0)
        seen = 0
        while q:
            node = q.popleft()
            seen += 1
            for nxt in graph[node]:
                indeg[nxt] -= 1
                if indeg[nxt] == 0:
                    q.append(nxt)
        return seen == numCourses`
      },
      {
        id: 'lc:rotting-oranges',
        approach: 'Multi-source BFS from all rotten oranges at once; count the levels.',
        complexity: 'O(m·n) time · O(m·n) space',
        code: `from collections import deque
class Solution:
    def orangesRotting(self, grid):
        m, n = len(grid), len(grid[0])
        q = deque()
        fresh = 0
        for r in range(m):
            for c in range(n):
                if grid[r][c] == 2:
                    q.append((r, c))
                elif grid[r][c] == 1:
                    fresh += 1
        minutes = 0
        while q and fresh:
            minutes += 1
            for _ in range(len(q)):
                r, c = q.popleft()
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == 1:
                        grid[nr][nc] = 2
                        fresh -= 1
                        q.append((nr, nc))
        return -1 if fresh else minutes`
      },
      {
        id: 'lc:network-delay-time',
        approach: "Dijkstra from k with a min-heap; answer is the largest finalised distance.",
        complexity: 'O(E log V) time · O(V + E) space',
        code: `import heapq
from collections import defaultdict
class Solution:
    def networkDelayTime(self, times, n, k):
        graph = defaultdict(list)
        for u, v, w in times:
            graph[u].append((v, w))
        dist = {}
        pq = [(0, k)]
        while pq:
            d, node = heapq.heappop(pq)
            if node in dist:
                continue
            dist[node] = d
            for nxt, w in graph[node]:
                if nxt not in dist:
                    heapq.heappush(pq, (d + w, nxt))
        return max(dist.values()) if len(dist) == n else -1`
      }
    ]
  },

  /* ===== Tier 3 · DP — 2D, Sequences & Advanced ========================= */
  {
    id: 'dp-lis', title: 'LIS / Subsequences', color: '#a78bfa', tier: 3, section: 'DP — 2D, Sequences & Advanced',
    intro: 'O(n²) dp[i] = best ending at i; or O(n log n) patience sorting with a "tails" array.',
    questions: [
      {
        id: 'lc:longest-increasing-subsequence',
        approach: 'Keep "tails": smallest possible tail for each length; binary-search insert.',
        complexity: 'O(n log n) time · O(n) space',
        code: `import bisect
class Solution:
    def lengthOfLIS(self, nums):
        tails = []
        for x in nums:
            i = bisect.bisect_left(tails, x)
            if i == len(tails):
                tails.append(x)
            else:
                tails[i] = x
        return len(tails)`
      },
      {
        id: 'lc:longest-arithmetic-subsequence',
        approach: 'dp[i][d] = length of AP with common difference d ending at i.',
        complexity: 'O(n²) time · O(n²) space',
        code: `class Solution:
    def longestArithSeqLength(self, nums):
        dp = [{} for _ in nums]
        best = 0
        for i in range(len(nums)):
            for j in range(i):
                d = nums[i] - nums[j]
                dp[i][d] = dp[j].get(d, 1) + 1
                best = max(best, dp[i][d])
        return best`
      }
    ]
  },

  {
    id: 'dp-lcs', title: 'LCS / Sequence Matching', color: '#f472b6', tier: 3, section: 'DP — 2D, Sequences & Advanced',
    intro: 'Two strings → 2D grid. Match → diagonal + 1; mismatch → best of dropping one character from either side.',
    questions: [
      {
        id: 'lc:longest-common-subsequence',
        approach: 'dp[i][j] over prefixes; match adds 1 to the diagonal.',
        complexity: 'O(m·n) time · O(m·n) space',
        code: `class Solution:
    def longestCommonSubsequence(self, text1, text2):
        m, n = len(text1), len(text2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if text1[i - 1] == text2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1] + 1
                else:
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
        return dp[m][n]`
      },
      {
        id: 'lc:edit-distance',
        approach: 'Insert / delete / replace = dp from left, top, or diagonal + 1.',
        complexity: 'O(m·n) time · O(m·n) space',
        code: `class Solution:
    def minDistance(self, word1, word2):
        m, n = len(word1), len(word2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(m + 1):
            dp[i][0] = i
        for j in range(n + 1):
            dp[0][j] = j
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if word1[i - 1] == word2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1]
                else:
                    dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
        return dp[m][n]`
      }
    ]
  },

  {
    id: 'dp-palindrome', title: 'Palindrome DP', color: '#fb923c', tier: 3, section: 'DP — 2D, Sequences & Advanced',
    intro: 'Substrings → expand from each centre (O(n²)); subsequences → interval DP on [i, j].',
    questions: [
      {
        id: 'lc:longest-palindromic-substring',
        approach: 'Expand around every centre (odd and even length).',
        complexity: 'O(n²) time · O(1) space',
        code: `class Solution:
    def longestPalindrome(self, s):
        start, end = 0, 0

        def expand(l, r):
            while l >= 0 and r < len(s) and s[l] == s[r]:
                l -= 1
                r += 1
            return l + 1, r - 1

        for i in range(len(s)):
            for l, r in (expand(i, i), expand(i, i + 1)):
                if r - l > end - start:
                    start, end = l, r
        return s[start:end + 1]`
      },
      {
        id: 'lc:longest-palindromic-subsequence',
        approach: 'Interval DP: s[i]==s[j] → inner + 2, else best of shrinking either end.',
        complexity: 'O(n²) time · O(n²) space',
        code: `class Solution:
    def longestPalindromeSubseq(self, s):
        n = len(s)
        dp = [[0] * n for _ in range(n)]
        for i in range(n - 1, -1, -1):
            dp[i][i] = 1
            for j in range(i + 1, n):
                if s[i] == s[j]:
                    dp[i][j] = dp[i + 1][j - 1] + 2
                else:
                    dp[i][j] = max(dp[i + 1][j], dp[i][j - 1])
        return dp[0][n - 1]`
      }
    ]
  },

  {
    id: 'dp-grid', title: 'Grid / 2D DP', color: '#22d3ee', tier: 3, section: 'DP — 2D, Sequences & Advanced',
    intro: 'Each cell builds on the top/left neighbours. Roll to a 1D array; remember the diagonal when you need it.',
    questions: [
      {
        id: 'lc:unique-paths',
        approach: 'Paths to a cell = paths from above + paths from the left.',
        complexity: 'O(m·n) time · O(n) space',
        code: `class Solution:
    def uniquePaths(self, m, n):
        dp = [1] * n
        for _ in range(1, m):
            for j in range(1, n):
                dp[j] += dp[j - 1]
        return dp[-1]`
      },
      {
        id: 'lc:minimum-path-sum',
        approach: 'dp[j] = grid + min(top, left); first row/column accumulate.',
        complexity: 'O(m·n) time · O(n) space',
        code: `class Solution:
    def minPathSum(self, grid):
        m, n = len(grid), len(grid[0])
        dp = [0] * n
        for i in range(m):
            for j in range(n):
                if i == 0 and j == 0:
                    dp[j] = grid[0][0]
                elif i == 0:
                    dp[j] = dp[j - 1] + grid[i][j]
                elif j == 0:
                    dp[j] = dp[j] + grid[i][j]
                else:
                    dp[j] = min(dp[j], dp[j - 1]) + grid[i][j]
        return dp[-1]`
      },
      {
        id: 'lc:maximal-square',
        approach: 'dp = 1 + min(top, left, diagonal) when the cell is 1; answer is side².',
        complexity: 'O(m·n) time · O(n) space',
        code: `class Solution:
    def maximalSquare(self, matrix):
        m, n = len(matrix), len(matrix[0])
        dp = [0] * (n + 1)
        best = 0
        for i in range(1, m + 1):
            prev = 0                              # dp[i-1][j-1]
            for j in range(1, n + 1):
                temp = dp[j]
                if matrix[i - 1][j - 1] == '1':
                    dp[j] = min(dp[j], dp[j - 1], prev) + 1
                    best = max(best, dp[j])
                else:
                    dp[j] = 0
                prev = temp
        return best * best`
      }
    ]
  },

  {
    id: 'dp-stock', title: 'Stock / State Machine DP', color: '#f87171', tier: 3, section: 'DP — 2D, Sequences & Advanced',
    intro: 'Model the day as states (holding / sold / resting) and write transitions. Generalises to k transactions / fees / cooldown.',
    questions: [
      {
        id: 'lc:best-time-to-buy-and-sell-stock',
        approach: 'One transaction: track the min price so far, best = price − min.',
        complexity: 'O(n) time · O(1) space',
        code: `class Solution:
    def maxProfit(self, prices):
        min_price = float('inf')
        best = 0
        for p in prices:
            min_price = min(min_price, p)
            best = max(best, p - min_price)
        return best`
      },
      {
        id: 'lc:best-time-to-buy-and-sell-stock-ii',
        approach: 'Unlimited transactions: grab every positive day-to-day gain.',
        complexity: 'O(n) time · O(1) space',
        code: `class Solution:
    def maxProfit(self, prices):
        profit = 0
        for i in range(1, len(prices)):
            if prices[i] > prices[i - 1]:
                profit += prices[i] - prices[i - 1]
        return profit`
      },
      {
        id: 'lc:best-time-to-buy-and-sell-stock-with-cooldown',
        approach: 'Three rolling states: hold, just-sold, rest (sell forces a cooldown).',
        complexity: 'O(n) time · O(1) space',
        code: `class Solution:
    def maxProfit(self, prices):
        hold = float('-inf')
        sold = 0
        rest = 0
        for p in prices:
            prev_sold = sold
            sold = hold + p
            hold = max(hold, rest - p)
            rest = max(rest, prev_sold)
        return max(sold, rest)`
      }
    ]
  },

  {
    id: 'dp-partition', title: 'Partition / Interval DP', color: '#4ade80', tier: 3, section: 'DP — 2D, Sequences & Advanced',
    intro: 'Split an array/string at some k and combine sub-answers. Interval DP fills by increasing length over [i, j].',
    questions: [
      {
        id: 'lc:partition-to-k-equal-sum-subsets',
        approach: 'Backtrack filling one bucket to target at a time; sort desc + prune.',
        complexity: 'O(k·2ⁿ) worst case · O(n) space',
        code: `class Solution:
    def canPartitionKSubsets(self, nums, k):
        total = sum(nums)
        if total % k:
            return False
        target = total // k
        nums.sort(reverse=True)
        if nums[0] > target:
            return False
        used = [False] * len(nums)

        def backtrack(count, cur, start):
            if count == k:
                return True
            if cur == target:
                return backtrack(count + 1, 0, 0)
            for i in range(start, len(nums)):
                if used[i] or cur + nums[i] > target:
                    continue
                used[i] = True
                if backtrack(count, cur + nums[i], i + 1):
                    return True
                used[i] = False
            return False

        return backtrack(0, 0, 0)`
      },
      {
        id: 'lc:burst-balloons',
        approach: 'Interval DP: dp[l][r] picks the *last* balloon k to burst between l and r.',
        complexity: 'O(n³) time · O(n²) space',
        code: `class Solution:
    def maxCoins(self, nums):
        vals = [1] + nums + [1]
        n = len(vals)
        dp = [[0] * n for _ in range(n)]
        for length in range(2, n):
            for left in range(n - length):
                right = left + length
                for k in range(left + 1, right):
                    dp[left][right] = max(
                        dp[left][right],
                        vals[left] * vals[k] * vals[right]
                        + dp[left][k] + dp[k][right])
        return dp[0][n - 1]`
      }
    ]
  },

  {
    id: 'sort', title: 'Sorting Applications', color: '#475569', tier: 3, section: 'Sorting Applications',
    intro: 'Know the mechanics (merge/quick) and the tricks: quickselect for kth, custom comparators, counting/bucket sort.',
    questions: [
      {
        id: 'lc:sort-an-array',
        approach: 'Merge sort: split, sort halves, merge — stable O(n log n).',
        complexity: 'O(n log n) time · O(n) space',
        code: `class Solution:
    def sortArray(self, nums):
        def merge_sort(arr):
            if len(arr) <= 1:
                return arr
            mid = len(arr) // 2
            left = merge_sort(arr[:mid])
            right = merge_sort(arr[mid:])
            merged, i, j = [], 0, 0
            while i < len(left) and j < len(right):
                if left[i] <= right[j]:
                    merged.append(left[i]); i += 1
                else:
                    merged.append(right[j]); j += 1
            merged.extend(left[i:])
            merged.extend(right[j:])
            return merged

        return merge_sort(nums)`
      },
      {
        id: 'lc:kth-largest-element-in-an-array',
        approach: 'Quickselect with a random pivot and 3-way partition — average O(n).',
        complexity: 'O(n) average · O(1) extra space',
        code: `import random
class Solution:
    def findKthLargest(self, nums, k):
        target = len(nums) - k                    # index in ascending order

        def quickselect(lo, hi):
            pivot = nums[random.randint(lo, hi)]
            lt, gt, i = lo, hi, lo
            while i <= gt:
                if nums[i] < pivot:
                    nums[lt], nums[i] = nums[i], nums[lt]
                    lt += 1; i += 1
                elif nums[i] > pivot:
                    nums[gt], nums[i] = nums[i], nums[gt]
                    gt -= 1
                else:
                    i += 1
            if target < lt:
                return quickselect(lo, lt - 1)
            if target > gt:
                return quickselect(gt + 1, hi)
            return nums[target]

        return quickselect(0, len(nums) - 1)`
      },
      {
        id: 'lc:largest-number',
        approach: 'Custom comparator: a before b iff a+b > b+a; handle the all-zeros case.',
        complexity: 'O(n log n) time · O(n) space',
        code: `import functools
class Solution:
    def largestNumber(self, nums):
        strs = list(map(str, nums))

        def cmp(a, b):
            if a + b > b + a:
                return -1
            if a + b < b + a:
                return 1
            return 0

        strs.sort(key=functools.cmp_to_key(cmp))
        result = ''.join(strs)
        return '0' if result[0] == '0' else result`
      }
    ]
  },

  /* ===== Tier 4 · Trie / Bits / Queue / Range ========================== */
  {
    id: 'trie', title: 'Trie', color: '#991b1b', tier: 4, section: 'Trie',
    intro: 'A character tree for prefix queries and autocomplete. A bitwise trie (bits as edges) solves max-XOR problems.',
    questions: [
      {
        id: 'lc:implement-trie-prefix-tree',
        approach: 'Each node holds a child map and an is_end flag.',
        complexity: 'O(L) per insert/search · O(total chars) space',
        code: `class Trie:
    def __init__(self):
        self.children = {}
        self.is_end = False

    def insert(self, word):
        node = self
        for ch in word:
            node = node.children.setdefault(ch, Trie())
        node.is_end = True

    def search(self, word):
        node = self._walk(word)
        return node is not None and node.is_end

    def startsWith(self, prefix):
        return self._walk(prefix) is not None

    def _walk(self, s):
        node = self
        for ch in s:
            if ch not in node.children:
                return None
            node = node.children[ch]
        return node`
      },
      {
        id: 'lc:add-and-search-word-data-structure',
        approach: "Trie + DFS; '.' branches into every child.",
        complexity: 'O(L) add · O(26^dots · L) worst search',
        code: `class WordDictionary:
    def __init__(self):
        self.children = {}
        self.is_end = False

    def addWord(self, word):
        node = self
        for ch in word:
            node = node.children.setdefault(ch, WordDictionary())
        node.is_end = True

    def search(self, word):
        def dfs(node, i):
            if i == len(word):
                return node.is_end
            ch = word[i]
            if ch == '.':
                return any(dfs(child, i + 1) for child in node.children.values())
            if ch in node.children:
                return dfs(node.children[ch], i + 1)
            return False

        return dfs(self, 0)`
      },
      {
        id: 'lc:maximum-xor-of-two-numbers-in-an-array',
        approach: 'Bitwise trie; for each number greedily go to the opposite bit to maximise XOR.',
        complexity: 'O(n·B) time · O(n·B) space',
        code: `class Solution:
    def findMaximumXOR(self, nums):
        high = max(nums).bit_length() - 1 if max(nums) else 0
        root = {}

        def insert(num):
            node = root
            for b in range(high, -1, -1):
                bit = (num >> b) & 1
                node = node.setdefault(bit, {})

        def query(num):
            node, best = root, 0
            for b in range(high, -1, -1):
                bit = (num >> b) & 1
                want = 1 - bit
                if want in node:
                    best |= (1 << b)
                    node = node[want]
                else:
                    node = node[bit]
            return best

        for x in nums:
            insert(x)
        return max(query(x) for x in nums)`
      }
    ]
  },

  {
    id: 'xor', title: 'XOR pattern', color: '#378ADD', tier: 4, section: 'Bit Manipulation',
    intro: 'x^x=0 and x^0=x. XOR cancels pairs — perfect for finding the odd one out or a missing value.',
    questions: [
      {
        id: 'lc:single-number',
        approach: 'XOR everything; pairs cancel, leaving the unique number.',
        complexity: 'O(n) time · O(1) space',
        code: `class Solution:
    def singleNumber(self, nums):
        res = 0
        for x in nums:
            res ^= x
        return res`
      },
      {
        id: 'lc:single-number-iii',
        approach: 'XOR all → diff of the two singles; a low set bit splits them into two groups.',
        complexity: 'O(n) time · O(1) space',
        code: `class Solution:
    def singleNumber(self, nums):
        xor_all = 0
        for x in nums:
            xor_all ^= x
        low_bit = xor_all & (-xor_all)            # lowest differing bit
        a = 0
        for x in nums:
            if x & low_bit:
                a ^= x
        return [a, xor_all ^ a]`
      },
      {
        id: 'lc:missing-number',
        approach: 'XOR all indices and values; the unmatched index is the missing number.',
        complexity: 'O(n) time · O(1) space',
        code: `class Solution:
    def missingNumber(self, nums):
        res = len(nums)
        for i, x in enumerate(nums):
            res ^= i ^ x
        return res`
      }
    ]
  },

  {
    id: 'mask', title: 'Bit masking', color: '#1D9E75', tier: 4, section: 'Bit Manipulation',
    intro: 'n & (n-1) clears the lowest set bit; shifts read/write individual bits. Build numbers bit by bit.',
    questions: [
      {
        id: 'lc:number-of-1-bits',
        approach: 'Repeatedly clear the lowest set bit and count.',
        complexity: 'O(set bits) time · O(1) space',
        code: `class Solution:
    def hammingWeight(self, n):
        count = 0
        while n:
            n &= n - 1                            # drop lowest set bit
            count += 1
        return count`
      },
      {
        id: 'lc:counting-bits',
        approach: 'dp[i] = dp[i >> 1] + (i & 1) — reuse the count of i/2.',
        complexity: 'O(n) time · O(n) space',
        code: `class Solution:
    def countBits(self, n):
        dp = [0] * (n + 1)
        for i in range(1, n + 1):
            dp[i] = dp[i >> 1] + (i & 1)
        return dp`
      },
      {
        id: 'lc:reverse-bits',
        approach: 'Shift the result left and pull bits off the input one at a time (32 rounds).',
        complexity: 'O(1) time · O(1) space',
        code: `class Solution:
    def reverseBits(self, n):
        res = 0
        for _ in range(32):
            res = (res << 1) | (n & 1)
            n >>= 1
        return res`
      },
      {
        id: 'lc:sum-of-two-integers',
        approach: 'XOR is sum-without-carry; (a&b)<<1 is the carry; loop under a 32-bit mask.',
        complexity: 'O(1) time · O(1) space',
        code: `class Solution:
    def getSum(self, a, b):
        mask = 0xFFFFFFFF
        while b & mask:
            carry = (a & b) << 1
            a, b = a ^ b, carry
        a &= mask
        return a if a <= 0x7FFFFFFF else ~(a ^ mask)`
      }
    ]
  },

  {
    id: 'subset', title: 'Subset via bits', color: '#7F77DD', tier: 4, section: 'Bit Manipulation',
    intro: 'Enumerate all 2ⁿ subsets as integers 0..2ⁿ-1; bit i = element i chosen. Letter sets compress to a 26-bit mask.',
    questions: [
      {
        id: 'lc:subsets',
        approach: 'Iterate masks 0..2ⁿ-1; bit i decides whether nums[i] is in this subset.',
        complexity: 'O(n·2ⁿ) time · O(2ⁿ) space',
        code: `class Solution:
    def subsets(self, nums):
        n = len(nums)
        res = []
        for mask in range(1 << n):
            res.append([nums[i] for i in range(n) if mask & (1 << i)])
        return res`
      },
      {
        id: 'lc:maximum-product-of-word-lengths',
        approach: 'Encode each word as a 26-bit letter set; disjoint iff AND == 0.',
        complexity: 'O(n² + total chars) time · O(n) space',
        code: `class Solution:
    def maxProduct(self, words):
        masks = []
        for w in words:
            m = 0
            for ch in w:
                m |= 1 << (ord(ch) - 97)
            masks.append(m)
        best = 0
        for i in range(len(words)):
            for j in range(i + 1, len(words)):
                if masks[i] & masks[j] == 0:
                    best = max(best, len(words[i]) * len(words[j]))
        return best`
      }
    ]
  },

  {
    id: 'checks', title: 'Bit checks', color: '#BA7517', tier: 4, section: 'Bit Manipulation',
    intro: 'Per-bit reasoning: XOR finds differing bits; count set bits column by column across an array.',
    questions: [
      {
        id: 'lc:minimum-bit-flips-to-convert-number',
        approach: 'Flips = popcount(start XOR goal).',
        complexity: 'O(1) time · O(1) space',
        code: `class Solution:
    def minBitFlips(self, start, goal):
        x = start ^ goal
        count = 0
        while x:
            x &= x - 1
            count += 1
        return count`
      },
      {
        id: 'lc:total-hamming-distance',
        approach: 'For each bit, ones·(n-ones) pairs differ — sum over 32 bits.',
        complexity: 'O(32·n) time · O(1) space',
        code: `class Solution:
    def totalHammingDistance(self, nums):
        total = 0
        n = len(nums)
        for b in range(32):
            ones = sum((x >> b) & 1 for x in nums)
            total += ones * (n - ones)
        return total`
      }
    ]
  },

  {
    id: 'pxor', title: 'Prefix XOR', color: '#D85A30', tier: 4, section: 'Bit Manipulation',
    intro: 'XOR of a range = prefix[r] ^ prefix[l-1]. Pair with a hashmap to count subarrays with a target XOR.',
    questions: [
      {
        id: 'gfg:count-subarrays-with-given-xor',
        approach: 'Running prefix XOR + hashmap; add count of prefix ^ k seen so far.',
        complexity: 'O(n) time · O(n) space',
        code: `def subarrayXor(arr, k):
    from collections import defaultdict
    seen = defaultdict(int)
    seen[0] = 1
    prefix = res = 0
    for x in arr:
        prefix ^= x
        res += seen[prefix ^ k]
        seen[prefix] += 1
    return res`
      },
      {
        id: 'lc:xor-queries-of-a-subarray',
        approach: 'Precompute prefix XOR; each query is prefix[r+1] ^ prefix[l].',
        complexity: 'O(n + q) time · O(n) space',
        code: `class Solution:
    def xorQueries(self, arr, queries):
        prefix = [0]
        for x in arr:
            prefix.append(prefix[-1] ^ x)
        return [prefix[r + 1] ^ prefix[l] for l, r in queries]`
      }
    ]
  },

  {
    id: 'que', title: 'Queue/Deque', color: '#d97706', tier: 4, section: 'Queue/Deque',
    intro: 'FIFO designs (often via two stacks or a ring buffer); a monotonic deque gives sliding-window extremes in O(n).',
    questions: [
      {
        id: 'lc:implement-queue-using-stacks',
        approach: 'Two stacks; move in→out lazily so amortised pop/peek is O(1).',
        complexity: 'O(1) amortised per op · O(n) space',
        code: `class MyQueue:
    def __init__(self):
        self.in_stack = []
        self.out_stack = []

    def push(self, x):
        self.in_stack.append(x)

    def pop(self):
        self.peek()
        return self.out_stack.pop()

    def peek(self):
        if not self.out_stack:
            while self.in_stack:
                self.out_stack.append(self.in_stack.pop())
        return self.out_stack[-1]

    def empty(self):
        return not self.in_stack and not self.out_stack`
      },
      {
        id: 'lc:design-circular-queue',
        approach: 'Fixed array + head index + count; positions wrap with modulo.',
        complexity: 'O(1) per op · O(k) space',
        code: `class MyCircularQueue:
    def __init__(self, k):
        self.q = [0] * k
        self.head = 0
        self.count = 0
        self.cap = k

    def enQueue(self, value):
        if self.isFull():
            return False
        self.q[(self.head + self.count) % self.cap] = value
        self.count += 1
        return True

    def deQueue(self):
        if self.isEmpty():
            return False
        self.head = (self.head + 1) % self.cap
        self.count -= 1
        return True

    def Front(self):
        return -1 if self.isEmpty() else self.q[self.head]

    def Rear(self):
        if self.isEmpty():
            return -1
        return self.q[(self.head + self.count - 1) % self.cap]

    def isEmpty(self):
        return self.count == 0

    def isFull(self):
        return self.count == self.cap`
      }
    ]
  },

  {
    id: 'rng', title: 'Range Structures', color: '#14b8a6', tier: 4, section: 'Range Structures',
    intro: 'Point-update + range-query in O(log n): a Fenwick (BIT) tree for sums, a segment tree for general merges.',
    questions: [
      {
        id: 'lc:range-sum-query-mutable',
        approach: 'Fenwick/BIT: update adds a delta up the tree; prefix sums walk down.',
        complexity: 'O(log n) update & query · O(n) space',
        code: `class NumArray:
    def __init__(self, nums):
        self.n = len(nums)
        self.nums = [0] * self.n
        self.tree = [0] * (self.n + 1)
        for i, x in enumerate(nums):
            self.update(i, x)

    def update(self, index, val):
        delta = val - self.nums[index]
        self.nums[index] = val
        i = index + 1
        while i <= self.n:
            self.tree[i] += delta
            i += i & (-i)

    def _prefix(self, i):
        s = 0
        while i > 0:
            s += self.tree[i]
            i -= i & (-i)
        return s

    def sumRange(self, left, right):
        return self._prefix(right + 1) - self._prefix(left)`
      },
      {
        id: 'lc:count-of-smaller-numbers-after-self',
        approach: 'Coordinate-compress, scan right→left, BIT query counts smaller already-seen values.',
        complexity: 'O(n log n) time · O(n) space',
        code: `class Solution:
    def countSmaller(self, nums):
        order = {v: i + 1 for i, v in enumerate(sorted(set(nums)))}
        tree = [0] * (len(order) + 1)

        def update(i):
            while i < len(tree):
                tree[i] += 1
                i += i & (-i)

        def query(i):
            s = 0
            while i > 0:
                s += tree[i]
                i -= i & (-i)
            return s

        res = [0] * len(nums)
        for idx in range(len(nums) - 1, -1, -1):
            rank = order[nums[idx]]
            res[idx] = query(rank - 1)
            update(rank)
        return res`
      }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) { module.exports = REVISION_DATA; }
