;; Problem 30: Sudoku Solver (LeetCode 37)
;; Difficulty: Hard
;; Language: Clojure
;; 
(defn solve-sudoku [board]
  (letfn [(find-empty [b]
            (first (for [i (range 9) j (range 9)
                         :when (= (get-in b [i j]) \.)]
                     [i j])))
          (valid? [b r c d]
            (let [br (* (quot r 3) 3) bc (* (quot c 3) 3)]
              (and (every? #(not= % d) (get b r))
                   (every? #(not= (get % c) d) b)
                   (every? #(not= % d)
                           (for [i (range br (+ br 3))
                                 j (range bc (+ bc 3))]
                             (get-in b [i j]))))))
          (solve [b]
            (if-let [[r c] (find-empty b)]
              (some (fn [d]
                      (when (valid? b r c d)
                        (solve (assoc-in b [r c] d))))
                    (map #(char (+ (int \1) %)) (range 9)))
              b))]
    (solve board)))
