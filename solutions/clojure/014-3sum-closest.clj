;; Problem 14: 3Sum Closest (LeetCode 16)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn three-sum-closest [nums target]
  (let [sorted (vec (sort nums))
        n (count sorted)]
    (reduce
      (fn [closest i]
        (loop [l (inc i), r (dec n), best closest]
          (if (>= l r) best
            (let [sum (+ (sorted i) (sorted l) (sorted r))
                  better (if (< (Math/abs (- sum target))
                               (Math/abs (- best target)))
                           sum best)]
              (cond
                (< sum target) (recur (inc l) r better)
                (> sum target) (recur l (dec r) better)
                :else sum)))))
      (+ (sorted 0) (sorted 1) (sorted 2))
      (range (- n 2)))))
