;; Problem 71: Minimum Knight Moves (LeetCode 1197)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn min-knight-moves [x y]
  (let [tx (Math/abs x) ty (Math/abs y)
        moves [[1 2][2 1][2 -1][1 -2][-1 -2][-2 -1][-2 1][-1 2]]]
    (loop [queue (conj clojure.lang.PersistentQueue/EMPTY [0 0 0])
           visited #{[0 0]}]
      (let [[cx cy d] (peek queue) rest (pop queue)]
        (if (and (= cx tx) (= cy ty)) d
          (let [nexts (->> moves
                  (map (fn [[dx dy]] [(+ cx dx) (+ cy dy) (inc d)]))
                  (filter (fn [[nx ny _]] (and (>= nx -2) (>= ny -2)
                                               (not (visited [nx ny]))))))
                nvis (reduce (fn [s [a b _]] (conj s [a b])) visited nexts)]
            (recur (reduce conj rest nexts) nvis)))))))
