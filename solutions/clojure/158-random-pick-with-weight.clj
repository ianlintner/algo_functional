;; Problem 158: Random Pick with Weight (LeetCode 528)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn build-picker [weights]
  (reductions + weights))

(defn pick-index [prefix]
  (let [total (last prefix)
        target (inc (rand-int total))
        ps (vec prefix)]
    (loop [lo 0 hi (dec (count ps))]
      (if (>= lo hi) lo
        (let [mid (quot (+ lo hi) 2)]
          (if (< (ps mid) target) (recur (inc mid) hi) (recur lo mid)))))))
