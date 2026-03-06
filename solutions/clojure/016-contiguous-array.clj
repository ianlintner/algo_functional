;; Problem 16: Contiguous Array (LeetCode 525)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn find-max-length [nums]
  (let [[_ _ result]
        (reduce
          (fn [[seen count best] [i num]]
            (let [new-count (+ count (if (= num 1) 1 -1))
                  new-best (if-let [j (get seen new-count)]
                             (max best (- i j))
                             best)
                  new-seen (if (contains? seen new-count) seen
                             (assoc seen new-count i))]
              [new-seen new-count new-best]))
          [{0 -1} 0 0]
          (map-indexed vector nums))]
    result))
