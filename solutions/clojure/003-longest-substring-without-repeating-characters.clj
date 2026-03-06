;; Problem 3: Longest Substring Without Repeating Characters (LeetCode 3)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn length-of-longest-substring [s]
  (let [[_ _ result]
        (reduce
          (fn [[left seen best] [i c]]
            (let [new-left (if-let [j (get seen c)]
                             (max left (inc j))
                             left)
                  new-seen (assoc seen c i)
                  new-best (max best (- i new-left -1))]
              [new-left new-seen new-best]))
          [0 {} 0]
          (map-indexed vector s))]
    result))
