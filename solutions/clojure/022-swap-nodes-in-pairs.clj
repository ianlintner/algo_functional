;; Problem 22: Swap Nodes in Pairs (LeetCode 24)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn swap-pairs [lst]
  (cond
    (empty? lst) []
    (= (count lst) 1) lst
    :else (let [[x y & rest] lst]
            (cons y (cons x (swap-pairs rest))))))
