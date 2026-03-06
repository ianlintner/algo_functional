;; Problem 42: Spiral Matrix (LeetCode 54)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn spiral-order [matrix]
  (when (seq matrix)
    (concat (first matrix)
            (spiral-order
              (mapv (comp vec reverse)
                    (apply mapv vector (rest matrix)))))))
