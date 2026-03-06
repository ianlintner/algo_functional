;; Problem 165: Path Sum III (LeetCode 437)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn path-sum [root target]
  (letfn [(dfs [node prefix curr]
            (if (nil? node) 0
              (let [{:keys [val left right]} node
                    s (+ curr val)
                    cnt (get prefix (- s target) 0)
                    prefix' (update prefix s (fnil inc 0))]
                (+ cnt (dfs left prefix' s) (dfs right prefix' s)))))]
    (dfs root {0 1} 0)))
