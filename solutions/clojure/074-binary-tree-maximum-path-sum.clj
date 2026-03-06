;; Problem 74: Binary Tree Maximum Path Sum (LeetCode 124)
;; Difficulty: Hard
;; Language: Clojure
;; 
(defn max-path-sum [tree]
  (letfn [(go [node]
            (if (nil? node) [0 Long/MIN_VALUE]
              (let [{:keys [val left right]} node
                    [lg lm] (go left) [rg rm] (go right)
                    gain (max 0 (+ val (max lg rg)))
                    path-max (max lm rm (+ val lg rg))]
                [gain path-max])))]
    (second (go tree))))
