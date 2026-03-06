;; Problem 10: Rotting Oranges (LeetCode 994)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn oranges-rotting [grid]
  (let [rows (count grid) cols (count (first grid))
        cells (for [r (range rows) c (range cols)]
                [[r c] (get-in grid [r c])])
        rotten (map first (filter #(= 2 (second %)) cells))
        fresh  (set (map first (filter #(= 1 (second %)) cells)))
        dirs [[0 1] [0 -1] [1 0] [-1 0]]]
    (loop [q (vec rotten), fr fresh, time 0]
      (cond
        (empty? fr) time
        (empty? q) -1
        :else
        (let [{:keys [nq nf]}
              (reduce (fn [{:keys [nq nf]} [r c]]
                        (reduce (fn [{:keys [nq nf]} [dr dc]]
                                  (let [nr (+ r dr) nc (+ c dc)]
                                    (if (and (>= nr 0) (< nr rows)
                                             (>= nc 0) (< nc cols)
                                             (contains? nf [nr nc]))
                                      {:nq (conj nq [nr nc]) :nf (disj nf [nr nc])}
                                      {:nq nq :nf nf})))
                                {:nq nq :nf nf} dirs))
                      {:nq [] :nf fr} q)]
          (if (empty? nq)
            (if (empty? nf) time -1)
            (recur nq nf (inc time))))))))
