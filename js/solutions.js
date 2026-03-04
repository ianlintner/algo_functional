// Functional programming solutions for Grind 169 problems 1-5
// Each entry: problemId -> { languageName -> codeString }

const SOLUTIONS = {
  1: {
    TypeScript: `function twoSum(nums: number[], target: number): number[] {
  const result = nums.reduce<{ map: Map<number, number>; ans: number[] }>(
    (acc, num, i) => {
      if (acc.ans.length > 0) return acc;
      const complement = target - num;
      if (acc.map.has(complement)) {
        return { ...acc, ans: [acc.map.get(complement)!, i] };
      }
      return { map: new Map([...acc.map, [num, i]]), ans: [] };
    },
    { map: new Map(), ans: [] }
  );
  return result.ans;
}`,

    Haskell: `import qualified Data.Map.Strict as Map

twoSum :: [Int] -> Int -> [Int]
twoSum nums target = go nums 0 Map.empty
  where
    go [] _ _ = []
    go (x:xs) i seen =
      let complement = target - x
      in case Map.lookup complement seen of
           Just j  -> [j, i]
           Nothing -> go xs (i + 1) (Map.insert x i seen)`,

    Elixir: `defmodule TwoSum do
  def two_sum(nums, target) do
    nums
    |> Enum.with_index()
    |> Enum.reduce_while(%{}, fn {num, i}, map ->
      complement = target - num
      case Map.get(map, complement) do
        nil -> {:cont, Map.put(map, num, i)}
        j   -> {:halt, [j, i]}
      end
    end)
  end
end`,

    Rust: `use std::collections::HashMap;

pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
    nums.iter()
        .enumerate()
        .try_fold(HashMap::new(), |mut map, (i, &num)| {
            let complement = target - num;
            if let Some(&j) = map.get(&complement) {
                Err(vec![j as i32, i as i32])
            } else {
                map.insert(num, i);
                Ok(map)
            }
        })
        .unwrap_err()
}`,

    Scala: `def twoSum(nums: Array[Int], target: Int): Array[Int] = {
  nums.zipWithIndex.foldLeft(Map.empty[Int, Int]) {
    case (map, (num, i)) =>
      val complement = target - num
      map.get(complement) match {
        case Some(j) => return Array(j, i)
        case None    => map + (num -> i)
      }
  }
  Array.empty
}`,

    OCaml: `module IntMap = Map.Make(Int)

let two_sum nums target =
  let (_, result) =
    Array.fold_left
      (fun (i, (map, res)) num ->
        let complement = target - num in
        match IntMap.find_opt complement map with
        | Some j -> (i + 1, (map, [j; i]))
        | None   -> (i + 1, (IntMap.add num i map, res)))
      (0, (IntMap.empty, []))
      nums
  in
  result`,

    Clojure: `(defn two-sum [nums target]
  (reduce-kv
    (fn [seen i num]
      (let [complement (- target num)]
        (if-let [j (get seen complement)]
          (reduced [j i])
          (assoc seen num i))))
    {}
    (vec nums)))`,

    Lisp: `(defun two-sum (nums target)
  (let ((seen (make-hash-table)))
    (loop for num across nums
          for i from 0
          for complement = (- target num)
          when (gethash complement seen)
            return (list (gethash complement seen) i)
          do (setf (gethash num seen) i))))`,
  },

  2: {
    TypeScript: `class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  const addHelper = (
    n1: ListNode | null,
    n2: ListNode | null,
    carry: number
  ): ListNode | null => {
    if (!n1 && !n2 && carry === 0) return null;
    const sum = (n1?.val ?? 0) + (n2?.val ?? 0) + carry;
    return new ListNode(
      sum % 10,
      addHelper(n1?.next ?? null, n2?.next ?? null, Math.floor(sum / 10))
    );
  };
  return addHelper(l1, l2, 0);
}`,

    Haskell: `data ListNode = ListNode Int (Maybe ListNode)

addTwoNumbers :: Maybe ListNode -> Maybe ListNode -> Maybe ListNode
addTwoNumbers l1 l2 = go l1 l2 0
  where
    go Nothing Nothing 0 = Nothing
    go n1 n2 carry =
      let v1 = maybe 0 (\\(ListNode v _) -> v) n1
          v2 = maybe 0 (\\(ListNode v _) -> v) n2
          s  = v1 + v2 + carry
          n1' = n1 >>= \\(ListNode _ next) -> next
          n2' = n2 >>= \\(ListNode _ next) -> next
      in Just (ListNode (s \`mod\` 10) (go n1' n2' (s \`div\` 10)))`,

    Elixir: `defmodule AddTwoNumbers do
  def add_two_numbers(l1, l2), do: add(l1, l2, 0, [])

  defp add([], [], 0, acc), do: Enum.reverse(acc)
  defp add(l1, l2, carry, acc) do
    v1 = List.first(l1) || 0
    v2 = List.first(l2) || 0
    sum = v1 + v2 + carry
    add(tl_or_empty(l1), tl_or_empty(l2), div(sum, 10), [rem(sum, 10) | acc])
  end

  defp tl_or_empty([]), do: []
  defp tl_or_empty([_|t]), do: t
end`,

    Rust: `#[derive(Debug)]
pub struct ListNode {
    pub val: i32,
    pub next: Option<Box<ListNode>>,
}

pub fn add_two_numbers(
    l1: Option<Box<ListNode>>,
    l2: Option<Box<ListNode>>,
) -> Option<Box<ListNode>> {
    fn add(
        n1: Option<Box<ListNode>>,
        n2: Option<Box<ListNode>>,
        carry: i32,
    ) -> Option<Box<ListNode>> {
        match (n1, n2, carry) {
            (None, None, 0) => None,
            (n1, n2, carry) => {
                let v1 = n1.as_ref().map_or(0, |n| n.val);
                let v2 = n2.as_ref().map_or(0, |n| n.val);
                let sum = v1 + v2 + carry;
                Some(Box::new(ListNode {
                    val: sum % 10,
                    next: add(
                        n1.and_then(|n| n.next),
                        n2.and_then(|n| n.next),
                        sum / 10,
                    ),
                }))
            }
        }
    }
    add(l1, l2, 0)
}`,

    Scala: `case class ListNode(var _x: Int = 0, var next: ListNode = null) {
  var x: Int = _x
}

def addTwoNumbers(l1: ListNode, l2: ListNode): ListNode = {
  def go(n1: ListNode, n2: ListNode, carry: Int): ListNode = {
    if (n1 == null && n2 == null && carry == 0) null
    else {
      val v1 = if (n1 != null) n1.x else 0
      val v2 = if (n2 != null) n2.x else 0
      val sum = v1 + v2 + carry
      val node = new ListNode(sum % 10)
      node.next = go(
        if (n1 != null) n1.next else null,
        if (n2 != null) n2.next else null,
        sum / 10
      )
      node
    }
  }
  go(l1, l2, 0)
}`,

    OCaml: `type 'a node = Nil | Cons of 'a * 'a node

let rec add_two_numbers l1 l2 carry =
  match l1, l2, carry with
  | Nil, Nil, 0 -> Nil
  | _ ->
    let v1 = match l1 with Cons(v, _) -> v | Nil -> 0 in
    let v2 = match l2 with Cons(v, _) -> v | Nil -> 0 in
    let sum = v1 + v2 + carry in
    let rest1 = match l1 with Cons(_, t) -> t | Nil -> Nil in
    let rest2 = match l2 with Cons(_, t) -> t | Nil -> Nil in
    Cons(sum mod 10, add_two_numbers rest1 rest2 (sum / 10))`,

    Clojure: `(defn add-two-numbers [l1 l2]
  (loop [n1 l1, n2 l2, carry 0, acc []]
    (if (and (empty? n1) (empty? n2) (zero? carry))
      (reverse acc)
      (let [v1 (or (first n1) 0)
            v2 (or (first n2) 0)
            s  (+ v1 v2 carry)]
        (recur (rest n1) (rest n2) (quot s 10) (conj acc (rem s 10)))))))`,

    Lisp: `(defun add-two-numbers (l1 l2)
  (labels ((add (n1 n2 carry)
             (when (or n1 n2 (> carry 0))
               (let* ((v1 (or (car n1) 0))
                      (v2 (or (car n2) 0))
                      (s  (+ v1 v2 carry)))
                 (cons (mod s 10)
                       (add (cdr n1) (cdr n2) (floor s 10)))))))
    (add l1 l2 0)))`,
  },

  3: {
    TypeScript: `function lengthOfLongestSubstring(s: string): number {
  const [, , maxLen] = [...s].reduce<[number, Map<string, number>, number]>(
    ([left, seen, best], char, i) => {
      const newLeft = seen.has(char)
        ? Math.max(left, seen.get(char)! + 1)
        : left;
      const newSeen = new Map([...seen, [char, i]]);
      return [newLeft, newSeen, Math.max(best, i - newLeft + 1)];
    },
    [0, new Map(), 0]
  );
  return maxLen;
}`,

    Haskell: `import qualified Data.Map.Strict as Map

lengthOfLongestSubstring :: String -> Int
lengthOfLongestSubstring s =
  let (_, _, result) = foldl step (0, Map.empty, 0) (zip [0..] s)
  in result
  where
    step (left, seen, best) (i, c) =
      let newLeft = case Map.lookup c seen of
                      Just j  -> max left (j + 1)
                      Nothing -> left
          newSeen = Map.insert c i seen
          newBest = max best (i - newLeft + 1)
      in (newLeft, newSeen, newBest)`,

    Elixir: `defmodule LongestSubstring do
  def length_of_longest_substring(s) do
    s
    |> String.graphemes()
    |> Enum.with_index()
    |> Enum.reduce({0, %{}, 0}, fn {char, i}, {left, seen, best} ->
      new_left = case Map.get(seen, char) do
        nil -> left
        j   -> max(left, j + 1)
      end
      {new_left, Map.put(seen, char, i), max(best, i - new_left + 1)}
    end)
    |> elem(2)
  end
end`,

    Rust: `use std::collections::HashMap;

pub fn length_of_longest_substring(s: String) -> i32 {
    let (_, _, result) = s.chars().enumerate().fold(
        (0usize, HashMap::new(), 0usize),
        |(left, mut seen, best), (i, c)| {
            let new_left = seen
                .get(&c)
                .map(|&j| left.max(j + 1))
                .unwrap_or(left);
            seen.insert(c, i);
            (new_left, seen, best.max(i - new_left + 1))
        },
    );
    result as i32
}`,

    Scala: `def lengthOfLongestSubstring(s: String): Int = {
  s.zipWithIndex.foldLeft((0, Map.empty[Char, Int], 0)) {
    case ((left, seen, best), (c, i)) =>
      val newLeft = seen.get(c).map(j => math.max(left, j + 1)).getOrElse(left)
      (newLeft, seen + (c -> i), math.max(best, i - newLeft + 1))
  }._3
}`,

    OCaml: `module CharMap = Map.Make(Char)

let length_of_longest_substring s =
  let chars = Array.init (String.length s) (String.get s) in
  let (_, _, result) =
    Array.fold_left
      (fun (left, seen, best) (i, c) ->
        let new_left = match CharMap.find_opt c seen with
          | Some j -> max left (j + 1)
          | None   -> left
        in
        (new_left, CharMap.add c i seen, max best (i - new_left + 1)))
      (0, CharMap.empty, 0)
      (Array.mapi (fun i c -> (i, c)) chars)
  in
  result`,

    Clojure: `(defn length-of-longest-substring [s]
  (let [[_ _ result]
        (reduce
          (fn [[left seen best] [i c]]
            (let [new-left (if-let [j (get seen c)]
                             (max left (inc j))
                             left)
                  new-seen (assoc seen c i)
                  new-best (max best (- i new-left -1))]
              [new-left new-seen new-best]))
          [0 {} 0]
          (map-indexed vector s))]
    result))`,

    Lisp: `(defun length-of-longest-substring (s)
  (let ((seen (make-hash-table :test 'equal))
        (left 0)
        (best 0))
    (loop for i from 0 below (length s)
          for c = (char s i)
          do (let ((j (gethash c seen)))
               (when (and j (>= j left))
                 (setf left (1+ j)))
               (setf (gethash c seen) i)
               (setf best (max best (- i left -1)))))
    best))`,
  },

  4: {
    TypeScript: `function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  const merged = [...nums1, ...nums2].sort((a, b) => a - b);
  const mid = Math.floor(merged.length / 2);
  return merged.length % 2 === 0
    ? (merged[mid - 1] + merged[mid]) / 2
    : merged[mid];
}`,

    Haskell: `import Data.List (sort)

findMedianSortedArrays :: [Int] -> [Int] -> Double
findMedianSortedArrays nums1 nums2 =
  let merged = sort (nums1 ++ nums2)
      n = length merged
      mid = n \`div\` 2
  in if even n
     then fromIntegral (merged !! (mid - 1) + merged !! mid) / 2.0
     else fromIntegral (merged !! mid)`,

    Elixir: `defmodule MedianSortedArrays do
  def find_median_sorted_arrays(nums1, nums2) do
    merged = Enum.sort(nums1 ++ nums2)
    n = length(merged)
    mid = div(n, 2)
    if rem(n, 2) == 0 do
      (Enum.at(merged, mid - 1) + Enum.at(merged, mid)) / 2
    else
      Enum.at(merged, mid) * 1.0
    end
  end
end`,

    Rust: `pub fn find_median_sorted_arrays(mut nums1: Vec<i32>, nums2: Vec<i32>) -> f64 {
    nums1.extend(nums2);
    nums1.sort_unstable();
    let n = nums1.len();
    let mid = n / 2;
    if n % 2 == 0 {
        (nums1[mid - 1] + nums1[mid]) as f64 / 2.0
    } else {
        nums1[mid] as f64
    }
}`,

    Scala: `def findMedianSortedArrays(nums1: Array[Int], nums2: Array[Int]): Double = {
  val merged = (nums1 ++ nums2).sorted
  val n = merged.length
  val mid = n / 2
  if (n % 2 == 0) (merged(mid - 1) + merged(mid)) / 2.0
  else merged(mid).toDouble
}`,

    OCaml: `let find_median_sorted_arrays nums1 nums2 =
  let merged = Array.append nums1 nums2 in
  Array.sort compare merged;
  let n = Array.length merged in
  let mid = n / 2 in
  if n mod 2 = 0 then
    float_of_int (merged.(mid - 1) + merged.(mid)) /. 2.0
  else
    float_of_int merged.(mid)`,

    Clojure: `(defn find-median-sorted-arrays [nums1 nums2]
  (let [merged (sort (concat nums1 nums2))
        n (count merged)
        mid (quot n 2)]
    (if (even? n)
      (/ (+ (nth merged (dec mid)) (nth merged mid)) 2.0)
      (double (nth merged mid)))))`,

    Lisp: `(defun find-median-sorted-arrays (nums1 nums2)
  (let* ((merged (sort (append nums1 nums2) #'<))
         (n (length merged))
         (mid (floor n 2)))
    (if (evenp n)
        (/ (+ (nth (1- mid) merged) (nth mid merged)) 2.0)
        (float (nth mid merged)))))`,
  },

  5: {
    TypeScript: `function longestPalindrome(s: string): string {
  const expandAroundCenter = (left: number, right: number): string => {
    if (left < 0 || right >= s.length || s[left] !== s[right]) {
      return s.slice(left + 1, right);
    }
    return expandAroundCenter(left - 1, right + 1);
  };

  return [...s].reduce((best, _, i) => {
    const odd = expandAroundCenter(i, i);
    const even = expandAroundCenter(i, i + 1);
    const candidate = odd.length >= even.length ? odd : even;
    return candidate.length > best.length ? candidate : best;
  }, '');
}`,

    Haskell: `longestPalindrome :: String -> String
longestPalindrome s = foldl findBest "" [0 .. length s - 1]
  where
    expand l r
      | l < 0 || r >= length s || s !! l /= s !! r =
          take (r - l - 1) (drop (l + 1) s)
      | otherwise = expand (l - 1) (r + 1)
    findBest best i =
      let odd  = expand i i
          even = expand i (i + 1)
          candidate = if length odd >= length even then odd else even
      in if length candidate > length best then candidate else best`,

    Elixir: `defmodule LongestPalindrome do
  def longest_palindrome(s) do
    chars = String.graphemes(s)
    len = length(chars)

    Enum.reduce(0..(len - 1), "", fn i, best ->
      odd  = expand(chars, i, i)
      even = expand(chars, i, i + 1)
      candidate = if String.length(odd) >= String.length(even), do: odd, else: even
      if String.length(candidate) > String.length(best), do: candidate, else: best
    end)
  end

  defp expand(chars, l, r) when l < 0 or r >= length(chars), do: ""
  defp expand(chars, l, r) do
    if Enum.at(chars, l) == Enum.at(chars, r) do
      expand(chars, l - 1, r + 1)
    else
      Enum.slice(chars, (l + 1)..(r - 1)) |> Enum.join()
    end
  end
end`,

    Rust: `pub fn longest_palindrome(s: String) -> String {
    let chars: Vec<char> = s.chars().collect();
    let n = chars.len();

    let expand = |mut l: i32, mut r: i32| -> &str {
        while l >= 0 && r < n as i32 && chars[l as usize] == chars[r as usize] {
            l -= 1;
            r += 1;
        }
        &s[(l + 1) as usize..r as usize]
    };

    (0..n).fold("", |best, i| {
        let odd = expand(i as i32, i as i32);
        let even = expand(i as i32, i as i32 + 1);
        let candidate = if odd.len() >= even.len() { odd } else { even };
        if candidate.len() > best.len() { candidate } else { best }
    }).to_string()
}`,

    Scala: `def longestPalindrome(s: String): String = {
  def expand(l: Int, r: Int): String = {
    var (ll, rr) = (l, r)
    while (ll >= 0 && rr < s.length && s(ll) == s(rr)) { ll -= 1; rr += 1 }
    s.substring(ll + 1, rr)
  }
  s.indices.foldLeft("") { (best, i) =>
    val odd  = expand(i, i)
    val even = expand(i, i + 1)
    val candidate = if (odd.length >= even.length) odd else even
    if (candidate.length > best.length) candidate else best
  }
}`,

    OCaml: `let longest_palindrome s =
  let n = String.length s in
  let expand l r =
    let l = ref l and r = ref r in
    while !l >= 0 && !r < n && s.[!l] = s.[!r] do
      decr l; incr r
    done;
    String.sub s (!l + 1) (!r - !l - 1)
  in
  let best = ref "" in
  for i = 0 to n - 1 do
    let odd  = expand i i in
    let even = expand i (i + 1) in
    let candidate =
      if String.length odd >= String.length even then odd else even
    in
    if String.length candidate > String.length !best then best := candidate
  done;
  !best`,

    Clojure: `(defn longest-palindrome [s]
  (let [chars (vec s)
        n (count chars)
        expand (fn [l r]
                 (loop [l l, r r]
                   (if (and (>= l 0) (< r n) (= (chars l) (chars r)))
                     (recur (dec l) (inc r))
                     (subs s (inc l) r))))]
    (reduce
      (fn [best i]
        (let [odd  (expand i i)
              even (expand i (inc i))
              candidate (if (>= (count odd) (count even)) odd even)]
          (if (> (count candidate) (count best)) candidate best)))
      ""
      (range n))))`,

    Lisp: `(defun longest-palindrome (s)
  (let ((best ""))
    (labels ((expand (l r)
               (loop while (and (>= l 0) (< r (length s))
                                (char= (char s l) (char s r)))
                     do (decf l) (incf r))
               (subseq s (1+ l) r)))
      (loop for i from 0 below (length s)
            for odd  = (expand i i)
            for even = (expand i (1+ i))
            for candidate = (if (>= (length odd) (length even)) odd even)
            when (> (length candidate) (length best))
              do (setf best candidate)))
    best))`,
  },
};
