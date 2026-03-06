;; Problem 24: 01 Matrix (LeetCode 542)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn update-matrix [mat]
  (let [rows (count mat) cols (count (first mat))
        inf (+ rows cols)
        init (vec (for [r (range rows)]
                (vec (for [c (range cols)]
                  (if (zero? (get-in mat [r c])) 0 inf)))))
        tl (reduce (fn [d [r c]]
              (let [v (get-in d [r c])
                    top (if (> r 0) (inc (get-in d [(dec r) c])) inf)
                    left (if (> c 0) (inc (get-in d [r (dec c)])) inf)]
                (assoc-in d [r c] (min v top left))))
            init (for [r (range rows) c (range cols)] [r c]))
        br (reduce (fn [d [r c]]
              (let [v (get-in d [r c])
                    bot (if (< r (dec rows)) (inc (get-in d [(inc r) c])) inf)
                    rt  (if (< c (dec cols)) (inc (get-in d [r (inc c)])) inf)]
                (assoc-in d [r c] (min v bot rt))))
            tl (for [r (reverse (range rows)) c (reverse (range cols))] [r c]))]
    br))
