;; Problem 105: Course Schedule II (LeetCode 210)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn find-order [n prereqs]
  (let [graph (reduce (fn [g [a b]] (update g b (fnil conj []) a)) {} prereqs)
        dfs (fn dfs [v {:keys [path done order cycle] :as s}]
              (cond
                (or cycle (done v)) s
                (path v) (assoc s :cycle true)
                :else
                (let [s2 (reduce (fn [st nb] (dfs nb st))
                                 (update s :path conj v)
                                 (get graph v []))]
                  (-> s2 (update :done conj v) (update :order conj v)))))]
    (let [result (reduce (fn [s i] (dfs i s))
                         {:path #{} :done #{} :order [] :cycle false}
                         (range n))]
      (if (:cycle result) [] (:order result)))))
