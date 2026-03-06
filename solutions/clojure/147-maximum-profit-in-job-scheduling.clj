;; Problem 147: Maximum Profit in Job Scheduling (LeetCode 1235)
;; Difficulty: Hard
;; Language: Clojure
;; 
(defn job-scheduling [start-time end-time profit]
  (let [jobs (sort-by second (map vector start-time end-time profit))
        n (count jobs)
        bisect (fn [v hi]
                 (loop [i (dec hi)]
                   (cond (< i 0) 0
                         (<= (second (nth jobs i)) v) (inc i)
                         :else (recur (dec i)))))]
    (nth (reduce (fn [dp i]
            (let [[s _ p] (nth jobs (dec i))
                  prev (bisect s (dec i))]
              (conj dp (max (nth dp (dec i)) (+ (nth dp prev) p)))))
          [0] (range 1 (inc n))) n)))
