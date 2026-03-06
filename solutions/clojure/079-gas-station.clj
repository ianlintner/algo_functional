;; Problem 79: Gas Station (LeetCode 134)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn can-complete-circuit [gas cost]
  (let [[total _ start]
        (reduce (fn [[tot tank s] [d i]]
                  (let [tot2 (+ tot d) tank2 (+ tank d)]
                    (if (neg? tank2) [tot2 0 (inc i)] [tot2 tank2 s])))
                [0 0 0]
                (map-indexed (fn [i [g c]] [(- g c) i]) (map vector gas cost)))]
    (if (>= total 0) start -1)))
