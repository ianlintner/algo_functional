;; Problem 128: Graph Valid Tree (LeetCode 261)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn valid-tree [n edges]
  (if (not= (count edges) (dec n)) false
    (let [adj (reduce (fn [g [u v]]
                (-> g (update u (fnil conj []) v)
                      (update v (fnil conj []) u)))
              {} edges)
          dfs (fn dfs [node visited]
                (if (visited node) visited
                  (reduce #(dfs %2 %1)
                    (conj visited node)
                    (get adj node []))))]
      (= n (count (dfs 0 #{}))))))
