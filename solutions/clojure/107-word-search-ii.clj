;; Problem 107: Word Search II (LeetCode 212)
;; Difficulty: Hard
;; Language: Clojure
;; 
(defn find-words [board words]
  (let [ins (fn ins [node w i]
              (if (= i (count w)) (assoc node :word w)
                (update-in node [:ch (nth w i)]
                  #(ins (or % {:ch {} :word nil}) w (inc i)))))
        trie (reduce #(ins %1 %2 0) {:ch {} :word nil} words)
        rows (count board) cols (count (first board))
        at (fn [r c] (get-in board [r c]))]
    (letfn [(dfs [r c node seen found]
              (if (or (< r 0) (>= r rows) (< c 0) (>= c cols) (seen [r c])) found
                (if-let [next (get-in node [:ch (at r c)])]
                  (let [f (if (:word next) (conj found (:word next)) found)
                        s (conj seen [r c])]
                    (reduce (fn [acc [dr dc]] (dfs (+ r dr) (+ c dc) next s acc))
                            f [[-1 0] [1 0] [0 -1] [0 1]]))
                  found)))]
      (vec (reduce (fn [f [r c]] (dfs r c trie #{} f))
                   #{} (for [r (range rows) c (range cols)] [r c]))))))
