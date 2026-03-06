;; Problem 17: Remove Nth Node From End of List (LeetCode 19)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn remove-nth-from-end [lst n]
  (let [len (count lst)
        idx (- len n)]
    (keep-indexed (fn [i x] (when (not= i idx) x)) lst)))
