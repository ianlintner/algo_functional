import { SolutionsRegistry, type SolutionMap } from "../types";

function deriveSchemeSolution(problemId: number, source: SolutionMap): string {
  const base =
    source.Lisp ?? source.Clojure ?? source.Haskell ?? source.TypeScript;

  if (!base) {
    return `;; Scheme solution unavailable for problem ${problemId}.`;
  }

  const translated = (
    source.Lisp
      ? base
          .replace(/^\(defun\s+([^\s(]+)\s*\(([^)]*)\)/gm, "(define ($1 $2)")
          .replace(
            /^\(defstruct\s+([^\s)]+)(.*)$/gm,
            ";; NOTE: original Common Lisp struct retained for Scheme porting\n;; $&",
          )
      : base
          .replace(/^\(defn\s+([^\s\[]+)\s*\[([^\]]*)\]/gm, "(define ($1 $2)")
          .replace(/\[/g, "(")
          .replace(/\]/g, ")")
  ).trimEnd();

  return [
    `;; Scheme version for problem ${problemId}`,
    ";; Derived from the closest existing Lisp-family reference implementation.",
    translated,
  ].join("\n");
}

function deriveUnisonSolution(problemId: number, source: SolutionMap): string {
  const base = source.Haskell ?? source.OCaml ?? source.TypeScript;

  if (!base) {
    return `-- Unison solution unavailable for problem ${problemId}.`;
  }

  const translated = base
    .replace(/::/g, ":")
    .replace(/\bMaybe\b/g, "Optional")
    .replace(/\bNothing\b/g, "None")
    .replace(/\bJust\b/g, "Some")
    .trimEnd();

  return [
    `-- Unison version for problem ${problemId}`,
    "-- Derived from the functional reference implementation already in the registry.",
    translated,
  ].join("\n");
}

function withDerivedLanguages(registry: SolutionsRegistry): SolutionsRegistry {
  return Object.fromEntries(
    Object.entries(registry).map(([id, solutions]) => {
      const problemId = Number(id);
      const source = solutions as SolutionMap;
      return [
        problemId,
        {
          ...source,
          Scheme: source.Scheme ?? deriveSchemeSolution(problemId, source),
          Unison: source.Unison ?? deriveUnisonSolution(problemId, source),
        },
      ];
    }),
  ) as SolutionsRegistry;
}

const BASE_SOLUTIONS: SolutionsRegistry = {
  // ─── Problem 1: Two Sum (LC 1) ───────────────────────────────────────────────
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

    Scheme: `(define (two-sum nums target)
  (let loop ((rest nums) (i 0) (seen '()))
    (if (null? rest)
        '()
        (let* ((num (car rest))
               (complement (- target num))
               (match (assoc complement seen)))
          (if match
              (list (cdr match) i)
              (loop (cdr rest)
                    (+ i 1)
                    (cons (cons num i) seen)))))))`,

    Unison: `twoSum : [Int] -> Int -> [Int]
twoSum nums target =
  let
    lookup key pairs =
      match pairs with
        [] -> None
        (k, value) +: rest ->
          if k == key then Some value else lookup key rest

    go remaining index seen =
      match remaining with
        [] -> []
        x +: xs ->
          let complement = target - x
          in match lookup complement seen with
            Some found -> [found, index]
            None -> go xs (index + 1) ((x, index) +: seen)
  in
    go nums 0 []`,
  },

  // ─── Problem 2: Add Two Numbers (LC 2) ──────────────────────────────────────
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

    Scheme: `(define (add-two-numbers l1 l2)
  (let loop ((a l1) (b l2) (carry 0))
    (if (and (null? a) (null? b) (= carry 0))
        '()
        (let* ((v1 (if (null? a) 0 (car a)))
               (v2 (if (null? b) 0 (car b)))
               (sum (+ v1 v2 carry)))
          (cons (modulo sum 10)
                (loop (if (null? a) '() (cdr a))
                      (if (null? b) '() (cdr b))
                      (quotient sum 10))))))`,

    Unison: `addTwoNumbers : [Int] -> [Int] -> [Int]
addTwoNumbers l1 l2 =
  let
    go a b carry =
      match (a, b, carry) with
        ([], [], 0) -> []
        _ ->
          let
            v1 = match a with
              [] -> 0
              x +: _ -> x
            v2 = match b with
              [] -> 0
              x +: _ -> x
            rest1 = match a with
              [] -> []
              _ +: xs -> xs
            rest2 = match b with
              [] -> []
              _ +: xs -> xs
            total = v1 + v2 + carry
          in
            mod total 10 +: go rest1 rest2 (total / 10)
  in
    go l1 l2 0`,
  },

  // ─── Problem 3: Longest Substring Without Repeating Characters (LC 3) ───────
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

    Scheme: `(define (length-of-longest-substring s)
  (let ((chars (string->list s)))
    (let loop ((rest chars) (i 0) (left 0) (seen '()) (best 0))
      (if (null? rest)
          best
          (let* ((ch (car rest))
                 (entry (assoc ch seen))
                 (new-left (if entry (max left (+ (cdr entry) 1)) left))
                 (new-best (max best (+ (- i new-left) 1))))
            (loop (cdr rest)
                  (+ i 1)
                  new-left
                  (cons (cons ch i) seen)
                  new-best))))))`,

    Unison: `lengthOfLongestSubstring : Text -> Int
lengthOfLongestSubstring s =
  let
    chars = Text.toCharList s

    lookup key pairs =
      match pairs with
        [] -> None
        (k, value) +: rest ->
          if k == key then Some value else lookup key rest

    go remaining index left seen best =
      match remaining with
        [] -> best
        ch +: rest ->
          let
            nextLeft =
              match lookup ch seen with
                Some previous -> max left (previous + 1)
                None -> left
            nextBest = max best (index - nextLeft + 1)
          in
            go rest (index + 1) nextLeft ((ch, index) +: seen) nextBest
  in
    go chars 0 0 [] 0`,
  },

  // ─── Problem 4: Median of Two Sorted Arrays (LC 4) ──────────────────────────
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

    Scheme: `(define (merge-sorted xs ys)
  (cond
    ((null? xs) ys)
    ((null? ys) xs)
    ((<= (car xs) (car ys))
     (cons (car xs) (merge-sorted (cdr xs) ys)))
    (else
     (cons (car ys) (merge-sorted xs (cdr ys))))))

(define (find-median-sorted-arrays nums1 nums2)
  (let* ((merged (merge-sorted nums1 nums2))
         (n (length merged))
         (mid (quotient n 2)))
    (if (even? n)
        (/ (+ (list-ref merged (- mid 1)) (list-ref merged mid)) 2.0)
        (* 1.0 (list-ref merged mid)))))`,

    Unison: `findMedianSortedArrays : [Int] -> [Int] -> Float
findMedianSortedArrays nums1 nums2 =
  let
    merge xs ys =
      match (xs, ys) with
        ([], _) -> ys
        (_, []) -> xs
        (x +: xt, y +: yt) ->
          if x <= y then x +: merge xt ys else y +: merge xs yt

    at values index =
      match (values, index) with
        (x +: _, 0) -> x
        (_ +: rest, n) -> at rest (n - 1)
        _ -> 0

    merged = merge nums1 nums2
    n = length merged
    mid = n / 2
  in
    if mod n 2 == 0 then
      Float.fromInt (at merged (mid - 1) + at merged mid) / 2.0
    else
      Float.fromInt (at merged mid)`,
  },

  // ─── Problem 5: Longest Palindromic Substring (LC 5) ────────────────────────
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

    Scheme: `(define (longest-palindrome s)
  (define n (string-length s))
  (define (expand left right)
    (let loop ((l left) (r right))
      (if (and (>= l 0)
               (< r n)
               (char=? (string-ref s l) (string-ref s r)))
          (loop (- l 1) (+ r 1))
          (substring s (+ l 1) r))))
  (let loop ((i 0) (best ""))
    (if (= i n)
        best
        (let* ((odd (expand i i))
               (even (expand i (+ i 1)))
               (candidate (if (>= (string-length odd) (string-length even)) odd even))
               (next-best (if (> (string-length candidate) (string-length best)) candidate best)))
          (loop (+ i 1) next-best))))`,

    Unison: `longestPalindrome : Text -> Text
longestPalindrome s =
  let
    n = Text.size s

    expand left right =
      if left < 0 || right >= n || Text.at s left != Text.at s right then
        Text.slice s (left + 1) right
      else
        expand (left - 1) (right + 1)

    go index best =
      if index >= n then best
      else
        let
          odd = expand index index
          even = expand index (index + 1)
          candidate = if Text.size odd >= Text.size even then odd else even
          nextBest = if Text.size candidate > Text.size best then candidate else best
        in
          go (index + 1) nextBest
  in
    go 0 ""`,
  },

  // ─── Problem 6: Reverse Integer (LC 7) ──────────────────────────────────────
  6: {
    TypeScript: `function reverse(x: number): number {
  const sign = x < 0 ? -1 : 1;
  const reversed = Math.abs(x)
    .toString()
    .split('')
    .reduce((acc, d) => acc + d, '')
    .split('')
    .reverse()
    .join('');
  const result = sign * parseInt(reversed, 10);
  return result > 2**31 - 1 || result < -(2**31) ? 0 : result;
}`,

    Haskell: `reverseInteger :: Int -> Int
reverseInteger x =
  let sign = if x < 0 then -1 else 1
      digits = show (abs x)
      reversed = sign * read (reverse digits)
      maxInt = 2^31 - 1
      minInt = -(2^31)
  in if reversed > maxInt || reversed < minInt then 0 else reversed`,

    Elixir: `defmodule ReverseInteger do
  def reverse(x) do
    sign = if x < 0, do: -1, else: 1
    reversed =
      abs(x)
      |> Integer.digits()
      |> Enum.reverse()
      |> Integer.undigits()
      |> Kernel.*(sign)

    max_int = :math.pow(2, 31) |> trunc() |> Kernel.-(1)
    min_int = -(:math.pow(2, 31) |> trunc())
    if reversed > max_int or reversed < min_int, do: 0, else: reversed
  end
end`,

    Rust: `pub fn reverse(x: i32) -> i32 {
    let sign = if x < 0 { -1i64 } else { 1i64 };
    let reversed = x.abs()
        .to_string()
        .chars()
        .rev()
        .collect::<String>()
        .parse::<i64>()
        .unwrap_or(0)
        * sign;
    if reversed > i32::MAX as i64 || reversed < i32::MIN as i64 {
        0
    } else {
        reversed as i32
    }
}`,

    Scala: `def reverse(x: Int): Int = {
  val sign = if (x < 0) -1L else 1L
  val reversed = math.abs(x.toLong).toString.reverse.toLong * sign
  if (reversed > Int.MaxValue || reversed < Int.MinValue) 0
  else reversed.toInt
}`,

    OCaml: `let reverse_integer x =
  let sign = if x < 0 then -1 else 1 in
  let s = string_of_int (abs x) in
  let n = String.length s in
  let reversed_s = String.init n (fun i -> s.[n - 1 - i]) in
  let reversed = sign * int_of_string reversed_s in
  let max_int32 = 2147483647 in
  let min_int32 = -2147483648 in
  if reversed > max_int32 || reversed < min_int32 then 0 else reversed`,

    Clojure: `(defn reverse-integer [x]
  (let [sign (if (neg? x) -1 1)
        reversed (->> (Math/abs (long x))
                      str
                      clojure.string/reverse
                      Long/parseLong
                      (* sign))
        max-int (dec (long (Math/pow 2 31)))
        min-int (- (long (Math/pow 2 31)))]
    (if (or (> reversed max-int) (< reversed min-int)) 0 reversed)))`,

    Lisp: `(defun reverse-integer (x)
  (let* ((sign (if (< x 0) -1 1))
         (digits (reverse (coerce (write-to-string (abs x)) 'list)))
         (reversed (* sign (parse-integer (coerce digits 'string))))
         (max-int (1- (expt 2 31)))
         (min-int (- (expt 2 31))))
    (if (or (> reversed max-int) (< reversed min-int)) 0 reversed)))`,

    Scheme: `(define (reverse-integer x)
  (define max-int 2147483647)
  (define min-int -2147483648)
  (define (reverse-digits n acc)
    (if (= n 0)
        acc
        (reverse-digits (quotient n 10)
                        (+ (* acc 10) (modulo n 10)))))
  (let* ((sign (if (< x 0) -1 1))
         (reversed (* sign (reverse-digits (abs x) 0))))
    (if (or (> reversed max-int) (< reversed min-int))
        0
        reversed)))`,

    Unison: `reverseInteger : Int -> Int
reverseInteger x =
  let
    maxInt = 2147483647
    minInt = -2147483648

    reverseDigits n acc =
      if n == 0 then acc else reverseDigits (n / 10) (acc * 10 + mod n 10)

    sign = if x < 0 then -1 else 1
    reversed = sign * reverseDigits (abs x) 0
  in
    if reversed < minInt || reversed > maxInt then 0 else reversed`,
  },

  // ─── Problem 7: String to Integer atoi (LC 8) ──────────────────────────────
  7: {
    TypeScript: `function myAtoi(s: string): number {
  const trimmed = s.trimStart();
  const [sign, rest] = trimmed[0] === '-' ? [-1, trimmed.slice(1)]
    : trimmed[0] === '+' ? [1, trimmed.slice(1)]
    : [1, trimmed];

  const num = [...rest].reduce((acc, ch) => {
    if (ch < '0' || ch > '9') return acc;
    const next = acc.result * 10 + parseInt(ch);
    return acc.done ? acc : { result: next, done: false };
  }, { result: 0, done: false });

  // Actually need to stop at first non-digit
  const digits = [...rest].reduce<number[]>((acc, ch) => {
    if (acc.length === 0 && ch >= '0' && ch <= '9') return [parseInt(ch)];
    if (acc.length > 0 && ch >= '0' && ch <= '9') return [...acc, parseInt(ch)];
    if (acc.length > 0) return acc; // stop collecting
    return acc;
  }, []);

  const result = sign * digits.reduce((acc, d) => acc * 10 + d, 0);
  const MIN = -(2 ** 31);
  const MAX = 2 ** 31 - 1;
  return Math.max(MIN, Math.min(MAX, result));
}`,

    Haskell: `import Data.Char (isDigit, digitToInt)

myAtoi :: String -> Int
myAtoi s =
  let trimmed = dropWhile (== ' ') s
      (sign, rest) = case trimmed of
        ('-':xs) -> (-1, xs)
        ('+':xs) -> (1, xs)
        xs       -> (1, xs)
      digits = takeWhile isDigit rest
      value = foldl (\\acc d -> acc * 10 + digitToInt d) 0 digits
      result = sign * value
      minInt = -(2^31)
      maxInt = 2^31 - 1
  in max minInt (min maxInt result)`,

    Elixir: `defmodule MyAtoi do
  def my_atoi(s) do
    trimmed = String.trim_leading(s)
    {sign, rest} = case trimmed do
      "-" <> r -> {-1, r}
      "+" <> r -> {1, r}
      r        -> {1, r}
    end

    digits =
      rest
      |> String.graphemes()
      |> Enum.reduce_while([], fn ch, acc ->
        if ch >= "0" and ch <= "9",
          do: {:cont, acc ++ [String.to_integer(ch)]},
          else: {:halt, acc}
      end)

    value = Enum.reduce(digits, 0, fn d, acc -> acc * 10 + d end)
    result = sign * value
    max_int = trunc(:math.pow(2, 31)) - 1
    min_int = -trunc(:math.pow(2, 31))
    max(min_int, min(max_int, result))
  end
end`,

    Rust: `pub fn my_atoi(s: String) -> i32 {
    let trimmed = s.trim_start();
    let (sign, rest) = match trimmed.chars().next() {
        Some('-') => (-1i64, &trimmed[1..]),
        Some('+') => (1i64, &trimmed[1..]),
        _ => (1i64, trimmed),
    };

    let value = rest
        .chars()
        .take_while(|c| c.is_ascii_digit())
        .fold(0i64, |acc, c| {
            (acc * 10 + c.to_digit(10).unwrap() as i64)
                .min(i32::MAX as i64 + 1)
        });

    let result = sign * value;
    result.max(i32::MIN as i64).min(i32::MAX as i64) as i32
}`,

    Scala: `def myAtoi(s: String): Int = {
  val trimmed = s.trim
  val (sign, rest) = trimmed.headOption match {
    case Some('-') => (-1L, trimmed.tail)
    case Some('+') => (1L, trimmed.tail)
    case _         => (1L, trimmed)
  }
  val digits = rest.takeWhile(_.isDigit)
  val value = digits.foldLeft(0L) { (acc, c) =>
    (acc * 10 + c.asDigit).min(Int.MaxValue.toLong + 1)
  }
  val result = sign * value
  result.max(Int.MinValue.toLong).min(Int.MaxValue.toLong).toInt
}`,

    OCaml: `let my_atoi s =
  let trimmed = String.trim s in
  let n = String.length trimmed in
  if n = 0 then 0
  else
    let sign, start =
      match trimmed.[0] with
      | '-' -> (-1, 1)
      | '+' -> (1, 1)
      | _   -> (1, 0)
    in
    let rec collect i acc =
      if i >= n then acc
      else match trimmed.[i] with
        | '0'..'9' ->
          let d = Char.code trimmed.[i] - Char.code '0' in
          collect (i + 1) (acc * 10 + d)
        | _ -> acc
    in
    let value = collect start 0 in
    let result = sign * value in
    let max_int = 2147483647 in
    let min_int = -2147483648 in
    max min_int (min max_int result)`,

    Clojure: `(defn my-atoi [s]
  (let [trimmed (clojure.string/triml s)
        [sign rest] (cond
                      (.startsWith trimmed "-") [-1 (subs trimmed 1)]
                      (.startsWith trimmed "+") [1 (subs trimmed 1)]
                      :else [1 trimmed])
        digits (take-while #(Character/isDigit %) rest)
        value (reduce (fn [acc d]
                        (min (+ (* acc 10) (Character/getNumericValue d))
                             (inc Integer/MAX_VALUE)))
                      0 digits)
        result (* sign value)
        min-int (- (long (Math/pow 2 31)))
        max-int (dec (long (Math/pow 2 31)))]
    (max min-int (min max-int result))))`,

    Lisp: `(defun my-atoi (s)
  (let* ((trimmed (string-left-trim " " s))
         (sign 1) (start 0))
    (when (> (length trimmed) 0)
      (cond ((char= (char trimmed 0) #\\-)
             (setf sign -1 start 1))
            ((char= (char trimmed 0) #\\+)
             (setf start 1))))
    (let ((value
           (reduce (lambda (acc ch)
                     (if (digit-char-p ch)
                         (min (+ (* acc 10) (digit-char-p ch))
                              (1+ 2147483647))
                         (return-from my-atoi
                           (max -2147483648
                                (min 2147483647 (* sign acc))))))
                   (subseq trimmed start)
                   :initial-value 0)))
      (max -2147483648 (min 2147483647 (* sign value))))))`,

    Scheme: `(define (my-atoi s)
  (define max-int 2147483647)
  (define min-int -2147483648)
  (define n (string-length s))

  (define (skip-spaces i)
    (if (and (< i n) (char=? (string-ref s i) #\space))
        (skip-spaces (+ i 1))
        i))

  (define (parse-digits i acc)
    (if (and (< i n) (char-numeric? (string-ref s i)))
        (parse-digits (+ i 1)
                      (+ (* acc 10)
                         (- (char->integer (string-ref s i))
                            (char->integer #\0))))
        acc))

  (let* ((start (skip-spaces 0))
         (sign (cond
                 ((and (< start n) (char=? (string-ref s start) #\-)) -1)
                 ((and (< start n) (char=? (string-ref s start) #\+)) 1)
                 (else 1)))
         (digit-start (if (and (< start n)
                               (or (char=? (string-ref s start) #\-)
                                   (char=? (string-ref s start) #\+)))
                          (+ start 1)
                          start))
         (value (* sign (parse-digits digit-start 0))))
    (max min-int (min max-int value)))`,

    Unison: `myAtoi : Text -> Int
myAtoi s =
  let
    maxInt = 2147483647
    minInt = -2147483648
    trimmed = Text.dropWhile (c -> c == ' ') s
    sign =
      if Text.startsWith trimmed "-" then -1
      else if Text.startsWith trimmed "+" then 1
      else 1
    body =
      if Text.startsWith trimmed "-" || Text.startsWith trimmed "+" then
        Text.drop 1 trimmed
      else
        trimmed
    digits = Text.takeWhile Char.isDigit body
    value = Text.toCharList digits |> foldl (acc ch -> acc * 10 + Char.toNat ch - Char.toNat '0') 0
    result = sign * value
  in
    max minInt (min maxInt result)`,
  },

  // ─── Problem 8: Palindrome Number (LC 9) ────────────────────────────────────
  8: {
    TypeScript: `function isPalindrome(x: number): boolean {
  if (x < 0) return false;
  const digits = x.toString().split('');
  return digits.reduce((acc, d, i) =>
    acc && d === digits[digits.length - 1 - i], true);
}`,

    Haskell: `isPalindrome :: Int -> Bool
isPalindrome x
  | x < 0    = False
  | otherwise = let s = show x in s == reverse s`,

    Elixir: `defmodule PalindromeNumber do
  def is_palindrome(x) when x < 0, do: false
  def is_palindrome(x) do
    digits = Integer.digits(x)
    digits == Enum.reverse(digits)
  end
end`,

    Rust: `pub fn is_palindrome(x: i32) -> bool {
    if x < 0 { return false; }
    let s: Vec<char> = x.to_string().chars().collect();
    s.iter().zip(s.iter().rev()).all(|(a, b)| a == b)
}`,

    Scala: `def isPalindrome(x: Int): Boolean = {
  if (x < 0) false
  else {
    val s = x.toString
    s == s.reverse
  }
}`,

    OCaml: `let is_palindrome x =
  if x < 0 then false
  else
    let s = string_of_int x in
    let n = String.length s in
    let rec check i =
      if i >= n / 2 then true
      else s.[i] = s.[n - 1 - i] && check (i + 1)
    in
    check 0`,

    Clojure: `(defn is-palindrome [x]
  (if (neg? x) false
    (let [s (str x)]
      (= s (apply str (reverse s))))))`,

    Lisp: `(defun is-palindrome (x)
  (when (>= x 0)
    (let ((s (write-to-string x)))
      (string= s (reverse s)))))`,

    Scheme: `(define (is-palindrome x)
  (and (>= x 0)
       (let* ((s (number->string x))
              (chars (string->list s)))
         (equal? chars (reverse chars)))))`,

    Unison: `isPalindrome : Int -> Boolean
isPalindrome x =
  if x < 0 then
    false
  else
    let text = Int.toText x
    in text == Text.reverse text`,
  },

  // ─── Problem 9: Container With Most Water (LC 11) ──────────────────────────
  9: {
    TypeScript: `function maxArea(height: number[]): number {
  const solve = (left: number, right: number, best: number): number => {
    if (left >= right) return best;
    const area = Math.min(height[left], height[right]) * (right - left);
    const newBest = Math.max(best, area);
    return height[left] < height[right]
      ? solve(left + 1, right, newBest)
      : solve(left, right - 1, newBest);
  };
  return solve(0, height.length - 1, 0);
}`,

    Haskell: `import Data.Vector (Vector, (!))
import qualified Data.Vector as V

maxArea :: Vector Int -> Int
maxArea height = go 0 (V.length height - 1) 0
  where
    go l r best
      | l >= r    = best
      | otherwise =
          let area = min (height ! l) (height ! r) * (r - l)
              newBest = max best area
          in if height ! l < height ! r
             then go (l + 1) r newBest
             else go l (r - 1) newBest`,

    Elixir: `defmodule ContainerWater do
  def max_area(height) do
    arr = :array.from_list(height)
    solve(arr, 0, :array.size(arr) - 1, 0)
  end

  defp solve(_arr, l, r, best) when l >= r, do: best
  defp solve(arr, l, r, best) do
    hl = :array.get(l, arr)
    hr = :array.get(r, arr)
    area = min(hl, hr) * (r - l)
    new_best = max(best, area)
    if hl < hr,
      do: solve(arr, l + 1, r, new_best),
      else: solve(arr, l, r - 1, new_best)
  end
end`,

    Rust: `pub fn max_area(height: Vec<i32>) -> i32 {
    fn solve(h: &[i32], l: usize, r: usize, best: i32) -> i32 {
        if l >= r { return best; }
        let area = h[l].min(h[r]) * (r - l) as i32;
        let new_best = best.max(area);
        if h[l] < h[r] {
            solve(h, l + 1, r, new_best)
        } else {
            solve(h, l, r - 1, new_best)
        }
    }
    solve(&height, 0, height.len() - 1, 0)
}`,

    Scala: `def maxArea(height: Array[Int]): Int = {
  @annotation.tailrec
  def solve(l: Int, r: Int, best: Int): Int = {
    if (l >= r) best
    else {
      val area = math.min(height(l), height(r)) * (r - l)
      val newBest = math.max(best, area)
      if (height(l) < height(r)) solve(l + 1, r, newBest)
      else solve(l, r - 1, newBest)
    }
  }
  solve(0, height.length - 1, 0)
}`,

    OCaml: `let max_area height =
  let arr = Array.of_list height in
  let n = Array.length arr in
  let rec solve l r best =
    if l >= r then best
    else
      let area = min arr.(l) arr.(r) * (r - l) in
      let new_best = max best area in
      if arr.(l) < arr.(r) then solve (l + 1) r new_best
      else solve l (r - 1) new_best
  in
  solve 0 (n - 1) 0`,

    Clojure: `(defn max-area [height]
  (let [h (vec height)]
    (loop [l 0, r (dec (count h)), best 0]
      (if (>= l r) best
        (let [area (* (min (h l) (h r)) (- r l))
              new-best (max best area)]
          (if (< (h l) (h r))
            (recur (inc l) r new-best)
            (recur l (dec r) new-best)))))))`,

    Lisp: `(defun max-area (height)
  (let ((h (coerce height 'vector)))
    (labels ((solve (l r best)
               (if (>= l r) best
                   (let* ((area (* (min (aref h l) (aref h r)) (- r l)))
                          (new-best (max best area)))
                     (if (< (aref h l) (aref h r))
                         (solve (1+ l) r new-best)
                         (solve l (1- r) new-best))))))
      (solve 0 (1- (length h)) 0))))`,
  },

  // ─── Problem 10: Rotting Oranges (LC 994) ───────────────────────────────────
  10: {
    TypeScript: `function orangesRotting(grid: number[][]): number {
  const rows = grid.length, cols = grid[0].length;
  type State = { grid: number[][]; queue: [number, number][]; time: number };

  const neighbors = (r: number, c: number): [number, number][] =>
    [[r-1,c],[r+1,c],[r,c-1],[r,c+1]]
      .filter(([nr,nc]) => nr >= 0 && nr < rows && nc >= 0 && nc < cols) as [number,number][];

  const initial: State = {
    grid: grid.map(row => [...row]),
    queue: grid.flatMap((row, r) =>
      row.map((v, c) => v === 2 ? [r, c] as [number, number] : null).filter(Boolean) as [number, number][]),
    time: 0,
  };

  const bfs = (state: State): number => {
    if (state.queue.length === 0) {
      return state.grid.some(row => row.includes(1)) ? -1 : state.time;
    }
    const nextQueue: [number, number][] = [];
    const newGrid = state.grid.map(row => [...row]);
    state.queue.forEach(([r, c]) => {
      neighbors(r, c).forEach(([nr, nc]) => {
        if (newGrid[nr][nc] === 1) {
          newGrid[nr][nc] = 2;
          nextQueue.push([nr, nc]);
        }
      });
    });
    return nextQueue.length === 0
      ? (newGrid.some(row => row.includes(1)) ? -1 : state.time)
      : bfs({ grid: newGrid, queue: nextQueue, time: state.time + 1 });
  };

  return bfs(initial);
}`,

    Haskell: `import qualified Data.Set as Set

orangesRotting :: [[Int]] -> Int
orangesRotting grid = bfs rotten fresh 0
  where
    rows = length grid
    cols = length (head grid)
    indexed = [ ((r, c), grid !! r !! c) | r <- [0..rows-1], c <- [0..cols-1] ]
    rotten = Set.fromList [ pos | (pos, 2) <- indexed ]
    fresh  = Set.fromList [ pos | (pos, 1) <- indexed ]
    neighbors (r, c) = filter valid [(r-1,c),(r+1,c),(r,c-1),(r,c+1)]
    valid (r, c) = r >= 0 && r < rows && c >= 0 && c < cols

    bfs rot fr time
      | Set.null fr = time
      | Set.null newRotten = -1
      | otherwise = bfs (Set.union rot newRotten) (Set.difference fr newRotten) (time + 1)
      where
        newRotten = Set.fromList
          [ n | r <- Set.toList rot, n <- neighbors r, Set.member n fr ]`,

    Elixir: `defmodule RottingOranges do
  def oranges_rotting(grid) do
    rows = length(grid)
    cols = length(hd(grid))
    cells = for {row, r} <- Enum.with_index(grid),
                {val, c} <- Enum.with_index(row), do: {{r, c}, val}
    rotten = for {{r, c}, 2} <- cells, do: {r, c}
    fresh = MapSet.new(for {{r, c}, 1} <- cells, do: {r, c})
    bfs(rotten, fresh, rows, cols, 0)
  end

  defp bfs([], fresh, _, _, time), do: if MapSet.size(fresh) == 0, do: time, else: -1
  defp bfs(queue, fresh, rows, cols, time) do
    {new_queue, new_fresh} =
      Enum.reduce(queue, {[], fresh}, fn {r, c}, {nq, fr} ->
        [{r-1,c},{r+1,c},{r,c-1},{r,c+1}]
        |> Enum.filter(fn {nr, nc} -> nr >= 0 and nr < rows and nc >= 0 and nc < cols end)
        |> Enum.reduce({nq, fr}, fn pos, {nq2, fr2} ->
          if MapSet.member?(fr2, pos),
            do: {[pos | nq2], MapSet.delete(fr2, pos)},
            else: {nq2, fr2}
        end)
      end)
    if new_queue == [],
      do: (if MapSet.size(new_fresh) == 0, do: time, else: -1),
      else: bfs(new_queue, new_fresh, rows, cols, time + 1)
  end
end`,

    Rust: `use std::collections::VecDeque;

pub fn oranges_rotting(mut grid: Vec<Vec<i32>>) -> i32 {
    let (rows, cols) = (grid.len(), grid[0].len());
    let mut queue: VecDeque<(usize, usize)> = VecDeque::new();
    let mut fresh = 0;

    for r in 0..rows {
        for c in 0..cols {
            match grid[r][c] {
                2 => queue.push_back((r, c)),
                1 => fresh += 1,
                _ => {}
            }
        }
    }

    let dirs = [(0i32,1i32),(0,-1),(1,0),(-1,0)];
    let mut time = 0;
    while !queue.is_empty() && fresh > 0 {
        let size = queue.len();
        for _ in 0..size {
            let (r, c) = queue.pop_front().unwrap();
            for &(dr, dc) in &dirs {
                let (nr, nc) = (r as i32 + dr, c as i32 + dc);
                if nr >= 0 && nr < rows as i32 && nc >= 0 && nc < cols as i32 {
                    let (nr, nc) = (nr as usize, nc as usize);
                    if grid[nr][nc] == 1 {
                        grid[nr][nc] = 2;
                        fresh -= 1;
                        queue.push_back((nr, nc));
                    }
                }
            }
        }
        time += 1;
    }
    if fresh > 0 { -1 } else { time }
}`,

    Scala: `def orangesRotting(grid: Array[Array[Int]]): Int = {
  val rows = grid.length; val cols = grid(0).length
  val indexed = for (r <- 0 until rows; c <- 0 until cols) yield ((r, c), grid(r)(c))
  val rotten = indexed.collect { case ((r, c), 2) => (r, c) }.toList
  val fresh  = indexed.collect { case ((r, c), 1) => (r, c) }.toSet

  @annotation.tailrec
  def bfs(queue: List[(Int, Int)], fr: Set[(Int, Int)], time: Int): Int = {
    if (fr.isEmpty) time
    else if (queue.isEmpty) -1
    else {
      val (nextQ, nextFr) = queue.foldLeft((List.empty[(Int,Int)], fr)) {
        case ((nq, f), (r, c)) =>
          List((r-1,c),(r+1,c),(r,c-1),(r,c+1))
            .filter { case (nr,nc) => nr>=0 && nr<rows && nc>=0 && nc<cols && f.contains((nr,nc)) }
            .foldLeft((nq, f)) { case ((nq2, f2), pos) => (pos :: nq2, f2 - pos) }
      }
      if (nextQ.isEmpty) (if (nextFr.isEmpty) time else -1)
      else bfs(nextQ, nextFr, time + 1)
    }
  }
  bfs(rotten, fresh, 0)
}`,

    OCaml: `let oranges_rotting grid =
  let rows = Array.length grid in
  let cols = Array.length grid.(0) in
  let grid = Array.map Array.copy grid in
  let queue = Queue.create () in
  let fresh = ref 0 in
  for r = 0 to rows - 1 do
    for c = 0 to cols - 1 do
      if grid.(r).(c) = 2 then Queue.push (r, c) queue
      else if grid.(r).(c) = 1 then incr fresh
    done
  done;
  let dirs = [|(0,1);(0,-1);(1,0);(-1,0)|] in
  let time = ref 0 in
  while not (Queue.is_empty queue) && !fresh > 0 do
    let size = Queue.length queue in
    for _ = 1 to size do
      let (r, c) = Queue.pop queue in
      Array.iter (fun (dr, dc) ->
        let nr = r + dr and nc = c + dc in
        if nr >= 0 && nr < rows && nc >= 0 && nc < cols
           && grid.(nr).(nc) = 1 then begin
          grid.(nr).(nc) <- 2;
          decr fresh;
          Queue.push (nr, nc) queue
        end) dirs
    done;
    incr time
  done;
  if !fresh > 0 then -1 else !time`,

    Clojure: `(defn oranges-rotting [grid]
  (let [rows (count grid) cols (count (first grid))
        cells (for [r (range rows) c (range cols)]
                [[r c] (get-in grid [r c])])
        rotten (map first (filter #(= 2 (second %)) cells))
        fresh  (set (map first (filter #(= 1 (second %)) cells)))
        dirs [[0 1] [0 -1] [1 0] [-1 0]]]
    (loop [q (vec rotten), fr fresh, time 0]
      (cond
        (empty? fr) time
        (empty? q) -1
        :else
        (let [{:keys [nq nf]}
              (reduce (fn [{:keys [nq nf]} [r c]]
                        (reduce (fn [{:keys [nq nf]} [dr dc]]
                                  (let [nr (+ r dr) nc (+ c dc)]
                                    (if (and (>= nr 0) (< nr rows)
                                             (>= nc 0) (< nc cols)
                                             (contains? nf [nr nc]))
                                      {:nq (conj nq [nr nc]) :nf (disj nf [nr nc])}
                                      {:nq nq :nf nf})))
                                {:nq nq :nf nf} dirs))
                      {:nq [] :nf fr} q)]
          (if (empty? nq)
            (if (empty? nf) time -1)
            (recur nq nf (inc time))))))))`,

    Lisp: `(defun oranges-rotting (grid)
  (let* ((rows (length grid))
         (cols (length (first grid)))
         (g (make-array (list rows cols)
              :initial-contents grid))
         (queue nil) (fresh 0))
    (dotimes (r rows)
      (dotimes (c cols)
        (case (aref g r c)
          (2 (push (cons r c) queue))
          (1 (incf fresh)))))
    (let ((dirs '((-1 . 0) (1 . 0) (0 . -1) (0 . 1)))
          (time 0))
      (loop while (and queue (> fresh 0)) do
        (let ((next-q nil)
              (size (length queue)))
          (dotimes (_ size)
            (let ((pos (pop queue)))
              (dolist (d dirs)
                (let ((nr (+ (car pos) (car d)))
                      (nc (+ (cdr pos) (cdr d))))
                  (when (and (>= nr 0) (< nr rows)
                             (>= nc 0) (< nc cols)
                             (= (aref g nr nc) 1))
                    (setf (aref g nr nc) 2)
                    (decf fresh)
                    (push (cons nr nc) next-q))))))
          (setf queue next-q)
          (incf time)))
      (if (> fresh 0) -1 time))))`,
  },

  // ─── Problem 11: Roman to Integer (LC 13) ──────────────────────────────────
  11: {
    TypeScript: `function romanToInt(s: string): number {
  const values: Record<string, number> = {
    I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000
  };
  return [...s].reduceRight(
    (acc, ch) => {
      const v = values[ch];
      return v < acc.prev ? { sum: acc.sum - v, prev: v }
                          : { sum: acc.sum + v, prev: v };
    },
    { sum: 0, prev: 0 }
  ).sum;
}`,

    Haskell: `import qualified Data.Map as Map

romanToInt :: String -> Int
romanToInt s = fst $ foldr step (0, 0) s
  where
    vals = Map.fromList [('I',1),('V',5),('X',10),('L',50),
                         ('C',100),('D',500),('M',1000)]
    step ch (total, prev) =
      let v = Map.findWithDefault 0 ch vals
      in if v < prev then (total - v, v) else (total + v, v)`,

    Elixir: `defmodule RomanToInteger do
  @values %{"I" => 1, "V" => 5, "X" => 10, "L" => 50,
            "C" => 100, "D" => 500, "M" => 1000}

  def roman_to_int(s) do
    s
    |> String.graphemes()
    |> Enum.reverse()
    |> Enum.reduce({0, 0}, fn ch, {total, prev} ->
      v = Map.get(@values, ch, 0)
      if v < prev, do: {total - v, v}, else: {total + v, v}
    end)
    |> elem(0)
  end
end`,

    Rust: `pub fn roman_to_int(s: String) -> i32 {
    let value = |c| match c {
        'I' => 1, 'V' => 5, 'X' => 10, 'L' => 50,
        'C' => 100, 'D' => 500, 'M' => 1000, _ => 0,
    };
    s.chars().rev().fold((0, 0), |(total, prev), ch| {
        let v = value(ch);
        if v < prev { (total - v, v) } else { (total + v, v) }
    }).0
}`,

    Scala: `def romanToInt(s: String): Int = {
  val values = Map('I' -> 1, 'V' -> 5, 'X' -> 10, 'L' -> 50,
                   'C' -> 100, 'D' -> 500, 'M' -> 1000)
  s.foldRight((0, 0)) { case (ch, (total, prev)) =>
    val v = values(ch)
    if (v < prev) (total - v, v) else (total + v, v)
  }._1
}`,

    OCaml: `let roman_to_int s =
  let value = function
    | 'I' -> 1 | 'V' -> 5 | 'X' -> 10 | 'L' -> 50
    | 'C' -> 100 | 'D' -> 500 | 'M' -> 1000 | _ -> 0
  in
  let n = String.length s in
  let rec go i prev total =
    if i < 0 then total
    else
      let v = value s.[i] in
      if v < prev then go (i - 1) v (total - v)
      else go (i - 1) v (total + v)
  in
  go (n - 1) 0 0`,

    Clojure: `(defn roman-to-int [s]
  (let [values {\\I 1, \\V 5, \\X 10, \\L 50,
                \\C 100, \\D 500, \\M 1000}]
    (first
      (reduce (fn [[total prev] ch]
                (let [v (values ch)]
                  (if (< v prev)
                    [(- total v) v]
                    [(+ total v) v])))
              [0 0]
              (reverse s)))))`,

    Lisp: `(defun roman-to-int (s)
  (let ((values '((#\\I . 1) (#\\V . 5) (#\\X . 10) (#\\L . 50)
                  (#\\C . 100) (#\\D . 500) (#\\M . 1000))))
    (car
      (reduce (lambda (acc ch)
                (let ((v (cdr (assoc ch values))))
                  (if (< v (cdr acc))
                      (cons (- (car acc) v) v)
                      (cons (+ (car acc) v) v))))
              (reverse (coerce s 'list))
              :initial-value (cons 0 0)))))`,
  },

  // ─── Problem 12: Longest Common Prefix (LC 14) ─────────────────────────────
  12: {
    TypeScript: `function longestCommonPrefix(strs: string[]): string {
  if (strs.length === 0) return '';
  return strs.reduce((prefix, str) =>
    [...prefix].reduce(
      (acc, ch, i) => (i < str.length && str[i] === ch ? acc + ch : acc),
      ''
    ).slice(0, [...prefix].findIndex((ch, i) =>
      i >= str.length || str[i] !== ch
    ) === -1 ? prefix.length : [...prefix].findIndex((ch, i) =>
      i >= str.length || str[i] !== ch
    ))
  );
}`,

    Haskell: `longestCommonPrefix :: [String] -> String
longestCommonPrefix [] = ""
longestCommonPrefix strs = foldl1 commonPrefix strs
  where
    commonPrefix a b = map fst $ takeWhile (uncurry (==)) $ zip a b`,

    Elixir: `defmodule LongestCommonPrefix do
  def longest_common_prefix([]), do: ""
  def longest_common_prefix(strs) do
    strs
    |> Enum.reduce(fn str, prefix ->
      prefix
      |> String.graphemes()
      |> Enum.zip(String.graphemes(str))
      |> Enum.take_while(fn {a, b} -> a == b end)
      |> Enum.map(&elem(&1, 0))
      |> Enum.join()
    end)
  end
end`,

    Rust: `pub fn longest_common_prefix(strs: Vec<String>) -> String {
    if strs.is_empty() { return String::new(); }
    strs[1..].iter().fold(strs[0].clone(), |prefix, s| {
        prefix
            .chars()
            .zip(s.chars())
            .take_while(|(a, b)| a == b)
            .map(|(a, _)| a)
            .collect()
    })
}`,

    Scala: `def longestCommonPrefix(strs: Array[String]): String = {
  if (strs.isEmpty) ""
  else strs.reduce { (prefix, s) =>
    prefix.zip(s).takeWhile { case (a, b) => a == b }.map(_._1).mkString
  }
}`,

    OCaml: `let longest_common_prefix strs =
  match strs with
  | [] -> ""
  | first :: rest ->
    List.fold_left (fun prefix s ->
      let len = min (String.length prefix) (String.length s) in
      let rec find i =
        if i >= len || prefix.[i] <> s.[i] then i
        else find (i + 1)
      in
      String.sub prefix 0 (find 0)
    ) first rest`,

    Clojure: `(defn longest-common-prefix [strs]
  (if (empty? strs) ""
    (reduce
      (fn [prefix s]
        (apply str
          (map first
            (take-while (fn [[a b]] (= a b))
              (map vector prefix s)))))
      strs)))`,

    Lisp: `(defun longest-common-prefix (strs)
  (if (null strs) ""
    (reduce (lambda (prefix s)
              (let ((len (min (length prefix) (length s))))
                (subseq prefix 0
                  (loop for i from 0 below len
                        while (char= (char prefix i) (char s i))
                        finally (return i)))))
            strs)))`,
  },

  // ─── Problem 13: 3Sum (LC 15) ──────────────────────────────────────────────
  13: {
    TypeScript: `function threeSum(nums: number[]): number[][] {
  const sorted = [...nums].sort((a, b) => a - b);

  const twoSum = (arr: number[], target: number, lo: number): number[][] => {
    const go = (l: number, r: number, acc: number[][]): number[][] => {
      if (l >= r) return acc;
      const sum = arr[l] + arr[r];
      if (sum < target) return go(l + 1, r, acc);
      if (sum > target) return go(l, r - 1, acc);
      return go(
        l + 1 + (arr[l] === arr[l + 1] ? 1 : 0),
        r - 1,
        [...acc, [-target, arr[l], arr[r]]]
      );
    };
    return go(lo, arr.length - 1, []);
  };

  return sorted.reduce<number[][]>((acc, num, i) => {
    if (i > 0 && num === sorted[i - 1]) return acc;
    return [...acc, ...twoSum(sorted, -num, i + 1)];
  }, []);
}`,

    Haskell: `import Data.List (sort, nub)

threeSum :: [Int] -> [[Int]]
threeSum nums = nub $ go sorted
  where
    sorted = sort nums
    go [] = []
    go (x:xs) = map (x:) (twoSum xs (-x)) ++ go (dropWhile (==x) xs)
    twoSum xs target = go' xs (reverse xs) []
      where
        go' [] _ acc = acc
        go' _ [] acc = acc
        go' (a:as') (b:bs') acc
          | a >= b = acc
          | a + b < target = go' as' (b:bs') acc
          | a + b > target = go' (a:as') bs' acc
          | otherwise = go' (dropWhile (==a) as') bs' ([a,b]:acc)`,

    Elixir: `defmodule ThreeSum do
  def three_sum(nums) do
    sorted = Enum.sort(nums)
    sorted
    |> Enum.with_index()
    |> Enum.reduce([], fn {num, i}, acc ->
      if i > 0 and num == Enum.at(sorted, i - 1), do: acc,
      else: acc ++ two_sum(sorted, -num, i + 1, length(sorted) - 1)
    end)
  end

  defp two_sum(arr, target, l, r) when l >= r, do: []
  defp two_sum(arr, target, l, r) do
    sum = Enum.at(arr, l) + Enum.at(arr, r)
    cond do
      sum < target -> two_sum(arr, target, l + 1, r)
      sum > target -> two_sum(arr, target, l, r - 1)
      true ->
        [[- target, Enum.at(arr, l), Enum.at(arr, r)] |
         two_sum(arr, target, next_l(arr, l), r - 1)]
    end
  end

  defp next_l(arr, l) do
    if Enum.at(arr, l) == Enum.at(arr, l + 1), do: next_l(arr, l + 1), else: l + 1
  end
end`,

    Rust: `pub fn three_sum(mut nums: Vec<i32>) -> Vec<Vec<i32>> {
    nums.sort();
    let n = nums.len();
    let mut result = Vec::new();
    for i in 0..n {
        if i > 0 && nums[i] == nums[i - 1] { continue; }
        let (mut l, mut r) = (i + 1, n.wrapping_sub(1));
        while l < r {
            let sum = nums[i] + nums[l] + nums[r];
            match sum.cmp(&0) {
                std::cmp::Ordering::Less => l += 1,
                std::cmp::Ordering::Greater => r -= 1,
                std::cmp::Ordering::Equal => {
                    result.push(vec![nums[i], nums[l], nums[r]]);
                    while l < r && nums[l] == nums[l + 1] { l += 1; }
                    l += 1; r -= 1;
                }
            }
        }
    }
    result
}`,

    Scala: `def threeSum(nums: Array[Int]): List[List[Int]] = {
  val sorted = nums.sorted
  val n = sorted.length

  def twoSum(target: Int, lo: Int, hi: Int, acc: List[List[Int]]): List[List[Int]] = {
    if (lo >= hi) acc
    else {
      val sum = sorted(lo) + sorted(hi)
      if (sum < target) twoSum(target, lo + 1, hi, acc)
      else if (sum > target) twoSum(target, lo, hi - 1, acc)
      else {
        val triple = List(-target, sorted(lo), sorted(hi))
        val newLo = (lo + 1 to hi).find(i => sorted(i) != sorted(lo)).getOrElse(hi)
        twoSum(target, newLo, hi - 1, triple :: acc)
      }
    }
  }

  (0 until n).foldLeft(List.empty[List[Int]]) { (acc, i) =>
    if (i > 0 && sorted(i) == sorted(i - 1)) acc
    else acc ++ twoSum(-sorted(i), i + 1, n - 1, Nil)
  }
}`,

    OCaml: `let three_sum nums =
  let sorted = List.sort compare nums |> Array.of_list in
  let n = Array.length sorted in
  let results = ref [] in
  for i = 0 to n - 1 do
    if i = 0 || sorted.(i) <> sorted.(i - 1) then begin
      let l = ref (i + 1) and r = ref (n - 1) in
      while !l < !r do
        let sum = sorted.(i) + sorted.(!l) + sorted.(!r) in
        if sum < 0 then incr l
        else if sum > 0 then decr r
        else begin
          results := [sorted.(i); sorted.(!l); sorted.(!r)] :: !results;
          while !l < !r && sorted.(!l) = sorted.(!l + 1) do incr l done;
          incr l; decr r
        end
      done
    end
  done;
  !results`,

    Clojure: `(defn three-sum [nums]
  (let [sorted (vec (sort nums))
        n (count sorted)]
    (loop [i 0, result []]
      (if (>= i n) result
        (if (and (> i 0) (= (sorted i) (sorted (dec i))))
          (recur (inc i) result)
          (let [target (- (sorted i))
                trips (loop [l (inc i), r (dec n), acc []]
                        (if (>= l r) acc
                          (let [s (+ (sorted l) (sorted r))]
                            (cond
                              (< s target) (recur (inc l) r acc)
                              (> s target) (recur l (dec r) acc)
                              :else (let [nl (loop [ll (inc l)]
                                            (if (and (< ll r) (= (sorted ll) (sorted l)))
                                              (recur (inc ll)) ll))]
                                     (recur nl (dec r)
                                       (conj acc [(- target) (sorted l) (sorted r)])))))))]
            (recur (inc i) (into result trips))))))))`,

    Lisp: `(defun three-sum (nums)
  (let* ((sorted (sort (copy-list nums) #'<))
         (arr (coerce sorted 'vector))
         (n (length arr))
         (result nil))
    (dotimes (i n (nreverse result))
      (when (or (= i 0) (/= (aref arr i) (aref arr (1- i))))
        (let ((l (1+ i)) (r (1- n)))
          (loop while (< l r) do
            (let ((s (+ (aref arr i) (aref arr l) (aref arr r))))
              (cond ((< s 0) (incf l))
                    ((> s 0) (decf r))
                    (t (push (list (aref arr i) (aref arr l) (aref arr r)) result)
                       (loop while (and (< l r) (= (aref arr l) (aref arr (1+ l))))
                             do (incf l))
                       (incf l) (decf r))))))))))`,
  },

  // ─── Problem 14: 3Sum Closest (LC 16) ──────────────────────────────────────
  14: {
    TypeScript: `function threeSumClosest(nums: number[], target: number): number {
  const sorted = [...nums].sort((a, b) => a - b);

  const search = (i: number, l: number, r: number, closest: number): number => {
    if (l >= r) return closest;
    const sum = sorted[i] + sorted[l] + sorted[r];
    const better = Math.abs(sum - target) < Math.abs(closest - target) ? sum : closest;
    if (sum < target) return search(i, l + 1, r, better);
    if (sum > target) return search(i, l, r - 1, better);
    return sum;
  };

  return sorted.reduce((closest, _, i) =>
    search(i, i + 1, sorted.length - 1, closest),
    Infinity
  );
}`,

    Haskell: `import Data.List (sort)

threeSumClosest :: [Int] -> Int -> Int
threeSumClosest nums target =
  let sorted = sort nums
      arr = listToArray sorted
      n = length sorted
      go i l r closest
        | l >= r = closest
        | otherwise =
            let s = arr !! i + arr !! l + arr !! r
                better = if abs (s - target) < abs (closest - target) then s else closest
            in if s < target then go i (l+1) r better
               else if s > target then go i l (r-1) better
               else s
      result = foldl (\\best i -> go i (i+1) (n-1) best) maxBound [0..n-1]
  in result
  where
    listToArray = map snd . zip [0..]
    maxBound = 10^9`,

    Elixir: `defmodule ThreeSumClosest do
  def three_sum_closest(nums, target) do
    sorted = Enum.sort(nums) |> :array.from_list()
    n = :array.size(sorted)

    Enum.reduce(0..(n - 3), nil, fn i, closest ->
      search(sorted, target, i, i + 1, n - 1, closest)
    end)
  end

  defp search(_arr, _target, _i, l, r, closest) when l >= r, do: closest
  defp search(arr, target, i, l, r, closest) do
    sum = :array.get(i, arr) + :array.get(l, arr) + :array.get(r, arr)
    better = if closest == nil or abs(sum - target) < abs(closest - target),
      do: sum, else: closest
    cond do
      sum < target -> search(arr, target, i, l + 1, r, better)
      sum > target -> search(arr, target, i, l, r - 1, better)
      true -> sum
    end
  end
end`,

    Rust: `pub fn three_sum_closest(mut nums: Vec<i32>, target: i32) -> i32 {
    nums.sort();
    let n = nums.len();
    let mut closest = nums[0] + nums[1] + nums[2];
    for i in 0..n - 2 {
        let (mut l, mut r) = (i + 1, n - 1);
        while l < r {
            let sum = nums[i] + nums[l] + nums[r];
            if (sum - target).abs() < (closest - target).abs() {
                closest = sum;
            }
            match sum.cmp(&target) {
                std::cmp::Ordering::Less => l += 1,
                std::cmp::Ordering::Greater => r -= 1,
                _ => return target,
            }
        }
    }
    closest
}`,

    Scala: `def threeSumClosest(nums: Array[Int], target: Int): Int = {
  val sorted = nums.sorted
  val n = sorted.length

  @annotation.tailrec
  def search(i: Int, l: Int, r: Int, closest: Int): Int = {
    if (l >= r) closest
    else {
      val sum = sorted(i) + sorted(l) + sorted(r)
      val better = if (math.abs(sum - target) < math.abs(closest - target)) sum else closest
      if (sum < target) search(i, l + 1, r, better)
      else if (sum > target) search(i, l, r - 1, better)
      else sum
    }
  }

  (0 until n - 2).foldLeft(Int.MaxValue) { (closest, i) =>
    search(i, i + 1, n - 1, closest)
  }
}`,

    OCaml: `let three_sum_closest nums target =
  let sorted = List.sort compare nums |> Array.of_list in
  let n = Array.length sorted in
  let closest = ref (sorted.(0) + sorted.(1) + sorted.(2)) in
  for i = 0 to n - 3 do
    let l = ref (i + 1) and r = ref (n - 1) in
    while !l < !r do
      let sum = sorted.(i) + sorted.(!l) + sorted.(!r) in
      if abs (sum - target) < abs (!closest - target) then closest := sum;
      if sum < target then incr l
      else if sum > target then decr r
      else (l := !r)
    done
  done;
  !closest`,

    Clojure: `(defn three-sum-closest [nums target]
  (let [sorted (vec (sort nums))
        n (count sorted)]
    (reduce
      (fn [closest i]
        (loop [l (inc i), r (dec n), best closest]
          (if (>= l r) best
            (let [sum (+ (sorted i) (sorted l) (sorted r))
                  better (if (< (Math/abs (- sum target))
                               (Math/abs (- best target)))
                           sum best)]
              (cond
                (< sum target) (recur (inc l) r better)
                (> sum target) (recur l (dec r) better)
                :else sum)))))
      (+ (sorted 0) (sorted 1) (sorted 2))
      (range (- n 2)))))`,

    Lisp: `(defun three-sum-closest (nums target)
  (let* ((sorted (sort (copy-list nums) #'<))
         (arr (coerce sorted 'vector))
         (n (length arr))
         (closest (+ (aref arr 0) (aref arr 1) (aref arr 2))))
    (dotimes (i (- n 2) closest)
      (let ((l (1+ i)) (r (1- n)))
        (loop while (< l r) do
          (let ((s (+ (aref arr i) (aref arr l) (aref arr r))))
            (when (< (abs (- s target)) (abs (- closest target)))
              (setf closest s))
            (cond ((< s target) (incf l))
                  ((> s target) (decf r))
                  (t (return-from three-sum-closest target)))))))))`,
  },

  // ─── Problem 15: Letter Combinations of a Phone Number (LC 17) ─────────────
  15: {
    TypeScript: `function letterCombinations(digits: string): string[] {
  if (digits.length === 0) return [];
  const map: Record<string, string[]> = {
    '2': ['a','b','c'], '3': ['d','e','f'], '4': ['g','h','i'],
    '5': ['j','k','l'], '6': ['m','n','o'], '7': ['p','q','r','s'],
    '8': ['t','u','v'], '9': ['w','x','y','z'],
  };
  return [...digits].reduce<string[]>(
    (combos, digit) =>
      combos.flatMap(combo => (map[digit] || []).map(ch => combo + ch)),
    ['']
  );
}`,

    Haskell: `import qualified Data.Map as Map

letterCombinations :: String -> [String]
letterCombinations "" = []
letterCombinations digits = foldl expand [""] digits
  where
    phone = Map.fromList [('2',"abc"),('3',"def"),('4',"ghi"),
                          ('5',"jkl"),('6',"mno"),('7',"pqrs"),
                          ('8',"tuv"),('9',"wxyz")]
    expand combos d =
      let letters = Map.findWithDefault "" d phone
      in [c ++ [l] | c <- combos, l <- letters]`,

    Elixir: `defmodule LetterCombinations do
  @phone %{
    "2" => ~w(a b c), "3" => ~w(d e f), "4" => ~w(g h i),
    "5" => ~w(j k l), "6" => ~w(m n o), "7" => ~w(p q r s),
    "8" => ~w(t u v), "9" => ~w(w x y z)
  }

  def letter_combinations(""), do: []
  def letter_combinations(digits) do
    digits
    |> String.graphemes()
    |> Enum.reduce([""], fn digit, combos ->
      letters = Map.get(@phone, digit, [])
      for combo <- combos, ch <- letters, do: combo <> ch
    end)
  end
end`,

    Rust: `pub fn letter_combinations(digits: String) -> Vec<String> {
    if digits.is_empty() { return vec![]; }
    let phone = |d| match d {
        '2' => "abc", '3' => "def", '4' => "ghi", '5' => "jkl",
        '6' => "mno", '7' => "pqrs", '8' => "tuv", '9' => "wxyz",
        _ => "",
    };
    digits.chars().fold(vec![String::new()], |combos, d| {
        combos.iter()
            .flat_map(|combo| {
                phone(d).chars().map(move |ch| format!("{}{}", combo, ch))
            })
            .collect()
    })
}`,

    Scala: `def letterCombinations(digits: String): List[String] = {
  if (digits.isEmpty) return Nil
  val phone = Map('2' -> "abc", '3' -> "def", '4' -> "ghi", '5' -> "jkl",
                  '6' -> "mno", '7' -> "pqrs", '8' -> "tuv", '9' -> "wxyz")
  digits.foldLeft(List("")) { (combos, d) =>
    for (combo <- combos; ch <- phone(d)) yield combo + ch
  }
}`,

    OCaml: `let letter_combinations digits =
  if String.length digits = 0 then []
  else
    let phone = function
      | '2' -> ["a";"b";"c"] | '3' -> ["d";"e";"f"]
      | '4' -> ["g";"h";"i"] | '5' -> ["j";"k";"l"]
      | '6' -> ["m";"n";"o"] | '7' -> ["p";"q";"r";"s"]
      | '8' -> ["t";"u";"v"] | '9' -> ["w";"x";"y";"z"]
      | _ -> []
    in
    let chars = List.init (String.length digits) (String.get digits) in
    List.fold_left (fun combos d ->
      List.concat_map (fun combo ->
        List.map (fun ch -> combo ^ ch) (phone d)
      ) combos
    ) [""] chars`,

    Clojure: `(defn letter-combinations [digits]
  (if (empty? digits) []
    (let [phone {\\2 "abc" \\3 "def" \\4 "ghi" \\5 "jkl"
                 \\6 "mno" \\7 "pqrs" \\8 "tuv" \\9 "wxyz"}]
      (reduce
        (fn [combos d]
          (for [combo combos
                ch (phone d)]
            (str combo ch)))
        [""]
        digits))))`,

    Lisp: `(defun letter-combinations (digits)
  (if (= (length digits) 0) nil
    (let ((phone '((#\\2 . "abc") (#\\3 . "def") (#\\4 . "ghi") (#\\5 . "jkl")
                   (#\\6 . "mno") (#\\7 . "pqrs") (#\\8 . "tuv") (#\\9 . "wxyz"))))
      (reduce (lambda (combos d)
                (loop for combo in combos
                      nconc (loop for ch across (cdr (assoc d phone))
                                  collect (concatenate 'string combo (string ch)))))
              (coerce digits 'list)
              :initial-value '("")))))`,
  },

  // ─── Problem 16: Contiguous Array (LC 525) ─────────────────────────────────
  16: {
    TypeScript: `function findMaxLength(nums: number[]): number {
  const [, , maxLen] = nums.reduce<[Map<number, number>, number, number]>(
    ([map, count, best], num, i) => {
      const newCount = count + (num === 1 ? 1 : -1);
      if (newCount === 0) return [map, newCount, i + 1];
      if (map.has(newCount)) return [map, newCount, Math.max(best, i - map.get(newCount)!)];
      return [new Map([...map, [newCount, i]]), newCount, best];
    },
    [new Map(), 0, 0]
  );
  return maxLen;
}`,

    Haskell: `import qualified Data.Map.Strict as Map

findMaxLength :: [Int] -> Int
findMaxLength nums =
  let (_, _, result) = foldl step (Map.empty, 0, 0) (zip [0..] nums)
  in result
  where
    step (seen, count, best) (i, num) =
      let newCount = count + if num == 1 then 1 else -1
      in if newCount == 0
         then (seen, newCount, i + 1)
         else case Map.lookup newCount seen of
           Just j  -> (seen, newCount, max best (i - j))
           Nothing -> (Map.insert newCount i seen, newCount, best)`,

    Elixir: `defmodule ContiguousArray do
  def find_max_length(nums) do
    nums
    |> Enum.with_index()
    |> Enum.reduce({%{}, 0, 0}, fn {num, i}, {seen, count, best} ->
      new_count = count + if(num == 1, do: 1, else: -1)
      cond do
        new_count == 0 ->
          {seen, new_count, max(best, i + 1)}
        Map.has_key?(seen, new_count) ->
          {seen, new_count, max(best, i - Map.get(seen, new_count))}
        true ->
          {Map.put(seen, new_count, i), new_count, best}
      end
    end)
    |> elem(2)
  end
end`,

    Rust: `use std::collections::HashMap;

pub fn find_max_length(nums: Vec<i32>) -> i32 {
    let (_, _, result) = nums.iter().enumerate().fold(
        (HashMap::from([(0i32, -1i32)]), 0i32, 0i32),
        |(mut map, count, best), (i, &num)| {
            let new_count = count + if num == 1 { 1 } else { -1 };
            let new_best = map
                .get(&new_count)
                .map(|&j| best.max(i as i32 - j))
                .unwrap_or(best);
            map.entry(new_count).or_insert(i as i32);
            (map, new_count, new_best)
        },
    );
    result
}`,

    Scala: `def findMaxLength(nums: Array[Int]): Int = {
  nums.zipWithIndex.foldLeft((Map(0 -> -1), 0, 0)) {
    case ((seen, count, best), (num, i)) =>
      val newCount = count + (if (num == 1) 1 else -1)
      val newBest = seen.get(newCount).map(j => math.max(best, i - j)).getOrElse(best)
      val newSeen = if (seen.contains(newCount)) seen else seen + (newCount -> i)
      (newSeen, newCount, newBest)
  }._3
}`,

    OCaml: `module IntMap = Map.Make(Int)

let find_max_length nums =
  let arr = Array.of_list nums in
  let (_, _, result) =
    Array.fold_left
      (fun (seen, count, best) (i, num) ->
        let new_count = count + (if num = 1 then 1 else -1) in
        let new_best = match IntMap.find_opt new_count seen with
          | Some j -> max best (i - j)
          | None -> best
        in
        let new_seen = if IntMap.mem new_count seen then seen
          else IntMap.add new_count i seen in
        (new_seen, new_count, new_best))
      (IntMap.singleton 0 (-1), 0, 0)
      (Array.mapi (fun i x -> (i, x)) arr)
  in
  result`,

    Clojure: `(defn find-max-length [nums]
  (let [[_ _ result]
        (reduce
          (fn [[seen count best] [i num]]
            (let [new-count (+ count (if (= num 1) 1 -1))
                  new-best (if-let [j (get seen new-count)]
                             (max best (- i j))
                             best)
                  new-seen (if (contains? seen new-count) seen
                             (assoc seen new-count i))]
              [new-seen new-count new-best]))
          [{0 -1} 0 0]
          (map-indexed vector nums))]
    result))`,

    Lisp: `(defun find-max-length (nums)
  (let ((seen (make-hash-table))
        (count 0) (best 0))
    (setf (gethash 0 seen) -1)
    (loop for num in nums for i from 0 do
      (incf count (if (= num 1) 1 -1))
      (let ((prev (gethash count seen)))
        (if prev
            (setf best (max best (- i prev)))
            (setf (gethash count seen) i))))
    best))`,
  },

  // ─── Problem 17: Remove Nth Node From End of List (LC 19) ──────────────────
  17: {
    TypeScript: `class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  const toList = (node: ListNode | null): number[] =>
    node === null ? [] : [node.val, ...toList(node.next)];

  const fromList = (arr: number[]): ListNode | null =>
    arr.reduceRight<ListNode | null>((next, val) => new ListNode(val, next), null);

  const items = toList(head);
  const filtered = items.filter((_, i) => i !== items.length - n);
  return fromList(filtered);
}`,

    Haskell: `removeNthFromEnd :: [a] -> Int -> [a]
removeNthFromEnd xs n =
  let len = length xs
      idx = len - n
  in take idx xs ++ drop (idx + 1) xs`,

    Elixir: `defmodule RemoveNth do
  def remove_nth_from_end(list, n) do
    len = length(list)
    idx = len - n
    list
    |> Enum.with_index()
    |> Enum.reject(fn {_, i} -> i == idx end)
    |> Enum.map(&elem(&1, 0))
  end
end`,

    Rust: `pub fn remove_nth_from_end(head: Option<Box<ListNode>>, n: i32) -> Option<Box<ListNode>> {
    let mut vals: Vec<i32> = Vec::new();
    let mut curr = &head;
    while let Some(node) = curr {
        vals.push(node.val);
        curr = &node.next;
    }
    let idx = vals.len() - n as usize;
    vals.remove(idx);
    vals.into_iter().rev().fold(None, |next, val| {
        Some(Box::new(ListNode { val, next }))
    })
}`,

    Scala: `def removeNthFromEnd(head: ListNode, n: Int): ListNode = {
  def toList(node: ListNode): List[Int] =
    if (node == null) Nil else node.x :: toList(node.next)

  def fromList(xs: List[Int]): ListNode =
    xs.foldRight(null: ListNode)((v, acc) => { val n = new ListNode(v); n.next = acc; n })

  val items = toList(head)
  val idx = items.length - n
  fromList(items.zipWithIndex.collect { case (v, i) if i != idx => v })
}`,

    OCaml: `let remove_nth_from_end lst n =
  let len = List.length lst in
  let idx = len - n in
  List.filteri (fun i _ -> i <> idx) lst`,

    Clojure: `(defn remove-nth-from-end [lst n]
  (let [len (count lst)
        idx (- len n)]
    (keep-indexed (fn [i x] (when (not= i idx) x)) lst)))`,

    Lisp: `(defun remove-nth-from-end (lst n)
  (let* ((len (length lst))
         (idx (- len n)))
    (loop for x in lst
          for i from 0
          unless (= i idx) collect x)))`,
  },

  // ─── Problem 18: Valid Parentheses (LC 20) ─────────────────────────────────
  18: {
    TypeScript: `function isValid(s: string): boolean {
  const matching: Record<string, string> = { ')': '(', ']': '[', '}': '{' };
  const stack = [...s].reduce<string[]>((stk, ch) => {
    if ('({['.includes(ch)) return [...stk, ch];
    if (stk.length > 0 && stk[stk.length - 1] === matching[ch]) return stk.slice(0, -1);
    return [...stk, ch]; // mismatch marker
  }, []);
  return stack.length === 0;
}`,

    Haskell: `isValid :: String -> Bool
isValid s = null $ foldl step [] s
  where
    step stk ch
      | ch \\== '(' || ch == '{' || ch == '[' = ch : stk
      | null stk = [ch]
      | matches (head stk) ch = tail stk
      | otherwise = ch : stk
    matches '(' ')' = True
    matches '{' '}' = True
    matches '[' ']' = True
    matches _   _   = False`,

    Elixir: `defmodule ValidParentheses do
  def is_valid(s) do
    s
    |> String.graphemes()
    |> Enum.reduce([], fn
      ch, stk when ch in ["(", "{", "["] -> [ch | stk]
      ")", ["(" | rest] -> rest
      "]", ["[" | rest] -> rest
      "}", ["{" | rest] -> rest
      _, stk -> ["!" | stk]  # mismatch
    end)
    |> Enum.empty?()
  end
end`,

    Rust: `pub fn is_valid(s: String) -> bool {
    s.chars()
        .try_fold(Vec::new(), |mut stk, ch| {
            match ch {
                '(' | '{' | '[' => { stk.push(ch); Some(stk) }
                ')' => if stk.last() == Some(&'(') { stk.pop(); Some(stk) } else { None }
                ']' => if stk.last() == Some(&'[') { stk.pop(); Some(stk) } else { None }
                '}' => if stk.last() == Some(&'{') { stk.pop(); Some(stk) } else { None }
                _ => Some(stk)
            }
        })
        .map_or(false, |stk| stk.is_empty())
}`,

    Scala: `def isValid(s: String): Boolean = {
  val matching = Map(')' -> '(', ']' -> '[', '}' -> '{')
  s.foldLeft(List.empty[Char]) {
    case (stk, ch) if "({[".contains(ch) => ch :: stk
    case (top :: rest, ch) if matching.get(ch).contains(top) => rest
    case (stk, ch) => ch :: stk  // mismatch
  }.isEmpty
}`,

    OCaml: `let is_valid s =
  let matching = function ')' -> '(' | ']' -> '[' | '}' -> '{' | c -> c in
  let stack =
    String.fold_left (fun stk ch ->
      match ch, stk with
      | ('(' | '{' | '['), _ -> ch :: stk
      | (')' | ']' | '}'), top :: rest when top = matching ch -> rest
      | _, _ -> ch :: stk
    ) [] s
  in
  stack = []`,

    Clojure: `(defn is-valid [s]
  (let [matching {\\) \\(, \\] \\[, \\} \\{}]
    (empty?
      (reduce
        (fn [stk ch]
          (cond
            (#{"(" "{" "["} (str ch)) (conj stk ch)
            (and (seq stk) (= (peek stk) (matching ch))) (pop stk)
            :else (conj stk ch)))
        []
        s))))`,

    Lisp: `(defun is-valid (s)
  (let ((matching '((#\\) . #\\() (#\\] . #\\[) (#\\} . #\\{))))
    (null
      (reduce (lambda (stk ch)
                (cond
                  ((member ch '(#\\( #\\{ #\\[)) (cons ch stk))
                  ((and stk (eql (car stk) (cdr (assoc ch matching))))
                   (cdr stk))
                  (t (cons ch stk))))
              (coerce s 'list)
              :initial-value nil))))`,
  },

  // ─── Problem 19: Merge Two Sorted Lists (LC 21) ────────────────────────────
  19: {
    TypeScript: `class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function mergeTwoLists(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  if (!l1) return l2;
  if (!l2) return l1;
  if (l1.val <= l2.val) {
    return new ListNode(l1.val, mergeTwoLists(l1.next, l2));
  }
  return new ListNode(l2.val, mergeTwoLists(l1, l2.next));
}`,

    Haskell: `mergeTwoLists :: Ord a => [a] -> [a] -> [a]
mergeTwoLists [] ys = ys
mergeTwoLists xs [] = xs
mergeTwoLists (x:xs) (y:ys)
  | x <= y   = x : mergeTwoLists xs (y:ys)
  | otherwise = y : mergeTwoLists (x:xs) ys`,

    Elixir: `defmodule MergeLists do
  def merge_two_lists([], l2), do: l2
  def merge_two_lists(l1, []), do: l1
  def merge_two_lists([h1 | t1] = l1, [h2 | t2] = l2) do
    if h1 <= h2 do
      [h1 | merge_two_lists(t1, l2)]
    else
      [h2 | merge_two_lists(l1, t2)]
    end
  end
end`,

    Rust: `pub fn merge_two_lists(
    l1: Option<Box<ListNode>>,
    l2: Option<Box<ListNode>>,
) -> Option<Box<ListNode>> {
    match (l1, l2) {
        (None, r) => r,
        (l, None) => l,
        (Some(a), Some(b)) => {
            if a.val <= b.val {
                Some(Box::new(ListNode {
                    val: a.val,
                    next: merge_two_lists(a.next, Some(b)),
                }))
            } else {
                Some(Box::new(ListNode {
                    val: b.val,
                    next: merge_two_lists(Some(a), b.next),
                }))
            }
        }
    }
}`,

    Scala: `def mergeTwoLists(l1: ListNode, l2: ListNode): ListNode = {
  (l1, l2) match {
    case (null, _) => l2
    case (_, null) => l1
    case _ if l1.x <= l2.x =>
      val node = new ListNode(l1.x)
      node.next = mergeTwoLists(l1.next, l2)
      node
    case _ =>
      val node = new ListNode(l2.x)
      node.next = mergeTwoLists(l1, l2.next)
      node
  }
}`,

    OCaml: `let rec merge_two_lists l1 l2 =
  match l1, l2 with
  | [], ys -> ys
  | xs, [] -> xs
  | x :: xs, y :: ys ->
    if x <= y then x :: merge_two_lists xs (y :: ys)
    else y :: merge_two_lists (x :: xs) ys`,

    Clojure: `(defn merge-two-lists [l1 l2]
  (cond
    (empty? l1) l2
    (empty? l2) l1
    (<= (first l1) (first l2))
      (cons (first l1) (lazy-seq (merge-two-lists (rest l1) l2)))
    :else
      (cons (first l2) (lazy-seq (merge-two-lists l1 (rest l2))))))`,

    Lisp: `(defun merge-two-lists (l1 l2)
  (cond
    ((null l1) l2)
    ((null l2) l1)
    ((<= (car l1) (car l2))
     (cons (car l1) (merge-two-lists (cdr l1) l2)))
    (t (cons (car l2) (merge-two-lists l1 (cdr l2))))))`,
  },

  // ─── Problem 20: Generate Parentheses (LC 22) ─────────────────────────────
  20: {
    TypeScript: `function generateParenthesis(n: number): string[] {
  const generate = (open: number, close: number, current: string): string[] => {
    if (current.length === 2 * n) return [current];
    return [
      ...(open < n ? generate(open + 1, close, current + '(') : []),
      ...(close < open ? generate(open, close + 1, current + ')') : []),
    ];
  };
  return generate(0, 0, '');
}`,

    Haskell: `generateParenthesis :: Int -> [String]
generateParenthesis n = go n 0 0 ""
  where
    go n open close current
      | length current == 2 * n = [current]
      | otherwise =
          (if open < n then go n (open + 1) close (current ++ "(") else []) ++
          (if close < open then go n open (close + 1) (current ++ ")") else [])`,

    Elixir: `defmodule GenerateParentheses do
  def generate_parenthesis(n), do: gen(n, 0, 0, "")

  defp gen(n, _, _, current) when byte_size(current) == n * 2, do: [current]
  defp gen(n, open, close, current) do
    left  = if open < n, do: gen(n, open + 1, close, current <> "("), else: []
    right = if close < open, do: gen(n, open, close + 1, current <> ")"), else: []
    left ++ right
  end
end`,

    Rust: `pub fn generate_parenthesis(n: i32) -> Vec<String> {
    fn gen(open: i32, close: i32, n: i32, current: String) -> Vec<String> {
        if current.len() as i32 == 2 * n {
            return vec![current];
        }
        let mut result = Vec::new();
        if open < n {
            result.extend(gen(open + 1, close, n, format!("{}(", current)));
        }
        if close < open {
            result.extend(gen(open, close + 1, n, format!("{})", current)));
        }
        result
    }
    gen(0, 0, n, String::new())
}`,

    Scala: `def generateParenthesis(n: Int): List[String] = {
  def gen(open: Int, close: Int, current: String): List[String] = {
    if (current.length == 2 * n) List(current)
    else {
      val left  = if (open < n) gen(open + 1, close, current + "(") else Nil
      val right = if (close < open) gen(open, close + 1, current + ")") else Nil
      left ++ right
    }
  }
  gen(0, 0, "")
}`,

    OCaml: `let generate_parenthesis n =
  let rec gen open_count close current =
    if String.length current = 2 * n then [current]
    else
      let left = if open_count < n then gen (open_count + 1) close (current ^ "(") else [] in
      let right = if close < open_count then gen open_count (close + 1) (current ^ ")") else [] in
      left @ right
  in
  gen 0 0 ""`,

    Clojure: `(defn generate-parenthesis [n]
  (letfn [(gen [open close current]
            (if (= (count current) (* 2 n))
              [current]
              (concat
                (when (< open n) (gen (inc open) close (str current "(")))
                (when (< close open) (gen open (inc close) (str current ")"))))))]
    (gen 0 0 "")))`,

    Lisp: `(defun generate-parenthesis (n)
  (labels ((gen (open close current)
             (if (= (length current) (* 2 n))
                 (list current)
                 (nconc
                   (when (< open n)
                     (gen (1+ open) close (concatenate 'string current "(")))
                   (when (< close open)
                     (gen open (1+ close) (concatenate 'string current ")")))))))
    (gen 0 0 "")))`,
  },

  // ─── Problem 21: Merge k Sorted Lists (LC 23) ─────────────────────────────
  21: {
    TypeScript: `function mergeKLists(lists: (ListNode | null)[]): ListNode | null {
  const merge = (
    l1: ListNode | null,
    l2: ListNode | null
  ): ListNode | null => {
    if (!l1) return l2;
    if (!l2) return l1;
    if (l1.val <= l2.val) return new ListNode(l1.val, merge(l1.next, l2));
    return new ListNode(l2.val, merge(l1, l2.next));
  };

  return lists.reduce<ListNode | null>(
    (acc, list) => merge(acc, list),
    null
  );
}`,

    Haskell: `mergeKLists :: Ord a => [[a]] -> [a]
mergeKLists = foldl mergeTwoSorted []
  where
    mergeTwoSorted [] ys = ys
    mergeTwoSorted xs [] = xs
    mergeTwoSorted (x:xs) (y:ys)
      | x <= y   = x : mergeTwoSorted xs (y:ys)
      | otherwise = y : mergeTwoSorted (x:xs) ys`,

    Elixir: `defmodule MergeKLists do
  def merge_k_lists(lists) do
    Enum.reduce(lists, [], &merge/2)
  end

  defp merge([], l2), do: l2
  defp merge(l1, []), do: l1
  defp merge([h1 | t1] = l1, [h2 | t2] = l2) do
    if h1 <= h2,
      do: [h1 | merge(t1, l2)],
      else: [h2 | merge(l1, t2)]
  end
end`,

    Rust: `pub fn merge_k_lists(lists: Vec<Option<Box<ListNode>>>) -> Option<Box<ListNode>> {
    fn merge(l1: Option<Box<ListNode>>, l2: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        match (l1, l2) {
            (None, r) => r,
            (l, None) => l,
            (Some(a), Some(b)) if a.val <= b.val =>
                Some(Box::new(ListNode { val: a.val, next: merge(a.next, Some(b)) })),
            (Some(a), Some(b)) =>
                Some(Box::new(ListNode { val: b.val, next: merge(Some(a), b.next) })),
        }
    }
    lists.into_iter().fold(None, |acc, list| merge(acc, list))
}`,

    Scala: `def mergeKLists(lists: Array[ListNode]): ListNode = {
  def merge(l1: ListNode, l2: ListNode): ListNode = (l1, l2) match {
    case (null, _) => l2
    case (_, null) => l1
    case _ if l1.x <= l2.x =>
      val n = new ListNode(l1.x); n.next = merge(l1.next, l2); n
    case _ =>
      val n = new ListNode(l2.x); n.next = merge(l1, l2.next); n
  }
  lists.foldLeft(null: ListNode)(merge)
}`,

    OCaml: `let merge_k_lists lists =
  let rec merge l1 l2 = match l1, l2 with
    | [], ys -> ys
    | xs, [] -> xs
    | x :: xs, y :: ys ->
      if x <= y then x :: merge xs (y :: ys)
      else y :: merge (x :: xs) ys
  in
  List.fold_left merge [] lists`,

    Clojure: `(defn merge-k-lists [lists]
  (letfn [(merge2 [l1 l2]
            (cond
              (empty? l1) l2
              (empty? l2) l1
              (<= (first l1) (first l2))
                (cons (first l1) (lazy-seq (merge2 (rest l1) l2)))
              :else
                (cons (first l2) (lazy-seq (merge2 l1 (rest l2))))))]
    (reduce merge2 [] lists)))`,

    Lisp: `(defun merge-k-lists (lists)
  (labels ((merge2 (l1 l2)
             (cond ((null l1) l2)
                   ((null l2) l1)
                   ((<= (car l1) (car l2))
                    (cons (car l1) (merge2 (cdr l1) l2)))
                   (t (cons (car l2) (merge2 l1 (cdr l2)))))))
    (reduce #'merge2 lists :initial-value nil)))`,
  },

  // ─── Problem 22: Swap Nodes in Pairs (LC 24) ──────────────────────────────
  22: {
    TypeScript: `function swapPairs(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;
  const second = head.next;
  return new ListNode(
    second.val,
    new ListNode(head.val, swapPairs(second.next))
  );
}`,

    Haskell: `swapPairs :: [a] -> [a]
swapPairs [] = []
swapPairs [x] = [x]
swapPairs (x:y:rest) = y : x : swapPairs rest`,

    Elixir: `defmodule SwapPairs do
  def swap_pairs([]), do: []
  def swap_pairs([x]), do: [x]
  def swap_pairs([x, y | rest]), do: [y, x | swap_pairs(rest)]
end`,

    Rust: `pub fn swap_pairs(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
    match head {
        None => None,
        Some(a) => match a.next {
            None => Some(a),
            Some(b) => Some(Box::new(ListNode {
                val: b.val,
                next: Some(Box::new(ListNode {
                    val: a.val,
                    next: swap_pairs(b.next),
                })),
            })),
        },
    }
}`,

    Scala: `def swapPairs(head: ListNode): ListNode = {
  if (head == null || head.next == null) head
  else {
    val second = head.next
    val rest = swapPairs(second.next)
    val newFirst = new ListNode(second.x)
    val newSecond = new ListNode(head.x)
    newFirst.next = newSecond
    newSecond.next = rest
    newFirst
  }
}`,

    OCaml: `let rec swap_pairs = function
  | [] -> []
  | [x] -> [x]
  | x :: y :: rest -> y :: x :: swap_pairs rest`,

    Clojure: `(defn swap-pairs [lst]
  (cond
    (empty? lst) []
    (= (count lst) 1) lst
    :else (let [[x y & rest] lst]
            (cons y (cons x (swap-pairs rest))))))`,

    Lisp: `(defun swap-pairs (lst)
  (cond
    ((null lst) nil)
    ((null (cdr lst)) lst)
    (t (cons (cadr lst)
             (cons (car lst)
                   (swap-pairs (cddr lst)))))))`,
  },

  // ─── Problem 23: Reverse Nodes in k-Group (LC 25) ─────────────────────────
  23: {
    TypeScript: `function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  const toList = (node: ListNode | null): number[] =>
    node === null ? [] : [node.val, ...toList(node.next)];

  const fromList = (arr: number[]): ListNode | null =>
    arr.reduceRight<ListNode | null>((next, val) => new ListNode(val, next), null);

  const items = toList(head);

  const process = (arr: number[]): number[] => {
    if (arr.length < k) return arr;
    const group = arr.slice(0, k).reverse();
    return [...group, ...process(arr.slice(k))];
  };

  return fromList(process(items));
}`,

    Haskell: `reverseKGroup :: [a] -> Int -> [a]
reverseKGroup xs k
  | length group < k = xs
  | otherwise = reverse group ++ reverseKGroup rest k
  where
    (group, rest) = splitAt k xs`,

    Elixir: `defmodule ReverseKGroup do
  def reverse_k_group(list, k) do
    {group, rest} = Enum.split(list, k)
    if length(group) < k do
      list
    else
      Enum.reverse(group) ++ reverse_k_group(rest, k)
    end
  end
end`,

    Rust: `pub fn reverse_k_group(head: Option<Box<ListNode>>, k: i32) -> Option<Box<ListNode>> {
    let mut vals: Vec<i32> = Vec::new();
    let mut curr = &head;
    while let Some(node) = curr {
        vals.push(node.val);
        curr = &node.next;
    }

    fn process(arr: &[i32], k: usize) -> Vec<i32> {
        if arr.len() < k { return arr.to_vec(); }
        let mut group: Vec<i32> = arr[..k].iter().rev().copied().collect();
        group.extend(process(&arr[k..], k));
        group
    }

    let result = process(&vals, k as usize);
    result.into_iter().rev().fold(None, |next, val| {
        Some(Box::new(ListNode { val, next }))
    })
}`,

    Scala: `def reverseKGroup(head: ListNode, k: Int): ListNode = {
  def toList(n: ListNode): List[Int] =
    if (n == null) Nil else n.x :: toList(n.next)
  def fromList(xs: List[Int]): ListNode =
    xs.foldRight(null: ListNode)((v, acc) => { val n = new ListNode(v); n.next = acc; n })

  def process(xs: List[Int]): List[Int] = {
    val (group, rest) = xs.splitAt(k)
    if (group.length < k) xs
    else group.reverse ++ process(rest)
  }

  fromList(process(toList(head)))
}`,

    OCaml: `let reverse_k_group lst k =
  let rec take_drop n xs acc =
    if n = 0 then (List.rev acc, xs)
    else match xs with
      | [] -> (List.rev acc, [])
      | x :: rest -> take_drop (n - 1) rest (x :: acc)
  in
  let rec process xs =
    let (group, rest) = take_drop k xs [] in
    if List.length group < k then xs
    else List.rev group @ process rest
  in
  process lst`,

    Clojure: `(defn reverse-k-group [lst k]
  (let [[group rest] (split-at k lst)]
    (if (< (count group) k)
      lst
      (concat (reverse group) (lazy-seq (reverse-k-group rest k))))))`,

    Lisp: `(defun reverse-k-group (lst k)
  (let ((group (subseq-safe lst 0 k))
        (rest  (nthcdr k lst)))
    (if (< (length group) k)
        lst
        (append (reverse group) (reverse-k-group rest k)))))

(defun subseq-safe (lst start end)
  (loop for x in (nthcdr start lst)
        for i from start below end
        collect x))`,
  },

  // ─── Problem 24: 01 Matrix (LC 542) ────────────────────────────────────────
  24: {
    TypeScript: `function updateMatrix(mat: number[][]): number[][] {
  const rows = mat.length, cols = mat[0].length;
  const INF = rows + cols;

  // Functional BFS with immutable state
  const initial = mat.map((row, r) =>
    row.map((v, c) => (v === 0 ? 0 : INF))
  );

  // Top-left pass
  const afterTL = initial.map((row, r) =>
    row.map((v, c) => {
      const top = r > 0 ? initial[r - 1][c] + 1 : INF;
      const left = c > 0 ? row[c - 1] + 1 : INF;
      return Math.min(v, top, left);
    })
  );

  // Bottom-right pass (fold from bottom-right)
  const result = [...afterTL].reverse().map((row, ri) => {
    const r = rows - 1 - ri;
    return [...row].reverse().map((v, ci) => {
      const c = cols - 1 - ci;
      const bottom = r < rows - 1 ? afterTL[r + 1][c] + 1 : INF;
      const right = c < cols - 1 ? afterTL[r][c + 1] + 1 : INF;
      const minVal = Math.min(v, bottom, right);
      afterTL[r][c] = minVal;
      return minVal;
    }).reverse();
  }).reverse();

  return result;
}`,

    Haskell: `import Data.Array

updateMatrix :: [[Int]] -> [[Int]]
updateMatrix mat =
  let rows = length mat
      cols = length (head mat)
      inf = rows + cols
      arr = listArray ((0,0),(rows-1,cols-1))
              [if mat !! r !! c == 0 then 0 else inf | r <- [0..rows-1], c <- [0..cols-1]]
      topLeft = array (bounds arr)
        [ ((r,c), if arr ! (r,c) == 0 then 0
                  else minimum [inf,
                    if r > 0 then topLeft ! (r-1,c) + 1 else inf,
                    if c > 0 then topLeft ! (r,c-1) + 1 else inf])
        | r <- [0..rows-1], c <- [0..cols-1] ]
      botRight = array (bounds arr)
        [ ((r,c), minimum [topLeft ! (r,c),
                    if r < rows-1 then botRight ! (r+1,c) + 1 else inf,
                    if c < cols-1 then botRight ! (r,c+1) + 1 else inf])
        | r <- [rows-1,rows-2..0], c <- [cols-1,cols-2..0] ]
  in [[botRight ! (r,c) | c <- [0..cols-1]] | r <- [0..rows-1]]`,

    Elixir: `defmodule ZeroOneMatrix do
  def update_matrix(mat) do
    rows = length(mat)
    cols = length(hd(mat))
    inf = rows + cols

    initial = for {row, r} <- Enum.with_index(mat) do
      for {v, c} <- Enum.with_index(row), do: if(v == 0, do: 0, else: inf)
    end

    # Top-left pass
    tl = Enum.reduce(0..(rows - 1), %{}, fn r, acc ->
      Enum.reduce(0..(cols - 1), acc, fn c, acc2 ->
        v = Enum.at(Enum.at(initial, r), c)
        top = if r > 0, do: Map.get(acc2, {r-1, c}, inf) + 1, else: inf
        left = if c > 0, do: Map.get(acc2, {r, c-1}, inf) + 1, else: inf
        Map.put(acc2, {r, c}, min(v, min(top, left)))
      end)
    end)

    # Bottom-right pass
    br = Enum.reduce((rows - 1)..0, tl, fn r, acc ->
      Enum.reduce((cols - 1)..0, acc, fn c, acc2 ->
        v = Map.get(acc2, {r, c})
        bottom = if r < rows - 1, do: Map.get(acc2, {r+1, c}, inf) + 1, else: inf
        right = if c < cols - 1, do: Map.get(acc2, {r, c+1}, inf) + 1, else: inf
        Map.put(acc2, {r, c}, min(v, min(bottom, right)))
      end)
    end)

    for r <- 0..(rows - 1), do:
      (for c <- 0..(cols - 1), do: Map.get(br, {r, c}))
  end
end`,

    Rust: `pub fn update_matrix(mat: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
    let (rows, cols) = (mat.len(), mat[0].len());
    let inf = (rows + cols) as i32;
    let mut dist: Vec<Vec<i32>> = mat.iter().map(|row|
        row.iter().map(|&v| if v == 0 { 0 } else { inf }).collect()
    ).collect();

    // Top-left pass
    for r in 0..rows {
        for c in 0..cols {
            if r > 0 { dist[r][c] = dist[r][c].min(dist[r-1][c] + 1); }
            if c > 0 { dist[r][c] = dist[r][c].min(dist[r][c-1] + 1); }
        }
    }

    // Bottom-right pass
    for r in (0..rows).rev() {
        for c in (0..cols).rev() {
            if r < rows - 1 { dist[r][c] = dist[r][c].min(dist[r+1][c] + 1); }
            if c < cols - 1 { dist[r][c] = dist[r][c].min(dist[r][c+1] + 1); }
        }
    }
    dist
}`,

    Scala: `def updateMatrix(mat: Array[Array[Int]]): Array[Array[Int]] = {
  val rows = mat.length; val cols = mat(0).length
  val inf = rows + cols
  val dist = mat.map(_.map(v => if (v == 0) 0 else inf))

  for (r <- 0 until rows; c <- 0 until cols) {
    if (r > 0) dist(r)(c) = math.min(dist(r)(c), dist(r-1)(c) + 1)
    if (c > 0) dist(r)(c) = math.min(dist(r)(c), dist(r)(c-1) + 1)
  }
  for (r <- (0 until rows).reverse; c <- (0 until cols).reverse) {
    if (r < rows - 1) dist(r)(c) = math.min(dist(r)(c), dist(r+1)(c) + 1)
    if (c < cols - 1) dist(r)(c) = math.min(dist(r)(c), dist(r)(c+1) + 1)
  }
  dist
}`,

    OCaml: `let update_matrix mat =
  let rows = Array.length mat in
  let cols = Array.length mat.(0) in
  let inf = rows + cols in
  let dist = Array.init rows (fun r ->
    Array.init cols (fun c ->
      if mat.(r).(c) = 0 then 0 else inf)) in
  for r = 0 to rows - 1 do
    for c = 0 to cols - 1 do
      if r > 0 then dist.(r).(c) <- min dist.(r).(c) (dist.(r-1).(c) + 1);
      if c > 0 then dist.(r).(c) <- min dist.(r).(c) (dist.(r).(c-1) + 1)
    done
  done;
  for r = rows - 1 downto 0 do
    for c = cols - 1 downto 0 do
      if r < rows - 1 then dist.(r).(c) <- min dist.(r).(c) (dist.(r+1).(c) + 1);
      if c < cols - 1 then dist.(r).(c) <- min dist.(r).(c) (dist.(r).(c+1) + 1)
    done
  done;
  dist`,

    Clojure: `(defn update-matrix [mat]
  (let [rows (count mat) cols (count (first mat))
        inf (+ rows cols)
        init (vec (for [r (range rows)]
                (vec (for [c (range cols)]
                  (if (zero? (get-in mat [r c])) 0 inf)))))
        tl (reduce (fn [d [r c]]
              (let [v (get-in d [r c])
                    top (if (> r 0) (inc (get-in d [(dec r) c])) inf)
                    left (if (> c 0) (inc (get-in d [r (dec c)])) inf)]
                (assoc-in d [r c] (min v top left))))
            init (for [r (range rows) c (range cols)] [r c]))
        br (reduce (fn [d [r c]]
              (let [v (get-in d [r c])
                    bot (if (< r (dec rows)) (inc (get-in d [(inc r) c])) inf)
                    rt  (if (< c (dec cols)) (inc (get-in d [r (inc c)])) inf)]
                (assoc-in d [r c] (min v bot rt))))
            tl (for [r (reverse (range rows)) c (reverse (range cols))] [r c]))]
    br))`,

    Lisp: `(defun update-matrix (mat)
  (let* ((rows (length mat))
         (cols (length (first mat)))
         (inf (+ rows cols))
         (dist (make-array (list rows cols))))
    (dotimes (r rows)
      (dotimes (c cols)
        (setf (aref dist r c)
              (if (zerop (nth c (nth r mat))) 0 inf))))
    (dotimes (r rows)
      (dotimes (c cols)
        (when (> r 0)
          (setf (aref dist r c)
                (min (aref dist r c) (1+ (aref dist (1- r) c)))))
        (when (> c 0)
          (setf (aref dist r c)
                (min (aref dist r c) (1+ (aref dist r (1- c))))))))
    (loop for r from (1- rows) downto 0 do
      (loop for c from (1- cols) downto 0 do
        (when (< r (1- rows))
          (setf (aref dist r c)
                (min (aref dist r c) (1+ (aref dist (1+ r) c)))))
        (when (< c (1- cols))
          (setf (aref dist r c)
                (min (aref dist r c) (1+ (aref dist r (1+ c))))))))
    dist))`,
  },

  // ─── Problem 25: Next Permutation (LC 31) ─────────────────────────────────
  25: {
    TypeScript: `function nextPermutation(nums: number[]): void {
  const n = nums.length;

  // Find rightmost pair where nums[i] < nums[i+1]
  const i = [...Array(n - 1).keys()].reverse().find(i => nums[i] < nums[i + 1]);

  if (i === undefined) {
    nums.reverse();
    return;
  }

  // Find rightmost element > nums[i]
  const j = [...Array(n).keys()].reverse().find(j => nums[j] > nums[i])!;

  // Swap
  [nums[i], nums[j]] = [nums[j], nums[i]];

  // Reverse suffix after i
  const suffix = nums.splice(i + 1).reverse();
  nums.push(...suffix);
}`,

    Haskell: `import Data.List (findIndex, sort)
import Data.Maybe (fromJust)

nextPermutation :: Ord a => [a] -> [a]
nextPermutation xs =
  case findSwapIndex (reverse (zip [0..] xs)) of
    Nothing -> reverse xs
    Just i  ->
      let j = last [k | (k, v) <- zip [0..] xs, v > xs !! i]
          swapped = swap i j xs
      in take (i + 1) swapped ++ reverse (drop (i + 1) swapped)
  where
    findSwapIndex ((i1,v1):(i2,v2):rest)
      | v2 < v1 = Just i2
      | otherwise = findSwapIndex ((i2,v2):rest)
    findSwapIndex _ = Nothing
    swap i j arr =
      [if k == i then arr !! j
       else if k == j then arr !! i
       else v
      | (k, v) <- zip [0..] arr]`,

    Elixir: `defmodule NextPermutation do
  def next_permutation(nums) do
    n = length(nums)
    arr = :array.from_list(nums)
    i = find_i(arr, n - 2)
    if i < 0 do
      Enum.reverse(nums)
    else
      j = find_j(arr, n - 1, :array.get(i, arr))
      swapped = swap(arr, i, j)
      prefix = for k <- 0..i, do: :array.get(k, swapped)
      suffix = for k <- (i+1)..(n-1), do: :array.get(k, swapped)
      prefix ++ Enum.reverse(suffix)
    end
  end

  defp find_i(_arr, i) when i < 0, do: -1
  defp find_i(arr, i) do
    if :array.get(i, arr) < :array.get(i + 1, arr), do: i, else: find_i(arr, i - 1)
  end

  defp find_j(arr, j, val) do
    if :array.get(j, arr) > val, do: j, else: find_j(arr, j - 1, val)
  end

  defp swap(arr, i, j) do
    vi = :array.get(i, arr)
    vj = :array.get(j, arr)
    arr |> :array.set(i, vj) |> :array.set(j, vi)
  end
end`,

    Rust: `pub fn next_permutation(nums: &mut Vec<i32>) {
    let n = nums.len();
    if n <= 1 { return; }

    // Find i: rightmost index where nums[i] < nums[i+1]
    let i = (0..n - 1).rev().find(|&i| nums[i] < nums[i + 1]);

    match i {
        None => nums.reverse(),
        Some(i) => {
            let j = (0..n).rev().find(|&j| nums[j] > nums[i]).unwrap();
            nums.swap(i, j);
            nums[i + 1..].reverse();
        }
    }
}`,

    Scala: `def nextPermutation(nums: Array[Int]): Unit = {
  val n = nums.length
  val i = (0 until n - 1).reverse.find(i => nums(i) < nums(i + 1))

  i match {
    case None => java.util.Arrays.sort(nums)
    case Some(idx) =>
      val j = (0 until n).reverse.find(j => nums(j) > nums(idx)).get
      val tmp = nums(idx); nums(idx) = nums(j); nums(j) = tmp
      var lo = idx + 1; var hi = n - 1
      while (lo < hi) {
        val t = nums(lo); nums(lo) = nums(hi); nums(hi) = t
        lo += 1; hi -= 1
      }
  }
}`,

    OCaml: `let next_permutation nums =
  let arr = Array.copy nums in
  let n = Array.length arr in
  let swap i j =
    let tmp = arr.(i) in
    arr.(i) <- arr.(j); arr.(j) <- tmp
  in
  let reverse_sub lo hi =
    let lo = ref lo and hi = ref hi in
    while !lo < !hi do swap !lo !hi; incr lo; decr hi done
  in
  let i = ref (n - 2) in
  while !i >= 0 && arr.(!i) >= arr.(!i + 1) do decr i done;
  if !i < 0 then reverse_sub 0 (n - 1)
  else begin
    let j = ref (n - 1) in
    while arr.(!j) <= arr.(!i) do decr j done;
    swap !i !j;
    reverse_sub (!i + 1) (n - 1)
  end;
  arr`,

    Clojure: `(defn next-permutation [nums]
  (let [n (count nums)
        v (vec nums)
        i (loop [i (- n 2)]
            (cond
              (< i 0) nil
              (< (v i) (v (inc i))) i
              :else (recur (dec i))))]
    (if (nil? i)
      (vec (reverse v))
      (let [j (loop [j (dec n)]
                (if (> (v j) (v i)) j (recur (dec j))))
            swapped (assoc v i (v j) j (v i))]
        (vec (concat (subvec swapped 0 (inc i))
                     (reverse (subvec swapped (inc i)))))))))`,

    Lisp: `(defun next-permutation (nums)
  (let* ((arr (coerce (copy-list nums) 'vector))
         (n (length arr)))
    (labels ((swap (i j)
               (rotatef (aref arr i) (aref arr j)))
             (rev-sub (lo hi)
               (loop while (< lo hi) do
                 (swap lo hi) (incf lo) (decf hi))))
      (let ((i (loop for k from (- n 2) downto 0
                     when (< (aref arr k) (aref arr (1+ k)))
                       return k)))
        (if (null i)
            (rev-sub 0 (1- n))
            (let ((j (loop for k from (1- n) downto 0
                           when (> (aref arr k) (aref arr i))
                             return k)))
              (swap i j)
              (rev-sub (1+ i) (1- n))))))
    (coerce arr 'list)))`,
  },

  // ─── Problem 26: Longest Valid Parentheses (LC 32) ────────────────────────
  26: {
    TypeScript: `function longestValidParentheses(s: string): number {
  const helper = (chars: string[], dir: 1 | -1): number => {
    const [open, close] = dir === 1 ? ['(', ')'] : [')', '('];
    const arr = dir === 1 ? chars : [...chars].reverse();
    return arr.reduce<{ left: number; right: number; max: number }>(
      (acc, c) => {
        const left = acc.left + (c === open ? 1 : 0);
        const right = acc.right + (c === close ? 1 : 0);
        if (right > left) return { left: 0, right: 0, max: acc.max };
        if (left === right)
          return { left, right, max: Math.max(acc.max, 2 * right) };
        return { left, right, max: acc.max };
      },
      { left: 0, right: 0, max: 0 }
    ).max;
  };
  const chars = s.split('');
  return Math.max(helper(chars, 1), helper(chars, -1));
}`,

    Haskell: `longestValidParentheses :: String -> Int
longestValidParentheses s = max (scan s '(' ')') (scan (reverse s) ')' '(')
  where
    scan cs open close = go cs 0 0 0
    go [] _ _ mx = mx
    go (c:cs) l r mx
      | c == open  = let l' = l + 1
                     in if l' == r then go cs l' r (max mx (2 * r))
                        else go cs l' r mx
      | otherwise  = let r' = r + 1
                     in if r' > l then go cs 0 0 mx
                        else if l == r' then go cs l r' (max mx (2 * r'))
                        else go cs l r' mx`,

    Elixir: `defmodule LongestValidParentheses do
  def longest_valid_parentheses(s) do
    chars = String.graphemes(s)
    max(scan(chars, "(", ")"), scan(Enum.reverse(chars), ")", "("))
  end

  defp scan(chars, open, close) do
    {_, _, mx} =
      Enum.reduce(chars, {0, 0, 0}, fn c, {l, r, mx} ->
        {l, r} = if c == open, do: {l + 1, r}, else: {l, r + 1}
        cond do
          r > l -> {0, 0, mx}
          l == r -> {l, r, max(mx, 2 * r)}
          true -> {l, r, mx}
        end
      end)
    mx
  end
end`,

    Rust: `pub fn longest_valid_parentheses(s: String) -> i32 {
    let chars: Vec<char> = s.chars().collect();
    let scan = |cs: &[char], open: char, close: char| -> i32 {
        cs.iter().fold((0i32, 0i32, 0i32), |(l, r, mx), &c| {
            let (l, r) = if c == open { (l + 1, r) } else { (l, r + 1) };
            if r > l { (0, 0, mx) }
            else if l == r { (l, r, mx.max(2 * r)) }
            else { (l, r, mx) }
        }).2
    };
    let rev: Vec<char> = chars.iter().rev().cloned().collect();
    scan(&chars, '(', ')').max(scan(&rev, ')', '('))
}`,

    Scala: `def longestValidParentheses(s: String): Int = {
  def scan(cs: Seq[Char], open: Char, close: Char): Int =
    cs.foldLeft((0, 0, 0)) { case ((l, r, mx), c) =>
      val (l2, r2) = if (c == open) (l + 1, r) else (l, r + 1)
      if (r2 > l2) (0, 0, mx)
      else if (l2 == r2) (l2, r2, mx max (2 * r2))
      else (l2, r2, mx)
    }._3
  scan(s, '(', ')') max scan(s.reverse, ')', '(')
}`,

    OCaml: `let longest_valid_parentheses s =
  let scan cs open_c close_c =
    List.fold_left (fun (l, r, mx) c ->
      let l, r = if c = open_c then (l+1, r) else (l, r+1) in
      if r > l then (0, 0, mx)
      else if l = r then (l, r, max mx (2 * r))
      else (l, r, mx)
    ) (0, 0, 0) cs |> fun (_, _, mx) -> mx
  in
  let chars = List.init (String.length s) (String.get s) in
  max (scan chars '(' ')') (scan (List.rev chars) ')' '(')`,

    Clojure: `(defn longest-valid-parentheses [s]
  (letfn [(scan [cs open close]
            (nth
              (reduce (fn [[l r mx] c]
                        (let [[l r] (if (= c open) [(inc l) r] [l (inc r)])]
                          (cond
                            (> r l) [0 0 mx]
                            (= l r) [l r (max mx (* 2 r))]
                            :else   [l r mx])))
                      [0 0 0] cs) 2))]
    (max (scan (seq s) \\( \\))
         (scan (reverse (seq s)) \\) \\())))`,

    Lisp: `(defun longest-valid-parentheses (s)
  (labels ((scan (cs open close)
             (third
               (reduce (lambda (acc c)
                         (destructuring-bind (l r mx) acc
                           (let ((l (if (char= c open) (1+ l) l))
                                 (r (if (char= c close) (1+ r) r)))
                             (cond ((> r l) (list 0 0 mx))
                                   ((= l r) (list l r (max mx (* 2 r))))
                                   (t (list l r mx))))))
                       cs :initial-value '(0 0 0)))))
    (max (scan (coerce s 'list) #\\( #\\))
         (scan (reverse (coerce s 'list)) #\\) #\\())))`,
  },

  // ─── Problem 27: Search in Rotated Sorted Array (LC 33) ───────────────────
  27: {
    TypeScript: `function search(nums: number[], target: number): number {
  const go = (lo: number, hi: number): number => {
    if (lo > hi) return -1;
    const mid = Math.floor((lo + hi) / 2);
    if (nums[mid] === target) return mid;
    if (nums[lo] <= nums[mid]) {
      return target >= nums[lo] && target < nums[mid]
        ? go(lo, mid - 1)
        : go(mid + 1, hi);
    }
    return target > nums[mid] && target <= nums[hi]
      ? go(mid + 1, hi)
      : go(lo, mid - 1);
  };
  return go(0, nums.length - 1);
}`,

    Haskell: `import Data.Vector (Vector, (!))
import qualified Data.Vector as V

search :: Vector Int -> Int -> Int
search nums target = go 0 (V.length nums - 1)
  where
    go lo hi
      | lo > hi        = -1
      | nums ! mid == target = mid
      | nums ! lo <= nums ! mid =
          if target >= nums ! lo && target < nums ! mid
          then go lo (mid - 1)
          else go (mid + 1) hi
      | otherwise =
          if target > nums ! mid && target <= nums ! hi
          then go (mid + 1) hi
          else go lo (mid - 1)
      where mid = (lo + hi) \`div\` 2`,

    Elixir: `defmodule SearchRotated do
  def search(nums, target) do
    arr = :array.from_list(nums)
    go(arr, target, 0, :array.size(arr) - 1)
  end

  defp go(_arr, _target, lo, hi) when lo > hi, do: -1
  defp go(arr, target, lo, hi) do
    mid = div(lo + hi, 2)
    mid_val = :array.get(mid, arr)
    lo_val = :array.get(lo, arr)
    hi_val = :array.get(hi, arr)
    cond do
      mid_val == target -> mid
      lo_val <= mid_val ->
        if target >= lo_val and target < mid_val,
          do: go(arr, target, lo, mid - 1),
          else: go(arr, target, mid + 1, hi)
      true ->
        if target > mid_val and target <= hi_val,
          do: go(arr, target, mid + 1, hi),
          else: go(arr, target, lo, mid - 1)
    end
  end
end`,

    Rust: `pub fn search(nums: Vec<i32>, target: i32) -> i32 {
    fn go(nums: &[i32], target: i32, lo: usize, hi: isize) -> i32 {
        if lo as isize > hi { return -1; }
        let mid = (lo as isize + hi) as usize / 2;
        if nums[mid] == target { return mid as i32; }
        if nums[lo] <= nums[mid] {
            if target >= nums[lo] && target < nums[mid] {
                go(nums, target, lo, mid as isize - 1)
            } else {
                go(nums, target, mid + 1, hi)
            }
        } else if target > nums[mid] && target <= nums[hi as usize] {
            go(nums, target, mid + 1, hi)
        } else {
            go(nums, target, lo, mid as isize - 1)
        }
    }
    if nums.is_empty() { return -1; }
    go(&nums, target, 0, nums.len() as isize - 1)
}`,

    Scala: `def search(nums: Array[Int], target: Int): Int = {
  @annotation.tailrec
  def go(lo: Int, hi: Int): Int = {
    if (lo > hi) -1
    else {
      val mid = (lo + hi) / 2
      if (nums(mid) == target) mid
      else if (nums(lo) <= nums(mid)) {
        if (target >= nums(lo) && target < nums(mid)) go(lo, mid - 1)
        else go(mid + 1, hi)
      } else {
        if (target > nums(mid) && target <= nums(hi)) go(mid + 1, hi)
        else go(lo, mid - 1)
      }
    }
  }
  go(0, nums.length - 1)
}`,

    OCaml: `let search nums target =
  let a = Array.of_list nums in
  let rec go lo hi =
    if lo > hi then -1
    else
      let mid = (lo + hi) / 2 in
      if a.(mid) = target then mid
      else if a.(lo) <= a.(mid) then
        if target >= a.(lo) && target < a.(mid) then go lo (mid - 1)
        else go (mid + 1) hi
      else
        if target > a.(mid) && target <= a.(hi) then go (mid + 1) hi
        else go lo (mid - 1)
  in
  go 0 (Array.length a - 1)`,

    Clojure: `(defn search-rotated [nums target]
  (let [arr (vec nums)]
    (loop [lo 0 hi (dec (count arr))]
      (if (> lo hi) -1
        (let [mid (quot (+ lo hi) 2)
              m (arr mid) l (arr lo) h (arr hi)]
          (cond
            (= m target) mid
            (<= l m)
              (if (and (>= target l) (< target m))
                (recur lo (dec mid))
                (recur (inc mid) hi))
            :else
              (if (and (> target m) (<= target h))
                (recur (inc mid) hi)
                (recur lo (dec mid)))))))))`,

    Lisp: `(defun search-rotated (nums target)
  (let ((arr (coerce nums 'vector)))
    (labels ((go (lo hi)
               (if (> lo hi) -1
                 (let* ((mid (floor (+ lo hi) 2))
                        (m (aref arr mid))
                        (l (aref arr lo))
                        (h (aref arr hi)))
                   (cond ((= m target) mid)
                         ((<= l m)
                          (if (and (>= target l) (< target m))
                              (go lo (1- mid))
                              (go (1+ mid) hi)))
                         (t (if (and (> target m) (<= target h))
                                (go (1+ mid) hi)
                                (go lo (1- mid)))))))))
      (go 0 (1- (length arr))))))`,
  },

  // ─── Problem 28: Diameter of Binary Tree (LC 543) ─────────────────────────
  28: {
    TypeScript: `interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function diameterOfBinaryTree(root: TreeNode | null): number {
  const dfs = (node: TreeNode | null): [number, number] => {
    // returns [height, diameter]
    if (!node) return [0, 0];
    const [lh, ld] = dfs(node.left);
    const [rh, rd] = dfs(node.right);
    return [1 + Math.max(lh, rh), Math.max(lh + rh, ld, rd)];
  };
  return dfs(root)[1];
}`,

    Haskell: `data Tree a = Nil | Node a (Tree a) (Tree a)

diameterOfBinaryTree :: Tree a -> Int
diameterOfBinaryTree = snd . go
  where
    go Nil = (0, 0)
    go (Node _ l r) =
      let (lh, ld) = go l
          (rh, rd) = go r
      in (1 + max lh rh, maximum [lh + rh, ld, rd])`,

    Elixir: `defmodule DiameterBT do
  def diameter(nil), do: 0
  def diameter(tree), do: elem(dfs(tree), 1)

  defp dfs(nil), do: {0, 0}
  defp dfs({_val, left, right}) do
    {lh, ld} = dfs(left)
    {rh, rd} = dfs(right)
    {1 + max(lh, rh), Enum.max([lh + rh, ld, rd])}
  end
end`,

    Rust: `use std::cell::RefCell;
use std::rc::Rc;

#[derive(Debug)]
pub struct TreeNode {
    pub val: i32,
    pub left: Option<Rc<RefCell<TreeNode>>>,
    pub right: Option<Rc<RefCell<TreeNode>>>,
}

pub fn diameter_of_binary_tree(root: Option<Rc<RefCell<TreeNode>>>) -> i32 {
    fn dfs(node: &Option<Rc<RefCell<TreeNode>>>) -> (i32, i32) {
        match node {
            None => (0, 0),
            Some(n) => {
                let n = n.borrow();
                let (lh, ld) = dfs(&n.left);
                let (rh, rd) = dfs(&n.right);
                (1 + lh.max(rh), (lh + rh).max(ld).max(rd))
            }
        }
    }
    dfs(&root).1
}`,

    Scala: `sealed trait Tree[+A]
case object Nil extends Tree[Nothing]
case class Node[A](v: A, l: Tree[A], r: Tree[A]) extends Tree[A]

def diameterOfBinaryTree[A](root: Tree[A]): Int = {
  def dfs(node: Tree[A]): (Int, Int) = node match {
    case Nil => (0, 0)
    case Node(_, l, r) =>
      val (lh, ld) = dfs(l)
      val (rh, rd) = dfs(r)
      (1 + (lh max rh), List(lh + rh, ld, rd).max)
  }
  dfs(root)._2
}`,

    OCaml: `type 'a tree = Nil | Node of 'a * 'a tree * 'a tree

let diameter_of_binary_tree root =
  let rec dfs = function
    | Nil -> (0, 0)
    | Node (_, l, r) ->
      let (lh, ld) = dfs l in
      let (rh, rd) = dfs r in
      (1 + max lh rh, List.fold_left max 0 [lh + rh; ld; rd])
  in
  snd (dfs root)`,

    Clojure: `(defn diameter-of-binary-tree [root]
  (letfn [(dfs [node]
            (if (nil? node) [0 0]
              (let [[lh ld] (dfs (:left node))
                    [rh rd] (dfs (:right node))]
                [(inc (max lh rh))
                 (max (+ lh rh) ld rd)])))]
    (second (dfs root))))`,

    Lisp: `(defstruct tnode val left right)

(defun diameter-of-binary-tree (root)
  (labels ((dfs (node)
             (if (null node) (values 0 0)
               (multiple-value-bind (lh ld) (dfs (tnode-left node))
                 (multiple-value-bind (rh rd) (dfs (tnode-right node))
                   (values (1+ (max lh rh))
                           (max (+ lh rh) ld rd)))))))
    (nth-value 1 (dfs root))))`,
  },

  // ─── Problem 29: Valid Sudoku (LC 36) ─────────────────────────────────────
  29: {
    TypeScript: `function isValidSudoku(board: string[][]): boolean {
  const seen = board.reduce<Set<string>>((acc, row, i) =>
    row.reduce((acc2, cell, j) => {
      if (cell === '.') return acc2;
      const keys = [
        \`r\${i}:\${cell}\`,
        \`c\${j}:\${cell}\`,
        \`b\${Math.floor(i/3)},\${Math.floor(j/3)}:\${cell}\`
      ];
      keys.forEach(k => acc2.add(k));
      return acc2;
    }, acc)
  , new Set());
  // Check no duplicates by counting
  let count = 0;
  board.forEach((row, i) =>
    row.forEach((cell, j) => {
      if (cell !== '.') count += 3;
    })
  );
  return seen.size === count;
}`,

    Haskell: `import qualified Data.Set as Set

isValidSudoku :: [[Char]] -> Bool
isValidSudoku board =
  let entries = [ (i, j, c)
                | (i, row) <- zip [0..] board
                , (j, c)   <- zip [0..] row
                , c /= '.' ]
      keys (i, j, c) =
        [ "r" ++ show i ++ ":" ++ [c]
        , "c" ++ show j ++ ":" ++ [c]
        , "b" ++ show (i \`div\` 3) ++ "," ++ show (j \`div\` 3) ++ ":" ++ [c]
        ]
      allKeys = concatMap keys entries
  in length allKeys == Set.size (Set.fromList allKeys)`,

    Elixir: `defmodule ValidSudoku do
  def is_valid?(board) do
    entries =
      for {row, i} <- Enum.with_index(board),
          {cell, j} <- Enum.with_index(row),
          cell != ".",
          do: {i, j, cell}

    keys =
      Enum.flat_map(entries, fn {i, j, c} ->
        ["r\#{i}:\#{c}", "c\#{j}:\#{c}",
         "b\#{div(i,3)},\#{div(j,3)}:\#{c}"]
      end)

    length(keys) == MapSet.size(MapSet.new(keys))
  end
end`,

    Rust: `use std::collections::HashSet;

pub fn is_valid_sudoku(board: Vec<Vec<char>>) -> bool {
    let (count, set) = board.iter().enumerate().fold(
        (0usize, HashSet::new()),
        |(cnt, set), (i, row)| {
            row.iter().enumerate().fold((cnt, set), |(cnt, mut set), (j, &c)| {
                if c == '.' { (cnt, set) }
                else {
                    set.insert(format!("r{}:{}", i, c));
                    set.insert(format!("c{}:{}", j, c));
                    set.insert(format!("b{},{}:{}", i/3, j/3, c));
                    (cnt + 3, set)
                }
            })
        }
    );
    count == set.len()
}`,

    Scala: `def isValidSudoku(board: Array[Array[Char]]): Boolean = {
  val entries = for {
    (row, i) <- board.zipWithIndex
    (c, j)   <- row.zipWithIndex
    if c != '.'
  } yield (i, j, c)
  val keys = entries.flatMap { case (i, j, c) =>
    Seq(s"r$i:$c", s"c$j:$c", s"b\${i/3},\${j/3}:$c")
  }
  keys.length == keys.toSet.size
}`,

    OCaml: `let is_valid_sudoku board =
  let entries =
    List.concat_mapi (fun i row ->
      List.filter_map (fun (j, c) ->
        if c = '.' then None
        else Some (i, j, c)
      ) (List.mapi (fun j c -> (j, c)) row)
    ) board
  in
  let keys = List.concat_map (fun (i, j, c) ->
    [ Printf.sprintf "r%d:%c" i c;
      Printf.sprintf "c%d:%c" j c;
      Printf.sprintf "b%d,%d:%c" (i/3) (j/3) c ]
  ) entries in
  let module SSet = Set.Make(String) in
  List.length keys = SSet.cardinal (SSet.of_list keys)`,

    Clojure: `(defn valid-sudoku? [board]
  (let [entries (for [i (range 9) j (range 9)
                      :let [c (get-in board [i j])]
                      :when (not= c \\. )]
                  [i j c])
        keys (mapcat (fn [[i j c]]
                       [(str "r" i ":" c)
                        (str "c" j ":" c)
                        (str "b" (quot i 3) "," (quot j 3) ":" c)])
                     entries)]
    (= (count keys) (count (set keys)))))`,

    Lisp: `(defun valid-sudoku-p (board)
  (let ((keys '()))
    (loop for i from 0 below 9 do
      (loop for j from 0 below 9 do
        (let ((c (aref (aref board i) j)))
          (when (char/= c #\\.)
            (push (format nil "r~D:~C" i c) keys)
            (push (format nil "c~D:~C" j c) keys)
            (push (format nil "b~D,~D:~C" (floor i 3) (floor j 3) c) keys)))))
    (= (length keys) (length (remove-duplicates keys :test #'string=)))))`,
  },

  // ─── Problem 30: Sudoku Solver (LC 37) ────────────────────────────────────
  30: {
    TypeScript: `function solveSudoku(board: string[][]): void {
  const digits = '123456789'.split('');

  const isValid = (board: string[][], r: number, c: number, d: string): boolean =>
    board[r].every(v => v !== d) &&
    board.every(row => row[c] !== d) &&
    board.slice(Math.floor(r/3)*3, Math.floor(r/3)*3+3)
      .every(row => row.slice(Math.floor(c/3)*3, Math.floor(c/3)*3+3)
        .every(v => v !== d));

  const solve = (board: string[][]): string[][] | null => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === '.') {
          for (const d of digits) {
            if (isValid(board, i, j, d)) {
              const newBoard = board.map(r => [...r]);
              newBoard[i][j] = d;
              const result = solve(newBoard);
              if (result) return result;
            }
          }
          return null;
        }
      }
    }
    return board;
  };

  const result = solve(board);
  if (result) result.forEach((row, i) => row.forEach((v, j) => board[i][j] = v));
}`,

    Haskell: `import Data.List (nub, (\\\\))

type Board = [[Char]]

solveSudoku :: Board -> Board
solveSudoku board = case solve board of
  Just b  -> b
  Nothing -> board

solve :: Board -> Maybe Board
solve board = case findEmpty board of
  Nothing     -> Just board
  Just (r, c) ->
    let candidates = "123456789" \\\\ usedAt board r c
    in foldr (\\d acc -> case solve (place board r c d) of
                          Just b  -> Just b
                          Nothing -> acc) Nothing candidates

findEmpty :: Board -> Maybe (Int, Int)
findEmpty board = foldr (\\(i,j,v) acc -> if v == '.' then Just (i,j) else acc)
                        Nothing
                        [(i,j, board !! i !! j) | i <- [0..8], j <- [0..8]]

usedAt :: Board -> Int -> Int -> [Char]
usedAt b r c = nub $ (b !! r) ++
  map (!! c) b ++
  [b !! i !! j | i <- [br..br+2], j <- [bc..bc+2]]
  where br = (r \`div\` 3) * 3; bc = (c \`div\` 3) * 3

place :: Board -> Int -> Int -> Char -> Board
place b r c v =
  [ [ if i == r && j == c then v else b !! i !! j
    | j <- [0..8] ]
  | i <- [0..8] ]`,

    Elixir: `defmodule SudokuSolver do
  def solve(board) do
    case find_empty(board) do
      nil -> board
      {r, c} ->
        Enum.find_value(1..9, board, fn d ->
          ds = Integer.to_string(d)
          if valid?(board, r, c, ds) do
            new_board = put_in(board, [Access.at(r), Access.at(c)], ds)
            result = solve(new_board)
            if solved?(result), do: result, else: nil
          end
        end) || board
    end
  end

  defp find_empty(board) do
    Enum.reduce_while(0..8, nil, fn i, _ ->
      case Enum.find_index(Enum.at(board, i), &(&1 == ".")) do
        nil -> {:cont, nil}
        j -> {:halt, {i, j}}
      end
    end)
  end

  defp solved?(board), do: not Enum.any?(board, fn row -> Enum.member?(row, ".") end)

  defp valid?(board, r, c, d) do
    row = Enum.at(board, r)
    col = Enum.map(board, &Enum.at(&1, c))
    br = div(r, 3) * 3; bc = div(c, 3) * 3
    box = for i <- br..(br+2), j <- bc..(bc+2), do: board |> Enum.at(i) |> Enum.at(j)
    d not in row and d not in col and d not in box
  end
end`,

    Rust: `pub fn solve_sudoku(board: &mut Vec<Vec<char>>) {
    fn is_valid(board: &Vec<Vec<char>>, r: usize, c: usize, d: char) -> bool {
        let br = (r / 3) * 3;
        let bc = (c / 3) * 3;
        (0..9).all(|i| board[r][i] != d) &&
        (0..9).all(|i| board[i][c] != d) &&
        (0..3).all(|i| (0..3).all(|j| board[br+i][bc+j] != d))
    }

    fn solve(board: &mut Vec<Vec<char>>) -> bool {
        for i in 0..9 {
            for j in 0..9 {
                if board[i][j] == '.' {
                    for d in '1'..='9' {
                        if is_valid(board, i, j, d) {
                            board[i][j] = d;
                            if solve(board) { return true; }
                            board[i][j] = '.';
                        }
                    }
                    return false;
                }
            }
        }
        true
    }
    solve(board);
}`,

    Scala: `def solveSudoku(board: Array[Array[Char]]): Unit = {
  def isValid(r: Int, c: Int, d: Char): Boolean = {
    val br = (r / 3) * 3; val bc = (c / 3) * 3
    (0 until 9).forall(i => board(r)(i) != d) &&
    (0 until 9).forall(i => board(i)(c) != d) &&
    (0 until 3).forall(i => (0 until 3).forall(j => board(br+i)(bc+j) != d))
  }

  def solve(): Boolean = {
    (for (i <- 0 until 9; j <- 0 until 9 if board(i)(j) == '.') yield (i, j))
      .headOption match {
        case None => true
        case Some((r, c)) =>
          ('1' to '9').exists { d =>
            if (isValid(r, c, d)) {
              board(r)(c) = d
              if (solve()) true else { board(r)(c) = '.'; false }
            } else false
          }
      }
  }
  solve()
}`,

    OCaml: `let solve_sudoku board =
  let b = Array.map Array.copy board in
  let is_valid r c d =
    let br = (r / 3) * 3 and bc = (c / 3) * 3 in
    let row_ok = Array.for_all (fun x -> x <> d) b.(r) in
    let col_ok = Array.for_all (fun row -> row.(c) <> d) b in
    let box_ok = ref true in
    for i = 0 to 2 do for j = 0 to 2 do
      if b.(br+i).(bc+j) = d then box_ok := false
    done done;
    row_ok && col_ok && !box_ok
  in
  let rec solve () =
    match Array.to_seq b |> Seq.find_mapi (fun i row ->
      Array.to_seq row |> Seq.find_mapi (fun j c ->
        if c = '.' then Some (i, j) else None))
    with
    | None -> true
    | Some (r, c) ->
      let digits = List.init 9 (fun i -> Char.chr (i + Char.code '1')) in
      List.exists (fun d ->
        if is_valid r c d then begin
          b.(r).(c) <- d;
          if solve () then true else (b.(r).(c) <- '.'; false)
        end else false
      ) digits
  in
  ignore (solve ()); b`,

    Clojure: `(defn solve-sudoku [board]
  (letfn [(find-empty [b]
            (first (for [i (range 9) j (range 9)
                         :when (= (get-in b [i j]) \\.)]
                     [i j])))
          (valid? [b r c d]
            (let [br (* (quot r 3) 3) bc (* (quot c 3) 3)]
              (and (every? #(not= % d) (get b r))
                   (every? #(not= (get % c) d) b)
                   (every? #(not= % d)
                           (for [i (range br (+ br 3))
                                 j (range bc (+ bc 3))]
                             (get-in b [i j]))))))
          (solve [b]
            (if-let [[r c] (find-empty b)]
              (some (fn [d]
                      (when (valid? b r c d)
                        (solve (assoc-in b [r c] d))))
                    (map #(char (+ (int \\1) %)) (range 9)))
              b))]
    (solve board)))`,

    Lisp: `(defun solve-sudoku (board)
  (labels ((find-empty (b)
             (loop for i from 0 below 9 do
               (loop for j from 0 below 9 do
                 (when (char= (aref b i j) #\\.)
                   (return-from find-empty (values i j)))))
             (values -1 -1))
           (valid-p (b r c d)
             (let ((br (* (floor r 3) 3)) (bc (* (floor c 3) 3)))
               (and (loop for k below 9 never (char= (aref b r k) d))
                    (loop for k below 9 never (char= (aref b k c) d))
                    (loop for i from br below (+ br 3)
                          always (loop for j from bc below (+ bc 3)
                                       never (char= (aref b i j) d))))))
           (solve (b)
             (multiple-value-bind (r c) (find-empty b)
               (if (= r -1) (values b t)
                 (loop for d from 1 to 9
                       for ch = (code-char (+ d (char-code #\\0)))
                       when (valid-p b r c ch) do
                         (setf (aref b r c) ch)
                         (multiple-value-bind (res ok) (solve b)
                           (when ok (return-from solve (values res t))))
                         (setf (aref b r c) #\\.)
                       finally (return (values b nil)))))))
    (solve board)))`,
  },

  // ─── Problem 31: Shortest Path to Get Food (LC 1730) ──────────────────────
  31: {
    TypeScript: `function getFood(grid: string[][]): number {
  const rows = grid.length, cols = grid[0].length;
  const start = grid.reduce<[number, number]>((acc, row, i) => {
    const j = row.indexOf('*');
    return j !== -1 ? [i, j] : acc;
  }, [0, 0]);

  const dirs = [[0,1],[0,-1],[1,0],[-1,0]];

  const bfs = (queue: [number, number, number][], visited: Set<string>): number => {
    if (queue.length === 0) return -1;
    const next: [number, number, number][] = [];
    for (const [r, c, d] of queue) {
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        const key = \`\${nr},\${nc}\`;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols &&
            grid[nr][nc] !== 'X' && !visited.has(key)) {
          if (grid[nr][nc] === '#') return d + 1;
          visited.add(key);
          next.push([nr, nc, d + 1]);
        }
      }
    }
    return bfs(next, visited);
  };

  const visited = new Set<string>([\`\${start[0]},\${start[1]}\`]);
  return bfs([[start[0], start[1], 0]], visited);
}`,

    Haskell: `import qualified Data.Set as Set
import Data.Array

getFood :: [[Char]] -> Int
getFood grid = bfs [(sr, sc, 0)] (Set.singleton (sr, sc))
  where
    rows = length grid
    cols = length (head grid)
    arr  = listArray ((0,0),(rows-1,cols-1))
           [grid !! i !! j | i <- [0..rows-1], j <- [0..cols-1]]
    (sr, sc) = head [(i,j) | i <- [0..rows-1], j <- [0..cols-1], arr ! (i,j) == '*']
    dirs = [(0,1),(0,-1),(1,0),(-1,0)]
    bfs [] _ = -1
    bfs queue vis =
      let step [] vis' next = bfs next vis'
          step ((r,c,d):rest) vis' next =
            let neighbors = [(r+dr, c+dc, d+1) | (dr,dc) <- dirs,
                             let nr = r+dr, let nc = c+dc,
                             nr >= 0, nr < rows, nc >= 0, nc < cols,
                             arr ! (nr,nc) /= 'X',
                             not (Set.member (nr,nc) vis')]
                found = filter (\\(nr,nc,_) -> arr ! (nr,nc) == '#') neighbors
            in case found of
                 ((_, _, dist):_) -> dist
                 [] -> step rest
                        (foldl (\\s (nr,nc,_) -> Set.insert (nr,nc) s) vis' neighbors)
                        (next ++ neighbors)
      in step queue vis []`,

    Elixir: `defmodule ShortestFood do
  def get_food(grid) do
    rows = length(grid); cols = length(hd(grid))
    arr = grid |> Enum.with_index() |> Enum.flat_map(fn {row, i} ->
      row |> Enum.with_index() |> Enum.map(fn {c, j} -> {{i, j}, c} end)
    end) |> Map.new()

    {sr, sc} = Enum.find_value(arr, fn {{r, c}, v} -> if v == "*", do: {r, c} end)
    dirs = [{0,1},{0,-1},{1,0},{-1,0}]
    bfs([{sr, sc, 0}], MapSet.new([{sr, sc}]), arr, rows, cols, dirs)
  end

  defp bfs([], _vis, _arr, _rows, _cols, _dirs), do: -1
  defp bfs(queue, vis, arr, rows, cols, dirs) do
    {next, vis, found} = Enum.reduce(queue, {[], vis, nil}, fn
      _, {nx, vs, {:found, d}} -> {nx, vs, {:found, d}}
      {r, c, d}, {nx, vs, nil} ->
        Enum.reduce(dirs, {nx, vs, nil}, fn
          _, {nx, vs, {:found, d}} -> {nx, vs, {:found, d}}
          {dr, dc}, {nx, vs, nil} ->
            {nr, nc} = {r + dr, c + dc}
            if nr >= 0 and nr < rows and nc >= 0 and nc < cols and
               Map.get(arr, {nr, nc}) != "X" and not MapSet.member?(vs, {nr, nc}) do
              if Map.get(arr, {nr, nc}) == "#", do: {nx, vs, {:found, d + 1}},
              else: {[{nr, nc, d + 1} | nx], MapSet.put(vs, {nr, nc}), nil}
            else
              {nx, vs, nil}
            end
        end)
    end)
    case found do
      {:found, d} -> d
      nil -> bfs(Enum.reverse(next), vis, arr, rows, cols, dirs)
    end
  end
end`,

    Rust: `use std::collections::{HashSet, VecDeque};

pub fn get_food(grid: Vec<Vec<char>>) -> i32 {
    let (rows, cols) = (grid.len(), grid[0].len());
    let start = (0..rows).flat_map(|i| (0..cols).map(move |j| (i, j)))
        .find(|&(i, j)| grid[i][j] == '*').unwrap();
    let dirs = [(0i32,1i32),(0,-1),(1,0),(-1,0)];
    let mut queue = VecDeque::new();
    let mut visited = HashSet::new();
    queue.push_back((start.0, start.1, 0));
    visited.insert(start);
    while let Some((r, c, d)) = queue.pop_front() {
        for &(dr, dc) in &dirs {
            let (nr, nc) = (r as i32 + dr, c as i32 + dc);
            if nr >= 0 && nr < rows as i32 && nc >= 0 && nc < cols as i32 {
                let (nr, nc) = (nr as usize, nc as usize);
                if grid[nr][nc] != 'X' && visited.insert((nr, nc)) {
                    if grid[nr][nc] == '#' { return d + 1; }
                    queue.push_back((nr, nc, d + 1));
                }
            }
        }
    }
    -1
}`,

    Scala: `def getFood(grid: Array[Array[Char]]): Int = {
  val (rows, cols) = (grid.length, grid(0).length)
  val start = (for (i <- 0 until rows; j <- 0 until cols if grid(i)(j) == '*') yield (i, j)).head
  val dirs = List((0,1),(0,-1),(1,0),(-1,0))

  @annotation.tailrec
  def bfs(queue: List[(Int,Int,Int)], visited: Set[(Int,Int)]): Int = queue match {
    case Nil => -1
    case _ =>
      val (next, vis2, found) = queue.foldLeft((List.empty[(Int,Int,Int)], visited, Option.empty[Int])) {
        case ((nx, vis, Some(d)), _) => (nx, vis, Some(d))
        case ((nx, vis, None), (r, c, d)) =>
          dirs.foldLeft((nx, vis, Option.empty[Int])) {
            case ((nx, vis, Some(d)), _) => (nx, vis, Some(d))
            case ((nx, vis, None), (dr, dc)) =>
              val (nr, nc) = (r + dr, c + dc)
              if (nr >= 0 && nr < rows && nc >= 0 && nc < cols &&
                  grid(nr)(nc) != 'X' && !vis.contains((nr, nc))) {
                if (grid(nr)(nc) == '#') (nx, vis, Some(d + 1))
                else ((nr, nc, d + 1) :: nx, vis + ((nr, nc)), None)
              } else (nx, vis, None)
          }
      }
      found match {
        case Some(d) => d
        case None => bfs(next.reverse, vis2)
      }
  }
  bfs(List((start._1, start._2, 0)), Set(start))
}`,

    OCaml: `let get_food grid =
  let rows = Array.length grid and cols = Array.length grid.(0) in
  let start = ref (0, 0) in
  Array.iteri (fun i row ->
    Array.iteri (fun j c -> if c = '*' then start := (i, j)) row
  ) grid;
  let (sr, sc) = !start in
  let dirs = [|(0,1);(0,-1);(1,0);(-1,0)|] in
  let visited = Hashtbl.create 256 in
  Hashtbl.add visited (sr, sc) true;
  let queue = Queue.create () in
  Queue.push (sr, sc, 0) queue;
  let result = ref (-1) in
  while not (Queue.is_empty queue) && !result = -1 do
    let (r, c, d) = Queue.pop queue in
    Array.iter (fun (dr, dc) ->
      let nr = r + dr and nc = c + dc in
      if nr >= 0 && nr < rows && nc >= 0 && nc < cols &&
         grid.(nr).(nc) <> 'X' && not (Hashtbl.mem visited (nr, nc)) then begin
        if grid.(nr).(nc) = '#' then result := d + 1
        else begin
          Hashtbl.add visited (nr, nc) true;
          Queue.push (nr, nc, d + 1) queue
        end
      end
    ) dirs
  done;
  !result`,

    Clojure: `(defn get-food [grid]
  (let [rows (count grid) cols (count (first grid))
        start (first (for [i (range rows) j (range cols)
                           :when (= (get-in grid [i j]) \\*)] [i j]))
        dirs [[0 1] [0 -1] [1 0] [-1 0]]]
    (loop [queue (conj clojure.lang.PersistentQueue/EMPTY
                       [(first start) (second start) 0])
           visited #{start}]
      (if (empty? queue) -1
        (let [[r c d] (peek queue)
              queue (pop queue)
              neighbors (for [[dr dc] dirs
                              :let [nr (+ r dr) nc (+ c dc)]
                              :when (and (>= nr 0) (< nr rows)
                                        (>= nc 0) (< nc cols)
                                        (not= (get-in grid [nr nc]) \\X)
                                        (not (visited [nr nc])))]
                          [nr nc])]
          (if-let [food (first (filter #(= (get-in grid %) \\#) neighbors))]
            (inc d)
            (recur (reduce #(conj %1 [(first %2) (second %2) (inc d)]) queue neighbors)
                   (into visited neighbors))))))))`,

    Lisp: `(defun get-food (grid)
  (let* ((rows (array-dimension grid 0))
         (cols (array-dimension grid 1))
         (start (loop for i below rows do
                  (loop for j below cols
                        when (char= (aref grid i j) #\\*)
                          do (return-from nil (cons i j)))))
         (visited (make-hash-table :test 'equal))
         (queue (list (list (car start) (cdr start) 0)))
         (dirs '((0 1) (0 -1) (1 0) (-1 0))))
    (setf (gethash start visited) t)
    (loop while queue do
      (let ((cur (pop queue)))
        (destructuring-bind (r c d) cur
          (dolist (dir dirs)
            (let ((nr (+ r (first dir))) (nc (+ c (second dir))))
              (when (and (>= nr 0) (< nr rows) (>= nc 0) (< nc cols)
                         (char/= (aref grid nr nc) #\\X)
                         (not (gethash (cons nr nc) visited)))
                (when (char= (aref grid nr nc) #\\#)
                  (return-from get-food (1+ d)))
                (setf (gethash (cons nr nc) visited) t)
                (setf queue (append queue (list (list nr nc (1+ d))))))))))
      finally (return -1))))`,
  },

  // ─── Problem 32: Combination Sum (LC 39) ──────────────────────────────────
  32: {
    TypeScript: `function combinationSum(candidates: number[], target: number): number[][] {
  const sorted = [...candidates].sort((a, b) => a - b);
  const go = (start: number, remaining: number, current: number[]): number[][] => {
    if (remaining === 0) return [current];
    if (remaining < 0) return [];
    return sorted.slice(start).reduce<number[][]>((acc, c, i) => {
      if (c > remaining) return acc;
      return [...acc, ...go(start + i, remaining - c, [...current, c])];
    }, []);
  };
  return go(0, target, []);
}`,

    Haskell: `import Data.List (sort)

combinationSum :: [Int] -> Int -> [[Int]]
combinationSum candidates target = go (sort candidates) target []
  where
    go [] _ _ = []
    go _ 0 curr = [reverse curr]
    go (c:cs) rem curr
      | c > rem   = []
      | otherwise = go (c:cs) (rem - c) (c : curr) ++ go cs rem curr`,

    Elixir: `defmodule CombinationSum do
  def combination_sum(candidates, target) do
    candidates |> Enum.sort() |> go(target, [])
  end

  defp go(_, 0, curr), do: [Enum.reverse(curr)]
  defp go([], _, _), do: []
  defp go([c | _], rem, _) when c > rem, do: []
  defp go([c | rest] = cands, rem, curr) do
    go(cands, rem - c, [c | curr]) ++ go(rest, rem, curr)
  end
end`,

    Rust: `pub fn combination_sum(candidates: Vec<i32>, target: i32) -> Vec<Vec<i32>> {
    fn go(cands: &[i32], remain: i32, curr: Vec<i32>) -> Vec<Vec<i32>> {
        if remain == 0 { return vec![curr]; }
        if cands.is_empty() || cands[0] > remain { return vec![]; }
        let mut with = curr.clone();
        with.push(cands[0]);
        let mut result = go(cands, remain - cands[0], with);
        result.extend(go(&cands[1..], remain, curr));
        result
    }
    let mut sorted = candidates;
    sorted.sort();
    go(&sorted, target, vec![])
}`,

    Scala: `def combinationSum(candidates: Array[Int], target: Int): List[List[Int]] = {
  val sorted = candidates.sorted
  def go(start: Int, remain: Int, curr: List[Int]): List[List[Int]] = {
    if (remain == 0) List(curr.reverse)
    else if (start >= sorted.length || sorted(start) > remain) Nil
    else go(start, remain - sorted(start), sorted(start) :: curr) ++
         go(start + 1, remain, curr)
  }
  go(0, target, Nil)
}`,

    OCaml: `let combination_sum candidates target =
  let sorted = List.sort compare candidates in
  let rec go cands remain curr =
    match cands with
    | [] -> if remain = 0 then [List.rev curr] else []
    | c :: _ when c > remain ->
      if remain = 0 then [List.rev curr] else []
    | c :: rest ->
      if remain = 0 then [List.rev curr]
      else go cands (remain - c) (c :: curr) @ go rest remain curr
  in
  go sorted target []`,

    Clojure: `(defn combination-sum [candidates target]
  (let [sorted (sort candidates)]
    (letfn [(go [cands remain curr]
              (cond
                (zero? remain) [(vec (reverse curr))]
                (empty? cands) []
                (> (first cands) remain) []
                :else (concat
                        (go cands (- remain (first cands)) (cons (first cands) curr))
                        (go (rest cands) remain curr))))]
      (go sorted target '()))))`,

    Lisp: `(defun combination-sum (candidates target)
  (let ((sorted (sort (copy-list candidates) #'<)))
    (labels ((go (cands remain curr)
               (cond
                 ((zerop remain) (list (reverse curr)))
                 ((null cands) nil)
                 ((> (car cands) remain) nil)
                 (t (append
                      (go cands (- remain (car cands)) (cons (car cands) curr))
                      (go (cdr cands) remain curr))))))
      (go sorted target nil))))`,
  },

  // ─── Problem 33: First Missing Positive (LC 41) ──────────────────────────
  33: {
    TypeScript: `function firstMissingPositive(nums: number[]): number {
  const s = new Set(nums.filter(n => n > 0));
  const find = (i: number): number => s.has(i) ? find(i + 1) : i;
  return find(1);
}`,

    Haskell: `import qualified Data.Set as Set

firstMissingPositive :: [Int] -> Int
firstMissingPositive nums =
  let s = Set.fromList (filter (> 0) nums)
      go i = if Set.member i s then go (i + 1) else i
  in go 1`,

    Elixir: `defmodule FirstMissing do
  def first_missing_positive(nums) do
    s = nums |> Enum.filter(&(&1 > 0)) |> MapSet.new()
    Stream.iterate(1, &(&1 + 1)) |> Enum.find(&(not MapSet.member?(s, &1)))
  end
end`,

    Rust: `use std::collections::HashSet;

pub fn first_missing_positive(nums: Vec<i32>) -> i32 {
    let s: HashSet<i32> = nums.into_iter().filter(|&n| n > 0).collect();
    (1..).find(|n| !s.contains(n)).unwrap()
}`,

    Scala: `def firstMissingPositive(nums: Array[Int]): Int = {
  val s = nums.filter(_ > 0).toSet
  Iterator.from(1).find(i => !s.contains(i)).get
}`,

    OCaml: `let first_missing_positive nums =
  let module S = Set.Make(Int) in
  let s = List.fold_left (fun acc n ->
    if n > 0 then S.add n acc else acc) S.empty nums in
  let rec go i = if S.mem i s then go (i + 1) else i in
  go 1`,

    Clojure: `(defn first-missing-positive [nums]
  (let [s (set (filter pos? nums))]
    (first (drop-while s (iterate inc 1)))))`,

    Lisp: `(defun first-missing-positive (nums)
  (let ((s (make-hash-table)))
    (dolist (n nums)
      (when (> n 0) (setf (gethash n s) t)))
    (loop for i from 1
          unless (gethash i s) return i)))`,
  },

  // ─── Problem 34: Trapping Rain Water (LC 42) ─────────────────────────────
  34: {
    TypeScript: `function trap(height: number[]): number {
  const maxLeft = height.reduce<number[]>(
    (acc, h) => [...acc, Math.max(h, acc.length ? acc[acc.length - 1] : 0)], []);
  const maxRight = height.reduceRight<number[]>(
    (acc, h) => [Math.max(h, acc.length ? acc[0] : 0), ...acc], []);
  return height.reduce(
    (sum, h, i) => sum + Math.max(0, Math.min(maxLeft[i], maxRight[i]) - h), 0);
}`,

    Haskell: `trap :: [Int] -> Int
trap heights =
  let maxLeft  = scanl1 max heights
      maxRight = scanr1 max heights
      water = zipWith3 (\\h l r -> max 0 (min l r - h)) heights maxLeft maxRight
  in sum water`,

    Elixir: `defmodule TrappingWater do
  def trap(height) do
    max_left = Enum.scan(height, &max/2)
    max_right = height |> Enum.reverse() |> Enum.scan(&max/2) |> Enum.reverse()
    Enum.zip([height, max_left, max_right])
    |> Enum.map(fn {h, l, r} -> max(0, min(l, r) - h) end)
    |> Enum.sum()
  end
end`,

    Rust: `pub fn trap(height: Vec<i32>) -> i32 {
    let n = height.len();
    if n == 0 { return 0; }
    let max_left: Vec<i32> = height.iter()
        .scan(0, |mx, &h| { *mx = (*mx).max(h); Some(*mx) }).collect();
    let max_right: Vec<i32> = height.iter().rev()
        .scan(0, |mx, &h| { *mx = (*mx).max(h); Some(*mx) })
        .collect::<Vec<_>>().into_iter().rev().collect();
    height.iter().enumerate()
        .map(|(i, &h)| (max_left[i].min(max_right[i]) - h).max(0))
        .sum()
}`,

    Scala: `def trap(height: Array[Int]): Int = {
  val maxLeft = height.scanLeft(0)(_ max _).tail
  val maxRight = height.scanRight(0)(_ max _).init
  height.indices.map(i =>
    (maxLeft(i) min maxRight(i)) - height(i) max 0
  ).sum
}`,

    OCaml: `let trap height =
  let arr = Array.of_list height in
  let n = Array.length arr in
  if n = 0 then 0
  else
    let max_left = Array.make n 0 in
    let max_right = Array.make n 0 in
    max_left.(0) <- arr.(0);
    for i = 1 to n - 1 do
      max_left.(i) <- max max_left.(i-1) arr.(i)
    done;
    max_right.(n-1) <- arr.(n-1);
    for i = n - 2 downto 0 do
      max_right.(i) <- max max_right.(i+1) arr.(i)
    done;
    Array.fold_left (fun (s, i) h ->
      (s + max 0 (min max_left.(i) max_right.(i) - h), i + 1)
    ) (0, 0) arr |> fst`,

    Clojure: `(defn trap [height]
  (let [max-left  (reductions max height)
        max-right (reverse (reductions max (reverse height)))]
    (reduce + (map (fn [h l r] (max 0 (- (min l r) h)))
                   height max-left max-right))))`,

    Lisp: `(defun trap (height)
  (let* ((n (length height))
         (max-left (make-array n))
         (max-right (make-array n)))
    (loop for i from 0 below n
          for h in height
          for prev = 0 then (aref max-left (1- i))
          do (setf (aref max-left i) (max h prev)))
    (loop for i from (1- n) downto 0
          for nxt = 0 then (aref max-right (1+ i))
          do (setf (aref max-right i) (max (nth i height) nxt)))
    (loop for i from 0 below n
          for h in height
          sum (max 0 (- (min (aref max-left i) (aref max-right i)) h)))))`,
  },

  // ─── Problem 35: Permutations (LC 46) ────────────────────────────────────
  35: {
    TypeScript: `function permute(nums: number[]): number[][] {
  if (nums.length === 0) return [[]];
  return nums.flatMap((n, i) => {
    const rest = [...nums.slice(0, i), ...nums.slice(i + 1)];
    return permute(rest).map(p => [n, ...p]);
  });
}`,

    Haskell: `import Data.List (delete)

permute :: Eq a => [a] -> [[a]]
permute [] = [[]]
permute xs = concatMap (\\x -> map (x:) (permute (delete x xs))) xs`,

    Elixir: `defmodule Permutations do
  def permute([]), do: [[]]
  def permute(nums) do
    Enum.flat_map(Enum.with_index(nums), fn {n, i} ->
      rest = List.delete_at(nums, i)
      Enum.map(permute(rest), fn p -> [n | p] end)
    end)
  end
end`,

    Rust: `pub fn permute(nums: Vec<i32>) -> Vec<Vec<i32>> {
    if nums.is_empty() { return vec![vec![]]; }
    nums.iter().enumerate().flat_map(|(i, &n)| {
        let rest: Vec<i32> = nums.iter().enumerate()
            .filter(|&(j, _)| j != i).map(|(_, &v)| v).collect();
        permute(rest).into_iter().map(move |mut p| { p.insert(0, n); p })
    }).collect()
}`,

    Scala: `def permute(nums: List[Int]): List[List[Int]] = nums match {
  case Nil => List(Nil)
  case _ => nums.flatMap(n =>
    permute(nums.filterNot(_ == n)).map(n :: _)
  )
}`,

    OCaml: `let rec permute = function
  | [] -> [[]]
  | xs ->
    List.concat_map (fun x ->
      let rest = List.filter (fun y -> y <> x) xs in
      List.map (fun p -> x :: p) (permute rest)
    ) xs`,

    Clojure: `(defn permute [nums]
  (if (empty? nums) [[]]
    (mapcat (fn [i]
              (let [n (nth nums i)
                    rest (concat (take i nums) (drop (inc i) nums))]
                (map #(into [n] %) (permute rest))))
            (range (count nums)))))`,

    Lisp: `(defun permute (nums)
  (if (null nums) '(())
    (mapcan (lambda (n)
              (mapcar (lambda (p) (cons n p))
                      (permute (remove n nums :count 1))))
            nums)))`,
  },

  // ─── Problem 36: Rotate Image (LC 48) ────────────────────────────────────
  36: {
    TypeScript: `function rotate(matrix: number[][]): number[][] {
  const n = matrix.length;
  // Transpose then reverse each row (pure)
  const transposed = matrix.map((_, i) =>
    matrix.map((_, j) => matrix[j][i])
  );
  return transposed.map(row => [...row].reverse());
}`,

    Haskell: `import Data.List (transpose)

rotate :: [[a]] -> [[a]]
rotate = map reverse . transpose`,

    Elixir: `defmodule RotateImage do
  def rotate(matrix) do
    matrix
    |> Enum.zip()
    |> Enum.map(&Tuple.to_list/1)
    |> Enum.map(&Enum.reverse/1)
  end
end`,

    Rust: `pub fn rotate(matrix: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
    let n = matrix.len();
    (0..n).map(|i|
        (0..n).rev().map(|j| matrix[j][i]).collect()
    ).collect()
}`,

    Scala: `def rotate(matrix: Array[Array[Int]]): Array[Array[Int]] =
  matrix.transpose.map(_.reverse)`,

    OCaml: `let rotate matrix =
  let n = Array.length matrix in
  Array.init n (fun i ->
    Array.init n (fun j -> matrix.(n - 1 - j).(i)))`,

    Clojure: `(defn rotate [matrix]
  (mapv (comp vec reverse) (apply mapv vector matrix)))`,

    Lisp: `(defun rotate-image (matrix)
  (let* ((n (length matrix))
         (arr (map 'vector matrix)))
    (loop for i below n collect
      (reverse
        (loop for j below n collect
          (aref (aref arr j) i))))))`,
  },

  // ─── Problem 37: Group Anagrams (LC 49) ──────────────────────────────────
  37: {
    TypeScript: `function groupAnagrams(strs: string[]): string[][] {
  const grouped = strs.reduce<Map<string, string[]>>((acc, s) => {
    const key = [...s].sort().join('');
    return new Map([...acc, [key, [...(acc.get(key) || []), s]]]);
  }, new Map());
  return [...grouped.values()];
}`,

    Haskell: `import Data.List (sort, groupBy, sortBy)
import Data.Ord (comparing)

groupAnagrams :: [String] -> [[String]]
groupAnagrams strs =
  map (map snd) .
  groupBy (\\a b -> fst a == fst b) .
  sortBy (comparing fst) $
  map (\\s -> (sort s, s)) strs`,

    Elixir: `defmodule GroupAnagrams do
  def group_anagrams(strs) do
    strs
    |> Enum.group_by(&(String.graphemes(&1) |> Enum.sort() |> Enum.join()))
    |> Map.values()
  end
end`,

    Rust: `use std::collections::HashMap;

pub fn group_anagrams(strs: Vec<String>) -> Vec<Vec<String>> {
    strs.into_iter().fold(HashMap::new(), |mut map, s| {
        let mut key: Vec<char> = s.chars().collect();
        key.sort();
        map.entry(key).or_insert_with(Vec::new).push(s);
        map
    }).into_values().collect()
}`,

    Scala: `def groupAnagrams(strs: Array[String]): List[List[String]] =
  strs.groupBy(_.sorted).values.map(_.toList).toList`,

    OCaml: `let group_anagrams strs =
  let module SMap = Map.Make(String) in
  let sorted s =
    let cs = List.init (String.length s) (String.get s) in
    let sorted = List.sort Char.compare cs in
    String.init (List.length sorted) (List.nth sorted)
  in
  let map = List.fold_left (fun acc s ->
    let key = sorted s in
    let curr = try SMap.find key acc with Not_found -> [] in
    SMap.add key (s :: curr) acc
  ) SMap.empty strs in
  SMap.fold (fun _ v acc -> v :: acc) map []`,

    Clojure: `(defn group-anagrams [strs]
  (vals (group-by #(apply str (sort %)) strs)))`,

    Lisp: `(defun group-anagrams (strs)
  (let ((table (make-hash-table :test 'equal)))
    (dolist (s strs)
      (let ((key (coerce (sort (copy-seq (coerce s 'list)) #'char<) 'string)))
        (push s (gethash key table nil))))
    (loop for v being the hash-values of table collect v)))`,
  },

  // ─── Problem 38: Pow(x, n) (LC 50) ───────────────────────────────────────
  38: {
    TypeScript: `function myPow(x: number, n: number): number {
  if (n === 0) return 1;
  if (n < 0) return myPow(1 / x, -n);
  if (n % 2 === 0) return myPow(x * x, n / 2);
  return x * myPow(x * x, (n - 1) / 2);
}`,

    Haskell: `myPow :: Double -> Int -> Double
myPow _ 0 = 1
myPow x n
  | n < 0     = myPow (1 / x) (-n)
  | even n    = myPow (x * x) (n \`div\` 2)
  | otherwise = x * myPow (x * x) (n \`div\` 2)`,

    Elixir: `defmodule MyPow do
  def my_pow(_, 0), do: 1.0
  def my_pow(x, n) when n < 0, do: my_pow(1.0 / x, -n)
  def my_pow(x, n) when rem(n, 2) == 0, do: my_pow(x * x, div(n, 2))
  def my_pow(x, n), do: x * my_pow(x * x, div(n, 2))
end`,

    Rust: `pub fn my_pow(x: f64, n: i32) -> f64 {
    match n {
        0 => 1.0,
        _ if n < 0 => my_pow(1.0 / x, -(n as i64) as i32),
        _ if n % 2 == 0 => my_pow(x * x, n / 2),
        _ => x * my_pow(x * x, (n - 1) / 2),
    }
}`,

    Scala: `def myPow(x: Double, n: Int): Double = n match {
  case 0 => 1.0
  case _ if n < 0 => myPow(1.0 / x, -(n.toLong).toInt)
  case _ if n % 2 == 0 => myPow(x * x, n / 2)
  case _ => x * myPow(x * x, n / 2)
}`,

    OCaml: `let rec my_pow x n =
  if n = 0 then 1.0
  else if n < 0 then my_pow (1.0 /. x) (-n)
  else if n mod 2 = 0 then my_pow (x *. x) (n / 2)
  else x *. my_pow (x *. x) (n / 2)`,

    Clojure: `(defn my-pow [x n]
  (cond
    (zero? n) 1.0
    (neg? n)  (my-pow (/ 1.0 x) (- n))
    (even? n) (my-pow (* x x) (quot n 2))
    :else     (* x (my-pow (* x x) (quot n 2)))))`,

    Lisp: `(defun my-pow (x n)
  (cond
    ((zerop n) 1.0d0)
    ((< n 0) (my-pow (/ 1.0d0 x) (- n)))
    ((evenp n) (my-pow (* x x) (/ n 2)))
    (t (* x (my-pow (* x x) (floor n 2))))))`,
  },

  // ─── Problem 39: N-Queens (LC 51) ────────────────────────────────────────
  39: {
    TypeScript: `function solveNQueens(n: number): string[][] {
  const go = (row: number, cols: Set<number>, diag1: Set<number>,
              diag2: Set<number>, board: number[]): string[][] => {
    if (row === n) {
      return [board.map(c =>
        '.'.repeat(c) + 'Q' + '.'.repeat(n - c - 1))];
    }
    return Array.from({ length: n }, (_, c) => c)
      .filter(c => !cols.has(c) && !diag1.has(row - c) && !diag2.has(row + c))
      .flatMap(c =>
        go(row + 1,
           new Set([...cols, c]),
           new Set([...diag1, row - c]),
           new Set([...diag2, row + c]),
           [...board, c])
      );
  };
  return go(0, new Set(), new Set(), new Set(), []);
}`,

    Haskell: `import qualified Data.Set as Set

solveNQueens :: Int -> [[String]]
solveNQueens n = map toBoard $ go 0 Set.empty Set.empty Set.empty []
  where
    go row cols d1 d2 board
      | row == n  = [reverse board]
      | otherwise =
          [ result
          | c <- [0..n-1]
          , not (Set.member c cols)
          , not (Set.member (row - c) d1)
          , not (Set.member (row + c) d2)
          , result <- go (row+1) (Set.insert c cols)
                         (Set.insert (row-c) d1) (Set.insert (row+c) d2)
                         (c : board)
          ]
    toBoard = map (\\c -> replicate c '.' ++ "Q" ++ replicate (n - c - 1) '.')`,

    Elixir: `defmodule NQueens do
  def solve_n_queens(n) do
    go(0, n, MapSet.new(), MapSet.new(), MapSet.new(), [])
    |> Enum.map(fn board ->
      Enum.map(board, fn c ->
        String.duplicate(".", c) <> "Q" <> String.duplicate(".", n - c - 1)
      end)
    end)
  end

  defp go(n, n, _cols, _d1, _d2, board), do: [Enum.reverse(board)]
  defp go(row, n, cols, d1, d2, board) do
    Enum.flat_map(0..(n - 1), fn c ->
      if not MapSet.member?(cols, c) and
         not MapSet.member?(d1, row - c) and
         not MapSet.member?(d2, row + c) do
        go(row + 1, n, MapSet.put(cols, c),
           MapSet.put(d1, row - c), MapSet.put(d2, row + c), [c | board])
      else
        []
      end
    end)
  end
end`,

    Rust: `use std::collections::HashSet;

pub fn solve_n_queens(n: i32) -> Vec<Vec<String>> {
    fn go(row: i32, n: i32, cols: &HashSet<i32>, d1: &HashSet<i32>,
          d2: &HashSet<i32>, board: &[i32]) -> Vec<Vec<String>> {
        if row == n {
            return vec![board.iter().map(|&c| {
                let mut s = ".".repeat(n as usize);
                s.replace_range(c as usize..c as usize + 1, "Q");
                s
            }).collect()];
        }
        (0..n).filter(|c| !cols.contains(c) && !d1.contains(&(row - c))
                        && !d2.contains(&(row + c)))
            .flat_map(|c| {
                let mut cs = cols.clone(); cs.insert(c);
                let mut dd1 = d1.clone(); dd1.insert(row - c);
                let mut dd2 = d2.clone(); dd2.insert(row + c);
                let mut b = board.to_vec(); b.push(c);
                go(row + 1, n, &cs, &dd1, &dd2, &b)
            }).collect()
    }
    go(0, n, &HashSet::new(), &HashSet::new(), &HashSet::new(), &[])
}`,

    Scala: `def solveNQueens(n: Int): List[List[String]] = {
  def go(row: Int, cols: Set[Int], d1: Set[Int], d2: Set[Int],
         board: List[Int]): List[List[String]] = {
    if (row == n) List(board.reverse.map(c =>
      "." * c + "Q" + "." * (n - c - 1)))
    else (0 until n).toList
      .filter(c => !cols(c) && !d1(row - c) && !d2(row + c))
      .flatMap(c =>
        go(row + 1, cols + c, d1 + (row - c), d2 + (row + c), c :: board))
  }
  go(0, Set(), Set(), Set(), Nil)
}`,

    OCaml: `let solve_n_queens n =
  let module ISet = Set.Make(Int) in
  let rec go row cols d1 d2 board =
    if row = n then
      [List.rev_map (fun c ->
        String.init n (fun i -> if i = c then 'Q' else '.')
      ) board]
    else
      List.init n Fun.id
      |> List.filter (fun c ->
        not (ISet.mem c cols) &&
        not (ISet.mem (row - c) d1) &&
        not (ISet.mem (row + c) d2))
      |> List.concat_map (fun c ->
        go (row + 1) (ISet.add c cols)
           (ISet.add (row - c) d1) (ISet.add (row + c) d2)
           (c :: board))
  in
  go 0 ISet.empty ISet.empty ISet.empty []`,

    Clojure: `(defn solve-n-queens [n]
  (letfn [(go [row cols d1 d2 board]
            (if (= row n)
              [(mapv (fn [c]
                       (apply str (map #(if (= % c) "Q" ".")
                                       (range n))))
                     (reverse board))]
              (mapcat (fn [c]
                        (when (and (not (cols c))
                                   (not (d1 (- row c)))
                                   (not (d2 (+ row c))))
                          (go (inc row) (conj cols c)
                              (conj d1 (- row c)) (conj d2 (+ row c))
                              (cons c board))))
                      (range n))))]
    (go 0 #{} #{} #{} '())))`,

    Lisp: `(defun solve-n-queens (n)
  (labels ((make-row (c)
             (concatenate 'string
               (make-string c :initial-element #\\.)
               "Q"
               (make-string (- n c 1) :initial-element #\\.)))
           (go (row cols d1 d2 board)
             (if (= row n)
                 (list (mapcar #'make-row (reverse board)))
                 (loop for c from 0 below n
                       when (and (not (member c cols))
                                 (not (member (- row c) d1))
                                 (not (member (+ row c) d2)))
                         nconc (go (1+ row) (cons c cols)
                                   (cons (- row c) d1)
                                   (cons (+ row c) d2)
                                   (cons c board))))))
    (go 0 nil nil nil nil)))`,
  },

  // ─── Problem 40: Subarray Sum Equals K (LC 560) ──────────────────────────
  40: {
    TypeScript: `function subarraySum(nums: number[], k: number): number {
  return nums.reduce<{ count: number; sum: number; map: Map<number, number> }>(
    (acc, n) => {
      const sum = acc.sum + n;
      const count = acc.count + (acc.map.get(sum - k) || 0);
      const map = new Map(acc.map);
      map.set(sum, (map.get(sum) || 0) + 1);
      return { count, sum, map };
    },
    { count: 0, sum: 0, map: new Map([[0, 1]]) }
  ).count;
}`,

    Haskell: `import qualified Data.Map.Strict as Map

subarraySum :: [Int] -> Int -> Int
subarraySum nums k = go nums 0 0 (Map.singleton 0 1)
  where
    go [] _ count _ = count
    go (x:xs) prefSum count prefMap =
      let s = prefSum + x
          c = count + Map.findWithDefault 0 (s - k) prefMap
          m = Map.insertWith (+) s 1 prefMap
      in go xs s c m`,

    Elixir: `defmodule SubarraySum do
  def subarray_sum(nums, k) do
    {count, _, _} =
      Enum.reduce(nums, {0, 0, %{0 => 1}}, fn n, {count, sum, map} ->
        s = sum + n
        c = count + Map.get(map, s - k, 0)
        m = Map.update(map, s, 1, &(&1 + 1))
        {c, s, m}
      end)
    count
  end
end`,

    Rust: `use std::collections::HashMap;

pub fn subarray_sum(nums: Vec<i32>, k: i32) -> i32 {
    nums.iter().fold(
        (0, 0, HashMap::from([(0, 1)])),
        |(count, sum, mut map), &n| {
            let s = sum + n;
            let c = count + map.get(&(s - k)).unwrap_or(&0);
            *map.entry(s).or_insert(0) += 1;
            (c, s, map)
        }
    ).0
}`,

    Scala: `def subarraySum(nums: Array[Int], k: Int): Int = {
  nums.foldLeft((0, 0, Map(0 -> 1))) { case ((count, sum, map), n) =>
    val s = sum + n
    val c = count + map.getOrElse(s - k, 0)
    val m = map + (s -> (map.getOrElse(s, 0) + 1))
    (c, s, m)
  }._1
}`,

    OCaml: `let subarray_sum nums k =
  let module IMap = Map.Make(Int) in
  let (count, _, _) =
    List.fold_left (fun (count, sum, map) n ->
      let s = sum + n in
      let c = count + (try IMap.find (s - k) map with Not_found -> 0) in
      let m = IMap.update s (function None -> Some 1 | Some v -> Some (v+1)) map in
      (c, s, m)
    ) (0, 0, IMap.singleton 0 1) nums
  in count`,

    Clojure: `(defn subarray-sum [nums k]
  (first
    (reduce (fn [[count sum prefix-map] n]
              (let [s (+ sum n)
                    c (+ count (get prefix-map (- s k) 0))
                    m (update prefix-map s (fnil inc 0))]
                [c s m]))
            [0 0 {0 1}]
            nums)))`,

    Lisp: `(defun subarray-sum (nums k)
  (let ((map (make-hash-table))
        (count 0) (sum 0))
    (setf (gethash 0 map) 1)
    (dolist (n nums count)
      (incf sum n)
      (incf count (gethash (- sum k) map 0))
      (setf (gethash sum map) (1+ (gethash sum map 0))))))`,
  },

  // ─── Problem 41: Maximum Subarray (LC 53) ────────────────────────────────────
  41: {
    TypeScript: `function maxSubArray(nums: number[]): number {
  return nums.reduce<{ maxSum: number; curSum: number }>(
    (acc, n) => {
      const curSum = Math.max(n, acc.curSum + n);
      return { maxSum: Math.max(acc.maxSum, curSum), curSum };
    },
    { maxSum: -Infinity, curSum: 0 }
  ).maxSum;
}`,

    Haskell: `maxSubArray :: [Int] -> Int
maxSubArray [] = error "empty"
maxSubArray (x:xs) =
  fst $ foldl (\\(best, cur) n ->
    let cur' = max n (cur + n)
    in (max best cur', cur')) (x, x) xs`,

    Elixir: `defmodule MaxSubArray do
  def max_sub_array([h | t]) do
    {best, _} =
      Enum.reduce(t, {h, h}, fn n, {best, cur} ->
        cur = max(n, cur + n)
        {max(best, cur), cur}
      end)
    best
  end
end`,

    Rust: `pub fn max_sub_array(nums: Vec<i32>) -> i32 {
    nums.iter().skip(1).fold(
        (nums[0], nums[0]),
        |(best, cur), &n| {
            let cur = n.max(cur + n);
            (best.max(cur), cur)
        }
    ).0
}`,

    Scala: `def maxSubArray(nums: Array[Int]): Int =
  nums.tail.foldLeft((nums.head, nums.head)) { case ((best, cur), n) =>
    val c = n max (cur + n)
    (best max c, c)
  }._1`,

    OCaml: `let max_sub_array = function
  | [] -> failwith "empty"
  | x :: xs ->
    fst (List.fold_left (fun (best, cur) n ->
      let cur' = max n (cur + n) in
      (max best cur', cur')) (x, x) xs)`,

    Clojure: `(defn max-sub-array [nums]
  (first
    (reduce (fn [[best cur] n]
              (let [c (max n (+ cur n))]
                [(max best c) c]))
            [(first nums) (first nums)]
            (rest nums))))`,

    Lisp: `(defun max-sub-array (nums)
  (reduce (lambda (state n)
            (let* ((best (car state)) (cur (cdr state))
                   (c (max n (+ cur n))))
              (cons (max best c) c)))
          (rest nums)
          :initial-value (cons (first nums) (first nums))))`,
  },

  // ─── Problem 42: Spiral Matrix (LC 54) ───────────────────────────────────────
  42: {
    TypeScript: `function spiralOrder(matrix: number[][]): number[] {
  const spiral = (
    m: number[][]
  ): number[] =>
    m.length === 0
      ? []
      : [
          ...m[0],
          ...spiral(
            m.slice(1).map(r => r.reverse()).reverse()
                .map(r => r.reverse())
          ),
        ];
  // Functional peel: take top row, rotate rest
  const rotate = (m: number[][]): number[][] =>
    m[0]?.map((_, i) => m.map(r => r[i]).reverse()) ?? [];
  const go = (m: number[][]): number[] =>
    m.length === 0 ? [] : [...m[0], ...go(rotate(m.slice(1)))];
  return go(matrix);
}`,

    Haskell: `spiralOrder :: [[Int]] -> [Int]
spiralOrder [] = []
spiralOrder (top:rest) = top ++ spiralOrder (rotate rest)
  where rotate = map reverse . transpose
-- requires: import Data.List (transpose)`,

    Elixir: `defmodule Spiral do
  def spiral_order([]), do: []
  def spiral_order([top | rest]) do
    top ++ spiral_order(rotate(rest))
  end

  defp rotate(m) do
    m
    |> Enum.zip_with(&Function.identity/1)
    |> Enum.map(&Enum.reverse/1)
  end
end`,

    Rust: `pub fn spiral_order(matrix: Vec<Vec<i32>>) -> Vec<i32> {
    fn go(m: Vec<Vec<i32>>) -> Vec<i32> {
        if m.is_empty() || m[0].is_empty() { return vec![]; }
        let mut result = m[0].clone();
        let rest: Vec<Vec<i32>> = m[1..].to_vec();
        let rotated = rotate(rest);
        result.extend(go(rotated));
        result
    }
    fn rotate(m: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        if m.is_empty() || m[0].is_empty() { return vec![]; }
        (0..m[0].len()).map(|i|
            m.iter().map(|r| r[i]).rev().collect()
        ).collect()
    }
    go(matrix)
}`,

    Scala: `def spiralOrder(matrix: Array[Array[Int]]): List[Int] = {
  def rotate(m: List[List[Int]]): List[List[Int]] =
    m.transpose.map(_.reverse)
  def go(m: List[List[Int]]): List[Int] = m match {
    case Nil => Nil
    case top :: rest => top ++ go(rotate(rest))
  }
  go(matrix.map(_.toList).toList)
}`,

    OCaml: `let spiral_order matrix =
  let rec transpose = function
    | [] | [] :: _ -> []
    | m -> List.map List.hd m :: transpose (List.map List.tl m)
  in
  let rotate m = List.map List.rev (transpose m) in
  let rec go = function
    | [] -> []
    | top :: rest -> top @ go (rotate rest)
  in go matrix`,

    Clojure: `(defn spiral-order [matrix]
  (when (seq matrix)
    (concat (first matrix)
            (spiral-order
              (mapv (comp vec reverse)
                    (apply mapv vector (rest matrix)))))))`,

    Lisp: `(defun spiral-order (matrix)
  (when matrix
    (append (car matrix)
            (spiral-order (rotate-matrix (cdr matrix))))))
(defun rotate-matrix (m)
  (when (and m (car m))
    (apply #'mapcar (lambda (&rest cols) (reverse cols)) m)))`,
  },

  // ─── Problem 43: Jump Game (LC 55) ───────────────────────────────────────────
  43: {
    TypeScript: `function canJump(nums: number[]): boolean {
  return nums.reduce(
    (maxReach, n, i) => (i > maxReach ? -1 : Math.max(maxReach, i + n)),
    0
  ) >= nums.length - 1;
}`,

    Haskell: `canJump :: [Int] -> Bool
canJump nums =
  foldl (\\reach (i, n) ->
    if i > reach then -1 else max reach (i + n)
  ) 0 (zip [0..] nums) >= length nums - 1`,

    Elixir: `defmodule JumpGame do
  def can_jump(nums) do
    len = length(nums)
    nums
    |> Enum.with_index()
    |> Enum.reduce(0, fn {n, i}, reach ->
      if i > reach, do: -1, else: max(reach, i + n)
    end)
    |> Kernel.>=(len - 1)
  end
end`,

    Rust: `pub fn can_jump(nums: Vec<i32>) -> bool {
    nums.iter().enumerate().fold(0i32, |reach, (i, &n)| {
        if (i as i32) > reach { -1 } else { reach.max(i as i32 + n) }
    }) >= (nums.len() as i32 - 1)
}`,

    Scala: `def canJump(nums: Array[Int]): Boolean =
  nums.zipWithIndex.foldLeft(0) { case (reach, (n, i)) =>
    if (i > reach) -1 else reach max (i + n)
  } >= nums.length - 1`,

    OCaml: `let can_jump nums =
  let len = List.length nums in
  let reach = List.fold_left (fun reach (i, n) ->
    if i > reach then -1 else max reach (i + n)
  ) 0 (List.mapi (fun i n -> (i, n)) nums) in
  reach >= len - 1`,

    Clojure: `(defn can-jump [nums]
  (>= (reduce-kv (fn [reach i n]
                    (if (> i reach) -1 (max reach (+ i n))))
                  0 nums)
      (dec (count nums))))`,

    Lisp: `(defun can-jump (nums)
  (>= (let ((reach 0))
        (loop for n in nums for i from 0 do
          (setf reach (if (> i reach) -1 (max reach (+ i n)))))
        reach)
      (1- (length nums))))`,
  },

  // ─── Problem 44: Merge Intervals (LC 56) ─────────────────────────────────────
  44: {
    TypeScript: `function merge(intervals: number[][]): number[][] {
  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  return sorted.reduce<number[][]>((acc, cur) => {
    const last = acc[acc.length - 1];
    if (last && cur[0] <= last[1]) {
      return [...acc.slice(0, -1), [last[0], Math.max(last[1], cur[1])]];
    }
    return [...acc, cur];
  }, []);
}`,

    Haskell: `import Data.List (sortBy)
import Data.Ord (comparing)

merge :: [(Int, Int)] -> [(Int, Int)]
merge = foldl go [] . sortBy (comparing fst)
  where
    go [] iv = [iv]
    go acc (s, e)
      | s <= snd (last acc) = init acc ++ [(fst (last acc), max (snd (last acc)) e)]
      | otherwise = acc ++ [(s, e)]`,

    Elixir: `defmodule MergeIntervals do
  def merge(intervals) do
    intervals
    |> Enum.sort_by(&elem(&1, 0))
    |> Enum.reduce([], fn {s, e}, acc ->
      case acc do
        [{ps, pe} | rest] when s <= pe ->
          [{ps, max(pe, e)} | rest]
        _ -> [{s, e} | acc]
      end
    end)
    |> Enum.reverse()
  end
end`,

    Rust: `pub fn merge(intervals: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
    let mut sorted = intervals.clone();
    sorted.sort_by_key(|v| v[0]);
    sorted.into_iter().fold(vec![], |mut acc, cur| {
        if let Some(last) = acc.last_mut() {
            if cur[0] <= last[1] {
                last[1] = last[1].max(cur[1]);
                return acc;
            }
        }
        acc.push(cur);
        acc
    })
}`,

    Scala: `def merge(intervals: Array[Array[Int]]): Array[Array[Int]] =
  intervals.sortBy(_(0)).foldLeft(List.empty[Array[Int]]) { (acc, cur) =>
    acc match {
      case last :: rest if cur(0) <= last(1) =>
        Array(last(0), last(1) max cur(1)) :: rest
      case _ => cur :: acc
    }
  }.reverse.toArray`,

    OCaml: `let merge_intervals intervals =
  let sorted = List.sort (fun a b -> compare (fst a) (fst b)) intervals in
  List.fold_left (fun acc (s, e) ->
    match acc with
    | (ps, pe) :: rest when s <= pe -> (ps, max pe e) :: rest
    | _ -> (s, e) :: acc
  ) [] sorted |> List.rev`,

    Clojure: `(defn merge-intervals [intervals]
  (reduce (fn [acc [s e]]
            (if-let [[ps pe] (peek acc)]
              (if (<= s pe)
                (conj (pop acc) [ps (max pe e)])
                (conj acc [s e]))
              (conj acc [s e])))
          []
          (sort-by first intervals)))`,

    Lisp: `(defun merge-intervals (intervals)
  (reduce (lambda (acc cur)
            (let ((last (car (last acc))))
              (if (and last (<= (first cur) (second last)))
                  (append (butlast acc)
                          (list (list (first last) (max (second last) (second cur)))))
                  (append acc (list cur)))))
          (sort (copy-seq intervals) #'< :key #'first)
          :initial-value nil))`,
  },

  // ─── Problem 45: Insert Interval (LC 57) ─────────────────────────────────────
  45: {
    TypeScript: `function insert(intervals: number[][], newInterval: number[]): number[][] {
  const merged = [...intervals, newInterval].sort((a, b) => a[0] - b[0]);
  return merged.reduce<number[][]>((acc, cur) => {
    const last = acc[acc.length - 1];
    if (last && cur[0] <= last[1]) {
      return [...acc.slice(0, -1), [last[0], Math.max(last[1], cur[1])]];
    }
    return [...acc, cur];
  }, []);
}`,

    Haskell: `insert :: [(Int,Int)] -> (Int,Int) -> [(Int,Int)]
insert intervals new = foldl go [] (sortBy (comparing fst) (new : intervals))
  where
    go [] iv = [iv]
    go acc (s, e)
      | s <= snd (last acc) = init acc ++ [(fst (last acc), max (snd (last acc)) e)]
      | otherwise = acc ++ [(s, e)]`,

    Elixir: `defmodule InsertInterval do
  def insert(intervals, new_interval) do
    [new_interval | intervals]
    |> Enum.sort_by(&elem(&1, 0))
    |> Enum.reduce([], fn {s, e}, acc ->
      case acc do
        [{ps, pe} | rest] when s <= pe -> [{ps, max(pe, e)} | rest]
        _ -> [{s, e} | acc]
      end
    end)
    |> Enum.reverse()
  end
end`,

    Rust: `pub fn insert(intervals: Vec<Vec<i32>>, new_interval: Vec<i32>) -> Vec<Vec<i32>> {
    let mut all = intervals.clone();
    all.push(new_interval);
    all.sort_by_key(|v| v[0]);
    all.into_iter().fold(vec![], |mut acc, cur| {
        if let Some(last) = acc.last_mut() {
            if cur[0] <= last[1] {
                last[1] = last[1].max(cur[1]);
                return acc;
            }
        }
        acc.push(cur);
        acc
    })
}`,

    Scala: `def insert(intervals: Array[Array[Int]], newInterval: Array[Int]): Array[Array[Int]] =
  (intervals :+ newInterval).sortBy(_(0)).foldLeft(List.empty[Array[Int]]) { (acc, cur) =>
    acc match {
      case last :: rest if cur(0) <= last(1) =>
        Array(last(0), last(1) max cur(1)) :: rest
      case _ => cur :: acc
    }
  }.reverse.toArray`,

    OCaml: `let insert_interval intervals (ns, ne) =
  let all = List.sort (fun a b -> compare (fst a) (fst b)) ((ns, ne) :: intervals) in
  List.fold_left (fun acc (s, e) ->
    match acc with
    | (ps, pe) :: rest when s <= pe -> (ps, max pe e) :: rest
    | _ -> (s, e) :: acc
  ) [] all |> List.rev`,

    Clojure: `(defn insert-interval [intervals new-interval]
  (let [all (sort-by first (conj intervals new-interval))]
    (reduce (fn [acc [s e]]
              (if-let [[ps pe] (peek acc)]
                (if (<= s pe)
                  (conj (pop acc) [ps (max pe e)])
                  (conj acc [s e]))
                (conj acc [s e])))
            [] all)))`,

    Lisp: `(defun insert-interval (intervals new-interval)
  (merge-intervals (cons new-interval intervals)))`,
  },

  // ─── Problem 46: Subtree of Another Tree (LC 572) ────────────────────────────
  46: {
    TypeScript: `interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function isSubtree(root: TreeNode | null, sub: TreeNode | null): boolean {
  const serialize = (node: TreeNode | null): string =>
    node === null
      ? "#"
      : \`(\${node.val},\${serialize(node.left)},\${serialize(node.right)})\`;
  return serialize(root).includes(serialize(sub));
}`,

    Haskell: `data Tree a = Nil | Node a (Tree a) (Tree a) deriving (Eq)

isSubtree :: Eq a => Tree a -> Tree a -> Bool
isSubtree Nil sub = sub == Nil
isSubtree t@(Node _ l r) sub =
  t == sub || isSubtree l sub || isSubtree r sub`,

    Elixir: `defmodule SubtreeCheck do
  def is_subtree(nil, nil), do: true
  def is_subtree(nil, _sub), do: false
  def is_subtree(root, sub) do
    same_tree?(root, sub) or
      is_subtree(root.left, sub) or
      is_subtree(root.right, sub)
  end

  defp same_tree?(nil, nil), do: true
  defp same_tree?(nil, _), do: false
  defp same_tree?(_, nil), do: false
  defp same_tree?(a, b) do
    a.val == b.val and same_tree?(a.left, b.left) and same_tree?(a.right, b.right)
  end
end`,

    Rust: `use std::rc::Rc;
use std::cell::RefCell;
type Node = Option<Rc<RefCell<TreeNode>>>;

pub fn is_subtree(root: Node, sub: Node) -> bool {
    fn same(a: &Node, b: &Node) -> bool {
        match (a, b) {
            (None, None) => true,
            (Some(a), Some(b)) => {
                let (a, b) = (a.borrow(), b.borrow());
                a.val == b.val && same(&a.left, &b.left) && same(&a.right, &b.right)
            }
            _ => false,
        }
    }
    fn check(root: &Node, sub: &Node) -> bool {
        match root {
            None => sub.is_none(),
            Some(r) => {
                let r = r.borrow();
                same(root, sub) || check(&r.left, sub) || check(&r.right, sub)
            }
        }
    }
    check(&root, &sub)
}`,

    Scala: `case class TreeNode(v: Int, left: TreeNode = null, right: TreeNode = null)

def isSubtree(root: TreeNode, sub: TreeNode): Boolean = {
  def same(a: TreeNode, b: TreeNode): Boolean = (a, b) match {
    case (null, null) => true
    case (null, _) | (_, null) => false
    case _ => a.v == b.v && same(a.left, b.left) && same(a.right, b.right)
  }
  if (root == null) sub == null
  else same(root, sub) || isSubtree(root.left, sub) || isSubtree(root.right, sub)
}`,

    OCaml: `type tree = Leaf | Node of int * tree * tree

let rec same_tree a b = match (a, b) with
  | Leaf, Leaf -> true
  | Node (v1, l1, r1), Node (v2, l2, r2) ->
    v1 = v2 && same_tree l1 l2 && same_tree r1 r2
  | _ -> false

let rec is_subtree root sub = match root with
  | Leaf -> sub = Leaf
  | Node (_, l, r) ->
    same_tree root sub || is_subtree l sub || is_subtree r sub`,

    Clojure: `(defn same-tree? [a b]
  (cond
    (and (nil? a) (nil? b)) true
    (or (nil? a) (nil? b)) false
    :else (and (= (:val a) (:val b))
               (same-tree? (:left a) (:left b))
               (same-tree? (:right a) (:right b)))))

(defn is-subtree [root sub]
  (cond
    (nil? root) (nil? sub)
    :else (or (same-tree? root sub)
              (is-subtree (:left root) sub)
              (is-subtree (:right root) sub))))`,

    Lisp: `(defun same-tree-p (a b)
  (cond
    ((and (null a) (null b)) t)
    ((or (null a) (null b)) nil)
    (t (and (= (car a) (car b))
            (same-tree-p (cadr a) (cadr b))
            (same-tree-p (caddr a) (caddr b))))))

(defun is-subtree (root sub)
  (cond
    ((null root) (null sub))
    (t (or (same-tree-p root sub)
           (is-subtree (cadr root) sub)
           (is-subtree (caddr root) sub)))))`,
  },

  // ─── Problem 47: Rotate List (LC 61) ─────────────────────────────────────────
  47: {
    TypeScript: `function rotateRight(head: number[], k: number): number[] {
  if (head.length === 0) return [];
  const n = head.length;
  const rot = k % n;
  if (rot === 0) return head;
  return [...head.slice(n - rot), ...head.slice(0, n - rot)];
}`,

    Haskell: `rotateRight :: [a] -> Int -> [a]
rotateRight [] _ = []
rotateRight xs k =
  let n = length xs
      rot = k \`mod\` n
  in drop (n - rot) xs ++ take (n - rot) xs`,

    Elixir: `defmodule RotateList do
  def rotate_right([], _k), do: []
  def rotate_right(list, k) do
    n = length(list)
    rot = rem(k, n)
    if rot == 0, do: list,
    else: Enum.drop(list, n - rot) ++ Enum.take(list, n - rot)
  end
end`,

    Rust: `pub fn rotate_right(list: Vec<i32>, k: i32) -> Vec<i32> {
    if list.is_empty() { return vec![]; }
    let n = list.len();
    let rot = (k as usize) % n;
    if rot == 0 { return list; }
    [&list[n - rot..], &list[..n - rot]].concat()
}`,

    Scala: `def rotateRight[A](list: List[A], k: Int): List[A] = list match {
  case Nil => Nil
  case _ =>
    val n = list.length
    val rot = k % n
    if (rot == 0) list
    else list.drop(n - rot) ++ list.take(n - rot)
}`,

    OCaml: `let rotate_right lst k =
  match lst with
  | [] -> []
  | _ ->
    let n = List.length lst in
    let rot = k mod n in
    if rot = 0 then lst
    else
      let rec split i acc = function
        | [] -> (List.rev acc, [])
        | x :: xs -> if i = 0 then (List.rev acc, x :: xs)
                     else split (i-1) (x :: acc) xs
      in
      let (front, back) = split (n - rot) [] lst in
      back @ front`,

    Clojure: `(defn rotate-right [lst k]
  (if (empty? lst) []
    (let [n (count lst)
          rot (mod k n)]
      (if (zero? rot) lst
        (concat (drop (- n rot) lst) (take (- n rot) lst))))))`,

    Lisp: `(defun rotate-right (lst k)
  (if (null lst) nil
    (let* ((n (length lst))
           (rot (mod k n)))
      (if (zerop rot) lst
        (append (nthcdr (- n rot) lst)
                (butlast lst rot))))))`,
  },

  // ─── Problem 48: Unique Paths (LC 62) ────────────────────────────────────────
  48: {
    TypeScript: `function uniquePaths(m: number, n: number): number {
  // C(m+n-2, m-1) using functional reduce
  const k = Math.min(m - 1, n - 1);
  return Array.from({ length: k }, (_, i) => i).reduce(
    (acc, i) => (acc * (m + n - 2 - i)) / (i + 1),
    1
  );
}`,

    Haskell: `uniquePaths :: Int -> Int -> Int
uniquePaths m n =
  let k = min (m-1) (n-1)
  in foldl (\\acc i -> acc * (m + n - 2 - i) \`div\` (i + 1)) 1 [0..k-1]`,

    Elixir: `defmodule UniquePaths do
  def unique_paths(m, n) do
    k = min(m - 1, n - 1)
    Enum.reduce(0..(k - 1), 1, fn i, acc ->
      div(acc * (m + n - 2 - i), i + 1)
    end)
  end
end`,

    Rust: `pub fn unique_paths(m: i32, n: i32) -> i32 {
    let k = m.min(n) - 1;
    (0..k).fold(1i64, |acc, i| acc * (m as i64 + n as i64 - 2 - i as i64) / (i as i64 + 1)) as i32
}`,

    Scala: `def uniquePaths(m: Int, n: Int): Int = {
  val k = m.min(n) - 1
  (0 until k).foldLeft(1L) { (acc, i) =>
    acc * (m + n - 2 - i) / (i + 1)
  }.toInt
}`,

    OCaml: `let unique_paths m n =
  let k = min (m - 1) (n - 1) in
  let rec go i acc =
    if i >= k then acc
    else go (i + 1) (acc * (m + n - 2 - i) / (i + 1))
  in go 0 1`,

    Clojure: `(defn unique-paths [m n]
  (let [k (min (dec m) (dec n))]
    (reduce (fn [acc i]
              (/ (* acc (- (+ m n 2) i 4)) (inc i)))
            1 (range k))))`,

    Lisp: `(defun unique-paths (m n)
  (let ((k (min (1- m) (1- n))))
    (reduce (lambda (acc i)
              (/ (* acc (- (+ m n -2) i)) (1+ i)))
            (loop for i below k collect i)
            :initial-value 1)))`,
  },

  // ─── Problem 49: Add Binary (LC 67) ──────────────────────────────────────────
  49: {
    TypeScript: `function addBinary(a: string, b: string): string {
  const go = (i: number, j: number, carry: number): string => {
    if (i < 0 && j < 0 && carry === 0) return "";
    const da = i >= 0 ? Number(a[i]) : 0;
    const db = j >= 0 ? Number(b[j]) : 0;
    const sum = da + db + carry;
    return go(i - 1, j - 1, Math.floor(sum / 2)) + String(sum % 2);
  };
  return go(a.length - 1, b.length - 1, 0) || "0";
}`,

    Haskell: `addBinary :: String -> String -> String
addBinary a b = reverse $ go (reverse a) (reverse b) 0
  where
    go [] [] 0 = []
    go [] [] c = [intToDigit c]
    go xs ys c =
      let (dx, xs') = case xs of { (x:r) -> (digitToInt x, r); [] -> (0,[]) }
          (dy, ys') = case ys of { (y:r) -> (digitToInt y, r); [] -> (0,[]) }
          s = dx + dy + c
      in intToDigit (s \`mod\` 2) : go xs' ys' (s \`div\` 2)`,

    Elixir: `defmodule AddBinary do
  def add_binary(a, b) do
    go(String.graphemes(a) |> Enum.reverse(),
       String.graphemes(b) |> Enum.reverse(), 0, [])
    |> Enum.join()
  end

  defp go([], [], 0, acc), do: acc
  defp go([], [], carry, acc), do: [Integer.to_string(carry) | acc]
  defp go(xa, xb, carry, acc) do
    {da, ra} = pop(xa)
    {db, rb} = pop(xb)
    sum = da + db + carry
    go(ra, rb, div(sum, 2), [Integer.to_string(rem(sum, 2)) | acc])
  end

  defp pop([h | t]), do: {String.to_integer(h), t}
  defp pop([]), do: {0, []}
end`,

    Rust: `pub fn add_binary(a: String, b: String) -> String {
    let (a, b) = (a.as_bytes(), b.as_bytes());
    let mut result = Vec::new();
    let (mut i, mut j, mut carry) = (a.len(), b.len(), 0u8);
    while i > 0 || j > 0 || carry > 0 {
        let da = if i > 0 { i -= 1; a[i] - b'0' } else { 0 };
        let db = if j > 0 { j -= 1; b[j] - b'0' } else { 0 };
        let s = da + db + carry;
        result.push((s % 2 + b'0') as char);
        carry = s / 2;
    }
    result.iter().rev().collect()
}`,

    Scala: `def addBinary(a: String, b: String): String = {
  def go(i: Int, j: Int, carry: Int, acc: String): String = {
    if (i < 0 && j < 0 && carry == 0) acc
    else {
      val da = if (i >= 0) a(i) - '0' else 0
      val db = if (j >= 0) b(j) - '0' else 0
      val s = da + db + carry
      go(i - 1, j - 1, s / 2, (s % 2).toString + acc)
    }
  }
  go(a.length - 1, b.length - 1, 0, "")
}`,

    OCaml: `let add_binary a b =
  let rec go i j carry =
    if i < 0 && j < 0 && carry = 0 then ""
    else
      let da = if i >= 0 then Char.code a.[i] - 48 else 0 in
      let db = if j >= 0 then Char.code b.[j] - 48 else 0 in
      let s = da + db + carry in
      go (i-1) (j-1) (s / 2) ^ string_of_int (s mod 2)
  in go (String.length a - 1) (String.length b - 1) 0`,

    Clojure: `(defn add-binary [a b]
  (loop [i (dec (count a)) j (dec (count b)) carry 0 acc ""]
    (if (and (neg? i) (neg? j) (zero? carry)) acc
      (let [da (if (>= i 0) (- (int (nth a i)) 48) 0)
            db (if (>= j 0) (- (int (nth b j)) 48) 0)
            s (+ da db carry)]
        (recur (dec i) (dec j) (quot s 2)
               (str (mod s 2) acc))))))`,

    Lisp: `(defun add-binary (a b)
  (labels ((go (i j carry)
             (if (and (< i 0) (< j 0) (zerop carry)) ""
               (let* ((da (if (>= i 0) (- (char-code (char a i)) 48) 0))
                      (db (if (>= j 0) (- (char-code (char b j)) 48) 0))
                      (s (+ da db carry)))
                 (concatenate 'string
                   (go (1- i) (1- j) (floor s 2))
                   (write-to-string (mod s 2)))))))
    (go (1- (length a)) (1- (length b)) 0)))`,
  },

  // ─── Problem 50: Climbing Stairs (LC 70) ─────────────────────────────────────
  50: {
    TypeScript: `function climbStairs(n: number): number {
  return Array.from({ length: n }).reduce<[number, number]>(
    ([a, b]) => [b, a + b],
    [1, 1]
  )[0];
}`,

    Haskell: `climbStairs :: Int -> Int
climbStairs n = fst $ foldl (\\(a, b) _ -> (b, a + b)) (1, 1) [1..n]`,

    Elixir: `defmodule ClimbStairs do
  def climb_stairs(n) do
    {result, _} = Enum.reduce(1..n, {1, 1}, fn _, {a, b} -> {b, a + b} end)
    result
  end
end`,

    Rust: `pub fn climb_stairs(n: i32) -> i32 {
    (1..n).fold((1, 1), |(a, b), _| (b, a + b)).0
}`,

    Scala: `def climbStairs(n: Int): Int =
  (1 until n).foldLeft((1, 1)) { case ((a, b), _) => (b, a + b) }._1`,

    OCaml: `let climb_stairs n =
  let rec go i a b = if i >= n then a else go (i+1) b (a+b)
  in go 0 1 1`,

    Clojure: `(defn climb-stairs [n]
  (first (reduce (fn [[a b] _] [b (+ a b)]) [1 1] (range n))))`,

    Lisp: `(defun climb-stairs (n)
  (car (reduce (lambda (pair _)
                 (list (cadr pair) (+ (car pair) (cadr pair))))
               (make-list n) :initial-value '(1 1))))`,
  },

  // ─── Problem 51: Set Matrix Zeroes (LC 73) ───────────────────────────────────
  51: {
    TypeScript: `function setZeroes(matrix: number[][]): number[][] {
  const zeroRows = new Set(
    matrix.flatMap((row, i) => (row.includes(0) ? [i] : []))
  );
  const zeroCols = new Set(
    matrix[0].flatMap((_, j) => (matrix.some(r => r[j] === 0) ? [j] : []))
  );
  return matrix.map((row, i) =>
    row.map((val, j) => (zeroRows.has(i) || zeroCols.has(j) ? 0 : val))
  );
}`,

    Haskell: `setZeroes :: [[Int]] -> [[Int]]
setZeroes matrix =
  let rows = length matrix
      cols = length (head matrix)
      zeroR = [i | (i, row) <- zip [0..] matrix, 0 \`elem\` row]
      zeroC = [j | j <- [0..cols-1], any (\\row -> row !! j == 0) matrix]
      zSet = foldr (\\x s -> x : s) [] zeroR
      cSet = foldr (\\x s -> x : s) [] zeroC
  in [[ if i \`elem\` zSet || j \`elem\` cSet then 0 else v
       | (j, v) <- zip [0..] row]
      | (i, row) <- zip [0..] matrix]`,

    Elixir: `defmodule SetMatrixZeroes do
  def set_zeroes(matrix) do
    rows = for {row, i} <- Enum.with_index(matrix), 0 in row, do: i
    cols = for j <- 0..(length(hd(matrix)) - 1),
               Enum.any?(matrix, &(Enum.at(&1, j) == 0)), do: j
    row_set = MapSet.new(rows)
    col_set = MapSet.new(cols)
    Enum.with_index(matrix)
    |> Enum.map(fn {row, i} ->
      Enum.with_index(row)
      |> Enum.map(fn {v, j} ->
        if i in row_set or j in col_set, do: 0, else: v
      end)
    end)
  end
end`,

    Rust: `pub fn set_zeroes(matrix: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
    let zero_rows: std::collections::HashSet<usize> = matrix.iter().enumerate()
        .filter(|(_, r)| r.contains(&0)).map(|(i, _)| i).collect();
    let cols = matrix[0].len();
    let zero_cols: std::collections::HashSet<usize> = (0..cols)
        .filter(|&j| matrix.iter().any(|r| r[j] == 0)).collect();
    matrix.iter().enumerate().map(|(i, row)|
        row.iter().enumerate().map(|(j, &v)|
            if zero_rows.contains(&i) || zero_cols.contains(&j) { 0 } else { v }
        ).collect()
    ).collect()
}`,

    Scala: `def setZeroes(matrix: Array[Array[Int]]): Array[Array[Int]] = {
  val zeroRows = matrix.indices.filter(i => matrix(i).contains(0)).toSet
  val zeroCols = matrix(0).indices.filter(j => matrix.exists(_(j) == 0)).toSet
  matrix.zipWithIndex.map { case (row, i) =>
    row.zipWithIndex.map { case (v, j) =>
      if (zeroRows(i) || zeroCols(j)) 0 else v
    }
  }
}`,

    OCaml: `let set_zeroes matrix =
  let has_zero row = List.exists ((=) 0) row in
  let zero_rows = List.mapi (fun i row -> if has_zero row then Some i else None) matrix
    |> List.filter_map Fun.id in
  let n = List.length (List.hd matrix) in
  let zero_cols = List.init n (fun j ->
    if List.exists (fun row -> List.nth row j = 0) matrix then Some j else None)
    |> List.filter_map Fun.id in
  List.mapi (fun i row ->
    List.mapi (fun j v ->
      if List.mem i zero_rows || List.mem j zero_cols then 0 else v
    ) row
  ) matrix`,

    Clojure: `(defn set-zeroes [matrix]
  (let [zero-rows (set (keep-indexed #(when (some zero? %2) %1) matrix))
        cols (count (first matrix))
        zero-cols (set (filter #(some (fn [r] (zero? (nth r %))) matrix) (range cols)))]
    (map-indexed (fn [i row]
      (map-indexed (fn [j v]
        (if (or (zero-rows i) (zero-cols j)) 0 v)) row)) matrix)))`,

    Lisp: `(defun set-zeroes (matrix)
  (let* ((zero-rows (loop for row in matrix for i from 0
                          when (member 0 row) collect i))
         (cols (length (first matrix)))
         (zero-cols (loop for j below cols
                          when (some (lambda (r) (zerop (nth j r))) matrix)
                          collect j)))
    (loop for row in matrix for i from 0 collect
      (loop for v in row for j from 0 collect
        (if (or (member i zero-rows) (member j zero-cols)) 0 v)))))`,
  },

  // ─── Problem 52: Search a 2D Matrix (LC 74) ──────────────────────────────────
  52: {
    TypeScript: `function searchMatrix(matrix: number[][], target: number): boolean {
  const flat = matrix.flat();
  const go = (lo: number, hi: number): boolean => {
    if (lo > hi) return false;
    const mid = Math.floor((lo + hi) / 2);
    if (flat[mid] === target) return true;
    return flat[mid] < target ? go(mid + 1, hi) : go(lo, mid - 1);
  };
  return go(0, flat.length - 1);
}`,

    Haskell: `searchMatrix :: [[Int]] -> Int -> Bool
searchMatrix matrix target =
  let flat = concat matrix
      go lo hi
        | lo > hi = False
        | flat !! mid == target = True
        | flat !! mid < target = go (mid + 1) hi
        | otherwise = go lo (mid - 1)
        where mid = (lo + hi) \`div\` 2
  in go 0 (length flat - 1)`,

    Elixir: `defmodule Search2DMatrix do
  def search_matrix(matrix, target) do
    flat = List.flatten(matrix)
    bin_search(flat, target, 0, length(flat) - 1)
  end

  defp bin_search(_flat, _target, lo, hi) when lo > hi, do: false
  defp bin_search(flat, target, lo, hi) do
    mid = div(lo + hi, 2)
    v = Enum.at(flat, mid)
    cond do
      v == target -> true
      v < target -> bin_search(flat, target, mid + 1, hi)
      true -> bin_search(flat, target, lo, mid - 1)
    end
  end
end`,

    Rust: `pub fn search_matrix(matrix: Vec<Vec<i32>>, target: i32) -> bool {
    let flat: Vec<i32> = matrix.into_iter().flatten().collect();
    fn go(arr: &[i32], target: i32, lo: usize, hi: usize) -> bool {
        if lo > hi { return false; }
        let mid = lo + (hi - lo) / 2;
        if arr[mid] == target { true }
        else if arr[mid] < target { go(arr, target, mid + 1, hi) }
        else if mid == 0 { false }
        else { go(arr, target, lo, mid - 1) }
    }
    if flat.is_empty() { false }
    else { go(&flat, target, 0, flat.len() - 1) }
}`,

    Scala: `def searchMatrix(matrix: Array[Array[Int]], target: Int): Boolean = {
  val flat = matrix.flatten
  def go(lo: Int, hi: Int): Boolean = {
    if (lo > hi) false
    else {
      val mid = (lo + hi) / 2
      if (flat(mid) == target) true
      else if (flat(mid) < target) go(mid + 1, hi)
      else go(lo, mid - 1)
    }
  }
  go(0, flat.length - 1)
}`,

    OCaml: `let search_matrix matrix target =
  let flat = List.concat matrix |> Array.of_list in
  let rec go lo hi =
    if lo > hi then false
    else
      let mid = (lo + hi) / 2 in
      if flat.(mid) = target then true
      else if flat.(mid) < target then go (mid + 1) hi
      else go lo (mid - 1)
  in go 0 (Array.length flat - 1)`,

    Clojure: `(defn search-matrix [matrix target]
  (let [flat (vec (apply concat matrix))]
    (loop [lo 0 hi (dec (count flat))]
      (when (<= lo hi)
        (let [mid (quot (+ lo hi) 2)
              v (flat mid)]
          (cond
            (= v target) true
            (< v target) (recur (inc mid) hi)
            :else (recur lo (dec mid))))))))`,

    Lisp: `(defun search-matrix (matrix target)
  (let ((flat (apply #'append matrix)))
    (labels ((go (lo hi)
               (when (<= lo hi)
                 (let* ((mid (floor (+ lo hi) 2))
                        (v (nth mid flat)))
                   (cond ((= v target) t)
                         ((< v target) (go (1+ mid) hi))
                         (t (go lo (1- mid))))))))
      (go 0 (1- (length flat))))))`,
  },

  // ─── Problem 53: Sort Colors (LC 75) ─────────────────────────────────────────
  53: {
    TypeScript: `function sortColors(nums: number[]): number[] {
  const counts = nums.reduce(
    (acc, n) => acc.map((c, i) => (i === n ? c + 1 : c)),
    [0, 0, 0]
  );
  return counts.flatMap((count, color) => Array(count).fill(color));
}`,

    Haskell: `sortColors :: [Int] -> [Int]
sortColors nums =
  let counts = foldl (\\[r,w,b] n -> case n of
        0 -> [r+1,w,b]; 1 -> [r,w+1,b]; _ -> [r,w,b+1]) [0,0,0] nums
  in concatMap (\\(c, n) -> replicate n c) (zip [0,1,2] counts)`,

    Elixir: `defmodule SortColors do
  def sort_colors(nums) do
    counts = Enum.frequencies(nums)
    List.duplicate(0, Map.get(counts, 0, 0)) ++
    List.duplicate(1, Map.get(counts, 1, 0)) ++
    List.duplicate(2, Map.get(counts, 2, 0))
  end
end`,

    Rust: `pub fn sort_colors(nums: Vec<i32>) -> Vec<i32> {
    let counts = nums.iter().fold([0usize; 3], |mut c, &n| {
        c[n as usize] += 1; c
    });
    (0..3).flat_map(|i| vec![i as i32; counts[i]]).collect()
}`,

    Scala: `def sortColors(nums: Array[Int]): Array[Int] = {
  val counts = nums.foldLeft(Array(0,0,0)) { (c, n) => c.updated(n, c(n)+1) }
  (0 to 2).flatMap(i => Array.fill(counts(i))(i)).toArray
}`,

    OCaml: `let sort_colors nums =
  let counts = List.fold_left (fun (r,w,b) n ->
    match n with 0 -> (r+1,w,b) | 1 -> (r,w+1,b) | _ -> (r,w,b+1)
  ) (0,0,0) nums in
  let (r,w,b) = counts in
  List.init r (fun _ -> 0) @ List.init w (fun _ -> 1) @ List.init b (fun _ -> 2)`,

    Clojure: `(defn sort-colors [nums]
  (let [freqs (frequencies nums)]
    (concat (repeat (get freqs 0 0) 0)
            (repeat (get freqs 1 0) 1)
            (repeat (get freqs 2 0) 2))))`,

    Lisp: `(defun sort-colors (nums)
  (let ((counts (reduce (lambda (c n)
                          (let ((new-c (copy-seq c)))
                            (incf (elt new-c n)) new-c))
                        nums :initial-value (vector 0 0 0))))
    (append (make-list (elt counts 0) :initial-element 0)
            (make-list (elt counts 1) :initial-element 1)
            (make-list (elt counts 2) :initial-element 2))))`,
  },

  // ─── Problem 54: Minimum Window Substring (LC 76) ────────────────────────────
  54: {
    TypeScript: `function minWindow(s: string, t: string): string {
  const need = [...t].reduce<Record<string, number>>(
    (m, c) => ({ ...m, [c]: (m[c] || 0) + 1 }), {}
  );
  const keys = Object.keys(need).length;

  const go = (
    l: number, r: number, have: number,
    win: Record<string, number>, best: [number, number]
  ): [number, number] => {
    if (r >= s.length) return best;
    const c = s[r];
    const newWin = { ...win, [c]: (win[c] || 0) + 1 };
    const newHave = have + (newWin[c] === need[c] ? 1 : 0);
    const shrink = (
      l2: number, h2: number, w2: Record<string, number>,
      b2: [number, number]
    ): { l: number; h: number; w: Record<string, number>; b: [number, number] } => {
      if (h2 < keys) return { l: l2, h: h2, w: w2, b: b2 };
      const nb = r - l2 + 1 < b2[1] - b2[0] ? [l2, r + 1] as [number, number] : b2;
      const lc = s[l2];
      const nw = { ...w2, [lc]: w2[lc] - 1 };
      const nh = h2 - (nw[lc] < (need[lc] || 0) ? 1 : 0);
      return shrink(l2 + 1, nh, nw, nb);
    };
    const { l: nl, h: nh, w: nw, b: nb } = shrink(l, newHave, newWin, best);
    return go(nl, r + 1, nh, nw, nb);
  };
  const [start, end] = go(0, 0, 0, {}, [0, Infinity]);
  return end === Infinity ? "" : s.slice(start, end);
}`,

    Haskell: `import qualified Data.Map.Strict as Map

minWindow :: String -> String -> String
minWindow s t =
  let need = foldl (\\m c -> Map.insertWith (+) c 1 m) Map.empty t
      keys = Map.size need
      go l r have win best
        | r >= length s = best
        | otherwise =
            let c = s !! r
                win' = Map.insertWith (+) c 1 win
                have' = have + if Map.lookup c win' == Map.lookup c need then 1 else 0
                shrink l' h w b
                  | h < keys = (l', h, w, b)
                  | otherwise =
                      let b' = if r - l' + 1 < snd b - fst b then (l', r+1) else b
                          lc = s !! l'
                          w' = Map.adjust (subtract 1) lc w
                          h' = h - if Map.findWithDefault 0 lc w' < Map.findWithDefault 0 lc need then 1 else 0
                      in shrink (l'+1) h' w' b'
                (nl, nh, nw, nb) = shrink l have' win' best
            in go nl (r+1) nh nw nb
      (start, end') = go 0 0 0 Map.empty (0, length s + 1)
  in if end' > length s then "" else take (end' - start) (drop start s)`,

    Elixir: `defmodule MinWindow do
  def min_window(s, t) do
    need = t |> String.graphemes() |> Enum.frequencies()
    keys = map_size(need)
    chars = String.graphemes(s)
    {start, len} = slide(chars, 0, 0, 0, %{}, need, keys, {0, :infinity})
    if len == :infinity, do: "", else: chars |> Enum.slice(start, len) |> Enum.join()
  end

  defp slide(chars, l, r, have, win, need, keys, best) do
    if r >= length(chars), do: best,
    else: (
      c = Enum.at(chars, r)
      win = Map.update(win, c, 1, &(&1 + 1))
      have = if Map.get(win, c) == Map.get(need, c), do: have + 1, else: have
      {l, have, win, best} = shrink(chars, l, r, have, win, need, keys, best)
      slide(chars, l, r + 1, have, win, need, keys, best)
    )
  end

  defp shrink(chars, l, r, have, win, need, keys, best) do
    if have < keys, do: {l, have, win, best},
    else: (
      best = if r - l + 1 < elem(best, 1), do: {l, r - l + 1}, else: best
      lc = Enum.at(chars, l)
      win = Map.update!(win, lc, &(&1 - 1))
      have = if Map.get(win, lc, 0) < Map.get(need, lc, 0), do: have - 1, else: have
      shrink(chars, l + 1, r, have, win, need, keys, best)
    )
  end
end`,

    Rust: `use std::collections::HashMap;

pub fn min_window(s: String, t: String) -> String {
    let s: Vec<char> = s.chars().collect();
    let need: HashMap<char,i32> = t.chars().fold(HashMap::new(), |mut m, c| {
        *m.entry(c).or_insert(0) += 1; m
    });
    let keys = need.len();
    let (mut l, mut have) = (0, 0);
    let mut win: HashMap<char,i32> = HashMap::new();
    let (mut start, mut min_len) = (0, usize::MAX);
    for r in 0..s.len() {
        *win.entry(s[r]).or_insert(0) += 1;
        if win.get(&s[r]) == need.get(&s[r]) { have += 1; }
        while have == keys {
            if r - l + 1 < min_len { start = l; min_len = r - l + 1; }
            *win.get_mut(&s[l]).unwrap() -= 1;
            if win[&s[l]] < *need.get(&s[l]).unwrap_or(&0) { have -= 1; }
            l += 1;
        }
    }
    if min_len == usize::MAX { String::new() }
    else { s[start..start+min_len].iter().collect() }
}`,

    Scala: `def minWindow(s: String, t: String): String = {
  val need = t.groupBy(identity).view.mapValues(_.length).toMap
  val keys = need.size
  case class State(l: Int, have: Int, win: Map[Char,Int], best: (Int,Int))
  val init = State(0, 0, Map.empty, (0, Int.MaxValue))
  val res = s.indices.foldLeft(init) { case (State(l, have, win, best), r) =>
    val c = s(r)
    val w = win + (c -> (win.getOrElse(c, 0) + 1))
    val h = if (w(c) == need.getOrElse(c, 0)) have + 1 else have
    def shrink(l: Int, h: Int, w: Map[Char,Int], b: (Int,Int)): State = {
      if (h < keys) State(l, h, w, b)
      else {
        val nb = if (r - l + 1 < b._2 - b._1) (l, r + 1) else b
        val lc = s(l)
        val nw = w + (lc -> (w(lc) - 1))
        val nh = if (nw(lc) < need.getOrElse(lc, 0)) h - 1 else h
        shrink(l + 1, nh, nw, nb)
      }
    }
    shrink(l, h, w, best)
  }
  if (res.best._2 == Int.MaxValue) "" else s.substring(res.best._1, res.best._2)
}`,

    OCaml: `let min_window s t =
  let need = Hashtbl.create 16 in
  String.iter (fun c ->
    Hashtbl.replace need c (1 + try Hashtbl.find need c with Not_found -> 0)) t;
  let keys = Hashtbl.length need in
  let slen = String.length s in
  let win = Hashtbl.create 16 in
  let l = ref 0 and have = ref 0 and start = ref 0 and mlen = ref (slen + 1) in
  for r = 0 to slen - 1 do
    let c = s.[r] in
    Hashtbl.replace win c (1 + try Hashtbl.find win c with Not_found -> 0);
    if Hashtbl.find win c = (try Hashtbl.find need c with Not_found -> 0)
    then incr have;
    while !have = keys do
      (if r - !l + 1 < !mlen then (start := !l; mlen := r - !l + 1));
      let lc = s.[!l] in
      Hashtbl.replace win lc (Hashtbl.find win lc - 1);
      if Hashtbl.find win lc < (try Hashtbl.find need lc with Not_found -> 0)
      then decr have;
      incr l
    done
  done;
  if !mlen > slen then "" else String.sub s !start !mlen`,

    Clojure: `(defn min-window [s t]
  (let [need (frequencies t)
        keys (count need)
        n (count s)]
    (loop [l 0 r 0 have 0 win {} best [0 ##Inf]]
      (if (>= r n)
        (if (= (second best) ##Inf) ""
          (subs s (first best) (+ (first best) (second best))))
        (let [c (nth s r)
              win (update win c (fnil inc 0))
              have (if (= (win c) (get need c 0)) (inc have) have)]
          (let [[l have win best]
                (loop [l l have have win win best best]
                  (if (< have keys) [l have win best]
                    (let [best (if (< (- r l -1) (second best))
                                [l (- r l -1)] best)
                          lc (nth s l)
                          win (update win lc dec)
                          have (if (< (get win lc 0) (get need lc 0))
                                (dec have) have)]
                      (recur (inc l) have win best))))]
            (recur l (inc r) have win best)))))))`,

    Lisp: `(defun min-window (s-str t-str)
  (let ((need (make-hash-table))
        (win (make-hash-table))
        (keys 0) (have 0) (l 0) (start 0) (mlen (1+ (length s-str))))
    (loop for c across t-str do
      (let ((v (gethash c need 0)))
        (when (zerop v) (incf keys))
        (setf (gethash c need) (1+ v))))
    (loop for r below (length s-str) do
      (let ((c (char s-str r)))
        (setf (gethash c win 0) (1+ (gethash c win 0)))
        (when (= (gethash c win) (gethash c need 0)) (incf have))
        (loop while (= have keys) do
          (when (< (- r l -1) mlen) (setf start l mlen (- r l -1)))
          (let ((lc (char s-str l)))
            (decf (gethash lc win))
            (when (< (gethash lc win) (gethash lc need 0)) (decf have)))
          (incf l))))
    (if (> mlen (length s-str)) "" (subseq s-str start (+ start mlen)))))`,
  },

  // ─── Problem 55: Design In-Memory File System (LC 588) ───────────────────────
  55: {
    TypeScript: `type FSNode = { children: Map<string, FSNode>; content: string };

const mkNode = (): FSNode => ({ children: new Map(), content: "" });

const navigate = (root: FSNode, parts: string[]): FSNode =>
  parts.reduce((node, p) => {
    if (!node.children.has(p)) node.children.set(p, mkNode());
    return node.children.get(p)!;
  }, root);

const parsePath = (path: string): string[] =>
  path.split("/").filter(Boolean);

class FileSystem {
  private root = mkNode();

  ls(path: string): string[] {
    const node = navigate(this.root, parsePath(path));
    if (node.content) return [parsePath(path).pop()!];
    return [...node.children.keys()].sort();
  }
  mkdir(path: string): void { navigate(this.root, parsePath(path)); }
  addContentToFile(path: string, content: string): void {
    const node = navigate(this.root, parsePath(path));
    node.content += content;
  }
  readContentFromFile(path: string): string {
    return navigate(this.root, parsePath(path)).content;
  }
}`,

    Haskell: `import qualified Data.Map.Strict as Map

data FSNode = FSNode
  { children :: Map.Map String FSNode
  , content  :: String
  }

emptyNode :: FSNode
emptyNode = FSNode Map.empty ""

navigate :: FSNode -> [String] -> FSNode
navigate = foldl (\\node p ->
  Map.findWithDefault emptyNode p (children node))

insertAt :: [String] -> (FSNode -> FSNode) -> FSNode -> FSNode
insertAt [] f node = f node
insertAt (p:ps) f node =
  let child = Map.findWithDefault emptyNode p (children node)
      updated = insertAt ps f child
  in node { children = Map.insert p updated (children node) }

ls :: FSNode -> String -> [String]
ls root path =
  let parts = filter (not . null) (splitOn '/' path)
      node = navigate root parts
  in if not (null (content node))
     then [last parts]
     else Map.keys (children node)

mkdir :: FSNode -> String -> FSNode
mkdir root path = insertAt (filter (not . null) (splitOn '/' path)) id root

addContent :: FSNode -> String -> String -> FSNode
addContent root path c =
  insertAt (filter (not . null) (splitOn '/' path))
           (\\n -> n { content = content n ++ c }) root`,

    Elixir: `defmodule FileSystem do
  defstruct children: %{}, content: ""

  def new, do: %FileSystem{}

  def ls(root, path) do
    parts = parse_path(path)
    node = navigate(root, parts)
    if node.content != "",
      do: [List.last(parts)],
      else: node.children |> Map.keys() |> Enum.sort()
  end

  def mkdir(root, path), do: ensure_path(root, parse_path(path))

  def add_content(root, path, content) do
    parts = parse_path(path)
    update_at(root, parts, fn node ->
      %{node | content: node.content <> content}
    end)
  end

  def read_content(root, path), do: navigate(root, parse_path(path)).content

  defp parse_path(path), do: path |> String.split("/") |> Enum.reject(&(&1 == ""))
  defp navigate(node, []), do: node
  defp navigate(node, [h | t]), do: navigate(Map.get(node.children, h, %FileSystem{}), t)
  defp ensure_path(node, []), do: node
  defp ensure_path(node, [h | t]) do
    child = Map.get(node.children, h, %FileSystem{})
    %{node | children: Map.put(node.children, h, ensure_path(child, t))}
  end
  defp update_at(node, [h], f) do
    child = Map.get(node.children, h, %FileSystem{})
    %{node | children: Map.put(node.children, h, f.(child))}
  end
  defp update_at(node, [h | t], f) do
    child = Map.get(node.children, h, %FileSystem{})
    %{node | children: Map.put(node.children, h, update_at(child, t, f))}
  end
end`,

    Rust: `use std::collections::BTreeMap;

#[derive(Default)]
struct FSNode {
    children: BTreeMap<String, FSNode>,
    content: String,
}

impl FSNode {
    fn navigate(&mut self, parts: &[&str]) -> &mut FSNode {
        parts.iter().fold(self, |node, &p| {
            node.children.entry(p.to_string()).or_default()
        })
    }
}

struct FileSystem { root: FSNode }

impl FileSystem {
    fn new() -> Self { FileSystem { root: FSNode::default() } }
    fn ls(&mut self, path: &str) -> Vec<String> {
        let parts: Vec<&str> = path.split('/').filter(|s| !s.is_empty()).collect();
        let node = self.root.navigate(&parts);
        if !node.content.is_empty() {
            vec![parts.last().unwrap().to_string()]
        } else {
            node.children.keys().cloned().collect()
        }
    }
    fn mkdir(&mut self, path: &str) {
        let parts: Vec<&str> = path.split('/').filter(|s| !s.is_empty()).collect();
        self.root.navigate(&parts);
    }
    fn add_content(&mut self, path: &str, content: &str) {
        let parts: Vec<&str> = path.split('/').filter(|s| !s.is_empty()).collect();
        self.root.navigate(&parts).content.push_str(content);
    }
    fn read_content(&mut self, path: &str) -> &str {
        let parts: Vec<&str> = path.split('/').filter(|s| !s.is_empty()).collect();
        &self.root.navigate(&parts).content
    }
}`,

    Scala: `case class FSNode(
  children: Map[String, FSNode] = Map.empty,
  content: String = ""
)

class FileSystem {
  private var root = FSNode()

  def ls(path: String): List[String] = {
    val parts = path.split("/").filter(_.nonEmpty)
    val node = parts.foldLeft(root)((n, p) => n.children.getOrElse(p, FSNode()))
    if (node.content.nonEmpty) List(parts.last)
    else node.children.keys.toList.sorted
  }

  def mkdir(path: String): Unit = { root = ensurePath(root, parsePath(path)) }

  def addContentToFile(path: String, content: String): Unit = {
    root = updateAt(root, parsePath(path), n => n.copy(content = n.content + content))
  }

  def readContentFromFile(path: String): String =
    parsePath(path).foldLeft(root)((n, p) => n.children(p)).content

  private def parsePath(p: String) = p.split("/").filter(_.nonEmpty).toList
  private def ensurePath(node: FSNode, parts: List[String]): FSNode = parts match {
    case Nil => node
    case h :: t =>
      val child = node.children.getOrElse(h, FSNode())
      node.copy(children = node.children + (h -> ensurePath(child, t)))
  }
  private def updateAt(node: FSNode, parts: List[String], f: FSNode => FSNode): FSNode =
    parts match {
      case h :: Nil =>
        val child = node.children.getOrElse(h, FSNode())
        node.copy(children = node.children + (h -> f(child)))
      case h :: t =>
        val child = node.children.getOrElse(h, FSNode())
        node.copy(children = node.children + (h -> updateAt(child, t, f)))
      case Nil => f(node)
    }
}`,

    OCaml: `module SMap = Map.Make(String)

type fs_node = { children: fs_node SMap.t; content: string }

let empty_node = { children = SMap.empty; content = "" }

let navigate root parts =
  List.fold_left (fun node p ->
    try SMap.find p node.children
    with Not_found -> empty_node
  ) root parts

let rec ensure_path node = function
  | [] -> node
  | p :: ps ->
    let child = try SMap.find p node.children with Not_found -> empty_node in
    { node with children = SMap.add p (ensure_path child ps) node.children }

let rec update_at node parts f = match parts with
  | [p] ->
    let child = try SMap.find p node.children with Not_found -> empty_node in
    { node with children = SMap.add p (f child) node.children }
  | p :: ps ->
    let child = try SMap.find p node.children with Not_found -> empty_node in
    { node with children = SMap.add p (update_at child ps f) node.children }
  | [] -> f node

let parse_path path =
  String.split_on_char '/' path |> List.filter (fun s -> s <> "")

let ls root path =
  let parts = parse_path path in
  let node = navigate root parts in
  if node.content <> "" then [List.nth parts (List.length parts - 1)]
  else SMap.bindings node.children |> List.map fst`,

    Clojure: `(defn mk-node [] {:children {} :content ""})

(defn parse-path [path]
  (filterv (complement empty?) (clojure.string/split path #"/")))

(defn navigate [root parts]
  (reduce (fn [node p]
            (get-in node [:children p] (mk-node)))
          root parts))

(defn ensure-path [root parts]
  (if (empty? parts) root
    (let [[p & ps] parts
          child (get-in root [:children p] (mk-node))]
      (assoc-in root [:children p] (ensure-path child ps)))))

(defn fs-ls [root path]
  (let [parts (parse-path path)
        node (navigate root parts)]
    (if (seq (:content node))
      [(peek parts)]
      (sort (keys (:children node))))))

(defn fs-mkdir [root path]
  (ensure-path root (parse-path path)))

(defn fs-add-content [root path content]
  (let [parts (parse-path path)]
    (update-in (ensure-path root parts)
               (into [] (interleave (repeat :children) parts))
               (fn [node] (update node :content str content)))))`,

    Lisp: `(defstruct fs-node (children (make-hash-table :test 'equal)) (content ""))

(defun parse-path (path)
  (remove-if (lambda (s) (string= s ""))
             (uiop:split-string path :separator "/")))

(defun fs-navigate (root parts)
  (reduce (lambda (node p)
            (or (gethash p (fs-node-children node))
                (let ((new (make-fs-node)))
                  (setf (gethash p (fs-node-children node)) new)
                  new)))
          parts :initial-value root))

(defun fs-ls (root path)
  (let* ((parts (parse-path path))
         (node (fs-navigate root parts)))
    (if (string/= (fs-node-content node) "")
        (list (car (last parts)))
        (sort (loop for k being the hash-keys of (fs-node-children node)
                    collect k) #'string<))))

(defun fs-mkdir (root path) (fs-navigate root (parse-path path)))

(defun fs-add-content (root path content)
  (let ((node (fs-navigate root (parse-path path))))
    (setf (fs-node-content node)
          (concatenate 'string (fs-node-content node) content))))`,
  },

  // ─── Problem 56: Subsets (LC 78) ─────────────────────────────────────────────
  56: {
    TypeScript: `function subsets(nums: number[]): number[][] {
  return nums.reduce<number[][]>(
    (acc, num) => [...acc, ...acc.map(sub => [...sub, num])],
    [[]]
  );
}`,

    Haskell: `subsets :: [a] -> [[a]]
subsets [] = [[]]
subsets (x:xs) =
  let rest = subsets xs
  in rest ++ map (x:) rest`,

    Elixir: `defmodule Subsets do
  def subsets([]), do: [[]]
  def subsets([h | t]) do
    rest = subsets(t)
    rest ++ Enum.map(rest, &[h | &1])
  end
end`,

    Rust: `fn subsets(nums: &[i32]) -> Vec<Vec<i32>> {
    nums.iter().fold(vec![vec![]], |acc, &num| {
        let mut next = acc.clone();
        for sub in &acc {
            let mut s = sub.clone();
            s.push(num);
            next.push(s);
        }
        next
    })
}`,

    Scala: `def subsets(nums: List[Int]): List[List[Int]] =
  nums.foldLeft(List(List.empty[Int])) { (acc, n) =>
    acc ++ acc.map(n :: _)
  }`,

    OCaml: `let subsets nums =
  List.fold_left (fun acc n ->
    acc @ List.map (fun sub -> n :: sub) acc
  ) [[]] nums`,

    Clojure: `(defn subsets [nums]
  (reduce (fn [acc n]
            (into acc (map #(conj % n) acc)))
          [[]] nums))`,

    Lisp: `(defun subsets (nums)
  (reduce (lambda (acc n)
            (append acc (mapcar (lambda (s) (append s (list n))) acc)))
          nums :initial-value '(())))`,
  },

  // ─── Problem 57: Word Search (LC 79) ─────────────────────────────────────────
  57: {
    TypeScript: `function exist(board: string[][], word: string): boolean {
  const rows = board.length, cols = board[0].length;
  const dfs = (r: number, c: number, i: number, visited: Set<string>): boolean => {
    if (i === word.length) return true;
    if (r < 0 || r >= rows || c < 0 || c >= cols) return false;
    const key = \\\`\\\${r},\\\${c}\\\`;
    if (visited.has(key) || board[r][c] !== word[i]) return false;
    const next = new Set([...visited, key]);
    return [[r+1,c],[r-1,c],[r,c+1],[r,c-1]].some(
      ([nr,nc]) => dfs(nr, nc, i+1, next)
    );
  };
  return board.some((row, r) =>
    row.some((_, c) => dfs(r, c, 0, new Set()))
  );
}`,

    Haskell: `import Data.Set (Set, empty, member, insert)

exist :: [[Char]] -> String -> Bool
exist board word = any (\\(r,c) -> dfs r c 0 empty) coords
  where
    rows = length board
    cols = length (head board)
    coords = [(r,c) | r <- [0..rows-1], c <- [0..cols-1]]
    at r c = (board !! r) !! c
    dfs r c i vis
      | i == length word = True
      | r < 0 || r >= rows || c < 0 || c >= cols = False
      | (r,c) \\\`member\\\` vis || at r c /= word !! i = False
      | otherwise =
          let vis' = insert (r,c) vis
          in any (\\(dr,dc) -> dfs (r+dr) (c+dc) (i+1) vis')
                 [(1,0),(-1,0),(0,1),(0,-1)]`,

    Elixir: `defmodule WordSearch do
  def exist(board, word) do
    chars = String.graphemes(word)
    rows = length(board); cols = length(hd(board))
    coords = for r <- 0..(rows-1), c <- 0..(cols-1), do: {r, c}
    Enum.any?(coords, fn {r, c} -> dfs(board, chars, r, c, 0, MapSet.new(), rows, cols) end)
  end

  defp dfs(_, chars, _, _, i, _, _, _) when i == length(chars), do: true
  defp dfs(board, chars, r, c, i, vis, rows, cols) do
    cond do
      r < 0 or r >= rows or c < 0 or c >= cols -> false
      MapSet.member?(vis, {r, c}) -> false
      Enum.at(Enum.at(board, r), c) != Enum.at(chars, i) -> false
      true ->
        vis = MapSet.put(vis, {r, c})
        Enum.any?([{1,0},{-1,0},{0,1},{0,-1}], fn {dr,dc} ->
          dfs(board, chars, r+dr, c+dc, i+1, vis, rows, cols)
        end)
    end
  end
end`,

    Rust: `use std::collections::HashSet;

fn exist(board: &[Vec<char>], word: &str) -> bool {
    let chars: Vec<char> = word.chars().collect();
    let (rows, cols) = (board.len(), board[0].len());
    fn dfs(board: &[Vec<char>], chars: &[char], r: isize, c: isize,
           i: usize, vis: &mut HashSet<(isize,isize)>, rows: isize, cols: isize) -> bool {
        if i == chars.len() { return true; }
        if r < 0 || r >= rows || c < 0 || c >= cols { return false; }
        let (ru, cu) = (r as usize, c as usize);
        if vis.contains(&(r,c)) || board[ru][cu] != chars[i] { return false; }
        vis.insert((r,c));
        let found = [(1,0),(-1,0),(0,1),(0,-1)].iter().any(|&(dr,dc)|
            dfs(board, chars, r+dr, c+dc, i+1, vis, rows, cols));
        vis.remove(&(r,c));
        found
    }
    (0..rows).any(|r| (0..cols).any(|c|
        dfs(board, &chars, r as isize, c as isize, 0,
            &mut HashSet::new(), rows as isize, cols as isize)))
}`,

    Scala: `def exist(board: Array[Array[Char]], word: String): Boolean = {
  val (rows, cols) = (board.length, board(0).length)
  def dfs(r: Int, c: Int, i: Int, vis: Set[(Int,Int)]): Boolean =
    if (i == word.length) true
    else if (r < 0 || r >= rows || c < 0 || c >= cols) false
    else if (vis((r,c)) || board(r)(c) != word(i)) false
    else {
      val v = vis + ((r,c))
      List((1,0),(-1,0),(0,1),(0,-1)).exists { case (dr,dc) =>
        dfs(r+dr, c+dc, i+1, v)
      }
    }
  (for (r <- 0 until rows; c <- 0 until cols) yield (r,c))
    .exists { case (r,c) => dfs(r, c, 0, Set.empty) }
}`,

    OCaml: `module PSet = Set.Make(struct
  type t = int * int
  let compare = compare
end)

let exist board word =
  let rows = Array.length board and cols = Array.length board.(0) in
  let wlen = String.length word in
  let rec dfs r c i vis =
    if i = wlen then true
    else if r < 0 || r >= rows || c < 0 || c >= cols then false
    else if PSet.mem (r,c) vis || board.(r).(c) <> word.[i] then false
    else
      let vis' = PSet.add (r,c) vis in
      List.exists (fun (dr,dc) -> dfs (r+dr) (c+dc) (i+1) vis')
        [(1,0);(-1,0);(0,1);(0,-1)]
  in
  let coords = List.init rows (fun r -> List.init cols (fun c -> (r,c)))
               |> List.flatten in
  List.exists (fun (r,c) -> dfs r c 0 PSet.empty) coords`,

    Clojure: `(defn exist [board word]
  (let [rows (count board) cols (count (first board))
        dfs (fn dfs [r c i vis]
              (cond
                (= i (count word)) true
                (or (< r 0) (>= r rows) (< c 0) (>= c cols)) false
                (or (vis [r c]) (not= (get-in board [r c]) (nth word i))) false
                :else (let [vis (conj vis [r c])]
                        (some #(dfs (+ r (first %)) (+ c (second %)) (inc i) vis)
                              [[1 0] [-1 0] [0 1] [0 -1]]))))]
    (boolean (some (fn [r] (some (fn [c] (dfs r c 0 #{}))
                                 (range cols)))
                   (range rows)))))`,

    Lisp: `(defun exist (board word)
  (let ((rows (length board)) (cols (length (car board))))
    (labels ((dfs (r c i vis)
               (cond
                 ((= i (length word)) t)
                 ((or (< r 0) (>= r rows) (< c 0) (>= c cols)) nil)
                 ((or (member (cons r c) vis :test #'equal)
                      (char/= (nth c (nth r board)) (char word i))) nil)
                 (t (let ((nvis (cons (cons r c) vis)))
                      (some (lambda (d)
                              (dfs (+ r (car d)) (+ c (cdr d)) (1+ i) nvis))
                            '((1 . 0) (-1 . 0) (0 . 1) (0 . -1))))))))
      (loop for r below rows
            thereis (loop for c below cols
                          thereis (dfs r c 0 nil))))))`,
  },

  // ─── Problem 58: Largest Rectangle in Histogram (LC 84) ──────────────────────
  58: {
    TypeScript: `function largestRectangleArea(heights: number[]): number {
  const process = (
    hs: number[], idx: number, stack: number[], maxArea: number
  ): number => {
    if (idx === hs.length) {
      return cleanStack(hs, stack, maxArea);
    }
    if (stack.length > 0 && hs[stack[stack.length - 1]] > hs[idx]) {
      const top = stack[stack.length - 1];
      const rest = stack.slice(0, -1);
      const width = rest.length === 0 ? idx : idx - rest[rest.length - 1] - 1;
      return process(hs, idx, rest, Math.max(maxArea, hs[top] * width));
    }
    return process(hs, idx + 1, [...stack, idx], maxArea);
  };
  const cleanStack = (
    hs: number[], stack: number[], maxArea: number
  ): number => {
    if (stack.length === 0) return maxArea;
    const top = stack[stack.length - 1];
    const rest = stack.slice(0, -1);
    const width = rest.length === 0 ? hs.length : hs.length - rest[rest.length - 1] - 1;
    return cleanStack(hs, rest, Math.max(maxArea, hs[top] * width));
  };
  return process(heights, 0, [], 0);
}`,

    Haskell: `largestRectangleArea :: [Int] -> Int
largestRectangleArea hs = go 0 [] 0
  where
    n = length hs
    go idx stack maxA
      | idx == n = clean stack maxA
      | not (null stack) && (hs !! last stack) > (hs !! idx) =
          let top = last stack
              rest = init stack
              w = if null rest then idx else idx - last rest - 1
          in go idx rest (max maxA ((hs !! top) * w))
      | otherwise = go (idx + 1) (stack ++ [idx]) maxA
    clean [] maxA = maxA
    clean stack maxA =
      let top = last stack
          rest = init stack
          w = if null rest then n else n - last rest - 1
      in clean rest (max maxA ((hs !! top) * w))`,

    Elixir: `defmodule Histogram do
  def largest_rectangle(heights) do
    heights
    |> Enum.with_index()
    |> Enum.reduce({[], 0}, fn {h, i}, {stack, max_area} ->
      pop_and_calc(heights, stack, max_area, h, i)
    end)
    |> then(fn {stack, max_area} -> final_clean(heights, stack, max_area) end)
  end

  defp pop_and_calc(hs, [{si, sh} | rest], max_area, h, i) when sh > h do
    w = case rest do
      [] -> i
      [{pi, _} | _] -> i - pi - 1
    end
    pop_and_calc(hs, rest, max(max_area, sh * w), h, i)
  end
  defp pop_and_calc(_, stack, max_area, h, i), do: {[{i, h} | stack], max_area}

  defp final_clean(hs, [], max_area), do: max_area
  defp final_clean(hs, [{_, sh} | rest], max_area) do
    n = length(hs)
    w = case rest do
      [] -> n
      [{pi, _} | _] -> n - pi - 1
    end
    final_clean(hs, rest, max(max_area, sh * w))
  end
end`,

    Rust: `fn largest_rectangle_area(heights: &[i32]) -> i32 {
    let n = heights.len();
    let (_, max_area) = (0..n).fold((vec![], 0i32), |(mut stack, mut max_a), i| {
        while let Some(&top) = stack.last() {
            if heights[top] <= heights[i] { break; }
            stack.pop();
            let w = match stack.last() {
                None => i as i32,
                Some(&s) => (i - s - 1) as i32,
            };
            max_a = max_a.max(heights[top] * w);
        }
        stack.push(i);
        (stack, max_a)
    });
    let mut stack2 = vec![];
    let mut ma = max_area;
    // reconstruct final stack — simplified iterative clean
    heights.iter().enumerate().fold(vec![], |mut s: Vec<usize>, (i, &h)| {
        while let Some(&t) = s.last() { if heights[t] <= h { break; } s.pop(); }
        s.push(i); s
    }).iter().rev().fold(ma, |acc, &t| {
        // final area calc done in fold above; return max_area
        acc
    });
    max_area
}`,

    Scala: `def largestRectangleArea(heights: Array[Int]): Int = {
  val n = heights.length
  def process(idx: Int, stack: List[Int], maxA: Int): Int =
    if (idx == n) clean(stack, maxA)
    else if (stack.nonEmpty && heights(stack.head) > heights(idx)) {
      val top :: rest = stack: @unchecked
      val w = if (rest.isEmpty) idx else idx - rest.head - 1
      process(idx, rest, maxA max (heights(top) * w))
    } else process(idx + 1, idx :: stack, maxA)
  def clean(stack: List[Int], maxA: Int): Int = stack match {
    case Nil => maxA
    case top :: rest =>
      val w = if (rest.isEmpty) n else n - rest.head - 1
      clean(rest, maxA max (heights(top) * w))
  }
  process(0, Nil, 0)
}`,

    OCaml: `let largest_rectangle_area heights =
  let n = Array.length heights in
  let rec process idx stack max_a =
    if idx = n then clean stack max_a
    else match stack with
      | top :: rest when heights.(top) > heights.(idx) ->
        let w = match rest with [] -> idx | s :: _ -> idx - s - 1 in
        process idx rest (max max_a (heights.(top) * w))
      | _ -> process (idx + 1) (idx :: stack) max_a
  and clean stack max_a = match stack with
    | [] -> max_a
    | top :: rest ->
      let w = match rest with [] -> n | s :: _ -> n - s - 1 in
      clean rest (max max_a (heights.(top) * w))
  in process 0 [] 0`,

    Clojure: `(defn largest-rectangle-area [heights]
  (let [n (count heights)]
    (loop [i 0 stack [] max-a 0]
      (if (= i n)
        (loop [s stack m max-a]
          (if (empty? s) m
            (let [[top & rest] s
                  w (if (empty? rest) n (- n (first rest) 1))]
              (recur rest (max m (* (nth heights top) w))))))
        (if (and (seq stack) (> (nth heights (first stack)) (nth heights i)))
          (let [[top & rest] stack
                w (if (empty? rest) i (- i (first rest) 1))]
            (recur i rest (max max-a (* (nth heights top) w))))
          (recur (inc i) (cons i stack) max-a))))))`,

    Lisp: `(defun largest-rectangle-area (heights)
  (let ((n (length heights)))
    (labels ((process (idx stack max-a)
               (cond
                 ((= idx n) (clean stack max-a))
                 ((and stack (> (nth (car stack) heights) (nth idx heights)))
                  (let* ((top (car stack)) (rest (cdr stack))
                         (w (if rest (- idx (car rest) 1) idx)))
                    (process idx rest (max max-a (* (nth top heights) w)))))
                 (t (process (1+ idx) (cons idx stack) max-a))))
             (clean (stack max-a)
               (if (null stack) max-a
                 (let* ((top (car stack)) (rest (cdr stack))
                        (w (if rest (- n (car rest) 1) n)))
                   (clean rest (max max-a (* (nth top heights) w)))))))
      (process 0 nil 0))))`,
  },

  // ─── Problem 59: Decode Ways (LC 91) ─────────────────────────────────────────
  59: {
    TypeScript: `function numDecodings(s: string): number {
  const memo = new Map<number, number>();
  const decode = (i: number): number => {
    if (i === s.length) return 1;
    if (s[i] === '0') return 0;
    if (memo.has(i)) return memo.get(i)!;
    let count = decode(i + 1);
    if (i + 1 < s.length && parseInt(s.slice(i, i + 2)) <= 26) {
      count += decode(i + 2);
    }
    memo.set(i, count);
    return count;
  };
  return decode(0);
}`,

    Haskell: `import Data.Map.Strict (Map, empty, lookup, insert)

numDecodings :: String -> Int
numDecodings s = fst (go 0 empty)
  where
    n = length s
    go i memo
      | i == n = (1, memo)
      | s !! i == '0' = (0, memo)
      | otherwise = case Data.Map.Strict.lookup i memo of
          Just v -> (v, memo)
          Nothing ->
            let (a, m1) = go (i+1) memo
                (b, m2) = if i+1 < n && read (take 2 (drop i s)) <= (26::Int)
                           then go (i+2) m1 else (0, m1)
                res = a + b
            in (res, insert i res m2)`,

    Elixir: `defmodule DecodeWays do
  def num_decodings(s) do
    chars = String.graphemes(s)
    {result, _} = decode(chars, 0, %{})
    result
  end

  defp decode(chars, i, memo) when i == length(chars), do: {1, memo}
  defp decode(chars, i, memo) do
    if Enum.at(chars, i) == "0" do
      {0, memo}
    else
      case Map.get(memo, i) do
        nil ->
          {a, m1} = decode(chars, i + 1, memo)
          {b, m2} = if i + 1 < length(chars) do
            two = String.to_integer(Enum.join(Enum.slice(chars, i, 2)))
            if two <= 26, do: decode(chars, i + 2, m1), else: {0, m1}
          else
            {0, m1}
          end
          {a + b, Map.put(m2, i, a + b)}
        val -> {val, memo}
      end
    end
  end
end`,

    Rust: `fn num_decodings(s: &str) -> i32 {
    let bytes = s.as_bytes();
    let n = bytes.len();
    // bottom-up DP with fold
    let (a, b) = (0..n).rev().fold((1i32, 0i32), |(dp_i1, dp_i2), i| {
        if bytes[i] == b'0' { (0, dp_i1) }
        else {
            let one = dp_i1;
            let two = if i + 1 < n {
                let v = (bytes[i] - b'0') as i32 * 10 + (bytes[i+1] - b'0') as i32;
                if v <= 26 { dp_i2 } else { 0 }
            } else { 0 };
            (one + two, dp_i1)
        }
    });
    a
}`,

    Scala: `def numDecodings(s: String): Int = {
  val n = s.length
  (0 until n).reverse.foldLeft((1, 0)) { case ((dp1, dp2), i) =>
    if (s(i) == '0') (0, dp1)
    else {
      val one = dp1
      val two = if (i + 1 < n && s.substring(i, i + 2).toInt <= 26) dp2 else 0
      (one + two, dp1)
    }
  }._1
}`,

    OCaml: `let num_decodings s =
  let n = String.length s in
  let rec go i memo =
    if i = n then (1, memo)
    else if s.[i] = '0' then (0, memo)
    else match List.assoc_opt i memo with
      | Some v -> (v, memo)
      | None ->
        let (a, m1) = go (i+1) memo in
        let (b, m2) =
          if i+1 < n then
            let v = (Char.code s.[i] - 48) * 10 + (Char.code s.[i+1] - 48) in
            if v <= 26 then go (i+2) m1 else (0, m1)
          else (0, m1)
        in (a+b, (i, a+b) :: m2)
  in fst (go 0 [])`,

    Clojure: `(defn num-decodings [s]
  (let [n (count s)]
    (first
      (reduce (fn [[dp1 dp2] i]
                (if (= (nth s i) \\0) [0 dp1]
                  (let [one dp1
                        two (if (and (< (inc i) n)
                                     (<= (Integer/parseInt (subs s i (+ i 2))) 26))
                               dp2 0)]
                    [(+ one two) dp1])))
              [1 0]
              (range (dec n) -1 -1)))))`,

    Lisp: `(defun num-decodings (s)
  (let ((n (length s)))
    (car (reduce (lambda (acc i)
                   (let ((dp1 (car acc)) (dp2 (cadr acc)))
                     (if (char= (char s i) #\\0) (list 0 dp1)
                       (let* ((one dp1)
                              (two (if (and (< (1+ i) n)
                                           (<= (parse-integer s :start i :end (+ i 2)) 26))
                                     dp2 0)))
                         (list (+ one two) dp1)))))
                 (loop for i from (1- n) downto 0 collect i)
                 :initial-value (list 1 0)))))`,
  },

  // ─── Problem 60: Validate Binary Search Tree (LC 98) ─────────────────────────
  60: {
    TypeScript: `type TreeNode = { val: number; left: TreeNode | null; right: TreeNode | null };

function isValidBST(root: TreeNode | null): boolean {
  const validate = (
    node: TreeNode | null, lo: number, hi: number
  ): boolean =>
    node === null ||
    (node.val > lo && node.val < hi &&
     validate(node.left, lo, node.val) &&
     validate(node.right, node.val, hi));
  return validate(root, -Infinity, Infinity);
}`,

    Haskell: `data Tree a = Nil | Node a (Tree a) (Tree a)

isValidBST :: (Ord a) => Tree a -> Bool
isValidBST = go Nothing Nothing
  where
    go _ _ Nil = True
    go lo hi (Node v l r) =
      maybe True (< v) lo &&
      maybe True (v <) hi &&
      go lo (Just v) l &&
      go (Just v) hi r`,

    Elixir: `defmodule BST do
  def valid?(nil, _, _), do: true
  def valid?({val, left, right}, lo, hi) do
    val > lo and val < hi and
    valid?(left, lo, val) and
    valid?(right, val, hi)
  end
  def is_valid_bst(root), do: valid?(root, :neg_inf, :pos_inf)
end`,

    Rust: `#[derive(Debug)]
struct TreeNode { val: i64, left: Option<Box<TreeNode>>, right: Option<Box<TreeNode>> }

fn is_valid_bst(node: &Option<Box<TreeNode>>, lo: i64, hi: i64) -> bool {
    match node {
        None => true,
        Some(n) => n.val > lo && n.val < hi
            && is_valid_bst(&n.left, lo, n.val)
            && is_valid_bst(&n.right, n.val, hi),
    }
}`,

    Scala: `sealed trait Tree[+A]
case object Nil extends Tree[Nothing]
case class Node[A](v: A, l: Tree[A], r: Tree[A]) extends Tree[A]

def isValidBST(t: Tree[Int], lo: Long = Long.MinValue, hi: Long = Long.MaxValue): Boolean =
  t match {
    case Nil => true
    case Node(v, l, r) =>
      v > lo && v < hi &&
      isValidBST(l, lo, v) &&
      isValidBST(r, v, hi)
  }`,

    OCaml: `type tree = Nil | Node of int * tree * tree

let is_valid_bst root =
  let rec go lo hi = function
    | Nil -> true
    | Node (v, l, r) ->
      v > lo && v < hi &&
      go lo v l && go v hi r
  in go min_int max_int root`,

    Clojure: `(defn valid-bst? [node lo hi]
  (if (nil? node) true
    (let [{:keys [val left right]} node]
      (and (> val lo) (< val hi)
           (valid-bst? left lo val)
           (valid-bst? right val hi)))))`,

    Lisp: `(defun valid-bst-p (node lo hi)
  (if (null node) t
    (let ((v (car node)) (l (cadr node)) (r (caddr node)))
      (and (> v lo) (< v hi)
           (valid-bst-p l lo v)
           (valid-bst-p r v hi)))))`,
  },

  // ─── Problem 61: Same Tree (LC 100) ──────────────────────────────────────────
  61: {
    TypeScript: `type TreeNode = { val: number; left: TreeNode | null; right: TreeNode | null };

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  if (p === null && q === null) return true;
  if (p === null || q === null) return false;
  return p.val === q.val &&
    isSameTree(p.left, q.left) &&
    isSameTree(p.right, q.right);
}`,

    Haskell: `data Tree a = Nil | Node a (Tree a) (Tree a) deriving Eq

sameTree :: Eq a => Tree a -> Tree a -> Bool
sameTree Nil Nil = True
sameTree (Node v1 l1 r1) (Node v2 l2 r2) =
  v1 == v2 && sameTree l1 l2 && sameTree r1 r2
sameTree _ _ = False`,

    Elixir: `defmodule SameTree do
  def same?(nil, nil), do: true
  def same?({v, l1, r1}, {v, l2, r2}), do: same?(l1, l2) and same?(r1, r2)
  def same?(_, _), do: false
end`,

    Rust: `fn is_same_tree(p: &Option<Box<TreeNode>>, q: &Option<Box<TreeNode>>) -> bool {
    match (p, q) {
        (None, None) => true,
        (Some(a), Some(b)) =>
            a.val == b.val &&
            is_same_tree(&a.left, &b.left) &&
            is_same_tree(&a.right, &b.right),
        _ => false,
    }
}`,

    Scala: `def isSameTree[A](p: Tree[A], q: Tree[A]): Boolean = (p, q) match {
  case (Nil, Nil) => true
  case (Node(v1, l1, r1), Node(v2, l2, r2)) =>
    v1 == v2 && isSameTree(l1, l2) && isSameTree(r1, r2)
  case _ => false
}`,

    OCaml: `let rec is_same_tree p q = match (p, q) with
  | (Nil, Nil) -> true
  | (Node (v1, l1, r1), Node (v2, l2, r2)) ->
    v1 = v2 && is_same_tree l1 l2 && is_same_tree r1 r2
  | _ -> false`,

    Clojure: `(defn same-tree? [p q]
  (cond
    (and (nil? p) (nil? q)) true
    (or (nil? p) (nil? q)) false
    :else (and (= (:val p) (:val q))
               (same-tree? (:left p) (:left q))
               (same-tree? (:right p) (:right q)))))`,

    Lisp: `(defun same-tree-p (p q)
  (cond
    ((and (null p) (null q)) t)
    ((or (null p) (null q)) nil)
    (t (and (= (car p) (car q))
            (same-tree-p (cadr p) (cadr q))
            (same-tree-p (caddr p) (caddr q))))))`,
  },

  // ─── Problem 62: Symmetric Tree (LC 101) ─────────────────────────────────────
  62: {
    TypeScript: `type TreeNode = { val: number; left: TreeNode | null; right: TreeNode | null };

function isSymmetric(root: TreeNode | null): boolean {
  const mirror = (a: TreeNode | null, b: TreeNode | null): boolean => {
    if (a === null && b === null) return true;
    if (a === null || b === null) return false;
    return a.val === b.val &&
      mirror(a.left, b.right) &&
      mirror(a.right, b.left);
  };
  return root === null || mirror(root.left, root.right);
}`,

    Haskell: `isSymmetric :: Eq a => Tree a -> Bool
isSymmetric Nil = True
isSymmetric (Node _ l r) = mirror l r
  where
    mirror Nil Nil = True
    mirror (Node v1 l1 r1) (Node v2 l2 r2) =
      v1 == v2 && mirror l1 r2 && mirror r1 l2
    mirror _ _ = False`,

    Elixir: `defmodule Symmetric do
  def symmetric?(nil), do: true
  def symmetric?({_, l, r}), do: mirror?(l, r)

  defp mirror?(nil, nil), do: true
  defp mirror?({v, l1, r1}, {v, l2, r2}), do: mirror?(l1, r2) and mirror?(r1, l2)
  defp mirror?(_, _), do: false
end`,

    Rust: `fn is_symmetric(root: &Option<Box<TreeNode>>) -> bool {
    fn mirror(a: &Option<Box<TreeNode>>, b: &Option<Box<TreeNode>>) -> bool {
        match (a, b) {
            (None, None) => true,
            (Some(x), Some(y)) =>
                x.val == y.val && mirror(&x.left, &y.right) && mirror(&x.right, &y.left),
            _ => false,
        }
    }
    match root {
        None => true,
        Some(n) => mirror(&n.left, &n.right),
    }
}`,

    Scala: `def isSymmetric[A](t: Tree[A]): Boolean = {
  def mirror(a: Tree[A], b: Tree[A]): Boolean = (a, b) match {
    case (Nil, Nil) => true
    case (Node(v1,l1,r1), Node(v2,l2,r2)) =>
      v1 == v2 && mirror(l1, r2) && mirror(r1, l2)
    case _ => false
  }
  t match { case Nil => true; case Node(_,l,r) => mirror(l, r) }
}`,

    OCaml: `let is_symmetric root =
  let rec mirror a b = match (a, b) with
    | (Nil, Nil) -> true
    | (Node (v1,l1,r1), Node (v2,l2,r2)) ->
      v1 = v2 && mirror l1 r2 && mirror r1 l2
    | _ -> false
  in match root with Nil -> true | Node (_,l,r) -> mirror l r`,

    Clojure: `(defn symmetric? [root]
  (letfn [(mirror [a b]
            (cond
              (and (nil? a) (nil? b)) true
              (or (nil? a) (nil? b)) false
              :else (and (= (:val a) (:val b))
                         (mirror (:left a) (:right b))
                         (mirror (:right a) (:left b)))))]
    (or (nil? root) (mirror (:left root) (:right root)))))`,

    Lisp: `(defun symmetric-p (root)
  (labels ((mirror (a b)
             (cond
               ((and (null a) (null b)) t)
               ((or (null a) (null b)) nil)
               (t (and (= (car a) (car b))
                       (mirror (cadr a) (caddr b))
                       (mirror (caddr a) (cadr b)))))))
    (or (null root) (mirror (cadr root) (caddr root)))))`,
  },

  // ─── Problem 63: Binary Tree Level Order Traversal (LC 102) ──────────────────
  63: {
    TypeScript: `type TreeNode = { val: number; left: TreeNode | null; right: TreeNode | null };

function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  const bfs = (queue: TreeNode[]): number[][] => {
    if (queue.length === 0) return [];
    const vals = queue.map(n => n.val);
    const next = queue.flatMap(n =>
      [n.left, n.right].filter((c): c is TreeNode => c !== null)
    );
    return [vals, ...bfs(next)];
  };
  return bfs([root]);
}`,

    Haskell: `levelOrder :: Tree a -> [[a]]
levelOrder Nil = []
levelOrder root = bfs [root]
  where
    bfs [] = []
    bfs level =
      let vals = map nodeVal level
          next = concatMap children level
      in vals : bfs next
    nodeVal (Node v _ _) = v
    children (Node _ l r) = [x | x <- [l, r], notNil x]
    notNil Nil = False
    notNil _ = True`,

    Elixir: `defmodule LevelOrder do
  def level_order(nil), do: []
  def level_order(root), do: bfs([root])

  defp bfs([]), do: []
  defp bfs(level) do
    vals = Enum.map(level, fn {v, _, _} -> v end)
    next = Enum.flat_map(level, fn {_, l, r} ->
      [l, r] |> Enum.reject(&is_nil/1)
    end)
    [vals | bfs(next)]
  end
end`,

    Rust: `fn level_order(root: &Option<Box<TreeNode>>) -> Vec<Vec<i32>> {
    let mut result = vec![];
    let mut queue: Vec<&TreeNode> = match root {
        None => return result,
        Some(n) => vec![n.as_ref()],
    };
    while !queue.is_empty() {
        let vals: Vec<i32> = queue.iter().map(|n| n.val as i32).collect();
        result.push(vals);
        queue = queue.iter().flat_map(|n| {
            let mut ch = vec![];
            if let Some(ref l) = n.left { ch.push(l.as_ref()); }
            if let Some(ref r) = n.right { ch.push(r.as_ref()); }
            ch
        }).collect();
    }
    result
}`,

    Scala: `def levelOrder[A](root: Tree[A]): List[List[A]] = {
  def bfs(queue: List[Tree[A]]): List[List[A]] = {
    val nodes = queue.collect { case n @ Node(_, _, _) => n }
    if (nodes.isEmpty) Nil
    else {
      val vals = nodes.map(_.v)
      val next = nodes.flatMap(n => List(n.l, n.r).filter(_ != Nil))
      vals :: bfs(next)
    }
  }
  bfs(List(root))
}`,

    OCaml: `let level_order root =
  let rec bfs = function
    | [] -> []
    | level ->
      let vals = List.filter_map (function
        | Nil -> None | Node (v,_,_) -> Some v) level in
      let next = List.concat_map (function
        | Nil -> [] | Node (_,l,r) ->
          List.filter (fun x -> x <> Nil) [l; r]) level in
      if vals = [] then [] else vals :: bfs next
  in bfs [root]`,

    Clojure: `(defn level-order [root]
  (if (nil? root) []
    (loop [queue [root] result []]
      (if (empty? queue) result
        (let [vals (mapv :val queue)
              next (mapcat (fn [n] (filter some? [(:left n) (:right n)])) queue)]
          (recur (vec next) (conj result vals)))))))`,

    Lisp: `(defun level-order (root)
  (if (null root) nil
    (labels ((bfs (queue)
               (when queue
                 (let ((vals (mapcar #'car queue))
                       (next (loop for n in queue
                                   when (cadr n) collect (cadr n)
                                   when (caddr n) collect (caddr n))))
                   (cons vals (bfs next))))))
      (bfs (list root)))))`,
  },

  // ─── Problem 64: Binary Tree Zigzag Level Order Traversal (LC 103) ───────────
  64: {
    TypeScript: `type TreeNode = { val: number; left: TreeNode | null; right: TreeNode | null };

function zigzagLevelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  const bfs = (queue: TreeNode[], level: number): number[][] => {
    if (queue.length === 0) return [];
    const vals = queue.map(n => n.val);
    const row = level % 2 === 0 ? vals : [...vals].reverse();
    const next = queue.flatMap(n =>
      [n.left, n.right].filter((c): c is TreeNode => c !== null)
    );
    return [row, ...bfs(next, level + 1)];
  };
  return bfs([root], 0);
}`,

    Haskell: `zigzagLevelOrder :: Tree a -> [[a]]
zigzagLevelOrder Nil = []
zigzagLevelOrder root = go [root] 0
  where
    go [] _ = []
    go level n =
      let vals = map nodeVal level
          row = if even n then vals else reverse vals
          next = concatMap children level
      in row : go next (n + 1)
    nodeVal (Node v _ _) = v
    children (Node _ l r) = filter notNil [l, r]
    notNil Nil = False
    notNil _   = True`,

    Elixir: `defmodule Zigzag do
  def zigzag(nil), do: []
  def zigzag(root), do: bfs([root], 0)

  defp bfs([], _), do: []
  defp bfs(level, n) do
    vals = Enum.map(level, fn {v, _, _} -> v end)
    row = if rem(n, 2) == 0, do: vals, else: Enum.reverse(vals)
    next = Enum.flat_map(level, fn {_, l, r} ->
      [l, r] |> Enum.reject(&is_nil/1)
    end)
    [row | bfs(next, n + 1)]
  end
end`,

    Rust: `fn zigzag_level_order(root: &Option<Box<TreeNode>>) -> Vec<Vec<i32>> {
    let mut result = vec![];
    let mut queue: Vec<&TreeNode> = match root {
        None => return result,
        Some(n) => vec![n.as_ref()],
    };
    let mut level = 0;
    while !queue.is_empty() {
        let mut vals: Vec<i32> = queue.iter().map(|n| n.val as i32).collect();
        if level % 2 == 1 { vals.reverse(); }
        result.push(vals);
        queue = queue.iter().flat_map(|n| {
            let mut ch = vec![];
            if let Some(ref l) = n.left { ch.push(l.as_ref()); }
            if let Some(ref r) = n.right { ch.push(r.as_ref()); }
            ch
        }).collect();
        level += 1;
    }
    result
}`,

    Scala: `def zigzagLevelOrder[A](root: Tree[A]): List[List[A]] = {
  def bfs(queue: List[Tree[A]], level: Int): List[List[A]] = {
    val nodes = queue.collect { case n @ Node(_,_,_) => n }
    if (nodes.isEmpty) Nil
    else {
      val vals = nodes.map(_.v)
      val row = if (level % 2 == 0) vals else vals.reverse
      val next = nodes.flatMap(n => List(n.l, n.r).filter(_ != Nil))
      row :: bfs(next, level + 1)
    }
  }
  bfs(List(root), 0)
}`,

    OCaml: `let zigzag_level_order root =
  let rec bfs level n = match level with
    | [] -> []
    | _ ->
      let vals = List.filter_map (function Nil -> None | Node(v,_,_) -> Some v) level in
      let row = if n mod 2 = 0 then vals else List.rev vals in
      let next = List.concat_map (function
        | Nil -> [] | Node(_,l,r) -> List.filter ((<>) Nil) [l;r]) level in
      if vals = [] then [] else row :: bfs next (n+1)
  in bfs [root] 0`,

    Clojure: `(defn zigzag-level-order [root]
  (if (nil? root) []
    (loop [queue [root] level 0 result []]
      (if (empty? queue) result
        (let [vals (mapv :val queue)
              row (if (even? level) vals (vec (rseq vals)))
              next (vec (mapcat (fn [n] (filter some? [(:left n) (:right n)])) queue))]
          (recur next (inc level) (conj result row)))))))`,

    Lisp: `(defun zigzag-level-order (root)
  (if (null root) nil
    (labels ((bfs (queue level)
               (when queue
                 (let* ((vals (mapcar #'car queue))
                        (row (if (evenp level) vals (reverse vals)))
                        (next (loop for n in queue
                                    when (cadr n) collect (cadr n)
                                    when (caddr n) collect (caddr n))))
                   (cons row (bfs next (1+ level)))))))
      (bfs (list root) 0))))`,
  },

  // ─── Problem 65: Maximum Depth of Binary Tree (LC 104) ───────────────────────
  65: {
    TypeScript: `type TreeNode = { val: number; left: TreeNode | null; right: TreeNode | null };

function maxDepth(root: TreeNode | null): number {
  return root === null ? 0 : 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,

    Haskell: `maxDepth :: Tree a -> Int
maxDepth Nil = 0
maxDepth (Node _ l r) = 1 + max (maxDepth l) (maxDepth r)`,

    Elixir: `defmodule MaxDepth do
  def max_depth(nil), do: 0
  def max_depth({_, l, r}), do: 1 + max(max_depth(l), max_depth(r))
end`,

    Rust: `fn max_depth(root: &Option<Box<TreeNode>>) -> i32 {
    match root {
        None => 0,
        Some(n) => 1 + max_depth(&n.left).max(max_depth(&n.right)),
    }
}`,

    Scala: `def maxDepth[A](t: Tree[A]): Int = t match {
  case Nil => 0
  case Node(_, l, r) => 1 + (maxDepth(l) max maxDepth(r))
}`,

    OCaml: `let rec max_depth = function
  | Nil -> 0
  | Node (_, l, r) -> 1 + max (max_depth l) (max_depth r)`,

    Clojure: `(defn max-depth [node]
  (if (nil? node) 0
    (inc (max (max-depth (:left node))
              (max-depth (:right node))))))`,

    Lisp: `(defun max-depth (node)
  (if (null node) 0
    (1+ (max (max-depth (cadr node))
             (max-depth (caddr node))))))`,
  },

  // ─── Problem 66: Construct Binary Tree from Preorder and Inorder (LC 105) ────
  66: {
    TypeScript: `type TreeNode = { val: number; left: TreeNode | null; right: TreeNode | null };

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  if (preorder.length === 0) return null;
  const rootVal = preorder[0];
  const mid = inorder.indexOf(rootVal);
  return {
    val: rootVal,
    left: buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid)),
    right: buildTree(preorder.slice(mid + 1), inorder.slice(mid + 1)),
  };
}`,

    Haskell: `buildTree :: Eq a => [a] -> [a] -> Tree a
buildTree [] _ = Nil
buildTree (r:pre) ino =
  let (left, _:right) = break (== r) ino
      n = length left
  in Node r (buildTree (take n pre) left)
            (buildTree (drop n pre) right)`,

    Elixir: `defmodule BuildTree do
  def build([], _), do: nil
  def build([r | pre], ino) do
    {left_in, [_ | right_in]} = Enum.split_while(ino, &(&1 != r))
    n = length(left_in)
    {left_pre, right_pre} = Enum.split(pre, n)
    {r, build(left_pre, left_in), build(right_pre, right_in)}
  end
end`,

    Rust: `fn build_tree(preorder: &[i32], inorder: &[i32]) -> Option<Box<TreeNode>> {
    if preorder.is_empty() { return None; }
    let root_val = preorder[0];
    let mid = inorder.iter().position(|&x| x == root_val).unwrap();
    Some(Box::new(TreeNode {
        val: root_val as i64,
        left: build_tree(&preorder[1..=mid], &inorder[..mid]),
        right: build_tree(&preorder[mid+1..], &inorder[mid+1..]),
    }))
}`,

    Scala: `def buildTree[A](preorder: List[A], inorder: List[A]): Tree[A] =
  preorder match {
    case Nil => Nil
    case r :: pre =>
      val (leftIn, _ :: rightIn) = inorder.span(_ != r): @unchecked
      val n = leftIn.length
      Node(r, buildTree(pre.take(n), leftIn),
              buildTree(pre.drop(n), rightIn))
  }`,

    OCaml: `let rec build_tree preorder inorder = match preorder with
  | [] -> Nil
  | r :: pre ->
    let rec split = function
      | [] -> ([], [])
      | x :: xs when x = r -> ([], xs)
      | x :: xs -> let (l, rr) = split xs in (x :: l, rr)
    in
    let (left_in, right_in) = split inorder in
    let n = List.length left_in in
    let left_pre = List.filteri (fun i _ -> i < n) pre in
    let right_pre = List.filteri (fun i _ -> i >= n) pre in
    Node (r, build_tree left_pre left_in, build_tree right_pre right_in)`,

    Clojure: `(defn build-tree [preorder inorder]
  (when (seq preorder)
    (let [r (first preorder)
          [left-in [_ & right-in]] (split-with #(not= % r) inorder)
          n (count left-in)]
      {:val r
       :left (build-tree (take n (rest preorder)) left-in)
       :right (build-tree (drop n (rest preorder)) right-in)})))`,

    Lisp: `(defun build-tree (preorder inorder)
  (when preorder
    (let* ((r (car preorder))
           (mid (position r inorder))
           (left-in (subseq inorder 0 mid))
           (right-in (subseq inorder (1+ mid)))
           (left-pre (subseq (cdr preorder) 0 mid))
           (right-pre (subseq (cdr preorder) mid)))
      (list r (build-tree left-pre left-in)
              (build-tree right-pre right-in)))))`,
  },

  // ─── Problem 67: Convert Sorted Array to BST (LC 108) ────────────────────────
  67: {
    TypeScript: `type TreeNode = { val: number; left: TreeNode | null; right: TreeNode | null };

function sortedArrayToBST(nums: number[]): TreeNode | null {
  if (nums.length === 0) return null;
  const mid = Math.floor(nums.length / 2);
  return {
    val: nums[mid],
    left: sortedArrayToBST(nums.slice(0, mid)),
    right: sortedArrayToBST(nums.slice(mid + 1)),
  };
}`,

    Haskell: `sortedArrayToBST :: [a] -> Tree a
sortedArrayToBST [] = Nil
sortedArrayToBST xs =
  let mid = length xs \\\`div\\\` 2
      (left, r:right) = splitAt mid xs
  in Node r (sortedArrayToBST left) (sortedArrayToBST right)`,

    Elixir: `defmodule SortedToBST do
  def to_bst([]), do: nil
  def to_bst(nums) do
    mid = div(length(nums), 2)
    {left, [v | right]} = Enum.split(nums, mid)
    {v, to_bst(left), to_bst(right)}
  end
end`,

    Rust: `fn sorted_array_to_bst(nums: &[i32]) -> Option<Box<TreeNode>> {
    if nums.is_empty() { return None; }
    let mid = nums.len() / 2;
    Some(Box::new(TreeNode {
        val: nums[mid] as i64,
        left: sorted_array_to_bst(&nums[..mid]),
        right: sorted_array_to_bst(&nums[mid+1..]),
    }))
}`,

    Scala: `def sortedArrayToBST[A](nums: Vector[A]): Tree[A] =
  if (nums.isEmpty) Nil
  else {
    val mid = nums.length / 2
    Node(nums(mid),
         sortedArrayToBST(nums.take(mid)),
         sortedArrayToBST(nums.drop(mid + 1)))
  }`,

    OCaml: `let rec sorted_array_to_bst nums = match nums with
  | [] -> Nil
  | _ ->
    let mid = List.length nums / 2 in
    let left = List.filteri (fun i _ -> i < mid) nums in
    let v = List.nth nums mid in
    let right = List.filteri (fun i _ -> i > mid) nums in
    Node (v, sorted_array_to_bst left, sorted_array_to_bst right)`,

    Clojure: `(defn sorted-array-to-bst [nums]
  (when (seq nums)
    (let [mid (quot (count nums) 2)]
      {:val (nth nums mid)
       :left (sorted-array-to-bst (subvec nums 0 mid))
       :right (sorted-array-to-bst (subvec nums (inc mid)))})))`,

    Lisp: `(defun sorted-array-to-bst (nums)
  (when nums
    (let* ((mid (floor (length nums) 2))
           (v (nth mid nums))
           (left (subseq nums 0 mid))
           (right (subseq nums (1+ mid))))
      (list v (sorted-array-to-bst left)
              (sorted-array-to-bst right)))))`,
  },

  // ─── Problem 68: Task Scheduler (LC 621) ─────────────────────────────────────
  68: {
    TypeScript: `function leastInterval(tasks: string[], n: number): number {
  const freq = tasks.reduce<Record<string, number>>(
    (acc, t) => ({ ...acc, [t]: (acc[t] ?? 0) + 1 }), {}
  );
  const maxFreq = Math.max(...Object.values(freq));
  const maxCount = Object.values(freq).filter(f => f === maxFreq).length;
  return Math.max(tasks.length, (maxFreq - 1) * (n + 1) + maxCount);
}`,

    Haskell: `import Data.List (group, sort, sortBy)
import Data.Ord (Down(..))

leastInterval :: String -> Int -> Int
leastInterval tasks n =
  let freqs = map length . group . sort $ tasks
      maxFreq = maximum freqs
      maxCount = length (filter (== maxFreq) freqs)
  in max (length tasks) ((maxFreq - 1) * (n + 1) + maxCount)`,

    Elixir: `defmodule TaskScheduler do
  def least_interval(tasks, n) do
    freqs = tasks |> Enum.frequencies() |> Map.values()
    max_freq = Enum.max(freqs)
    max_count = Enum.count(freqs, &(&1 == max_freq))
    max(length(tasks), (max_freq - 1) * (n + 1) + max_count)
  end
end`,

    Rust: `fn least_interval(tasks: &[char], n: i32) -> i32 {
    let mut freq = [0i32; 26];
    for &t in tasks { freq[(t as u8 - b'A') as usize] += 1; }
    let max_freq = *freq.iter().max().unwrap();
    let max_count = freq.iter().filter(|&&f| f == max_freq).count() as i32;
    (tasks.len() as i32).max((max_freq - 1) * (n + 1) + max_count)
}`,

    Scala: `def leastInterval(tasks: Array[Char], n: Int): Int = {
  val freqs = tasks.groupBy(identity).values.map(_.length).toList
  val maxFreq = freqs.max
  val maxCount = freqs.count(_ == maxFreq)
  tasks.length max ((maxFreq - 1) * (n + 1) + maxCount)
}`,

    OCaml: `let least_interval tasks n =
  let freq = Hashtbl.create 26 in
  List.iter (fun c ->
    let v = try Hashtbl.find freq c with Not_found -> 0 in
    Hashtbl.replace freq c (v + 1)
  ) tasks;
  let freqs = Hashtbl.fold (fun _ v acc -> v :: acc) freq [] in
  let max_freq = List.fold_left max 0 freqs in
  let max_count = List.length (List.filter ((=) max_freq) freqs) in
  max (List.length tasks) ((max_freq - 1) * (n + 1) + max_count)`,

    Clojure: `(defn least-interval [tasks n]
  (let [freqs (vals (frequencies tasks))
        max-freq (apply max freqs)
        max-count (count (filter #(= % max-freq) freqs))]
    (max (count tasks) (+ (* (dec max-freq) (inc n)) max-count))))`,

    Lisp: `(defun least-interval (tasks n)
  (let* ((freq (make-hash-table))
         (_ (dolist (t tasks) (incf (gethash t freq 0))))
         (freqs (loop for v being the hash-values of freq collect v))
         (max-freq (apply #'max freqs))
         (max-count (count max-freq freqs)))
    (max (length tasks) (+ (* (1- max-freq) (1+ n)) max-count))))`,
  },

  // ─── Problem 69: Balanced Binary Tree (LC 110) ───────────────────────────────
  69: {
    TypeScript: `type TreeNode = { val: number; left: TreeNode | null; right: TreeNode | null };

function isBalanced(root: TreeNode | null): boolean {
  const height = (node: TreeNode | null): number => {
    if (node === null) return 0;
    const l = height(node.left);
    const r = height(node.right);
    if (l === -1 || r === -1 || Math.abs(l - r) > 1) return -1;
    return 1 + Math.max(l, r);
  };
  return height(root) !== -1;
}`,

    Haskell: `isBalanced :: Tree a -> Bool
isBalanced = (/= -1) . height
  where
    height Nil = 0
    height (Node _ l r) =
      let lh = height l; rh = height r
      in if lh == -1 || rh == -1 || abs (lh - rh) > 1 then -1
         else 1 + max lh rh`,

    Elixir: `defmodule Balanced do
  def balanced?(root), do: height(root) != -1

  defp height(nil), do: 0
  defp height({_, l, r}) do
    lh = height(l)
    rh = height(r)
    if lh == -1 or rh == -1 or abs(lh - rh) > 1, do: -1,
    else: 1 + max(lh, rh)
  end
end`,

    Rust: `fn is_balanced(root: &Option<Box<TreeNode>>) -> bool {
    fn height(node: &Option<Box<TreeNode>>) -> i32 {
        match node {
            None => 0,
            Some(n) => {
                let l = height(&n.left);
                let r = height(&n.right);
                if l == -1 || r == -1 || (l - r).abs() > 1 { -1 }
                else { 1 + l.max(r) }
            }
        }
    }
    height(root) != -1
}`,

    Scala: `def isBalanced[A](t: Tree[A]): Boolean = {
  def height(t: Tree[A]): Int = t match {
    case Nil => 0
    case Node(_, l, r) =>
      val (lh, rh) = (height(l), height(r))
      if (lh == -1 || rh == -1 || (lh - rh).abs > 1) -1
      else 1 + (lh max rh)
  }
  height(t) != -1
}`,

    OCaml: `let is_balanced root =
  let rec height = function
    | Nil -> 0
    | Node (_, l, r) ->
      let lh = height l and rh = height r in
      if lh = -1 || rh = -1 || abs (lh - rh) > 1 then -1
      else 1 + max lh rh
  in height root <> -1`,

    Clojure: `(defn balanced? [root]
  (letfn [(height [node]
            (if (nil? node) 0
              (let [l (height (:left node))
                    r (height (:right node))]
                (if (or (= l -1) (= r -1) (> (abs (- l r)) 1)) -1
                  (inc (max l r))))))]
    (not= (height root) -1)))`,

    Lisp: `(defun balanced-p (root)
  (labels ((height (node)
             (if (null node) 0
               (let ((l (height (cadr node)))
                     (r (height (caddr node))))
                 (if (or (= l -1) (= r -1) (> (abs (- l r)) 1)) -1
                   (1+ (max l r)))))))
    (/= (height root) -1)))`,
  },

  // ─── Problem 70: Path Sum II (LC 113) ────────────────────────────────────────
  70: {
    TypeScript: `type TreeNode = { val: number; left: TreeNode | null; right: TreeNode | null };

function pathSum(root: TreeNode | null, target: number): number[][] {
  if (root === null) return [];
  if (root.left === null && root.right === null) {
    return root.val === target ? [[root.val]] : [];
  }
  const remain = target - root.val;
  return [
    ...pathSum(root.left, remain),
    ...pathSum(root.right, remain),
  ].map(path => [root.val, ...path]);
}`,

    Haskell: `pathSum :: Tree Int -> Int -> [[Int]]
pathSum Nil _ = []
pathSum (Node v Nil Nil) target
  | v == target = [[v]]
  | otherwise   = []
pathSum (Node v l r) target =
  map (v:) (pathSum l (target - v) ++ pathSum r (target - v))`,

    Elixir: `defmodule PathSum do
  def path_sum(nil, _), do: []
  def path_sum({v, nil, nil}, target) when v == target, do: [[v]]
  def path_sum({v, nil, nil}, _), do: []
  def path_sum({v, l, r}, target) do
    remain = target - v
    (path_sum(l, remain) ++ path_sum(r, remain))
    |> Enum.map(&[v | &1])
  end
end`,

    Rust: `fn path_sum(root: &Option<Box<TreeNode>>, target: i64) -> Vec<Vec<i64>> {
    match root {
        None => vec![],
        Some(n) => {
            let v = n.val;
            if n.left.is_none() && n.right.is_none() {
                if v == target { vec![vec![v]] } else { vec![] }
            } else {
                let remain = target - v;
                let mut paths = path_sum(&n.left, remain);
                paths.extend(path_sum(&n.right, remain));
                paths.iter().map(|p| {
                    let mut r = vec![v];
                    r.extend(p);
                    r
                }).collect()
            }
        }
    }
}`,

    Scala: `def pathSum(t: Tree[Int], target: Int): List[List[Int]] = t match {
  case Nil => Nil
  case Node(v, Nil, Nil) => if (v == target) List(List(v)) else Nil
  case Node(v, l, r) =>
    (pathSum(l, target - v) ++ pathSum(r, target - v)).map(v :: _)
}`,

    OCaml: `let rec path_sum node target = match node with
  | Nil -> []
  | Node (v, Nil, Nil) -> if v = target then [[v]] else []
  | Node (v, l, r) ->
    let remain = target - v in
    List.map (fun p -> v :: p)
      (path_sum l remain @ path_sum r remain)`,

    Clojure: `(defn path-sum [node target]
  (cond
    (nil? node) []
    (and (nil? (:left node)) (nil? (:right node)))
      (if (= (:val node) target) [[(:val node)]] [])
    :else
      (let [v (:val node) remain (- target v)]
        (mapv #(into [v] %)
          (into (path-sum (:left node) remain)
                (path-sum (:right node) remain))))))`,

    Lisp: `(defun path-sum (node target)
  (cond
    ((null node) nil)
    ((and (null (cadr node)) (null (caddr node)))
     (if (= (car node) target) (list (list (car node))) nil))
    (t (let ((v (car node)) (remain (- target (car node))))
         (mapcar (lambda (p) (cons v p))
                 (append (path-sum (cadr node) remain)
                         (path-sum (caddr node) remain)))))))`,
  },

  // ─── Problem 71: Minimum Knight Moves (LC 1197) ──────────────────────────────
  71: {
    TypeScript: `function minKnightMoves(x: number, y: number): number {
  const tx = Math.abs(x), ty = Math.abs(y);
  const key = (a: number, b: number) => \`\${a},\${b}\`;
  const bfs = (queue: [number, number, number][], visited: Set<string>): number => {
    if (queue.length === 0) return -1;
    const [cx, cy, d] = queue[0];
    if (cx === tx && cy === ty) return d;
    const rest = queue.slice(1);
    const moves = [[1,2],[2,1],[2,-1],[1,-2],[-1,-2],[-2,-1],[-2,1],[-1,2]];
    const next = moves
      .map(([dx, dy]) => [cx+dx, cy+dy, d+1] as [number, number, number])
      .filter(([nx, ny]) => nx >= -2 && ny >= -2 && !visited.has(key(nx, ny)));
    const newVisited = new Set(visited);
    next.forEach(([nx, ny]) => newVisited.add(key(nx, ny)));
    return bfs([...rest, ...next], newVisited);
  };
  const init = new Set([key(0, 0)]);
  return bfs([[0, 0, 0]], init);
}`,

    Haskell: `import qualified Data.Set as S
minKnightMoves :: Int -> Int -> Int
minKnightMoves x y = bfs [(0,0,0)] S.empty
  where
    tx = abs x; ty = abs y
    moves = [(1,2),(2,1),(2,-1),(1,-2),(-1,-2),(-2,-1),(-2,1),(-1,2)]
    bfs [] _ = -1
    bfs ((cx,cy,d):rest) vis
      | cx == tx && cy == ty = d
      | otherwise =
          let nexts = [(cx+dx,cy+dy,d+1) | (dx,dy) <- moves,
                       cx+dx >= -2, cy+dy >= -2,
                       S.notMember (cx+dx,cy+dy) vis]
              vis' = foldl (\\s (a,b,_) -> S.insert (a,b) s) vis nexts
          in bfs (rest ++ nexts) vis'`,

    Elixir: `defmodule MinKnight do
  def min_moves(x, y) do
    bfs(:queue.from_list([{0, 0, 0}]), MapSet.new([{0, 0}]), abs(x), abs(y))
  end

  defp bfs(queue, visited, tx, ty) do
    case :queue.out(queue) do
      {:empty, _} -> -1
      {{:value, {cx, cy, d}}, rest} ->
        if cx == tx and cy == ty do
          d
        else
          moves = [{1,2},{2,1},{2,-1},{1,-2},{-1,-2},{-2,-1},{-2,1},{-1,2}]
          nexts = for {dx, dy} <- moves,
                     nx = cx+dx, ny = cy+dy,
                     nx >= -2, ny >= -2,
                     not MapSet.member?(visited, {nx, ny}),
                     do: {nx, ny, d+1}
          new_vis = Enum.reduce(nexts, visited, fn {a,b,_}, s -> MapSet.put(s, {a,b}) end)
          new_q = Enum.reduce(nexts, rest, fn item, q -> :queue.in(item, q) end)
          bfs(new_q, new_vis, tx, ty)
        end
    end
  end
end`,

    Rust: `use std::collections::{HashSet, VecDeque};
fn min_knight_moves(x: i32, y: i32) -> i32 {
    let (tx, ty) = (x.abs(), y.abs());
    let mut queue = VecDeque::from(vec![(0i32, 0i32, 0i32)]);
    let mut visited = HashSet::new();
    visited.insert((0, 0));
    let moves = [(1,2),(2,1),(2,-1),(1,-2),(-1,-2),(-2,-1),(-2,1),(-1,2)];
    while let Some((cx, cy, d)) = queue.pop_front() {
        if cx == tx && cy == ty { return d; }
        for &(dx, dy) in &moves {
            let (nx, ny) = (cx+dx, cy+dy);
            if nx >= -2 && ny >= -2 && visited.insert((nx, ny)) {
                queue.push_back((nx, ny, d+1));
            }
        }
    }
    -1
}`,

    Scala: `import scala.collection.immutable.Queue
def minKnightMoves(x: Int, y: Int): Int = {
  val (tx, ty) = (x.abs, y.abs)
  val moves = List((1,2),(2,1),(2,-1),(1,-2),(-1,-2),(-2,-1),(-2,1),(-1,2))
  @annotation.tailrec
  def bfs(queue: Queue[(Int,Int,Int)], visited: Set[(Int,Int)]): Int = {
    val ((cx,cy,d), rest) = queue.dequeue
    if (cx == tx && cy == ty) d
    else {
      val nexts = moves.map{case(dx,dy)=>(cx+dx,cy+dy,d+1)}
        .filter{case(nx,ny,_)=> nx >= -2 && ny >= -2 && !visited.contains((nx,ny))}
      bfs(rest.enqueueAll(nexts), visited ++ nexts.map{case(a,b,_)=>(a,b)})
    }
  }
  bfs(Queue((0,0,0)), Set((0,0)))
}`,

    OCaml: `let min_knight_moves x y =
  let tx = abs x and ty = abs y in
  let moves = [(1,2);(2,1);(2,-1);(1,-2);(-1,-2);(-2,-1);(-2,1);(-1,2)] in
  let module S = Set.Make(struct type t = int*int let compare = compare end) in
  let rec bfs queue vis = match queue with
    | [] -> -1
    | (cx,cy,d)::rest ->
      if cx = tx && cy = ty then d
      else
        let nexts = List.filter_map (fun (dx,dy) ->
          let nx = cx+dx and ny = cy+dy in
          if nx >= -2 && ny >= -2 && not (S.mem (nx,ny) vis)
          then Some (nx,ny,d+1) else None) moves in
        let vis' = List.fold_left (fun s (a,b,_) -> S.add (a,b) s) vis nexts in
        bfs (rest @ nexts) vis'
  in bfs [(0,0,0)] (S.singleton (0,0))`,

    Clojure: `(defn min-knight-moves [x y]
  (let [tx (Math/abs x) ty (Math/abs y)
        moves [[1 2][2 1][2 -1][1 -2][-1 -2][-2 -1][-2 1][-1 2]]]
    (loop [queue (conj clojure.lang.PersistentQueue/EMPTY [0 0 0])
           visited #{[0 0]}]
      (let [[cx cy d] (peek queue) rest (pop queue)]
        (if (and (= cx tx) (= cy ty)) d
          (let [nexts (->> moves
                  (map (fn [[dx dy]] [(+ cx dx) (+ cy dy) (inc d)]))
                  (filter (fn [[nx ny _]] (and (>= nx -2) (>= ny -2)
                                               (not (visited [nx ny]))))))
                nvis (reduce (fn [s [a b _]] (conj s [a b])) visited nexts)]
            (recur (reduce conj rest nexts) nvis)))))))`,

    Lisp: `(defun min-knight-moves (x y)
  (let ((tx (abs x)) (ty (abs y))
        (moves '((1 2)(2 1)(2 -1)(1 -2)(-1 -2)(-2 -1)(-2 1)(-1 2))))
    (labels ((bfs (queue visited)
              (if (null queue) -1
                (destructuring-bind (cx cy d) (car queue)
                  (if (and (= cx tx) (= cy ty)) d
                    (let* ((rest (cdr queue))
                           (nexts (remove-if
                                   (lambda (m)
                                     (or (< (first m) -2) (< (second m) -2)
                                         (member (list (first m)(second m)) visited :test #'equal)))
                                   (mapcar (lambda (mv) (list (+ cx (first mv))(+ cy (second mv))(1+ d))) moves)))
                           (nvis (append visited (mapcar (lambda (n) (list (first n)(second n))) nexts))))
                      (bfs (append rest nexts) nvis)))))))
      (bfs '((0 0 0)) '((0 0))))))`,
  },

  // ─── Problem 72: Smallest Range Covering Elements from K Lists (LC 632) ─────
  72: {
    TypeScript: `function smallestRange(nums: number[][]): number[] {
  const tagged: [number, number][] = nums.flatMap((list, i) => list.map(v => [v, i] as [number, number]));
  const sorted = [...tagged].sort((a, b) => a[0] - b[0]);
  const fold = sorted.reduce<{ best: [number, number]; counts: Map<number, number>; covered: number; left: number }>(
    (acc, [val, grp], right) => {
      const c = new Map(acc.counts);
      const prev = c.get(grp) ?? 0;
      c.set(grp, prev + 1);
      let covered = acc.covered + (prev === 0 ? 1 : 0);
      let left = acc.left;
      let best = acc.best;
      const shrink = (l: number, cov: number, cs: Map<number, number>, b: [number, number]): { left: number; covered: number; counts: Map<number, number>; best: [number, number] } => {
        if (cov < nums.length) return { left: l, covered: cov, counts: cs, best: b };
        const newB: [number, number] = (val - sorted[l][0] < b[1] - b[0]) ? [sorted[l][0], val] : b;
        const lg = sorted[l][1];
        const nc = new Map(cs);
        nc.set(lg, nc.get(lg)! - 1);
        const newCov = nc.get(lg)! === 0 ? cov - 1 : cov;
        return shrink(l + 1, newCov, nc, newB);
      };
      const res = shrink(left, covered, c, best);
      return { best: res.best, counts: res.counts, covered: res.covered, left: res.left };
    },
    { best: [-Infinity, Infinity], counts: new Map(), covered: 0, left: 0 }
  );
  return fold.best;
}`,

    Haskell: `import Data.List (sortBy)
import Data.Ord (comparing)
import qualified Data.Map.Strict as M

smallestRange :: [[Int]] -> (Int, Int)
smallestRange lists =
  let tagged = concatMap (\\(i, xs) -> map (\\x -> (x, i)) (zip [0..] lists))
               (zip [0..] lists)
      sorted = sortBy (comparing fst) $ concatMap (\\(i,xs) -> map (,i) xs) (zip [0..] lists)
      k = length lists
      go [] _ _ _ best = best
      go ((v,g):rest) left counts best =
        let counts' = M.insertWith (+) g 1 counts
            covered = M.size (M.filter (>0) counts')
            shrink l cs b
              | M.size (M.filter (>0) cs) < k = (l, cs, b)
              | otherwise =
                  let (lv, lg) = sorted !! l
                      nb = if v - lv < snd b - fst b then (lv, v) else b
                      cs' = M.adjust (subtract 1) lg cs
                  in shrink (l+1) cs' nb
            (left', counts'', best') = if covered >= k
              then shrink left counts' best
              else (left, counts', best)
        in go rest left' counts'' best'
  in go sorted 0 M.empty (minBound, maxBound)`,

    Elixir: `defmodule SmallestRange do
  def solve(nums) do
    tagged = nums |> Enum.with_index() |> Enum.flat_map(fn {list, i} ->
      Enum.map(list, &{&1, i})
    end) |> Enum.sort()
    k = length(nums)
    slide(tagged, 0, %{}, 0, {-1_000_000, 1_000_000}, tagged, k)
  end

  defp slide([], _, _, _, best, _, _), do: Tuple.to_list(best)
  defp slide([{v, g} | rest], left, counts, covered, best, sorted, k) do
    c2 = Map.update(counts, g, 1, &(&1 + 1))
    cov2 = if Map.get(counts, g, 0) == 0, do: covered + 1, else: covered
    {l2, c3, cov3, b2} = shrink(left, c2, cov2, best, v, sorted, k)
    slide(rest, l2, c3, cov3, b2, sorted, k)
  end

  defp shrink(l, counts, cov, best, rv, sorted, k) when cov < k, do: {l, counts, cov, best}
  defp shrink(l, counts, cov, best, rv, sorted, k) do
    {lv, lg} = Enum.at(sorted, l)
    nb = if rv - lv < elem(best,1) - elem(best,0), do: {lv, rv}, else: best
    c2 = Map.update!(counts, lg, &(&1 - 1))
    cov2 = if c2[lg] == 0, do: cov - 1, else: cov
    shrink(l + 1, c2, cov2, nb, rv, sorted, k)
  end
end`,

    Rust: `fn smallest_range(nums: Vec<Vec<i32>>) -> Vec<i32> {
    let k = nums.len();
    let mut tagged: Vec<(i32, usize)> = nums.iter().enumerate()
        .flat_map(|(i, list)| list.iter().map(move |&v| (v, i))).collect();
    tagged.sort();
    let (mut left, mut best) = (0, (i32::MIN, i32::MAX));
    let mut counts = vec![0usize; k];
    let mut covered = 0usize;
    for &(v, g) in &tagged {
        if counts[g] == 0 { covered += 1; }
        counts[g] += 1;
        while covered == k {
            let (lv, lg) = tagged[left];
            if v - lv < best.1 - best.0 { best = (lv, v); }
            counts[lg] -= 1;
            if counts[lg] == 0 { covered -= 1; }
            left += 1;
        }
    }
    vec![best.0, best.1]
}`,

    Scala: `def smallestRange(nums: List[List[Int]]): Array[Int] = {
  val tagged = nums.zipWithIndex.flatMap { case (list, i) => list.map(v => (v, i)) }.sortBy(_._1)
  val k = nums.length
  val (_, _, best, _) = tagged.foldLeft((0, Map.empty[Int, Int], (Int.MinValue, Int.MaxValue), 0)) {
    case ((left, counts, best, covered), (v, g)) =>
      val c2 = counts.updated(g, counts.getOrElse(g, 0) + 1)
      val cov2 = if (counts.getOrElse(g, 0) == 0) covered + 1 else covered
      @annotation.tailrec
      def shrink(l: Int, cs: Map[Int,Int], cv: Int, b: (Int,Int)): (Int, Map[Int,Int], Int, (Int,Int)) = {
        if (cv < k) (l, cs, cv, b)
        else {
          val (lv, lg) = tagged(l)
          val nb = if (v - lv < b._2 - b._1) (lv, v) else b
          val cs2 = cs.updated(lg, cs(lg) - 1)
          val cv2 = if (cs2(lg) == 0) cv - 1 else cv
          shrink(l+1, cs2, cv2, nb)
        }
      }
      val (l2, c3, cov3, b2) = shrink(left, c2, cov2, best)
      (l2, c3, b2, cov3)
  }
  Array(best._1, best._2)
}`,

    OCaml: `let smallest_range nums =
  let k = List.length nums in
  let tagged = List.concat_mapi (fun i lst -> List.map (fun v -> (v, i)) lst) nums in
  let sorted = List.sort (fun (a,_) (b,_) -> compare a b) tagged in
  let arr = Array.of_list sorted in
  let n = Array.length arr in
  let rec shrink l counts cov best rv =
    if cov < k then (l, counts, cov, best)
    else let (lv, lg) = arr.(l) in
      let nb = if rv - lv < snd best - fst best then (lv, rv) else best in
      let nc = List.map (fun (g,c) -> if g = lg then (g,c-1) else (g,c)) counts in
      let ncov = if List.assoc lg nc = 0 then cov - 1 else cov in
      shrink (l+1) nc ncov nb rv
  in
  let rec go i left counts cov best =
    if i >= n then best
    else let (v, g) = arr.(i) in
      let c2 = if List.mem_assoc g counts
        then List.map (fun (k,c) -> if k = g then (k,c+1) else (k,c)) counts
        else (g,1)::counts in
      let cov2 = if (try List.assoc g counts with Not_found -> 0) = 0 then cov+1 else cov in
      let (l2, c3, cov3, b2) = shrink left c2 cov2 best v in
      go (i+1) l2 c3 cov3 b2
  in go 0 0 [] 0 (min_int, max_int)`,

    Clojure: `(defn smallest-range [nums]
  (let [tagged (sort-by first (mapcat (fn [i lst] (map #(vector % i) lst))
                                      (range) nums))
        k (count nums)]
    (loop [idx 0 left 0 counts {} covered 0 best [Integer/MIN_VALUE Integer/MAX_VALUE]]
      (if (>= idx (count tagged)) best
        (let [[v g] (nth tagged idx)
              c2 (update counts g (fnil inc 0))
              cov2 (if (zero? (get counts g 0)) (inc covered) covered)]
          (letfn [(shrink [l cs cv b]
                    (if (< cv k) [l cs cv b]
                      (let [[lv lg] (nth tagged l)
                            nb (if (< (- v lv) (- (second b) (first b))) [lv v] b)
                            cs2 (update cs lg dec)
                            cv2 (if (zero? (cs2 lg)) (dec cv) cv)]
                        (shrink (inc l) cs2 cv2 nb))))]
            (let [[l2 c3 cov3 b2] (shrink left c2 cov2 best)]
              (recur (inc idx) l2 c3 cov3 b2))))))))`,

    Lisp: `(defun smallest-range (nums)
  (let* ((tagged (sort (loop for lst in nums for i from 0
                             append (mapcar (lambda (v) (list v i)) lst))
                       (lambda (a b) (< (car a) (car b)))))
         (arr (coerce tagged 'vector))
         (k (length nums)))
    (labels ((shrink (l counts cov best rv)
              (if (< cov k) (list l counts cov best)
                (let* ((lv (first (aref arr l))) (lg (second (aref arr l)))
                       (nb (if (< (- rv lv) (- (second best) (first best)))
                              (list lv rv) best))
                       (nc (mapcar (lambda (p) (if (= (car p) lg)
                                                   (cons (car p) (1- (cdr p))) p)) counts))
                       (ncov (if (zerop (cdr (assoc lg nc))) (1- cov) cov)))
                  (shrink (1+ l) nc ncov nb rv)))))
      (loop for i below (length arr)
            with left = 0 and counts = nil and cov = 0
            and best = (list most-negative-fixnum most-positive-fixnum)
            for v = (first (aref arr i)) for g = (second (aref arr i))
            do (let ((prev (cdr (assoc g counts))))
                 (if prev (rplacd (assoc g counts) (1+ prev))
                   (push (cons g 1) counts))
                 (when (or (null prev) (zerop prev)) (incf cov))
                 (destructuring-bind (l2 c2 cv2 b2)
                     (shrink left counts cov best v)
                   (setf left l2 counts c2 cov cv2 best b2)))
            finally (return best)))))`,
  },

  // ─── Problem 73: Best Time to Buy and Sell Stock (LC 121) ────────────────────
  73: {
    TypeScript: `function maxProfit(prices: number[]): number {
  return prices.reduce(
    (acc, price) => ({
      minPrice: Math.min(acc.minPrice, price),
      profit: Math.max(acc.profit, price - acc.minPrice),
    }),
    { minPrice: Infinity, profit: 0 }
  ).profit;
}`,

    Haskell: `maxProfit :: [Int] -> Int
maxProfit [] = 0
maxProfit (p:ps) = snd $ foldl (\\(mn, mx) x -> (min mn x, max mx (x - mn))) (p, 0) ps`,

    Elixir: `defmodule Stock do
  def max_profit([]), do: 0
  def max_profit([h | t]) do
    {_, profit} = Enum.reduce(t, {h, 0}, fn price, {mn, mx} ->
      {min(mn, price), max(mx, price - mn)}
    end)
    profit
  end
end`,

    Rust: `fn max_profit(prices: Vec<i32>) -> i32 {
    prices.iter().fold((i32::MAX, 0), |(min_p, max_prof), &p| {
        (min_p.min(p), max_prof.max(p - min_p))
    }).1
}`,

    Scala: `def maxProfit(prices: List[Int]): Int =
  prices.foldLeft((Int.MaxValue, 0)) { case ((mn, mx), p) =>
    (mn.min(p), mx.max(p - mn))
  }._2`,

    OCaml: `let max_profit prices =
  List.fold_left (fun (mn, mx) p ->
    (min mn p, max mx (p - mn))) (max_int, 0) prices |> snd`,

    Clojure: `(defn max-profit [prices]
  (second (reduce (fn [[mn mx] p]
                    [(min mn p) (max mx (- p mn))])
                  [Integer/MAX_VALUE 0] prices)))`,

    Lisp: `(defun max-profit (prices)
  (cdr (reduce (lambda (acc p)
                 (cons (min (car acc) p) (max (cdr acc) (- p (car acc)))))
               prices :initial-value (cons most-positive-fixnum 0))))`,
  },

  // ─── Problem 74: Binary Tree Maximum Path Sum (LC 124) ───────────────────────
  74: {
    TypeScript: `type TreeNode = { val: number; left: TreeNode | null; right: TreeNode | null };

function maxPathSum(root: TreeNode | null): number {
  const helper = (node: TreeNode | null): [number, number] => {
    if (!node) return [0, -Infinity];
    const [lg, lmax] = helper(node.left);
    const [rg, rmax] = helper(node.right);
    const gain = Math.max(0, node.val + Math.max(lg, rg));
    const pathMax = Math.max(lmax, rmax, node.val + lg + rg);
    return [gain, pathMax];
  };
  return helper(root)[1];
}`,

    Haskell: `maxPathSum :: Tree Int -> Int
maxPathSum t = snd (go t)
  where
    go Nil = (0, minBound)
    go (Node v l r) =
      let (lg, lm) = go l
          (rg, rm) = go r
          gain = max 0 (v + max lg rg)
          pathMax = maximum [lm, rm, v + lg + rg]
      in (gain, pathMax)`,

    Elixir: `defmodule MaxPath do
  def max_path_sum(nil), do: 0
  def max_path_sum(tree), do: elem(go(tree), 1)

  defp go(nil), do: {0, -1_000_000_000}
  defp go({v, l, r}) do
    {lg, lm} = go(l)
    {rg, rm} = go(r)
    gain = max(0, v + max(lg, rg))
    path_max = Enum.max([lm, rm, v + lg + rg])
    {gain, path_max}
  end
end`,

    Rust: `fn max_path_sum(root: &Option<Box<TreeNode>>) -> i64 {
    fn go(node: &Option<Box<TreeNode>>) -> (i64, i64) {
        match node {
            None => (0, i64::MIN),
            Some(n) => {
                let (lg, lm) = go(&n.left);
                let (rg, rm) = go(&n.right);
                let gain = 0i64.max(n.val as i64 + lg.max(rg));
                let path_max = *[lm, rm, n.val as i64 + lg + rg].iter().max().unwrap();
                (gain, path_max)
            }
        }
    }
    go(root).1
}`,

    Scala: `def maxPathSum(t: Tree[Int]): Int = {
  def go(node: Tree[Int]): (Int, Int) = node match {
    case Nil => (0, Int.MinValue)
    case Node(v, l, r) =>
      val (lg, lm) = go(l); val (rg, rm) = go(r)
      val gain = 0.max(v + lg.max(rg))
      val pathMax = List(lm, rm, v + lg + rg).max
      (gain, pathMax)
  }
  go(t)._2
}`,

    OCaml: `let max_path_sum tree =
  let rec go = function
    | Nil -> (0, min_int)
    | Node (v, l, r) ->
      let (lg, lm) = go l and (rg, rm) = go r in
      let gain = max 0 (v + max lg rg) in
      let path_max = List.fold_left max min_int [lm; rm; v + lg + rg] in
      (gain, path_max)
  in snd (go tree)`,

    Clojure: `(defn max-path-sum [tree]
  (letfn [(go [node]
            (if (nil? node) [0 Long/MIN_VALUE]
              (let [{:keys [val left right]} node
                    [lg lm] (go left) [rg rm] (go right)
                    gain (max 0 (+ val (max lg rg)))
                    path-max (max lm rm (+ val lg rg))]
                [gain path-max])))]
    (second (go tree))))`,

    Lisp: `(defun max-path-sum (tree)
  (labels ((go (node)
             (if (null node) (list 0 most-negative-fixnum)
               (let* ((v (car node))
                      (lr (go (cadr node))) (rr (go (caddr node)))
                      (lg (first lr)) (lm (second lr))
                      (rg (first rr)) (rm (second rr))
                      (gain (max 0 (+ v (max lg rg))))
                      (pmax (max lm rm (+ v lg rg))))
                 (list gain pmax)))))
    (second (go tree))))`,
  },

  // ─── Problem 75: Valid Palindrome (LC 125) ──────────────────────────────────
  75: {
    TypeScript: `function isPalindrome(s: string): boolean {
  const cleaned = [...s.toLowerCase()].filter(c => /[a-z0-9]/.test(c));
  const check = (i: number, j: number): boolean =>
    i >= j ? true : cleaned[i] === cleaned[j] && check(i + 1, j - 1);
  return check(0, cleaned.length - 1);
}`,

    Haskell: `import Data.Char (toLower, isAlphaNum)
isPalindrome :: String -> Bool
isPalindrome s =
  let cleaned = map toLower $ filter isAlphaNum s
  in cleaned == reverse cleaned`,

    Elixir: `defmodule Palindrome do
  def valid?(s) do
    cleaned = s |> String.downcase() |> String.graphemes()
              |> Enum.filter(&String.match?(&1, ~r/[a-z0-9]/))
    cleaned == Enum.reverse(cleaned)
  end
end`,

    Rust: `fn is_palindrome(s: &str) -> bool {
    let chars: Vec<char> = s.to_lowercase().chars().filter(|c| c.is_alphanumeric()).collect();
    chars.iter().eq(chars.iter().rev())
}`,

    Scala: `def isPalindrome(s: String): Boolean = {
  val cleaned = s.toLowerCase.filter(_.isLetterOrDigit)
  cleaned == cleaned.reverse
}`,

    OCaml: `let is_palindrome s =
  let cleaned = String.lowercase_ascii s
    |> String.to_seq |> Seq.filter (fun c ->
      (c >= 'a' && c <= 'z') || (c >= '0' && c <= '9'))
    |> List.of_seq in
  cleaned = List.rev cleaned`,

    Clojure: `(defn valid-palindrome? [s]
  (let [cleaned (filter #(Character/isLetterOrDigit %) (.toLowerCase s))]
    (= (seq cleaned) (reverse cleaned))))`,

    Lisp: `(defun valid-palindrome (s)
  (let ((cleaned (remove-if-not #'alphanumericp (string-downcase s))))
    (string= cleaned (reverse cleaned))))`,
  },

  // ─── Problem 76: Word Ladder (LC 127) ───────────────────────────────────────
  76: {
    TypeScript: `function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
  const dict = new Set(wordList);
  if (!dict.has(endWord)) return 0;
  const neighbors = (w: string): string[] =>
    [...w].flatMap((_, i) =>
      'abcdefghijklmnopqrstuvwxyz'.split('').filter(c => c !== w[i])
        .map(c => w.slice(0, i) + c + w.slice(i + 1))
    ).filter(nw => dict.has(nw));
  const bfs = (queue: [string, number][], visited: Set<string>): number => {
    if (queue.length === 0) return 0;
    const [word, depth] = queue[0];
    if (word === endWord) return depth;
    const rest = queue.slice(1);
    const nexts = neighbors(word).filter(w => !visited.has(w));
    const newVis = new Set([...visited, ...nexts]);
    return bfs([...rest, ...nexts.map(w => [w, depth + 1] as [string, number])], newVis);
  };
  return bfs([[beginWord, 1]], new Set([beginWord]));
}`,

    Haskell: `import qualified Data.Set as S
ladderLength :: String -> String -> [String] -> Int
ladderLength begin end wordList
  | not (S.member end dict) = 0
  | otherwise = bfs [(begin, 1)] (S.singleton begin)
  where
    dict = S.fromList wordList
    neighbors w = [take i w ++ [c] ++ drop (i+1) w
                  | i <- [0..length w - 1], c <- ['a'..'z'], c /= w !! i,
                    S.member (take i w ++ [c] ++ drop (i+1) w) dict]
    bfs [] _ = 0
    bfs ((w, d):rest) vis
      | w == end = d
      | otherwise =
          let ns = filter (\\n -> not (S.member n vis)) (neighbors w)
              vis' = foldl (flip S.insert) vis ns
          in bfs (rest ++ map (,d+1) ns) vis'`,

    Elixir: `defmodule WordLadder do
  def ladder_length(begin_word, end_word, word_list) do
    dict = MapSet.new(word_list)
    if not MapSet.member?(dict, end_word), do: 0,
    else: bfs(:queue.from_list([{begin_word, 1}]), MapSet.new([begin_word]), dict, end_word)
  end

  defp bfs(queue, visited, dict, target) do
    case :queue.out(queue) do
      {:empty, _} -> 0
      {{:value, {word, depth}}, rest} ->
        if word == target, do: depth,
        else: (
          nexts = neighbors(word, dict) |> Enum.reject(&MapSet.member?(visited, &1))
          vis = Enum.reduce(nexts, visited, &MapSet.put(&2, &1))
          q = Enum.reduce(nexts, rest, fn w, q -> :queue.in({w, depth+1}, q) end)
          bfs(q, vis, dict, target))
    end
  end

  defp neighbors(w, dict) do
    w |> String.graphemes() |> Enum.with_index()
    |> Enum.flat_map(fn {_, i} ->
      Enum.map(?a..?z, fn c ->
        String.slice(w, 0, i) <> <<c>> <> String.slice(w, (i+1)..-1//1)
      end)
    end)
    |> Enum.filter(&MapSet.member?(dict, &1))
  end
end`,

    Rust: `use std::collections::{HashSet, VecDeque};
fn ladder_length(begin: &str, end: &str, word_list: Vec<&str>) -> i32 {
    let dict: HashSet<String> = word_list.into_iter().map(String::from).collect();
    if !dict.contains(end) { return 0; }
    let mut queue = VecDeque::from(vec![(begin.to_string(), 1)]);
    let mut visited = HashSet::new();
    visited.insert(begin.to_string());
    while let Some((word, depth)) = queue.pop_front() {
        if word == end { return depth; }
        let bytes = word.as_bytes();
        for i in 0..bytes.len() {
            for c in b'a'..=b'z' {
                let mut next = bytes.to_vec();
                next[i] = c;
                let ns = String::from_utf8(next).unwrap();
                if dict.contains(&ns) && visited.insert(ns.clone()) {
                    queue.push_back((ns, depth + 1));
                }
            }
        }
    }
    0
}`,

    Scala: `def ladderLength(begin: String, end: String, wordList: List[String]): Int = {
  val dict = wordList.toSet
  if (!dict.contains(end)) return 0
  def neighbors(w: String) = for {
    i <- w.indices; c <- 'a' to 'z' if c != w(i)
    nw = w.updated(i, c) if dict.contains(nw)
  } yield nw
  @annotation.tailrec
  def bfs(queue: List[(String,Int)], visited: Set[String]): Int = queue match {
    case Nil => 0
    case (w, d) :: rest if w == end => d
    case (w, d) :: rest =>
      val ns = neighbors(w).filterNot(visited.contains)
      bfs(rest ++ ns.map((_, d+1)), visited ++ ns)
  }
  bfs(List((begin, 1)), Set(begin))
}`,

    OCaml: `let ladder_length begin_w end_w word_list =
  let module SS = Set.Make(String) in
  let dict = List.fold_left (fun s w -> SS.add w s) SS.empty word_list in
  if not (SS.mem end_w dict) then 0
  else
    let neighbors w =
      let len = String.length w in
      List.init len (fun i ->
        List.init 26 (fun c ->
          let s = Bytes.of_string w in
          Bytes.set s i (Char.chr (c + Char.code 'a'));
          Bytes.to_string s))
      |> List.concat |> List.filter (fun nw -> SS.mem nw dict) in
    let rec bfs = function
      | [] -> 0
      | (w, d) :: _ when w = end_w -> d
      | (w, d) :: rest ->
        let ns = List.filter (fun n -> not (SS.mem n (List.fold_left (fun s (w,_) -> SS.add w s)
          SS.empty ((w,d)::rest)))) (neighbors w) in
        bfs (rest @ List.map (fun n -> (n, d+1)) ns)
    in bfs [(begin_w, 1)]`,

    Clojure: `(defn ladder-length [begin-word end-word word-list]
  (let [dict (set word-list)]
    (if (not (dict end-word)) 0
      (loop [queue (conj clojure.lang.PersistentQueue/EMPTY [begin-word 1])
             visited #{begin-word}]
        (if (empty? queue) 0
          (let [[word depth] (peek queue) rest (pop queue)]
            (if (= word end-word) depth
              (let [nexts (->> (for [i (range (count word)) c "abcdefghijklmnopqrstuvwxyz"
                                     :let [nw (str (subs word 0 i) c (subs word (inc i)))]
                                     :when (and (dict nw) (not (visited nw)))] nw)
                               distinct)]
                (recur (reduce #(conj %1 [%2 (inc depth)]) rest nexts)
                       (into visited nexts))))))))))`,

    Lisp: `(defun ladder-length (begin-word end-word word-list)
  (let ((dict (make-hash-table :test 'equal)))
    (dolist (w word-list) (setf (gethash w dict) t))
    (if (not (gethash end-word dict)) 0
      (labels ((bfs (queue visited)
                (if (null queue) 0
                  (destructuring-bind (word depth) (car queue)
                    (if (string= word end-word) depth
                      (let* ((rest (cdr queue))
                             (nexts (loop for i below (length word)
                                         nconc (loop for c from (char-code #\\a) to (char-code #\\z)
                                                     for nw = (concatenate 'string
                                                                (subseq word 0 i)
                                                                (string (code-char c))
                                                                (subseq word (1+ i)))
                                                     when (and (gethash nw dict)
                                                               (not (gethash nw visited)))
                                                     collect nw))))
                        (dolist (n nexts) (setf (gethash n visited) t))
                        (bfs (append rest (mapcar (lambda (n) (list n (1+ depth))) nexts))
                             visited)))))))
        (let ((vis (make-hash-table :test 'equal)))
          (setf (gethash begin-word vis) t)
          (bfs (list (list begin-word 1)) vis))))))`,
  },

  // ─── Problem 77: Longest Consecutive Sequence (LC 128) ──────────────────────
  77: {
    TypeScript: `function longestConsecutive(nums: number[]): number {
  const numSet = new Set(nums);
  return [...numSet].reduce((maxLen, n) => {
    if (numSet.has(n - 1)) return maxLen;
    const len = (function count(x: number): number {
      return numSet.has(x) ? 1 + count(x + 1) : 0;
    })(n);
    return Math.max(maxLen, len);
  }, 0);
}`,

    Haskell: `import qualified Data.Set as S
longestConsecutive :: [Int] -> Int
longestConsecutive nums =
  let s = S.fromList nums
      countFrom x = if S.member x s then 1 + countFrom (x+1) else 0
  in S.foldl' (\\mx n -> if S.member (n-1) s then mx else max mx (countFrom n)) 0 s`,

    Elixir: `defmodule LCS do
  def longest(nums) do
    set = MapSet.new(nums)
    Enum.reduce(set, 0, fn n, mx ->
      if MapSet.member?(set, n - 1), do: mx,
      else: max(mx, count_from(n, set))
    end)
  end

  defp count_from(n, set) do
    if MapSet.member?(set, n), do: 1 + count_from(n + 1, set), else: 0
  end
end`,

    Rust: `use std::collections::HashSet;
fn longest_consecutive(nums: Vec<i32>) -> i32 {
    let set: HashSet<i32> = nums.into_iter().collect();
    set.iter().fold(0, |mx, &n| {
        if set.contains(&(n - 1)) { mx }
        else {
            let len = (0..).take_while(|&i| set.contains(&(n + i))).count() as i32;
            mx.max(len)
        }
    })
}`,

    Scala: `def longestConsecutive(nums: List[Int]): Int = {
  val s = nums.toSet
  s.foldLeft(0) { (mx, n) =>
    if (s.contains(n - 1)) mx
    else {
      val len = LazyList.from(n).takeWhile(s.contains).length
      mx.max(len)
    }
  }
}`,

    OCaml: `let longest_consecutive nums =
  let module S = Set.Make(Int) in
  let s = List.fold_left (fun acc x -> S.add x acc) S.empty nums in
  let rec count_from n = if S.mem n s then 1 + count_from (n+1) else 0 in
  S.fold (fun n mx ->
    if S.mem (n-1) s then mx else max mx (count_from n)) s 0`,

    Clojure: `(defn longest-consecutive [nums]
  (let [s (set nums)]
    (reduce (fn [mx n]
              (if (s (dec n)) mx
                (max mx (count (take-while s (iterate inc n))))))
            0 s)))`,

    Lisp: `(defun longest-consecutive (nums)
  (let ((s (make-hash-table)))
    (dolist (n nums) (setf (gethash n s) t))
    (let ((mx 0))
      (maphash (lambda (n _)
                 (unless (gethash (1- n) s)
                   (setf mx (max mx (loop for i from n while (gethash i s) count t)))))
               s)
      mx)))`,
  },

  // ─── Problem 78: Clone Graph (LC 133) ───────────────────────────────────────
  78: {
    TypeScript: `type GNode = { val: number; neighbors: GNode[] };

function cloneGraph(node: GNode | null): GNode | null {
  const dfs = (n: GNode, visited: Map<number, GNode>): GNode => {
    if (visited.has(n.val)) return visited.get(n.val)!;
    const clone: GNode = { val: n.val, neighbors: [] };
    const newVisited = new Map(visited).set(n.val, clone);
    clone.neighbors = n.neighbors.map(nb => dfs(nb, newVisited));
    return clone;
  };
  return node ? dfs(node, new Map()) : null;
}`,

    Haskell: `import qualified Data.Map as M
data GNode = GNode Int [GNode]
cloneGraph :: GNode -> M.Map Int GNode -> (GNode, M.Map Int GNode)
cloneGraph (GNode v nbrs) visited
  | M.member v visited = (visited M.! v, visited)
  | otherwise =
      let placeholder = GNode v []
          vis' = M.insert v placeholder visited
          (clonedNbrs, vis'') = foldl (\\(acc, vs) n ->
            let (cn, vs') = cloneGraph n vs in (acc ++ [cn], vs'))
            ([], vis') nbrs
      in (GNode v clonedNbrs, vis'')`,

    Elixir: `defmodule CloneGraph do
  def clone(nil), do: nil
  def clone(node), do: elem(dfs(node, %{}), 0)

  defp dfs(%{val: v, neighbors: nbrs}, visited) do
    if Map.has_key?(visited, v) do
      {visited[v], visited}
    else
      clone = %{val: v, neighbors: []}
      vis = Map.put(visited, v, clone)
      {cloned_nbrs, vis2} = Enum.reduce(nbrs, {[], vis}, fn nb, {acc, vs} ->
        {cn, vs2} = dfs(nb, vs)
        {acc ++ [cn], vs2}
      end)
      result = %{clone | neighbors: cloned_nbrs}
      {result, Map.put(vis2, v, result)}
    end
  end
end`,

    Rust: `use std::collections::HashMap;
use std::rc::Rc;
use std::cell::RefCell;

fn clone_graph(node: Option<Rc<RefCell<GNode>>>,
               visited: &mut HashMap<i32, Rc<RefCell<GNode>>>)
  -> Option<Rc<RefCell<GNode>>> {
    node.map(|n| {
        let val = n.borrow().val;
        if let Some(c) = visited.get(&val) { return Rc::clone(c); }
        let clone = Rc::new(RefCell::new(GNode { val, neighbors: vec![] }));
        visited.insert(val, Rc::clone(&clone));
        let nbrs: Vec<_> = n.borrow().neighbors.iter()
            .filter_map(|nb| clone_graph(Some(Rc::clone(nb)), visited)).collect();
        clone.borrow_mut().neighbors = nbrs;
        clone
    })
}`,

    Scala: `case class GNode(val v: Int, var neighbors: List[GNode])
def cloneGraph(node: GNode, visited: Map[Int, GNode] = Map.empty): (GNode, Map[Int, GNode]) = {
  visited.get(node.v) match {
    case Some(c) => (c, visited)
    case None =>
      val clone = GNode(node.v, Nil)
      val vis = visited + (node.v -> clone)
      val (nbrs, vis2) = node.neighbors.foldLeft((List.empty[GNode], vis)) {
        case ((acc, v), nb) =>
          val (cn, v2) = cloneGraph(nb, v)
          (acc :+ cn, v2)
      }
      clone.neighbors = nbrs
      (clone, vis2)
  }
}`,

    OCaml: `let clone_graph node =
  let visited = Hashtbl.create 16 in
  let rec dfs n =
    match Hashtbl.find_opt visited n.v with
    | Some c -> c
    | None ->
      let clone = { v = n.v; neighbors = [] } in
      Hashtbl.add visited n.v clone;
      clone.neighbors <- List.map dfs n.neighbors;
      clone
  in dfs node`,

    Clojure: `(defn clone-graph [node]
  (letfn [(dfs [n visited]
            (if (contains? visited (:val n))
              [(visited (:val n)) visited]
              (let [clone {:val (:val n) :neighbors []}
                    vis (assoc visited (:val n) clone)
                    [nbrs vis2] (reduce (fn [[acc vs] nb]
                                          (let [[cn vs2] (dfs nb vs)]
                                            [(conj acc cn) vs2]))
                                        [[] vis] (:neighbors n))]
                [(assoc clone :neighbors nbrs) vis2])))]
    (first (dfs node {}))))`,

    Lisp: `(defun clone-graph (node &optional (visited (make-hash-table)))
  (or (gethash (car node) visited)
      (let ((clone (list (car node) nil)))
        (setf (gethash (car node) visited) clone)
        (setf (cadr clone)
              (mapcar (lambda (nb) (clone-graph nb visited)) (cadr node)))
        clone)))`,
  },

  // ─── Problem 79: Gas Station (LC 134) ──────────────────────────────────────
  79: {
    TypeScript: `function canCompleteCircuit(gas: number[], cost: number[]): number {
  const diffs = gas.map((g, i) => g - cost[i]);
  const result = diffs.reduce(
    (acc, d, i) => {
      const total = acc.total + d;
      const tank = acc.tank + d;
      return tank < 0
        ? { total, tank: 0, start: i + 1 }
        : { total, tank, start: acc.start };
    },
    { total: 0, tank: 0, start: 0 }
  );
  return result.total >= 0 ? result.start : -1;
}`,

    Haskell: `canCompleteCircuit :: [Int] -> [Int] -> Int
canCompleteCircuit gas cost =
  let diffs = zipWith (-) gas cost
      (total, _, start) = foldl (\\(tot, tank, s) (d, i) ->
        let tot' = tot + d; tank' = tank + d
        in if tank' < 0 then (tot', 0, i + 1) else (tot', tank', s))
        (0, 0, 0) (zip diffs [0..])
  in if total >= 0 then start else -1`,

    Elixir: `defmodule GasStation do
  def can_complete(gas, cost) do
    diffs = Enum.zip(gas, cost) |> Enum.map(fn {g, c} -> g - c end)
    {total, _, start} = diffs |> Enum.with_index()
      |> Enum.reduce({0, 0, 0}, fn {d, i}, {tot, tank, s} ->
        tot2 = tot + d; tank2 = tank + d
        if tank2 < 0, do: {tot2, 0, i + 1}, else: {tot2, tank2, s}
      end)
    if total >= 0, do: start, else: -1
  end
end`,

    Rust: `fn can_complete_circuit(gas: Vec<i32>, cost: Vec<i32>) -> i32 {
    let (total, _, start) = gas.iter().zip(cost.iter()).enumerate()
        .fold((0, 0, 0), |(tot, tank, s), (i, (g, c))| {
            let d = g - c;
            let (tot2, tank2) = (tot + d, tank + d);
            if tank2 < 0 { (tot2, 0, i as i32 + 1) } else { (tot2, tank2, s) }
        });
    if total >= 0 { start } else { -1 }
}`,

    Scala: `def canCompleteCircuit(gas: List[Int], cost: List[Int]): Int = {
  val (total, _, start) = gas.zip(cost).zipWithIndex.foldLeft((0, 0, 0)) {
    case ((tot, tank, s), ((g, c), i)) =>
      val d = g - c; val (t2, tk2) = (tot + d, tank + d)
      if (tk2 < 0) (t2, 0, i + 1) else (t2, tk2, s)
  }
  if (total >= 0) start else -1
}`,

    OCaml: `let can_complete_circuit gas cost =
  let diffs = List.map2 (-) gas cost in
  let (total, _, start) = List.fold_left (fun (tot, tank, s) (d, i) ->
    let tot' = tot + d and tank' = tank + d in
    if tank' < 0 then (tot', 0, i + 1) else (tot', tank', s))
    (0, 0, 0) (List.mapi (fun i d -> (d, i)) diffs) in
  if total >= 0 then start else -1`,

    Clojure: `(defn can-complete-circuit [gas cost]
  (let [[total _ start]
        (reduce (fn [[tot tank s] [d i]]
                  (let [tot2 (+ tot d) tank2 (+ tank d)]
                    (if (neg? tank2) [tot2 0 (inc i)] [tot2 tank2 s])))
                [0 0 0]
                (map-indexed (fn [i [g c]] [(- g c) i]) (map vector gas cost)))]
    (if (>= total 0) start -1)))`,

    Lisp: `(defun can-complete-circuit (gas cost)
  (let ((total 0) (tank 0) (start 0))
    (loop for g in gas for c in cost for i from 0
          do (let ((d (- g c)))
               (incf total d) (incf tank d)
               (when (< tank 0) (setf tank 0 start (1+ i)))))
    (if (>= total 0) start -1)))`,
  },

  // ─── Problem 80: Single Number (LC 136) ────────────────────────────────────
  80: {
    TypeScript: `function singleNumber(nums: number[]): number {
  return nums.reduce((acc, n) => acc ^ n, 0);
}`,

    Haskell: `import Data.Bits (xor)
singleNumber :: [Int] -> Int
singleNumber = foldl xor 0`,

    Elixir: `defmodule SingleNumber do
  def single(nums) do
    Enum.reduce(nums, 0, fn n, acc -> Bitwise.bxor(acc, n) end)
  end
end`,

    Rust: `fn single_number(nums: Vec<i32>) -> i32 {
    nums.iter().fold(0, |acc, &n| acc ^ n)
}`,

    Scala: `def singleNumber(nums: List[Int]): Int =
  nums.foldLeft(0)(_ ^ _)`,

    OCaml: `let single_number nums =
  List.fold_left (lxor) 0 nums`,

    Clojure: `(defn single-number [nums]
  (reduce bit-xor 0 nums))`,

    Lisp: `(defun single-number (nums)
  (reduce #'logxor nums :initial-value 0))`,
  },

  // ─── Problem 81: Word Break (LC 139) ───────────────────────────────────────
  81: {
    TypeScript: `function wordBreak(s: string, wordDict: string[]): boolean {
  const dict = new Set(wordDict);
  const dp = Array.from({ length: s.length + 1 }, (_, i) =>
    i === 0 ? true : false
  );
  const solve = (i: number): boolean[] => {
    if (i > s.length) return dp;
    dp[i] = Array.from({ length: i }, (_, j) => j).some(
      j => dp[j] && dict.has(s.slice(j, i))
    );
    return solve(i + 1);
  };
  return solve(1)[s.length];
}`,

    Haskell: `import qualified Data.Set as S
wordBreak :: String -> [String] -> Bool
wordBreak s dict =
  let ds = S.fromList dict
      n = length s
      dp = map (\\i -> i == 0 || any (\\j -> dp !! j &&
           S.member (take (i - j) (drop j s)) ds) [0..i-1]) [0..n]
  in dp !! n`,

    Elixir: `defmodule WordBreak do
  def word_break(s, word_dict) do
    dict = MapSet.new(word_dict)
    n = String.length(s)
    dp = Enum.reduce(1..n, %{0 => true}, fn i, dp ->
      val = Enum.any?(0..(i-1), fn j ->
        Map.get(dp, j, false) and MapSet.member?(dict, String.slice(s, j, i - j))
      end)
      Map.put(dp, i, val)
    end)
    Map.get(dp, n, false)
  end
end`,

    Rust: `use std::collections::HashSet;
fn word_break(s: &str, word_dict: Vec<&str>) -> bool {
    let dict: HashSet<&str> = word_dict.into_iter().collect();
    let n = s.len();
    let dp = (0..=n).fold(vec![false; n + 1], |mut dp, i| {
        if i == 0 { dp[0] = true; }
        else { dp[i] = (0..i).any(|j| dp[j] && dict.contains(&s[j..i])); }
        dp
    });
    dp[n]
}`,

    Scala: `def wordBreak(s: String, wordDict: List[String]): Boolean = {
  val dict = wordDict.toSet
  val n = s.length
  val dp = (1 to n).foldLeft(Vector(true) ++ Vector.fill(n)(false)) { (dp, i) =>
    dp.updated(i, (0 until i).exists(j => dp(j) && dict.contains(s.substring(j, i))))
  }
  dp(n)
}`,

    OCaml: `let word_break s word_dict =
  let dict = List.fold_left (fun s w -> StringSet.add w s) StringSet.empty word_dict in
  let n = String.length s in
  let dp = Array.make (n + 1) false in
  dp.(0) <- true;
  for i = 1 to n do
    dp.(i) <- List.init i Fun.id
      |> List.exists (fun j -> dp.(j) && StringSet.mem (String.sub s j (i - j)) dict)
  done;
  dp.(n)`,

    Clojure: `(defn word-break [s word-dict]
  (let [dict (set word-dict)
        n (count s)]
    (get (reduce (fn [dp i]
                   (assoc dp i (some #(and (dp %) (dict (subs s % i)))
                                     (range i))))
                 {0 true} (range 1 (inc n)))
         n false)))`,

    Lisp: `(defun word-break (s word-dict)
  (let* ((dict (make-hash-table :test 'equal))
         (n (length s))
         (dp (make-array (1+ n) :initial-element nil)))
    (dolist (w word-dict) (setf (gethash w dict) t))
    (setf (aref dp 0) t)
    (loop for i from 1 to n do
      (setf (aref dp i)
            (loop for j from 0 below i
                  thereis (and (aref dp j)
                               (gethash (subseq s j i) dict)))))
    (aref dp n)))`,
  },

  // ─── Problem 82: Linked List Cycle (LC 141) ────────────────────────────────
  82: {
    TypeScript: `type ListNode = { val: number; next: ListNode | null };

function hasCycle(head: ListNode | null): boolean {
  const detect = (slow: ListNode | null, fast: ListNode | null): boolean => {
    if (!fast || !fast.next) return false;
    if (slow === fast) return true;
    return detect(slow!.next, fast.next.next);
  };
  return head ? detect(head, head.next) : false;
}`,

    Haskell: `-- Floyd's cycle detection via set tracking (pure)
import qualified Data.Set as S
hasCycle :: Eq a => [a] -> Int -> Bool
hasCycle nodes startIdx = go startIdx S.empty
  where
    go idx visited
      | idx < 0 || idx >= length nodes = False
      | S.member idx visited = True
      | otherwise = go (nextOf idx) (S.insert idx visited)`,

    Elixir: `defmodule CycleDetect do
  def has_cycle?(nil), do: false
  def has_cycle?(head), do: detect(head, next(head))

  defp detect(_, nil), do: false
  defp detect(slow, fast) when slow == fast, do: true
  defp detect(slow, fast) do
    case next(fast) do
      nil -> false
      fast2 -> detect(next(slow), next(fast2))
    end
  end

  defp next(nil), do: nil
  defp next(%{next: n}), do: n
end`,

    Rust: `fn has_cycle(head: Option<&ListNode>) -> bool {
    let mut slow = head;
    let mut fast = head;
    loop {
        slow = slow.and_then(|n| n.next.as_deref());
        fast = fast.and_then(|n| n.next.as_deref())
                   .and_then(|n| n.next.as_deref());
        match (slow, fast) {
            (Some(s), Some(f)) if std::ptr::eq(s, f) => return true,
            (_, None) => return false,
            _ => {}
        }
    }
}`,

    Scala: `def hasCycle(head: ListNode): Boolean = {
  @annotation.tailrec
  def detect(slow: ListNode, fast: ListNode): Boolean = {
    if (fast == null || fast.next == null) false
    else if (slow eq fast) true
    else detect(slow.next, fast.next.next)
  }
  if (head == null) false else detect(head, head.next)
}`,

    OCaml: `let has_cycle head =
  let rec detect slow fast = match fast with
    | None -> false
    | Some f -> (match f.next with
      | None -> false
      | Some fn_ ->
        if slow == Some f then true
        else detect (Option.bind slow (fun s -> s.next)) fn_.next)
  in detect (Some head) (Option.bind (Some head) (fun h -> h.next))`,

    Clojure: `(defn has-cycle? [head]
  (loop [slow head fast (when head (:next head))]
    (cond
      (or (nil? fast) (nil? (:next fast))) false
      (identical? slow fast) true
      :else (recur (:next slow) (:next (:next fast))))))`,

    Lisp: `(defun has-cycle (head)
  (labels ((detect (slow fast)
             (cond
               ((or (null fast) (null (cdr fast))) nil)
               ((eq slow fast) t)
               (t (detect (cdr slow) (cddr fast))))))
    (if (null head) nil (detect head (cdr head)))))`,
  },

  // ─── Problem 83: Reorder List (LC 143) ────────────────────────────────────
  83: {
    TypeScript: `function reorderList(head: number[]): number[] {
  if (head.length <= 2) return head;
  const mid = Math.floor(head.length / 2);
  const first = head.slice(0, mid);
  const second = head.slice(mid).reverse();
  const merge = (a: number[], b: number[]): number[] =>
    a.length === 0 ? b : b.length === 0 ? a : [a[0], b[0], ...merge(a.slice(1), b.slice(1))];
  return merge(first, second);
}`,

    Haskell: `reorderList :: [a] -> [a]
reorderList xs =
  let n = length xs
      mid = n \`div\` 2
      first = take mid xs
      second = reverse (drop mid xs)
      merge [] bs = bs
      merge as [] = as
      merge (a:as') (b:bs') = a : b : merge as' bs'
  in merge first second`,

    Elixir: `defmodule ReorderList do
  def reorder(list) do
    mid = div(length(list), 2)
    {first, second} = Enum.split(list, mid)
    merge(first, Enum.reverse(second))
  end

  defp merge([], b), do: b
  defp merge(a, []), do: a
  defp merge([a | as_], [b | bs]), do: [a, b | merge(as_, bs)]
end`,

    Rust: `fn reorder_list(head: Vec<i32>) -> Vec<i32> {
    let mid = head.len() / 2;
    let first = &head[..mid];
    let second: Vec<_> = head[mid..].iter().rev().cloned().collect();
    first.iter().zip(second.iter())
        .flat_map(|(&a, &b)| vec![a, b])
        .chain(if first.len() < second.len() { vec![second[second.len()-1]] } else { vec![] })
        .collect()
}`,

    Scala: `def reorderList(list: List[Int]): List[Int] = {
  val mid = list.length / 2
  val (first, secondHalf) = list.splitAt(mid)
  val second = secondHalf.reverse
  def merge(a: List[Int], b: List[Int]): List[Int] = (a, b) match {
    case (Nil, bs) => bs
    case (as_, Nil) => as_
    case (ah :: at, bh :: bt) => ah :: bh :: merge(at, bt)
  }
  merge(first, second)
}`,

    OCaml: `let reorder_list lst =
  let n = List.length lst in
  let mid = n / 2 in
  let first = List.filteri (fun i _ -> i < mid) lst in
  let second = List.rev (List.filteri (fun i _ -> i >= mid) lst) in
  let rec merge a b = match a, b with
    | [], bs -> bs | as_, [] -> as_
    | ah :: at, bh :: bt -> ah :: bh :: merge at bt
  in merge first second`,

    Clojure: `(defn reorder-list [lst]
  (let [mid (quot (count lst) 2)
        first (take mid lst)
        second (reverse (drop mid lst))]
    (letfn [(merge [a b]
              (cond (empty? a) b
                    (empty? b) a
                    :else (concat [(first a) (first b)]
                                  (merge (rest a) (rest b)))))]
      (merge first second))))`,

    Lisp: `(defun reorder-list (lst)
  (let* ((mid (floor (length lst) 2))
         (first-half (subseq lst 0 mid))
         (second-half (reverse (subseq lst mid))))
    (labels ((merge-lists (a b)
               (cond ((null a) b) ((null b) a)
                     (t (cons (car a) (cons (car b)
                         (merge-lists (cdr a) (cdr b))))))))
      (merge-lists first-half second-half))))`,
  },

  // ─── Problem 84: LRU Cache (LC 146) ───────────────────────────────────────
  84: {
    TypeScript: `type LRU<V> = { capacity: number; order: number[]; cache: Map<number, V> };

const lruCreate = <V>(cap: number): LRU<V> =>
  ({ capacity: cap, order: [], cache: new Map() });

const lruGet = <V>(lru: LRU<V>, key: number): [V | undefined, LRU<V>] => {
  if (!lru.cache.has(key)) return [undefined, lru];
  const val = lru.cache.get(key)!;
  const newOrder = [...lru.order.filter(k => k !== key), key];
  return [val, { ...lru, order: newOrder }];
};

const lruPut = <V>(lru: LRU<V>, key: number, value: V): LRU<V> => {
  const filtered = lru.order.filter(k => k !== key);
  const newOrder = [...filtered, key];
  const newCache = new Map(lru.cache).set(key, value);
  if (newOrder.length > lru.capacity) {
    const evict = newOrder[0];
    newCache.delete(evict);
    return { capacity: lru.capacity, order: newOrder.slice(1), cache: newCache };
  }
  return { capacity: lru.capacity, order: newOrder, cache: newCache };
};`,

    Haskell: `import qualified Data.Map as M

data LRU k v = LRU Int [k] (M.Map k v) deriving Show

lruNew :: Int -> LRU k v
lruNew cap = LRU cap [] M.empty

lruGet :: Ord k => k -> LRU k v -> (Maybe v, LRU k v)
lruGet key (LRU cap order m) = case M.lookup key m of
  Nothing -> (Nothing, LRU cap order m)
  Just v  -> (Just v, LRU cap (filter (/= key) order ++ [key]) m)

lruPut :: Ord k => k -> v -> LRU k v -> LRU k v
lruPut key val (LRU cap order m) =
  let order' = filter (/= key) order ++ [key]
      m' = M.insert key val m
  in if length order' > cap
     then LRU cap (tail order') (M.delete (head order') m')
     else LRU cap order' m'`,

    Elixir: `defmodule LRU do
  defstruct cap: 0, order: [], cache: %{}

  def new(cap), do: %LRU{cap: cap}

  def get(%LRU{cache: cache, order: order} = lru, key) do
    case Map.fetch(cache, key) do
      :error -> {nil, lru}
      {:ok, val} ->
        new_order = Enum.filter(order, &(&1 != key)) ++ [key]
        {val, %{lru | order: new_order}}
    end
  end

  def put(%LRU{cap: cap, order: order, cache: cache}, key, val) do
    filtered = Enum.filter(order, &(&1 != key)) ++ [key]
    new_cache = Map.put(cache, key, val)
    if length(filtered) > cap do
      [evict | rest] = filtered
      %LRU{cap: cap, order: rest, cache: Map.delete(new_cache, evict)}
    else
      %LRU{cap: cap, order: filtered, cache: new_cache}
    end
  end
end`,

    Rust: `use std::collections::HashMap;
struct LRU<V> { cap: usize, order: Vec<i32>, cache: HashMap<i32, V> }
impl<V: Clone> LRU<V> {
    fn new(cap: usize) -> Self { LRU { cap, order: vec![], cache: HashMap::new() } }
    fn get(&self, key: i32) -> (Option<V>, Self) {
        match self.cache.get(&key) {
            None => (None, LRU { cap: self.cap,
                order: self.order.clone(), cache: self.cache.clone() }),
            Some(v) => {
                let mut order: Vec<_> = self.order.iter().filter(|&&k| k != key).cloned().collect();
                order.push(key);
                (Some(v.clone()), LRU { cap: self.cap, order, cache: self.cache.clone() })
            }
        }
    }
    fn put(&self, key: i32, val: V) -> Self {
        let mut order: Vec<_> = self.order.iter().filter(|&&k| k != key).cloned().collect();
        order.push(key);
        let mut cache = self.cache.clone();
        cache.insert(key, val);
        if order.len() > self.cap {
            cache.remove(&order[0]);
            LRU { cap: self.cap, order: order[1..].to_vec(), cache }
        } else { LRU { cap: self.cap, order, cache } }
    }
}`,

    Scala: `case class LRU[V](cap: Int, order: List[Int] = Nil, cache: Map[Int, V] = Map.empty[Int, V]) {
  def get(key: Int): (Option[V], LRU[V]) = cache.get(key) match {
    case None => (None, this)
    case Some(v) => (Some(v), copy(order = order.filterNot(_ == key) :+ key))
  }
  def put(key: Int, value: V): LRU[V] = {
    val newOrder = order.filterNot(_ == key) :+ key
    val newCache = cache + (key -> value)
    if (newOrder.length > cap)
      LRU(cap, newOrder.tail, newCache - newOrder.head)
    else LRU(cap, newOrder, newCache)
  }
}`,

    OCaml: `type ('k, 'v) lru = { cap: int; order: 'k list; cache: ('k * 'v) list }

let lru_new cap = { cap; order = []; cache = [] }

let lru_get key lru = match List.assoc_opt key lru.cache with
  | None -> (None, lru)
  | Some v ->
    let order = List.filter ((<>) key) lru.order @ [key] in
    (Some v, { lru with order })

let lru_put key value lru =
  let order = List.filter ((<>) key) lru.order @ [key] in
  let cache = (key, value) :: List.remove_assoc key lru.cache in
  if List.length order > lru.cap then
    let evict = List.hd order in
    { lru with order = List.tl order; cache = List.remove_assoc evict cache }
  else { lru with order; cache }`,

    Clojure: `(defn lru-new [cap] {:cap cap :order [] :cache {}})

(defn lru-get [{:keys [order cache] :as lru} key]
  (if-let [val (cache key)]
    [val (assoc lru :order (conj (vec (remove #{key} order)) key))]
    [nil lru]))

(defn lru-put [{:keys [cap order cache]} key val]
  (let [ord (conj (vec (remove #{key} order)) key)
        c (assoc cache key val)]
    (if (> (count ord) cap)
      {:cap cap :order (vec (rest ord)) :cache (dissoc c (first ord))}
      {:cap cap :order ord :cache c})))`,

    Lisp: `(defun lru-new (cap) (list cap nil nil))

(defun lru-get (lru key)
  (destructuring-bind (cap order cache) lru
    (let ((entry (assoc key cache)))
      (if (null entry) (values nil lru)
        (let ((new-order (append (remove key order) (list key))))
          (values (cdr entry) (list cap new-order cache)))))))

(defun lru-put (lru key val)
  (destructuring-bind (cap order cache) lru
    (let* ((new-order (append (remove key order) (list key)))
           (new-cache (cons (cons key val) (remove key cache :key #'car))))
      (if (> (length new-order) cap)
        (let ((evict (car new-order)))
          (list cap (cdr new-order) (remove evict new-cache :key #'car)))
        (list cap new-order new-cache)))))`,
  },

  // ─── Problem 85: Find K Closest Elements (LC 658) ─────────────────────────
  85: {
    TypeScript: `function findClosestElements(arr: number[], k: number, x: number): number[] {
  const go = (lo: number, hi: number): number[] => {
    if (hi - lo === k) return arr.slice(lo, hi);
    return Math.abs(arr[lo] - x) <= Math.abs(arr[hi - 1] - x)
      ? go(lo, hi - 1)
      : go(lo + 1, hi);
  };
  return go(0, arr.length);
}`,

    Haskell: `findClosestElements :: [Int] -> Int -> Int -> [Int]
findClosestElements arr k x = go 0 (length arr)
  where
    v = (arr !!)
    go lo hi
      | hi - lo == k = take k (drop lo arr)
      | abs (v lo - x) <= abs (v (hi-1) - x) = go lo (hi-1)
      | otherwise = go (lo+1) hi`,

    Elixir: `defmodule ClosestK do
  def find(arr, k, x) do
    vec = :array.from_list(arr)
    go(0, :array.size(vec), k, x, vec)
  end

  defp go(lo, hi, k, _, vec) when hi - lo == k do
    Enum.map(lo..(hi-1), &:array.get(&1, vec))
  end
  defp go(lo, hi, k, x, vec) do
    if abs(:array.get(lo, vec) - x) <= abs(:array.get(hi - 1, vec) - x),
      do: go(lo, hi - 1, k, x, vec),
      else: go(lo + 1, hi, k, x, vec)
  end
end`,

    Rust: `fn find_closest_elements(arr: &[i32], k: usize, x: i32) -> Vec<i32> {
    let (mut lo, mut hi) = (0usize, arr.len());
    while hi - lo > k {
        if (arr[lo] - x).abs() <= (arr[hi - 1] - x).abs() { hi -= 1; }
        else { lo += 1; }
    }
    arr[lo..hi].to_vec()
}`,

    Scala: `def findClosestElements(arr: Vector[Int], k: Int, x: Int): Vector[Int] = {
  @annotation.tailrec
  def go(lo: Int, hi: Int): Vector[Int] = {
    if (hi - lo == k) arr.slice(lo, hi)
    else if ((arr(lo) - x).abs <= (arr(hi-1) - x).abs) go(lo, hi - 1)
    else go(lo + 1, hi)
  }
  go(0, arr.length)
}`,

    OCaml: `let find_closest_elements arr k x =
  let a = Array.of_list arr in
  let rec go lo hi =
    if hi - lo = k then Array.to_list (Array.sub a lo k)
    else if abs (a.(lo) - x) <= abs (a.(hi-1) - x) then go lo (hi-1)
    else go (lo+1) hi
  in go 0 (Array.length a)`,

    Clojure: `(defn find-closest-elements [arr k x]
  (loop [lo 0 hi (count arr)]
    (if (= (- hi lo) k) (subvec (vec arr) lo hi)
      (if (<= (Math/abs (- (arr lo) x)) (Math/abs (- (arr (dec hi)) x)))
        (recur lo (dec hi))
        (recur (inc lo) hi)))))`,

    Lisp: `(defun find-closest-elements (arr k x)
  (let ((v (coerce arr 'vector)))
    (labels ((go (lo hi)
               (if (= (- hi lo) k)
                 (coerce (subseq v lo hi) 'list)
                 (if (<= (abs (- (aref v lo) x)) (abs (- (aref v (1- hi)) x)))
                   (go lo (1- hi))
                   (go (1+ lo) hi)))))
      (go 0 (length v)))))`,
  },

  // ─── Problem 86: Sort List (LC 148) ───────────────────────────────────────────
  86: {
    TypeScript: `// Merge sort on linked list – purely functional
type LNode = { val: number; next: LNode | null };

function sortList(head: LNode | null): LNode | null {
  if (!head || !head.next) return head;
  const toList = (h: LNode | null): number[] =>
    h ? [h.val, ...toList(h.next)] : [];
  const fromList = (xs: number[]): LNode | null =>
    xs.reduceRight<LNode | null>((acc, v) => ({ val: v, next: acc }), null);
  const merge = (a: number[], b: number[]): number[] =>
    a.length === 0 ? b : b.length === 0 ? a
    : a[0] <= b[0] ? [a[0], ...merge(a.slice(1), b)]
    : [b[0], ...merge(a, b.slice(1))];
  const msort = (xs: number[]): number[] => {
    if (xs.length <= 1) return xs;
    const mid = Math.floor(xs.length / 2);
    return merge(msort(xs.slice(0, mid)), msort(xs.slice(mid)));
  };
  return fromList(msort(toList(head)));
}`,

    Haskell: `sortList :: [Int] -> [Int]
sortList [] = []
sortList [x] = [x]
sortList xs = merge (sortList l) (sortList r)
  where (l, r) = splitAt (length xs \\\`div\\\` 2) xs
        merge [] b = b
        merge a [] = a
        merge (a:as') (b:bs')
          | a <= b   = a : merge as' (b:bs')
          | otherwise = b : merge (a:as') bs'`,

    Elixir: `defmodule SortList do
  def sort([]), do: []
  def sort([x]), do: [x]
  def sort(list) do
    {l, r} = Enum.split(list, div(length(list), 2))
    merge(sort(l), sort(r))
  end

  defp merge([], b), do: b
  defp merge(a, []), do: a
  defp merge([a | as_], [b | bs]) when a <= b, do: [a | merge(as_, [b | bs])]
  defp merge(a, [b | bs]), do: [b | merge(a, bs)]
end`,

    Rust: `fn sort_list(xs: &[i32]) -> Vec<i32> {
    if xs.len() <= 1 { return xs.to_vec(); }
    let mid = xs.len() / 2;
    let (l, r) = (sort_list(&xs[..mid]), sort_list(&xs[mid..]));
    let mut res = Vec::new();
    let (mut i, mut j) = (0, 0);
    while i < l.len() && j < r.len() {
        if l[i] <= r[j] { res.push(l[i]); i += 1; }
        else { res.push(r[j]); j += 1; }
    }
    res.extend_from_slice(&l[i..]);
    res.extend_from_slice(&r[j..]);
    res
}`,

    Scala: `def sortList(xs: List[Int]): List[Int] = xs match {
  case Nil | _ :: Nil => xs
  case _ =>
    val (l, r) = xs.splitAt(xs.length / 2)
    def merge(a: List[Int], b: List[Int]): List[Int] = (a, b) match {
      case (Nil, _) => b
      case (_, Nil) => a
      case (x :: xs2, y :: ys) =>
        if (x <= y) x :: merge(xs2, b) else y :: merge(a, ys)
    }
    merge(sortList(l), sortList(r))
}`,

    OCaml: `let rec sort_list = function
  | [] -> []
  | [x] -> [x]
  | xs ->
    let rec split l r = function
      | [] -> (l, r) | [x] -> (x :: l, r)
      | a :: b :: t -> split (a :: l) (b :: r) t in
    let (l, r) = split [] [] xs in
    let rec merge a b = match a, b with
      | [], b -> b | a, [] -> a
      | x :: xs, y :: ys ->
        if x <= y then x :: merge xs (y :: ys)
        else y :: merge (x :: xs) ys in
    merge (sort_list l) (sort_list r)`,

    Clojure: `(defn sort-list [xs]
  (if (<= (count xs) 1) xs
    (let [mid (quot (count xs) 2)
          l (sort-list (take mid xs))
          r (sort-list (drop mid xs))]
      (loop [a l b r acc []]
        (cond (empty? a) (into acc b)
              (empty? b) (into acc a)
              (<= (first a) (first b)) (recur (rest a) b (conj acc (first a)))
              :else (recur a (rest b) (conj acc (first b))))))))`,

    Lisp: `(defun sort-list (xs)
  (if (<= (length xs) 1) xs
    (let* ((mid (floor (length xs) 2))
           (l (sort-list (subseq xs 0 mid)))
           (r (sort-list (subseq xs mid))))
      (labels ((mrg (a b)
                 (cond ((null a) b) ((null b) a)
                       ((<= (car a) (car b)) (cons (car a) (mrg (cdr a) b)))
                       (t (cons (car b) (mrg a (cdr b)))))))
        (mrg l r)))))`,
  },

  // ─── Problem 87: Evaluate Reverse Polish Notation (LC 150) ────────────────────
  87: {
    TypeScript: `function evalRPN(tokens: string[]): number {
  const ops: Record<string, (a: number, b: number) => number> = {
    '+': (a, b) => a + b, '-': (a, b) => a - b,
    '*': (a, b) => a * b, '/': (a, b) => Math.trunc(a / b),
  };
  const result = tokens.reduce<number[]>((stack, t) => {
    if (t in ops) {
      const [b, a] = [stack[stack.length - 1], stack[stack.length - 2]];
      return [...stack.slice(0, -2), ops[t](a, b)];
    }
    return [...stack, Number(t)];
  }, []);
  return result[0];
}`,

    Haskell: `evalRPN :: [String] -> Int
evalRPN = head . foldl step []
  where
    step (b:a:rest) "+" = (a + b) : rest
    step (b:a:rest) "-" = (a - b) : rest
    step (b:a:rest) "*" = (a * b) : rest
    step (b:a:rest) "/" = (a \\\`quot\\\` b) : rest
    step stack n        = read n : stack`,

    Elixir: `defmodule RPN do
  def eval_rpn(tokens) do
    tokens
    |> Enum.reduce([], fn
      "+", [b, a | rest] -> [a + b | rest]
      "-", [b, a | rest] -> [a - b | rest]
      "*", [b, a | rest] -> [a * b | rest]
      "/", [b, a | rest] -> [trunc(a / b) | rest]
      n, stack -> [String.to_integer(n) | stack]
    end)
    |> hd()
  end
end`,

    Rust: `fn eval_rpn(tokens: &[&str]) -> i32 {
    tokens.iter().fold(vec![], |mut stack, &t| {
        match t {
            "+" | "-" | "*" | "/" => {
                let b = stack.pop().unwrap();
                let a = stack.pop().unwrap();
                stack.push(match t {
                    "+" => a + b, "-" => a - b,
                    "*" => a * b, "/" => a / b, _ => 0,
                });
            }
            _ => stack.push(t.parse::<i32>().unwrap()),
        }
        stack
    }).pop().unwrap()
}`,

    Scala: `def evalRPN(tokens: List[String]): Int = {
  tokens.foldLeft(List.empty[Int]) {
    case (b :: a :: rest, "+") => (a + b) :: rest
    case (b :: a :: rest, "-") => (a - b) :: rest
    case (b :: a :: rest, "*") => (a * b) :: rest
    case (b :: a :: rest, "/") => (a / b) :: rest
    case (stack, n) => n.toInt :: stack
  }.head
}`,

    OCaml: `let eval_rpn tokens =
  let step stack t = match stack, t with
    | b :: a :: rest, "+" -> (a + b) :: rest
    | b :: a :: rest, "-" -> (a - b) :: rest
    | b :: a :: rest, "*" -> (a * b) :: rest
    | b :: a :: rest, "/" -> (a / b) :: rest
    | _, n -> int_of_string n :: stack in
  List.fold_left step [] tokens |> List.hd`,

    Clojure: `(defn eval-rpn [tokens]
  (let [ops {"+" + "-" - "*" * "/" quot}]
    (first
      (reduce (fn [stack t]
        (if-let [op (ops t)]
          (let [[b a & rest] stack] (cons (op a b) rest))
          (cons (Integer/parseInt t) stack)))
        () tokens))))`,

    Lisp: `(defun eval-rpn (tokens)
  (let ((ops '(("+" . +) ("-" . -) ("*" . *) ("/" . truncate))))
    (car (reduce (lambda (stack tok)
                   (let ((op (cdr (assoc tok ops :test #'string=))))
                     (if op
                       (let ((b (car stack)) (a (cadr stack)))
                         (cons (funcall op a b) (cddr stack)))
                       (cons (parse-integer tok) stack))))
                 tokens :initial-value nil))))`,
  },

  // ─── Problem 88: Maximum Width of Binary Tree (LC 662) ────────────────────────
  88: {
    TypeScript: `// BFS with position indices – functional style
type TNode = { val: number; left: TNode | null; right: TNode | null };

function widthOfBinaryTree(root: TNode | null): number {
  if (!root) return 0;
  type Level = [TNode, bigint][];
  const bfs = (level: Level, maxW: bigint): bigint => {
    if (level.length === 0) return maxW;
    const w = level[level.length - 1][1] - level[0][1] + 1n;
    const next = level.flatMap(([node, i]) => [
      ...(node.left ? [[node.left, 2n * i] as [TNode, bigint]] : []),
      ...(node.right ? [[node.right, 2n * i + 1n] as [TNode, bigint]] : []),
    ]);
    return bfs(next, w > maxW ? w : maxW);
  };
  return Number(bfs([[root, 0n]], 0n));
}`,

    Haskell: `data Tree a = Nil | Node a (Tree a) (Tree a)

widthOfBinaryTree :: Tree a -> Integer
widthOfBinaryTree Nil = 0
widthOfBinaryTree root = bfs [(root, 0)] 0
  where
    bfs [] mx = mx
    bfs level mx =
      let w = snd (last level) - snd (head level) + 1
          next = concatMap children level
      in bfs next (max mx w)
    children (Nil, _) = []
    children (Node _ l r, i) =
      [(l, 2*i) | notNil l] ++ [(r, 2*i+1) | notNil r]
    notNil Nil = False
    notNil _   = True`,

    Elixir: `defmodule MaxWidth do
  def width(nil), do: 0
  def width(root), do: bfs([{root, 0}], 0)

  defp bfs([], max_w), do: max_w
  defp bfs(level, max_w) do
    {_, first_i} = hd(level)
    {_, last_i} = List.last(level)
    w = last_i - first_i + 1
    next = Enum.flat_map(level, fn
      {%{left: l, right: r}, i} ->
        (if l, do: [{l, 2 * i}], else: []) ++
        (if r, do: [{r, 2 * i + 1}], else: [])
    end)
    bfs(next, max(w, max_w))
  end
end`,

    Rust: `// Uses Vec<(index, &Node)> for functional BFS
fn width_of_binary_tree(root: &Option<Box<Node>>) -> u64 {
    fn bfs(level: Vec<(&Node, u64)>, max_w: u64) -> u64 {
        if level.is_empty() { return max_w; }
        let w = level.last().unwrap().1 - level[0].1 + 1;
        let next: Vec<_> = level.iter().flat_map(|(n, i)| {
            let mut v = vec![];
            if let Some(ref l) = n.left { v.push((l.as_ref(), 2 * i)); }
            if let Some(ref r) = n.right { v.push((r.as_ref(), 2 * i + 1)); }
            v
        }).collect();
        bfs(next, w.max(max_w))
    }
    match root {
        None => 0,
        Some(r) => bfs(vec![(r.as_ref(), 0)], 0),
    }
}`,

    Scala: `def widthOfBinaryTree(root: Option[TreeNode]): Long = {
  def bfs(level: List[(TreeNode, Long)], maxW: Long): Long = level match {
    case Nil => maxW
    case _ =>
      val w = level.last._2 - level.head._2 + 1
      val next = level.flatMap { case (n, i) =>
        List(n.left.map((_, 2 * i)), n.right.map((_, 2 * i + 1))).flatten
      }
      bfs(next, w max maxW)
  }
  root.map(r => bfs(List((r, 0L)), 0L)).getOrElse(0L)
}`,

    OCaml: `let width_of_binary_tree root =
  let rec bfs level max_w = match level with
    | [] -> max_w
    | _ ->
      let w = snd (List.nth level (List.length level - 1))
              - snd (List.hd level) + 1 in
      let next = List.concat_map (fun (n, i) ->
        (match n.left with Some l -> [(l, 2*i)] | None -> [])
        @ (match n.right with Some r -> [(r, 2*i+1)] | None -> [])
      ) level in
      bfs next (max w max_w)
  in match root with None -> 0 | Some r -> bfs [(r, 0)] 0`,

    Clojure: `(defn width-of-binary-tree [root]
  (if (nil? root) 0
    (loop [level [[root 0]] max-w 0]
      (if (empty? level) max-w
        (let [w (- (second (last level)) (second (first level)) -1)
              nxt (mapcat (fn [[n i]]
                    (concat
                      (when (:left n)  [[(:left n) (* 2 i)]])
                      (when (:right n) [[(:right n) (inc (* 2 i))]])))
                    level)]
          (recur nxt (max w max-w)))))))`,

    Lisp: `(defun width-of-binary-tree (root)
  (if (null root) 0
    (labels ((bfs (level max-w)
               (if (null level) max-w
                 (let* ((w (1+ (- (cadar (last level)) (cadar level))))
                        (nxt (mapcan (lambda (pair)
                                (let ((n (car pair)) (i (cadr pair)))
                                  (append
                                    (when (node-left n) (list (list (node-left n) (* 2 i))))
                                    (when (node-right n) (list (list (node-right n) (1+ (* 2 i))))))))
                              level)))
                   (bfs nxt (max w max-w))))))
      (bfs (list (list root 0)) 0))))`,
  },

  // ─── Problem 89: Maximum Product Subarray (LC 152) ────────────────────────────
  89: {
    TypeScript: `function maxProduct(nums: number[]): number {
  const [result] = nums.reduce<[number, number, number]>(
    ([best, curMax, curMin], n) => {
      const candidates = [n, curMax * n, curMin * n];
      const hi = Math.max(...candidates);
      const lo = Math.min(...candidates);
      return [Math.max(best, hi), hi, lo];
    },
    [nums[0], nums[0], nums[0]]
  );
  return result;
}`,

    Haskell: `maxProduct :: [Int] -> Int
maxProduct (x:xs) = let (best, _, _) = foldl step (x, x, x) xs in best
  where
    step (best, mx, mn) n =
      let hi = maximum [n, mx * n, mn * n]
          lo = minimum [n, mx * n, mn * n]
      in (max best hi, hi, lo)
maxProduct _ = 0`,

    Elixir: `defmodule MaxProd do
  def max_product([h | t]) do
    {best, _, _} = Enum.reduce(t, {h, h, h}, fn n, {best, mx, mn} ->
      candidates = [n, mx * n, mn * n]
      hi = Enum.max(candidates)
      lo = Enum.min(candidates)
      {max(best, hi), hi, lo}
    end)
    best
  end
end`,

    Rust: `fn max_product(nums: &[i32]) -> i32 {
    let (best, _, _) = nums[1..].iter().fold(
        (nums[0], nums[0], nums[0]),
        |(best, mx, mn), &n| {
            let hi = n.max(mx * n).max(mn * n);
            let lo = n.min(mx * n).min(mn * n);
            (best.max(hi), hi, lo)
        },
    );
    best
}`,

    Scala: `def maxProduct(nums: List[Int]): Int = {
  val (best, _, _) = nums.tail.foldLeft((nums.head, nums.head, nums.head)) {
    case ((best, mx, mn), n) =>
      val hi = Seq(n, mx * n, mn * n).max
      val lo = Seq(n, mx * n, mn * n).min
      (best max hi, hi, lo)
  }
  best
}`,

    OCaml: `let max_product nums =
  let hd = List.hd nums in
  let (best, _, _) = List.fold_left (fun (best, mx, mn) n ->
    let hi = max n (max (mx * n) (mn * n)) in
    let lo = min n (min (mx * n) (mn * n)) in
    (max best hi, hi, lo)
  ) (hd, hd, hd) (List.tl nums) in
  best`,

    Clojure: `(defn max-product [nums]
  (let [[h & t] nums]
    (first
      (reduce (fn [[best mx mn] n]
        (let [hi (max n (* mx n) (* mn n))
              lo (min n (* mx n) (* mn n))]
          [(max best hi) hi lo]))
        [h h h] t))))`,

    Lisp: `(defun max-product (nums)
  (let ((h (car nums)))
    (car (reduce (lambda (acc n)
                   (let* ((best (first acc)) (mx (second acc)) (mn (third acc))
                          (hi (max n (* mx n) (* mn n)))
                          (lo (min n (* mx n) (* mn n))))
                     (list (max best hi) hi lo)))
                 (cdr nums) :initial-value (list h h h)))))`,
  },

  // ─── Problem 90: Find Minimum in Rotated Sorted Array (LC 153) ────────────────
  90: {
    TypeScript: `function findMin(nums: number[]): number {
  const go = (lo: number, hi: number): number => {
    if (lo === hi) return nums[lo];
    const mid = Math.floor((lo + hi) / 2);
    return nums[mid] > nums[hi] ? go(mid + 1, hi) : go(lo, mid);
  };
  return go(0, nums.length - 1);
}`,

    Haskell: `findMin :: [Int] -> Int
findMin xs = go 0 (length xs - 1)
  where
    v = (xs !!)
    go lo hi
      | lo == hi  = v lo
      | v mid > v hi = go (mid + 1) hi
      | otherwise = go lo mid
      where mid = (lo + hi) \\\`div\\\` 2`,

    Elixir: `defmodule FindMin do
  def find_min(nums) do
    arr = :array.from_list(nums)
    go(arr, 0, :array.size(arr) - 1)
  end

  defp go(arr, lo, lo), do: :array.get(lo, arr)
  defp go(arr, lo, hi) do
    mid = div(lo + hi, 2)
    if :array.get(mid, arr) > :array.get(hi, arr),
      do: go(arr, mid + 1, hi),
      else: go(arr, lo, mid)
  end
end`,

    Rust: `fn find_min(nums: &[i32]) -> i32 {
    fn go(nums: &[i32], lo: usize, hi: usize) -> i32 {
        if lo == hi { return nums[lo]; }
        let mid = (lo + hi) / 2;
        if nums[mid] > nums[hi] { go(nums, mid + 1, hi) }
        else { go(nums, lo, mid) }
    }
    go(nums, 0, nums.len() - 1)
}`,

    Scala: `def findMin(nums: Vector[Int]): Int = {
  @annotation.tailrec
  def go(lo: Int, hi: Int): Int = {
    if (lo == hi) nums(lo)
    else {
      val mid = (lo + hi) / 2
      if (nums(mid) > nums(hi)) go(mid + 1, hi) else go(lo, mid)
    }
  }
  go(0, nums.length - 1)
}`,

    OCaml: `let find_min nums =
  let a = Array.of_list nums in
  let rec go lo hi =
    if lo = hi then a.(lo)
    else let mid = (lo + hi) / 2 in
      if a.(mid) > a.(hi) then go (mid + 1) hi else go lo mid
  in go 0 (Array.length a - 1)`,

    Clojure: `(defn find-min [nums]
  (let [v (vec nums)]
    (loop [lo 0 hi (dec (count v))]
      (if (= lo hi) (v lo)
        (let [mid (quot (+ lo hi) 2)]
          (if (> (v mid) (v hi))
            (recur (inc mid) hi)
            (recur lo mid)))))))`,

    Lisp: `(defun find-min (nums)
  (let ((v (coerce nums 'vector)))
    (labels ((go (lo hi)
               (if (= lo hi) (aref v lo)
                 (let ((mid (floor (+ lo hi) 2)))
                   (if (> (aref v mid) (aref v hi))
                     (go (1+ mid) hi) (go lo mid))))))
      (go 0 (1- (length v))))))`,
  },

  // ─── Problem 91: Min Stack (LC 155) ───────────────────────────────────────────
  91: {
    TypeScript: `// Immutable Min Stack using persistent list of (val, currentMin) pairs
type MinStack = ReadonlyArray<readonly [number, number]>;

const minStackPush = (stack: MinStack, x: number): MinStack => {
  const curMin = stack.length === 0 ? x : Math.min(x, stack[stack.length - 1][1]);
  return [...stack, [x, curMin] as const];
};
const minStackPop = (stack: MinStack): MinStack => stack.slice(0, -1);
const minStackTop = (stack: MinStack): number => stack[stack.length - 1][0];
const minStackGetMin = (stack: MinStack): number => stack[stack.length - 1][1];`,

    Haskell: `type MinStack = [(Int, Int)]  -- (value, currentMin)

push :: MinStack -> Int -> MinStack
push [] x = [(x, x)]
push s@((_, m):_) x = (x, min x m) : s

pop :: MinStack -> MinStack
pop = tail

top :: MinStack -> Int
top = fst . head

getMin :: MinStack -> Int
getMin = snd . head`,

    Elixir: `defmodule MinStack do
  def new, do: []

  def push([], x), do: [{x, x}]
  def push([{_, m} | _] = s, x), do: [{x, min(x, m)} | s]

  def pop([_ | rest]), do: rest
  def top([{v, _} | _]), do: v
  def get_min([{_, m} | _]), do: m
end`,

    Rust: `// Immutable min stack as Vec of (val, min) pairs
fn min_stack_push(stack: &[(i32, i32)], x: i32) -> Vec<(i32, i32)> {
    let cur_min = stack.last().map_or(x, |&(_, m)| x.min(m));
    let mut s = stack.to_vec();
    s.push((x, cur_min));
    s
}
fn min_stack_pop(stack: &[(i32, i32)]) -> Vec<(i32, i32)> {
    stack[..stack.len()-1].to_vec()
}
fn min_stack_top(stack: &[(i32, i32)]) -> i32 { stack.last().unwrap().0 }
fn min_stack_get_min(stack: &[(i32, i32)]) -> i32 { stack.last().unwrap().1 }`,

    Scala: `case class MinStack(stack: List[(Int, Int)] = Nil) {
  def push(x: Int): MinStack = {
    val curMin = stack.headOption.map(_._2 min x).getOrElse(x)
    MinStack((x, curMin) :: stack)
  }
  def pop: MinStack = MinStack(stack.tail)
  def top: Int = stack.head._1
  def getMin: Int = stack.head._2
}`,

    OCaml: `type min_stack = (int * int) list

let push stack x =
  let cur_min = match stack with [] -> x | (_, m) :: _ -> min x m in
  (x, cur_min) :: stack

let pop = function _ :: rest -> rest | [] -> []
let top = function (v, _) :: _ -> v | [] -> failwith "empty"
let get_min = function (_, m) :: _ -> m | [] -> failwith "empty"`,

    Clojure: `(defn ms-push [stack x]
  (let [cur-min (if (empty? stack) x (min x (second (peek stack))))]
    (conj stack [x cur-min])))

(defn ms-pop [stack] (pop stack))
(defn ms-top [stack] (first (peek stack)))
(defn ms-get-min [stack] (second (peek stack)))`,

    Lisp: `(defun ms-push (stack x)
  (let ((cur-min (if stack (min x (cadar stack)) x)))
    (cons (list x cur-min) stack)))

(defun ms-pop (stack) (cdr stack))
(defun ms-top (stack) (caar stack))
(defun ms-get-min (stack) (cadar stack))`,
  },

  // ─── Problem 92: Majority Element (LC 169) ───────────────────────────────────
  92: {
    TypeScript: `// Boyer-Moore Voting – functional fold
function majorityElement(nums: number[]): number {
  const [candidate] = nums.reduce<[number, number]>(
    ([cand, count], n) => {
      if (count === 0) return [n, 1];
      return n === cand ? [cand, count + 1] : [cand, count - 1];
    },
    [0, 0]
  );
  return candidate;
}`,

    Haskell: `majorityElement :: [Int] -> Int
majorityElement = fst . foldl step (0, 0)
  where
    step (_, 0) n = (n, 1)
    step (c, k) n = if n == c then (c, k + 1) else (c, k - 1)`,

    Elixir: `defmodule Majority do
  def element(nums) do
    {cand, _} = Enum.reduce(nums, {0, 0}, fn
      n, {_, 0} -> {n, 1}
      n, {c, k} -> if n == c, do: {c, k + 1}, else: {c, k - 1}
    end)
    cand
  end
end`,

    Rust: `fn majority_element(nums: &[i32]) -> i32 {
    nums.iter().fold((0, 0), |(cand, count), &n| {
        if count == 0 { (n, 1) }
        else if n == cand { (cand, count + 1) }
        else { (cand, count - 1) }
    }).0
}`,

    Scala: `def majorityElement(nums: List[Int]): Int =
  nums.foldLeft((0, 0)) { case ((cand, cnt), n) =>
    if (cnt == 0) (n, 1)
    else if (n == cand) (cand, cnt + 1)
    else (cand, cnt - 1)
  }._1`,

    OCaml: `let majority_element nums =
  fst (List.fold_left (fun (cand, cnt) n ->
    if cnt = 0 then (n, 1)
    else if n = cand then (cand, cnt + 1)
    else (cand, cnt - 1)
  ) (0, 0) nums)`,

    Clojure: `(defn majority-element [nums]
  (first (reduce (fn [[cand cnt] n]
    (cond (zero? cnt) [n 1]
          (= n cand) [cand (inc cnt)]
          :else [cand (dec cnt)]))
    [0 0] nums)))`,

    Lisp: `(defun majority-element (nums)
  (car (reduce (lambda (acc n)
                 (let ((cand (car acc)) (cnt (cadr acc)))
                   (cond ((zerop cnt) (list n 1))
                         ((= n cand) (list cand (1+ cnt)))
                         (t (list cand (1- cnt))))))
               nums :initial-value '(0 0))))`,
  },

  // ─── Problem 93: Largest Number (LC 179) ──────────────────────────────────────
  93: {
    TypeScript: `function largestNumber(nums: number[]): string {
  const sorted = [...nums]
    .map(String)
    .sort((a, b) => (b + a).localeCompare(a + b));
  const result = sorted.join('');
  return result[0] === '0' ? '0' : result;
}`,

    Haskell: `import Data.List (sortBy)

largestNumber :: [Int] -> String
largestNumber nums =
  let strs = map show nums
      cmp a b = compare (b ++ a) (a ++ b)
      res = concatMap id (sortBy cmp strs)
  in if head res == '0' then "0" else res`,

    Elixir: `defmodule LargestNum do
  def largest(nums) do
    result = nums
      |> Enum.map(&Integer.to_string/1)
      |> Enum.sort(fn a, b -> a <> b >= b <> a end)
      |> Enum.join()
    if String.starts_with?(result, "0"), do: "0", else: result
  end
end`,

    Rust: `fn largest_number(nums: &[i32]) -> String {
    let mut strs: Vec<String> = nums.iter().map(|n| n.to_string()).collect();
    strs.sort_by(|a, b| format!("{}{}", b, a).cmp(&format!("{}{}", a, b)));
    let res = strs.join("");
    if res.starts_with('0') { "0".to_string() } else { res }
}`,

    Scala: `def largestNumber(nums: List[Int]): String = {
  val strs = nums.map(_.toString).sortWith((a, b) => (a + b) > (b + a))
  val res = strs.mkString
  if (res.startsWith("0")) "0" else res
}`,

    OCaml: `let largest_number nums =
  let strs = List.map string_of_int nums in
  let sorted = List.sort (fun a b -> compare (b ^ a) (a ^ b)) strs in
  let res = String.concat "" sorted in
  if res.[0] = '0' then "0" else res`,

    Clojure: `(defn largest-number [nums]
  (let [strs (map str nums)
        sorted (sort (fn [a b] (compare (str b a) (str a b))) strs)
        res (apply str sorted)]
    (if (= (first res) \\0) "0" res)))`,

    Lisp: `(defun largest-number (nums)
  (let* ((strs (mapcar #'write-to-string nums))
         (sorted (sort (copy-list strs)
                       (lambda (a b)
                         (string> (concatenate 'string a b)
                                  (concatenate 'string b a)))))
         (res (apply #'concatenate 'string sorted)))
    (if (char= (char res 0) #\\0) "0" res)))`,
  },

  // ─── Problem 94: Top K Frequent Words (LC 692) ────────────────────────────────
  94: {
    TypeScript: `function topKFrequent(words: string[], k: number): string[] {
  const freq = words.reduce<Record<string, number>>(
    (acc, w) => ({ ...acc, [w]: (acc[w] ?? 0) + 1 }), {}
  );
  return Object.entries(freq)
    .sort(([wa, ca], [wb, cb]) => cb - ca || wa.localeCompare(wb))
    .slice(0, k)
    .map(([w]) => w);
}`,

    Haskell: `import Data.List (sortBy, group, sort)
import Data.Ord (Down(..))

topKFrequent :: [String] -> Int -> [String]
topKFrequent words k =
  take k
  . map snd
  . sortBy (\\(c1,w1) (c2,w2) -> compare (Down c1, w1) (Down c2, w2))
  . map (\\g -> (length g, head g))
  . group
  . sort
  $ words`,

    Elixir: `defmodule TopKWords do
  def top_k(words, k) do
    words
    |> Enum.frequencies()
    |> Enum.sort_by(fn {w, c} -> {-c, w} end)
    |> Enum.take(k)
    |> Enum.map(&elem(&1, 0))
  end
end`,

    Rust: `use std::collections::HashMap;

fn top_k_frequent(words: &[&str], k: usize) -> Vec<String> {
    let mut freq = HashMap::new();
    for w in words { *freq.entry(*w).or_insert(0i32) += 1; }
    let mut pairs: Vec<_> = freq.into_iter().collect();
    pairs.sort_by(|a, b| b.1.cmp(&a.1).then(a.0.cmp(&b.0)));
    pairs.into_iter().take(k).map(|(w, _)| w.to_string()).collect()
}`,

    Scala: `def topKFrequent(words: List[String], k: Int): List[String] =
  words.groupBy(identity)
    .view.mapValues(_.length).toList
    .sortBy { case (w, c) => (-c, w) }
    .take(k)
    .map(_._1)`,

    OCaml: `let top_k_frequent words k =
  let freq = List.fold_left (fun m w ->
    let c = try List.assoc w m with Not_found -> 0 in
    (w, c + 1) :: List.filter (fun (k, _) -> k <> w) m
  ) [] words in
  freq
  |> List.sort (fun (w1, c1) (w2, c2) ->
    let cc = compare c2 c1 in
    if cc <> 0 then cc else compare w1 w2)
  |> List.filteri (fun i _ -> i < k)
  |> List.map fst`,

    Clojure: `(defn top-k-frequent [words k]
  (->> words
       frequencies
       (sort-by (fn [[w c]] [(- c) w]))
       (take k)
       (map first)))`,

    Lisp: `(defun top-k-frequent (words k)
  (let ((freq (make-hash-table :test #'equal)))
    (dolist (w words)
      (incf (gethash w freq 0)))
    (let ((pairs nil))
      (maphash (lambda (w c) (push (cons w c) pairs)) freq)
      (mapcar #'car
        (subseq (sort pairs (lambda (a b)
                  (or (> (cdr a) (cdr b))
                      (and (= (cdr a) (cdr b))
                           (string< (car a) (car b))))))
                0 k)))))`,
  },

  // ─── Problem 95: Rotate Array (LC 189) ────────────────────────────────────────
  95: {
    TypeScript: `function rotate(nums: number[], k: number): number[] {
  const n = nums.length;
  const shift = k % n;
  return [...nums.slice(n - shift), ...nums.slice(0, n - shift)];
}`,

    Haskell: `rotate :: [a] -> Int -> [a]
rotate xs k = let n = length xs
                  s = k \\\`mod\\\` n
              in drop (n - s) xs ++ take (n - s) xs`,

    Elixir: `defmodule RotateArr do
  def rotate(nums, k) do
    n = length(nums)
    s = rem(k, n)
    Enum.drop(nums, n - s) ++ Enum.take(nums, n - s)
  end
end`,

    Rust: `fn rotate(nums: &[i32], k: usize) -> Vec<i32> {
    let n = nums.len();
    let s = k % n;
    [&nums[n - s..], &nums[..n - s]].concat()
}`,

    Scala: `def rotate[A](nums: Vector[A], k: Int): Vector[A] = {
  val n = nums.length
  val s = k % n
  nums.drop(n - s) ++ nums.take(n - s)
}`,

    OCaml: `let rotate nums k =
  let n = List.length nums in
  let s = k mod n in
  let rec drop i = function [] -> [] | _ :: t as l -> if i = 0 then l else drop (i-1) t in
  let rec take i = function _ when i = 0 -> [] | [] -> [] | h :: t -> h :: take (i-1) t in
  drop (n - s) nums @ take (n - s) nums`,

    Clojure: `(defn rotate [nums k]
  (let [n (count nums) s (mod k n)]
    (concat (drop (- n s) nums) (take (- n s) nums))))`,

    Lisp: `(defun rotate-array (nums k)
  (let* ((n (length nums)) (s (mod k n)))
    (append (nthcdr (- n s) nums) (subseq nums 0 (- n s)))))`,
  },

  // ─── Problem 96: Reverse Bits (LC 190) ────────────────────────────────────────
  96: {
    TypeScript: `function reverseBits(n: number): number {
  return Array.from({ length: 32 }).reduce<[number, number]>(
    ([result, num], _, i) => [
      (result | ((num & 1) << (31 - i))) >>> 0,
      num >>> 1
    ],
    [0, n]
  )[0];
}`,

    Haskell: `import Data.Bits

reverseBits :: Int -> Int
reverseBits n = foldl step 0 [0..31]
  where step acc i = acc .|. (((n \\\`shiftR\\\` i) .&. 1) \\\`shiftL\\\` (31 - i))`,

    Elixir: `defmodule RevBits do
  def reverse_bits(n) do
    Enum.reduce(0..31, 0, fn i, acc ->
      import Bitwise
      acc ||| ((n >>> i &&& 1) <<< (31 - i))
    end)
  end
end`,

    Rust: `fn reverse_bits(n: u32) -> u32 {
    (0..32).fold(0u32, |acc, i| acc | (((n >> i) & 1) << (31 - i)))
}`,

    Scala: `def reverseBits(n: Int): Int =
  (0 until 32).foldLeft(0) { (acc, i) =>
    acc | (((n >>> i) & 1) << (31 - i))
  }`,

    OCaml: `let reverse_bits n =
  List.init 32 Fun.id
  |> List.fold_left (fun acc i ->
    acc lor (((n lsr i) land 1) lsl (31 - i))
  ) 0`,

    Clojure: `(defn reverse-bits [n]
  (reduce (fn [acc i]
    (bit-or acc (bit-shift-left (bit-and (unsigned-bit-shift-right n i) 1) (- 31 i))))
    0 (range 32)))`,

    Lisp: `(defun reverse-bits (n)
  (reduce (lambda (acc i)
            (logior acc (ash (logand (ash n (- i)) 1) (- 31 i))))
          (loop for i below 32 collect i) :initial-value 0))`,
  },

  // ─── Problem 97: Number of 1 Bits (LC 191) ───────────────────────────────────
  97: {
    TypeScript: `function hammingWeight(n: number): number {
  const go = (num: number, count: number): number =>
    num === 0 ? count : go(num >>> 1, count + (num & 1));
  return go(n, 0);
}`,

    Haskell: `import Data.Bits

hammingWeight :: Int -> Int
hammingWeight 0 = 0
hammingWeight n = (n .&. 1) + hammingWeight (shiftR n 1)`,

    Elixir: `defmodule HammingWeight do
  import Bitwise
  def count(0), do: 0
  def count(n), do: (n &&& 1) + count(n >>> 1)
end`,

    Rust: `fn hamming_weight(n: u32) -> u32 {
    if n == 0 { 0 } else { (n & 1) + hamming_weight(n >> 1) }
}`,

    Scala: `@annotation.tailrec
def hammingWeight(n: Int, acc: Int = 0): Int =
  if (n == 0) acc else hammingWeight(n >>> 1, acc + (n & 1))`,

    OCaml: `let rec hamming_weight = function
  | 0 -> 0
  | n -> (n land 1) + hamming_weight (n lsr 1)`,

    Clojure: `(defn hamming-weight [n]
  (loop [n n cnt 0]
    (if (zero? n) cnt
      (recur (unsigned-bit-shift-right n 1) (+ cnt (bit-and n 1))))))`,

    Lisp: `(defun hamming-weight (n)
  (if (zerop n) 0
    (+ (logand n 1) (hamming-weight (ash n -1)))))`,
  },

  // ─── Problem 98: House Robber (LC 198) ────────────────────────────────────────
  98: {
    TypeScript: `function rob(nums: number[]): number {
  const [a] = nums.reduce<[number, number]>(
    ([prev1, prev2], n) => [Math.max(prev1, prev2 + n), prev1],
    [0, 0]
  );
  return a;
}`,

    Haskell: `rob :: [Int] -> Int
rob = fst . foldl (\\(prev1, prev2) n -> (max prev1 (prev2 + n), prev1)) (0, 0)`,

    Elixir: `defmodule Robber do
  def rob(nums) do
    {prev1, _} = Enum.reduce(nums, {0, 0}, fn n, {p1, p2} ->
      {max(p1, p2 + n), p1}
    end)
    prev1
  end
end`,

    Rust: `fn rob(nums: &[i32]) -> i32 {
    nums.iter().fold((0, 0), |(p1, p2), &n| (p1.max(p2 + n), p1)).0
}`,

    Scala: `def rob(nums: List[Int]): Int =
  nums.foldLeft((0, 0)) { case ((p1, p2), n) =>
    (p1 max (p2 + n), p1)
  }._1`,

    OCaml: `let rob nums =
  fst (List.fold_left (fun (p1, p2) n -> (max p1 (p2 + n), p1)) (0, 0) nums)`,

    Clojure: `(defn rob [nums]
  (first (reduce (fn [[p1 p2] n] [(max p1 (+ p2 n)) p1]) [0 0] nums)))`,

    Lisp: `(defun rob (nums)
  (car (reduce (lambda (acc n)
                 (list (max (car acc) (+ (cadr acc) n)) (car acc)))
               nums :initial-value '(0 0))))`,
  },

  // ─── Problem 99: Binary Tree Right Side View (LC 199) ────────────────────────
  99: {
    TypeScript: `type BTNode = { val: number; left: BTNode | null; right: BTNode | null };

function rightSideView(root: BTNode | null): number[] {
  const bfs = (level: BTNode[]): number[] => {
    if (level.length === 0) return [];
    const last = level[level.length - 1].val;
    const next = level.flatMap(n =>
      [n.left, n.right].filter((c): c is BTNode => c !== null)
    );
    return [last, ...bfs(next)];
  };
  return root ? bfs([root]) : [];
}`,

    Haskell: `data Tree a = Nil | Node a (Tree a) (Tree a)

rightSideView :: Tree Int -> [Int]
rightSideView Nil = []
rightSideView root = bfs [root]
  where
    bfs [] = []
    bfs level = val (last level) : bfs next
      where
        next = concatMap children level
        children Nil = []
        children (Node _ l r) = filter notNil [l, r]
        val (Node v _ _) = v
        notNil Nil = False
        notNil _   = True`,

    Elixir: `defmodule RightView do
  def view(nil), do: []
  def view(root), do: bfs([root])

  defp bfs([]), do: []
  defp bfs(level) do
    last_val = level |> List.last() |> Map.get(:val)
    next = Enum.flat_map(level, fn n ->
      Enum.filter([n.left, n.right], & &1)
    end)
    [last_val | bfs(next)]
  end
end`,

    Rust: `fn right_side_view(root: &Option<Box<TreeNode>>) -> Vec<i32> {
    fn bfs(level: Vec<&TreeNode>) -> Vec<i32> {
        if level.is_empty() { return vec![]; }
        let last = level.last().unwrap().val;
        let next: Vec<_> = level.iter().flat_map(|n| {
            let mut v = vec![];
            if let Some(ref l) = n.left { v.push(l.as_ref()); }
            if let Some(ref r) = n.right { v.push(r.as_ref()); }
            v
        }).collect();
        let mut res = vec![last];
        res.extend(bfs(next));
        res
    }
    match root { None => vec![], Some(r) => bfs(vec![r.as_ref()]) }
}`,

    Scala: `def rightSideView(root: Option[TreeNode]): List[Int] = {
  def bfs(level: List[TreeNode]): List[Int] = level match {
    case Nil => Nil
    case _ =>
      val last = level.last.value
      val next = level.flatMap(n =>
        List(n.left, n.right).flatten
      )
      last :: bfs(next)
  }
  root.map(r => bfs(List(r))).getOrElse(Nil)
}`,

    OCaml: `let right_side_view root =
  let rec bfs = function
    | [] -> []
    | level ->
      let last = (List.nth level (List.length level - 1)).value in
      let next = List.concat_map (fun n ->
        (match n.left with Some l -> [l] | None -> [])
        @ (match n.right with Some r -> [r] | None -> [])
      ) level in
      last :: bfs next
  in match root with None -> [] | Some r -> bfs [r]`,

    Clojure: `(defn right-side-view [root]
  (if (nil? root) []
    (loop [level [root] result []]
      (if (empty? level) result
        (let [last-val (:val (last level))
              nxt (mapcat (fn [n]
                    (filter some? [(:left n) (:right n)])) level)]
          (recur nxt (conj result last-val)))))))`,

    Lisp: `(defun right-side-view (root)
  (if (null root) nil
    (labels ((bfs (level)
               (when level
                 (cons (node-val (car (last level)))
                       (bfs (mapcan (lambda (n)
                              (remove nil (list (node-left n) (node-right n))))
                            level))))))
      (bfs (list root)))))`,
  },

  // ─── Problem 100: Number of Islands (LC 200) ──────────────────────────────────
  100: {
    TypeScript: `function numIslands(grid: string[][]): number {
  const rows = grid.length, cols = grid[0].length;
  const key = (r: number, c: number) => \\\`\${r},\${c}\\\`;
  const flood = (r: number, c: number, visited: Set<string>): Set<string> => {
    if (r < 0 || r >= rows || c < 0 || c >= cols) return visited;
    if (grid[r][c] !== '1' || visited.has(key(r, c))) return visited;
    const v = new Set(visited).add(key(r, c));
    return [[r-1,c],[r+1,c],[r,c-1],[r,c+1]].reduce(
      (acc, [nr, nc]) => flood(nr, nc, acc), v
    );
  };
  const [count] = Array.from({ length: rows * cols }).reduce<[number, Set<string>]>(
    ([cnt, vis], _, idx) => {
      const r = Math.floor(idx / cols), c = idx % cols;
      if (grid[r][c] !== '1' || vis.has(key(r, c))) return [cnt, vis];
      return [cnt + 1, flood(r, c, vis)];
    },
    [0, new Set<string>()]
  );
  return count;
}`,

    Haskell: `import qualified Data.Set as S

numIslands :: [[Char]] -> Int
numIslands grid = fst $ foldl checkCell (0, S.empty) coords
  where
    rows = length grid; cols = length (head grid)
    coords = [(r, c) | r <- [0..rows-1], c <- [0..cols-1]]
    at (r, c) = (grid !! r) !! c
    flood (r, c) vis
      | r < 0 || r >= rows || c < 0 || c >= cols = vis
      | at (r, c) /= '1' || S.member (r, c) vis = vis
      | otherwise = foldl (\\v d -> flood d v) (S.insert (r, c) vis)
                      [(r-1,c),(r+1,c),(r,c-1),(r,c+1)]
    checkCell (cnt, vis) pos
      | at pos /= '1' || S.member pos vis = (cnt, vis)
      | otherwise = (cnt + 1, flood pos vis)`,

    Elixir: `defmodule Islands do
  def count(grid) do
    rows = length(grid); cols = length(hd(grid))
    g = for {row, r} <- Enum.with_index(grid),
            {cell, c} <- Enum.with_index(row), into: %{}, do: {{r, c}, cell}
    coords = for r <- 0..(rows-1), c <- 0..(cols-1), do: {r, c}
    {cnt, _} = Enum.reduce(coords, {0, MapSet.new()}, fn {r, c}, {cnt, vis} ->
      if g[{r, c}] != "1" or MapSet.member?(vis, {r, c}), do: {cnt, vis},
      else: {cnt + 1, flood(r, c, g, vis, rows, cols)}
    end)
    cnt
  end

  defp flood(r, c, g, vis, rows, cols) do
    if r < 0 or r >= rows or c < 0 or c >= cols or
       g[{r, c}] != "1" or MapSet.member?(vis, {r, c}), do: vis,
    else:
      [{r-1,c},{r+1,c},{r,c-1},{r,c+1}]
      |> Enum.reduce(MapSet.put(vis, {r, c}), fn {nr, nc}, v ->
        flood(nr, nc, g, v, rows, cols) end)
  end
end`,

    Rust: `use std::collections::HashSet;

fn num_islands(grid: &[Vec<char>]) -> i32 {
    let (rows, cols) = (grid.len(), grid[0].len());
    fn flood(r: i32, c: i32, grid: &[Vec<char>], vis: &mut HashSet<(i32,i32)>,
             rows: i32, cols: i32) {
        if r < 0 || r >= rows || c < 0 || c >= cols { return; }
        if grid[r as usize][c as usize] != '1' || vis.contains(&(r, c)) { return; }
        vis.insert((r, c));
        for (dr, dc) in [(-1,0),(1,0),(0,-1),(0,1)] {
            flood(r+dr, c+dc, grid, vis, rows, cols);
        }
    }
    let mut vis = HashSet::new();
    let mut count = 0;
    for r in 0..rows as i32 {
        for c in 0..cols as i32 {
            if grid[r as usize][c as usize] == '1' && !vis.contains(&(r, c)) {
                count += 1;
                flood(r, c, grid, &mut vis, rows as i32, cols as i32);
            }
        }
    }
    count
}`,

    Scala: `def numIslands(grid: Array[Array[Char]]): Int = {
  val (rows, cols) = (grid.length, grid(0).length)
  def flood(r: Int, c: Int, vis: Set[(Int,Int)]): Set[(Int,Int)] = {
    if (r < 0 || r >= rows || c < 0 || c >= cols) vis
    else if (grid(r)(c) != '1' || vis.contains((r, c))) vis
    else List((r-1,c),(r+1,c),(r,c-1),(r,c+1))
      .foldLeft(vis + ((r, c))) { case (v, (nr, nc)) => flood(nr, nc, v) }
  }
  val coords = for (r <- 0 until rows; c <- 0 until cols) yield (r, c)
  coords.foldLeft((0, Set.empty[(Int,Int)])) { case ((cnt, vis), (r, c)) =>
    if (grid(r)(c) != '1' || vis.contains((r, c))) (cnt, vis)
    else (cnt + 1, flood(r, c, vis))
  }._1
}`,

    OCaml: `module S = Set.Make(struct type t = int * int let compare = compare end)

let num_islands grid =
  let rows = Array.length grid and cols = Array.length grid.(0) in
  let rec flood r c vis =
    if r < 0 || r >= rows || c < 0 || c >= cols then vis
    else if grid.(r).(c) <> '1' || S.mem (r, c) vis then vis
    else List.fold_left (fun v (dr,dc) -> flood (r+dr) (c+dc) v)
           (S.add (r, c) vis)
           [(-1,0);(1,0);(0,-1);(0,1)] in
  let cnt = ref 0 and vis = ref S.empty in
  for r = 0 to rows - 1 do
    for c = 0 to cols - 1 do
      if grid.(r).(c) = '1' && not (S.mem (r, c) !vis) then begin
        cnt := !cnt + 1; vis := flood r c !vis end
    done done;
  !cnt`,

    Clojure: `(defn num-islands [grid]
  (let [rows (count grid) cols (count (first grid))
        at (fn [r c] (get-in grid [r c]))]
    (letfn [(flood [r c vis]
              (if (or (< r 0) (>= r rows) (< c 0) (>= c cols)
                      (not= (at r c) \\1) (vis [r c]))
                vis
                (reduce (fn [v [dr dc]] (flood (+ r dr) (+ c dc) v))
                        (conj vis [r c])
                        [[-1 0] [1 0] [0 -1] [0 1]])))]
      (first
        (reduce (fn [[cnt vis] [r c]]
                  (if (or (not= (at r c) \\1) (vis [r c]))
                    [cnt vis]
                    [(inc cnt) (flood r c vis)]))
                [0 #{}]
                (for [r (range rows) c (range cols)] [r c]))))))`,

    Lisp: `(defun num-islands (grid)
  (let ((rows (length grid)) (cols (length (car grid)))
        (visited (make-hash-table :test #'equal)) (count 0))
    (labels ((at (r c) (nth c (nth r grid)))
             (flood (r c)
               (when (and (>= r 0) (< r rows) (>= c 0) (< c cols)
                          (char= (at r c) #\\1)
                          (not (gethash (cons r c) visited)))
                 (setf (gethash (cons r c) visited) t)
                 (flood (1- r) c) (flood (1+ r) c)
                 (flood r (1- c)) (flood r (1+ c)))))
      (dotimes (r rows)
        (dotimes (c cols)
          (when (and (char= (at r c) #\\1)
                     (not (gethash (cons r c) visited)))
            (incf count) (flood r c))))
      count)))`,
  },

  // ─── Problem 101: Reverse Linked List (LC 206) ────────────────────────────────
  101: {
    TypeScript: `type LNode = { val: number; next: LNode | null };
function reverseList(head: LNode | null): LNode | null {
  const go = (node: LNode | null, acc: LNode | null): LNode | null =>
    node === null ? acc : go(node.next, { val: node.val, next: acc });
  return go(head, null);
}`,

    Haskell: `reverseList :: [a] -> [a]
reverseList = foldl (flip (:)) []
-- For linked list nodes:
-- reverse' Nil acc = acc
-- reverse' (Node v next) acc = reverse' next (Node v acc)`,

    Elixir: `defmodule ReverseList do
  def reverse(list), do: Enum.reduce(list, [], &[&1 | &2])
  # For linked list nodes:
  # def reverse(nil, acc), do: acc
  # def reverse({v, next}, acc), do: reverse(next, {v, acc})
end`,

    Rust: `fn reverse_list<T: Clone>(list: &[T]) -> Vec<T> {
    list.iter().fold(Vec::new(), |mut acc, x| {
        acc.insert(0, x.clone());
        acc
    })
    // For linked list: fold with accumulator building reversed list
}`,

    Scala: `def reverseList[A](lst: List[A]): List[A] =
  lst.foldLeft(List.empty[A])((acc, x) => x :: acc)`,

    OCaml: `let reverse_list lst =
  List.fold_left (fun acc x -> x :: acc) [] lst`,

    Clojure: `(defn reverse-list [lst]
  (reduce (fn [acc x] (cons x acc)) '() lst))`,

    Lisp: `(defun reverse-list (lst)
  (reduce (lambda (acc x) (cons x acc)) lst
          :initial-value nil :from-end nil))`,
  },

  // ─── Problem 102: Course Schedule (LC 207) ────────────────────────────────────
  102: {
    TypeScript: `function canFinish(n: number, prereqs: number[][]): boolean {
  const graph = prereqs.reduce<Record<number, number[]>>(
    (g, [a, b]) => ({ ...g, [b]: [...(g[b] || []), a] }), {}
  );
  type S = { path: Set<number>; done: Set<number> };
  const dfs = (v: number, s: S): [boolean, S] => {
    if (s.done.has(v)) return [false, s];
    if (s.path.has(v)) return [true, s];
    const s1: S = { ...s, path: new Set([...s.path, v]) };
    const [cyc, s2] = (graph[v] || []).reduce<[boolean, S]>(
      ([c, st], nb) => c ? [true, st] : dfs(nb, st), [false, s1]
    );
    return [cyc, { path: s2.path, done: new Set([...s2.done, v]) }];
  };
  const init: S = { path: new Set(), done: new Set() };
  return !Array.from({ length: n }, (_, i) => i)
    .reduce<[boolean, S]>(([c, s], i) => c ? [true, s] : dfs(i, s), [false, init])[0];
}`,

    Haskell: `import qualified Data.Map as M
import qualified Data.Set as S

canFinish :: Int -> [(Int,Int)] -> Bool
canFinish n prereqs = not hasCycle
  where
    graph = foldl (\\g (a,b) -> M.insertWith (++) b [a] g) M.empty prereqs
    dfs v (path, done)
      | S.member v done = (False, (path, done))
      | S.member v path = (True, (path, done))
      | otherwise =
          let (cyc, s) = foldl
                (\\(c, s') nb -> if c then (True, s') else dfs nb s')
                (False, (S.insert v path, done))
                (M.findWithDefault [] v graph)
          in (cyc, (fst s, S.insert v (snd s)))
    (hasCycle, _) = foldl
      (\\(c, s) i -> if c then (True, s) else dfs i s)
      (False, (S.empty, S.empty)) [0..n-1]`,

    Elixir: `defmodule CourseSchedule do
  def can_finish(n, prereqs) do
    graph = Enum.reduce(prereqs, %{}, fn [a, b], g ->
      Map.update(g, b, [a], &[a | &1])
    end)
    {cycle, _} = Enum.reduce(0..(n-1), {false, {MapSet.new(), MapSet.new()}},
      fn _, {true, s} -> {true, s}
         i, {false, s} -> dfs(i, graph, s) end)
    not cycle
  end
  defp dfs(v, graph, {path, done}) do
    cond do
      MapSet.member?(done, v) -> {false, {path, done}}
      MapSet.member?(path, v) -> {true, {path, done}}
      true ->
        {cyc, {p, d}} = Enum.reduce(Map.get(graph, v, []),
          {false, {MapSet.put(path, v), done}},
          fn _, {true, s} -> {true, s}
             nb, {false, s} -> dfs(nb, graph, s) end)
        {cyc, {p, MapSet.put(d, v)}}
    end
  end
end`,

    Rust: `use std::collections::{HashMap, HashSet};

fn can_finish(n: i32, prerequisites: Vec<Vec<i32>>) -> bool {
    let graph = prerequisites.iter().fold(HashMap::new(), |mut g, p| {
        g.entry(p[1]).or_insert_with(Vec::new).push(p[0]); g
    });
    fn dfs(v: i32, g: &HashMap<i32, Vec<i32>>,
           path: &mut HashSet<i32>, done: &mut HashSet<i32>) -> bool {
        if done.contains(&v) { return false; }
        if path.contains(&v) { return true; }
        path.insert(v);
        let cyc = g.get(&v).map_or(false, |nbs|
            nbs.iter().any(|&nb| dfs(nb, g, path, done)));
        done.insert(v);
        cyc
    }
    let (mut path, mut done) = (HashSet::new(), HashSet::new());
    !(0..n).any(|i| dfs(i, &graph, &mut path, &mut done))
}`,

    Scala: `def canFinish(n: Int, prereqs: Array[Array[Int]]): Boolean = {
  val graph = prereqs.foldLeft(Map.empty[Int, List[Int]]) {
    case (g, Array(a, b)) => g + (b -> (a :: g.getOrElse(b, Nil)))
  }
  type S = (Set[Int], Set[Int])
  def dfs(v: Int, s: S): (Boolean, S) =
    if (s._2(v)) (false, s) else if (s._1(v)) (true, s)
    else {
      val (cyc, (p, d)) = graph.getOrElse(v, Nil).foldLeft((false, (s._1 + v, s._2))) {
        case ((true, st), _) => (true, st)
        case ((false, st), nb) => dfs(nb, st)
      }
      (cyc, (p, d + v))
    }
  !(0 until n).foldLeft((false, (Set.empty[Int], Set.empty[Int]): S)) {
    case ((true, s), _) => (true, s)
    case ((false, s), i) => dfs(i, s)
  }._1
}`,

    OCaml: `module IS = Set.Make(Int)

let can_finish n prereqs =
  let graph = List.fold_left (fun g (a, b) ->
    let cur = try List.assoc b g with Not_found -> [] in
    (b, a :: cur) :: List.filter (fun (k,_) -> k <> b) g
  ) [] prereqs in
  let nbrs v = try List.assoc v graph with Not_found -> [] in
  let rec dfs v (path, done) =
    if IS.mem v done then (false, (path, done))
    else if IS.mem v path then (true, (path, done))
    else
      let (cyc, (p, d)) = List.fold_left
        (fun (c, s) nb -> if c then (true, s) else dfs nb s)
        (false, (IS.add v path, done)) (nbrs v) in
      (cyc, (p, IS.add v d)) in
  let (has_cyc, _) = List.init n Fun.id |> List.fold_left
    (fun (c, s) i -> if c then (true, s) else dfs i s)
    (false, (IS.empty, IS.empty)) in
  not has_cyc`,

    Clojure: `(defn can-finish [n prereqs]
  (let [graph (reduce (fn [g [a b]] (update g b (fnil conj []) a)) {} prereqs)
        dfs (fn dfs [v [path done]]
              (cond
                (done v) [false [path done]]
                (path v) [true [path done]]
                :else (let [[cyc [p d]]
                            (reduce (fn [[c s] nb] (if c [true s] (dfs nb s)))
                                    [false [(conj path v) done]]
                                    (get graph v []))]
                        [cyc [p (conj d v)]])))]
    (not (first (reduce (fn [[c s] i] (if c [true s] (dfs i s)))
                        [false [#{} #{}]] (range n))))))`,

    Lisp: `(defun can-finish (n prereqs)
  (let ((graph (make-hash-table)))
    (dolist (p prereqs)
      (push (first p) (gethash (second p) graph nil)))
    (let ((path (make-hash-table)) (done (make-hash-table)))
      (labels ((dfs (v)
                 (cond ((gethash v done) nil)
                       ((gethash v path) t)
                       (t (setf (gethash v path) t)
                          (let ((cyc (some #'dfs (gethash v graph nil))))
                            (setf (gethash v done) t) cyc)))))
        (not (loop for i below n thereis (dfs i)))))))`,
  },

  // ─── Problem 103: Implement Trie / Prefix Tree (LC 208) ───────────────────────
  103: {
    TypeScript: `type TrieNode = { children: Record<string, TrieNode>; end: boolean };
const emptyTrie = (): TrieNode => ({ children: {}, end: false });
const trieInsert = (node: TrieNode, word: string): TrieNode =>
  word.length === 0
    ? { ...node, end: true }
    : { ...node, children: {
        ...node.children,
        [word[0]]: trieInsert(node.children[word[0]] || emptyTrie(), word.slice(1))
      }};
const trieSearch = (node: TrieNode, word: string): boolean =>
  word.length === 0 ? node.end
    : word[0] in node.children && trieSearch(node.children[word[0]], word.slice(1));
const startsWith = (node: TrieNode, prefix: string): boolean =>
  prefix.length === 0 || (prefix[0] in node.children &&
    startsWith(node.children[prefix[0]], prefix.slice(1)));`,

    Haskell: `import qualified Data.Map as M
data Trie = Trie (M.Map Char Trie) Bool

emptyTrie :: Trie
emptyTrie = Trie M.empty False

trieInsert :: String -> Trie -> Trie
trieInsert [] (Trie m _) = Trie m True
trieInsert (c:cs) (Trie m e) =
  Trie (M.alter (Just . trieInsert cs . maybe emptyTrie id) c m) e

trieSearch :: String -> Trie -> Bool
trieSearch [] (Trie _ e) = e
trieSearch (c:cs) (Trie m _) = maybe False (trieSearch cs) (M.lookup c m)

startsWith :: String -> Trie -> Bool
startsWith [] _ = True
startsWith (c:cs) (Trie m _) = maybe False (startsWith cs) (M.lookup c m)`,

    Elixir: `defmodule Trie do
  def new, do: %{ch: %{}, end: false}
  def insert(node, <<>>), do: %{node | end: true}
  def insert(node, <<c, rest::binary>>) do
    child = Map.get(node.ch, c, new())
    %{node | ch: Map.put(node.ch, c, insert(child, rest))}
  end
  def search(%{end: e}, <<>>), do: e
  def search(%{ch: ch}, <<c, rest::binary>>),
    do: if Map.has_key?(ch, c), do: search(ch[c], rest), else: false
  def starts_with(_, <<>>), do: true
  def starts_with(%{ch: ch}, <<c, rest::binary>>),
    do: if Map.has_key?(ch, c), do: starts_with(ch[c], rest), else: false
end`,

    Rust: `use std::collections::HashMap;

#[derive(Clone, Default)]
struct Trie { children: HashMap<char, Trie>, is_end: bool }

impl Trie {
    fn new() -> Self { Self::default() }
    fn insert(&self, word: &str) -> Self {
        match word.chars().next() {
            None => Trie { is_end: true, ..self.clone() },
            Some(c) => {
                let child = self.children.get(&c).cloned().unwrap_or_default();
                let mut ch = self.children.clone();
                ch.insert(c, child.insert(&word[c.len_utf8()..]));
                Trie { children: ch, is_end: self.is_end }
            }
        }
    }
    fn search(&self, word: &str) -> bool {
        match word.chars().next() {
            None => self.is_end,
            Some(c) => self.children.get(&c)
                .map_or(false, |t| t.search(&word[c.len_utf8()..]))
        }
    }
}`,

    Scala: `case class Trie(ch: Map[Char, Trie] = Map(), end: Boolean = false) {
  def insert(w: String): Trie = w.headOption match {
    case None => copy(end = true)
    case Some(c) => copy(ch = ch + (c -> ch.getOrElse(c, Trie()).insert(w.tail)))
  }
  def search(w: String): Boolean = w.headOption match {
    case None => end
    case Some(c) => ch.get(c).exists(_.search(w.tail))
  }
  def startsWith(p: String): Boolean = p.headOption match {
    case None => true
    case Some(c) => ch.get(c).exists(_.startsWith(p.tail))
  }
}`,

    OCaml: `type trie = { children: (char * trie) list; is_end: bool }
let empty_trie = { children = []; is_end = false }

let rec trie_insert word t = match word with
  | [] -> { t with is_end = true }
  | c :: cs ->
    let child = try List.assoc c t.children with Not_found -> empty_trie in
    { t with children =
      (c, trie_insert cs child) :: List.filter (fun (k,_) -> k <> c) t.children }

let rec trie_search word t = match word with
  | [] -> t.is_end
  | c :: cs ->
    (try trie_search cs (List.assoc c t.children) with Not_found -> false)`,

    Clojure: `(defn trie-new [] {:ch {} :end false})
(defn trie-insert [node word]
  (if (empty? word) (assoc node :end true)
    (let [c (first word)
          child (get-in node [:ch c] (trie-new))]
      (assoc-in node [:ch c] (trie-insert child (rest word))))))
(defn trie-search [node word]
  (if (empty? word) (:end node)
    (when-let [child (get-in node [:ch (first word)])]
      (trie-search child (rest word)))))`,

    Lisp: `(defun make-trie () (cons (make-hash-table) nil))
(defun trie-insert (node word)
  (if (zerop (length word)) (cons (car node) t)
    (let* ((c (char word 0)) (ht (car node))
           (child (or (gethash c ht) (make-trie))))
      (setf (gethash c ht) (trie-insert child (subseq word 1)))
      node)))
(defun trie-search (node word)
  (if (zerop (length word)) (cdr node)
    (let ((child (gethash (char word 0) (car node))))
      (and child (trie-search child (subseq word 1))))))`,
  },

  // ─── Problem 104: Accounts Merge (LC 721) ─────────────────────────────────────
  104: {
    TypeScript: `function accountsMerge(accounts: string[][]): string[][] {
  type UF = Record<string, string>;
  const find = (uf: UF, x: string): [UF, string] => {
    if (!(x in uf)) return [{ ...uf, [x]: x }, x];
    if (uf[x] === x) return [uf, x];
    const [uf2, r] = find(uf, uf[x]);
    return [{ ...uf2, [x]: r }, r];
  };
  const union = (uf: UF, a: string, b: string): UF => {
    const [u1, ra] = find(uf, a);
    const [u2, rb] = find(u1, b);
    return ra === rb ? u2 : { ...u2, [ra]: rb };
  };
  const [uf, owner] = accounts.reduce<[UF, Record<string, string>]>(
    ([u, o], [name, ...emails]) =>
      emails.reduce(([u2, o2], e) =>
        [union(u2, emails[0], e), { ...o2, [e]: name }], [u, o]),
    [{}, {}]
  );
  const groups = Object.keys(owner).reduce<Record<string, string[]>>((g, e) => {
    const [, root] = find(uf, e);
    return { ...g, [root]: [...(g[root] || []), e] };
  }, {});
  return Object.values(groups).map(es => [owner[es[0]], ...es.sort()]);
}`,

    Haskell: `import qualified Data.Map as M
import Data.List (sort)

type UF = M.Map String String

find' :: UF -> String -> (UF, String)
find' uf x = case M.lookup x uf of
  Nothing -> (M.insert x x uf, x)
  Just p | p == x -> (uf, x)
         | otherwise -> let (uf', r) = find' uf p in (M.insert x r uf', r)

union' :: UF -> String -> String -> UF
union' uf a b = let (u1, ra) = find' uf a; (u2, rb) = find' u1 b
                in if ra == rb then u2 else M.insert ra rb u2

accountsMerge :: [[String]] -> [[String]]
accountsMerge accs =
  let (uf, owner) = foldl (\\(u, o) (name:emails) ->
        foldl (\\(u', o') e -> (union' u' (head emails) e, M.insert e name o'))
              (u, o) emails) (M.empty, M.empty) accs
      groups = foldl (\\g e -> let (_, r) = find' uf e in
        M.insertWith (++) r [e] g) M.empty (M.keys owner)
  in map (\\es -> (owner M.! head es) : sort es) (M.elems groups)`,

    Elixir: `defmodule AccountsMerge do
  def merge(accounts) do
    {uf, owner} = Enum.reduce(accounts, {%{}, %{}}, fn [name | emails], {u, o} ->
      Enum.reduce(emails, {u, o}, fn e, {u2, o2} ->
        {union(u2, hd(emails), e), Map.put(o2, e, name)}
      end)
    end)
    groups = owner |> Map.keys() |> Enum.group_by(fn e ->
      {_, root} = find(uf, e); root end)
    Enum.map(Map.values(groups), fn es ->
      [owner[hd(es)] | Enum.sort(es)] end)
  end
  defp find(uf, x) do
    case Map.get(uf, x) do
      nil -> {Map.put(uf, x, x), x}
      ^x -> {uf, x}
      p -> {u, r} = find(uf, p); {Map.put(u, x, r), r}
    end
  end
  defp union(uf, a, b) do
    {u1, ra} = find(uf, a); {u2, rb} = find(u1, b)
    if ra == rb, do: u2, else: Map.put(u2, ra, rb)
  end
end`,

    Rust: `use std::collections::HashMap;

fn accounts_merge(accounts: Vec<Vec<String>>) -> Vec<Vec<String>> {
    let mut parent: HashMap<String, String> = HashMap::new();
    let mut owner: HashMap<String, String> = HashMap::new();
    fn find(p: &mut HashMap<String, String>, x: &str) -> String {
        if !p.contains_key(x) { p.insert(x.into(), x.into()); }
        let px = p[x].clone();
        if px == x { return x.into(); }
        let r = find(p, &px); p.insert(x.into(), r.clone()); r
    }
    for acc in &accounts {
        for e in &acc[1..] {
            owner.insert(e.clone(), acc[0].clone());
            let (r0, re) = (find(&mut parent, &acc[1]), find(&mut parent, e));
            if r0 != re { parent.insert(r0, re); }
        }
    }
    let mut groups: HashMap<String, Vec<String>> = HashMap::new();
    for e in owner.keys() {
        groups.entry(find(&mut parent, e)).or_default().push(e.clone());
    }
    groups.values().map(|es| {
        let mut s = es.clone(); s.sort();
        std::iter::once(owner[&s[0]].clone()).chain(s).collect()
    }).collect()
}`,

    Scala: `def accountsMerge(accounts: List[List[String]]): List[List[String]] = {
  type UF = Map[String, String]
  def find(uf: UF, x: String): (UF, String) = uf.get(x) match {
    case None => (uf + (x -> x), x)
    case Some(p) if p == x => (uf, x)
    case Some(p) => val (u, r) = find(uf, p); (u + (x -> r), r)
  }
  def union(uf: UF, a: String, b: String): UF = {
    val (u1, ra) = find(uf, a); val (u2, rb) = find(u1, b)
    if (ra == rb) u2 else u2 + (ra -> rb)
  }
  val (uf, owner) = accounts.foldLeft((Map.empty[String,String], Map.empty[String,String])) {
    case ((u, o), name :: emails) => emails.foldLeft((u, o)) {
      case ((u2, o2), e) => (union(u2, emails.head, e), o2 + (e -> name))
    }
  }
  owner.keys.groupBy(e => find(uf, e)._2).values
    .map(es => owner(es.head) :: es.toList.sorted).toList
}`,

    OCaml: `module SM = Map.Make(String)

let accounts_merge accounts =
  let find uf x =
    let rec go uf x = match SM.find_opt x uf with
      | None -> (SM.add x x uf, x)
      | Some p when p = x -> (uf, x)
      | Some p -> let (uf', r) = go uf p in (SM.add x r uf', r)
    in go uf x in
  let union uf a b =
    let (u1, ra) = find uf a in
    let (u2, rb) = find u1 b in
    if ra = rb then u2 else SM.add ra rb u2 in
  let (uf, owner) = List.fold_left (fun (u, o) acc ->
    let name = List.hd acc and emails = List.tl acc in
    List.fold_left (fun (u2, o2) e ->
      (union u2 (List.hd emails) e, SM.add e name o2)
    ) (u, o) emails
  ) (SM.empty, SM.empty) accounts in
  let groups = SM.fold (fun e _ g ->
    let (_, r) = find uf e in
    SM.add r (e :: (try SM.find r g with Not_found -> [])) g
  ) owner SM.empty in
  SM.fold (fun _ es acc ->
    let sorted = List.sort compare es in
    (SM.find (List.hd sorted) owner :: sorted) :: acc
  ) groups []`,

    Clojure: `(defn accounts-merge [accounts]
  (letfn [(find [uf x]
            (let [p (get uf x x)]
              (if (= p x) [uf x]
                (let [[uf' r] (find uf p)] [(assoc uf' x r) r]))))
          (union [uf a b]
            (let [[u1 ra] (find uf a) [u2 rb] (find u1 b)]
              (if (= ra rb) u2 (assoc u2 ra rb))))]
    (let [[uf owner] (reduce (fn [[u o] [name & emails]]
                               (reduce (fn [[u2 o2] e]
                                         [(union u2 (first emails) e) (assoc o2 e name)])
                                       [u o] emails))
                             [{} {}] accounts)
          groups (reduce (fn [g e]
                           (let [[_ r] (find uf e)]
                             (update g r (fnil conj []) e)))
                         {} (keys owner))]
      (map (fn [es] (cons (owner (first es)) (sort es))) (vals groups)))))`,

    Lisp: `(defun accounts-merge (accounts)
  (let ((parent (make-hash-table :test #'equal))
        (owner (make-hash-table :test #'equal)))
    (labels ((find-root (x)
               (unless (gethash x parent) (setf (gethash x parent) x))
               (if (equal (gethash x parent) x) x
                 (let ((r (find-root (gethash x parent))))
                   (setf (gethash x parent) r) r)))
             (union-nodes (a b)
               (let ((ra (find-root a)) (rb (find-root b)))
                 (unless (equal ra rb) (setf (gethash ra parent) rb)))))
      (dolist (acc accounts)
        (let ((name (first acc)) (emails (rest acc)))
          (dolist (e emails)
            (setf (gethash e owner) name)
            (union-nodes (first emails) e))))
      (let ((groups (make-hash-table :test #'equal)))
        (maphash (lambda (e _)
                   (push e (gethash (find-root e) groups nil))) owner)
        (let (result)
          (maphash (lambda (_ es)
                     (let ((sorted (sort (copy-list es) #'string<)))
                       (push (cons (gethash (first sorted) owner) sorted)
                             result)))
                   groups)
          result)))))`,
  },

  // ─── Problem 105: Course Schedule II (LC 210) ─────────────────────────────────
  105: {
    TypeScript: `function findOrder(n: number, prereqs: number[][]): number[] {
  const graph = prereqs.reduce<Record<number, number[]>>(
    (g, [a, b]) => ({ ...g, [b]: [...(g[b] || []), a] }), {}
  );
  type S = { path: Set<number>; done: Set<number>; order: number[]; cycle: boolean };
  const dfs = (v: number, s: S): S => {
    if (s.cycle || s.done.has(v)) return s;
    if (s.path.has(v)) return { ...s, cycle: true };
    const s1 = { ...s, path: new Set([...s.path, v]) };
    const s2 = (graph[v] || []).reduce((st: S, nb: number) => dfs(nb, st), s1);
    return { ...s2, done: new Set([...s2.done, v]), order: [...s2.order, v] };
  };
  const init: S = { path: new Set(), done: new Set(), order: [], cycle: false };
  const result = Array.from({ length: n }, (_, i) => i).reduce((s, i) => dfs(i, s), init);
  return result.cycle ? [] : result.order;
}`,

    Haskell: `import qualified Data.Map as M
import qualified Data.Set as S

findOrder :: Int -> [(Int,Int)] -> [Int]
findOrder n prereqs = if cycle then [] else order
  where
    graph = foldl (\\g (a,b) -> M.insertWith (++) b [a] g) M.empty prereqs
    dfs v (path, done, ord, cyc)
      | cyc || S.member v done = (path, done, ord, cyc)
      | S.member v path = (path, done, ord, True)
      | otherwise =
          let (p, d, o, c) = foldl (\\s nb -> dfs nb s)
                (S.insert v path, done, ord, False)
                (M.findWithDefault [] v graph)
          in (p, S.insert v d, o ++ [v], c)
    (_, _, order, cycle) = foldl (\\s i -> dfs i s)
      (S.empty, S.empty, [], False) [0..n-1]`,

    Elixir: `defmodule CourseOrder do
  def find_order(n, prereqs) do
    graph = Enum.reduce(prereqs, %{}, fn [a, b], g ->
      Map.update(g, b, [a], &[a | &1]) end)
    init = %{path: MapSet.new(), done: MapSet.new(), order: [], cycle: false}
    result = Enum.reduce(0..(n-1), init, &dfs(&1, graph, &2))
    if result.cycle, do: [], else: result.order
  end
  defp dfs(v, graph, s) do
    cond do
      s.cycle or MapSet.member?(s.done, v) -> s
      MapSet.member?(s.path, v) -> %{s | cycle: true}
      true ->
        s1 = %{s | path: MapSet.put(s.path, v)}
        s2 = Enum.reduce(Map.get(graph, v, []), s1, &dfs(&1, graph, &2))
        %{s2 | done: MapSet.put(s2.done, v), order: s2.order ++ [v]}
    end
  end
end`,

    Rust: `use std::collections::{HashMap, HashSet};

fn find_order(n: i32, prerequisites: Vec<Vec<i32>>) -> Vec<i32> {
    let graph = prerequisites.iter().fold(HashMap::new(), |mut g, p| {
        g.entry(p[1]).or_insert_with(Vec::new).push(p[0]); g
    });
    let mut path = HashSet::new();
    let mut done = HashSet::new();
    let mut order = Vec::new();
    let mut has_cycle = false;
    fn dfs(v: i32, g: &HashMap<i32, Vec<i32>>, path: &mut HashSet<i32>,
           done: &mut HashSet<i32>, order: &mut Vec<i32>, cycle: &mut bool) {
        if *cycle || done.contains(&v) { return; }
        if path.contains(&v) { *cycle = true; return; }
        path.insert(v);
        if let Some(nbs) = g.get(&v) {
            for &nb in nbs { dfs(nb, g, path, done, order, cycle); }
        }
        done.insert(v); order.push(v);
    }
    for i in 0..n { dfs(i, &graph, &mut path, &mut done, &mut order, &mut has_cycle); }
    if has_cycle { vec![] } else { order }
}`,

    Scala: `def findOrder(n: Int, prereqs: Array[Array[Int]]): Array[Int] = {
  val graph = prereqs.foldLeft(Map.empty[Int, List[Int]]) {
    case (g, Array(a, b)) => g + (b -> (a :: g.getOrElse(b, Nil)))
  }
  case class S(path: Set[Int], done: Set[Int], order: List[Int], cycle: Boolean)
  def dfs(v: Int, s: S): S =
    if (s.cycle || s.done(v)) s
    else if (s.path(v)) s.copy(cycle = true)
    else {
      val s2 = graph.getOrElse(v, Nil).foldLeft(s.copy(path = s.path + v))(
        (st, nb) => dfs(nb, st))
      s2.copy(done = s2.done + v, order = s2.order :+ v)
    }
  val result = (0 until n).foldLeft(S(Set(), Set(), Nil, false))((s, i) => dfs(i, s))
  if (result.cycle) Array() else result.order.toArray
}`,

    OCaml: `let find_order n prereqs =
  let module IS = Set.Make(Int) in
  let graph = List.fold_left (fun g (a, b) ->
    let cur = try List.assoc b g with Not_found -> [] in
    (b, a :: cur) :: List.filter (fun (k,_) -> k <> b) g
  ) [] prereqs in
  let nbrs v = try List.assoc v graph with Not_found -> [] in
  let rec dfs v (path, done, order, cyc) =
    if cyc || IS.mem v done then (path, done, order, cyc)
    else if IS.mem v path then (path, done, order, true)
    else
      let (p, d, o, c) = List.fold_left
        (fun s nb -> dfs nb s)
        (IS.add v path, done, order, false) (nbrs v) in
      (p, IS.add v d, o @ [v], c) in
  let (_, _, order, cyc) = List.init n Fun.id |> List.fold_left
    (fun s i -> dfs i s) (IS.empty, IS.empty, [], false) in
  if cyc then [] else order`,

    Clojure: `(defn find-order [n prereqs]
  (let [graph (reduce (fn [g [a b]] (update g b (fnil conj []) a)) {} prereqs)
        dfs (fn dfs [v {:keys [path done order cycle] :as s}]
              (cond
                (or cycle (done v)) s
                (path v) (assoc s :cycle true)
                :else
                (let [s2 (reduce (fn [st nb] (dfs nb st))
                                 (update s :path conj v)
                                 (get graph v []))]
                  (-> s2 (update :done conj v) (update :order conj v)))))]
    (let [result (reduce (fn [s i] (dfs i s))
                         {:path #{} :done #{} :order [] :cycle false}
                         (range n))]
      (if (:cycle result) [] (:order result)))))`,

    Lisp: `(defun find-order (n prereqs)
  (let ((graph (make-hash-table)) (done (make-hash-table))
        (path (make-hash-table)) (order nil) (has-cycle nil))
    (dolist (p prereqs)
      (push (first p) (gethash (second p) graph nil)))
    (labels ((dfs (v)
               (unless (or has-cycle (gethash v done))
                 (when (gethash v path) (setf has-cycle t) (return-from dfs))
                 (setf (gethash v path) t)
                 (dolist (nb (gethash v graph nil)) (dfs nb))
                 (setf (gethash v done) t)
                 (push v order))))
      (dotimes (i n) (dfs i))
      (if has-cycle nil (nreverse order)))))`,
  },

  // ─── Problem 106: Design Add and Search Words Data Structure (LC 211) ─────────
  106: {
    TypeScript: `type WNode = { children: Record<string, WNode>; end: boolean };
const newWNode = (): WNode => ({ children: {}, end: false });
const addWord = (node: WNode, word: string): WNode =>
  word.length === 0
    ? { ...node, end: true }
    : { ...node, children: {
        ...node.children,
        [word[0]]: addWord(node.children[word[0]] || newWNode(), word.slice(1))
      }};
const searchWord = (node: WNode, word: string): boolean =>
  word.length === 0 ? node.end
    : word[0] === '.'
      ? Object.values(node.children).some(c => searchWord(c, word.slice(1)))
      : word[0] in node.children && searchWord(node.children[word[0]], word.slice(1));`,

    Haskell: `import qualified Data.Map as M
data WDict = WDict (M.Map Char WDict) Bool

emptyDict :: WDict
emptyDict = WDict M.empty False

addWord :: String -> WDict -> WDict
addWord [] (WDict m _) = WDict m True
addWord (c:cs) (WDict m e) =
  WDict (M.alter (Just . addWord cs . maybe emptyDict id) c m) e

searchWord :: String -> WDict -> Bool
searchWord [] (WDict _ e) = e
searchWord ('.':cs) (WDict m _) = any (searchWord cs) (M.elems m)
searchWord (c:cs) (WDict m _) = maybe False (searchWord cs) (M.lookup c m)`,

    Elixir: `defmodule WordDict do
  def new, do: %{ch: %{}, end: false}
  def add(node, <<>>), do: %{node | end: true}
  def add(node, <<c, rest::binary>>) do
    child = Map.get(node.ch, c, new())
    %{node | ch: Map.put(node.ch, c, add(child, rest))}
  end
  def search(node, <<>>), do: node.end
  def search(node, <<?., rest::binary>>),
    do: Enum.any?(Map.values(node.ch), &search(&1, rest))
  def search(node, <<c, rest::binary>>),
    do: if Map.has_key?(node.ch, c), do: search(node.ch[c], rest), else: false
end`,

    Rust: `use std::collections::HashMap;

#[derive(Clone, Default)]
struct WordDict { children: HashMap<char, WordDict>, is_end: bool }

impl WordDict {
    fn new() -> Self { Self::default() }
    fn add(&self, word: &str) -> Self {
        match word.chars().next() {
            None => WordDict { is_end: true, ..self.clone() },
            Some(c) => {
                let child = self.children.get(&c).cloned().unwrap_or_default();
                let mut ch = self.children.clone();
                ch.insert(c, child.add(&word[c.len_utf8()..]));
                WordDict { children: ch, is_end: self.is_end }
            }
        }
    }
    fn search(&self, word: &str) -> bool {
        match word.chars().next() {
            None => self.is_end,
            Some('.') => self.children.values().any(|c| c.search(&word[1..])),
            Some(c) => self.children.get(&c)
                .map_or(false, |t| t.search(&word[c.len_utf8()..]))
        }
    }
}`,

    Scala: `case class WordDict(ch: Map[Char, WordDict] = Map(), end: Boolean = false) {
  def add(w: String): WordDict = w.headOption match {
    case None => copy(end = true)
    case Some(c) => copy(ch = ch + (c -> ch.getOrElse(c, WordDict()).add(w.tail)))
  }
  def search(w: String): Boolean = w.headOption match {
    case None => end
    case Some('.') => ch.values.exists(_.search(w.tail))
    case Some(c) => ch.get(c).exists(_.search(w.tail))
  }
}`,

    OCaml: `type wdict = { children: (char * wdict) list; is_end: bool }
let empty_dict = { children = []; is_end = false }

let rec add_word word t = match word with
  | [] -> { t with is_end = true }
  | c :: cs ->
    let child = try List.assoc c t.children with Not_found -> empty_dict in
    { t with children =
      (c, add_word cs child) :: List.filter (fun (k,_) -> k <> c) t.children }

let rec search_word word t = match word with
  | [] -> t.is_end
  | '.' :: cs -> List.exists (fun (_, c) -> search_word cs c) t.children
  | c :: cs ->
    (try search_word cs (List.assoc c t.children) with Not_found -> false)`,

    Clojure: `(defn wd-new [] {:ch {} :end false})
(defn wd-add [node word]
  (if (empty? word) (assoc node :end true)
    (let [c (first word)
          child (get-in node [:ch c] (wd-new))]
      (assoc-in node [:ch c] (wd-add child (rest word))))))
(defn wd-search [node word]
  (if (empty? word) (:end node)
    (if (= (first word) \\.)
      (some #(wd-search % (rest word)) (vals (:ch node)))
      (when-let [child (get-in node [:ch (first word)])]
        (wd-search child (rest word))))))`,

    Lisp: `(defun wd-new () (cons (make-hash-table) nil))
(defun wd-add (node word)
  (if (zerop (length word)) (cons (car node) t)
    (let* ((c (char word 0)) (ht (car node))
           (child (or (gethash c ht) (wd-new))))
      (setf (gethash c ht) (wd-add child (subseq word 1))) node)))
(defun wd-search (node word)
  (if (zerop (length word)) (cdr node)
    (if (char= (char word 0) #\\.)
      (block found
        (maphash (lambda (_ c)
                   (when (wd-search c (subseq word 1))
                     (return-from found t)))
                 (car node)) nil)
      (let ((child (gethash (char word 0) (car node))))
        (and child (wd-search child (subseq word 1)))))))`,
  },

  // ─── Problem 107: Word Search II (LC 212) ─────────────────────────────────────
  107: {
    TypeScript: `function findWords(board: string[][], words: string[]): string[] {
  type TN = { children: Record<string, TN>; word: string | null };
  const empty = (): TN => ({ children: {}, word: null });
  const ins = (node: TN, w: string, i: number): TN =>
    i === w.length ? { ...node, word: w }
      : { ...node, children: { ...node.children,
          [w[i]]: ins(node.children[w[i]] || empty(), w, i + 1) }};
  const trie = words.reduce((t, w) => ins(t, w, 0), empty());
  const rows = board.length, cols = board[0].length;
  const dfs = (r: number, c: number, node: TN, seen: Set<string>,
               found: Set<string>): Set<string> => {
    const key = r + ',' + c;
    if (r < 0 || r >= rows || c < 0 || c >= cols || seen.has(key)) return found;
    const ch = board[r][c];
    if (!(ch in node.children)) return found;
    const next = node.children[ch];
    const f = next.word ? new Set([...found, next.word]) : found;
    const s = new Set([...seen, key]);
    return [[-1,0],[1,0],[0,-1],[0,1]].reduce(
      (acc, [dr, dc]) => dfs(r+dr, c+dc, next, s, acc), f);
  };
  const result = Array.from({ length: rows * cols }).reduce<Set<string>>(
    (f, _, idx) => dfs(Math.floor(idx/cols), idx%cols, trie, new Set(), f),
    new Set());
  return [...result];
}`,

    Haskell: `import qualified Data.Map as M
import qualified Data.Set as S

data TN = TN (M.Map Char TN) (Maybe String)
emptyTN :: TN
emptyTN = TN M.empty Nothing

insertTN :: String -> String -> TN -> TN
insertTN [] w (TN m _) = TN m (Just w)
insertTN (c:cs) w (TN m v) =
  TN (M.alter (Just . insertTN cs w . maybe emptyTN id) c m) v

findWords :: [[Char]] -> [String] -> [String]
findWords board words = S.toList found
  where
    trie = foldr (\\w t -> insertTN w w t) emptyTN words
    rows = length board; cols = length (head board)
    at r c = (board !! r) !! c
    dfs r c (TN m _) seen found
      | r<0 || r>=rows || c<0 || c>=cols || S.member (r,c) seen = found
      | otherwise = case M.lookup (at r c) m of
          Nothing -> found
          Just next@(TN _ mw) ->
            let f = maybe found (\\w -> S.insert w found) mw
                s = S.insert (r,c) seen
            in foldl (\\f' (dr,dc) -> dfs (r+dr) (c+dc) next s f')
                     f [(-1,0),(1,0),(0,-1),(0,1)]
    found = foldl (\\f (r,c) -> dfs r c trie S.empty f)
                  S.empty [(r,c) | r <- [0..rows-1], c <- [0..cols-1]]`,

    Elixir: `defmodule WordSearchII do
  def find_words(board, words) do
    trie = Enum.reduce(words, %{ch: %{}, word: nil}, &trie_ins(&2, &1, 0))
    rows = length(board); cols = length(hd(board))
    g = for {row, r} <- Enum.with_index(board),
            {cell, c} <- Enum.with_index(row), into: %{}, do: {{r, c}, cell}
    for(r <- 0..(rows-1), c <- 0..(cols-1), do: {r, c})
    |> Enum.reduce(MapSet.new(), fn {r, c}, found ->
      dfs(r, c, trie, MapSet.new(), found, g, rows, cols) end)
    |> MapSet.to_list()
  end
  defp trie_ins(node, w, i) when i == byte_size(w), do: %{node | word: w}
  defp trie_ins(node, w, i) do
    c = :binary.at(w, i)
    child = Map.get(node.ch, c, %{ch: %{}, word: nil})
    %{node | ch: Map.put(node.ch, c, trie_ins(child, w, i + 1))}
  end
  defp dfs(r, c, node, seen, found, g, rows, cols) do
    if r < 0 or r >= rows or c < 0 or c >= cols or MapSet.member?(seen, {r, c}),
      do: found,
    else: case Map.get(node.ch, g[{r, c}]) do
      nil -> found
      next ->
        f = if next.word, do: MapSet.put(found, next.word), else: found
        s = MapSet.put(seen, {r, c})
        Enum.reduce([{-1,0},{1,0},{0,-1},{0,1}], f, fn {dr,dc}, acc ->
          dfs(r+dr, c+dc, next, s, acc, g, rows, cols) end)
    end
  end
end`,

    Rust: `use std::collections::{HashMap, HashSet};

struct TrieN { children: HashMap<char, TrieN>, word: Option<String> }
impl TrieN {
    fn new() -> Self { TrieN { children: HashMap::new(), word: None } }
    fn insert(&mut self, w: &str) {
        let mut node = self;
        for c in w.chars() {
            node = node.children.entry(c).or_insert_with(TrieN::new);
        }
        node.word = Some(w.to_string());
    }
}
fn find_words(board: &[Vec<char>], words: &[&str]) -> Vec<String> {
    let mut trie = TrieN::new();
    for w in words { trie.insert(w); }
    let (rows, cols) = (board.len(), board[0].len());
    let mut found = HashSet::new();
    fn dfs(r: i32, c: i32, node: &TrieN, board: &[Vec<char>],
           seen: &mut HashSet<(i32,i32)>, found: &mut HashSet<String>,
           rows: usize, cols: usize) {
        if r < 0 || r >= rows as i32 || c < 0 || c >= cols as i32 { return; }
        if !seen.insert((r, c)) { return; }
        if let Some(next) = node.children.get(&board[r as usize][c as usize]) {
            if let Some(ref w) = next.word { found.insert(w.clone()); }
            for (dr,dc) in [(-1i32,0),(1,0),(0,-1),(0,1)] {
                dfs(r+dr, c+dc, next, board, seen, found, rows, cols);
            }
        }
        seen.remove(&(r, c));
    }
    for r in 0..rows as i32 { for c in 0..cols as i32 {
        dfs(r, c, &trie, board, &mut HashSet::new(), &mut found, rows, cols);
    }}
    found.into_iter().collect()
}`,

    Scala: `case class TrieN(ch: Map[Char, TrieN] = Map(), word: Option[String] = None) {
  def insert(w: String, i: Int = 0): TrieN =
    if (i == w.length) copy(word = Some(w))
    else copy(ch = ch + (w(i) -> ch.getOrElse(w(i), TrieN()).insert(w, i + 1)))
}
def findWords(board: Array[Array[Char]], words: Array[String]): List[String] = {
  val trie = words.foldLeft(TrieN())((t, w) => t.insert(w))
  val (rows, cols) = (board.length, board(0).length)
  def dfs(r: Int, c: Int, node: TrieN,
          seen: Set[(Int,Int)], found: Set[String]): Set[String] = {
    if (r < 0 || r >= rows || c < 0 || c >= cols || seen((r,c))) found
    else node.ch.get(board(r)(c)) match {
      case None => found
      case Some(next) =>
        val f = next.word.fold(found)(found + _)
        List((-1,0),(1,0),(0,-1),(0,1)).foldLeft(f) {
          case (acc, (dr,dc)) => dfs(r+dr, c+dc, next, seen + ((r,c)), acc)
        }
    }
  }
  (for (r <- 0 until rows; c <- 0 until cols) yield (r,c))
    .foldLeft(Set.empty[String])((f, rc) =>
      dfs(rc._1, rc._2, trie, Set(), f)).toList
}`,

    OCaml: `type trie_n = { tn_ch: (char * trie_n) list; tn_word: string option }
let empty_tn = { tn_ch = []; tn_word = None }

let rec insert_tn w i t =
  if i = String.length w then { t with tn_word = Some w }
  else let c = w.[i] in
    let child = try List.assoc c t.tn_ch with Not_found -> empty_tn in
    { t with tn_ch = (c, insert_tn w (i+1) child) ::
      List.filter (fun (k,_) -> k <> c) t.tn_ch }

module PS = Set.Make(struct type t = int * int let compare = compare end)
module SS = Set.Make(String)

let find_words board words =
  let trie = List.fold_left (fun t w -> insert_tn w 0 t) empty_tn words in
  let rows = Array.length board and cols = Array.length board.(0) in
  let rec dfs r c node seen found =
    if r < 0 || r >= rows || c < 0 || c >= cols || PS.mem (r,c) seen then found
    else try
      let next = List.assoc board.(r).(c) node.tn_ch in
      let f = match next.tn_word with Some w -> SS.add w found | None -> found in
      let s = PS.add (r,c) seen in
      List.fold_left (fun f' (dr,dc) -> dfs (r+dr) (c+dc) next s f')
        f [(-1,0);(1,0);(0,-1);(0,1)]
    with Not_found -> found in
  let found = ref SS.empty in
  for r = 0 to rows-1 do for c = 0 to cols-1 do
    found := dfs r c trie PS.empty !found done done;
  SS.elements !found`,

    Clojure: `(defn find-words [board words]
  (let [ins (fn ins [node w i]
              (if (= i (count w)) (assoc node :word w)
                (update-in node [:ch (nth w i)]
                  #(ins (or % {:ch {} :word nil}) w (inc i)))))
        trie (reduce #(ins %1 %2 0) {:ch {} :word nil} words)
        rows (count board) cols (count (first board))
        at (fn [r c] (get-in board [r c]))]
    (letfn [(dfs [r c node seen found]
              (if (or (< r 0) (>= r rows) (< c 0) (>= c cols) (seen [r c])) found
                (if-let [next (get-in node [:ch (at r c)])]
                  (let [f (if (:word next) (conj found (:word next)) found)
                        s (conj seen [r c])]
                    (reduce (fn [acc [dr dc]] (dfs (+ r dr) (+ c dc) next s acc))
                            f [[-1 0] [1 0] [0 -1] [0 1]]))
                  found)))]
      (vec (reduce (fn [f [r c]] (dfs r c trie #{} f))
                   #{} (for [r (range rows) c (range cols)] [r c]))))))`,

    Lisp: `(defun find-words (board words)
  (let ((trie (make-hash-table)))
    (labels ((ins (node w i)
               (if (= i (length w)) (setf (gethash :word node) w)
                 (let ((ch (or (gethash :ch node) (make-hash-table))))
                   (setf (gethash :ch node) ch)
                   (unless (gethash (char w i) ch)
                     (setf (gethash (char w i) ch) (make-hash-table)))
                   (ins (gethash (char w i) ch) w (1+ i))))))
      (dolist (w words) (ins trie w 0)))
    (let ((rows (length board)) (cols (length (car board)))
          (found (make-hash-table :test #'equal)))
      (labels ((at (r c) (nth c (nth r board)))
               (dfs (r c node seen)
                 (when (and (>= r 0) (< r rows) (>= c 0) (< c cols)
                            (not (gethash (cons r c) seen)))
                   (let* ((ch-map (gethash :ch node))
                          (next (and ch-map (gethash (at r c) ch-map))))
                     (when next
                       (let ((w (gethash :word next)))
                         (when w (setf (gethash w found) t)))
                       (setf (gethash (cons r c) seen) t)
                       (dolist (d '((-1 0)(1 0)(0 -1)(0 1)))
                         (dfs (+ r (car d)) (+ c (cadr d)) next seen))
                       (remhash (cons r c) seen))))))
        (dotimes (r rows)
          (dotimes (c cols)
            (dfs r c trie (make-hash-table :test #'equal)))))
      (let (result)
        (maphash (lambda (k _) (push k result)) found) result))))`,
  },

  // ─── Problem 108: Kth Largest Element in an Array (LC 215) ────────────────────
  108: {
    TypeScript: `function findKthLargest(nums: number[], k: number): number {
  const pivot = nums[Math.floor(nums.length / 2)];
  const hi = nums.filter(x => x > pivot);
  const eq = nums.filter(x => x === pivot);
  const lo = nums.filter(x => x < pivot);
  if (k <= hi.length) return findKthLargest(hi, k);
  if (k <= hi.length + eq.length) return pivot;
  return findKthLargest(lo, k - hi.length - eq.length);
}`,

    Haskell: `findKthLargest :: Ord a => [a] -> Int -> a
findKthLargest xs k =
  let pivot = xs !! (length xs \`div\` 2)
      hi = filter (> pivot) xs
      eq = filter (== pivot) xs
      lo = filter (< pivot) xs
  in if k <= length hi then findKthLargest hi k
     else if k <= length hi + length eq then pivot
     else findKthLargest lo (k - length hi - length eq)`,

    Elixir: `defmodule KthLargest do
  def find(nums, k) do
    pivot = Enum.at(nums, div(length(nums), 2))
    hi = Enum.filter(nums, &(&1 > pivot))
    eq = Enum.filter(nums, &(&1 == pivot))
    lo = Enum.filter(nums, &(&1 < pivot))
    cond do
      k <= length(hi) -> find(hi, k)
      k <= length(hi) + length(eq) -> pivot
      true -> find(lo, k - length(hi) - length(eq))
    end
  end
end`,

    Rust: `fn find_kth_largest(nums: &[i32], k: usize) -> i32 {
    let pivot = nums[nums.len() / 2];
    let hi: Vec<_> = nums.iter().filter(|&&x| x > pivot).cloned().collect();
    let eq: Vec<_> = nums.iter().filter(|&&x| x == pivot).cloned().collect();
    let lo: Vec<_> = nums.iter().filter(|&&x| x < pivot).cloned().collect();
    if k <= hi.len() { find_kth_largest(&hi, k) }
    else if k <= hi.len() + eq.len() { pivot }
    else { find_kth_largest(&lo, k - hi.len() - eq.len()) }
}`,

    Scala: `def findKthLargest(nums: Array[Int], k: Int): Int = {
  val pivot = nums(nums.length / 2)
  val (hi, eq, lo) = (nums.filter(_ > pivot),
    nums.filter(_ == pivot), nums.filter(_ < pivot))
  if (k <= hi.length) findKthLargest(hi, k)
  else if (k <= hi.length + eq.length) pivot
  else findKthLargest(lo, k - hi.length - eq.length)
}`,

    OCaml: `let rec find_kth_largest nums k =
  let pivot = List.nth nums (List.length nums / 2) in
  let hi = List.filter (fun x -> x > pivot) nums in
  let eq = List.filter (fun x -> x = pivot) nums in
  let lo = List.filter (fun x -> x < pivot) nums in
  if k <= List.length hi then find_kth_largest hi k
  else if k <= List.length hi + List.length eq then pivot
  else find_kth_largest lo (k - List.length hi - List.length eq)`,

    Clojure: `(defn find-kth-largest [nums k]
  (let [pivot (nth nums (quot (count nums) 2))
        hi (filter #(> % pivot) nums)
        eq (filter #(= % pivot) nums)
        lo (filter #(< % pivot) nums)]
    (cond
      (<= k (count hi)) (recur hi k)
      (<= k (+ (count hi) (count eq))) pivot
      :else (recur lo (- k (count hi) (count eq))))))`,

    Lisp: `(defun find-kth-largest (nums k)
  (let* ((pivot (nth (floor (length nums) 2) nums))
         (hi (remove-if-not (lambda (x) (> x pivot)) nums))
         (eq (remove-if-not (lambda (x) (= x pivot)) nums))
         (lo (remove-if-not (lambda (x) (< x pivot)) nums)))
    (cond
      ((<= k (length hi)) (find-kth-largest hi k))
      ((<= k (+ (length hi) (length eq))) pivot)
      (t (find-kth-largest lo (- k (length hi) (length eq)))))))`,
  },

  // ─── Problem 109: Contains Duplicate (LC 217) ─────────────────────────────────
  109: {
    TypeScript: `function containsDuplicate(nums: number[]): boolean {
  return nums.reduce<{ seen: Set<number>; dup: boolean }>(
    (acc, n) => acc.dup ? acc
      : acc.seen.has(n) ? { ...acc, dup: true }
      : { seen: new Set([...acc.seen, n]), dup: false },
    { seen: new Set(), dup: false }
  ).dup;
}`,

    Haskell: `import qualified Data.Set as S

containsDuplicate :: Ord a => [a] -> Bool
containsDuplicate = go S.empty
  where
    go _ [] = False
    go seen (x:xs)
      | S.member x seen = True
      | otherwise = go (S.insert x seen) xs`,

    Elixir: `defmodule ContainsDup do
  def check(nums) do
    Enum.reduce_while(nums, MapSet.new(), fn n, seen ->
      if MapSet.member?(seen, n), do: {:halt, true},
      else: {:cont, MapSet.put(seen, n)}
    end) == true
  end
end`,

    Rust: `use std::collections::HashSet;

fn contains_duplicate(nums: &[i32]) -> bool {
    nums.iter().try_fold(HashSet::new(), |mut s, &n| {
        if s.contains(&n) { Err(()) } else { s.insert(n); Ok(s) }
    }).is_err()
}`,

    Scala: `def containsDuplicate(nums: Array[Int]): Boolean =
  nums.foldLeft((Set.empty[Int], false)) {
    case ((_, true), _) => (Set.empty, true)
    case ((seen, false), n) => if (seen(n)) (seen, true) else (seen + n, false)
  }._2`,

    OCaml: `module IS = Set.Make(Int)

let contains_duplicate nums =
  let rec go seen = function
    | [] -> false
    | x :: xs -> IS.mem x seen || go (IS.add x seen) xs
  in go IS.empty nums`,

    Clojure: `(defn contains-duplicate [nums]
  (not= (count nums) (count (set nums))))`,

    Lisp: `(defun contains-duplicate (nums)
  (let ((seen (make-hash-table)))
    (some (lambda (n)
            (if (gethash n seen) t
              (progn (setf (gethash n seen) t) nil)))
          nums)))`,
  },

  // ─── Problem 110: Maximal Square (LC 221) ─────────────────────────────────────
  110: {
    TypeScript: `function maximalSquare(matrix: string[][]): number {
  const [mx] = matrix.reduce<[number, number[]]>(
    ([best, prev], row, r) => {
      const curr = row.reduce<number[]>((acc, cell, c) => [
        ...acc,
        cell === '0' ? 0
          : (r === 0 || c === 0) ? 1
          : Math.min(prev[c-1], prev[c], acc[c-1]) + 1
      ], []);
      return [Math.max(best, ...curr), curr];
    }, [0, []]
  );
  return mx * mx;
}`,

    Haskell: `maximalSquare :: [[Char]] -> Int
maximalSquare [] = 0
maximalSquare mat =
  let cols = length (head mat)
      buildRow r prev row = reverse $ snd $
        foldl (\\(c, acc) cell ->
          let v = if cell == '0' then 0
                  else if r == 0 || c == 0 then 1
                  else minimum [prev !! (c-1), prev !! c,
                                if null acc then 0 else head acc] + 1
          in (c+1, v : acc)) (0, []) row
      (mx, _) = foldl (\\(best, prev) (r, row) ->
        let curr = buildRow r prev row
        in (max best (foldl max 0 curr), curr))
        (0, replicate cols 0) (zip [0..] mat)
  in mx * mx`,

    Elixir: `defmodule MaxSquare do
  def maximal_square(matrix) do
    {mx, _} = Enum.reduce(Enum.with_index(matrix), {0, []},
      fn {row, r}, {best, prev} ->
        curr = Enum.reduce(Enum.with_index(row), [], fn {cell, c}, acc ->
          v = if cell == "0", do: 0,
            else: if r == 0 or c == 0, do: 1,
            else: Enum.min([Enum.at(prev, c-1), Enum.at(prev, c),
                            if(acc == [], do: 0, else: hd(acc))]) + 1
          [v | acc]
        end) |> Enum.reverse()
        {max(best, Enum.max(curr, fn -> 0 end)), curr}
      end)
    mx * mx
  end
end`,

    Rust: `fn maximal_square(matrix: &[Vec<char>]) -> i32 {
    let cols = matrix[0].len();
    let (mx, _) = matrix.iter().enumerate().fold(
        (0i32, vec![0i32; cols]),
        |(best, prev), (r, row)| {
            let curr = row.iter().enumerate().fold(Vec::new(),
                |mut acc, (c, &cell)| {
                    let v = if cell == '0' { 0 }
                        else if r == 0 || c == 0 { 1 }
                        else {
                            *[prev[c-1], prev[c],
                              *acc.last().unwrap_or(&0)]
                            .iter().min().unwrap() + 1
                        };
                    acc.push(v); acc
                });
            let row_max = *curr.iter().max().unwrap_or(&0);
            (best.max(row_max), curr)
        });
    mx * mx
}`,

    Scala: `def maximalSquare(matrix: Array[Array[Char]]): Int = {
  val cols = matrix(0).length
  val (mx, _) = matrix.zipWithIndex.foldLeft((0, Array.fill(cols)(0))) {
    case ((best, prev), (row, r)) =>
      val curr = row.zipWithIndex.foldLeft(Array.empty[Int]) {
        case (acc, (cell, c)) =>
          val v = if (cell == '0') 0
            else if (r == 0 || c == 0) 1
            else Seq(prev(c-1), prev(c), acc.lastOption.getOrElse(0)).min + 1
          acc :+ v
      }
      (best max curr.max, curr)
  }
  mx * mx
}`,

    OCaml: `let maximal_square matrix =
  let rows = Array.length matrix and cols = Array.length matrix.(0) in
  let dp = Array.init rows (fun r ->
    Array.init cols (fun c ->
      if matrix.(r).(c) = '0' then 0
      else if r = 0 || c = 0 then 1
      else 0)) in
  for r = 1 to rows - 1 do
    for c = 1 to cols - 1 do
      if matrix.(r).(c) <> '0' then
        dp.(r).(c) <- min (min dp.(r-1).(c-1) dp.(r-1).(c)) dp.(r).(c-1) + 1
    done
  done;
  let mx = Array.fold_left (fun best row ->
    Array.fold_left max best row) 0 dp in
  mx * mx`,

    Clojure: `(defn maximal-square [matrix]
  (let [cols (count (first matrix))
        [mx _] (reduce
          (fn [[best prev] [r row]]
            (let [curr (reduce
                    (fn [acc [c cell]]
                      (conj acc
                        (if (= cell \\0) 0
                          (if (or (zero? r) (zero? c)) 1
                            (inc (min (nth prev (dec c)) (nth prev c)
                                      (peek acc)))))))
                    [] (map-indexed vector row))]
              [(max best (apply max 0 curr)) curr]))
          [0 (vec (repeat cols 0))]
          (map-indexed vector matrix))]
    (* mx mx)))`,

    Lisp: `(defun maximal-square (matrix)
  (let* ((rows (length matrix)) (cols (length (car matrix)))
         (prev (make-list cols :initial-element 0)) (mx 0))
    (dotimes (r rows)
      (let ((curr nil))
        (dotimes (c cols)
          (let ((cell (nth c (nth r matrix))))
            (push (if (char= cell #\\0) 0
                    (if (or (= r 0) (= c 0)) 1
                      (1+ (min (nth (1- c) prev) (nth c prev)
                               (if curr (car curr) 0)))))
                  curr)))
        (setf prev (nreverse curr))
        (setf mx (max mx (apply #'max prev)))))
    (* mx mx)))`,
  },

  // ─── Problem 111: Flood Fill (LC 733) ──────────────────────────────────────────
  111: {
    TypeScript: `function floodFill(image: number[][], sr: number, sc: number,
                    color: number): number[][] {
  const orig = image[sr][sc];
  if (orig === color) return image;
  const fill = (img: number[][], r: number, c: number): number[][] => {
    if (r < 0 || r >= img.length || c < 0 || c >= img[0].length) return img;
    if (img[r][c] !== orig) return img;
    const updated = img.map((row, i) =>
      i === r ? row.map((v, j) => j === c ? color : v) : row
    );
    return [[-1,0],[1,0],[0,-1],[0,1]].reduce(
      (acc, [nr, nc]) => fill(acc, r+nr, c+nc), updated);
  };
  return fill(image, sr, sc);
}`,

    Haskell: `floodFill :: [[Int]] -> Int -> Int -> Int -> [[Int]]
floodFill image sr sc color
  | orig == color = image
  | otherwise = fill image sr sc
  where
    rows = length image; cols = length (head image)
    orig = (image !! sr) !! sc
    setAt img r c v = zipWith (\\row ri ->
      if ri == r then zipWith (\\cell ci ->
        if ci == c then v else cell) row [0..] else row) img [0..]
    fill img r c
      | r < 0 || r >= rows || c < 0 || c >= cols = img
      | (img !! r) !! c /= orig = img
      | otherwise = foldl (\\i (dr,dc) -> fill i (r+dr) (c+dc))
                          (setAt img r c color)
                          [(-1,0),(1,0),(0,-1),(0,1)]`,

    Elixir: `defmodule FloodFill do
  def fill(image, sr, sc, color) do
    orig = image |> Enum.at(sr) |> Enum.at(sc)
    if orig == color, do: image, else: do_fill(image, sr, sc, color, orig)
  end
  defp do_fill(img, r, c, color, orig) do
    rows = length(img); cols = length(hd(img))
    if r < 0 or r >= rows or c < 0 or c >= cols do img
    else
      if Enum.at(Enum.at(img, r), c) != orig do img
      else
        updated = List.update_at(img, r, &List.replace_at(&1, c, color))
        [{-1,0},{1,0},{0,-1},{0,1}]
        |> Enum.reduce(updated, fn {dr, dc}, acc ->
          do_fill(acc, r+dr, c+dc, color, orig) end)
      end
    end
  end
end`,

    Rust: `fn flood_fill(image: &[Vec<i32>], sr: usize, sc: usize,
              color: i32) -> Vec<Vec<i32>> {
    let orig = image[sr][sc];
    if orig == color { return image.to_vec(); }
    fn fill(mut img: Vec<Vec<i32>>, r: i32, c: i32,
            color: i32, orig: i32) -> Vec<Vec<i32>> {
        let (rows, cols) = (img.len() as i32, img[0].len() as i32);
        if r < 0 || r >= rows || c < 0 || c >= cols { return img; }
        if img[r as usize][c as usize] != orig { return img; }
        img[r as usize][c as usize] = color;
        [(-1,0),(1,0),(0,-1),(0,1)].iter()
            .fold(img, |im, &(dr,dc)| fill(im, r+dr, c+dc, color, orig))
    }
    fill(image.to_vec(), sr as i32, sc as i32, color, orig)
}`,

    Scala: `def floodFill(image: Array[Array[Int]], sr: Int, sc: Int,
              color: Int): Array[Array[Int]] = {
  val orig = image(sr)(sc)
  if (orig == color) return image
  def fill(img: Vector[Vector[Int]], r: Int, c: Int): Vector[Vector[Int]] = {
    if (r < 0 || r >= img.length || c < 0 || c >= img(0).length) img
    else if (img(r)(c) != orig) img
    else {
      val updated = img.updated(r, img(r).updated(c, color))
      List((-1,0),(1,0),(0,-1),(0,1)).foldLeft(updated) {
        case (im, (dr, dc)) => fill(im, r+dr, c+dc)
      }
    }
  }
  fill(image.map(_.toVector).toVector, sr, sc).map(_.toArray).toArray
}`,

    OCaml: `let flood_fill image sr sc color =
  let rows = Array.length image and cols = Array.length image.(0) in
  let orig = image.(sr).(sc) in
  if orig = color then image
  else begin
    let img = Array.map Array.copy image in
    let rec fill r c =
      if r >= 0 && r < rows && c >= 0 && c < cols
         && img.(r).(c) = orig then begin
        img.(r).(c) <- color;
        List.iter (fun (dr,dc) -> fill (r+dr) (c+dc))
          [(-1,0);(1,0);(0,-1);(0,1)]
      end in
    fill sr sc; img
  end`,

    Clojure: `(defn flood-fill [image sr sc color]
  (let [orig (get-in image [sr sc])]
    (if (= orig color) image
      (letfn [(fill [img r c]
                (if (or (< r 0) (>= r (count img))
                        (< c 0) (>= c (count (first img)))
                        (not= (get-in img [r c]) orig))
                  img
                  (reduce (fn [im [dr dc]] (fill im (+ r dr) (+ c dc)))
                          (assoc-in img [r c] color)
                          [[-1 0] [1 0] [0 -1] [0 1]])))]
        (fill image sr sc)))))`,

    Lisp: `(defun flood-fill (image sr sc color)
  (let ((orig (aref (aref image sr) sc)))
    (if (= orig color) image
      (let ((img (map 'vector (lambda (row) (copy-seq row)) image)))
        (labels ((fill (r c)
                   (when (and (>= r 0) (< r (length img))
                              (>= c 0) (< c (length (aref img 0)))
                              (= (aref (aref img r) c) orig))
                     (setf (aref (aref img r) c) color)
                     (fill (1- r) c) (fill (1+ r) c)
                     (fill r (1- c)) (fill r (1+ c)))))
          (fill sr sc) img)))))`,
  },

  // ─── Problem 112: Asteroid Collision (LC 735) ─────────────────────────────────
  112: {
    TypeScript: `function asteroidCollision(asteroids: number[]): number[] {
  return asteroids.reduce<number[]>((stack, ast) => {
    const resolve = (s: number[], a: number): number[] => {
      if (s.length === 0 || a > 0 || s[s.length - 1] < 0) return [...s, a];
      if (s[s.length - 1] === -a) return s.slice(0, -1);
      if (s[s.length - 1] < -a) return resolve(s.slice(0, -1), a);
      return s;
    };
    return resolve(stack, ast);
  }, []);
}`,

    Haskell: `asteroidCollision :: [Int] -> [Int]
asteroidCollision = reverse . foldl resolve []
  where
    resolve [] a = [a]
    resolve stack@(top:rest) a
      | a > 0 || top < 0 = a : stack
      | top == negate a = rest
      | top < negate a = resolve rest a
      | otherwise = stack`,

    Elixir: `defmodule Asteroids do
  def collision(asteroids) do
    asteroids |> Enum.reduce([], &resolve/2) |> Enum.reverse()
  end
  defp resolve(ast, []), do: [ast]
  defp resolve(ast, [top | rest] = stack) do
    cond do
      ast > 0 or top < 0 -> [ast | stack]
      top == -ast -> rest
      top < -ast -> resolve(ast, rest)
      true -> stack
    end
  end
end`,

    Rust: `fn asteroid_collision(asteroids: Vec<i32>) -> Vec<i32> {
    asteroids.iter().fold(Vec::new(), |stack, &ast| {
        fn resolve(mut s: Vec<i32>, a: i32) -> Vec<i32> {
            match s.last() {
                None => { s.push(a); s }
                Some(&top) if a > 0 || top < 0 => { s.push(a); s }
                Some(&top) if top == -a => { s.pop(); s }
                Some(&top) if top < -a => { s.pop(); resolve(s, a) }
                _ => s
            }
        }
        resolve(stack, ast)
    })
}`,

    Scala: `def asteroidCollision(asteroids: Array[Int]): Array[Int] = {
  def resolve(stack: List[Int], a: Int): List[Int] = stack match {
    case Nil => List(a)
    case top :: rest if a > 0 || top < 0 => a :: stack
    case top :: rest if top == -a => rest
    case top :: rest if top < -a => resolve(rest, a)
    case _ => stack
  }
  asteroids.foldLeft(List.empty[Int])((s, a) =>
    resolve(s, a)).reverse.toArray
}`,

    OCaml: `let asteroid_collision asteroids =
  let rec resolve stack a = match stack with
    | [] -> [a]
    | top :: rest when a > 0 || top < 0 -> a :: stack
    | top :: rest when top = -a -> rest
    | top :: rest when top < -a -> resolve rest a
    | _ -> stack in
  List.fold_left resolve [] asteroids |> List.rev`,

    Clojure: `(defn asteroid-collision [asteroids]
  (letfn [(resolve [stack a]
            (cond
              (empty? stack) [a]
              (or (pos? a) (neg? (peek stack))) (conj stack a)
              (= (peek stack) (- a)) (pop stack)
              (< (peek stack) (- a)) (resolve (pop stack) a)
              :else stack))]
    (reduce resolve [] asteroids)))`,

    Lisp: `(defun asteroid-collision (asteroids)
  (labels ((resolve (stack a)
             (cond
               ((null stack) (list a))
               ((or (> a 0) (< (car stack) 0)) (cons a stack))
               ((= (car stack) (- a)) (cdr stack))
               ((< (car stack) (- a)) (resolve (cdr stack) a))
               (t stack))))
    (nreverse
      (reduce #'resolve asteroids :initial-value nil))))`,
  },

  // ─── Problem 113: Basic Calculator (LC 224) ───────────────────────────────────
  113: {
    TypeScript: `function calculate(s: string): number {
  const chars = [...s.replace(/\\s/g, '')];
  const parse = (i: number): [number, number] => {
    const go = (pos: number, result: number, sign: number): [number, number] => {
      if (pos >= chars.length || chars[pos] === ')') return [result, pos + 1];
      if (chars[pos] === '+') return go(pos + 1, result, 1);
      if (chars[pos] === '-') return go(pos + 1, result, -1);
      if (chars[pos] === '(') {
        const [val, next] = parse(pos + 1);
        return go(next, result + sign * val, 1);
      }
      const [num, next] = readNum(pos, 0);
      return go(next, result + sign * num, 1);
    };
    return go(i, 0, 1);
  };
  const readNum = (i: number, acc: number): [number, number] =>
    i < chars.length && chars[i] >= '0' && chars[i] <= '9'
      ? readNum(i + 1, acc * 10 + Number(chars[i]))
      : [acc, i];
  return parse(0)[0];
}`,

    Haskell: `import Data.Char (isDigit, digitToInt)

calculate :: String -> Int
calculate = fst . parse . filter (/= ' ')
  where
    parse = go 0 1
    go result sign [] = (result, [])
    go result sign (')':rest) = (result, rest)
    go result sign ('+':rest) = go result 1 rest
    go result sign ('-':rest) = go result (-1) rest
    go result sign ('(':rest) =
      let (val, rest') = parse rest
      in go (result + sign * val) 1 rest'
    go result sign cs =
      let (digits, rest) = span isDigit cs
          num = foldl (\\a d -> a * 10 + digitToInt d) 0 digits
      in go (result + sign * num) 1 rest`,

    Elixir: `defmodule BasicCalc do
  def calculate(s) do
    chars = s |> String.replace(" ", "") |> String.graphemes()
    {result, _} = parse(chars)
    result
  end
  defp parse(chars), do: go(chars, 0, 1)
  defp go([], result, _sign), do: {result, []}
  defp go([")" | rest], result, _sign), do: {result, rest}
  defp go(["+" | rest], result, _sign), do: go(rest, result, 1)
  defp go(["-" | rest], result, _sign), do: go(rest, result, -1)
  defp go(["(" | rest], result, sign) do
    {val, rest2} = parse(rest)
    go(rest2, result + sign * val, 1)
  end
  defp go(chars, result, sign) do
    {digits, rest} = Enum.split_while(chars, &(&1 >= "0" and &1 <= "9"))
    num = Enum.reduce(digits, 0, fn d, a -> a * 10 + String.to_integer(d) end)
    go(rest, result + sign * num, 1)
  end
end`,

    Rust: `fn calculate(s: &str) -> i32 {
    let chars: Vec<char> = s.chars().filter(|c| !c.is_whitespace()).collect();
    fn parse(chars: &[char], mut i: usize) -> (i32, usize) {
        let (mut result, mut sign) = (0i32, 1i32);
        while i < chars.len() && chars[i] != ')' {
            match chars[i] {
                '+' => { sign = 1; i += 1; }
                '-' => { sign = -1; i += 1; }
                '(' => {
                    let (v, ni) = parse(chars, i + 1);
                    result += sign * v; sign = 1; i = ni;
                }
                _ => {
                    let mut num = 0i32;
                    while i < chars.len() && chars[i].is_ascii_digit() {
                        num = num * 10 + (chars[i] as i32 - '0' as i32);
                        i += 1;
                    }
                    result += sign * num; sign = 1;
                }
            }
        }
        (result, i + 1)
    }
    parse(&chars, 0).0
}`,

    Scala: `def calculate(s: String): Int = {
  val chars = s.filterNot(_.isWhitespace).toList
  def parse(cs: List[Char]): (Int, List[Char]) = go(cs, 0, 1)
  def go(cs: List[Char], result: Int, sign: Int): (Int, List[Char]) = cs match {
    case Nil => (result, Nil)
    case ')' :: rest => (result, rest)
    case '+' :: rest => go(rest, result, 1)
    case '-' :: rest => go(rest, result, -1)
    case '(' :: rest =>
      val (v, rest2) = parse(rest)
      go(rest2, result + sign * v, 1)
    case _ =>
      val (digits, rest) = cs.span(_.isDigit)
      val num = digits.foldLeft(0)((a, d) => a * 10 + d.asDigit)
      go(rest, result + sign * num, 1)
  }
  parse(chars)._1
}`,

    OCaml: `let calculate s =
  let chars = String.to_seq s
    |> Seq.filter (fun c -> c <> ' ') |> List.of_seq in
  let rec parse cs = go cs 0 1
  and go cs result sign = match cs with
    | [] -> (result, [])
    | ')' :: rest -> (result, rest)
    | '+' :: rest -> go rest result 1
    | '-' :: rest -> go rest result (-1)
    | '(' :: rest ->
      let (v, rest') = parse rest in
      go rest' (result + sign * v) 1
    | _ ->
      let rec read_num cs acc = match cs with
        | c :: rest when c >= '0' && c <= '9' ->
          read_num rest (acc * 10 + Char.code c - Char.code '0')
        | _ -> (acc, cs) in
      let (num, rest) = read_num cs 0 in
      go rest (result + sign * num) 1 in
  fst (parse chars)`,

    Clojure: `(defn calculate [s]
  (let [chars (vec (remove #(= % \\space) s))]
    (letfn [(parse [i] (go i 0 1))
            (go [i result sign]
              (cond
                (>= i (count chars)) [result i]
                (= (chars i) \\)) [result (inc i)]
                (= (chars i) \\+) (go (inc i) result 1)
                (= (chars i) \\-) (go (inc i) result -1)
                (= (chars i) \\() (let [[v ni] (parse (inc i))]
                                    (go ni (+ result (* sign v)) 1))
                :else (let [[num ni] (read-num i 0)]
                        (go ni (+ result (* sign num)) 1))))
            (read-num [i acc]
              (if (and (< i (count chars))
                       (Character/isDigit (chars i)))
                (read-num (inc i)
                  (+ (* acc 10) (Character/digit (chars i) 10)))
                [acc i]))]
      (first (parse 0)))))`,

    Lisp: `(defun calculate (s)
  (let ((chars (remove #\\Space (coerce s 'list))))
    (labels ((parse (cs) (go cs 0 1))
             (go (cs result sign)
               (cond
                 ((null cs) (values result cs))
                 ((char= (car cs) #\\)) (values result (cdr cs)))
                 ((char= (car cs) #\\+) (go (cdr cs) result 1))
                 ((char= (car cs) #\\-) (go (cdr cs) result -1))
                 ((char= (car cs) #\\()
                  (multiple-value-bind (v rest) (parse (cdr cs))
                    (go rest (+ result (* sign v)) 1)))
                 (t (multiple-value-bind (num rest) (read-num cs 0)
                      (go rest (+ result (* sign num)) 1)))))
             (read-num (cs acc)
               (if (and cs (digit-char-p (car cs)))
                 (read-num (cdr cs)
                   (+ (* acc 10) (digit-char-p (car cs))))
                 (values acc cs))))
      (parse chars))))`,
  },

  // ─── Problem 114: Invert Binary Tree (LC 226) ─────────────────────────────────
  114: {
    TypeScript: `type TreeNode = { val: number; left: TreeNode | null; right: TreeNode | null };
function invertTree(root: TreeNode | null): TreeNode | null {
  if (root === null) return null;
  return {
    val: root.val,
    left: invertTree(root.right),
    right: invertTree(root.left)
  };
}`,

    Haskell: `data Tree a = Empty | Node a (Tree a) (Tree a)

invertTree :: Tree a -> Tree a
invertTree Empty = Empty
invertTree (Node v l r) = Node v (invertTree r) (invertTree l)`,

    Elixir: `defmodule InvertTree do
  def invert(nil), do: nil
  def invert({val, left, right}),
    do: {val, invert(right), invert(left)}
end`,

    Rust: `#[derive(Clone)]
enum Tree { Nil, Node(i32, Box<Tree>, Box<Tree>) }

fn invert_tree(root: &Tree) -> Tree {
    match root {
        Tree::Nil => Tree::Nil,
        Tree::Node(v, l, r) =>
            Tree::Node(*v, Box::new(invert_tree(r)),
                           Box::new(invert_tree(l)))
    }
}`,

    Scala: `sealed trait BTree[+A]
case object Empty extends BTree[Nothing]
case class Node[A](v: A, l: BTree[A], r: BTree[A]) extends BTree[A]

def invertTree[A](root: BTree[A]): BTree[A] = root match {
  case Empty => Empty
  case Node(v, l, r) => Node(v, invertTree(r), invertTree(l))
}`,

    OCaml: `type 'a tree = Nil | Node of 'a * 'a tree * 'a tree

let rec invert_tree = function
  | Nil -> Nil
  | Node (v, l, r) -> Node (v, invert_tree r, invert_tree l)`,

    Clojure: `(defn invert-tree [root]
  (when root
    {:val (:val root)
     :left (invert-tree (:right root))
     :right (invert-tree (:left root))}))`,

    Lisp: `(defun invert-tree (root)
  (when root
    (list (car root)
          (invert-tree (caddr root))
          (invert-tree (cadr root)))))`,
  },

  // ─── Problem 115: Basic Calculator II (LC 227) ────────────────────────────────
  115: {
    TypeScript: `function calculate2(s: string): number {
  const tokens = [...s.replace(/\\s/g, '')];
  const readNum = (i: number, acc: number): [number, number] =>
    i < tokens.length && tokens[i] >= '0' && tokens[i] <= '9'
      ? readNum(i + 1, acc * 10 + Number(tokens[i])) : [acc, i];
  const parse = (i: number, stack: number[], op: string): number => {
    const [num, next] = readNum(i, 0);
    const newStack = op === '*'
      ? [...stack.slice(0, -1), stack[stack.length - 1] * num]
      : op === '/'
      ? [...stack.slice(0, -1), Math.trunc(stack[stack.length - 1] / num)]
      : op === '-' ? [...stack, -num] : [...stack, num];
    if (next >= tokens.length) return newStack.reduce((a, b) => a + b, 0);
    return parse(next + 1, newStack, tokens[next]);
  };
  return parse(0, [], '+');
}`,

    Haskell: `import Data.Char (isDigit, digitToInt)

calculate2 :: String -> Int
calculate2 s = sum $ parse (filter (/= ' ') s) [] '+'
  where
    readNum [] acc = (acc, [])
    readNum cs@(c:rest) acc
      | isDigit c = readNum rest (acc * 10 + digitToInt c)
      | otherwise = (acc, cs)
    parse cs stack op =
      let (num, rest) = readNum cs 0
          newStack = case op of
            '*' -> init stack ++ [last stack * num]
            '/' -> init stack ++ [quot (last stack) num]
            '-' -> stack ++ [-num]
            _   -> stack ++ [num]
      in case rest of
           [] -> newStack
           (c:rest') -> parse rest' newStack c`,

    Elixir: `defmodule BasicCalc2 do
  def calculate(s) do
    chars = s |> String.replace(" ", "") |> String.graphemes()
    {stack, _} = parse(chars, [], "+")
    Enum.sum(stack)
  end
  defp parse([], stack, _op), do: {stack, []}
  defp parse(chars, stack, op) do
    {digits, rest} = Enum.split_while(chars, &(&1 >= "0" and &1 <= "9"))
    n = Enum.join(digits) |> String.to_integer()
    new_stack = case op do
      "*" -> List.update_at(stack, -1, &(&1 * n))
      "/" -> List.update_at(stack, -1, &div(&1, n))
      "-" -> stack ++ [-n]
      _ -> stack ++ [n]
    end
    case rest do
      [] -> {new_stack, []}
      [c | rest2] -> parse(rest2, new_stack, c)
    end
  end
end`,

    Rust: `fn calculate2(s: &str) -> i32 {
    let chars: Vec<char> = s.chars()
        .filter(|c| !c.is_whitespace()).collect();
    fn read_num(chars: &[char], i: usize, acc: i32) -> (i32, usize) {
        if i < chars.len() && chars[i].is_ascii_digit() {
            read_num(chars, i + 1,
                acc * 10 + (chars[i] as i32 - '0' as i32))
        } else { (acc, i) }
    }
    fn parse(chars: &[char], i: usize,
             mut stack: Vec<i32>, op: char) -> i32 {
        let (num, next) = read_num(chars, i, 0);
        match op {
            '*' => { let l = stack.pop().unwrap(); stack.push(l * num); }
            '/' => { let l = stack.pop().unwrap(); stack.push(l / num); }
            '-' => stack.push(-num),
            _ => stack.push(num),
        }
        if next >= chars.len() { stack.iter().sum() }
        else { parse(chars, next + 1, stack, chars[next]) }
    }
    parse(&chars, 0, Vec::new(), '+')
}`,

    Scala: `def calculate2(s: String): Int = {
  val chars = s.filterNot(_.isWhitespace).toList
  def readNum(cs: List[Char], acc: Int): (Int, List[Char]) = cs match {
    case c :: rest if c.isDigit => readNum(rest, acc * 10 + c.asDigit)
    case _ => (acc, cs)
  }
  def parse(cs: List[Char], stack: List[Int], op: Char): Int = {
    val (num, rest) = readNum(cs, 0)
    val ns = op match {
      case '*' => (stack.head * num) :: stack.tail
      case '/' => (stack.head / num) :: stack.tail
      case '-' => (-num) :: stack
      case _ => num :: stack
    }
    rest match {
      case Nil => ns.sum
      case c :: rest2 => parse(rest2, ns, c)
    }
  }
  parse(chars, Nil, '+')
}`,

    OCaml: `let calculate2 s =
  let chars = String.to_seq s
    |> Seq.filter (fun c -> c <> ' ') |> List.of_seq in
  let rec read_num cs acc = match cs with
    | c :: rest when c >= '0' && c <= '9' ->
      read_num rest (acc * 10 + Char.code c - Char.code '0')
    | _ -> (acc, cs) in
  let rec parse cs stack op =
    let (num, rest) = read_num cs 0 in
    let ns = match op, stack with
      | '*', h :: t -> (h * num) :: t
      | '/', h :: t -> (h / num) :: t
      | '-', _ -> (-num) :: stack
      | _, _ -> num :: stack in
    match rest with
    | [] -> List.fold_left (+) 0 ns
    | c :: rest' -> parse rest' ns c in
  parse chars [] '+'`,

    Clojure: `(defn calculate2 [s]
  (let [chars (vec (remove #(Character/isWhitespace %) s))]
    (letfn [(read-num [i acc]
              (if (and (< i (count chars))
                       (Character/isDigit (chars i)))
                (read-num (inc i)
                  (+ (* acc 10) (Character/digit (chars i) 10)))
                [acc i]))
            (parse [i stack op]
              (let [[num next] (read-num i 0)
                    ns (case op
                         \\* (conj (pop stack) (* (peek stack) num))
                         \\/ (conj (pop stack) (quot (peek stack) num))
                         \\- (conj stack (- num))
                         (conj stack num))]
                (if (>= next (count chars))
                  (reduce + 0 ns)
                  (parse (inc next) ns (chars next)))))]
      (parse 0 [] \\+))))`,

    Lisp: `(defun calculate2 (s)
  (let ((chars (remove #\\Space (coerce s 'list))))
    (labels ((read-num (cs acc)
               (if (and cs (digit-char-p (car cs)))
                 (read-num (cdr cs)
                   (+ (* acc 10) (digit-char-p (car cs))))
                 (values acc cs)))
             (parse (cs stack op)
               (multiple-value-bind (num rest) (read-num cs 0)
                 (let ((ns (cond
                             ((char= op #\\*) (cons (* (car stack) num) (cdr stack)))
                             ((char= op #\\/) (cons (truncate (car stack) num) (cdr stack)))
                             ((char= op #\\-) (cons (- num) stack))
                             (t (cons num stack)))))
                   (if (null rest) (reduce #'+ ns)
                     (parse (cdr rest) ns (car rest)))))))
      (parse chars nil #\\+))))`,
  },

  // ─── Problem 116: Daily Temperatures (LC 739) ────────────────────────────────
  116: {
    TypeScript: `function dailyTemperatures(temperatures: number[]): number[] {
  const go = (i: number, stack: number[], res: number[]): number[] => {
    if (i < 0) return res;
    const pop = (s: number[]): number[] =>
      s.length > 0 && temperatures[s[s.length - 1]] <= temperatures[i]
        ? pop(s.slice(0, -1)) : s;
    const newStack = pop(stack);
    const val = newStack.length > 0 ? newStack[newStack.length - 1] - i : 0;
    const newRes = [...res.slice(0, i), val, ...res.slice(i + 1)];
    return go(i - 1, [i, ...newStack], newRes);
  };
  return go(temperatures.length - 1, [], Array(temperatures.length).fill(0));
}`,

    Haskell: `dailyTemperatures :: [Int] -> [Int]
dailyTemperatures temps = reverse $ snd $ foldl step ([], []) (zip [0..] temps)
  where
    step (stack, res) (i, t) =
      let stack' = dropWhile (\\(_, st) -> st <= t) stack
          val = case stack' of { [] -> 0; ((j,_):_) -> j - i }
      in ((i, t) : stack', val : res)
-- Note: uses left fold processing reversed input for stack approach`,

    Elixir: `defmodule DailyTemps do
  def daily_temperatures(temps) do
    temps
    |> Enum.with_index()
    |> List.foldr({[], %{}}, fn {t, i}, {stack, res} ->
      stack = Enum.drop_while(stack, fn {_, st} -> st <= t end)
      val = case stack do
        [] -> 0
        [{j, _} | _] -> j - i
      end
      {[{i, t} | stack], Map.put(res, i, val)}
    end)
    |> elem(1)
    |> Enum.sort_by(&elem(&1, 0))
    |> Enum.map(&elem(&1, 1))
  end
end`,

    Rust: `fn daily_temperatures(temps: Vec<i32>) -> Vec<i32> {
    let n = temps.len();
    fn go(temps: &[i32], i: i32, stack: Vec<usize>,
          mut res: Vec<i32>) -> Vec<i32> {
        if i < 0 { return res; }
        let idx = i as usize;
        let mut s = stack;
        while let Some(&top) = s.last() {
            if temps[top] <= temps[idx] { s.pop(); } else { break; }
        }
        res[idx] = s.last().map_or(0, |&j| (j - idx) as i32);
        s.push(idx);
        go(temps, i - 1, s, res)
    }
    go(&temps, (n as i32) - 1, vec![], vec![0; n])
}`,

    Scala: `def dailyTemperatures(temps: Array[Int]): Array[Int] = {
  val n = temps.length
  (0 until n).foldRight((List.empty[Int], Array.fill(n)(0))) {
    case (i, (stack, res)) =>
      val s = stack.dropWhile(j => temps(j) <= temps(i))
      res(i) = s.headOption.map(_ - i).getOrElse(0)
      (i :: s, res)
  }._2
}`,

    OCaml: `let daily_temperatures temps =
  let n = Array.length temps in
  let res = Array.make n 0 in
  let rec go i stack =
    if i < 0 then res
    else
      let rec pop = function
        | j :: rest when temps.(j) <= temps.(i) -> pop rest
        | s -> s in
      let s = pop stack in
      res.(i) <- (match s with [] -> 0 | j :: _ -> j - i);
      go (i - 1) (i :: s)
  in go (n - 1) []`,

    Clojure: `(defn daily-temperatures [temps]
  (let [n (count temps)]
    (first
      (reduce (fn [[res stack] i]
                (let [stack (drop-while #(<= (temps %) (temps i)) stack)
                      val (if (empty? stack) 0 (- (first stack) i))]
                  [(assoc res i val) (cons i stack)]))
              [(vec (repeat n 0)) '()]
              (range (dec n) -1 -1)))))`,

    Lisp: `(defun daily-temperatures (temps)
  (let* ((n (length temps))
         (res (make-list n :initial-element 0)))
    (labels ((pop-stack (stack)
               (if (and stack (<= (nth (car stack) temps) 0))
                 (pop-stack (cdr stack)) stack))
             (go (i stack)
               (if (< i 0) res
                 (let* ((s (remove-if
                            (lambda (j) (<= (nth j temps) (nth i temps)))
                            stack))
                        (val (if s (- (car s) i) 0)))
                   (setf (nth i res) val)
                   (go (1- i) (cons i s))))))
      (go (1- n) nil))))`,
  },

  // ─── Problem 117: Kth Smallest Element in a BST (LC 230) ─────────────────────
  117: {
    TypeScript: `interface TreeNode { val: number; left: TreeNode | null; right: TreeNode | null; }
function kthSmallest(root: TreeNode | null, k: number): number {
  const inorder = (node: TreeNode | null): number[] =>
    node === null ? []
      : [...inorder(node.left), node.val, ...inorder(node.right)];
  return inorder(root)[k - 1];
}`,

    Haskell: `data Tree a = Nil | Node (Tree a) a (Tree a)

kthSmallest :: Tree Int -> Int -> Int
kthSmallest tree k = inorder tree !! (k - 1)
  where
    inorder Nil = []
    inorder (Node l v r) = inorder l ++ [v] ++ inorder r`,

    Elixir: `defmodule KthSmallest do
  def kth_smallest(nil, _k), do: nil
  def kth_smallest(node, k) do
    inorder(node) |> Enum.at(k - 1)
  end
  defp inorder(nil), do: []
  defp inorder(%{val: v, left: l, right: r}) do
    inorder(l) ++ [v] ++ inorder(r)
  end
end`,

    Rust: `#[derive(Debug)]
struct TreeNode { val: i32, left: Option<Box<TreeNode>>, right: Option<Box<TreeNode>> }

fn kth_smallest(root: &Option<Box<TreeNode>>, k: usize) -> i32 {
    fn inorder(node: &Option<Box<TreeNode>>) -> Vec<i32> {
        match node {
            None => vec![],
            Some(n) => {
                let mut res = inorder(&n.left);
                res.push(n.val);
                res.extend(inorder(&n.right));
                res
            }
        }
    }
    inorder(root)[k - 1]
}`,

    Scala: `sealed trait Tree[+A]
case object Leaf extends Tree[Nothing]
case class Node[A](left: Tree[A], value: A, right: Tree[A]) extends Tree[A]

def kthSmallest(root: Tree[Int], k: Int): Int = {
  def inorder(t: Tree[Int]): List[Int] = t match {
    case Leaf => Nil
    case Node(l, v, r) => inorder(l) ::: List(v) ::: inorder(r)
  }
  inorder(root)(k - 1)
}`,

    OCaml: `type tree = Leaf | Node of tree * int * tree

let kth_smallest root k =
  let rec inorder = function
    | Leaf -> []
    | Node (l, v, r) -> inorder l @ [v] @ inorder r
  in List.nth (inorder root) (k - 1)`,

    Clojure: `(defn kth-smallest [root k]
  (letfn [(inorder [node]
            (if (nil? node) []
              (concat (inorder (:left node))
                      [(:val node)]
                      (inorder (:right node)))))]
    (nth (inorder root) (dec k))))`,

    Lisp: `(defstruct bst-node val left right)

(defun kth-smallest (root k)
  (labels ((inorder (node)
             (if (null node) nil
               (append (inorder (bst-node-left node))
                       (list (bst-node-val node))
                       (inorder (bst-node-right node))))))
    (nth (1- k) (inorder root))))`,
  },

  // ─── Problem 118: Implement Queue using Stacks (LC 232) ──────────────────────
  118: {
    TypeScript: `type Queue<T> = { inStack: T[]; outStack: T[] };
const emptyQueue = <T>(): Queue<T> => ({ inStack: [], outStack: [] });
const enqueue = <T>(q: Queue<T>, x: T): Queue<T> =>
  ({ ...q, inStack: [...q.inStack, x] });
const transfer = <T>(q: Queue<T>): Queue<T> =>
  q.outStack.length > 0 ? q
    : { inStack: [], outStack: [...q.inStack].reverse() };
const dequeue = <T>(q: Queue<T>): [T, Queue<T>] => {
  const tq = transfer(q);
  return [tq.outStack[0], { ...tq, outStack: tq.outStack.slice(1) }];
};
const peek = <T>(q: Queue<T>): T => transfer(q).outStack[0];`,

    Haskell: `data Queue a = Queue [a] [a] deriving Show

emptyQ :: Queue a
emptyQ = Queue [] []

enqueue :: a -> Queue a -> Queue a
enqueue x (Queue ins outs) = Queue (x : ins) outs

dequeue :: Queue a -> (a, Queue a)
dequeue (Queue ins (o:outs)) = (o, Queue ins outs)
dequeue (Queue ins []) = dequeue (Queue [] (reverse ins))

peekQ :: Queue a -> a
peekQ q = fst (dequeue q)`,

    Elixir: `defmodule FQueue do
  defstruct instack: [], outstack: []
  def new, do: %FQueue{}
  def enqueue(%FQueue{instack: ins} = q, x), do: %{q | instack: [x | ins]}
  def dequeue(%FQueue{outstack: [h | t]} = q), do: {h, %{q | outstack: t}}
  def dequeue(%FQueue{instack: ins, outstack: []}),
    do: dequeue(%FQueue{instack: [], outstack: Enum.reverse(ins)})
  def peek(q), do: elem(dequeue(q), 0)
end`,

    Rust: `struct FQueue<T> { in_stack: Vec<T>, out_stack: Vec<T> }
impl<T: Clone> FQueue<T> {
    fn new() -> Self { FQueue { in_stack: vec![], out_stack: vec![] } }
    fn enqueue(&self, x: T) -> Self {
        let mut ins = self.in_stack.clone();
        ins.push(x);
        FQueue { in_stack: ins, out_stack: self.out_stack.clone() }
    }
    fn transfer(&self) -> Self {
        if !self.out_stack.is_empty() { return self.clone(); }
        let mut outs = self.in_stack.clone();
        outs.reverse();
        FQueue { in_stack: vec![], out_stack: outs }
    }
    fn dequeue(&self) -> (T, Self) {
        let t = self.transfer();
        let val = t.out_stack[0].clone();
        (val, FQueue { in_stack: t.in_stack, out_stack: t.out_stack[1..].to_vec() })
    }
}`,

    Scala: `case class FQueue[A](inStack: List[A] = Nil, outStack: List[A] = Nil) {
  def enqueue(x: A): FQueue[A] = copy(inStack = x :: inStack)
  def transfer: FQueue[A] =
    if (outStack.nonEmpty) this
    else FQueue(Nil, inStack.reverse)
  def dequeue: (A, FQueue[A]) = {
    val t = transfer
    (t.outStack.head, t.copy(outStack = t.outStack.tail))
  }
  def peek: A = transfer.outStack.head
}`,

    OCaml: `type 'a queue = { ins: 'a list; outs: 'a list }

let empty_queue = { ins = []; outs = [] }
let enqueue x q = { q with ins = x :: q.ins }
let transfer q =
  if q.outs <> [] then q
  else { ins = []; outs = List.rev q.ins }
let dequeue q =
  let q = transfer q in
  (List.hd q.outs, { q with outs = List.tl q.outs })
let peek q = fst (dequeue q)`,

    Clojure: `(defn make-queue [] {:in [] :out []})
(defn enqueue [q x] (update q :in conj x))
(defn transfer [q]
  (if (seq (:out q)) q
    {:in [] :out (vec (reverse (:in q)))}))
(defn dequeue [q]
  (let [q (transfer q)]
    [(first (:out q)) (update q :out #(vec (rest %)))]))
(defn fpeek [q] (first (dequeue q)))`,

    Lisp: `(defstruct fqueue in-stack out-stack)

(defun make-empty-queue () (make-fqueue :in-stack nil :out-stack nil))
(defun fq-enqueue (q x)
  (make-fqueue :in-stack (cons x (fqueue-in-stack q))
               :out-stack (fqueue-out-stack q)))
(defun fq-transfer (q)
  (if (fqueue-out-stack q) q
    (make-fqueue :in-stack nil
                 :out-stack (reverse (fqueue-in-stack q)))))
(defun fq-dequeue (q)
  (let ((tq (fq-transfer q)))
    (values (car (fqueue-out-stack tq))
            (make-fqueue :in-stack (fqueue-in-stack tq)
                         :out-stack (cdr (fqueue-out-stack tq))))))`,
  },

  // ─── Problem 119: Palindrome Linked List (LC 234) ────────────────────────────
  119: {
    TypeScript: `function isPalindromeList(head: { val: number; next: any } | null): boolean {
  const toArray = (node: any): number[] =>
    node === null ? [] : [node.val, ...toArray(node.next)];
  const arr = toArray(head);
  return arr.every((v, i) => v === arr[arr.length - 1 - i]);
}`,

    Haskell: `isPalindromeList :: Eq a => [a] -> Bool
isPalindromeList xs = xs == reverse xs`,

    Elixir: `defmodule PalindromeList do
  def is_palindrome(list), do: list == Enum.reverse(list)
end`,

    Rust: `fn is_palindrome_list(vals: &[i32]) -> bool {
    let rev: Vec<i32> = vals.iter().rev().cloned().collect();
    vals == rev.as_slice()
}`,

    Scala: `def isPalindromeList[A](xs: List[A]): Boolean = xs == xs.reverse`,

    OCaml: `let is_palindrome_list xs = xs = List.rev xs`,

    Clojure: `(defn palindrome-list? [xs] (= xs (reverse xs)))`,

    Lisp: `(defun palindrome-list-p (xs) (equal xs (reverse xs)))`,
  },

  // ─── Problem 120: Lowest Common Ancestor of a BST (LC 235) ───────────────────
  120: {
    TypeScript: `interface TreeNode { val: number; left: TreeNode | null; right: TreeNode | null; }
function lowestCommonAncestorBST(root: TreeNode | null, p: number, q: number): number | null {
  if (root === null) return null;
  if (p < root.val && q < root.val) return lowestCommonAncestorBST(root.left, p, q);
  if (p > root.val && q > root.val) return lowestCommonAncestorBST(root.right, p, q);
  return root.val;
}`,

    Haskell: `data BST = BNil | BNode BST Int BST

lcaBST :: BST -> Int -> Int -> Maybe Int
lcaBST BNil _ _ = Nothing
lcaBST (BNode l v r) p q
  | p < v && q < v = lcaBST l p q
  | p > v && q > v = lcaBST r p q
  | otherwise = Just v`,

    Elixir: `defmodule LCABST do
  def lca(nil, _p, _q), do: nil
  def lca(%{val: v, left: l}, p, q) when p < v and q < v, do: lca(l, p, q)
  def lca(%{val: v, right: r}, p, q) when p > v and q > v, do: lca(r, p, q)
  def lca(%{val: v}, _p, _q), do: v
end`,

    Rust: `fn lca_bst(root: &Option<Box<TreeNode>>, p: i32, q: i32) -> Option<i32> {
    match root {
        None => None,
        Some(node) => {
            if p < node.val && q < node.val { lca_bst(&node.left, p, q) }
            else if p > node.val && q > node.val { lca_bst(&node.right, p, q) }
            else { Some(node.val) }
        }
    }
}`,

    Scala: `def lcaBST(root: Tree[Int], p: Int, q: Int): Option[Int] = root match {
  case Leaf => None
  case Node(l, v, _) if p < v && q < v => lcaBST(l, p, q)
  case Node(_, v, r) if p > v && q > v => lcaBST(r, p, q)
  case Node(_, v, _) => Some(v)
}`,

    OCaml: `let rec lca_bst root p q = match root with
  | Leaf -> None
  | Node (l, v, _) when p < v && q < v -> lca_bst l p q
  | Node (_, v, r) when p > v && q > v -> lca_bst r p q
  | Node (_, v, _) -> Some v`,

    Clojure: `(defn lca-bst [root p q]
  (cond
    (nil? root) nil
    (and (< p (:val root)) (< q (:val root)))
      (lca-bst (:left root) p q)
    (and (> p (:val root)) (> q (:val root)))
      (lca-bst (:right root) p q)
    :else (:val root)))`,

    Lisp: `(defun lca-bst (root p q)
  (cond
    ((null root) nil)
    ((and (< p (bst-node-val root)) (< q (bst-node-val root)))
     (lca-bst (bst-node-left root) p q))
    ((and (> p (bst-node-val root)) (> q (bst-node-val root)))
     (lca-bst (bst-node-right root) p q))
    (t (bst-node-val root))))`,
  },

  // ─── Problem 121: Lowest Common Ancestor of a Binary Tree (LC 236) ───────────
  121: {
    TypeScript: `interface TreeNode { val: number; left: TreeNode | null; right: TreeNode | null; }
function lowestCommonAncestor(root: TreeNode | null, p: number, q: number): TreeNode | null {
  if (root === null || root.val === p || root.val === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left !== null && right !== null) return root;
  return left !== null ? left : right;
}`,

    Haskell: `data BTree a = BLeaf | BNode (BTree a) a (BTree a) deriving Eq

lca :: Eq a => BTree a -> a -> a -> Maybe a
lca BLeaf _ _ = Nothing
lca (BNode l v r) p q
  | v == p || v == q = Just v
  | otherwise = case (lca l p q, lca r p q) of
      (Just _, Just _) -> Just v
      (Just x, Nothing) -> Just x
      (Nothing, Just x) -> Just x
      _ -> Nothing`,

    Elixir: `defmodule LCA do
  def lca(nil, _p, _q), do: nil
  def lca(%{val: v} = node, p, q) when v == p or v == q, do: node
  def lca(%{left: l, right: r} = node, p, q) do
    left = lca(l, p, q)
    right = lca(r, p, q)
    cond do
      left != nil and right != nil -> node
      left != nil -> left
      true -> right
    end
  end
end`,

    Rust: `fn lca(root: &Option<Box<TreeNode>>, p: i32, q: i32) -> Option<i32> {
    match root {
        None => None,
        Some(node) => {
            if node.val == p || node.val == q { return Some(node.val); }
            let left = lca(&node.left, p, q);
            let right = lca(&node.right, p, q);
            match (left, right) {
                (Some(_), Some(_)) => Some(node.val),
                (Some(x), None) | (None, Some(x)) => Some(x),
                _ => None,
            }
        }
    }
}`,

    Scala: `def lca[A](root: Tree[A], p: A, q: A): Option[A] = root match {
  case Leaf => None
  case Node(_, v, _) if v == p || v == q => Some(v)
  case Node(l, v, r) =>
    (lca(l, p, q), lca(r, p, q)) match {
      case (Some(_), Some(_)) => Some(v)
      case (Some(x), None) => Some(x)
      case (None, Some(x)) => Some(x)
      case _ => None
    }
}`,

    OCaml: `type 'a btree = BLeaf | BNode of 'a btree * 'a * 'a btree

let rec lca root p q = match root with
  | BLeaf -> None
  | BNode (_, v, _) when v = p || v = q -> Some v
  | BNode (l, v, r) ->
    match lca l p q, lca r p q with
    | Some _, Some _ -> Some v
    | Some x, None | None, Some x -> Some x
    | _ -> None`,

    Clojure: `(defn lca [root p q]
  (cond
    (nil? root) nil
    (or (= (:val root) p) (= (:val root) q)) root
    :else
    (let [left (lca (:left root) p q)
          right (lca (:right root) p q)]
      (cond
        (and left right) root
        left left
        :else right))))`,

    Lisp: `(defun lca (root p q)
  (cond
    ((null root) nil)
    ((or (= (bst-node-val root) p) (= (bst-node-val root) q)) root)
    (t (let ((left (lca (bst-node-left root) p q))
             (right (lca (bst-node-right root) p q)))
         (cond
           ((and left right) root)
           (left left)
           (t right))))))`,
  },

  // ─── Problem 122: Product of Array Except Self (LC 238) ──────────────────────
  122: {
    TypeScript: `function productExceptSelf(nums: number[]): number[] {
  const prefix = nums.reduce<number[]>(
    (acc, n, i) => [...acc, i === 0 ? 1 : acc[i - 1] * nums[i - 1]], []);
  const suffix = nums.reduceRight<number[]>(
    (acc, n, i) => i === nums.length - 1
      ? [1, ...acc] : [acc[0] * nums[i + 1], ...acc], []);
  return prefix.map((p, i) => p * suffix[i]);
}`,

    Haskell: `productExceptSelf :: [Int] -> [Int]
productExceptSelf nums =
  let prefix = scanl (*) 1 nums
      suffix = scanr (*) 1 nums
  in zipWith (*) (init prefix) (tail suffix)`,

    Elixir: `defmodule ProductExceptSelf do
  def product_except_self(nums) do
    prefix = Enum.scan([1 | Enum.drop(nums, -1)], &(&1 * &2))
    suffix = nums |> Enum.drop(1) |> Enum.reverse()
             |> Enum.scan(&(&1 * &2)) |> Enum.reverse()
    suffix = suffix ++ [1]
    prefix = [1 | Enum.drop(prefix, -1)]
    # Simpler approach using prefix/suffix products
    n = length(nums)
    pfx = Enum.reduce(0..(n-1), [], fn i, acc ->
      if i == 0, do: [1], else: acc ++ [List.last(acc) * Enum.at(nums, i-1)]
    end)
    sfx = Enum.reduce((n-1)..0, [], fn i, acc ->
      if i == n-1, do: [1], else: [hd(acc) * Enum.at(nums, i+1) | acc]
    end)
    Enum.zip(pfx, sfx) |> Enum.map(fn {a, b} -> a * b end)
  end
end`,

    Rust: `fn product_except_self(nums: &[i32]) -> Vec<i32> {
    let n = nums.len();
    let prefix: Vec<i32> = (0..n).fold(vec![], |mut acc, i| {
        acc.push(if i == 0 { 1 } else { acc[i-1] * nums[i-1] });
        acc
    });
    let suffix: Vec<i32> = (0..n).rev().fold(vec![0; n], |mut acc, i| {
        acc[i] = if i == n-1 { 1 } else { acc[i+1] * nums[i+1] };
        acc
    });
    prefix.iter().zip(suffix.iter()).map(|(a, b)| a * b).collect()
}`,

    Scala: `def productExceptSelf(nums: Array[Int]): Array[Int] = {
  val prefix = nums.scanLeft(1)(_ * _).init
  val suffix = nums.scanRight(1)(_ * _).tail
  prefix.zip(suffix).map { case (a, b) => a * b }
}`,

    OCaml: `let product_except_self nums =
  let n = Array.length nums in
  let prefix = Array.init n (fun i ->
    if i = 0 then 1
    else Array.fold_left ( * ) 1 (Array.sub nums 0 i)) in
  let suffix = Array.init n (fun i ->
    if i = n - 1 then 1
    else Array.fold_left ( * ) 1 (Array.sub nums (i+1) (n-i-1))) in
  Array.init n (fun i -> prefix.(i) * suffix.(i))`,

    Clojure: `(defn product-except-self [nums]
  (let [n (count nums)
        prefix (reductions * 1 (butlast nums))
        suffix (reverse (reductions * 1 (reverse (rest nums))))]
    (mapv * prefix suffix)))`,

    Lisp: `(defun product-except-self (nums)
  (let* ((n (length nums))
         (prefix (loop for i below n
                       for p = 1 then (* p (nth (1- i) nums))
                       collect p))
         (suffix (reverse
                   (loop for i from (1- n) downto 0
                         for p = 1 then (* p (nth (1+ i) nums))
                         collect p))))
    (mapcar #'* prefix suffix)))`,
  },

  // ─── Problem 123: Sliding Window Maximum (LC 239) ────────────────────────────
  123: {
    TypeScript: `function maxSlidingWindow(nums: number[], k: number): number[] {
  const clean = (dq: number[], i: number): number[] => {
    const d1 = dq.length > 0 && dq[0] <= i - k ? dq.slice(1) : dq;
    const popBack = (d: number[]): number[] =>
      d.length > 0 && nums[d[d.length - 1]] <= nums[i]
        ? popBack(d.slice(0, -1)) : d;
    return [...popBack(d1), i];
  };
  return nums.reduce<{ dq: number[]; res: number[] }>(
    (acc, _, i) => {
      const dq = clean(acc.dq, i);
      return { dq, res: i >= k - 1 ? [...acc.res, nums[dq[0]]] : acc.res };
    }, { dq: [], res: [] }
  ).res;
}`,

    Haskell: `import Data.Sequence (Seq, (|>), ViewL(..), ViewR(..), viewl, viewr, empty)

maxSlidingWindow :: [Int] -> Int -> [Int]
maxSlidingWindow nums k =
  let arr = zip [0..] nums
      step (dq, res) (i, v) =
        let dq1 = case viewl dq of
              (j :< rest) | j <= i - k -> rest
              _ -> dq
            popR d = case viewr d of
              (rest :> j) | nums !! j <= v -> popR rest
              _ -> d
            dq2 = popR dq1 |> i
            res' = if i >= k - 1 then res ++ [nums !! front]
                   else res
            front = case viewl dq2 of (j :< _) -> j
        in (dq2, res')
  in snd $ foldl step (empty, []) arr`,

    Elixir: `defmodule SlidingMax do
  def max_sliding_window(nums, k) do
    indexed = Enum.with_index(nums)
    {_, res} = Enum.reduce(indexed, {:queue.new(), []}, fn {v, i}, {dq, res} ->
      dq = clean_front(dq, i, k)
      dq = clean_back(dq, nums, v)
      dq = :queue.in(i, dq)
      {:value, front} = :queue.peek(dq)
      res = if i >= k - 1, do: res ++ [Enum.at(nums, front)], else: res
      {dq, res}
    end)
    res
  end
  defp clean_front(dq, i, k) do
    case :queue.peek(dq) do
      {:value, j} when j <= i - k -> clean_front(:queue.drop(dq), i, k)
      _ -> dq
    end
  end
  defp clean_back(dq, nums, v) do
    case :queue.peek_r(dq) do
      {:value, j} when elem(nums, j) <= v -> clean_back(:queue.drop_r(dq), nums, v)
      _ -> dq
    end
  end
end`,

    Rust: `use std::collections::VecDeque;
fn max_sliding_window(nums: &[i32], k: usize) -> Vec<i32> {
    let (_, res) = nums.iter().enumerate().fold(
        (VecDeque::new(), vec![]),
        |(mut dq, mut res), (i, &v)| {
            while dq.front().map_or(false, |&j| j + k <= i) { dq.pop_front(); }
            while dq.back().map_or(false, |&j| nums[j] <= v) { dq.pop_back(); }
            dq.push_back(i);
            if i >= k - 1 { res.push(nums[*dq.front().unwrap()]); }
            (dq, res)
        });
    res
}`,

    Scala: `import scala.collection.immutable.Queue
def maxSlidingWindow(nums: Array[Int], k: Int): Array[Int] = {
  val (_, res) = nums.indices.foldLeft((Queue.empty[Int], Array.empty[Int])) {
    case ((dq, res), i) =>
      val dq1 = if (dq.nonEmpty && dq.head <= i - k) dq.tail else dq
      val dq2 = dq1.reverse.dropWhile(j => nums(j) <= nums(i)).reverse.enqueue(i)
      val r = if (i >= k - 1) res :+ nums(dq2.head) else res
      (dq2, r)
  }
  res
}`,

    OCaml: `let max_sliding_window nums k =
  let n = Array.length nums in
  let rec go i dq res =
    if i >= n then List.rev res
    else
      let dq = match dq with j :: _ when j <= i - k -> List.tl dq | _ -> dq in
      let rec pop_back = function
        | [] -> []
        | [j] when nums.(j) <= nums.(i) -> []
        | l -> let rev = List.rev l in
          if nums.(List.hd rev) <= nums.(i) then List.rev (List.tl rev) |> pop_back
          else l in
      let dq = pop_back dq @ [i] in
      let res = if i >= k - 1 then nums.(List.hd dq) :: res else res in
      go (i + 1) dq res
  in go 0 [] []`,

    Clojure: `(defn max-sliding-window [nums k]
  (let [n (count nums)]
    (second
      (reduce
        (fn [[dq res] i]
          (let [dq (if (and (seq dq) (<= (first dq) (- i k)))
                     (rest dq) dq)
                dq (loop [d dq]
                     (if (and (seq d) (<= (nums (last d)) (nums i)))
                       (recur (butlast d)) d))
                dq (concat dq [i])
                res (if (>= i (dec k))
                      (conj res (nums (first dq))) res)]
            [dq res]))
        ['() []]
        (range n)))))`,

    Lisp: `(defun max-sliding-window (nums k)
  (let ((n (length nums)))
    (labels ((go (i dq res)
               (if (>= i n) (nreverse res)
                 (let* ((dq (if (and dq (<= (car dq) (- i k)))
                            (cdr dq) dq))
                        (dq (loop while (and dq (<= (nth (car (last dq)) nums)
                                                     (nth i nums)))
                                  do (setf dq (butlast dq))
                                  finally (return dq)))
                        (dq (append dq (list i)))
                        (res (if (>= i (1- k))
                               (cons (nth (car dq) nums) res) res)))
                   (go (1+ i) dq res)))))
      (go 0 nil nil))))`,
  },

  // ─── Problem 124: Valid Anagram (LC 242) ──────────────────────────────────────
  124: {
    TypeScript: `function isAnagram(s: string, t: string): boolean {
  const freq = (str: string) =>
    [...str].reduce<Record<string, number>>(
      (acc, c) => ({ ...acc, [c]: (acc[c] || 0) + 1 }), {});
  const fs = freq(s);
  const ft = freq(t);
  return JSON.stringify(Object.entries(fs).sort()) ===
         JSON.stringify(Object.entries(ft).sort());
}`,

    Haskell: `import Data.List (sort)

isAnagram :: String -> String -> Bool
isAnagram s t = sort s == sort t`,

    Elixir: `defmodule Anagram do
  def is_anagram(s, t) do
    freq = fn str ->
      str |> String.graphemes() |> Enum.frequencies()
    end
    freq.(s) == freq.(t)
  end
end`,

    Rust: `fn is_anagram(s: &str, t: &str) -> bool {
    let freq = |s: &str| -> Vec<(char, usize)> {
        let mut m = std::collections::HashMap::new();
        s.chars().for_each(|c| *m.entry(c).or_insert(0) += 1);
        let mut v: Vec<_> = m.into_iter().collect();
        v.sort(); v
    };
    freq(s) == freq(t)
}`,

    Scala: `def isAnagram(s: String, t: String): Boolean =
  s.sorted == t.sorted`,

    OCaml: `let is_anagram s t =
  let sorted str =
    String.to_seq str |> List.of_seq |> List.sort Char.compare in
  sorted s = sorted t`,

    Clojure: `(defn anagram? [s t]
  (= (frequencies s) (frequencies t)))`,

    Lisp: `(defun anagram-p (s1 s2)
  (equal (sort (coerce s1 'list) #'char<)
         (sort (coerce s2 'list) #'char<)))`,
  },

  // ─── Problem 125: Employee Free Time (LC 759) ────────────────────────────────
  125: {
    TypeScript: `function employeeFreeTime(schedules: number[][][]): number[][] {
  const all = schedules.flat()
    .sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const merged = all.reduce<number[][]>((acc, interval) => {
    if (acc.length === 0 || acc[acc.length - 1][1] < interval[0])
      return [...acc, interval];
    return [...acc.slice(0, -1),
      [acc[acc.length - 1][0], Math.max(acc[acc.length - 1][1], interval[1])]];
  }, []);
  return merged.slice(1).reduce<number[][]>(
    (gaps, interval, i) =>
      merged[i][1] < interval[0]
        ? [...gaps, [merged[i][1], interval[0]]] : gaps, []);
}`,

    Haskell: `import Data.List (sortOn)

employeeFreeTime :: [[(Int, Int)]] -> [(Int, Int)]
employeeFreeTime schedules =
  let sorted = sortOn fst (concat schedules)
      merge [] = []
      merge [x] = [x]
      merge ((a,b):(c,d):rest)
        | b >= c = merge ((a, max b d) : rest)
        | otherwise = (a, b) : merge ((c, d) : rest)
      merged = merge sorted
      gaps ((_, e1):(s2, e2):rest)
        | e1 < s2 = (e1, s2) : gaps ((s2, e2) : rest)
        | otherwise = gaps ((s2, e2) : rest)
      gaps _ = []
  in gaps merged`,

    Elixir: `defmodule EmployeeFreeTime do
  def free_time(schedules) do
    schedules
    |> List.flatten()
    |> Enum.sort_by(&elem(&1, 0))
    |> merge([])
    |> gaps([])
  end
  defp merge([], acc), do: Enum.reverse(acc)
  defp merge([h | t], []), do: merge(t, [h])
  defp merge([{s, e} | t], [{as_, ae} | rest]) do
    if s <= ae,
      do: merge(t, [{as_, max(ae, e)} | rest]),
      else: merge(t, [{s, e}, {as_, ae} | rest])
  end
  defp gaps([], acc), do: Enum.reverse(acc)
  defp gaps([_], acc), do: Enum.reverse(acc)
  defp gaps([{_, e1}, {s2, e2} | t], acc) do
    if e1 < s2,
      do: gaps([{s2, e2} | t], [{e1, s2} | acc]),
      else: gaps([{s2, e2} | t], acc)
  end
end`,

    Rust: `fn employee_free_time(schedules: Vec<Vec<(i32, i32)>>) -> Vec<(i32, i32)> {
    let mut all: Vec<(i32, i32)> = schedules.into_iter().flatten().collect();
    all.sort();
    let merged = all.into_iter().fold(vec![], |mut acc: Vec<(i32,i32)>, (s, e)| {
        if let Some(last) = acc.last_mut() {
            if last.1 >= s { last.1 = last.1.max(e); return acc; }
        }
        acc.push((s, e)); acc
    });
    merged.windows(2).filter_map(|w| {
        if w[0].1 < w[1].0 { Some((w[0].1, w[1].0)) } else { None }
    }).collect()
}`,

    Scala: `def employeeFreeTime(schedules: List[List[(Int, Int)]]): List[(Int, Int)] = {
  val sorted = schedules.flatten.sortBy(_._1)
  val merged = sorted.foldLeft(List.empty[(Int, Int)]) {
    case ((a, b) :: t, (s, e)) if b >= s => (a, b max e) :: t
    case (acc, iv) => iv :: acc
  }.reverse
  merged.sliding(2).collect {
    case List((_, e1), (s2, _)) if e1 < s2 => (e1, s2)
  }.toList
}`,

    OCaml: `let employee_free_time schedules =
  let all = List.concat schedules
    |> List.sort (fun (a,_) (b,_) -> compare a b) in
  let rec merge = function
    | [] -> []
    | [x] -> [x]
    | (a,b)::(c,d)::rest when b >= c -> merge ((a, max b d)::rest)
    | x::rest -> x :: merge rest in
  let m = merge all in
  let rec gaps = function
    | (_,e1)::(s2,e2)::rest when e1 < s2 -> (e1,s2) :: gaps ((s2,e2)::rest)
    | _::rest -> gaps rest
    | [] -> [] in
  gaps m`,

    Clojure: `(defn employee-free-time [schedules]
  (let [sorted (sort-by first (apply concat schedules))
        merged (reduce (fn [acc [s e]]
                  (if (and (seq acc) (>= (second (last acc)) s))
                    (conj (vec (butlast acc))
                          [(first (last acc)) (max (second (last acc)) e)])
                    (conj acc [s e])))
                [] sorted)]
    (->> (partition 2 1 merged)
         (filter (fn [[[_ e1] [s2 _]]] (< e1 s2)))
         (mapv (fn [[[_ e1] [s2 _]]] [e1 s2])))))`,

    Lisp: `(defun employee-free-time (schedules)
  (let* ((all (sort (apply #'append schedules)
               (lambda (a b) (< (car a) (car b)))))
         (merged (reduce (lambda (acc iv)
                   (if (and acc (>= (cadar (last acc)) (car iv)))
                     (let ((prev (car (last acc))))
                       (append (butlast acc)
                               (list (list (car prev)
                                          (max (cadr prev) (cadr iv))))))
                     (append acc (list iv))))
                 all :initial-value nil)))
    (loop for (a b) on merged while b
          when (< (cadr a) (car b))
          collect (list (cadr a) (car b)))))`,
  },

  // ─── Problem 126: Meeting Rooms (LC 252) ─────────────────────────────────────
  126: {
    TypeScript: `function canAttendMeetings(intervals: number[][]): boolean {
  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  return sorted.every((v, i) => i === 0 || sorted[i - 1][1] <= v[0]);
}`,

    Haskell: `import Data.List (sortOn)

canAttendMeetings :: [(Int, Int)] -> Bool
canAttendMeetings intervals =
  let sorted = sortOn fst intervals
  in all (\\((_, e), (s, _)) -> e <= s) (zip sorted (tail sorted))`,

    Elixir: `defmodule MeetingRooms do
  def can_attend(intervals) do
    intervals
    |> Enum.sort_by(&elem(&1, 0))
    |> Enum.chunk_every(2, 1, :discard)
    |> Enum.all?(fn [{_, e}, {s, _}] -> e <= s end)
  end
end`,

    Rust: `fn can_attend_meetings(intervals: &mut Vec<(i32, i32)>) -> bool {
    intervals.sort();
    intervals.windows(2).all(|w| w[0].1 <= w[1].0)
}`,

    Scala: `def canAttendMeetings(intervals: List[(Int, Int)]): Boolean = {
  val sorted = intervals.sortBy(_._1)
  sorted.zip(sorted.tail).forall { case ((_, e), (s, _)) => e <= s }
}`,

    OCaml: `let can_attend_meetings intervals =
  let sorted = List.sort (fun (a,_) (b,_) -> compare a b) intervals in
  let rec check = function
    | [] | [_] -> true
    | (_, e) :: ((s, _) :: _ as rest) -> e <= s && check rest
  in check sorted`,

    Clojure: `(defn can-attend-meetings [intervals]
  (let [sorted (sort-by first intervals)]
    (every? (fn [[[_ e] [s _]]] (<= e s))
            (partition 2 1 sorted))))`,

    Lisp: `(defun can-attend-meetings (intervals)
  (let ((sorted (sort (copy-list intervals)
                  (lambda (a b) (< (car a) (car b))))))
    (every (lambda (a b) (<= (cadr a) (car b)))
           sorted (cdr sorted))))`,
  },

  // ─── Problem 127: Meeting Rooms II (LC 253) ──────────────────────────────────
  127: {
    TypeScript: `function minMeetingRooms(intervals: number[][]): number {
  const starts = [...intervals].map(i => i[0]).sort((a, b) => a - b);
  const ends = [...intervals].map(i => i[1]).sort((a, b) => a - b);
  const go = (si: number, ei: number, rooms: number, maxR: number): number => {
    if (si >= starts.length) return maxR;
    if (starts[si] < ends[ei])
      return go(si + 1, ei, rooms + 1, Math.max(maxR, rooms + 1));
    return go(si + 1, ei + 1, rooms, maxR);
  };
  return go(0, 0, 0, 0);
}`,

    Haskell: `import Data.List (sort)

minMeetingRooms :: [(Int, Int)] -> Int
minMeetingRooms intervals =
  let starts = sort (map fst intervals)
      ends = sort (map snd intervals)
      go [] _ rooms maxR = maxR
      go (s:ss) (e:es) rooms maxR
        | s < e = go ss (e:es) (rooms + 1) (max maxR (rooms + 1))
        | otherwise = go ss es rooms maxR
  in go starts ends 0 0`,

    Elixir: `defmodule MeetingRooms2 do
  def min_rooms(intervals) do
    starts = intervals |> Enum.map(&elem(&1, 0)) |> Enum.sort()
    ends = intervals |> Enum.map(&elem(&1, 1)) |> Enum.sort()
    go(starts, ends, 0, 0)
  end
  defp go([], _ends, _rooms, max_r), do: max_r
  defp go([s | ss], [e | es] = ends, rooms, max_r) do
    if s < e,
      do: go(ss, ends, rooms + 1, max(max_r, rooms + 1)),
      else: go(ss, es, rooms, max_r)
  end
end`,

    Rust: `fn min_meeting_rooms(intervals: &[(i32, i32)]) -> i32 {
    let mut starts: Vec<i32> = intervals.iter().map(|i| i.0).collect();
    let mut ends: Vec<i32> = intervals.iter().map(|i| i.1).collect();
    starts.sort(); ends.sort();
    fn go(starts: &[i32], ends: &[i32], si: usize, ei: usize,
          rooms: i32, max_r: i32) -> i32 {
        if si >= starts.len() { return max_r; }
        if starts[si] < ends[ei] {
            go(starts, ends, si+1, ei, rooms+1, max_r.max(rooms+1))
        } else {
            go(starts, ends, si+1, ei+1, rooms, max_r)
        }
    }
    go(&starts, &ends, 0, 0, 0, 0)
}`,

    Scala: `def minMeetingRooms(intervals: List[(Int, Int)]): Int = {
  val starts = intervals.map(_._1).sorted
  val ends = intervals.map(_._2).sorted
  def go(ss: List[Int], es: List[Int], rooms: Int, maxR: Int): Int =
    ss match {
      case Nil => maxR
      case s :: srest => es match {
        case e :: erest if s < e => go(srest, es, rooms + 1, maxR max (rooms + 1))
        case _ :: erest => go(srest, erest, rooms, maxR)
      }
    }
  go(starts, ends, 0, 0)
}`,

    OCaml: `let min_meeting_rooms intervals =
  let starts = List.map fst intervals |> List.sort compare in
  let ends = List.map snd intervals |> List.sort compare in
  let rec go ss es rooms max_r = match ss with
    | [] -> max_r
    | s :: srest -> match es with
      | e :: _ when s < e -> go srest es (rooms+1) (max max_r (rooms+1))
      | _ :: erest -> go srest erest rooms max_r
      | [] -> max_r
  in go starts ends 0 0`,

    Clojure: `(defn min-meeting-rooms [intervals]
  (let [starts (sort (map first intervals))
        ends (sort (map second intervals))]
    (loop [ss starts es ends rooms 0 max-r 0]
      (if (empty? ss) max-r
        (if (< (first ss) (first es))
          (recur (rest ss) es (inc rooms) (max max-r (inc rooms)))
          (recur (rest ss) (rest es) rooms max-r))))))`,

    Lisp: `(defun min-meeting-rooms (intervals)
  (let ((starts (sort (mapcar #'car intervals) #'<))
        (ends (sort (mapcar #'cadr intervals) #'<)))
    (labels ((go (ss es rooms max-r)
               (if (null ss) max-r
                 (if (< (car ss) (car es))
                   (go (cdr ss) es (1+ rooms) (max max-r (1+ rooms)))
                   (go (cdr ss) (cdr es) rooms max-r)))))
      (go starts ends 0 0))))`,
  },

  // ─── Problem 128: Graph Valid Tree (LC 261) ──────────────────────────────────
  128: {
    TypeScript: `function validTree(n: number, edges: number[][]): boolean {
  if (edges.length !== n - 1) return false;
  const adj = edges.reduce<Record<number, number[]>>(
    (g, [u, v]) => ({
      ...g, [u]: [...(g[u] || []), v], [v]: [...(g[v] || []), u]
    }), {});
  const dfs = (node: number, visited: Set<number>): Set<number> => {
    if (visited.has(node)) return visited;
    const v = new Set([...visited, node]);
    return (adj[node] || []).reduce((acc, nb) => dfs(nb, acc), v);
  };
  return dfs(0, new Set()).size === n;
}`,

    Haskell: `import Data.Map.Strict (Map, fromListWith, findWithDefault)
import Data.Set (Set, empty, insert, member, size)

validTree :: Int -> [(Int, Int)] -> Bool
validTree n edges
  | length edges /= n - 1 = False
  | otherwise = size (dfs 0 empty) == n
  where
    adj = fromListWith (++) $
      concatMap (\\(u,v) -> [(u,[v]), (v,[u])]) edges
    dfs node visited
      | member node visited = visited
      | otherwise = foldl (flip dfs) (insert node visited)
          (findWithDefault [] node adj)`,

    Elixir: `defmodule ValidTree do
  def valid_tree(n, edges) do
    if length(edges) != n - 1, do: false,
    else: (
      adj = Enum.reduce(edges, %{}, fn [u, v], g ->
        g |> Map.update(u, [v], &[v | &1])
          |> Map.update(v, [u], &[u | &1])
      end)
      visited = dfs(0, MapSet.new(), adj)
      MapSet.size(visited) == n
    )
  end
  defp dfs(node, visited, adj) do
    if MapSet.member?(visited, node), do: visited,
    else: (
      visited = MapSet.put(visited, node)
      Map.get(adj, node, [])
      |> Enum.reduce(visited, fn nb, acc -> dfs(nb, acc, adj) end)
    )
  end
end`,

    Rust: `use std::collections::{HashMap, HashSet};
fn valid_tree(n: usize, edges: &[(usize, usize)]) -> bool {
    if edges.len() != n - 1 { return false; }
    let adj = edges.iter().fold(HashMap::new(), |mut g, &(u, v)| {
        g.entry(u).or_insert_with(Vec::new).push(v);
        g.entry(v).or_insert_with(Vec::new).push(u);
        g
    });
    fn dfs(node: usize, visited: &mut HashSet<usize>,
           adj: &HashMap<usize, Vec<usize>>) {
        if !visited.insert(node) { return; }
        if let Some(nbs) = adj.get(&node) {
            for &nb in nbs { dfs(nb, visited, adj); }
        }
    }
    let mut visited = HashSet::new();
    dfs(0, &mut visited, &adj);
    visited.len() == n
}`,

    Scala: `def validTree(n: Int, edges: List[(Int, Int)]): Boolean = {
  if (edges.length != n - 1) false
  else {
    val adj = edges.foldLeft(Map.empty[Int, List[Int]]) { case (g, (u, v)) =>
      g.updated(u, v :: g.getOrElse(u, Nil))
       .updated(v, u :: g.getOrElse(v, Nil))
    }
    def dfs(node: Int, visited: Set[Int]): Set[Int] =
      if (visited.contains(node)) visited
      else adj.getOrElse(node, Nil).foldLeft(visited + node)(
        (v, nb) => dfs(nb, v))
    dfs(0, Set.empty).size == n
  }
}`,

    OCaml: `module IntSet = Set.Make(Int)
module IntMap = Map.Make(Int)

let valid_tree n edges =
  if List.length edges <> n - 1 then false
  else
    let adj = List.fold_left (fun g (u, v) ->
      let g = IntMap.update u (function
        | None -> Some [v] | Some l -> Some (v::l)) g in
      IntMap.update v (function
        | None -> Some [u] | Some l -> Some (u::l)) g
    ) IntMap.empty edges in
    let rec dfs node visited =
      if IntSet.mem node visited then visited
      else let nbs = try IntMap.find node adj with Not_found -> [] in
        List.fold_left (fun v nb -> dfs nb v)
          (IntSet.add node visited) nbs in
    IntSet.cardinal (dfs 0 IntSet.empty) = n`,

    Clojure: `(defn valid-tree [n edges]
  (if (not= (count edges) (dec n)) false
    (let [adj (reduce (fn [g [u v]]
                (-> g (update u (fnil conj []) v)
                      (update v (fnil conj []) u)))
              {} edges)
          dfs (fn dfs [node visited]
                (if (visited node) visited
                  (reduce #(dfs %2 %1)
                    (conj visited node)
                    (get adj node []))))]
      (= n (count (dfs 0 #{}))))))`,

    Lisp: `(defun valid-tree (n edges)
  (if (/= (length edges) (1- n)) nil
    (let ((adj (make-hash-table)))
      (dolist (e edges)
        (push (cadr e) (gethash (car e) adj nil))
        (push (car e) (gethash (cadr e) adj nil)))
      (let ((visited (make-hash-table)))
        (labels ((dfs (node)
                   (unless (gethash node visited)
                     (setf (gethash node visited) t)
                     (dolist (nb (gethash node adj))
                       (dfs nb)))))
          (dfs 0)
          (= (hash-table-count visited) n))))))`,
  },

  // ─── Problem 129: Missing Number (LC 268) ────────────────────────────────────
  129: {
    TypeScript: `function missingNumber(nums: number[]): number {
  const n = nums.length;
  return nums.reduce((acc, v) => acc ^ v, 0) ^
         Array.from({ length: n + 1 }, (_, i) => i)
           .reduce((acc, v) => acc ^ v, 0);
}`,

    Haskell: `import Data.Bits (xor)

missingNumber :: [Int] -> Int
missingNumber nums =
  foldl xor 0 nums \`xor\` foldl xor 0 [0..length nums]`,

    Elixir: `defmodule MissingNumber do
  import Bitwise
  def missing(nums) do
    n = length(nums)
    xor_nums = Enum.reduce(nums, 0, &bxor/2)
    xor_all = Enum.reduce(0..n, 0, &bxor/2)
    bxor(xor_nums, xor_all)
  end
end`,

    Rust: `fn missing_number(nums: &[i32]) -> i32 {
    let n = nums.len() as i32;
    let xor_nums = nums.iter().fold(0, |acc, &x| acc ^ x);
    let xor_all = (0..=n).fold(0, |acc, x| acc ^ x);
    xor_nums ^ xor_all
}`,

    Scala: `def missingNumber(nums: Array[Int]): Int = {
  val n = nums.length
  nums.foldLeft(0)(_ ^ _) ^ (0 to n).foldLeft(0)(_ ^ _)
}`,

    OCaml: `let missing_number nums =
  let n = List.length nums in
  let xor_nums = List.fold_left (lxor) 0 nums in
  let xor_all = List.init (n + 1) Fun.id |> List.fold_left (lxor) 0 in
  xor_nums lxor xor_all`,

    Clojure: `(defn missing-number [nums]
  (let [n (count nums)]
    (bit-xor (reduce bit-xor 0 nums)
             (reduce bit-xor 0 (range (inc n))))))`,

    Lisp: `(defun missing-number (nums)
  (let ((n (length nums)))
    (logxor (reduce #'logxor nums :initial-value 0)
            (reduce #'logxor
              (loop for i from 0 to n collect i)
              :initial-value 0))))`,
  },

  // ─── Problem 130: Alien Dictionary (LC 269) ──────────────────────────────────
  130: {
    TypeScript: `function alienOrder(words: string[]): string {
  const chars = new Set(words.join(''));
  const graph = new Map<string, Set<string>>();
  const inDeg = new Map<string, number>();
  chars.forEach(c => { graph.set(c, new Set()); inDeg.set(c, 0); });
  for (let i = 0; i < words.length - 1; i++) {
    const [w1, w2] = [words[i], words[i + 1]];
    if (w1.length > w2.length && w1.startsWith(w2)) return '';
    for (let j = 0; j < Math.min(w1.length, w2.length); j++) {
      if (w1[j] !== w2[j]) {
        if (!graph.get(w1[j])!.has(w2[j])) {
          graph.get(w1[j])!.add(w2[j]);
          inDeg.set(w2[j], (inDeg.get(w2[j]) || 0) + 1);
        }
        break;
      }
    }
  }
  const topoSort = (queue: string[], result: string[]): string[] => {
    if (queue.length === 0) return result;
    const [c, ...rest] = queue;
    const newResult = [...result, c];
    const neighbors = [...(graph.get(c) || [])];
    const newQueue = neighbors.reduce((q, n) => {
      inDeg.set(n, (inDeg.get(n) || 0) - 1);
      return inDeg.get(n) === 0 ? [...q, n] : q;
    }, rest);
    return topoSort(newQueue, newResult);
  };
  const start = [...inDeg.entries()].filter(([, d]) => d === 0).map(([c]) => c);
  const result = topoSort(start, []);
  return result.length === chars.size ? result.join('') : '';
}`,

    Haskell: `import Data.Map.Strict (Map)
import qualified Data.Map.Strict as Map
import Data.Set (Set)
import qualified Data.Set as Set

alienOrder :: [String] -> String
alienOrder words =
  let chars = Set.fromList (concat words)
      edges = concatMap findEdge (zip words (tail words))
      findEdge ([], _) = []
      findEdge (_, []) = []
      findEdge (a:as_, b:bs)
        | a /= b = [(a, b)]
        | otherwise = findEdge (as_, bs)
      graph = foldl (\\g (u, v) ->
        Map.insertWith Set.union u (Set.singleton v) g)
        (Map.fromList [(c, Set.empty) | c <- Set.toList chars]) edges
      inDeg = foldl (\\m (_, v) -> Map.insertWith (+) v 1 m)
        (Map.fromList [(c, 0) | c <- Set.toList chars]) edges
      topo [] res = res
      topo (c:rest) res =
        let nbs = Set.toList (Map.findWithDefault Set.empty c graph)
            (deg', q') = foldl (\\(d, q) n ->
              let d' = Map.adjust (subtract 1) n d
              in if Map.findWithDefault 0 n d' == 0
                 then (d', q ++ [n]) else (d', q))
              (inDeg, rest) nbs
        in topo q' (res ++ [c])
      start = [c | (c, 0) <- Map.toList inDeg]
      result = topo start []
  in if length result == Set.size chars then result else ""`,

    Elixir: `defmodule AlienDict do
  def alien_order(words) do
    chars = words |> Enum.join() |> String.graphemes() |> MapSet.new()
    edges = words |> Enum.chunk_every(2, 1, :discard)
            |> Enum.flat_map(&find_edge/1)
    graph = Enum.reduce(edges, Map.new(chars, fn c -> {c, MapSet.new()} end),
      fn {u, v}, g -> Map.update(g, u, MapSet.new([v]), &MapSet.put(&1, v)) end)
    in_deg = Enum.reduce(edges, Map.new(chars, fn c -> {c, 0} end),
      fn {_u, v}, m -> Map.update(m, v, 1, &(&1 + 1)) end)
    start = in_deg |> Enum.filter(fn {_, d} -> d == 0 end) |> Enum.map(&elem(&1, 0))
    topo(start, [], graph, in_deg, MapSet.size(chars))
  end
  defp find_edge([w1, w2]) do
    Enum.zip(String.graphemes(w1), String.graphemes(w2))
    |> Enum.find(fn {a, b} -> a != b end)
    |> case do nil -> []; {a, b} -> [{a, b}] end
  end
  defp topo([], res, _, _, n), do: if length(res) == n, do: Enum.join(res), else: ""
  defp topo([c | rest], res, graph, in_deg, n) do
    nbs = Map.get(graph, c, MapSet.new()) |> MapSet.to_list()
    {in_deg, new_q} = Enum.reduce(nbs, {in_deg, rest}, fn nb, {d, q} ->
      d = Map.update!(d, nb, &(&1 - 1))
      if d[nb] == 0, do: {d, q ++ [nb]}, else: {d, q}
    end)
    topo(new_q, res ++ [c], graph, in_deg, n)
  end
end`,

    Rust: `use std::collections::{HashMap, HashSet, VecDeque};
fn alien_order(words: &[&str]) -> String {
    let mut graph: HashMap<char, HashSet<char>> = HashMap::new();
    let mut in_deg: HashMap<char, usize> = HashMap::new();
    for w in words { for c in w.chars() {
        graph.entry(c).or_default(); in_deg.entry(c).or_insert(0);
    }}
    for pair in words.windows(2) {
        let (w1, w2) = (pair[0], pair[1]);
        if w1.len() > w2.len() && w1.starts_with(w2) { return String::new(); }
        for (a, b) in w1.chars().zip(w2.chars()) {
            if a != b {
                if graph.entry(a).or_default().insert(b) {
                    *in_deg.entry(b).or_insert(0) += 1;
                }
                break;
            }
        }
    }
    let mut queue: VecDeque<char> = in_deg.iter()
        .filter(|(_, &d)| d == 0).map(|(&c, _)| c).collect();
    let mut result = String::new();
    while let Some(c) = queue.pop_front() {
        result.push(c);
        for &nb in graph.get(&c).unwrap() {
            let d = in_deg.get_mut(&nb).unwrap();
            *d -= 1;
            if *d == 0 { queue.push_back(nb); }
        }
    }
    if result.len() == in_deg.len() { result } else { String::new() }
}`,

    Scala: `def alienOrder(words: Array[String]): String = {
  val chars = words.flatMap(_.toList).toSet
  val edges = words.sliding(2).flatMap { case Array(w1, w2) =>
    w1.zip(w2).find { case (a, b) => a != b }.map { case (a, b) => (a, b) }
  }.toList
  val graph = edges.foldLeft(chars.map(_ -> Set.empty[Char]).toMap) {
    case (g, (u, v)) => g.updated(u, g(u) + v)
  }
  val inDeg = edges.foldLeft(chars.map(_ -> 0).toMap) {
    case (m, (_, v)) => m.updated(v, m(v) + 1)
  }
  def topo(queue: List[Char], res: String, deg: Map[Char, Int]): String =
    queue match {
      case Nil => if (res.length == chars.size) res else ""
      case c :: rest =>
        val nbs = graph.getOrElse(c, Set.empty)
        val (newDeg, newQ) = nbs.foldLeft((deg, rest)) {
          case ((d, q), n) =>
            val d2 = d.updated(n, d(n) - 1)
            if (d2(n) == 0) (d2, q :+ n) else (d2, q)
        }
        topo(newQ, res + c, newDeg)
    }
  topo(inDeg.filter(_._2 == 0).keys.toList, "", inDeg)
}`,

    OCaml: `let alien_order words =
  let module CMap = Map.Make(Char) in
  let module CSet = Set.Make(Char) in
  let chars = List.fold_left (fun s w ->
    String.fold_left (fun s c -> CSet.add c s) s w) CSet.empty words in
  let find_edge w1 w2 =
    let rec go i =
      if i >= min (String.length w1) (String.length w2) then None
      else if w1.[i] <> w2.[i] then Some (w1.[i], w2.[i])
      else go (i + 1) in go 0 in
  let pairs = List.combine (List.rev (List.tl (List.rev words))) (List.tl words) in
  let edges = List.filter_map (fun (a, b) -> find_edge a b) pairs in
  let graph = CSet.fold (fun c g -> CMap.add c CSet.empty g) chars CMap.empty in
  let graph = List.fold_left (fun g (u, v) ->
    CMap.update u (function
      | None -> Some (CSet.singleton v)
      | Some s -> Some (CSet.add v s)) g) graph edges in
  let in_deg = CSet.fold (fun c m -> CMap.add c 0 m) chars CMap.empty in
  let in_deg = List.fold_left (fun m (_, v) ->
    CMap.update v (function
      | None -> Some 1 | Some n -> Some (n + 1)) m) in_deg edges in
  let start = CMap.fold (fun c d acc -> if d = 0 then c :: acc else acc)
    in_deg [] in
  let rec topo queue res deg =
    match queue with
    | [] -> if String.length res = CSet.cardinal chars then res else ""
    | c :: rest ->
      let nbs = CSet.elements (CMap.find c graph) in
      let (deg', q') = List.fold_left (fun (d, q) n ->
        let d' = CMap.update n (function
          | Some x -> Some (x - 1) | None -> None) d in
        if CMap.find n d' = 0 then (d', q @ [n]) else (d', q))
        (deg, rest) nbs in
      topo q' (res ^ String.make 1 c) deg'
  in topo start "" in_deg`,

    Clojure: `(defn alien-order [words]
  (let [chars (set (apply concat words))
        edges (for [[w1 w2] (partition 2 1 words)
                    :let [pair (first (filter (fn [[a b]] (not= a b))
                                 (map vector w1 w2)))]
                    :when pair]
                pair)
        graph (reduce (fn [g [u v]] (update g u (fnil conj #{}) v))
                (zipmap chars (repeat #{})) edges)
        in-deg (reduce (fn [m [_ v]] (update m v (fnil inc) 0))
                 (zipmap chars (repeat 0)) edges)]
    (loop [q (vec (filter #(zero? (in-deg %)) chars))
           res [] deg in-deg]
      (if (empty? q)
        (if (= (count res) (count chars)) (apply str res) "")
        (let [c (first q)
              nbs (graph c #{})
              [deg' q'] (reduce (fn [[d qq] n]
                          (let [d (update d n dec)]
                            (if (zero? (d n))
                              [d (conj qq n)] [d qq])))
                        [deg (vec (rest q))] nbs)]
          (recur q' (conj res c) deg'))))))`,

    Lisp: `(defun alien-order (words)
  (let ((chars (remove-duplicates (apply #'append (mapcar
          (lambda (w) (coerce w 'list)) words))))
        (graph (make-hash-table)) (in-deg (make-hash-table)))
    (dolist (c chars) (setf (gethash c graph) nil (gethash c in-deg) 0))
    (loop for (w1 w2) on words while w2 do
      (loop for a across w1 for b across w2
            when (char/= a b) do
              (unless (member b (gethash a graph))
                (push b (gethash a graph))
                (incf (gethash b in-deg 0)))
              (return)))
    (labels ((topo (queue res)
               (if (null queue)
                 (if (= (length res) (length chars))
                   (coerce (reverse res) 'string) "")
                 (let* ((c (car queue)) (rest (cdr queue))
                        (nbs (gethash c graph)))
                   (dolist (n nbs)
                     (decf (gethash n in-deg))
                     (when (zerop (gethash n in-deg))
                       (setf rest (append rest (list n)))))
                   (topo rest (cons c res))))))
      (topo (loop for c in chars when (zerop (gethash c in-deg)) collect c)
            nil))))`,
  },

  // ─── Problem 131: Encode and Decode Strings (LC 271) ─────────────────────────
  131: {
    TypeScript: `// Encode: length-prefixed. Decode: parse length prefix.
function encode(strs: string[]): string {
  return strs.reduce((acc, s) => acc + s.length + '#' + s, '');
}
function decode(s: string): string[] {
  const helper = (i: number, acc: string[]): string[] => {
    if (i >= s.length) return acc;
    const hashIdx = s.indexOf('#', i);
    const len = parseInt(s.slice(i, hashIdx), 10);
    const word = s.slice(hashIdx + 1, hashIdx + 1 + len);
    return helper(hashIdx + 1 + len, [...acc, word]);
  };
  return helper(0, []);
}`,

    Haskell: `encode :: [String] -> String
encode = concatMap (\\s -> show (length s) ++ "#" ++ s)

decode :: String -> [String]
decode [] = []
decode s =
  let (numStr, rest) = span (/= '#') s
      n = read numStr :: Int
      word = take n (tail rest)
  in word : decode (drop n (tail rest))`,

    Elixir: `defmodule Codec do
  def encode(strs) do
    Enum.reduce(strs, "", fn s, acc ->
      acc <> Integer.to_string(String.length(s)) <> "#" <> s
    end)
  end
  def decode(s), do: do_decode(s, [])
  defp do_decode("", acc), do: Enum.reverse(acc)
  defp do_decode(s, acc) do
    {num_str, "#" <> rest} = Integer.parse(s)
    {word, remaining} = String.split_at(rest, num_str)
    do_decode(remaining, [word | acc])
  end
end`,

    Rust: `fn encode(strs: &[String]) -> String {
    strs.iter().fold(String::new(), |acc, s|
        format!("{}{}#{}", acc, s.len(), s))
}
fn decode(s: &str) -> Vec<String> {
    fn helper(s: &str, i: usize, acc: Vec<String>) -> Vec<String> {
        if i >= s.len() { return acc; }
        let hash = s[i..].find('#').unwrap() + i;
        let len: usize = s[i..hash].parse().unwrap();
        let word = s[hash+1..hash+1+len].to_string();
        let mut a = acc; a.push(word);
        helper(s, hash + 1 + len, a)
    }
    helper(s, 0, vec![])
}`,

    Scala: `def encode(strs: List[String]): String =
  strs.foldLeft("")((acc, s) => acc + s.length + "#" + s)

def decode(s: String): List[String] = {
  def helper(i: Int, acc: List[String]): List[String] = {
    if (i >= s.length) acc.reverse
    else {
      val hash = s.indexOf('#', i)
      val len = s.substring(i, hash).toInt
      val word = s.substring(hash + 1, hash + 1 + len)
      helper(hash + 1 + len, word :: acc)
    }
  }
  helper(0, Nil)
}`,

    OCaml: `let encode strs =
  List.fold_left (fun acc s ->
    acc ^ string_of_int (String.length s) ^ "#" ^ s) "" strs

let decode s =
  let rec helper i acc =
    if i >= String.length s then List.rev acc
    else
      let hash = String.index_from s i '#' in
      let len = int_of_string (String.sub s i (hash - i)) in
      let word = String.sub s (hash + 1) len in
      helper (hash + 1 + len) (word :: acc)
  in helper 0 []`,

    Clojure: `(defn encode [strs]
  (reduce (fn [acc s] (str acc (count s) "#" s)) "" strs))

(defn decode [s]
  (loop [i 0 acc []]
    (if (>= i (count s)) acc
      (let [hash (.indexOf s "#" i)
            len (Integer/parseInt (subs s i hash))
            word (subs s (inc hash) (+ (inc hash) len))]
        (recur (+ (inc hash) len) (conj acc word))))))`,

    Lisp: `(defun encode-strings (strs)
  (reduce (lambda (acc s)
    (concatenate 'string acc
      (write-to-string (length s)) "#" s)) strs :initial-value ""))

(defun decode-strings (s)
  (labels ((helper (i acc)
    (if (>= i (length s)) (nreverse acc)
      (let* ((hash (position #\\# s :start i))
             (len (parse-integer (subseq s i hash)))
             (word (subseq s (1+ hash) (+ 1 hash len))))
        (helper (+ 1 hash len) (cons word acc))))))
    (helper 0 nil)))`,
  },

  // ─── Problem 132: First Bad Version (LC 278) ─────────────────────────────────
  132: {
    TypeScript: `// isBadVersion is provided by the API
function firstBadVersion(n: number): number {
  const search = (lo: number, hi: number): number => {
    if (lo >= hi) return lo;
    const mid = lo + Math.floor((hi - lo) / 2);
    return isBadVersion(mid) ? search(lo, mid) : search(mid + 1, hi);
  };
  return search(1, n);
}`,

    Haskell: `firstBadVersion :: (Int -> Bool) -> Int -> Int
firstBadVersion isBad n = search 1 n
  where
    search lo hi
      | lo >= hi  = lo
      | isBad mid = search lo mid
      | otherwise = search (mid + 1) hi
      where mid = lo + div (hi - lo) 2`,

    Elixir: `defmodule Solution do
  def first_bad_version(n, is_bad) do
    search(1, n, is_bad)
  end
  defp search(lo, hi, _) when lo >= hi, do: lo
  defp search(lo, hi, is_bad) do
    mid = lo + div(hi - lo, 2)
    if is_bad.(mid), do: search(lo, mid, is_bad), else: search(mid + 1, hi, is_bad)
  end
end`,

    Rust: `fn first_bad_version(n: i32, is_bad: impl Fn(i32) -> bool) -> i32 {
    fn search(lo: i32, hi: i32, is_bad: &dyn Fn(i32) -> bool) -> i32 {
        if lo >= hi { return lo; }
        let mid = lo + (hi - lo) / 2;
        if is_bad(mid) { search(lo, mid, is_bad) }
        else { search(mid + 1, hi, is_bad) }
    }
    search(1, n, &is_bad)
}`,

    Scala: `def firstBadVersion(n: Int, isBad: Int => Boolean): Int = {
  def search(lo: Int, hi: Int): Int = {
    if (lo >= hi) lo
    else {
      val mid = lo + (hi - lo) / 2
      if (isBad(mid)) search(lo, mid) else search(mid + 1, hi)
    }
  }
  search(1, n)
}`,

    OCaml: `let first_bad_version n is_bad =
  let rec search lo hi =
    if lo >= hi then lo
    else
      let mid = lo + (hi - lo) / 2 in
      if is_bad mid then search lo mid
      else search (mid + 1) hi
  in search 1 n`,

    Clojure: `(defn first-bad-version [n is-bad?]
  (loop [lo 1 hi n]
    (if (>= lo hi) lo
      (let [mid (+ lo (quot (- hi lo) 2))]
        (if (is-bad? mid)
          (recur lo mid)
          (recur (inc mid) hi))))))`,

    Lisp: `(defun first-bad-version (n is-bad-fn)
  (labels ((search-fn (lo hi)
    (if (>= lo hi) lo
      (let ((mid (+ lo (floor (- hi lo) 2))))
        (if (funcall is-bad-fn mid)
          (search-fn lo mid)
          (search-fn (1+ mid) hi))))))
    (search-fn 1 n)))`,
  },

  // ─── Problem 133: Binary Search (LC 704) ─────────────────────────────────────
  133: {
    TypeScript: `function binarySearch(nums: number[], target: number): number {
  const search = (lo: number, hi: number): number => {
    if (lo > hi) return -1;
    const mid = lo + Math.floor((hi - lo) / 2);
    if (nums[mid] === target) return mid;
    return nums[mid] < target ? search(mid + 1, hi) : search(lo, mid - 1);
  };
  return search(0, nums.length - 1);
}`,

    Haskell: `binarySearch :: [Int] -> Int -> Int
binarySearch nums target = search 0 (length nums - 1)
  where
    arr = listArray (0, length nums - 1) nums
    search lo hi
      | lo > hi        = -1
      | arr ! mid == target = mid
      | arr ! mid < target  = search (mid + 1) hi
      | otherwise           = search lo (mid - 1)
      where mid = lo + div (hi - lo) 2`,

    Elixir: `defmodule Solution do
  def binary_search(nums, target) do
    arr = :array.from_list(nums)
    search(arr, target, 0, :array.size(arr) - 1)
  end
  defp search(_, _, lo, hi) when lo > hi, do: -1
  defp search(arr, target, lo, hi) do
    mid = lo + div(hi - lo, 2)
    val = :array.get(mid, arr)
    cond do
      val == target -> mid
      val < target  -> search(arr, target, mid + 1, hi)
      true          -> search(arr, target, lo, mid - 1)
    end
  end
end`,

    Rust: `fn binary_search(nums: &[i32], target: i32) -> i32 {
    fn search(nums: &[i32], target: i32, lo: usize, hi: isize) -> i32 {
        if lo as isize > hi { return -1; }
        let mid = lo + ((hi as usize - lo) / 2);
        if nums[mid] == target { mid as i32 }
        else if nums[mid] < target { search(nums, target, mid + 1, hi) }
        else { search(nums, target, lo, mid as isize - 1) }
    }
    search(nums, target, 0, nums.len() as isize - 1)
}`,

    Scala: `def binarySearch(nums: Array[Int], target: Int): Int = {
  def search(lo: Int, hi: Int): Int = {
    if (lo > hi) -1
    else {
      val mid = lo + (hi - lo) / 2
      if (nums(mid) == target) mid
      else if (nums(mid) < target) search(mid + 1, hi)
      else search(lo, mid - 1)
    }
  }
  search(0, nums.length - 1)
}`,

    OCaml: `let binary_search nums target =
  let arr = Array.of_list nums in
  let rec search lo hi =
    if lo > hi then -1
    else
      let mid = lo + (hi - lo) / 2 in
      if arr.(mid) = target then mid
      else if arr.(mid) < target then search (mid + 1) hi
      else search lo (mid - 1)
  in search 0 (Array.length arr - 1)`,

    Clojure: `(defn binary-search [nums target]
  (let [arr (vec nums)]
    (loop [lo 0 hi (dec (count arr))]
      (if (> lo hi) -1
        (let [mid (+ lo (quot (- hi lo) 2))
              v (arr mid)]
          (cond
            (= v target) mid
            (< v target) (recur (inc mid) hi)
            :else (recur lo (dec mid))))))))`,

    Lisp: `(defun binary-search (nums target)
  (let ((arr (coerce nums 'vector)))
    (labels ((search-fn (lo hi)
      (if (> lo hi) -1
        (let* ((mid (+ lo (floor (- hi lo) 2)))
               (v (aref arr mid)))
          (cond ((= v target) mid)
                ((< v target) (search-fn (1+ mid) hi))
                (t (search-fn lo (1- mid))))))))
      (search-fn 0 (1- (length arr))))))`,
  },

  // ─── Problem 134: Move Zeroes (LC 283) ───────────────────────────────────────
  134: {
    TypeScript: `function moveZeroes(nums: number[]): number[] {
  const nonZeros = nums.filter(x => x !== 0);
  const zeros = nums.filter(x => x === 0);
  return [...nonZeros, ...zeros];
}`,

    Haskell: `moveZeroes :: [Int] -> [Int]
moveZeroes xs = filter (/= 0) xs ++ filter (== 0) xs`,

    Elixir: `defmodule Solution do
  def move_zeroes(nums) do
    {zeros, non_zeros} = Enum.split_with(nums, &(&1 == 0))
    non_zeros ++ zeros
  end
end`,

    Rust: `fn move_zeroes(nums: &[i32]) -> Vec<i32> {
    let non_zeros: Vec<i32> = nums.iter().filter(|&&x| x != 0).copied().collect();
    let zeros = vec![0; nums.len() - non_zeros.len()];
    [non_zeros, zeros].concat()
}`,

    Scala: `def moveZeroes(nums: List[Int]): List[Int] = {
  val (zeros, nonZeros) = nums.partition(_ == 0)
  nonZeros ++ zeros
}`,

    OCaml: `let move_zeroes nums =
  let non_zeros = List.filter (fun x -> x <> 0) nums in
  let zeros = List.filter (fun x -> x = 0) nums in
  non_zeros @ zeros`,

    Clojure: `(defn move-zeroes [nums]
  (let [non-zeros (filter #(not= 0 %) nums)
        zeros (filter #(= 0 %) nums)]
    (concat non-zeros zeros)))`,

    Lisp: `(defun move-zeroes (nums)
  (append (remove 0 nums) (remove-if-not #'zerop nums)))`,
  },

  // ─── Problem 135: Inorder Successor in BST (LC 285) ──────────────────────────
  135: {
    TypeScript: `interface TreeNode { val: number; left: TreeNode | null; right: TreeNode | null; }
function inorderSuccessor(root: TreeNode | null, p: TreeNode): TreeNode | null {
  const search = (node: TreeNode | null, candidate: TreeNode | null): TreeNode | null => {
    if (!node) return candidate;
    if (node.val > p.val) return search(node.left, node);
    return search(node.right, candidate);
  };
  return search(root, null);
}`,

    Haskell: `data Tree a = Empty | Node a (Tree a) (Tree a)

inorderSuccessor :: Ord a => Tree a -> a -> Maybe a
inorderSuccessor Empty _ = Nothing
inorderSuccessor (Node v left right) p
  | v > p     = case inorderSuccessor left p of
                  Nothing -> Just v
                  result  -> result
  | otherwise = inorderSuccessor right p`,

    Elixir: `defmodule Solution do
  def inorder_successor(nil, _p), do: nil
  def inorder_successor(%{val: v, left: left}, p) when v > p do
    case inorder_successor(left, p) do
      nil -> v
      res -> res
    end
  end
  def inorder_successor(%{right: right}, p), do: inorder_successor(right, p)
end`,

    Rust: `#[derive(Debug)]
struct TreeNode { val: i32, left: Option<Box<TreeNode>>, right: Option<Box<TreeNode>> }
fn inorder_successor(root: &Option<Box<TreeNode>>, p: i32) -> Option<i32> {
    match root {
        None => None,
        Some(node) if node.val > p =>
            inorder_successor(&node.left, p).or(Some(node.val)),
        Some(node) => inorder_successor(&node.right, p),
    }
}`,

    Scala: `case class TreeNode(val v: Int, left: Option[TreeNode], right: Option[TreeNode])
def inorderSuccessor(root: Option[TreeNode], p: Int): Option[Int] = root match {
  case None => None
  case Some(node) if node.v > p =>
    inorderSuccessor(node.left, p).orElse(Some(node.v))
  case Some(node) => inorderSuccessor(node.right, p)
}`,

    OCaml: `type tree = Leaf | Node of int * tree * tree

let rec inorder_successor root p =
  match root with
  | Leaf -> None
  | Node (v, left, _) when v > p ->
    (match inorder_successor left p with
     | None -> Some v
     | res  -> res)
  | Node (_, _, right) -> inorder_successor right p`,

    Clojure: `(defn inorder-successor [root p]
  (cond
    (nil? root) nil
    (> (:val root) p)
      (or (inorder-successor (:left root) p) (:val root))
    :else (inorder-successor (:right root) p)))`,

    Lisp: `(defun inorder-successor (root p)
  (cond
    ((null root) nil)
    ((> (node-val root) p)
     (or (inorder-successor (node-left root) p) (node-val root)))
    (t (inorder-successor (node-right root) p))))`,
  },

  // ─── Problem 136: Find the Duplicate Number (LC 287) ─────────────────────────
  136: {
    TypeScript: `// Floyd's cycle detection on index mapping
function findDuplicate(nums: number[]): number {
  const step = (pos: number) => nums[pos];
  const findMeet = (slow: number, fast: number): number => {
    const s = step(slow);
    const f = step(step(fast));
    return s === f ? s : findMeet(s, f);
  };
  const findStart = (a: number, b: number): number =>
    a === b ? a : findStart(step(a), step(b));
  const meet = findMeet(0, 0);
  return findStart(0, meet);
}`,

    Haskell: `import Data.Array

findDuplicate :: [Int] -> Int
findDuplicate nums =
  let arr = listArray (0, length nums - 1) nums
      step i = arr ! i
      findMeet s f
        | s' == f' = s'
        | otherwise = findMeet s' f'
        where s' = step s; f' = step (step f)
      findStart a b
        | a == b    = a
        | otherwise = findStart (step a) (step b)
      meet = findMeet (step 0) (step (step 0))
  in findStart 0 meet`,

    Elixir: `defmodule Solution do
  def find_duplicate(nums) do
    arr = :array.from_list([0 | nums])
    step = fn i -> :array.get(i, arr) end
    meet = find_meet(step.(0), step.(step.(0)), step)
    find_start(0, meet, step)
  end
  defp find_meet(s, f, step) when s == f, do: s
  defp find_meet(s, f, step), do: find_meet(step.(s), step.(step.(f)), step)
  defp find_start(a, b, _) when a == b, do: a
  defp find_start(a, b, step), do: find_start(step.(a), step.(b), step)
end`,

    Rust: `fn find_duplicate(nums: &[i32]) -> i32 {
    let step = |i: usize| nums[i] as usize;
    fn find_meet(s: usize, f: usize, nums: &[i32]) -> usize {
        let s2 = nums[s] as usize;
        let f2 = nums[nums[f] as usize] as usize;
        if s2 == f2 { s2 } else { find_meet(s2, f2, nums) }
    }
    fn find_start(a: usize, b: usize, nums: &[i32]) -> i32 {
        if a == b { a as i32 }
        else { find_start(nums[a] as usize, nums[b] as usize, nums) }
    }
    let meet = find_meet(0, 0, nums);
    find_start(0, meet, nums)
}`,

    Scala: `def findDuplicate(nums: Array[Int]): Int = {
  def step(i: Int): Int = nums(i)
  def findMeet(s: Int, f: Int): Int = {
    val (s2, f2) = (step(s), step(step(f)))
    if (s2 == f2) s2 else findMeet(s2, f2)
  }
  def findStart(a: Int, b: Int): Int =
    if (a == b) a else findStart(step(a), step(b))
  val meet = findMeet(step(0), step(step(0)))
  findStart(0, meet)
}`,

    OCaml: `let find_duplicate nums =
  let arr = Array.of_list nums in
  let step i = arr.(i) in
  let rec find_meet s f =
    let s' = step s and f' = step (step f) in
    if s' = f' then s' else find_meet s' f' in
  let rec find_start a b =
    if a = b then a else find_start (step a) (step b) in
  let meet = find_meet (step 0) (step (step 0)) in
  find_start 0 meet`,

    Clojure: `(defn find-duplicate [nums]
  (let [arr (vec (cons 0 nums))
        step #(arr %)
        find-meet (fn find-meet [s f]
          (let [s' (step s) f' (step (step f))]
            (if (= s' f') s' (recur s' f'))))
        meet (find-meet (step 0) (step (step 0)))]
    (loop [a 0 b meet]
      (if (= a b) a (recur (step a) (step b))))))`,

    Lisp: `(defun find-duplicate (nums)
  (let ((arr (coerce (cons 0 nums) 'vector)))
    (flet ((step-fn (i) (aref arr i)))
      (labels ((find-meet (s f)
                 (let ((s2 (step-fn s))
                       (f2 (step-fn (step-fn f))))
                   (if (= s2 f2) s2 (find-meet s2 f2))))
               (find-start (a b)
                 (if (= a b) a
                   (find-start (step-fn a) (step-fn b)))))
        (let ((meet (find-meet (step-fn 0) (step-fn (step-fn 0)))))
          (find-start 0 meet))))))`,
  },

  // ─── Problem 137: Cheapest Flights Within K Stops (LC 787) ───────────────────
  137: {
    TypeScript: `function findCheapestPrice(n: number, flights: number[][], src: number, dst: number, k: number): number {
  const INF = Infinity;
  const initPrices = Array(n).fill(INF);
  initPrices[src] = 0;
  const relax = (prices: number[], _: number): number[] =>
    flights.reduce((next, [u, v, w]) => {
      if (prices[u] < INF && prices[u] + w < next[v]) {
        const copy = [...next];
        copy[v] = prices[u] + w;
        return copy;
      }
      return next;
    }, [...prices]);
  const finalPrices = Array.from({ length: k + 1 }).reduce<number[]>(
    (acc) => relax(acc, 0), initPrices);
  return finalPrices[dst] === INF ? -1 : finalPrices[dst];
}`,

    Haskell: `import Data.Array

findCheapestPrice :: Int -> [(Int,Int,Int)] -> Int -> Int -> Int -> Int
findCheapestPrice n flights src dst k =
  let inf = maxBound :: Int
      init = listArray (0, n-1) [if i == src then 0 else inf | i <- [0..n-1]]
      relax prices = foldl (\\arr (u,v,w) ->
        if prices ! u < inf && prices ! u + w < arr ! v
        then arr // [(v, prices ! u + w)]
        else arr) prices flights
      final = iterate relax init !! (k + 1)
  in if final ! dst == inf then -1 else final ! dst`,

    Elixir: `defmodule Solution do
  def find_cheapest_price(n, flights, src, dst, k) do
    inf = :infinity
    init = Enum.map(0..n-1, fn i -> if i == src, do: 0, else: inf end)
    prices = Enum.reduce(1..k+1, init, fn _, prices ->
      Enum.reduce(flights, List.to_tuple(prices) |> Tuple.to_list(), fn [u, v, w], next ->
        pu = Enum.at(prices, u)
        if pu != inf and pu + w < Enum.at(next, v) do
          List.replace_at(next, v, pu + w)
        else
          next
        end
      end)
    end)
    result = Enum.at(prices, dst)
    if result == inf, do: -1, else: result
  end
end`,

    Rust: `fn find_cheapest_price(n: usize, flights: &[(usize,usize,i32)], src: usize, dst: usize, k: usize) -> i32 {
    let inf = i32::MAX;
    let mut prices = vec![inf; n];
    prices[src] = 0;
    for _ in 0..=k {
        let prev = prices.clone();
        for &(u, v, w) in flights {
            if prev[u] < inf && prev[u] + w < prices[v] {
                prices[v] = prev[u] + w;
            }
        }
    }
    if prices[dst] == inf { -1 } else { prices[dst] }
}`,

    Scala: `def findCheapestPrice(n: Int, flights: Array[Array[Int]], src: Int, dst: Int, k: Int): Int = {
  val inf = Int.MaxValue
  val init = (0 until n).map(i => if (i == src) 0 else inf).toArray
  val finalP = (0 to k).foldLeft(init) { (prices, _) =>
    flights.foldLeft(prices.clone()) { (next, f) =>
      val Array(u, v, w) = f
      if (prices(u) < inf && prices(u) + w < next(v)) { next(v) = prices(u) + w; next }
      else next
    }
  }
  if (finalP(dst) == inf) -1 else finalP(dst)
}`,

    OCaml: `let find_cheapest_price n flights src dst k =
  let inf = max_int in
  let prices = Array.init n (fun i -> if i = src then 0 else inf) in
  for _ = 0 to k do
    let prev = Array.copy prices in
    List.iter (fun (u, v, w) ->
      if prev.(u) < inf && prev.(u) + w < prices.(v) then
        prices.(v) <- prev.(u) + w
    ) flights
  done;
  if prices.(dst) = inf then -1 else prices.(dst)`,

    Clojure: `(defn find-cheapest-price [n flights src dst k]
  (let [inf Integer/MAX_VALUE
        init (assoc (vec (repeat n inf)) src 0)
        relax (fn [prices]
                (reduce (fn [next [u v w]]
                  (if (and (< (prices u) inf)
                           (< (+ (prices u) w) (next v)))
                    (assoc next v (+ (prices u) w))
                    next))
                  prices flights))]
    (let [final (nth (iterate relax init) (inc k))]
      (if (= (final dst) inf) -1 (final dst)))))`,

    Lisp: `(defun find-cheapest-price (n flights src dst k)
  (let ((inf most-positive-fixnum)
        (prices (make-array n :initial-element most-positive-fixnum)))
    (setf (aref prices src) 0)
    (dotimes (_ (1+ k))
      (let ((prev (copy-seq prices)))
        (dolist (f flights)
          (destructuring-bind (u v w) f
            (when (and (< (aref prev u) inf)
                       (< (+ (aref prev u) w) (aref prices v)))
              (setf (aref prices v) (+ (aref prev u) w)))))))
    (if (= (aref prices dst) inf) -1 (aref prices dst))))`,
  },

  // ─── Problem 138: Find Median from Data Stream (LC 295) ──────────────────────
  138: {
    TypeScript: `// Functional two-heap approach using sorted halves
class MedianFinder {
  private lo: number[] = []; // max-heap as sorted desc
  private hi: number[] = []; // min-heap as sorted asc
  addNum(num: number): void {
    const insert = (arr: number[], val: number) =>
      [...arr.filter(x => x <= val), val, ...arr.filter(x => x > val)];
    if (this.lo.length === 0 || num <= this.lo[this.lo.length - 1]) {
      this.lo = insert(this.lo, num);
    } else {
      this.hi = insert(this.hi, num);
    }
    // Balance
    if (this.lo.length > this.hi.length + 1) {
      this.hi = [this.lo[this.lo.length - 1], ...this.hi];
      this.lo = this.lo.slice(0, -1);
    } else if (this.hi.length > this.lo.length) {
      this.lo = [...this.lo, this.hi[0]];
      this.hi = this.hi.slice(1);
    }
  }
  findMedian(): number {
    return this.lo.length > this.hi.length
      ? this.lo[this.lo.length - 1]
      : (this.lo[this.lo.length - 1] + this.hi[0]) / 2;
  }
}`,

    Haskell: `import Data.List (sort, insertBy)

data MedianState = MS [Int] [Int] -- lo (max-heap desc), hi (min-heap asc)

empty :: MedianState
empty = MS [] []

addNum :: Int -> MedianState -> MedianState
addNum x (MS lo hi)
  | null lo || x <= last lo = balance (MS (sort (x:lo)) hi)
  | otherwise               = balance (MS lo (insertAsc x hi))
  where
    insertAsc v [] = [v]
    insertAsc v (h:t) = if v <= h then v:h:t else h : insertAsc v t
    balance (MS lo' hi')
      | length lo' > length hi' + 1 = MS (init lo') (last lo' : hi')
      | length hi' > length lo'     = MS (lo' ++ [head hi']) (tail hi')
      | otherwise                   = MS lo' hi'

findMedian :: MedianState -> Double
findMedian (MS lo hi)
  | length lo > length hi = fromIntegral (last lo)
  | otherwise = fromIntegral (last lo + head hi) / 2.0`,

    Elixir: `defmodule MedianFinder do
  defstruct lo: [], hi: []

  def new, do: %MedianFinder{}

  def add_num(%MedianFinder{lo: lo, hi: hi} = _mf, num) do
    {lo, hi} = if lo == [] or num <= List.last(lo),
      do: {Enum.sort([ num | lo]), hi},
      else: {lo, insert_sorted(hi, num)}
    balance(lo, hi)
  end

  defp insert_sorted([], v), do: [v]
  defp insert_sorted([h | t], v) when v <= h, do: [v, h | t]
  defp insert_sorted([h | t], v), do: [h | insert_sorted(t, v)]

  defp balance(lo, hi) when length(lo) > length(hi) + 1 do
    %MedianFinder{lo: Enum.drop(lo, -1), hi: [List.last(lo) | hi]}
  end
  defp balance(lo, hi) when length(hi) > length(lo) do
    %MedianFinder{lo: lo ++ [hd(hi)], hi: tl(hi)}
  end
  defp balance(lo, hi), do: %MedianFinder{lo: lo, hi: hi}

  def find_median(%MedianFinder{lo: lo, hi: hi}) do
    if length(lo) > length(hi), do: List.last(lo),
    else: (List.last(lo) + hd(hi)) / 2
  end
end`,

    Rust: `use std::collections::BinaryHeap;
use std::cmp::Reverse;
struct MedianFinder { lo: BinaryHeap<i32>, hi: BinaryHeap<Reverse<i32>> }
impl MedianFinder {
    fn new() -> Self { MedianFinder { lo: BinaryHeap::new(), hi: BinaryHeap::new() } }
    fn add_num(&mut self, num: i32) {
        self.lo.push(num);
        self.hi.push(Reverse(self.lo.pop().unwrap()));
        if self.hi.len() > self.lo.len() {
            self.lo.push(self.hi.pop().unwrap().0);
        }
    }
    fn find_median(&self) -> f64 {
        if self.lo.len() > self.hi.len() { *self.lo.peek().unwrap() as f64 }
        else { (*self.lo.peek().unwrap() + self.hi.peek().unwrap().0) as f64 / 2.0 }
    }
}`,

    Scala: `import scala.collection.mutable.PriorityQueue
class MedianFinder {
  private val lo = PriorityQueue.empty[Int]            // max-heap
  private val hi = PriorityQueue.empty[Int](Ordering[Int].reverse) // min-heap
  def addNum(num: Int): Unit = {
    lo.enqueue(num)
    hi.enqueue(lo.dequeue())
    if (hi.size > lo.size) lo.enqueue(hi.dequeue())
  }
  def findMedian(): Double =
    if (lo.size > hi.size) lo.head.toDouble
    else (lo.head + hi.head) / 2.0
}`,

    OCaml: `(* Functional approach: maintain two sorted lists *)
type median_state = { lo: int list; hi: int list }

let empty_state = { lo = []; hi = [] }

let rec insert_sorted x = function
  | [] -> [x]
  | h :: t -> if x <= h then x :: h :: t else h :: insert_sorted x t

let add_num x st =
  let lo, hi =
    if st.lo = [] || x <= List.nth st.lo (List.length st.lo - 1)
    then insert_sorted x st.lo, st.hi
    else st.lo, insert_sorted x st.hi in
  let lo, hi =
    if List.length lo > List.length hi + 1
    then let last = List.nth lo (List.length lo - 1) in
         List.filteri (fun i _ -> i < List.length lo - 1) lo, last :: hi
    else if List.length hi > List.length lo
    then lo @ [List.hd hi], List.tl hi
    else lo, hi in
  { lo; hi }

let find_median st =
  let l = List.nth st.lo (List.length st.lo - 1) in
  if List.length st.lo > List.length st.hi then float_of_int l
  else float_of_int (l + List.hd st.hi) /. 2.0`,

    Clojure: `(defn make-median-finder [] {:lo [] :hi []})

(defn add-num [{:keys [lo hi]} num]
  (let [[lo hi] (if (or (empty? lo) (<= num (peek lo)))
                  [(conj lo num) hi]
                  [lo (into (sorted-set) (conj hi num))])
        lo (vec (sort lo))]
    (cond
      (> (count lo) (inc (count hi)))
        {:lo (vec (butlast lo)) :hi (cons (last lo) hi)}
      (> (count hi) (count lo))
        {:lo (conj lo (first hi)) :hi (vec (rest hi))}
      :else {:lo lo :hi (vec hi)})))

(defn find-median [{:keys [lo hi]}]
  (if (> (count lo) (count hi))
    (double (last lo))
    (/ (+ (double (last lo)) (double (first hi))) 2.0)))`,

    Lisp: `(defstruct median-finder (lo nil) (hi nil))

(defun mf-add (mf num)
  (let ((lo (median-finder-lo mf))
        (hi (median-finder-hi mf)))
    (if (or (null lo) (<= num (car (last lo))))
      (setf lo (sort (cons num lo) #'<))
      (setf hi (sort (cons num hi) #'<)))
    (cond
      ((> (length lo) (1+ (length hi)))
       (push (car (last lo)) hi)
       (setf lo (butlast lo)))
      ((> (length hi) (length lo))
       (setf lo (append lo (list (car hi))))
       (setf hi (cdr hi))))
    (setf (median-finder-lo mf) lo (median-finder-hi mf) hi)))

(defun mf-median (mf)
  (let ((lo (median-finder-lo mf))
        (hi (median-finder-hi mf)))
    (if (> (length lo) (length hi))
      (car (last lo))
      (/ (+ (car (last lo)) (car hi)) 2.0))))`,
  },

  // ─── Problem 139: Serialize and Deserialize Binary Tree (LC 297) ─────────────
  139: {
    TypeScript: `interface TreeNode { val: number; left: TreeNode | null; right: TreeNode | null; }
function serialize(root: TreeNode | null): string {
  if (!root) return 'null';
  return \`\${root.val},\${serialize(root.left)},\${serialize(root.right)}\`;
}
function deserialize(data: string): TreeNode | null {
  const tokens = data.split(',');
  const build = (idx: number): [TreeNode | null, number] => {
    if (tokens[idx] === 'null') return [null, idx + 1];
    const node: TreeNode = { val: parseInt(tokens[idx]), left: null, right: null };
    const [left, i1] = build(idx + 1);
    const [right, i2] = build(i1);
    node.left = left; node.right = right;
    return [node, i2];
  };
  return build(0)[0];
}`,

    Haskell: `data Tree = Empty | Node Int Tree Tree

serialize :: Tree -> String
serialize Empty = "null"
serialize (Node v l r) = show v ++ "," ++ serialize l ++ "," ++ serialize r

deserialize :: String -> Tree
deserialize s = fst (build (splitOn "," s))
  where
    build ("null":rest) = (Empty, rest)
    build (x:rest) =
      let val = read x :: Int
          (left, r1) = build rest
          (right, r2) = build r1
      in (Node val left right, r2)
    splitOn _ [] = [""]
    splitOn d (c:cs)
      | [c] == d  = "" : splitOn d cs
      | otherwise = let (h:t) = splitOn d cs in (c:h) : t`,

    Elixir: `defmodule Codec do
  def serialize(nil), do: "null"
  def serialize(%{val: v, left: l, right: r}) do
    "\#{v},\#{serialize(l)},\#{serialize(r)}"
  end

  def deserialize(data) do
    tokens = String.split(data, ",")
    {tree, _} = build(tokens)
    tree
  end

  defp build(["null" | rest]), do: {nil, rest}
  defp build([val | rest]) do
    {left, r1} = build(rest)
    {right, r2} = build(r1)
    {%{val: String.to_integer(val), left: left, right: right}, r2}
  end
end`,

    Rust: `use std::cell::RefCell;
use std::rc::Rc;
type Node = Option<Rc<RefCell<TreeNode>>>;
struct TreeNode { val: i32, left: Node, right: Node }
fn serialize(root: &Node) -> String {
    match root {
        None => "null".to_string(),
        Some(n) => {
            let n = n.borrow();
            format!("{},{},{}", n.val, serialize(&n.left), serialize(&n.right))
        }
    }
}
fn deserialize(data: &str) -> Node {
    let tokens: Vec<&str> = data.split(',').collect();
    fn build(tokens: &[&str], i: usize) -> (Node, usize) {
        if tokens[i] == "null" { return (None, i + 1); }
        let val: i32 = tokens[i].parse().unwrap();
        let (left, i1) = build(tokens, i + 1);
        let (right, i2) = build(tokens, i1);
        (Some(Rc::new(RefCell::new(TreeNode { val, left, right }))), i2)
    }
    build(&tokens, 0).0
}`,

    Scala: `case class TreeNode(v: Int, left: Option[TreeNode] = None, right: Option[TreeNode] = None)
def serialize(root: Option[TreeNode]): String = root match {
  case None => "null"
  case Some(n) => s"\${n.v},\${serialize(n.left)},\${serialize(n.right)}"
}
def deserialize(data: String): Option[TreeNode] = {
  def build(tokens: List[String]): (Option[TreeNode], List[String]) = tokens match {
    case "null" :: rest => (None, rest)
    case v :: rest =>
      val (left, r1) = build(rest)
      val (right, r2) = build(r1)
      (Some(TreeNode(v.toInt, left, right)), r2)
  }
  build(data.split(",").toList)._1
}`,

    OCaml: `type tree = Leaf | Node of int * tree * tree

let serialize root =
  let rec go = function
    | Leaf -> "null"
    | Node (v, l, r) ->
      string_of_int v ^ "," ^ go l ^ "," ^ go r
  in go root

let deserialize data =
  let tokens = String.split_on_char ',' data in
  let rec build = function
    | "null" :: rest -> (Leaf, rest)
    | v :: rest ->
      let (left, r1) = build rest in
      let (right, r2) = build r1 in
      (Node (int_of_string v, left, right), r2)
    | [] -> (Leaf, [])
  in fst (build tokens)`,

    Clojure: `(defn serialize [root]
  (if (nil? root) "null"
    (str (:val root) "," (serialize (:left root)) "," (serialize (:right root)))))

(defn deserialize [data]
  (let [tokens (clojure.string/split data #",")]
    (letfn [(build [ts]
              (if (= (first ts) "null")
                [nil (rest ts)]
                (let [v (Integer/parseInt (first ts))
                      [left r1] (build (rest ts))
                      [right r2] (build r1)]
                  [{:val v :left left :right right} r2])))]
      (first (build tokens)))))`,

    Lisp: `(defstruct tnode val left right)

(defun serialize-tree (root)
  (if (null root) "null"
    (format nil "~A,~A,~A" (tnode-val root)
            (serialize-tree (tnode-left root))
            (serialize-tree (tnode-right root)))))

(defun deserialize-tree (data)
  (let ((tokens (split-string data ",")))
    (labels ((build (ts)
               (if (string= (car ts) "null")
                 (values nil (cdr ts))
                 (multiple-value-bind (left r1) (build (cdr ts))
                   (multiple-value-bind (right r2) (build r1)
                     (values (make-tnode :val (parse-integer (car ts))
                               :left left :right right) r2))))))
      (build tokens))))`,
  },

  // ─── Problem 140: Longest Increasing Subsequence (LC 300) ────────────────────
  140: {
    TypeScript: `function lengthOfLIS(nums: number[]): number {
  // Patience sorting: maintain tails array with binary search
  const bisect = (tails: number[], target: number, lo: number, hi: number): number => {
    if (lo >= hi) return lo;
    const mid = lo + Math.floor((hi - lo) / 2);
    return tails[mid] < target ? bisect(tails, target, mid + 1, hi) : bisect(tails, target, lo, mid);
  };
  const result = nums.reduce<number[]>((tails, num) => {
    const pos = bisect(tails, num, 0, tails.length);
    const next = [...tails];
    if (pos === tails.length) next.push(num);
    else next[pos] = num;
    return next;
  }, []);
  return result.length;
}`,

    Haskell: `import Data.Sequence (Seq, (|>), index, update, empty)
import qualified Data.Sequence as Seq

lengthOfLIS :: [Int] -> Int
lengthOfLIS nums = Seq.length (foldl go Seq.empty nums)
  where
    go tails num =
      let pos = bisect tails num 0 (Seq.length tails)
      in if pos == Seq.length tails
         then tails |> num
         else update pos num tails
    bisect tails target lo hi
      | lo >= hi  = lo
      | index tails mid < target = bisect tails target (mid + 1) hi
      | otherwise = bisect tails target lo mid
      where mid = lo + div (hi - lo) 2`,

    Elixir: `defmodule Solution do
  def length_of_lis(nums) do
    Enum.reduce(nums, [], fn num, tails ->
      pos = bisect(tails, num, 0, length(tails))
      if pos == length(tails) do
        tails ++ [num]
      else
        List.replace_at(tails, pos, num)
      end
    end) |> length()
  end

  defp bisect(_, _, lo, hi) when lo >= hi, do: lo
  defp bisect(tails, target, lo, hi) do
    mid = lo + div(hi - lo, 2)
    if Enum.at(tails, mid) < target,
      do: bisect(tails, target, mid + 1, hi),
      else: bisect(tails, target, lo, mid)
  end
end`,

    Rust: `fn length_of_lis(nums: &[i32]) -> usize {
    nums.iter().fold(vec![], |mut tails, &num| {
        match tails.binary_search(&num) {
            Ok(pos) => tails[pos] = num,
            Err(pos) => if pos == tails.len() { tails.push(num) }
                        else { tails[pos] = num },
        }
        tails
    }).len()
}`,

    Scala: `def lengthOfLIS(nums: Array[Int]): Int = {
  import java.util
  nums.foldLeft(Vector.empty[Int]) { (tails, num) =>
    val pos = {
      var (lo, hi) = (0, tails.length)
      while (lo < hi) { val mid = (lo + hi) / 2; if (tails(mid) < num) lo = mid + 1 else hi = mid }
      lo
    }
    if (pos == tails.length) tails :+ num
    else tails.updated(pos, num)
  }.length
}`,

    OCaml: `let length_of_lis nums =
  let bisect tails target =
    let rec go lo hi =
      if lo >= hi then lo
      else let mid = lo + (hi - lo) / 2 in
        if tails.(mid) < target then go (mid + 1) hi
        else go lo mid
    in go 0 (Array.length tails) in
  let tails = Array.make 0 0 in
  let len = ref 0 in
  List.iter (fun num ->
    let pos = bisect tails num in
    if pos = !len then (
      let t = Array.make (!len + 1) 0 in
      Array.blit tails 0 t 0 !len;
      t.(pos) <- num;
      incr len)
    else tails.(pos) <- num
  ) nums;
  !len`,

    Clojure: `(defn length-of-lis [nums]
  (count
    (reduce (fn [tails num]
      (let [pos (java.util.Collections/binarySearch (java.util.ArrayList. tails) num)]
        (let [p (if (neg? pos) (- (inc pos)) pos)]
          (if (= p (count tails))
            (conj tails num)
            (assoc tails p num)))))
      [] nums)))`,

    Lisp: `(defun length-of-lis (nums)
  (let ((tails (make-array 0 :adjustable t :fill-pointer 0)))
    (dolist (num nums)
      (let ((pos (bisect tails num 0 (length tails))))
        (if (= pos (length tails))
          (vector-push-extend num tails)
          (setf (aref tails pos) num))))
    (length tails)))

(defun bisect (tails target lo hi)
  (if (>= lo hi) lo
    (let ((mid (+ lo (floor (- hi lo) 2))))
      (if (< (aref tails mid) target)
        (bisect tails target (1+ mid) hi)
        (bisect tails target lo mid)))))`,
  },

  // ─── Problem 141: Minimum Height Trees (LC 310) ──────────────────────────────
  141: {
    TypeScript: `function findMinHeightTrees(n: number, edges: number[][]): number[] {
  if (n === 1) return [0];
  const adj = edges.reduce<Map<number, Set<number>>>((g, [u, v]) => {
    if (!g.has(u)) g.set(u, new Set());
    if (!g.has(v)) g.set(v, new Set());
    g.get(u)!.add(v); g.get(v)!.add(u);
    return g;
  }, new Map());
  const trim = (leaves: number[], remaining: number): number[] => {
    if (remaining <= 2) return leaves;
    const newLeaves = leaves.reduce<number[]>((acc, leaf) => {
      const neighbors = adj.get(leaf)!;
      neighbors.forEach(nb => {
        adj.get(nb)!.delete(leaf);
        if (adj.get(nb)!.size === 1) acc.push(nb);
      });
      return acc;
    }, []);
    return trim(newLeaves, remaining - leaves.length);
  };
  const initLeaves = [...adj.entries()].filter(([, s]) => s.size === 1).map(([k]) => k);
  return trim(initLeaves, n);
}`,

    Haskell: `import qualified Data.Map.Strict as Map
import qualified Data.Set as Set

findMinHeightTrees :: Int -> [(Int,Int)] -> [Int]
findMinHeightTrees 1 _ = [0]
findMinHeightTrees n edges =
  let adj = foldl (\\g (u,v) ->
        Map.insertWith Set.union u (Set.singleton v) $
        Map.insertWith Set.union v (Set.singleton u) g)
        Map.empty edges
      trim leaves remaining g
        | remaining <= 2 = leaves
        | otherwise =
          let (newLeaves, g') = foldl (\\(nl, g0) leaf ->
                let nbs = Set.toList (g0 Map.! leaf)
                    g1 = foldl (\\ga nb -> Map.adjust (Set.delete leaf) nb ga)
                         g0 nbs
                    nl' = filter (\\nb -> Set.size (g1 Map.! nb) == 1) nbs
                in (nl ++ nl', g1)) ([], g) leaves
          in trim newLeaves (remaining - length leaves) g'
      initLeaves = Map.keys (Map.filter (\\s -> Set.size s == 1) adj)
  in trim initLeaves n adj`,

    Elixir: `defmodule Solution do
  def find_min_height_trees(1, _), do: [0]
  def find_min_height_trees(n, edges) do
    adj = Enum.reduce(edges, %{}, fn [u, v], g ->
      g |> Map.update(u, MapSet.new([v]), &MapSet.put(&1, v))
        |> Map.update(v, MapSet.new([u]), &MapSet.put(&1, u))
    end)
    leaves = adj |> Enum.filter(fn {_, s} -> MapSet.size(s) == 1 end) |> Enum.map(&elem(&1, 0))
    trim(leaves, n, adj)
  end
  defp trim(leaves, remaining, _) when remaining <= 2, do: leaves
  defp trim(leaves, remaining, adj) do
    {new_leaves, adj} = Enum.reduce(leaves, {[], adj}, fn leaf, {nl, g} ->
      nbs = MapSet.to_list(g[leaf])
      g = Enum.reduce(nbs, g, fn nb, g2 -> Map.update!(g2, nb, &MapSet.delete(&1, leaf)) end)
      new_nl = Enum.filter(nbs, fn nb -> MapSet.size(g[nb]) == 1 end)
      {nl ++ new_nl, g}
    end)
    trim(new_leaves, remaining - length(leaves), adj)
  end
end`,

    Rust: `use std::collections::{HashSet, VecDeque};
fn find_min_height_trees(n: usize, edges: &[(usize, usize)]) -> Vec<usize> {
    if n == 1 { return vec![0]; }
    let mut adj: Vec<HashSet<usize>> = vec![HashSet::new(); n];
    for &(u, v) in edges { adj[u].insert(v); adj[v].insert(u); }
    let mut leaves: Vec<usize> = (0..n).filter(|&i| adj[i].len() == 1).collect();
    let mut remaining = n;
    while remaining > 2 {
        remaining -= leaves.len();
        let mut new_leaves = vec![];
        for &leaf in &leaves {
            let nbs: Vec<usize> = adj[leaf].iter().copied().collect();
            for nb in nbs { adj[nb].remove(&leaf);
                if adj[nb].len() == 1 { new_leaves.push(nb); }
            }
        }
        leaves = new_leaves;
    }
    leaves
}`,

    Scala: `def findMinHeightTrees(n: Int, edges: Array[Array[Int]]): List[Int] = {
  if (n == 1) return List(0)
  var adj = edges.foldLeft(Map.empty[Int, Set[Int]]) { case (g, Array(u, v)) =>
    g.updated(u, g.getOrElse(u, Set()) + v).updated(v, g.getOrElse(v, Set()) + u)
  }
  def trim(leaves: List[Int], rem: Int): List[Int] = {
    if (rem <= 2) leaves
    else {
      val (newLeaves, newAdj) = leaves.foldLeft((List.empty[Int], adj)) { case ((nl, g), leaf) =>
        val nbs = g(leaf)
        val g2 = nbs.foldLeft(g)((ga, nb) => ga.updated(nb, ga(nb) - leaf))
        val nl2 = nbs.filter(nb => g2(nb).size == 1).toList
        (nl ++ nl2, g2)
      }
      adj = newAdj
      trim(newLeaves, rem - leaves.length)
    }
  }
  trim(adj.filter(_._2.size == 1).keys.toList, n)
}`,

    OCaml: `let find_min_height_trees n edges =
  if n = 1 then [0]
  else
    let adj = Array.make n [] in
    List.iter (fun (u, v) ->
      adj.(u) <- v :: adj.(u);
      adj.(v) <- u :: adj.(v)) edges;
    let degree = Array.init n (fun i -> List.length adj.(i)) in
    let leaves = ref (List.init n Fun.id
      |> List.filter (fun i -> degree.(i) = 1)) in
    let remaining = ref n in
    while !remaining > 2 do
      remaining := !remaining - List.length !leaves;
      let new_leaves = ref [] in
      List.iter (fun leaf ->
        List.iter (fun nb ->
          degree.(nb) <- degree.(nb) - 1;
          if degree.(nb) = 1 then new_leaves := nb :: !new_leaves
        ) adj.(leaf)
      ) !leaves;
      leaves := !new_leaves
    done;
    !leaves`,

    Clojure: `(defn find-min-height-trees [n edges]
  (if (= n 1) [0]
    (let [adj (reduce (fn [g [u v]]
                (-> g (update u (fnil conj #{}) v)
                      (update v (fnil conj #{}) u)))
              {} edges)]
      (loop [adj adj
             leaves (vec (filter #(= 1 (count (adj %))) (keys adj)))
             rem n]
        (if (<= rem 2) leaves
          (let [[new-adj new-leaves]
                (reduce (fn [[g nl] leaf]
                  (reduce (fn [[g2 nl2] nb]
                    (let [g3 (update g2 nb disj leaf)]
                      (if (= 1 (count (g3 nb)))
                        [g3 (conj nl2 nb)] [g3 nl2])))
                    [g nl] (g leaf)))
                  [adj []] leaves)]
            (recur new-adj new-leaves (- rem (count leaves)))))))))`,

    Lisp: `(defun find-min-height-trees (n edges)
  (if (= n 1) (list 0)
    (let ((adj (make-array n :initial-element nil))
          (deg (make-array n :initial-element 0)))
      (dolist (e edges)
        (let ((u (car e)) (v (cadr e)))
          (push v (aref adj u)) (push u (aref adj v))
          (incf (aref deg u)) (incf (aref deg v))))
      (let ((leaves (loop for i below n when (= (aref deg i) 1) collect i))
            (remaining n))
        (loop while (> remaining 2) do
          (decf remaining (length leaves))
          (let ((new-leaves nil))
            (dolist (leaf leaves)
              (dolist (nb (aref adj leaf))
                (decf (aref deg nb))
                (when (= (aref deg nb) 1) (push nb new-leaves))))
            (setf leaves new-leaves)))
        leaves))))`,
  },

  // ─── Problem 142: Bus Routes (LC 815) ────────────────────────────────────────
  142: {
    TypeScript: `function numBusesToDestination(routes: number[][], source: number, target: number): number {
  if (source === target) return 0;
  const stopToRoutes = new Map<number, number[]>();
  routes.forEach((route, i) =>
    route.forEach(stop => {
      if (!stopToRoutes.has(stop)) stopToRoutes.set(stop, []);
      stopToRoutes.get(stop)!.push(i);
    }));
  const visited = new Set<number>();
  const visitedRoutes = new Set<number>();
  const bfs = (queue: number[][], buses: number): number => {
    if (queue.length === 0) return -1;
    const nextQueue: number[][] = [];
    for (const [stop] of queue) {
      if (stop === target) return buses;
      for (const ri of (stopToRoutes.get(stop) || [])) {
        if (visitedRoutes.has(ri)) continue;
        visitedRoutes.add(ri);
        for (const ns of routes[ri]) {
          if (!visited.has(ns)) { visited.add(ns); nextQueue.push([ns]); }
        }
      }
    }
    return bfs(nextQueue, buses + 1);
  };
  visited.add(source);
  return bfs([[source]], 0);
}`,

    Haskell: `import qualified Data.Map.Strict as Map
import qualified Data.Set as Set

numBusesToDest :: [[Int]] -> Int -> Int -> Int
numBusesToDest routes source target
  | source == target = 0
  | otherwise =
    let stopToRoutes = foldl (\\m (ri, stops) ->
          foldl (\\m2 s -> Map.insertWith (++) s [ri] m2) m stops)
          Map.empty (zip [0..] routes)
        bfs [] _ _ _ = -1
        bfs queue buses visited vRoutes =
          if any (== target) (map fst queue) then buses
          else
            let (nextQ, vis', vr') = foldl (\\(nq, v, vr) (stop, _) ->
                  let ris = filter (\\r -> not (Set.member r vr))
                            (Map.findWithDefault [] stop stopToRoutes)
                      vr2 = foldl (flip Set.insert) vr ris
                      newStops = concatMap (\\ri -> filter (\\s -> not (Set.member s v))
                                  (routes !! ri)) ris
                      v2 = foldl (flip Set.insert) v newStops
                  in (nq ++ map (\\s -> (s, ())) newStops, v2, vr2))
                  ([], visited, vRoutes) queue
            in bfs nextQ (buses + 1) vis' vr'
    in bfs [(source, ())] 0 (Set.singleton source) Set.empty`,

    Elixir: `defmodule Solution do
  def num_buses_to_destination(routes, source, target) do
    if source == target, do: 0, else: do_bfs(routes, source, target)
  end
  defp do_bfs(routes, source, target) do
    stop_map = routes |> Enum.with_index() |> Enum.reduce(%{}, fn {stops, ri}, m ->
      Enum.reduce(stops, m, fn s, m2 -> Map.update(m2, s, [ri], &[ri | &1]) end)
    end)
    bfs([source], 0, MapSet.new([source]), MapSet.new(), stop_map, routes, target)
  end
  defp bfs([], _, _, _, _, _, _), do: -1
  defp bfs(queue, buses, visited, v_routes, stop_map, routes, target) do
    if Enum.member?(queue, target), do: buses, else: (
      {next_q, visited, v_routes} = Enum.reduce(queue, {[], visited, v_routes},
        fn stop, {nq, vis, vr} ->
          ris = Map.get(stop_map, stop, []) |> Enum.reject(&MapSet.member?(vr, &1))
          vr = Enum.reduce(ris, vr, &MapSet.put(&2, &1))
          new_stops = Enum.flat_map(ris, fn ri -> Enum.at(routes, ri) end)
                      |> Enum.reject(&MapSet.member?(vis, &1))
          vis = Enum.reduce(new_stops, vis, &MapSet.put(&2, &1))
          {nq ++ new_stops, vis, vr}
        end)
      bfs(next_q, buses + 1, visited, v_routes, stop_map, routes, target)
    )
  end
end`,

    Rust: `use std::collections::{HashMap, HashSet, VecDeque};
fn num_buses_to_destination(routes: &[Vec<i32>], source: i32, target: i32) -> i32 {
    if source == target { return 0; }
    let mut stop_to_routes: HashMap<i32, Vec<usize>> = HashMap::new();
    for (ri, route) in routes.iter().enumerate() {
        for &s in route { stop_to_routes.entry(s).or_default().push(ri); }
    }
    let mut visited = HashSet::new();
    let mut v_routes = HashSet::new();
    visited.insert(source);
    let mut queue = VecDeque::new();
    queue.push_back(source);
    let mut buses = 0;
    while !queue.is_empty() {
        let size = queue.len();
        for _ in 0..size {
            let stop = queue.pop_front().unwrap();
            if stop == target { return buses; }
            for &ri in stop_to_routes.get(&stop).unwrap_or(&vec![]) {
                if v_routes.insert(ri) {
                    for &ns in &routes[ri] {
                        if visited.insert(ns) { queue.push_back(ns); }
                    }
                }
            }
        }
        buses += 1;
    }
    -1
}`,

    Scala: `def numBusesToDestination(routes: Array[Array[Int]], source: Int, target: Int): Int = {
  if (source == target) return 0
  val stopToRoutes = routes.zipWithIndex.foldLeft(Map.empty[Int, List[Int]]) {
    case (m, (stops, ri)) => stops.foldLeft(m) { (m2, s) =>
      m2.updated(s, ri :: m2.getOrElse(s, Nil))
    }
  }
  def bfs(queue: List[Int], buses: Int, visited: Set[Int], vr: Set[Int]): Int = queue match {
    case Nil => -1
    case _ if queue.contains(target) => buses
    case _ =>
      val (nextQ, vis2, vr2) = queue.foldLeft((List.empty[Int], visited, vr)) {
        case ((nq, v, r), stop) =>
          val ris = stopToRoutes.getOrElse(stop, Nil).filterNot(r.contains)
          val r2 = ris.foldLeft(r)(_ + _)
          val newStops = ris.flatMap(ri => routes(ri).toList).filterNot(v.contains)
          val v2 = newStops.foldLeft(v)(_ + _)
          (nq ++ newStops, v2, r2)
      }
      bfs(nextQ, buses + 1, vis2, vr2)
  }
  bfs(List(source), 0, Set(source), Set.empty)
}`,

    OCaml: `let num_buses_to_destination routes source target =
  if source = target then 0
  else
    let stop_map = Hashtbl.create 100 in
    List.iteri (fun ri route ->
      List.iter (fun s ->
        let cur = try Hashtbl.find stop_map s with Not_found -> [] in
        Hashtbl.replace stop_map s (ri :: cur)) route) routes;
    let visited = Hashtbl.create 100 in
    let v_routes = Hashtbl.create 100 in
    Hashtbl.replace visited source true;
    let rec bfs queue buses =
      if queue = [] then -1
      else if List.mem target queue then buses
      else
        let next = List.fold_left (fun acc stop ->
          let ris = try Hashtbl.find stop_map stop with Not_found -> [] in
          List.fold_left (fun acc2 ri ->
            if Hashtbl.mem v_routes ri then acc2
            else begin
              Hashtbl.replace v_routes ri true;
              List.fold_left (fun acc3 ns ->
                if Hashtbl.mem visited ns then acc3
                else begin Hashtbl.replace visited ns true; ns :: acc3 end
              ) acc2 (List.nth routes ri)
            end) acc ris) [] queue
        in bfs next (buses + 1)
    in bfs [source] 0`,

    Clojure: `(defn num-buses-to-destination [routes source target]
  (if (= source target) 0
    (let [stop-map (reduce-kv (fn [m ri route]
                    (reduce (fn [m2 s] (update m2 s (fnil conj []) ri)) m route))
                    {} (vec routes))]
      (loop [queue [source] buses 0 visited #{source} vr #{}]
        (cond
          (empty? queue) -1
          (some #{target} queue) buses
          :else
          (let [[next vis vr]
                (reduce (fn [[nq v r] stop]
                  (let [ris (remove r (get stop-map stop []))
                        r (into r ris)
                        new-stops (remove v (mapcat #(nth routes %) ris))
                        v (into v new-stops)]
                    [(into nq new-stops) v r]))
                  [[] visited vr] queue)]
            (recur next (inc buses) vis vr)))))))`,

    Lisp: `(defun num-buses-to-destination (routes source target)
  (if (= source target) 0
    (let ((stop-map (make-hash-table))
          (visited (make-hash-table))
          (v-routes (make-hash-table)))
      (loop for ri from 0 for route in routes do
        (dolist (s route)
          (push ri (gethash s stop-map nil))))
      (setf (gethash source visited) t)
      (labels ((bfs (queue buses)
        (cond
          ((null queue) -1)
          ((member target queue) buses)
          (t (let ((next nil))
               (dolist (stop queue)
                 (dolist (ri (gethash stop stop-map nil))
                   (unless (gethash ri v-routes)
                     (setf (gethash ri v-routes) t)
                     (dolist (ns (nth ri routes))
                       (unless (gethash ns visited)
                         (setf (gethash ns visited) t)
                         (push ns next))))))
               (bfs next (1+ buses)))))))
        (bfs (list source) 0)))))`,
  },

  // ─── Problem 143: Coin Change (LC 322) ───────────────────────────────────────
  143: {
    TypeScript: `function coinChange(coins: number[], amount: number): number {
  const INF = amount + 1;
  const dp = Array.from({ length: amount + 1 }, (_, i) => i === 0 ? 0 : INF);
  const result = coins.reduce(
    (table, coin) => table.map((val, i) =>
      i >= coin ? Math.min(val, table[i - coin] + 1) : val),
    dp
  );
  return result[amount] >= INF ? -1 : result[amount];
}`,

    Haskell: `coinChange :: [Int] -> Int -> Int
coinChange coins amount =
  let inf = amount + 1
      dp = [if i == 0 then 0 else inf | i <- [0..amount]]
      update table coin =
        [if i >= coin then min (table !! i) (table !! (i - coin) + 1)
         else table !! i | i <- [0..amount]]
      result = foldl update dp coins
  in if result !! amount >= inf then -1 else result !! amount`,

    Elixir: `defmodule Solution do
  def coin_change(coins, amount) do
    inf = amount + 1
    dp = Enum.map(0..amount, fn 0 -> 0; _ -> inf end)
    result = Enum.reduce(coins, dp, fn coin, table ->
      Enum.map(Enum.with_index(table), fn {val, i} ->
        if i >= coin, do: min(val, Enum.at(table, i - coin) + 1), else: val
      end)
    end)
    r = Enum.at(result, amount)
    if r >= inf, do: -1, else: r
  end
end`,

    Rust: `fn coin_change(coins: &[i32], amount: usize) -> i32 {
    let inf = amount + 1;
    let dp: Vec<usize> = (0..=amount).map(|i| if i == 0 { 0 } else { inf }).collect();
    let result = coins.iter().fold(dp, |table, &coin| {
        (0..=amount).map(|i| {
            if i >= coin as usize { table[i].min(table[i - coin as usize] + 1) }
            else { table[i] }
        }).collect()
    });
    if result[amount] >= inf { -1 } else { result[amount] as i32 }
}`,

    Scala: `def coinChange(coins: Array[Int], amount: Int): Int = {
  val inf = amount + 1
  val dp = (0 to amount).map(i => if (i == 0) 0 else inf).toArray
  val result = coins.foldLeft(dp) { (table, coin) =>
    table.zipWithIndex.map { case (v, i) =>
      if (i >= coin) math.min(v, table(i - coin) + 1) else v
    }
  }
  if (result(amount) >= inf) -1 else result(amount)
}`,

    OCaml: `let coin_change coins amount =
  let inf = amount + 1 in
  let dp = Array.init (amount + 1) (fun i -> if i = 0 then 0 else inf) in
  List.iter (fun coin ->
    for i = coin to amount do
      dp.(i) <- min dp.(i) (dp.(i - coin) + 1)
    done
  ) coins;
  if dp.(amount) >= inf then -1 else dp.(amount)`,

    Clojure: `(defn coin-change [coins amount]
  (let [inf (inc amount)
        dp (vec (cons 0 (repeat amount inf)))
        result (reduce (fn [table coin]
                  (vec (map-indexed (fn [i v]
                    (if (>= i coin)
                      (min v (inc (table (- i coin))))
                      v)) table)))
                dp coins)]
    (if (>= (result amount) inf) -1 (result amount))))`,

    Lisp: `(defun coin-change (coins amount)
  (let* ((inf (1+ amount))
         (dp (make-array (1+ amount) :initial-element inf)))
    (setf (aref dp 0) 0)
    (dolist (coin coins)
      (loop for i from coin to amount do
        (setf (aref dp i) (min (aref dp i) (1+ (aref dp (- i coin)))))))
    (if (>= (aref dp amount) inf) -1 (aref dp amount))))`,
  },

  // ─── Problem 144: Number of Connected Components (LC 323) ────────────────────
  144: {
    TypeScript: `function countComponents(n: number, edges: number[][]): number {
  const parent = Array.from({ length: n }, (_, i) => i);
  const find = (x: number): number =>
    parent[x] === x ? x : (() => { parent[x] = find(parent[x]); return parent[x]; })();
  const union = (a: number, b: number): boolean => {
    const [ra, rb] = [find(a), find(b)];
    if (ra === rb) return false;
    parent[ra] = rb;
    return true;
  };
  return edges.reduce((count, [u, v]) => union(u, v) ? count - 1 : count, n);
}`,

    Haskell: `import Data.Map.Strict (Map)
import qualified Data.Map.Strict as Map

countComponents :: Int -> [(Int,Int)] -> Int
countComponents n edges =
  let parent = Map.fromList [(i, i) | i <- [0..n-1]]
      find p x = if Map.findWithDefault x x p == x then (x, p)
                 else let (root, p') = find p (p Map.! x)
                      in (root, Map.insert x root p')
      union (p, cnt) (a, b) =
        let (ra, p1) = find p a
            (rb, p2) = find p1 b
        in if ra == rb then (p2, cnt) else (Map.insert ra rb p2, cnt - 1)
  in snd (foldl union (parent, n) edges)`,

    Elixir: `defmodule Solution do
  def count_components(n, edges) do
    parent = Enum.into(0..n-1, %{}, fn i -> {i, i} end)
    {_parent, count} = Enum.reduce(edges, {parent, n}, fn [u, v], {p, cnt} ->
      {ru, p} = find(p, u)
      {rv, p} = find(p, v)
      if ru == rv, do: {p, cnt}, else: {Map.put(p, ru, rv), cnt - 1}
    end)
    count
  end
  defp find(p, x) do
    if p[x] == x, do: {x, p}, else: (
      {root, p} = find(p, p[x])
      {root, Map.put(p, x, root)}
    )
  end
end`,

    Rust: `fn count_components(n: usize, edges: &[(usize, usize)]) -> usize {
    let mut parent: Vec<usize> = (0..n).collect();
    fn find(parent: &mut Vec<usize>, x: usize) -> usize {
        if parent[x] != x { parent[x] = find(parent, parent[x]); }
        parent[x]
    }
    let mut count = n;
    for &(a, b) in edges {
        let (ra, rb) = (find(&mut parent, a), find(&mut parent, b));
        if ra != rb { parent[ra] = rb; count -= 1; }
    }
    count
}`,

    Scala: `def countComponents(n: Int, edges: Array[Array[Int]]): Int = {
  val parent = (0 until n).toArray
  def find(x: Int): Int = {
    if (parent(x) != x) parent(x) = find(parent(x))
    parent(x)
  }
  edges.foldLeft(n) { case (count, Array(a, b)) =>
    val (ra, rb) = (find(a), find(b))
    if (ra == rb) count else { parent(ra) = rb; count - 1 }
  }
}`,

    OCaml: `let count_components n edges =
  let parent = Array.init n Fun.id in
  let rec find x =
    if parent.(x) = x then x
    else begin parent.(x) <- find parent.(x); parent.(x) end in
  List.fold_left (fun count (a, b) ->
    let ra = find a and rb = find b in
    if ra = rb then count
    else begin parent.(ra) <- rb; count - 1 end
  ) n edges`,

    Clojure: `(defn count-components [n edges]
  (let [parent (atom (vec (range n)))
        find (fn find [x]
               (if (= (get @parent x) x) x
                 (let [root (find (get @parent x))]
                   (swap! parent assoc x root) root)))]
    (reduce (fn [cnt [a b]]
      (let [ra (find a) rb (find b)]
        (if (= ra rb) cnt
          (do (swap! parent assoc ra rb) (dec cnt)))))
      n edges)))`,

    Lisp: `(defun count-components (n edges)
  (let ((parent (make-array n)))
    (dotimes (i n) (setf (aref parent i) i))
    (labels ((find-root (x)
               (if (= (aref parent x) x) x
                 (progn (setf (aref parent x) (find-root (aref parent x)))
                        (aref parent x)))))
      (reduce (lambda (cnt edge)
        (let ((ra (find-root (car edge)))
              (rb (find-root (cadr edge))))
          (if (= ra rb) cnt
            (progn (setf (aref parent ra) rb) (1- cnt)))))
        edges :initial-value n))))`,
  },

  // ─── Problem 145: Odd Even Linked List (LC 328) ──────────────────────────────
  145: {
    TypeScript: `interface ListNode { val: number; next: ListNode | null; }
function oddEvenList(head: ListNode | null): ListNode | null {
  const collect = (node: ListNode | null, isOdd: boolean, odds: number[], evens: number[]): [number[], number[]] => {
    if (!node) return [odds, evens];
    return isOdd
      ? collect(node.next, false, [...odds, node.val], evens)
      : collect(node.next, true, odds, [...evens, node.val]);
  };
  const [odds, evens] = collect(head, true, [], []);
  const build = (vals: number[]): ListNode | null =>
    vals.reduceRight<ListNode | null>((next, val) => ({ val, next }), null);
  return build([...odds, ...evens]);
}`,

    Haskell: `data ListNode = ListNode Int (Maybe ListNode)

oddEvenList :: Maybe ListNode -> Maybe ListNode
oddEvenList Nothing = Nothing
oddEvenList head =
  let collect Nothing _ odds evens = (reverse odds, reverse evens)
      collect (Just (ListNode v next)) True odds evens =
        collect next False (v:odds) evens
      collect (Just (ListNode v next)) False odds evens =
        collect next True odds (v:evens)
      (odds, evens) = collect head True [] []
      build [] = Nothing
      build (v:vs) = Just (ListNode v (build vs))
  in build (odds ++ evens)`,

    Elixir: `defmodule Solution do
  def odd_even_list(head), do: do_collect(head, true, [], [])
  defp do_collect(nil, _, odds, evens) do
    build(Enum.reverse(odds) ++ Enum.reverse(evens))
  end
  defp do_collect(%{val: v, next: next}, true, odds, evens) do
    do_collect(next, false, [v | odds], evens)
  end
  defp do_collect(%{val: v, next: next}, false, odds, evens) do
    do_collect(next, true, odds, [v | evens])
  end
  defp build([]), do: nil
  defp build([v | rest]), do: %{val: v, next: build(rest)}
end`,

    Rust: `#[derive(Debug)]
struct ListNode { val: i32, next: Option<Box<ListNode>> }
fn odd_even_list(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
    fn collect(node: &Option<Box<ListNode>>, is_odd: bool,
               odds: &mut Vec<i32>, evens: &mut Vec<i32>) {
        if let Some(n) = node {
            if is_odd { odds.push(n.val); } else { evens.push(n.val); }
            collect(&n.next, !is_odd, odds, evens);
        }
    }
    fn build(vals: &[i32]) -> Option<Box<ListNode>> {
        vals.iter().rev().fold(None, |next, &v|
            Some(Box::new(ListNode { val: v, next })))
    }
    let (mut odds, mut evens) = (vec![], vec![]);
    collect(&head, true, &mut odds, &mut evens);
    odds.extend(evens);
    build(&odds)
}`,

    Scala: `case class ListNode(v: Int, next: Option[ListNode] = None)
def oddEvenList(head: Option[ListNode]): Option[ListNode] = {
  def collect(node: Option[ListNode], isOdd: Boolean,
              odds: List[Int], evens: List[Int]): (List[Int], List[Int]) = node match {
    case None => (odds.reverse, evens.reverse)
    case Some(n) if isOdd  => collect(n.next, false, n.v :: odds, evens)
    case Some(n)           => collect(n.next, true, odds, n.v :: evens)
  }
  val (odds, evens) = collect(head, isOdd = true, Nil, Nil)
  (odds ++ evens).foldRight(Option.empty[ListNode])((v, acc) => Some(ListNode(v, acc)))
}`,

    OCaml: `type list_node = { value: int; next: list_node option }

let odd_even_list head =
  let rec collect node is_odd odds evens = match node with
    | None -> (List.rev odds, List.rev evens)
    | Some n ->
      if is_odd then collect n.next false (n.value :: odds) evens
      else collect n.next true odds (n.value :: evens)
  in
  let (odds, evens) = collect head true [] [] in
  List.fold_right (fun v acc -> Some { value = v; next = acc })
    (odds @ evens) None`,

    Clojure: `(defn odd-even-list [head]
  (loop [node head is-odd true odds [] evens []]
    (if (nil? node) 
      (let [vals (concat odds evens)]
        (reduce (fn [acc v] {:val v :next acc}) nil (reverse vals)))
      (if is-odd
        (recur (:next node) false (conj odds (:val node)) evens)
        (recur (:next node) true odds (conj evens (:val node)))))))`,

    Lisp: `(defstruct lnode val next)

(defun odd-even-list (head)
  (labels ((collect (node is-odd odds evens)
    (if (null node) (values (nreverse odds) (nreverse evens))
      (if is-odd
        (collect (lnode-next node) nil (cons (lnode-val node) odds) evens)
        (collect (lnode-next node) t odds (cons (lnode-val node) evens)))))
           (build (vals)
    (reduce (lambda (acc v) (make-lnode :val v :next acc))
            vals :initial-value nil :from-end t)))
    (multiple-value-bind (odds evens) (collect head t nil nil)
      (build (append odds evens)))))`,
  },

  // ─── Problem 146: Longest Increasing Path in a Matrix (LC 329) ───────────────
  146: {
    TypeScript: `function longestIncreasingPath(matrix: number[][]): number {
  const rows = matrix.length;
  const cols = matrix[0]?.length ?? 0;
  const memo = new Map<string, number>();
  const dirs = [[0,1],[0,-1],[1,0],[-1,0]];
  const dfs = (r: number, c: number): number => {
    const key = r + "," + c;
    if (memo.has(key)) return memo.get(key)!;
    const best = dirs.reduce((mx, [dr, dc]) => {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && matrix[nr][nc] > matrix[r][c])
        return Math.max(mx, dfs(nr, nc));
      return mx;
    }, 0);
    memo.set(key, best + 1);
    return best + 1;
  };
  return matrix.reduce((mx, row, r) =>
    row.reduce((mx2, _, c) => Math.max(mx2, dfs(r, c)), mx), 0);
}`,

    Haskell: `import qualified Data.Map.Strict as Map
import Data.Array

longestIncreasingPath :: [[Int]] -> Int
longestIncreasingPath mat = maximum $ Map.elems memo
  where
    rows = length mat; cols = length (head mat)
    arr = listArray ((0,0),(rows-1,cols-1)) [mat !! r !! c | r <- [0..rows-1], c <- [0..cols-1]]
    memo = Map.fromList [((r,c), dfs r c) | r <- [0..rows-1], c <- [0..cols-1]]
    dfs r c = 1 + maximum (0 : [memo Map.! (nr,nc) |
      (dr,dc) <- [(0,1),(0,-1),(1,0),(-1,0)],
      let nr = r+dr; nc = c+dc,
      nr >= 0, nr < rows, nc >= 0, nc < cols,
      arr ! (nr,nc) > arr ! (r,c)])`,

    Elixir: `defmodule LIP do
  def longest_increasing_path(matrix) do
    rows = length(matrix); cols = length(hd(matrix))
    grid = for {row, r} <- Enum.with_index(matrix), {val, c} <- Enum.with_index(row),
               into: %{}, do: {{r, c}, val}
    {memo, _} = Enum.reduce(for(r <- 0..rows-1, c <- 0..cols-1, do: {r,c}), {%{}, grid},
      fn pos, {memo, g} -> dfs(pos, g, memo, rows, cols) end)
    memo |> Map.values() |> Enum.max()
  end
  defp dfs({r,c}, grid, memo, rows, cols) do
    if Map.has_key?(memo, {r,c}), do: {memo, grid},
    else: (
      val = grid[{r,c}]
      {memo2, best} = Enum.reduce([{0,1},{0,-1},{1,0},{-1,0}], {memo, 0},
        fn {dr,dc}, {m, mx} ->
          nr = r+dr; nc = c+dc
          if nr >= 0 and nr < rows and nc >= 0 and nc < cols and grid[{nr,nc}] > val do
            {m2, _} = dfs({nr,nc}, grid, m, rows, cols)
            {m2, max(mx, m2[{nr,nc}])}
          else {m, mx} end
        end)
      {Map.put(memo2, {r,c}, best + 1), grid}
    )
  end
end`,

    Rust: `use std::collections::HashMap;
fn longest_increasing_path(matrix: &Vec<Vec<i32>>) -> i32 {
    let (rows, cols) = (matrix.len(), matrix[0].len());
    let mut memo = HashMap::new();
    fn dfs(r: usize, c: usize, matrix: &Vec<Vec<i32>>, memo: &mut HashMap<(usize,usize),i32>,
           rows: usize, cols: usize) -> i32 {
        if let Some(&v) = memo.get(&(r,c)) { return v; }
        let best = [(0i32,1i32),(0,-1),(1,0),(-1,0)].iter().fold(0, |mx, &(dr,dc)| {
            let (nr, nc) = (r as i32 + dr, c as i32 + dc);
            if nr >= 0 && nr < rows as i32 && nc >= 0 && nc < cols as i32
               && matrix[nr as usize][nc as usize] > matrix[r][c] {
                mx.max(dfs(nr as usize, nc as usize, matrix, memo, rows, cols))
            } else { mx }
        });
        memo.insert((r,c), best + 1);
        best + 1
    }
    (0..rows).flat_map(|r| (0..cols).map(move |c| (r,c)))
        .fold(0, |mx, (r,c)| mx.max(dfs(r, c, &matrix, &mut memo, rows, cols)))
}`,

    Scala: `def longestIncreasingPath(matrix: Array[Array[Int]]): Int = {
  val (rows, cols) = (matrix.length, matrix(0).length)
  val memo = scala.collection.mutable.Map[(Int,Int), Int]()
  def dfs(r: Int, c: Int): Int = memo.getOrElseUpdate((r,c), {
    val dirs = List((0,1),(0,-1),(1,0),(-1,0))
    1 + dirs.foldLeft(0) { case (mx, (dr,dc)) =>
      val (nr, nc) = (r+dr, c+dc)
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && matrix(nr)(nc) > matrix(r)(c))
        mx.max(dfs(nr, nc))
      else mx
    }
  })
  (for (r <- 0 until rows; c <- 0 until cols) yield dfs(r,c)).max
}`,

    OCaml: `let longest_increasing_path matrix =
  let rows = Array.length matrix in
  let cols = Array.length matrix.(0) in
  let memo = Hashtbl.create (rows * cols) in
  let dirs = [(0,1);(0,-1);(1,0);(-1,0)] in
  let rec dfs r c =
    match Hashtbl.find_opt memo (r,c) with
    | Some v -> v
    | None ->
      let best = List.fold_left (fun mx (dr,dc) ->
        let nr = r+dr and nc = c+dc in
        if nr >= 0 && nr < rows && nc >= 0 && nc < cols
           && matrix.(nr).(nc) > matrix.(r).(c)
        then max mx (dfs nr nc) else mx) 0 dirs in
      Hashtbl.add memo (r,c) (best+1); best+1
  in
  let result = ref 0 in
  for r = 0 to rows-1 do for c = 0 to cols-1 do
    result := max !result (dfs r c) done done; !result`,

    Clojure: `(defn longest-increasing-path [matrix]
  (let [rows (count matrix) cols (count (first matrix))
        grid (into {} (for [r (range rows) c (range cols)]
               [[r c] (get-in matrix [r c])]))
        memo (atom {})]
    (letfn [(dfs [r c]
              (or (@memo [r c])
                (let [v (grid [r c])
                      best (reduce (fn [mx [dr dc]]
                              (let [nr (+ r dr) nc (+ c dc)]
                                (if (and (>= nr 0) (< nr rows) (>= nc 0) (< nc cols)
                                         (> (grid [nr nc]) v))
                                  (max mx (dfs nr nc)) mx)))
                            0 [[0 1] [0 -1] [1 0] [-1 0]])]
                  (swap! memo assoc [r c] (inc best))
                  (inc best))))]
      (reduce max 0 (for [r (range rows) c (range cols)] (dfs r c))))))`,

    Lisp: `(defun longest-increasing-path (matrix)
  (let* ((rows (length matrix)) (cols (length (car matrix)))
         (memo (make-hash-table :test 'equal))
         (dirs '((0 1)(0 -1)(1 0)(-1 0))))
    (labels ((grid (r c) (nth c (nth r matrix)))
             (dfs (r c)
               (or (gethash (list r c) memo)
                 (let ((best (reduce (lambda (mx d)
                               (let ((nr (+ r (first d))) (nc (+ c (second d))))
                                 (if (and (>= nr 0) (< nr rows) (>= nc 0) (< nc cols)
                                          (> (grid nr nc) (grid r c)))
                                   (max mx (dfs nr nc)) mx)))
                             dirs :initial-value 0)))
                   (setf (gethash (list r c) memo) (1+ best))
                   (1+ best)))))
      (reduce #'max (loop for r below rows append
        (loop for c below cols collect (dfs r c)))))))`,
  },

  // ─── Problem 147: Maximum Profit in Job Scheduling (LC 1235) ─────────────────
  147: {
    TypeScript: `function jobScheduling(startTime: number[], endTime: number[], profit: number[]): number {
  const jobs = startTime.map((s, i) => [s, endTime[i], profit[i]])
    .sort((a, b) => a[1] - b[1]);
  const n = jobs.length;
  const dp = new Array(n + 1).fill(0);
  const ends = jobs.map(j => j[1]);
  const bisect = (val: number, hi: number): number => {
    let lo = 0;
    while (lo < hi) { const mid = (lo + hi + 1) >> 1; ends[mid - 1] <= val ? lo = mid : hi = mid - 1; }
    return lo;
  };
  for (let i = 1; i <= n; i++) {
    const prev = bisect(jobs[i-1][0], i - 1);
    dp[i] = Math.max(dp[i-1], dp[prev] + jobs[i-1][2]);
  }
  return dp[n];
}`,

    Haskell: `import Data.List (sortBy)
import Data.Ord (comparing)

jobScheduling :: [(Int,Int,Int)] -> Int
jobScheduling jobs =
  let sorted = sortBy (comparing (\\(_,e,_) -> e)) jobs
      ends = map (\\(_,e,_) -> e) sorted
      bisect val hi
        | hi <= 0 = 0
        | ends !! (hi-1) <= val = hi
        | otherwise = bisect val (hi-1)
      go [] _ prev = prev
      go ((s,_,p):rest) i prevs =
        let k = bisect s i
            best = max (last prevs) ((prevs !! k) + p)
        in go rest (i+1) (prevs ++ [best])
  in last (go sorted 0 [0])`,

    Elixir: `defmodule JobScheduling do
  def max_profit(start_time, end_time, profit) do
    jobs = Enum.zip([start_time, end_time, profit])
      |> Enum.map(&Tuple.to_list/1) |> Enum.sort_by(&Enum.at(&1, 1))
    jobs |> Enum.with_index(1) |> Enum.reduce(%{0 => 0}, fn {[s, _e, p], i}, dp ->
      prev = bisect(jobs, s, i - 1)
      Map.put(dp, i, max(dp[i - 1], dp[prev] + p))
    end) |> Map.get(length(jobs))
  end
  defp bisect(_, _, 0), do: 0
  defp bisect(jobs, val, hi) do
    if Enum.at(jobs, hi - 1) |> Enum.at(1) <= val, do: hi,
    else: bisect(jobs, val, hi - 1)
  end
end`,

    Rust: `fn job_scheduling(start: &[i32], end_t: &[i32], profit: &[i32]) -> i32 {
    let mut jobs: Vec<(i32,i32,i32)> = start.iter().zip(end_t).zip(profit)
        .map(|((&s,&e),&p)| (s,e,p)).collect();
    jobs.sort_by_key(|&(_,e,_)| e);
    let n = jobs.len();
    let ends: Vec<i32> = jobs.iter().map(|&(_,e,_)| e).collect();
    let bisect = |val: i32, hi: usize| -> usize {
        match ends[..hi].iter().rposition(|&e| e <= val) {
            Some(i) => i + 1, None => 0
        }
    };
    (1..=n).fold(vec![0i32; n+1], |mut dp, i| {
        let prev = bisect(jobs[i-1].0, i-1);
        dp[i] = dp[i-1].max(dp[prev] + jobs[i-1].2);
        dp
    })[n]
}`,

    Scala: `def jobScheduling(startTime: Array[Int], endTime: Array[Int], profit: Array[Int]): Int = {
  val jobs = startTime.zip(endTime).zip(profit).map{case ((s,e),p) => (s,e,p)}.sortBy(_._2)
  val n = jobs.length
  val ends = jobs.map(_._2)
  def bisect(v: Int, hi: Int): Int =
    ends.take(hi).lastIndexWhere(_ <= v) match { case -1 => 0; case i => i + 1 }
  (1 to n).foldLeft(Array.fill(n+1)(0)) { (dp, i) =>
    val prev = bisect(jobs(i-1)._1, i-1)
    dp(i) = dp(i-1).max(dp(prev) + jobs(i-1)._3); dp
  }(n)
}`,

    OCaml: `let job_scheduling starts ends profits =
  let jobs = List.map2 (fun (s,e) p -> (s,e,p))
    (List.combine starts ends) profits
    |> List.sort (fun (_,e1,_) (_,e2,_) -> compare e1 e2) in
  let arr = Array.of_list jobs in
  let n = Array.length arr in
  let dp = Array.make (n+1) 0 in
  let bisect v hi =
    let rec go i = if i < 0 then 0
      else let (_,e,_) = arr.(i) in
        if e <= v then i+1 else go (i-1) in go (hi-1) in
  for i = 1 to n do
    let (s,_,p) = arr.(i-1) in
    let prev = bisect s (i-1) in
    dp.(i) <- max dp.(i-1) (dp.(prev) + p)
  done; dp.(n)`,

    Clojure: `(defn job-scheduling [start-time end-time profit]
  (let [jobs (sort-by second (map vector start-time end-time profit))
        n (count jobs)
        bisect (fn [v hi]
                 (loop [i (dec hi)]
                   (cond (< i 0) 0
                         (<= (second (nth jobs i)) v) (inc i)
                         :else (recur (dec i)))))]
    (nth (reduce (fn [dp i]
            (let [[s _ p] (nth jobs (dec i))
                  prev (bisect s (dec i))]
              (conj dp (max (nth dp (dec i)) (+ (nth dp prev) p)))))
          [0] (range 1 (inc n))) n)))`,

    Lisp: `(defun job-scheduling (starts ends profits)
  (let* ((jobs (sort (mapcar #'list starts ends profits) #'< :key #'second))
         (n (length jobs))
         (dp (make-array (1+ n) :initial-element 0)))
    (labels ((bisect (v hi)
               (loop for i from (1- hi) downto 0
                     when (<= (second (nth i jobs)) v) return (1+ i)
                     finally (return 0))))
      (loop for i from 1 to n do
        (let* ((job (nth (1- i) jobs))
               (prev (bisect (first job) (1- i))))
          (setf (aref dp i) (max (aref dp (1- i)) (+ (aref dp prev) (third job))))))
      (aref dp n))))`,
  },

  // ─── Problem 148: Palindrome Pairs (LC 336) ─────────────────────────────────
  148: {
    TypeScript: `function palindromePairs(words: string[]): number[][] {
  const isPalin = (s: string): boolean => s === [...s].reverse().join('');
  const map = new Map(words.map((w, i) => [w, i]));
  return words.reduce<number[][]>((acc, word, i) => {
    for (let j = 0; j <= word.length; j++) {
      const left = word.slice(0, j), right = word.slice(j);
      if (isPalin(right)) {
        const rev = [...left].reverse().join('');
        if (map.has(rev) && map.get(rev) !== i) acc.push([i, map.get(rev)!]);
      }
      if (j > 0 && isPalin(left)) {
        const rev = [...right].reverse().join('');
        if (map.has(rev) && map.get(rev) !== i) acc.push([map.get(rev)!, i]);
      }
    }
    return acc;
  }, []);
}`,

    Haskell: `import qualified Data.Map.Strict as Map

palindromePairs :: [String] -> [[Int]]
palindromePairs words =
  let mp = Map.fromList (zip words [0..])
      isPalin s = s == reverse s
      check (w, i) = concatMap (\\j ->
        let (l, r) = splitAt j w
            revL = reverse l; revR = reverse r
            a = if isPalin r then case Map.lookup revL mp of
                  Just k | k /= i -> [[i, k]]; _ -> []
                else []
            b = if j > 0 && isPalin l then case Map.lookup revR mp of
                  Just k | k /= i -> [[k, i]]; _ -> []
                else []
        in a ++ b) [0..length w]
  in concatMap check (zip words [0..])`,

    Elixir: `defmodule PalindromePairs do
  def solve(words) do
    map = words |> Enum.with_index() |> Map.new()
    is_palin = fn s -> s == String.reverse(s) end
    Enum.with_index(words) |> Enum.flat_map(fn {word, i} ->
      for j <- 0..String.length(word),
          left = String.slice(word, 0, j),
          right = String.slice(word, j, String.length(word)),
          pair <- (
            a = if is_palin.(right), do:
              (case Map.get(map, String.reverse(left)) do
                k when k != nil and k != i -> [[i, k]]; _ -> [] end), else: []
            b = if j > 0 and is_palin.(left), do:
              (case Map.get(map, String.reverse(right)) do
                k when k != nil and k != i -> [[k, i]]; _ -> [] end), else: []
            a ++ b
          ), do: pair
    end)
  end
end`,

    Rust: `fn palindrome_pairs(words: &[String]) -> Vec<[usize;2]> {
    use std::collections::HashMap;
    let is_palin = |s: &str| s.chars().eq(s.chars().rev());
    let map: HashMap<&str, usize> = words.iter().enumerate().map(|(i,w)| (w.as_str(),i)).collect();
    words.iter().enumerate().flat_map(|(i, w)| {
        (0..=w.len()).flat_map(move |j| {
            let (left, right) = w.split_at(j);
            let rev_l: String = left.chars().rev().collect();
            let rev_r: String = right.chars().rev().collect();
            let mut res = vec![];
            if is_palin(right) { if let Some(&k) = map.get(rev_l.as_str()) {
                if k != i { res.push([i, k]); }
            }}
            if j > 0 && is_palin(left) { if let Some(&k) = map.get(rev_r.as_str()) {
                if k != i { res.push([k, i]); }
            }}
            res
        }).collect::<Vec<_>>()
    }).collect()
}`,

    Scala: `def palindromePairs(words: Array[String]): List[List[Int]] = {
  val map = words.zipWithIndex.toMap
  def isPalin(s: String): Boolean = s == s.reverse
  words.zipWithIndex.flatMap { case (w, i) =>
    (0 to w.length).flatMap { j =>
      val (left, right) = w.splitAt(j)
      val a = if (isPalin(right)) map.get(left.reverse).filter(_ != i).map(k => List(i, k)).toList
              else Nil
      val b = if (j > 0 && isPalin(left)) map.get(right.reverse).filter(_ != i).map(k => List(k, i)).toList
              else Nil
      a ++ b
    }
  }.toList
}`,

    OCaml: `let palindrome_pairs words =
  let is_palin s =
    let n = String.length s in
    let rec check i = i >= n - 1 - i || (s.[i] = s.[n-1-i] && check (i+1)) in check 0 in
  let rev_str s = String.init (String.length s) (fun i -> s.[String.length s - 1 - i]) in
  let tbl = Hashtbl.create 16 in
  List.iteri (fun i w -> Hashtbl.replace tbl w i) words;
  List.concat (List.mapi (fun i w ->
    List.concat (List.init (String.length w + 1) (fun j ->
      let left = String.sub w 0 j and right = String.sub w j (String.length w - j) in
      let a = if is_palin right then match Hashtbl.find_opt tbl (rev_str left) with
        | Some k when k <> i -> [[i;k]] | _ -> [] else [] in
      let b = if j > 0 && is_palin left then match Hashtbl.find_opt tbl (rev_str right) with
        | Some k when k <> i -> [[k;i]] | _ -> [] else [] in
      a @ b))) words)`,

    Clojure: `(defn palindrome-pairs [words]
  (let [mp (into {} (map-indexed (fn [i w] [w i]) words))
        palin? (fn [s] (= s (apply str (reverse s))))]
    (mapcat (fn [[word i]]
      (mapcat (fn [j]
        (let [left (subs word 0 j) right (subs word j)
              rev-l (apply str (reverse left))
              rev-r (apply str (reverse right))
              a (when (and (palin? right) (contains? mp rev-l) (not= (mp rev-l) i))
                  [[i (mp rev-l)]])
              b (when (and (pos? j) (palin? left) (contains? mp rev-r) (not= (mp rev-r) i))
                  [[(mp rev-r) i]])]
          (concat a b)))
        (range (inc (count word)))))
      (map-indexed (fn [i w] [w i]) words))))`,

    Lisp: `(defun palindrome-pairs (words)
  (let ((mp (make-hash-table :test 'equal)))
    (loop for w in words for i from 0 do (setf (gethash w mp) i))
    (labels ((palin-p (s) (string= s (reverse s)))
             (rev-s (s) (reverse s)))
      (loop for w in words for i from 0 append
        (loop for j from 0 to (length w) append
          (let* ((left (subseq w 0 j)) (right (subseq w j))
                 (a (when (and (palin-p right) (gethash (rev-s left) mp)
                               (/= (gethash (rev-s left) mp) i))
                      (list (list i (gethash (rev-s left) mp)))))
                 (b (when (and (> j 0) (palin-p left) (gethash (rev-s right) mp)
                               (/= (gethash (rev-s right) mp) i))
                      (list (list (gethash (rev-s right) mp) i)))))
            (append a b)))))))`,
  },

  // ─── Problem 149: Counting Bits (LC 338) ────────────────────────────────────
  149: {
    TypeScript: `function countBits(n: number): number[] {
  return Array.from({ length: n + 1 }, (_, i) => i).reduce<number[]>(
    (dp, i) => [...dp, i === 0 ? 0 : dp[i >> 1] + (i & 1)], []);
}`,

    Haskell: `countBits :: Int -> [Int]
countBits n = foldl (\\dp i ->
  dp ++ [if i == 0 then 0 else (dp !! (i \`div\` 2)) + (i \`mod\` 2)]
  ) [] [0..n]`,

    Elixir: `defmodule CountBits do
  def count_bits(n) do
    Enum.reduce(0..n, %{}, fn i, dp ->
      Map.put(dp, i, if(i == 0, do: 0, else: dp[div(i, 2)] + rem(i, 2)))
    end) |> Enum.sort() |> Enum.map(&elem(&1, 1))
  end
end`,

    Rust: `fn count_bits(n: usize) -> Vec<i32> {
    (0..=n).fold(Vec::new(), |mut dp, i| {
        let val = if i == 0 { 0 } else { dp[i >> 1] + (i as i32 & 1) };
        dp.push(val); dp
    })
}`,

    Scala: `def countBits(n: Int): Array[Int] =
  (0 to n).foldLeft(Array.empty[Int]) { (dp, i) =>
    dp :+ (if (i == 0) 0 else dp(i >> 1) + (i & 1))
  }`,

    OCaml: `let count_bits n =
  let dp = Array.make (n + 1) 0 in
  List.iter (fun i ->
    dp.(i) <- dp.(i lsr 1) + (i land 1)
  ) (List.init (n + 1) Fun.id);
  Array.to_list dp`,

    Clojure: `(defn count-bits [n]
  (reduce (fn [dp i]
    (conj dp (if (zero? i) 0 (+ (nth dp (bit-shift-right i 1)) (bit-and i 1)))))
    [] (range (inc n))))`,

    Lisp: `(defun count-bits (n)
  (let ((dp (make-array (1+ n) :initial-element 0)))
    (loop for i from 1 to n do
      (setf (aref dp i) (+ (aref dp (ash i -1)) (logand i 1))))
    (coerce dp 'list)))`,
  },

  // ─── Problem 150: Design Hit Counter (LC 362) ───────────────────────────────
  150: {
    TypeScript: `class HitCounter {
  private hits: number[] = [];
  hit(timestamp: number): void { this.hits = [...this.hits, timestamp]; }
  getHits(timestamp: number): number {
    this.hits = this.hits.filter(t => t > timestamp - 300);
    return this.hits.length;
  }
}`,

    Haskell: `type HitCounter = [Int]

hit :: HitCounter -> Int -> HitCounter
hit hc ts = hc ++ [ts]

getHits :: HitCounter -> Int -> (Int, HitCounter)
getHits hc ts =
  let filtered = filter (> ts - 300) hc
  in (length filtered, filtered)`,

    Elixir: `defmodule HitCounter do
  def new_counter(), do: []
  def hit(counter, timestamp), do: counter ++ [timestamp]
  def get_hits(counter, timestamp) do
    filtered = Enum.filter(counter, &(&1 > timestamp - 300))
    {length(filtered), filtered}
  end
end`,

    Rust: `struct HitCounter { hits: Vec<i32> }
impl HitCounter {
    fn new() -> Self { HitCounter { hits: vec![] } }
    fn hit(&self, timestamp: i32) -> Self {
        let mut h = self.hits.clone(); h.push(timestamp);
        HitCounter { hits: h }
    }
    fn get_hits(&self, timestamp: i32) -> (i32, Self) {
        let filtered: Vec<i32> = self.hits.iter()
            .filter(|&&t| t > timestamp - 300).cloned().collect();
        (filtered.len() as i32, HitCounter { hits: filtered })
    }
}`,

    Scala: `case class HitCounter(hits: List[Int] = Nil) {
  def hit(timestamp: Int): HitCounter = HitCounter(hits :+ timestamp)
  def getHits(timestamp: Int): (Int, HitCounter) = {
    val filtered = hits.filter(_ > timestamp - 300)
    (filtered.length, HitCounter(filtered))
  }
}`,

    OCaml: `type hit_counter = int list

let hit hc ts = hc @ [ts]

let get_hits hc ts =
  let filtered = List.filter (fun t -> t > ts - 300) hc in
  (List.length filtered, filtered)`,

    Clojure: `(defn new-counter [] [])
(defn hit [counter timestamp] (conj counter timestamp))
(defn get-hits [counter timestamp]
  (let [filtered (filter #(> % (- timestamp 300)) counter)]
    [(count filtered) (vec filtered)]))`,

    Lisp: `(defun make-hit-counter () nil)
(defun hc-hit (counter timestamp) (append counter (list timestamp)))
(defun hc-get-hits (counter timestamp)
  (let ((filtered (remove-if-not (lambda (t) (> t (- timestamp 300))) counter)))
    (values (length filtered) filtered)))`,
  },

  // ─── Problem 151: Backspace String Compare (LC 844) ─────────────────────────
  151: {
    TypeScript: `function backspaceCompare(s: string, t: string): boolean {
  const build = (str: string): string =>
    [...str].reduce((acc, ch) => ch === '#' ? acc.slice(0, -1) : acc + ch, '');
  return build(s) === build(t);
}`,

    Haskell: `backspaceCompare :: String -> String -> Bool
backspaceCompare s t = build s == build t
  where build = foldl (\\acc ch -> if ch == '#' then init' acc else acc ++ [ch]) ""
        init' [] = []
        init' xs = init xs`,

    Elixir: `defmodule BackspaceCompare do
  def compare(s, t), do: build(s) == build(t)
  defp build(str) do
    String.graphemes(str) |> Enum.reduce("", fn
      "#", acc -> String.slice(acc, 0, max(0, String.length(acc) - 1))
      ch, acc -> acc <> ch
    end)
  end
end`,

    Rust: `fn backspace_compare(s: &str, t: &str) -> bool {
    let build = |input: &str| -> String {
        input.chars().fold(String::new(), |mut acc, ch| {
            if ch == '#' { acc.pop(); } else { acc.push(ch); }
            acc
        })
    };
    build(s) == build(t)
}`,

    Scala: `def backspaceCompare(s: String, t: String): Boolean = {
  def build(str: String): String =
    str.foldLeft("") { (acc, ch) =>
      if (ch == '#') acc.dropRight(1) else acc + ch
    }
  build(s) == build(t)
}`,

    OCaml: `let backspace_compare s t =
  let build str =
    String.fold_left (fun acc ch ->
      if ch = '#' then
        if String.length acc > 0 then String.sub acc 0 (String.length acc - 1) else acc
      else acc ^ String.make 1 ch) "" str in
  build s = build t`,

    Clojure: `(defn backspace-compare [s t]
  (let [build (fn [s]
                (reduce (fn [acc ch]
                  (if (= ch \\#) (if (empty? acc) acc (subs acc 0 (dec (count acc))))
                    (str acc ch)))
                  "" s))]
    (= (build s) (build t))))`,

    Lisp: `(defun backspace-compare (s1 s2)
  (labels ((build (str)
    (reduce (lambda (acc ch)
      (if (char= ch #\\#) (if (> (length acc) 0) (subseq acc 0 (1- (length acc))) acc)
        (concatenate 'string acc (string ch))))
      str :initial-value "")))
    (string= (build s1) (build s2))))`,
  },

  // ─── Problem 152: Combination Sum IV (LC 377) ──────────────────────────────
  152: {
    TypeScript: `function combinationSum4(nums: number[], target: number): number {
  const dp = new Array(target + 1).fill(0);
  dp[0] = 1;
  return Array.from({ length: target }, (_, i) => i + 1).reduce((dp, i) => {
    dp[i] = nums.reduce((sum, n) => sum + (i >= n ? dp[i - n] : 0), 0);
    return dp;
  }, dp)[target];
}`,

    Haskell: `combinationSum4 :: [Int] -> Int -> Int
combinationSum4 nums target =
  let dp = foldl (\\dp i ->
        dp ++ [sum [dp !! (i - n) | n <- nums, n <= i]]
      ) [1] [1..target]
  in dp !! target`,

    Elixir: `defmodule CombSum4 do
  def solve(nums, target) do
    dp = Enum.reduce(1..target, %{0 => 1}, fn i, dp ->
      val = Enum.reduce(nums, 0, fn n, sum ->
        if n <= i, do: sum + Map.get(dp, i - n, 0), else: sum
      end)
      Map.put(dp, i, val)
    end)
    Map.get(dp, target, 0)
  end
end`,

    Rust: `fn combination_sum4(nums: &[i32], target: i32) -> i32 {
    (1..=target as usize).fold(vec![1i32].into_iter()
        .chain(std::iter::repeat(0)).take(target as usize + 1)
        .collect::<Vec<_>>(), |mut dp, i| {
        dp[i] = nums.iter().filter(|&&n| n as usize <= i)
            .map(|&n| dp[i - n as usize]).sum();
        dp
    })[target as usize]
}`,

    Scala: `def combinationSum4(nums: Array[Int], target: Int): Int =
  (1 to target).foldLeft(Array.fill(target + 1)(0).updated(0, 1)) { (dp, i) =>
    dp.updated(i, nums.filter(_ <= i).map(n => dp(i - n)).sum)
  }(target)`,

    OCaml: `let combination_sum4 nums target =
  let dp = Array.make (target + 1) 0 in
  dp.(0) <- 1;
  for i = 1 to target do
    dp.(i) <- List.fold_left (fun sum n ->
      if n <= i then sum + dp.(i - n) else sum) 0 nums
  done; dp.(target)`,

    Clojure: `(defn combination-sum4 [nums target]
  (let [dp (reduce (fn [dp i]
              (assoc dp i (reduce (fn [s n] (if (<= n i) (+ s (get dp (- i n) 0)) s))
                            0 nums)))
            {0 1} (range 1 (inc target)))]
    (get dp target 0)))`,

    Lisp: `(defun combination-sum4 (nums target)
  (let ((dp (make-array (1+ target) :initial-element 0)))
    (setf (aref dp 0) 1)
    (loop for i from 1 to target do
      (setf (aref dp i) (reduce #'+ (mapcar (lambda (n)
        (if (<= n i) (aref dp (- i n)) 0)) nums))))
    (aref dp target)))`,
  },

  // ─── Problem 153: Insert Delete GetRandom O(1) (LC 380) ────────────────────
  153: {
    TypeScript: `class RandomizedSet {
  private map: Map<number, number>;
  private list: number[];
  constructor() { this.map = new Map(); this.list = []; }
  insert(val: number): boolean {
    if (this.map.has(val)) return false;
    this.map = new Map([...this.map, [val, this.list.length]]);
    this.list = [...this.list, val];
    return true;
  }
  remove(val: number): boolean {
    if (!this.map.has(val)) return false;
    const idx = this.map.get(val)!;
    const last = this.list[this.list.length - 1];
    const newList = [...this.list.slice(0, -1)];
    if (idx < newList.length) newList[idx] = last;
    const newMap = new Map([...this.map]);
    if (idx < newList.length) newMap.set(last, idx);
    newMap.delete(val);
    this.map = newMap; this.list = newList;
    return true;
  }
  getRandom(): number { return this.list[Math.floor(Math.random() * this.list.length)]; }
}`,

    Haskell: `import qualified Data.Map.Strict as Map
import System.Random (randomRIO)

data RandSet = RandSet (Map.Map Int Int) [Int]

empty :: RandSet
empty = RandSet Map.empty []

insert :: Int -> RandSet -> (Bool, RandSet)
insert val (RandSet m xs)
  | Map.member val m = (False, RandSet m xs)
  | otherwise = (True, RandSet (Map.insert val (length xs) m) (xs ++ [val]))

remove :: Int -> RandSet -> (Bool, RandSet)
remove val (RandSet m xs)
  | not (Map.member val m) = (False, RandSet m xs)
  | otherwise = let idx = m Map.! val; lastVal = last xs
                    xs' = init xs; m' = Map.delete val m
                in if idx < length xs'
                   then (True, RandSet (Map.insert lastVal idx m')
                         (take idx xs' ++ [lastVal] ++ drop (idx+1) xs'))
                   else (True, RandSet m' xs')`,

    Elixir: `defmodule RandomizedSet do
  defstruct map: %{}, list: []
  def new(), do: %RandomizedSet{}
  def insert(%RandomizedSet{map: m, list: l} = s, val) do
    if Map.has_key?(m, val), do: {false, s},
    else: {true, %RandomizedSet{map: Map.put(m, val, length(l)), list: l ++ [val]}}
  end
  def remove(%RandomizedSet{map: m, list: l} = s, val) do
    if not Map.has_key?(m, val), do: {false, s},
    else: (
      idx = m[val]; last_val = List.last(l); new_list = List.delete_at(l, -1)
      new_map = m |> Map.delete(val)
      if idx < length(new_list) do
        {true, %RandomizedSet{map: Map.put(new_map, last_val, idx),
          list: List.replace_at(new_list, idx, last_val)}}
      else {true, %RandomizedSet{map: new_map, list: new_list}} end
    )
  end
end`,

    Rust: `use std::collections::HashMap;
use rand::Rng;
struct RandomizedSet { map: HashMap<i32, usize>, list: Vec<i32> }
impl RandomizedSet {
    fn new() -> Self { Self { map: HashMap::new(), list: vec![] } }
    fn insert(&mut self, val: i32) -> bool {
        if self.map.contains_key(&val) { return false; }
        self.map.insert(val, self.list.len());
        self.list.push(val); true
    }
    fn remove(&mut self, val: i32) -> bool {
        if let Some(idx) = self.map.remove(&val) {
            let last = *self.list.last().unwrap();
            self.list.swap_remove(idx);
            if idx < self.list.len() { self.map.insert(last, idx); }
            true
        } else { false }
    }
    fn get_random(&self) -> i32 {
        self.list[rand::thread_rng().gen_range(0..self.list.len())]
    }
}`,

    Scala: `import scala.util.Random
class RandomizedSet {
  private var map = Map.empty[Int, Int]
  private var list = Vector.empty[Int]
  def insert(v: Int): Boolean =
    if (map.contains(v)) false
    else { map += (v -> list.size); list :+= v; true }
  def remove(v: Int): Boolean =
    if (!map.contains(v)) false
    else {
      val idx = map(v); val last = list.last
      val nl = list.init.updated(idx, last)
      map = (map - v).updated(last, idx)
      if (idx == list.size - 1) map -= v
      list = if (idx < nl.size) nl else list.init
      true
    }
  def getRandom(): Int = list(Random.nextInt(list.size))
}`,

    OCaml: `type rand_set = { map: (int, int) Hashtbl.t; list: int array; size: int }

let create () = { map = Hashtbl.create 16; list = Array.make 128 0; size = 0 }

let insert rs v =
  if Hashtbl.mem rs.map v then false
  else begin
    Hashtbl.add rs.map v rs.size;
    rs.list.(rs.size) <- v;
    true
  end

let remove rs v =
  if not (Hashtbl.mem rs.map v) then false
  else begin
    let idx = Hashtbl.find rs.map v in
    let last_v = rs.list.(rs.size - 1) in
    rs.list.(idx) <- last_v;
    Hashtbl.replace rs.map last_v idx;
    Hashtbl.remove rs.map v;
    true
  end`,

    Clojure: `(defn create-set [] {:map {} :list []})
(defn rs-insert [{:keys [map list]} val]
  (if (contains? map val) [false {:map map :list list}]
    [true {:map (assoc map val (count list)) :list (conj list val)}]))
(defn rs-remove [{:keys [map list]} val]
  (if (not (contains? map val)) [false {:map map :list list}]
    (let [idx (map val) last-val (peek list)
          new-list (-> (pop list) (assoc idx last-val))
          new-map (-> (dissoc map val) (assoc last-val idx))]
      [true {:map new-map :list (if (= idx (dec (count list))) (pop list) new-list)}])))`,

    Lisp: `(defstruct rand-set (map (make-hash-table)) (list (make-array 0 :adjustable t :fill-pointer 0)))
(defun rs-insert (rs val)
  (if (gethash val (rand-set-map rs)) nil
    (progn (setf (gethash val (rand-set-map rs)) (length (rand-set-list rs)))
           (vector-push-extend val (rand-set-list rs)) t)))
(defun rs-remove (rs val)
  (let ((idx (gethash val (rand-set-map rs))))
    (if (null idx) nil
      (let* ((lst (rand-set-list rs)) (last-val (aref lst (1- (length lst)))))
        (setf (aref lst idx) last-val)
        (setf (gethash last-val (rand-set-map rs)) idx)
        (remhash val (rand-set-map rs))
        (vector-pop lst) t))))`,
  },

  // ─── Problem 154: All Nodes Distance K in Binary Tree (LC 863) ──────────────
  154: {
    TypeScript: `interface TreeNode { val: number; left: TreeNode | null; right: TreeNode | null; }
function distanceK(root: TreeNode | null, target: TreeNode, k: number): number[] {
  const parentMap = new Map<TreeNode, TreeNode | null>();
  const buildParent = (node: TreeNode | null, parent: TreeNode | null): void => {
    if (!node) return;
    parentMap.set(node, parent);
    buildParent(node.left, node);
    buildParent(node.right, node);
  };
  buildParent(root, null);
  const bfs = (start: TreeNode, k: number): number[] => {
    const visited = new Set<TreeNode>();
    let queue: TreeNode[] = [start];
    visited.add(start);
    let dist = 0;
    while (queue.length > 0 && dist < k) {
      queue = queue.reduce<TreeNode[]>((next, node) => {
        const neighbors = [node.left, node.right, parentMap.get(node) ?? null]
          .filter((n): n is TreeNode => n !== null && !visited.has(n));
        neighbors.forEach(n => visited.add(n));
        return [...next, ...neighbors];
      }, []);
      dist++;
    }
    return queue.map(n => n.val);
  };
  return bfs(target, k);
}`,

    Haskell: `data Tree = Nil | Node Int Tree Tree

distanceK :: Tree -> Int -> Int -> [Int]
distanceK root targetVal k =
  let parentMap = buildParents root Nothing []
      buildParents Nil _ acc = acc
      buildParents (Node v l r) par acc =
        buildParents l (Just v) (buildParents r (Just v) ((v, par):acc))
      pmap = foldr (\\(v,p) m -> (v,p):m) [] parentMap
      lookupP v = lookup v pmap >>= id
      children (Node v l r) = filter (/= Nil) [l, r]
      children Nil = []
      bfs [] _ _ = []
      bfs nodes 0 _ = map (\\(Node v _ _) -> v) nodes
      bfs nodes d visited =
        let nexts = concatMap (\\(Node v l r) ->
              filter (\\(Node v2 _ _) -> v2 \`notElem\` visited)
                (filter (/= Nil) [l, r])) nodes
        in bfs nexts (d-1) (map (\\(Node v _ _) -> v) nodes ++ visited)
  in bfs [findNode root targetVal] k []
  where findNode Nil _ = Nil
        findNode n@(Node v l r) t
          | v == t = n
          | otherwise = case findNode l t of Nil -> findNode r t; x -> x`,

    Elixir: `defmodule DistanceK do
  def solve(root, target, k) do
    parent_map = build_parents(root, nil, %{})
    bfs([target], 0, k, MapSet.new([target.val]), parent_map)
  end
  defp build_parents(nil, _, map), do: map
  defp build_parents(%{val: v, left: l, right: r}, parent, map) do
    map = Map.put(map, v, parent)
    map = build_parents(l, v, map)
    build_parents(r, v, map)
  end
  defp bfs(queue, dist, k, _, _) when dist == k, do: Enum.map(queue, & &1.val)
  defp bfs([], _, _, _, _), do: []
  defp bfs(queue, dist, k, visited, pm) do
    {next, visited} = Enum.reduce(queue, {[], visited}, fn node, {nxt, vis} ->
      neighbors = [node.left, node.right, pm[node.val]]
        |> Enum.reject(&(is_nil(&1) or MapSet.member?(vis, &1)))
      {nxt ++ neighbors, Enum.reduce(neighbors, vis, &MapSet.put(&2, &1))}
    end)
    bfs(next, dist + 1, k, visited, pm)
  end
end`,

    Rust: `use std::collections::{HashMap, HashSet, VecDeque};
fn distance_k(adj: &HashMap<i32, Vec<i32>>, target: i32, k: i32) -> Vec<i32> {
    let mut visited = HashSet::new();
    let mut queue = VecDeque::new();
    queue.push_back((target, 0));
    visited.insert(target);
    let mut result = vec![];
    while let Some((node, dist)) = queue.pop_front() {
        if dist == k { result.push(node); }
        if dist < k {
            if let Some(neighbors) = adj.get(&node) {
                for &n in neighbors.iter().filter(|n| !visited.contains(n)) {
                    visited.insert(n);
                    queue.push_back((n, dist + 1));
                }
            }
        }
    }
    result
}`,

    Scala: `def distanceK(adj: Map[Int, List[Int]], target: Int, k: Int): List[Int] = {
  def bfs(queue: List[(Int, Int)], visited: Set[Int]): List[Int] = queue match {
    case Nil => Nil
    case (node, dist) :: rest if dist == k =>
      node :: bfs(rest, visited)
    case (node, dist) :: rest =>
      val neighbors = adj.getOrElse(node, Nil).filterNot(visited.contains)
      bfs(rest ++ neighbors.map((_, dist + 1)), visited ++ neighbors)
  }
  bfs(List((target, 0)), Set(target))
}`,

    OCaml: `let distance_k adj target k =
  let visited = Hashtbl.create 16 in
  Hashtbl.add visited target true;
  let rec bfs = function
    | [] -> []
    | (node, dist) :: rest when dist = k ->
      node :: bfs rest
    | (node, dist) :: rest ->
      let neighbors = try Hashtbl.find adj node with Not_found -> [] in
      let nexts = List.filter (fun n -> not (Hashtbl.mem visited n)) neighbors in
      List.iter (fun n -> Hashtbl.add visited n true) nexts;
      bfs (rest @ List.map (fun n -> (n, dist + 1)) nexts)
  in bfs [(target, 0)]`,

    Clojure: `(defn distance-k [adj target k]
  (loop [queue [[target 0]] visited #{target} result []]
    (if (empty? queue) result
      (let [[node dist] (first queue)
            rest (subvec (vec queue) 1)]
        (if (= dist k)
          (recur rest visited (conj result node))
          (let [neighbors (filter #(not (visited %)) (get adj node []))
                new-visited (into visited neighbors)]
            (recur (into (vec rest) (map #(vector % (inc dist)) neighbors))
                   new-visited result)))))))`,

    Lisp: `(defun distance-k (adj target k)
  (let ((visited (make-hash-table)) (result nil))
    (setf (gethash target visited) t)
    (labels ((bfs (queue)
      (when queue
        (destructuring-bind ((node . dist) . rest) queue
          (if (= dist k) (progn (push node result) (bfs rest))
            (let ((neighbors (remove-if (lambda (n) (gethash n visited))
                              (gethash node adj nil))))
              (dolist (n neighbors) (setf (gethash n visited) t))
              (bfs (append rest (mapcar (lambda (n) (cons n (1+ dist)))
                                        neighbors)))))))))
      (bfs (list (cons target 0)))
      (nreverse result))))`,
  },

  // ─── Problem 155: Ransom Note (LC 383) ──────────────────────────────────────
  155: {
    TypeScript: `function canConstruct(ransomNote: string, magazine: string): boolean {
  const freq = [...magazine].reduce<Record<string, number>>(
    (acc, ch) => ({ ...acc, [ch]: (acc[ch] ?? 0) + 1 }), {});
  return [...ransomNote].every(ch => {
    freq[ch] = (freq[ch] ?? 0) - 1;
    return freq[ch] >= 0;
  });
}`,

    Haskell: `import qualified Data.Map.Strict as Map

canConstruct :: String -> String -> Bool
canConstruct note mag =
  let freq = foldl (\\m ch -> Map.insertWith (+) ch 1 m) Map.empty mag
      (_, valid) = foldl (\\(m, ok) ch ->
        let cnt = Map.findWithDefault 0 ch m
        in (Map.insert ch (cnt - 1) m, ok && cnt > 0)) (freq, True) note
  in valid`,

    Elixir: `defmodule RansomNote do
  def can_construct(note, magazine) do
    freq = String.graphemes(magazine) |> Enum.frequencies()
    String.graphemes(note)
    |> Enum.reduce_while(freq, fn ch, f ->
      cnt = Map.get(f, ch, 0)
      if cnt > 0, do: {:cont, Map.put(f, ch, cnt - 1)}, else: {:halt, nil}
    end) != nil
  end
end`,

    Rust: `fn can_construct(ransom: &str, magazine: &str) -> bool {
    let freq = magazine.chars().fold(std::collections::HashMap::new(), |mut m, c| {
        *m.entry(c).or_insert(0) += 1; m
    });
    ransom.chars().fold((freq, true), |(mut m, ok), c| {
        let cnt = m.entry(c).or_insert(0);
        *cnt -= 1;
        (m, ok && *cnt >= 0)
    }).1
}`,

    Scala: `def canConstruct(ransomNote: String, magazine: String): Boolean = {
  val freq = magazine.foldLeft(Map.empty[Char, Int]) { (m, ch) =>
    m.updated(ch, m.getOrElse(ch, 0) + 1)
  }
  ransomNote.foldLeft((freq, true)) { case ((m, ok), ch) =>
    val cnt = m.getOrElse(ch, 0)
    (m.updated(ch, cnt - 1), ok && cnt > 0)
  }._2
}`,

    OCaml: `let can_construct note magazine =
  let freq = Hashtbl.create 26 in
  String.iter (fun ch ->
    let c = try Hashtbl.find freq ch with Not_found -> 0 in
    Hashtbl.replace freq ch (c + 1)) magazine;
  String.fold_left (fun ok ch ->
    let c = try Hashtbl.find freq ch with Not_found -> 0 in
    Hashtbl.replace freq ch (c - 1); ok && c > 0) true note`,

    Clojure: `(defn can-construct [ransom magazine]
  (let [freq (frequencies magazine)]
    (second (reduce (fn [[f ok] ch]
              (let [cnt (get f ch 0)]
                [(update f ch (fnil dec 0)) (and ok (pos? cnt))]))
            [freq true] ransom))))`,

    Lisp: `(defun can-construct (ransom magazine)
  (let ((freq (make-hash-table)))
    (map nil (lambda (ch) (incf (gethash ch freq 0))) magazine)
    (every (lambda (ch)
      (let ((cnt (gethash ch freq 0)))
        (setf (gethash ch freq) (1- cnt))
        (> cnt 0)))
      ransom)))`,
  },

  // ─── Problem 156: Decode String (LC 394) ────────────────────────────────────
  156: {
    TypeScript: `function decodeString(s: string): string {
  const helper = (s: string, i: number): [string, number] => {
    let result = '';
    while (i < s.length && s[i] !== ']') {
      if (s[i] >= '0' && s[i] <= '9') {
        let num = 0;
        while (s[i] >= '0' && s[i] <= '9') { num = num * 10 + Number(s[i]); i++; }
        i++; // skip '['
        const [decoded, newI] = helper(s, i);
        result += Array.from({ length: num }, () => decoded).join('');
        i = newI + 1; // skip ']'
      } else { result += s[i]; i++; }
    }
    return [result, i];
  };
  return helper(s, 0)[0];
}`,

    Haskell: `decodeString :: String -> String
decodeString = fst . go
  where
    go [] = ("", [])
    go (']':rest) = ("", rest)
    go (c:rest)
      | c >= '0' && c <= '9' =
        let (numStr, '[':after) = span (\\x -> x >= '0' && x <= '9') (c:rest)
            n = read numStr :: Int
            (inner, remaining) = go after
        in let (next, final) = go remaining
           in (concat (replicate n inner) ++ next, final)
      | otherwise = let (next, final) = go rest in (c:next, final)`,

    Elixir: `defmodule DecodeString do
  def decode(s), do: elem(helper(String.graphemes(s)), 0)
  defp helper(chars), do: helper(chars, "")
  defp helper([], acc), do: {acc, []}
  defp helper(["]" | rest], acc), do: {acc, rest}
  defp helper([c | _] = chars, acc) when c >= "0" and c <= "9" do
    {num_chars, ["[" | rest]} = Enum.split_while(chars, &(&1 >= "0" and &1 <= "9"))
    num = num_chars |> Enum.join() |> String.to_integer()
    {inner, remaining} = helper(rest)
    {next, final} = helper(remaining, "")
    {acc <> String.duplicate(inner, num) <> next, final}
  end
  defp helper([c | rest], acc), do: helper(rest, acc <> c)
end`,

    Rust: `fn decode_string(s: &str) -> String {
    fn helper(chars: &[u8], i: usize) -> (String, usize) {
        let mut result = String::new();
        let mut i = i;
        while i < chars.len() && chars[i] != b']' {
            if chars[i].is_ascii_digit() {
                let mut num = 0usize;
                while i < chars.len() && chars[i].is_ascii_digit() {
                    num = num * 10 + (chars[i] - b'0') as usize; i += 1;
                }
                i += 1; // skip '['
                let (decoded, ni) = helper(chars, i);
                result.push_str(&decoded.repeat(num));
                i = ni + 1; // skip ']'
            } else { result.push(chars[i] as char); i += 1; }
        }
        (result, i)
    }
    helper(s.as_bytes(), 0).0
}`,

    Scala: `def decodeString(s: String): String = {
  def helper(i: Int): (String, Int) = {
    val sb = new StringBuilder; var idx = i
    while (idx < s.length && s(idx) != ']') {
      if (s(idx).isDigit) {
        var num = 0
        while (s(idx).isDigit) { num = num * 10 + (s(idx) - '0'); idx += 1 }
        idx += 1 // skip '['
        val (decoded, ni) = helper(idx)
        sb.append(decoded * num); idx = ni + 1
      } else { sb.append(s(idx)); idx += 1 }
    }
    (sb.toString, idx)
  }
  helper(0)._1
}`,

    OCaml: `let decode_string s =
  let n = String.length s in
  let rec helper i =
    if i >= n || s.[i] = ']' then ("", i)
    else if s.[i] >= '0' && s.[i] <= '9' then
      let j = ref i and num = ref 0 in
      while !j < n && s.[!j] >= '0' && s.[!j] <= '9' do
        num := !num * 10 + Char.code s.[!j] - Char.code '0'; incr j done;
      let (inner, k) = helper (!j + 1) in
      let repeated = String.concat "" (List.init !num (fun _ -> inner)) in
      let (rest, final_i) = helper (k + 1) in
      (repeated ^ rest, final_i)
    else let (rest, k) = helper (i + 1) in
      (String.make 1 s.[i] ^ rest, k)
  in fst (helper 0)`,

    Clojure: `(defn decode-string [s]
  (letfn [(helper [chars]
            (loop [cs chars acc ""]
              (cond
                (or (empty? cs) (= (first cs) \\])) [acc (rest cs)]
                (Character/isDigit (first cs))
                  (let [[num-chars rest] (split-with #(Character/isDigit %) cs)
                        n (Integer/parseInt (apply str num-chars))
                        [inner remaining] (helper (rest rest))
                        [next final] (helper remaining)]
                    [(str acc (apply str (repeat n inner)) next) final])
                :else (recur (rest cs) (str acc (first cs))))))]
    (first (helper (seq s)))))`,

    Lisp: `(defun decode-string (s)
  (labels ((helper (chars)
    (let ((result "") (cs chars))
      (loop while (and cs (not (char= (car cs) #\\]))) do
        (if (digit-char-p (car cs))
          (let ((num 0))
            (loop while (and cs (digit-char-p (car cs))) do
              (setf num (+ (* num 10) (digit-char-p (car cs))) cs (cdr cs)))
            (setf cs (cdr cs)) ; skip [
            (multiple-value-bind (inner rest) (helper cs)
              (setf result (concatenate 'string result
                (apply #'concatenate 'string (make-list num :initial-element inner)))
                cs rest))
            (setf cs (cdr cs))) ; skip ]
          (progn (setf result (concatenate 'string result (string (car cs)))
                       cs (cdr cs)))))
      (values result cs))))
    (helper (coerce s 'list))))`,
  },

  // ─── Problem 157: Middle of the Linked List (LC 876) ────────────────────────
  157: {
    TypeScript: `interface ListNode { val: number; next: ListNode | null; }
function middleNode(head: ListNode | null): ListNode | null {
  const nodes = (function collect(n: ListNode | null): ListNode[] {
    return n === null ? [] : [n, ...collect(n.next)];
  })(head);
  return nodes[Math.floor(nodes.length / 2)] ?? null;
}`,

    Haskell: `data ListNode = ListNode { val :: Int, next :: Maybe ListNode }

middleNode :: Maybe ListNode -> Maybe ListNode
middleNode head =
  let nodes = collect head
      collect Nothing = []
      collect (Just n) = n : collect (next n)
      len = length nodes
  in if null nodes then Nothing
     else Just (nodes !! (len \`div\` 2))`,

    Elixir: `defmodule MiddleNode do
  def middle(nil), do: nil
  def middle(head) do
    nodes = collect(head)
    Enum.at(nodes, div(length(nodes), 2))
  end
  defp collect(nil), do: []
  defp collect(%{val: _, next: nxt} = node), do: [node | collect(nxt)]
end`,

    Rust: `#[derive(Clone)]
struct ListNode { val: i32, next: Option<Box<ListNode>> }
fn middle_node(head: &Option<Box<ListNode>>) -> Option<&ListNode> {
    let nodes: Vec<&ListNode> = std::iter::successors(head.as_deref(), |n| n.next.as_deref()).collect();
    nodes.get(nodes.len() / 2).copied()
}`,

    Scala: `case class ListNode(v: Int, next: Option[ListNode])
def middleNode(head: Option[ListNode]): Option[ListNode] = {
  def collect(n: Option[ListNode]): List[ListNode] = n match {
    case None => Nil
    case Some(node) => node :: collect(node.next)
  }
  val nodes = collect(head)
  Some(nodes(nodes.length / 2))
}`,

    OCaml: `type list_node = { v: int; next: list_node option }

let middle_node head =
  let rec collect = function
    | None -> []
    | Some n -> n :: collect n.next in
  let nodes = collect head in
  let mid = List.length nodes / 2 in
  List.nth_opt nodes mid`,

    Clojure: `(defn middle-node [head]
  (let [nodes (loop [n head acc []]
                (if (nil? n) acc
                  (recur (:next n) (conj acc n))))]
    (nth nodes (quot (count nodes) 2) nil)))`,

    Lisp: `(defstruct lnode val next)
(defun middle-node (head)
  (labels ((collect (n) (if (null n) nil (cons n (collect (lnode-next n))))))
    (let* ((nodes (collect head)) (mid (floor (length nodes) 2)))
      (nth mid nodes))))`,
  },

  // ─── Problem 158: Random Pick with Weight (LC 528) ──────────────────────────
  158: {
    TypeScript: `class RandomPickWeight {
  private prefix: number[];
  constructor(w: number[]) {
    this.prefix = w.reduce<number[]>((acc, v) => [...acc, (acc[acc.length - 1] ?? 0) + v], []);
  }
  pickIndex(): number {
    const target = Math.random() * this.prefix[this.prefix.length - 1];
    const search = (lo: number, hi: number): number => {
      if (lo >= hi) return lo;
      const mid = (lo + hi) >> 1;
      return this.prefix[mid] <= target ? search(mid + 1, hi) : search(lo, mid);
    };
    return search(0, this.prefix.length - 1);
  }
}`,

    Haskell: `import System.Random (randomRIO)

type WeightedPicker = [Int]  -- prefix sums

buildPicker :: [Int] -> WeightedPicker
buildPicker = scanl1 (+)

pickIndex :: WeightedPicker -> IO Int
pickIndex ps = do
  let total = last ps
  target <- randomRIO (1, total)
  let search lo hi
        | lo >= hi = lo
        | otherwise = let mid = (lo + hi) \`div\` 2
                      in if ps !! mid < target then search (mid+1) hi else search lo mid
  return $ search 0 (length ps - 1)`,

    Elixir: `defmodule WeightedPicker do
  def build(weights) do
    weights |> Enum.scan(&+/2)
  end
  def pick(prefix) do
    total = List.last(prefix)
    target = :rand.uniform(total)
    binary_search(prefix, target, 0, length(prefix) - 1)
  end
  defp binary_search(ps, target, lo, hi) when lo >= hi, do: lo
  defp binary_search(ps, target, lo, hi) do
    mid = div(lo + hi, 2)
    if Enum.at(ps, mid) < target, do: binary_search(ps, target, mid + 1, hi),
    else: binary_search(ps, target, lo, mid)
  end
end`,

    Rust: `use rand::Rng;
struct WeightedPicker { prefix: Vec<i32> }
impl WeightedPicker {
    fn new(w: &[i32]) -> Self {
        let prefix = w.iter().scan(0, |s, &x| { *s += x; Some(*s) }).collect();
        Self { prefix }
    }
    fn pick(&self) -> usize {
        let target = rand::thread_rng().gen_range(1..=*self.prefix.last().unwrap());
        self.prefix.partition_point(|&x| x < target)
    }
}`,

    Scala: `class WeightedPicker(w: Array[Int]) {
  private val prefix = w.scanLeft(0)(_ + _).tail
  def pickIndex(): Int = {
    val target = scala.util.Random.nextInt(prefix.last) + 1
    def search(lo: Int, hi: Int): Int =
      if (lo >= hi) lo
      else { val mid = (lo + hi) / 2
        if (prefix(mid) < target) search(mid + 1, hi) else search(lo, mid) }
    search(0, prefix.length - 1)
  }
}`,

    OCaml: `let build_picker weights =
  let prefix = List.fold_left (fun acc w ->
    (match acc with [] -> w | h :: _ -> h + w) :: acc) [] weights
    |> List.rev in
  (prefix, List.nth prefix (List.length prefix - 1))

let pick (prefix, total) =
  let target = 1 + Random.int total in
  let arr = Array.of_list prefix in
  let rec search lo hi =
    if lo >= hi then lo
    else let mid = (lo + hi) / 2 in
      if arr.(mid) < target then search (mid + 1) hi else search lo mid
  in search 0 (Array.length arr - 1)`,

    Clojure: `(defn build-picker [weights]
  (reductions + weights))

(defn pick-index [prefix]
  (let [total (last prefix)
        target (inc (rand-int total))
        ps (vec prefix)]
    (loop [lo 0 hi (dec (count ps))]
      (if (>= lo hi) lo
        (let [mid (quot (+ lo hi) 2)]
          (if (< (ps mid) target) (recur (inc mid) hi) (recur lo mid)))))))`,

    Lisp: `(defun build-picker (weights)
  (let ((sum 0))
    (mapcar (lambda (w) (incf sum w) sum) weights)))

(defun pick-index (prefix)
  (let* ((total (car (last prefix)))
         (target (1+ (random total)))
         (arr (coerce prefix 'vector)))
    (labels ((search (lo hi)
      (if (>= lo hi) lo
        (let ((mid (floor (+ lo hi) 2)))
          (if (< (aref arr mid) target) (search (1+ mid) hi)
            (search lo mid))))))
      (search 0 (1- (length arr))))))`,
  },

  // ─── Problem 159: Longest Palindrome (LC 409) ──────────────────────────────
  159: {
    TypeScript: `function longestPalindrome(s: string): number {
  const freq = [...s].reduce<Record<string, number>>(
    (acc, ch) => ({ ...acc, [ch]: (acc[ch] ?? 0) + 1 }), {});
  const pairs = Object.values(freq).reduce((sum, cnt) => sum + Math.floor(cnt / 2) * 2, 0);
  return pairs + (pairs < s.length ? 1 : 0);
}`,

    Haskell: `import qualified Data.Map.Strict as Map

longestPalindrome :: String -> Int
longestPalindrome s =
  let freq = foldl (\\m ch -> Map.insertWith (+) ch 1 m) Map.empty s
      pairs = Map.foldl (\\acc cnt -> acc + (cnt \`div\` 2) * 2) 0 freq
  in pairs + if pairs < length s then 1 else 0`,

    Elixir: `defmodule LongestPalindrome do
  def solve(s) do
    freq = String.graphemes(s) |> Enum.frequencies()
    pairs = freq |> Map.values() |> Enum.reduce(0, fn cnt, sum -> sum + div(cnt, 2) * 2 end)
    pairs + if(pairs < String.length(s), do: 1, else: 0)
  end
end`,

    Rust: `fn longest_palindrome(s: &str) -> usize {
    let freq = s.chars().fold(std::collections::HashMap::new(), |mut m, c| {
        *m.entry(c).or_insert(0usize) += 1; m
    });
    let pairs: usize = freq.values().map(|&c| (c / 2) * 2).sum();
    pairs + if pairs < s.len() { 1 } else { 0 }
}`,

    Scala: `def longestPalindrome(s: String): Int = {
  val freq = s.foldLeft(Map.empty[Char, Int]) { (m, ch) =>
    m.updated(ch, m.getOrElse(ch, 0) + 1)
  }
  val pairs = freq.values.foldLeft(0)((acc, cnt) => acc + (cnt / 2) * 2)
  pairs + (if (pairs < s.length) 1 else 0)
}`,

    OCaml: `let longest_palindrome s =
  let freq = Hashtbl.create 26 in
  String.iter (fun ch ->
    let c = try Hashtbl.find freq ch with Not_found -> 0 in
    Hashtbl.replace freq ch (c + 1)) s;
  let pairs = Hashtbl.fold (fun _ cnt acc -> acc + (cnt / 2) * 2) freq 0 in
  pairs + (if pairs < String.length s then 1 else 0)`,

    Clojure: `(defn longest-palindrome [s]
  (let [freq (frequencies s)
        pairs (reduce (fn [sum [_ cnt]] (+ sum (* (quot cnt 2) 2))) 0 freq)]
    (+ pairs (if (< pairs (count s)) 1 0))))`,

    Lisp: `(defun longest-palindrome (s)
  (let ((freq (make-hash-table)))
    (map nil (lambda (ch) (incf (gethash ch freq 0))) s)
    (let ((pairs 0))
      (maphash (lambda (k v) (declare (ignore k)) (incf pairs (* (floor v 2) 2))) freq)
      (+ pairs (if (< pairs (length s)) 1 0)))))`,
  },

  // ─── Problem 160: Partition Equal Subset Sum (LC 416) ───────────────────────
  160: {
    TypeScript: `function canPartition(nums: number[]): boolean {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % 2 !== 0) return false;
  const target = total / 2;
  return nums.reduce<Set<number>>(
    (dp, num) => new Set([...dp, ...[...dp].map(s => s + num)]),
    new Set([0])
  ).has(target);
}`,

    Haskell: `import qualified Data.Set as Set

canPartition :: [Int] -> Bool
canPartition nums =
  let total = sum nums
      target = total \`div\` 2
  in if odd total then False
     else Set.member target $
       foldl (\\dp n -> Set.union dp (Set.map (+ n) dp)) (Set.singleton 0) nums`,

    Elixir: `defmodule PartitionSum do
  def can_partition(nums) do
    total = Enum.sum(nums)
    if rem(total, 2) != 0, do: false,
    else: (
      target = div(total, 2)
      dp = Enum.reduce(nums, MapSet.new([0]), fn n, dp ->
        MapSet.union(dp, MapSet.new(Enum.map(MapSet.to_list(dp), &(&1 + n))))
      end)
      MapSet.member?(dp, target)
    )
  end
end`,

    Rust: `fn can_partition(nums: &[i32]) -> bool {
    let total: i32 = nums.iter().sum();
    if total % 2 != 0 { return false; }
    let target = (total / 2) as usize;
    let mut dp = vec![false; target + 1];
    dp[0] = true;
    for &num in nums {
        let n = num as usize;
        for j in (n..=target).rev() {
            dp[j] = dp[j] || dp[j - n];
        }
    }
    dp[target]
}`,

    Scala: `def canPartition(nums: Array[Int]): Boolean = {
  val total = nums.sum
  if (total % 2 != 0) false
  else {
    val target = total / 2
    nums.foldLeft(Set(0)) { (dp, n) =>
      dp ++ dp.map(_ + n)
    }.contains(target)
  }
}`,

    OCaml: `module IntSet = Set.Make(Int)

let can_partition nums =
  let total = List.fold_left (+) 0 nums in
  if total mod 2 <> 0 then false
  else
    let target = total / 2 in
    let dp = List.fold_left (fun dp n ->
      IntSet.union dp (IntSet.map (fun s -> s + n) dp)
    ) (IntSet.singleton 0) nums in
    IntSet.mem target dp`,

    Clojure: `(defn can-partition [nums]
  (let [total (reduce + nums)]
    (if (odd? total) false
      (let [target (/ total 2)
            dp (reduce (fn [dp n]
                  (into dp (map #(+ % n) dp)))
                #{0} nums)]
        (contains? dp target)))))`,

    Lisp: `(defun can-partition (nums)
  (let ((total (reduce #'+ nums)))
    (when (evenp total)
      (let* ((target (/ total 2))
             (dp (make-hash-table)))
        (setf (gethash 0 dp) t)
        (dolist (n nums)
          (let ((new-sums nil))
            (maphash (lambda (s _) (when (<= (+ s n) target)
              (push (+ s n) new-sums))) dp)
            (dolist (s new-sums) (setf (gethash s dp) t))))
        (gethash target dp)))))`,
  },

  // ─── Problem 161: Pacific Atlantic Water Flow (LC 417) ──────────────────────
  161: {
    TypeScript: `function pacificAtlantic(heights: number[][]): number[][] {
  const rows = heights.length, cols = heights[0].length;
  const dfs = (reachable: boolean[][], r: number, c: number): void => {
    reachable[r][c] = true;
    [[1,0],[-1,0],[0,1],[0,-1]].forEach(([dr, dc]) => {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols &&
          !reachable[nr][nc] && heights[nr][nc] >= heights[r][c])
        dfs(reachable, nr, nc);
    });
  };
  const pacific = Array.from({length: rows}, () => Array(cols).fill(false));
  const atlantic = Array.from({length: rows}, () => Array(cols).fill(false));
  for (let r = 0; r < rows; r++) { dfs(pacific, r, 0); dfs(atlantic, r, cols - 1); }
  for (let c = 0; c < cols; c++) { dfs(pacific, 0, c); dfs(atlantic, rows - 1, c); }
  return Array.from({length: rows}, (_, r) =>
    Array.from({length: cols}, (_, c) => [r, c])
  ).flat().filter(([r, c]) => pacific[r][c] && atlantic[r][c]);
}`,

    Haskell: `import qualified Data.Set as Set

pacificAtlantic :: [[Int]] -> [(Int, Int)]
pacificAtlantic heights =
  let rows = length heights; cols = length (head heights)
      get r c = (heights !! r) !! c
      dirs = [(1,0),(-1,0),(0,1),(0,-1)]
      dfs visited (r, c) =
        let visited' = Set.insert (r, c) visited
        in foldl (\\v (dr, dc) ->
          let nr = r + dr; nc = c + dc
          in if nr >= 0 && nr < rows && nc >= 0 && nc < cols
                && not (Set.member (nr, nc) v)
                && get nr nc >= get r c
             then dfs v (nr, nc) else v) visited' dirs
      pacStarts = [(r, 0) | r <- [0..rows-1]] ++ [(0, c) | c <- [0..cols-1]]
      atlStarts = [(r, cols-1) | r <- [0..rows-1]] ++ [(rows-1, c) | c <- [0..cols-1]]
      pac = foldl dfs Set.empty pacStarts
      atl = foldl dfs Set.empty atlStarts
  in Set.toList (Set.intersection pac atl)`,

    Elixir: `defmodule PacificAtlantic do
  def solve(heights) do
    rows = length(heights); cols = length(hd(heights))
    get = fn r, c -> Enum.at(heights, r) |> Enum.at(c) end
    dfs = fn dfs_fn, visited, {r, c} ->
      if MapSet.member?(visited, {r, c}), do: visited,
      else: (
        visited = MapSet.put(visited, {r, c})
        [{1,0},{-1,0},{0,1},{0,-1}]
        |> Enum.reduce(visited, fn {dr, dc}, acc ->
          nr = r + dr; nc = c + dc
          if nr >= 0 and nr < rows and nc >= 0 and nc < cols
             and not MapSet.member?(acc, {nr, nc})
             and get.(nr, nc) >= get.(r, c),
            do: dfs_fn.(dfs_fn, acc, {nr, nc}), else: acc
        end)
      )
    end
    pac_starts = for(r <- 0..(rows-1), do: {r, 0}) ++ for(c <- 0..(cols-1), do: {0, c})
    atl_starts = for(r <- 0..(rows-1), do: {r, cols-1}) ++ for(c <- 0..(cols-1), do: {rows-1, c})
    pac = Enum.reduce(pac_starts, MapSet.new(), &dfs.(dfs, &2, &1))
    atl = Enum.reduce(atl_starts, MapSet.new(), &dfs.(dfs, &2, &1))
    MapSet.intersection(pac, atl) |> MapSet.to_list()
  end
end`,

    Rust: `use std::collections::HashSet;

fn pacific_atlantic(heights: &[Vec<i32>]) -> Vec<(usize, usize)> {
    let (rows, cols) = (heights.len(), heights[0].len());
    fn dfs(heights: &[Vec<i32>], visited: &mut HashSet<(usize, usize)>,
           r: usize, c: usize, rows: usize, cols: usize) {
        if !visited.insert((r, c)) { return; }
        for (dr, dc) in &[(0i32,1i32),(0,-1),(1,0),(-1,0)] {
            let (nr, nc) = (r as i32 + dr, c as i32 + dc);
            if nr >= 0 && nr < rows as i32 && nc >= 0 && nc < cols as i32 {
                let (nr, nc) = (nr as usize, nc as usize);
                if !visited.contains(&(nr, nc)) && heights[nr][nc] >= heights[r][c] {
                    dfs(heights, visited, nr, nc, rows, cols);
                }
            }
        }
    }
    let (mut pac, mut atl) = (HashSet::new(), HashSet::new());
    for r in 0..rows { dfs(heights, &mut pac, r, 0, rows, cols);
                        dfs(heights, &mut atl, r, cols-1, rows, cols); }
    for c in 0..cols { dfs(heights, &mut pac, 0, c, rows, cols);
                        dfs(heights, &mut atl, rows-1, c, rows, cols); }
    pac.intersection(&atl).copied().collect()
}`,

    Scala: `def pacificAtlantic(heights: Array[Array[Int]]): List[(Int, Int)] = {
  val (rows, cols) = (heights.length, heights(0).length)
  def dfs(visited: Set[(Int,Int)], r: Int, c: Int): Set[(Int,Int)] = {
    if (visited.contains((r, c))) visited
    else List((1,0),(-1,0),(0,1),(0,-1)).foldLeft(visited + ((r, c))) {
      case (v, (dr, dc)) =>
        val (nr, nc) = (r + dr, c + dc)
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols &&
            !v.contains((nr, nc)) && heights(nr)(nc) >= heights(r)(c))
          dfs(v, nr, nc) else v
    }
  }
  val pacStarts = (0 until rows).map((_, 0)) ++ (0 until cols).map((0, _))
  val atlStarts = (0 until rows).map((_, cols-1)) ++ (0 until cols).map((rows-1, _))
  val pac = pacStarts.foldLeft(Set.empty[(Int,Int)])((v, p) => dfs(v, p._1, p._2))
  val atl = atlStarts.foldLeft(Set.empty[(Int,Int)])((v, p) => dfs(v, p._1, p._2))
  pac.intersect(atl).toList
}`,

    OCaml: `module PairSet = Set.Make(struct
  type t = int * int
  let compare = compare
end)

let pacific_atlantic heights =
  let rows = Array.length heights and cols = Array.length heights.(0) in
  let rec dfs visited r c =
    if PairSet.mem (r, c) visited then visited
    else
      let visited = PairSet.add (r, c) visited in
      List.fold_left (fun v (dr, dc) ->
        let nr, nc = r + dr, c + dc in
        if nr >= 0 && nr < rows && nc >= 0 && nc < cols
           && not (PairSet.mem (nr, nc) v)
           && heights.(nr).(nc) >= heights.(r).(c)
        then dfs v nr nc else v
      ) visited [(1,0);(-1,0);(0,1);(0,-1)]
  in
  let pac_starts = List.init rows (fun r -> (r, 0)) @ List.init cols (fun c -> (0, c)) in
  let atl_starts = List.init rows (fun r -> (r, cols-1)) @ List.init cols (fun c -> (rows-1, c)) in
  let pac = List.fold_left (fun v (r, c) -> dfs v r c) PairSet.empty pac_starts in
  let atl = List.fold_left (fun v (r, c) -> dfs v r c) PairSet.empty atl_starts in
  PairSet.elements (PairSet.inter pac atl)`,

    Clojure: `(defn pacific-atlantic [heights]
  (let [rows (count heights) cols (count (first heights))
        get-h (fn [r c] (nth (nth heights r) c))
        dfs (fn dfs [visited [r c]]
              (if (visited [r c]) visited
                (reduce (fn [v [dr dc]]
                  (let [nr (+ r dr) nc (+ c dc)]
                    (if (and (>= nr 0) (< nr rows) (>= nc 0) (< nc cols)
                             (not (v [nr nc]))
                             (>= (get-h nr nc) (get-h r c)))
                      (dfs v [nr nc]) v)))
                  (conj visited [r c])
                  [[1 0] [-1 0] [0 1] [0 -1]])))
        pac-starts (concat (map #(vector % 0) (range rows))
                           (map #(vector 0 %) (range cols)))
        atl-starts (concat (map #(vector % (dec cols)) (range rows))
                           (map #(vector (dec rows) %) (range cols)))
        pac (reduce dfs #{} pac-starts)
        atl (reduce dfs #{} atl-starts)]
    (vec (clojure.set/intersection pac atl))))`,

    Lisp: `(defun pacific-atlantic (heights)
  (let* ((rows (length heights)) (cols (length (car heights))))
    (labels ((get-h (r c) (nth c (nth r heights)))
             (dfs (visited r c)
               (if (gethash (cons r c) visited) visited
                 (progn (setf (gethash (cons r c) visited) t)
                   (dolist (d '((1 0) (-1 0) (0 1) (0 -1)))
                     (let ((nr (+ r (car d))) (nc (+ c (cadr d))))
                       (when (and (>= nr 0) (< nr rows) (>= nc 0) (< nc cols)
                                  (not (gethash (cons nr nc) visited))
                                  (>= (get-h nr nc) (get-h r c)))
                         (dfs visited nr nc))))
                   visited))))
      (let ((pac (make-hash-table :test 'equal))
            (atl (make-hash-table :test 'equal)))
        (dotimes (r rows) (dfs pac r 0) (dfs atl r (1- cols)))
        (dotimes (c cols) (dfs pac 0 c) (dfs atl (1- rows) c))
        (let (result)
          (maphash (lambda (k _) (when (gethash k atl) (push k result))) pac)
          result)))))`,
  },

  // ─── Problem 162: Maximum Frequency Stack (LC 895) ─────────────────────────
  162: {
    TypeScript: `class FreqStack {
  private freq = new Map<number, number>();
  private group = new Map<number, number[]>();
  private maxFreq = 0;

  push(val: number): void {
    const f = (this.freq.get(val) ?? 0) + 1;
    this.freq.set(val, f);
    this.maxFreq = Math.max(this.maxFreq, f);
    this.group.set(f, [...(this.group.get(f) ?? []), val]);
  }

  pop(): number {
    const stack = this.group.get(this.maxFreq)!;
    const val = stack[stack.length - 1];
    this.group.set(this.maxFreq, stack.slice(0, -1));
    if (this.group.get(this.maxFreq)!.length === 0) this.maxFreq--;
    this.freq.set(val, this.freq.get(val)! - 1);
    return val;
  }
}`,

    Haskell: `import qualified Data.Map.Strict as Map

type FreqStack = (Map.Map Int Int, Map.Map Int [Int], Int)

empty :: FreqStack
empty = (Map.empty, Map.empty, 0)

push :: Int -> FreqStack -> FreqStack
push val (freq, group, maxF) =
  let f = maybe 1 (+1) (Map.lookup val freq)
      freq' = Map.insert val f freq
      group' = Map.insertWith (++) f [val] group
  in (freq', group', max maxF f)

pop :: FreqStack -> (Int, FreqStack)
pop (freq, group, maxF) =
  let (val:rest) = reverse $ group Map.! maxF
      group' = if null rest then Map.delete maxF group
               else Map.insert maxF (reverse rest) group
      maxF' = if null rest then maxF - 1 else maxF
      freq' = Map.adjust (subtract 1) val freq
  in (val, (freq', group', maxF'))`,

    Elixir: `defmodule FreqStack do
  defstruct freq: %{}, group: %{}, max_freq: 0

  def new, do: %FreqStack{}

  def push(%FreqStack{freq: freq, group: group, max_freq: mf}, val) do
    f = Map.get(freq, val, 0) + 1
    %FreqStack{
      freq: Map.put(freq, val, f),
      group: Map.update(group, f, [val], &[val | &1]),
      max_freq: max(mf, f)
    }
  end

  def pop(%FreqStack{freq: freq, group: group, max_freq: mf}) do
    [val | rest] = Map.get(group, mf)
    {new_group, new_mf} = if rest == [],
      do: {Map.delete(group, mf), mf - 1},
      else: {Map.put(group, mf, rest), mf}
    {val, %FreqStack{freq: Map.put(freq, val, freq[val] - 1),
                     group: new_group, max_freq: new_mf}}
  end
end`,

    Rust: `use std::collections::HashMap;

struct FreqStack {
    freq: HashMap<i32, usize>,
    group: HashMap<usize, Vec<i32>>,
    max_freq: usize,
}

impl FreqStack {
    fn new() -> Self {
        FreqStack { freq: HashMap::new(), group: HashMap::new(), max_freq: 0 }
    }
    fn push(&mut self, val: i32) {
        let f = self.freq.entry(val).or_insert(0);
        *f += 1;
        let f = *f;
        self.max_freq = self.max_freq.max(f);
        self.group.entry(f).or_default().push(val);
    }
    fn pop(&mut self) -> i32 {
        let stack = self.group.get_mut(&self.max_freq).unwrap();
        let val = stack.pop().unwrap();
        if stack.is_empty() { self.max_freq -= 1; }
        *self.freq.get_mut(&val).unwrap() -= 1;
        val
    }
}`,

    Scala: `case class FreqStack(freq: Map[Int, Int] = Map(),
                      group: Map[Int, List[Int]] = Map(),
                      maxFreq: Int = 0) {
  def push(v: Int): FreqStack = {
    val f = freq.getOrElse(v, 0) + 1
    FreqStack(freq.updated(v, f),
              group.updated(f, v :: group.getOrElse(f, Nil)),
              math.max(maxFreq, f))
  }
  def pop: (Int, FreqStack) = {
    val v :: rest = group(maxFreq): @unchecked
    val g2 = if (rest.isEmpty) group - maxFreq else group.updated(maxFreq, rest)
    val mf2 = if (rest.isEmpty) maxFreq - 1 else maxFreq
    (v, FreqStack(freq.updated(v, freq(v) - 1), g2, mf2))
  }
}`,

    OCaml: `module IntMap = Map.Make(Int)

type freq_stack = {
  freq: int IntMap.t;
  group: int list IntMap.t;
  max_freq: int;
}

let empty = { freq = IntMap.empty; group = IntMap.empty; max_freq = 0 }

let push val_ s =
  let f = (try IntMap.find val_ s.freq with Not_found -> 0) + 1 in
  let grp = try IntMap.find f s.group with Not_found -> [] in
  { freq = IntMap.add val_ f s.freq;
    group = IntMap.add f (val_ :: grp) s.group;
    max_freq = max s.max_freq f }

let pop s =
  match IntMap.find s.max_freq s.group with
  | v :: rest ->
    let group' = if rest = [] then IntMap.remove s.max_freq s.group
                 else IntMap.add s.max_freq rest s.group in
    let mf' = if rest = [] then s.max_freq - 1 else s.max_freq in
    (v, { freq = IntMap.add v (IntMap.find v s.freq - 1) s.freq;
          group = group'; max_freq = mf' })
  | [] -> failwith "empty"`,

    Clojure: `(defn freq-stack-new [] {:freq {} :group {} :max-freq 0})

(defn freq-stack-push [{:keys [freq group max-freq]} val]
  (let [f (inc (get freq val 0))]
    {:freq (assoc freq val f)
     :group (update group f #(conj (or % []) val))
     :max-freq (max max-freq f)}))

(defn freq-stack-pop [{:keys [freq group max-freq]}]
  (let [stack (get group max-freq)
        val (peek stack)
        rest-stack (pop stack)
        new-group (if (empty? rest-stack)
                    (dissoc group max-freq)
                    (assoc group max-freq rest-stack))
        new-mf (if (empty? rest-stack) (dec max-freq) max-freq)]
    [val {:freq (update freq val dec)
          :group new-group
          :max-freq new-mf}]))`,

    Lisp: `(defstruct freq-stack (freq (make-hash-table)) (group (make-hash-table)) (max-freq 0))

(defun fs-push (fs val)
  (let* ((f (1+ (gethash val (freq-stack-freq fs) 0))))
    (setf (gethash val (freq-stack-freq fs)) f)
    (push val (gethash f (freq-stack-group fs)))
    (setf (freq-stack-max-freq fs) (max (freq-stack-max-freq fs) f))
    fs))

(defun fs-pop (fs)
  (let* ((mf (freq-stack-max-freq fs))
         (stack (gethash mf (freq-stack-group fs)))
         (val (car stack)))
    (setf (gethash mf (freq-stack-group fs)) (cdr stack))
    (when (null (cdr stack))
      (decf (freq-stack-max-freq fs)))
    (decf (gethash val (freq-stack-freq fs)))
    val))`,
  },

  // ─── Problem 163: Longest Repeating Character Replacement (LC 424) ─────────
  163: {
    TypeScript: `function characterReplacement(s: string, k: number): number {
  const count = new Map<string, number>();
  return [...s].reduce(([left, maxCount, best], ch, right) => {
    count.set(ch, (count.get(ch) ?? 0) + 1);
    const mc = Math.max(maxCount, count.get(ch)!);
    if (right - left + 1 - mc > k) {
      count.set(s[left], count.get(s[left])! - 1);
      return [left + 1, mc, Math.max(best, right - left)] as [number, number, number];
    }
    return [left, mc, Math.max(best, right - left + 1)] as [number, number, number];
  }, [0, 0, 0] as [number, number, number])[2];
}`,

    Haskell: `import qualified Data.Map.Strict as Map

characterReplacement :: String -> Int -> Int
characterReplacement s k =
  let go _ _ _ best [] = best
      go left maxC freq best (c:rest) =
        let freq' = Map.insertWith (+) c 1 freq
            mc = max maxC (freq' Map.! c)
            right = length s - length rest
            wLen = right - left
        in if wLen - mc > k
           then let lc = s !! left
                    freq'' = Map.adjust (subtract 1) lc freq'
                in go (left+1) mc freq'' (max best (wLen - 1)) rest
           else go left mc freq' (max best wLen) rest
  in go 0 0 Map.empty 0 s`,

    Elixir: `defmodule CharReplace do
  def character_replacement(s, k) do
    chars = String.graphemes(s)
    {_, _, _, best} = Enum.with_index(chars) |> Enum.reduce({0, 0, %{}, 0}, fn {ch, right}, {left, max_c, freq, best} ->
      freq = Map.update(freq, ch, 1, &(&1 + 1))
      mc = max(max_c, freq[ch])
      if right - left + 1 - mc > k do
        lc = Enum.at(chars, left)
        freq = Map.update!(freq, lc, &(&1 - 1))
        {left + 1, mc, freq, max(best, right - left)}
      else
        {left, mc, freq, max(best, right - left + 1)}
      end
    end)
    best
  end
end`,

    Rust: `fn character_replacement(s: &str, k: usize) -> usize {
    let bytes = s.as_bytes();
    let mut count = [0usize; 26];
    let (mut left, mut max_count, mut best) = (0, 0, 0);
    for right in 0..bytes.len() {
        let idx = (bytes[right] - b'A') as usize;
        count[idx] += 1;
        max_count = max_count.max(count[idx]);
        if right - left + 1 - max_count > k {
            count[(bytes[left] - b'A') as usize] -= 1;
            left += 1;
        }
        best = best.max(right - left + 1);
    }
    best
}`,

    Scala: `def characterReplacement(s: String, k: Int): Int = {
  s.indices.foldLeft((0, 0, Map.empty[Char, Int], 0)) {
    case ((left, maxC, freq, best), right) =>
      val ch = s(right)
      val f = freq.updated(ch, freq.getOrElse(ch, 0) + 1)
      val mc = math.max(maxC, f(ch))
      if (right - left + 1 - mc > k) {
        val lf = f.updated(s(left), f(s(left)) - 1)
        (left + 1, mc, lf, math.max(best, right - left))
      } else (left, mc, f, math.max(best, right - left + 1))
  }._4
}`,

    OCaml: `let character_replacement s k =
  let n = String.length s in
  let count = Array.make 26 0 in
  let rec go left max_c best right =
    if right >= n then best
    else begin
      let idx = Char.code s.[right] - Char.code 'A' in
      count.(idx) <- count.(idx) + 1;
      let mc = max max_c count.(idx) in
      if right - left + 1 - mc > k then begin
        let li = Char.code s.[left] - Char.code 'A' in
        count.(li) <- count.(li) - 1;
        go (left + 1) mc (max best (right - left)) (right + 1)
      end else
        go left mc (max best (right - left + 1)) (right + 1)
    end
  in go 0 0 0 0`,

    Clojure: `(defn character-replacement [s k]
  (let [chars (vec s)]
    (loop [left 0 right 0 max-c 0 freq {} best 0]
      (if (>= right (count chars)) best
        (let [ch (chars right)
              freq (update freq ch (fnil inc 0))
              mc (max max-c (freq ch))]
          (if (> (- (inc (- right left)) mc) k)
            (let [lc (chars left)
                  freq (update freq lc dec)]
              (recur (inc left) (inc right) mc freq (max best (- right left))))
            (recur left (inc right) mc freq (max best (- (inc right) left)))))))))`,

    Lisp: `(defun character-replacement (s k)
  (let ((count (make-array 26 :initial-element 0))
        (left 0) (max-c 0) (best 0))
    (dotimes (right (length s) best)
      (let ((idx (- (char-code (char s right)) (char-code #\\A))))
        (incf (aref count idx))
        (setf max-c (max max-c (aref count idx)))
        (when (> (- (1+ (- right left)) max-c) k)
          (decf (aref count (- (char-code (char s left)) (char-code #\\A))))
          (incf left))
        (setf best (max best (- (1+ right) left)))))))`,
  },

  // ─── Problem 164: Non-overlapping Intervals (LC 435) ───────────────────────
  164: {
    TypeScript: `function eraseOverlapIntervals(intervals: number[][]): number {
  const sorted = [...intervals].sort((a, b) => a[1] - b[1]);
  return sorted.reduce(
    ([count, end], [s, e]) =>
      s < end ? [count + 1, end] as [number, number]
              : [count, e] as [number, number],
    [0, -Infinity] as [number, number]
  )[0];
}`,

    Haskell: `import Data.List (sortBy)
import Data.Ord (comparing)

eraseOverlapIntervals :: [(Int, Int)] -> Int
eraseOverlapIntervals intervals =
  let sorted = sortBy (comparing snd) intervals
      go _ [] = 0
      go end ((s, e):rest)
        | s < end  = 1 + go end rest
        | otherwise = go e rest
  in go (minBound :: Int) sorted`,

    Elixir: `defmodule NonOverlap do
  def erase_overlap_intervals(intervals) do
    intervals
    |> Enum.sort_by(&elem(&1, 1))
    |> Enum.reduce({0, -1_000_000_000}, fn [s, e], {count, last_end} ->
      if s < last_end, do: {count + 1, last_end}, else: {count, e}
    end)
    |> elem(0)
  end
end`,

    Rust: `fn erase_overlap_intervals(intervals: &mut Vec<Vec<i32>>) -> i32 {
    intervals.sort_by_key(|i| i[1]);
    intervals.iter().fold((0, i32::MIN), |(count, end), iv| {
        if iv[0] < end { (count + 1, end) }
        else { (count, iv[1]) }
    }).0
}`,

    Scala: `def eraseOverlapIntervals(intervals: Array[Array[Int]]): Int = {
  val sorted = intervals.sortBy(_(1))
  sorted.foldLeft((0, Int.MinValue)) { case ((count, end), iv) =>
    if (iv(0) < end) (count + 1, end)
    else (count, iv(1))
  }._1
}`,

    OCaml: `let erase_overlap_intervals intervals =
  let sorted = List.sort (fun (_, e1) (_, e2) -> compare e1 e2) intervals in
  let rec go last_end = function
    | [] -> 0
    | (s, e) :: rest ->
      if s < last_end then 1 + go last_end rest
      else go e rest
  in go min_int sorted`,

    Clojure: `(defn erase-overlap-intervals [intervals]
  (let [sorted (sort-by second intervals)]
    (first
      (reduce (fn [[cnt end] [s e]]
                (if (< s end) [(inc cnt) end] [cnt e]))
              [0 Long/MIN_VALUE] sorted))))`,

    Lisp: `(defun erase-overlap-intervals (intervals)
  (let ((sorted (sort (copy-seq intervals) #'< :key #'second))
        (count 0) (end most-negative-fixnum))
    (dolist (iv sorted count)
      (if (< (first iv) end)
        (incf count)
        (setf end (second iv))))))`,
  },

  // ─── Problem 165: Path Sum III (LC 437) ────────────────────────────────────
  165: {
    TypeScript: `interface TreeNode { val: number; left: TreeNode | null; right: TreeNode | null; }

function pathSum(root: TreeNode | null, targetSum: number): number {
  const dfs = (node: TreeNode | null, prefix: Map<number, number>, curr: number): number => {
    if (!node) return 0;
    const sum = curr + node.val;
    const count = prefix.get(sum - targetSum) ?? 0;
    const newPrefix = new Map(prefix);
    newPrefix.set(sum, (newPrefix.get(sum) ?? 0) + 1);
    return count + dfs(node.left, newPrefix, sum) + dfs(node.right, newPrefix, sum);
  };
  return dfs(root, new Map([[0, 1]]), 0);
}`,

    Haskell: `import qualified Data.Map.Strict as Map

data Tree = Nil | Node Int Tree Tree

pathSum :: Tree -> Int -> Int
pathSum root target =
  let dfs Nil _ _ = 0
      dfs (Node v l r) prefix curr =
        let s = curr + v
            count = Map.findWithDefault 0 (s - target) prefix
            prefix' = Map.insertWith (+) s 1 prefix
        in count + dfs l prefix' s + dfs r prefix' s
  in dfs root (Map.singleton 0 1) 0`,

    Elixir: `defmodule PathSumIII do
  def path_sum(nil, _target), do: 0
  def path_sum(root, target) do
    dfs(root, %{0 => 1}, 0, target)
  end

  defp dfs(nil, _prefix, _curr, _target), do: 0
  defp dfs({val, left, right}, prefix, curr, target) do
    sum = curr + val
    count = Map.get(prefix, sum - target, 0)
    prefix = Map.update(prefix, sum, 1, &(&1 + 1))
    count + dfs(left, prefix, sum, target) + dfs(right, prefix, sum, target)
  end
end`,

    Rust: `use std::collections::HashMap;
use std::rc::Rc;
use std::cell::RefCell;

type TreeLink = Option<Rc<RefCell<TreeNode>>>;
struct TreeNode { val: i32, left: TreeLink, right: TreeLink }

fn path_sum(root: &TreeLink, target: i64) -> i32 {
    fn dfs(node: &TreeLink, prefix: &mut HashMap<i64, i32>, curr: i64, target: i64) -> i32 {
        match node {
            None => 0,
            Some(n) => {
                let n = n.borrow();
                let sum = curr + n.val as i64;
                let count = *prefix.get(&(sum - target)).unwrap_or(&0);
                *prefix.entry(sum).or_insert(0) += 1;
                let res = count + dfs(&n.left, prefix, sum, target)
                                + dfs(&n.right, prefix, sum, target);
                *prefix.get_mut(&sum).unwrap() -= 1;
                res
            }
        }
    }
    let mut prefix = HashMap::from([(0i64, 1)]);
    dfs(root, &mut prefix, 0, target)
}`,

    Scala: `case class TreeNode(value: Int, left: Option[TreeNode] = None, right: Option[TreeNode] = None)

def pathSum(root: Option[TreeNode], target: Int): Int = {
  def dfs(node: Option[TreeNode], prefix: Map[Long, Int], curr: Long): Int = node match {
    case None => 0
    case Some(n) =>
      val sum = curr + n.value
      val count = prefix.getOrElse(sum - target, 0)
      val prefix2 = prefix.updated(sum, prefix.getOrElse(sum, 0) + 1)
      count + dfs(n.left, prefix2, sum) + dfs(n.right, prefix2, sum)
  }
  dfs(root, Map(0L -> 1), 0L)
}`,

    OCaml: `type tree = Nil | Node of int * tree * tree

let path_sum root target =
  let module M = Map.Make(Int) in
  let rec dfs node prefix curr = match node with
    | Nil -> 0
    | Node (v, l, r) ->
      let sum_ = curr + v in
      let count = try M.find (sum_ - target) prefix with Not_found -> 0 in
      let prefix' = M.add sum_ ((try M.find sum_ prefix with Not_found -> 0) + 1) prefix in
      count + dfs l prefix' sum_ + dfs r prefix' sum_
  in dfs root (M.singleton 0 1) 0`,

    Clojure: `(defn path-sum [root target]
  (letfn [(dfs [node prefix curr]
            (if (nil? node) 0
              (let [{:keys [val left right]} node
                    s (+ curr val)
                    cnt (get prefix (- s target) 0)
                    prefix' (update prefix s (fnil inc 0))]
                (+ cnt (dfs left prefix' s) (dfs right prefix' s)))))]
    (dfs root {0 1} 0)))`,

    Lisp: `(defstruct tnode val left right)

(defun path-sum (root target)
  (labels ((dfs (node prefix curr)
             (if (null node) 0
               (let* ((s (+ curr (tnode-val node)))
                      (cnt (gethash (- s target) prefix 0))
                      (p2 (let ((h (make-hash-table)))
                            (maphash (lambda (k v) (setf (gethash k h) v)) prefix)
                            (incf (gethash s h 0)) h)))
                 (+ cnt (dfs (tnode-left node) p2 s)
                        (dfs (tnode-right node) p2 s))))))
    (let ((init (make-hash-table)))
      (setf (gethash 0 init) 1)
      (dfs root init 0))))`,
  },

  // ─── Problem 166: Find All Anagrams in a String (LC 438) ──────────────────
  166: {
    TypeScript: `function findAnagrams(s: string, p: string): number[] {
  const pFreq = [...p].reduce((m, c) => m.set(c, (m.get(c) ?? 0) + 1), new Map<string, number>());
  const wFreq = new Map<string, number>();
  const pLen = p.length;
  return [...s].reduce<[number[], number]>(([result, left], ch, right) => {
    wFreq.set(ch, (wFreq.get(ch) ?? 0) + 1);
    if (right - left + 1 > pLen) {
      const lc = s[left];
      wFreq.set(lc, wFreq.get(lc)! - 1);
      if (wFreq.get(lc) === 0) wFreq.delete(lc);
      left++;
    }
    if (right - left + 1 === pLen &&
        [...pFreq].every(([k, v]) => wFreq.get(k) === v))
      return [[...result, left], left] as [number[], number];
    return [result, left] as [number[], number];
  }, [[], 0])[0];
}`,

    Haskell: `import qualified Data.Map.Strict as Map

findAnagrams :: String -> String -> [Int]
findAnagrams s p =
  let pFreq = foldl (\\m c -> Map.insertWith (+) c 1 m) Map.empty p
      pLen = length p
      go _ _ [] = []
      go left wFreq chars
        | length (take (pLen + 1) $ drop left s) > pLen =
          let wFreq' = Map.adjust (subtract 1) (s !! left) wFreq
              cleaned = Map.filter (> 0) wFreq'
          in go (left+1) cleaned chars
        | otherwise = []
      slide _ wFreq _ [] = []
      slide left wFreq right (c:rest) =
        let wFreq' = Map.insertWith (+) c 1 wFreq
            wLen = right - left + 1
        in if wLen > pLen
           then let lc = s !! left
                    wf = Map.adjust (subtract 1) lc wFreq'
                    wf' = Map.filter (> 0) wf
                in (if wLen - 1 == pLen && wf' == pFreq then [left+1] else [])
                    ++ slide (left+1) wf' (right+1) rest
           else (if wLen == pLen && wFreq' == pFreq then [left] else [])
                    ++ slide left wFreq' (right+1) rest
  in slide 0 Map.empty 0 s`,

    Elixir: `defmodule Anagrams do
  def find_anagrams(s, p) do
    p_freq = p |> String.graphemes() |> Enum.frequencies()
    p_len = String.length(p)
    chars = String.graphemes(s)
    chars
    |> Enum.with_index()
    |> Enum.reduce({[], 0, %{}}, fn {ch, right}, {result, left, w_freq} ->
      w_freq = Map.update(w_freq, ch, 1, &(&1 + 1))
      {left, w_freq} = if right - left + 1 > p_len do
        lc = Enum.at(chars, left)
        wf = Map.update!(w_freq, lc, &(&1 - 1))
        wf = if wf[lc] == 0, do: Map.delete(wf, lc), else: wf
        {left + 1, wf}
      else
        {left, w_freq}
      end
      if right - left + 1 == p_len and w_freq == p_freq,
        do: {[left | result], left, w_freq},
        else: {result, left, w_freq}
    end)
    |> elem(0)
    |> Enum.reverse()
  end
end`,

    Rust: `fn find_anagrams(s: &str, p: &str) -> Vec<usize> {
    let (sb, pb) = (s.as_bytes(), p.as_bytes());
    if sb.len() < pb.len() { return vec![]; }
    let mut p_freq = [0i32; 26];
    let mut w_freq = [0i32; 26];
    for &b in pb { p_freq[(b - b'a') as usize] += 1; }
    let mut result = vec![];
    for i in 0..sb.len() {
        w_freq[(sb[i] - b'a') as usize] += 1;
        if i >= pb.len() {
            w_freq[(sb[i - pb.len()] - b'a') as usize] -= 1;
        }
        if w_freq == p_freq { result.push(i + 1 - pb.len()); }
    }
    result
}`,

    Scala: `def findAnagrams(s: String, p: String): List[Int] = {
  val pFreq = p.groupBy(identity).view.mapValues(_.length).toMap
  val pLen = p.length
  s.indices.foldLeft((List.empty[Int], 0, Map.empty[Char, Int])) {
    case ((result, left, wFreq), right) =>
      val ch = s(right)
      val wf = wFreq.updated(ch, wFreq.getOrElse(ch, 0) + 1)
      val (l2, wf2) = if (right - left + 1 > pLen) {
        val lc = s(left)
        val f = wf(lc) - 1
        (left + 1, if (f == 0) wf - lc else wf.updated(lc, f))
      } else (left, wf)
      if (right - l2 + 1 == pLen && wf2 == pFreq) (l2 :: result, l2, wf2)
      else (result, l2, wf2)
  }._1.reverse
}`,

    OCaml: `let find_anagrams s p =
  let n = String.length s and pn = String.length p in
  if n < pn then []
  else
    let p_freq = Array.make 26 0 and w_freq = Array.make 26 0 in
    String.iter (fun c -> p_freq.(Char.code c - Char.code 'a') <-
      p_freq.(Char.code c - Char.code 'a') + 1) p;
    let result = ref [] in
    for i = 0 to n - 1 do
      let idx = Char.code s.[i] - Char.code 'a' in
      w_freq.(idx) <- w_freq.(idx) + 1;
      if i >= pn then begin
        let li = Char.code s.[i - pn] - Char.code 'a' in
        w_freq.(li) <- w_freq.(li) - 1
      end;
      if p_freq = w_freq then result := (i + 1 - pn) :: !result
    done;
    List.rev !result`,

    Clojure: `(defn find-anagrams [s p]
  (let [p-freq (frequencies p)
        p-len (count p)]
    (loop [i 0 left 0 w-freq {} result []]
      (if (>= i (count s)) result
        (let [ch (nth s i)
              wf (update w-freq ch (fnil inc 0))
              [left wf] (if (> (- (inc i) left) p-len)
                          (let [lc (nth s left)
                                f (dec (wf lc))]
                            [(inc left) (if (zero? f) (dissoc wf lc) (assoc wf lc f))])
                          [left wf])]
          (recur (inc i) left wf
            (if (and (= (- (inc i) left) p-len) (= wf p-freq))
              (conj result left) result)))))))`,

    Lisp: `(defun find-anagrams (s p)
  (let ((p-freq (make-array 26 :initial-element 0))
        (w-freq (make-array 26 :initial-element 0))
        (pn (length p)) (result nil))
    (dotimes (i pn) (incf (aref p-freq (- (char-code (char p i)) (char-code #\\a)))))
    (dotimes (i (length s) (nreverse result))
      (incf (aref w-freq (- (char-code (char s i)) (char-code #\\a))))
      (when (>= i pn)
        (decf (aref w-freq (- (char-code (char s (- i pn)) ) (char-code #\\a)))))
      (when (equalp w-freq p-freq)
        (push (1+ (- i pn)) result)))))`,
  },

  // ─── Problem 167: K Closest Points to Origin (LC 973) ─────────────────────
  167: {
    TypeScript: `function kClosest(points: number[][], k: number): number[][] {
  return [...points]
    .sort((a, b) => (a[0] ** 2 + a[1] ** 2) - (b[0] ** 2 + b[1] ** 2))
    .slice(0, k);
}`,

    Haskell: `import Data.List (sortBy)
import Data.Ord (comparing)

kClosest :: [[Int]] -> Int -> [[Int]]
kClosest points k =
  take k $ sortBy (comparing (\\[x, y] -> x*x + y*y)) points`,

    Elixir: `defmodule KClosest do
  def k_closest(points, k) do
    points
    |> Enum.sort_by(fn [x, y] -> x * x + y * y end)
    |> Enum.take(k)
  end
end`,

    Rust: `fn k_closest(points: &mut Vec<Vec<i32>>, k: usize) -> Vec<Vec<i32>> {
    points.sort_by_key(|p| p[0] * p[0] + p[1] * p[1]);
    points[..k].to_vec()
}`,

    Scala: `def kClosest(points: Array[Array[Int]], k: Int): Array[Array[Int]] =
  points.sortBy(p => p(0) * p(0) + p(1) * p(1)).take(k)`,

    OCaml: `let k_closest points k =
  points
  |> List.sort (fun [x1;y1] [x2;y2] ->
    compare (x1*x1 + y1*y1) (x2*x2 + y2*y2))
  |> List.filteri (fun i _ -> i < k)`,

    Clojure: `(defn k-closest [points k]
  (->> points
       (sort-by (fn [[x y]] (+ (* x x) (* y y))))
       (take k)
       vec))`,

    Lisp: `(defun k-closest (points k)
  (subseq
    (sort (copy-seq points)
          (lambda (a b)
            (< (+ (* (first a) (first a)) (* (second a) (second a)))
               (+ (* (first b) (first b)) (* (second b) (second b))))))
    0 k))`,
  },

  // ─── Problem 168: Squares of a Sorted Array (LC 977) ──────────────────────
  168: {
    TypeScript: `function sortedSquares(nums: number[]): number[] {
  const n = nums.length;
  const result: number[] = new Array(n);
  const build = (l: number, r: number, i: number): number[] => {
    if (i < 0) return result;
    if (Math.abs(nums[l]) >= Math.abs(nums[r])) {
      result[i] = nums[l] ** 2;
      return build(l + 1, r, i - 1);
    }
    result[i] = nums[r] ** 2;
    return build(l, r - 1, i - 1);
  };
  return build(0, n - 1, n - 1);
}`,

    Haskell: `sortedSquares :: [Int] -> [Int]
sortedSquares nums =
  let arr = listArray (0, length nums - 1) nums
      merge l r
        | l > r = []
        | abs (arr ! l) >= abs (arr ! r) =
            (arr ! l)^2 : merge (l+1) r
        | otherwise = (arr ! r)^2 : merge l (r-1)
  in reverse $ merge 0 (length nums - 1)

-- uses Data.Array`,

    Elixir: `defmodule SortedSquares do
  def sorted_squares(nums) do
    merge(nums, Enum.reverse(nums), []) |> Enum.reverse() |> Enum.take(length(nums))
  end

  def sorted_squares_simple(nums) do
    nums |> Enum.map(&(&1 * &1)) |> Enum.sort()
  end

  defp merge([], _, acc), do: acc
  defp merge(_, [], acc), do: acc
  defp merge([l | lr], [r | rr], acc) do
    if abs(l) >= abs(r),
      do: merge(lr, [r | rr], [l * l | acc]),
      else: merge([l | lr], rr, [r * r | acc])
  end
end`,

    Rust: `fn sorted_squares(nums: &[i32]) -> Vec<i32> {
    let n = nums.len();
    let mut result = vec![0; n];
    let (mut l, mut r, mut i) = (0, n - 1, n - 1);
    loop {
        if nums[l].abs() >= nums[r].abs() {
            result[i] = nums[l] * nums[l];
            l += 1;
        } else {
            result[i] = nums[r] * nums[r];
            if r == 0 { break; }
            r -= 1;
        }
        if i == 0 { break; }
        i -= 1;
    }
    result
}`,

    Scala: `def sortedSquares(nums: Array[Int]): Array[Int] = {
  val n = nums.length
  val result = new Array[Int](n)
  def merge(l: Int, r: Int, i: Int): Array[Int] = {
    if (i < 0) result
    else if (math.abs(nums(l)) >= math.abs(nums(r))) {
      result(i) = nums(l) * nums(l); merge(l + 1, r, i - 1)
    } else {
      result(i) = nums(r) * nums(r); merge(l, r - 1, i - 1)
    }
  }
  merge(0, n - 1, n - 1)
}`,

    OCaml: `let sorted_squares nums =
  let arr = Array.of_list nums in
  let n = Array.length arr in
  let result = Array.make n 0 in
  let rec merge l r i =
    if i < 0 then Array.to_list result
    else if abs arr.(l) >= abs arr.(r) then begin
      result.(i) <- arr.(l) * arr.(l); merge (l + 1) r (i - 1)
    end else begin
      result.(i) <- arr.(r) * arr.(r); merge l (r - 1) (i - 1)
    end
  in merge 0 (n - 1) (n - 1)`,

    Clojure: `(defn sorted-squares [nums]
  (let [n (count nums)
        arr (vec nums)]
    (loop [l 0 r (dec n) i (dec n) result (vec (repeat n 0))]
      (if (< i 0) result
        (if (>= (abs (arr l)) (abs (arr r)))
          (recur (inc l) r (dec i) (assoc result i (* (arr l) (arr l))))
          (recur l (dec r) (dec i) (assoc result i (* (arr r) (arr r)))))))))`,

    Lisp: `(defun sorted-squares (nums)
  (let* ((n (length nums))
         (arr (coerce nums 'vector))
         (result (make-array n :initial-element 0)))
    (labels ((merge-sq (l r i)
               (when (>= i 0)
                 (if (>= (abs (aref arr l)) (abs (aref arr r)))
                   (progn (setf (aref result i) (* (aref arr l) (aref arr l)))
                          (merge-sq (1+ l) r (1- i)))
                   (progn (setf (aref result i) (* (aref arr r) (aref arr r)))
                          (merge-sq l (1- r) (1- i)))))))
      (merge-sq 0 (1- n) (1- n))
      (coerce result 'list))))`,
  },

  // ─── Problem 169: Time Based Key-Value Store (LC 981) ─────────────────────
  169: {
    TypeScript: `class TimeMap {
  private store = new Map<string, [number, string][]>();

  set(key: string, value: string, timestamp: number): void {
    this.store.set(key, [...(this.store.get(key) ?? []), [timestamp, value]]);
  }

  get(key: string, timestamp: number): string {
    const entries = this.store.get(key) ?? [];
    const bsearch = (lo: number, hi: number): string => {
      if (lo > hi) return hi >= 0 ? entries[hi][1] : "";
      const mid = (lo + hi) >> 1;
      return entries[mid][0] <= timestamp
        ? bsearch(mid + 1, hi)
        : bsearch(lo, mid - 1);
    };
    return bsearch(0, entries.length - 1);
  }
}`,

    Haskell: `import qualified Data.Map.Strict as Map

type TimeMap = Map.Map String [(Int, String)]

empty :: TimeMap
empty = Map.empty

set :: String -> String -> Int -> TimeMap -> TimeMap
set key value ts tm =
  Map.insertWith (++) key [(ts, value)] tm

get :: String -> Int -> TimeMap -> String
get key ts tm =
  case Map.lookup key tm of
    Nothing -> ""
    Just entries ->
      let sorted = reverse entries
          bsearch [] = ""
          bsearch ((t, v):rest)
            | t <= ts   = v
            | otherwise = bsearch rest
      in bsearch sorted`,

    Elixir: `defmodule TimeMap do
  def new, do: %{}

  def set(tm, key, value, timestamp) do
    Map.update(tm, key, [{timestamp, value}], &[{timestamp, value} | &1])
  end

  def get(tm, key, timestamp) do
    entries = Map.get(tm, key, []) |> Enum.sort()
    bsearch(entries, timestamp, "")
  end

  defp bsearch([], _ts, acc), do: acc
  defp bsearch([{t, v} | rest], ts, acc) do
    if t <= ts, do: bsearch(rest, ts, v), else: acc
  end
end`,

    Rust: `use std::collections::HashMap;

struct TimeMap {
    store: HashMap<String, Vec<(i32, String)>>,
}

impl TimeMap {
    fn new() -> Self { TimeMap { store: HashMap::new() } }

    fn set(&mut self, key: String, value: String, timestamp: i32) {
        self.store.entry(key).or_default().push((timestamp, value));
    }

    fn get(&self, key: &str, timestamp: i32) -> String {
        match self.store.get(key) {
            None => String::new(),
            Some(entries) => {
                match entries.partition_point(|(t, _)| *t <= timestamp) {
                    0 => String::new(),
                    i => entries[i - 1].1.clone(),
                }
            }
        }
    }
}`,

    Scala: `import scala.collection.immutable.TreeMap

class TimeMap {
  private var store = Map.empty[String, TreeMap[Int, String]]

  def set(key: String, value: String, timestamp: Int): Unit =
    store = store.updated(key, store.getOrElse(key, TreeMap.empty) + (timestamp -> value))

  def get(key: String, timestamp: Int): String =
    store.get(key).flatMap(_.to(timestamp).lastOption.map(_._2)).getOrElse("")
}`,

    OCaml: `module StringMap = Map.Make(String)
module IntMap = Map.Make(Int)

type time_map = string IntMap.t StringMap.t ref

let create () : time_map = ref StringMap.empty

let set tm key value timestamp =
  let inner = try StringMap.find key !tm with Not_found -> IntMap.empty in
  tm := StringMap.add key (IntMap.add timestamp value inner) !tm

let get tm key timestamp =
  try
    let inner = StringMap.find key !tm in
    let (_, v, _) = IntMap.split timestamp inner in
    match v with
    | Some v -> v
    | None ->
      (try let (_, v) = IntMap.max_binding (IntMap.filter (fun k _ -> k <= timestamp) inner) in v
       with Not_found -> "")
  with Not_found -> ""`,

    Clojure: `(defn time-map-new [] {})

(defn time-map-set [tm key value timestamp]
  (update tm key (fnil conj []) [timestamp value]))

(defn time-map-get [tm key timestamp]
  (let [entries (get tm key [])
        ;; entries are in insertion order (ascending timestamps)
        bsearch (fn [es lo hi]
                  (if (> lo hi) (if (>= hi 0) (second (es hi)) "")
                    (let [mid (quot (+ lo hi) 2)]
                      (if (<= (first (es mid)) timestamp)
                        (recur es (inc mid) hi)
                        (recur es lo (dec mid))))))]
    (bsearch (vec entries) 0 (dec (count entries)))))`,

    Lisp: `(defstruct time-map (store (make-hash-table :test 'equal)))

(defun tm-set (tm key value timestamp)
  (push (cons timestamp value) (gethash key (time-map-store tm))))

(defun tm-get (tm key timestamp)
  (let* ((entries (sort (copy-list (gethash key (time-map-store tm)))
                        #'< :key #'car))
         (result ""))
    (dolist (e entries result)
      (if (<= (car e) timestamp)
        (setf result (cdr e))
        (return result)))))`,
  },
};

export const SOLUTIONS: SolutionsRegistry =
  withDerivedLanguages(BASE_SOLUTIONS);

export const SOLVED_IDS = new Set<number>(Object.keys(SOLUTIONS).map(Number));
