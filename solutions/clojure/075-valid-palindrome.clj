;; Problem 75: Valid Palindrome (LeetCode 125)
;; Difficulty: Easy
;; Language: Clojure
;; 
(defn valid-palindrome? [s]
  (let [cleaned (filter #(Character/isLetterOrDigit %) (.toLowerCase s))]
    (= (seq cleaned) (reverse cleaned))))
