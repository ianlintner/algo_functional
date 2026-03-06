;; Problem 48: Unique Paths (LeetCode 62)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn unique-paths [m n]
  (let [k (min (dec m) (dec n))]
    (reduce (fn [acc i]
              (/ (* acc (- (+ m n 2) i 4)) (inc i)))
            1 (range k))))
