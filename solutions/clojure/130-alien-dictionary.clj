;; Problem 130: Alien Dictionary (LeetCode 269)
;; Difficulty: Hard
;; Language: Clojure
;; 
(defn alien-order [words]
  (let [chars (set (apply concat words))
        edges (for [[w1 w2] (partition 2 1 words)
                    :let [pair (first (filter (fn [[a b]] (not= a b))
                                 (map vector w1 w2)))]
                    :when pair]
                pair)
        graph (reduce (fn [g [u v]] (update g u (fnil conj #{}) v))
                (zipmap chars (repeat #{})) edges)
        in-deg (reduce (fn [m [_ v]] (update m v (fnil inc) 0))
                 (zipmap chars (repeat 0)) edges)]
    (loop [q (vec (filter #(zero? (in-deg %)) chars))
           res [] deg in-deg]
      (if (empty? q)
        (if (= (count res) (count chars)) (apply str res) "")
        (let [c (first q)
              nbs (graph c #{})
              [deg' q'] (reduce (fn [[d qq] n]
                          (let [d (update d n dec)]
                            (if (zero? (d n))
                              [d (conj qq n)] [d qq])))
                        [deg (vec (rest q))] nbs)]
          (recur q' (conj res c) deg'))))))
