;; Problem 29: Valid Sudoku (LeetCode 36)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn valid-sudoku? [board]
  (let [entries (for [i (range 9) j (range 9)
                      :let [c (get-in board [i j])]
                      :when (not= c \. )]
                  [i j c])
        keys (mapcat (fn [[i j c]]
                       [(str "r" i ":" c)
                        (str "c" j ":" c)
                        (str "b" (quot i 3) "," (quot j 3) ":" c)])
                     entries)]
    (= (count keys) (count (set keys)))))
