;; Problem 5: Longest Palindromic Substring (LeetCode 5)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn longest-palindrome [s]
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
      (range n))))
