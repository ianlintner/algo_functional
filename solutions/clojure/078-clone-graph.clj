;; Problem 78: Clone Graph (LeetCode 133)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn clone-graph [node]
  (letfn [(dfs [n visited]
            (if (contains? visited (:val n))
              [(visited (:val n)) visited]
              (let [clone {:val (:val n) :neighbors []}
                    vis (assoc visited (:val n) clone)
                    [nbrs vis2] (reduce (fn [[acc vs] nb]
                                          (let [[cn vs2] (dfs nb vs)]
                                            [(conj acc cn) vs2]))
                                        [[] vis] (:neighbors n))]
                [(assoc clone :neighbors nbrs) vis2])))]
    (first (dfs node {}))))
