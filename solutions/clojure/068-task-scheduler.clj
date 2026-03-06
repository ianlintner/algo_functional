;; Problem 68: Task Scheduler (LeetCode 621)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn least-interval [tasks n]
  (let [freqs (vals (frequencies tasks))
        max-freq (apply max freqs)
        max-count (count (filter #(= % max-freq) freqs))]
    (max (count tasks) (+ (* (dec max-freq) (inc n)) max-count))))
