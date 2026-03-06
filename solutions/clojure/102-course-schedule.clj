;; Problem 102: Course Schedule (LeetCode 207)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn can-finish [n prereqs]
  (let [graph (reduce (fn [g [a b]] (update g b (fnil conj []) a)) {} prereqs)
        dfs (fn dfs [v [path done]]
              (cond
                (done v) [false [path done]]
                (path v) [true [path done]]
                :else (let [[cyc [p d]]
                            (reduce (fn [[c s] nb] (if c [true s] (dfs nb s)))
                                    [false [(conj path v) done]]
                                    (get graph v []))]
                        [cyc [p (conj d v)]])))]
    (not (first (reduce (fn [[c s] i] (if c [true s] (dfs i s)))
                        [false [#{} #{}]] (range n))))))
