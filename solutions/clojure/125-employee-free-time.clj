;; Problem 125: Employee Free Time (LeetCode 759)
;; Difficulty: Hard
;; Language: Clojure
;; 
(defn employee-free-time [schedules]
  (let [sorted (sort-by first (apply concat schedules))
        merged (reduce (fn [acc [s e]]
                  (if (and (seq acc) (>= (second (last acc)) s))
                    (conj (vec (butlast acc))
                          [(first (last acc)) (max (second (last acc)) e)])
                    (conj acc [s e])))
                [] sorted)]
    (->> (partition 2 1 merged)
         (filter (fn [[[_ e1] [s2 _]]] (< e1 s2)))
         (mapv (fn [[[_ e1] [s2 _]]] [e1 s2])))))
