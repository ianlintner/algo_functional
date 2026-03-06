;; Problem 36: Rotate Image (LeetCode 48)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn rotate [matrix]
  (mapv (comp vec reverse) (apply mapv vector matrix)))
