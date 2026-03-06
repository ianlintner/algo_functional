;; Problem 100: Number of Islands (LeetCode 200)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn num-islands [grid]
  (let [rows (count grid) cols (count (first grid))
        at (fn [r c] (get-in grid [r c]))]
    (letfn [(flood [r c vis]
              (if (or (< r 0) (>= r rows) (< c 0) (>= c cols)
                      (not= (at r c) \1) (vis [r c]))
                vis
                (reduce (fn [v [dr dc]] (flood (+ r dr) (+ c dc) v))
                        (conj vis [r c])
                        [[-1 0] [1 0] [0 -1] [0 1]])))]
      (first
        (reduce (fn [[cnt vis] [r c]]
                  (if (or (not= (at r c) \1) (vis [r c]))
                    [cnt vis]
                    [(inc cnt) (flood r c vis)]))
                [0 #{}]
                (for [r (range rows) c (range cols)] [r c]))))))
