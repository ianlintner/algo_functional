;; Problem 141: Minimum Height Trees (LeetCode 310)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn find-min-height-trees [n edges]
  (if (= n 1) [0]
    (let [adj (reduce (fn [g [u v]]
                (-> g (update u (fnil conj #{}) v)
                      (update v (fnil conj #{}) u)))
              {} edges)]
      (loop [adj adj
             leaves (vec (filter #(= 1 (count (adj %))) (keys adj)))
             rem n]
        (if (<= rem 2) leaves
          (let [[new-adj new-leaves]
                (reduce (fn [[g nl] leaf]
                  (reduce (fn [[g2 nl2] nb]
                    (let [g3 (update g2 nb disj leaf)]
                      (if (= 1 (count (g3 nb)))
                        [g3 (conj nl2 nb)] [g3 nl2])))
                    [g nl] (g leaf)))
                  [adj []] leaves)]
            (recur new-adj new-leaves (- rem (count leaves)))))))))
