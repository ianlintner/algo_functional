;; Problem 160: Partition Equal Subset Sum (LeetCode 416)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn can-partition [nums]
  (let [total (reduce + nums)]
    (if (odd? total) false
      (let [target (/ total 2)
            dp (reduce (fn [dp n]
                  (into dp (map #(+ % n) dp)))
                #{0} nums)]
        (contains? dp target)))))
