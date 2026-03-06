;; Problem 88: Maximum Width of Binary Tree (LeetCode 662)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn width-of-binary-tree [root]
  (if (nil? root) 0
    (loop [level [[root 0]] max-w 0]
      (if (empty? level) max-w
        (let [w (- (second (last level)) (second (first level)) -1)
              nxt (mapcat (fn [[n i]]
                    (concat
                      (when (:left n)  [[(:left n) (* 2 i)]])
                      (when (:right n) [[(:right n) (inc (* 2 i))]])))
                    level)]
          (recur nxt (max w max-w)))))))
