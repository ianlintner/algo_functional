;; Problem 23: Reverse Nodes in k-Group (LeetCode 25)
;; Difficulty: Hard
;; Language: Clojure
;; 
(defn reverse-k-group [lst k]
  (let [[group rest] (split-at k lst)]
    (if (< (count group) k)
      lst
      (concat (reverse group) (lazy-seq (reverse-k-group rest k))))))
