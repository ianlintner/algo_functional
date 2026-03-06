;; Problem 39: N-Queens (LeetCode 51)
;; Difficulty: Hard
;; Language: Clojure
;; 
(defn solve-n-queens [n]
  (letfn [(go [row cols d1 d2 board]
            (if (= row n)
              [(mapv (fn [c]
                       (apply str (map #(if (= % c) "Q" ".")
                                       (range n))))
                     (reverse board))]
              (mapcat (fn [c]
                        (when (and (not (cols c))
                                   (not (d1 (- row c)))
                                   (not (d2 (+ row c))))
                          (go (inc row) (conj cols c)
                              (conj d1 (- row c)) (conj d2 (+ row c))
                              (cons c board))))
                      (range n))))]
    (go 0 #{} #{} #{} '())))
