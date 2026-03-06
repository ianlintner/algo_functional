;; Problem 15: Letter Combinations of a Phone Number (LeetCode 17)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn letter-combinations [digits]
  (if (empty? digits) []
    (let [phone {\2 "abc" \3 "def" \4 "ghi" \5 "jkl"
                 \6 "mno" \7 "pqrs" \8 "tuv" \9 "wxyz"}]
      (reduce
        (fn [combos d]
          (for [combo combos
                ch (phone d)]
            (str combo ch)))
        [""]
        digits))))
