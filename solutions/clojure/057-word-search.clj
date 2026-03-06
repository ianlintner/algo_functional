;; Problem 57: Word Search (LeetCode 79)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn exist [board word]
  (let [rows (count board) cols (count (first board))
        dfs (fn dfs [r c i vis]
              (cond
                (= i (count word)) true
                (or (< r 0) (>= r rows) (< c 0) (>= c cols)) false
                (or (vis [r c]) (not= (get-in board [r c]) (nth word i))) false
                :else (let [vis (conj vis [r c])]
                        (some #(dfs (+ r (first %)) (+ c (second %)) (inc i) vis)
                              [[1 0] [-1 0] [0 1] [0 -1]]))))]
    (boolean (some (fn [r] (some (fn [c] (dfs r c 0 #{}))
                                 (range cols)))
                   (range rows)))))
