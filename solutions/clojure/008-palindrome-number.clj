;; Problem 8: Palindrome Number (LeetCode 9)
;; Difficulty: Easy
;; Language: Clojure
;; 
(defn is-palindrome [x]
  (if (neg? x) false
    (let [s (str x)]
      (= s (apply str (reverse s))))))
