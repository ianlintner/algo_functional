;; Problem 110: Maximal Square (LeetCode 221)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn maximal-square [matrix]
  (let [cols (count (first matrix))
        [mx _] (reduce
          (fn [[best prev] [r row]]
            (let [curr (reduce
                    (fn [acc [c cell]]
                      (conj acc
                        (if (= cell \0) 0
                          (if (or (zero? r) (zero? c)) 1
                            (inc (min (nth prev (dec c)) (nth prev c)
                                      (peek acc)))))))
                    [] (map-indexed vector row))]
              [(max best (apply max 0 curr)) curr]))
          [0 (vec (repeat cols 0))]
          (map-indexed vector matrix))]
    (* mx mx)))
