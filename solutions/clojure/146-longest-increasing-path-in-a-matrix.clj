;; Problem 146: Longest Increasing Path in a Matrix (LeetCode 329)
;; Difficulty: Hard
;; Language: Clojure
;; 
(defn longest-increasing-path [matrix]
  (let [rows (count matrix) cols (count (first matrix))
        grid (into {} (for [r (range rows) c (range cols)]
               [[r c] (get-in matrix [r c])]))
        memo (atom {})]
    (letfn [(dfs [r c]
              (or (@memo [r c])
                (let [v (grid [r c])
                      best (reduce (fn [mx [dr dc]]
                              (let [nr (+ r dr) nc (+ c dc)]
                                (if (and (>= nr 0) (< nr rows) (>= nc 0) (< nc cols)
                                         (> (grid [nr nc]) v))
                                  (max mx (dfs nr nc)) mx)))
                            0 [[0 1] [0 -1] [1 0] [-1 0]])]
                  (swap! memo assoc [r c] (inc best))
                  (inc best))))]
      (reduce max 0 (for [r (range rows) c (range cols)] (dfs r c))))))
