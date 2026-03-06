;; Problem 101: Reverse Linked List (LeetCode 206)
;; Difficulty: Easy
;; Language: Clojure
;; 
(defn reverse-list [lst]
  (reduce (fn [acc x] (cons x acc)) '() lst))
