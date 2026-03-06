;; Problem 32: Combination Sum (LeetCode 39)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn combination-sum [candidates target]
  (let [sorted (sort candidates)]
    (letfn [(go [cands remain curr]
              (cond
                (zero? remain) [(vec (reverse curr))]
                (empty? cands) []
                (> (first cands) remain) []
                :else (concat
                        (go cands (- remain (first cands)) (cons (first cands) curr))
                        (go (rest cands) remain curr))))]
      (go sorted target '()))))
