;; Problem 31: Shortest Path to Get Food (LeetCode 1730)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn get-food [grid]
  (let [rows (count grid) cols (count (first grid))
        start (first (for [i (range rows) j (range cols)
                           :when (= (get-in grid [i j]) \*)] [i j]))
        dirs [[0 1] [0 -1] [1 0] [-1 0]]]
    (loop [queue (conj clojure.lang.PersistentQueue/EMPTY
                       [(first start) (second start) 0])
           visited #{start}]
      (if (empty? queue) -1
        (let [[r c d] (peek queue)
              queue (pop queue)
              neighbors (for [[dr dc] dirs
                              :let [nr (+ r dr) nc (+ c dc)]
                              :when (and (>= nr 0) (< nr rows)
                                        (>= nc 0) (< nc cols)
                                        (not= (get-in grid [nr nc]) \X)
                                        (not (visited [nr nc])))]
                          [nr nc])]
          (if-let [food (first (filter #(= (get-in grid %) \#) neighbors))]
            (inc d)
            (recur (reduce #(conj %1 [(first %2) (second %2) (inc d)]) queue neighbors)
                   (into visited neighbors))))))))
