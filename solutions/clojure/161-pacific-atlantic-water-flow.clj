;; Problem 161: Pacific Atlantic Water Flow (LeetCode 417)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn pacific-atlantic [heights]
  (let [rows (count heights) cols (count (first heights))
        get-h (fn [r c] (nth (nth heights r) c))
        dfs (fn dfs [visited [r c]]
              (if (visited [r c]) visited
                (reduce (fn [v [dr dc]]
                  (let [nr (+ r dr) nc (+ c dc)]
                    (if (and (>= nr 0) (< nr rows) (>= nc 0) (< nc cols)
                             (not (v [nr nc]))
                             (>= (get-h nr nc) (get-h r c)))
                      (dfs v [nr nc]) v)))
                  (conj visited [r c])
                  [[1 0] [-1 0] [0 1] [0 -1]])))
        pac-starts (concat (map #(vector % 0) (range rows))
                           (map #(vector 0 %) (range cols)))
        atl-starts (concat (map #(vector % (dec cols)) (range rows))
                           (map #(vector (dec rows) %) (range cols)))
        pac (reduce dfs #{} pac-starts)
        atl (reduce dfs #{} atl-starts)]
    (vec (clojure.set/intersection pac atl))))
