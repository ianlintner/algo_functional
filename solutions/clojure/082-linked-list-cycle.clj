;; Problem 82: Linked List Cycle (LeetCode 141)
;; Difficulty: Easy
;; Language: Clojure
;; 
(defn has-cycle? [head]
  (loop [slow head fast (when head (:next head))]
    (cond
      (or (nil? fast) (nil? (:next fast))) false
      (identical? slow fast) true
      :else (recur (:next slow) (:next (:next fast))))))
