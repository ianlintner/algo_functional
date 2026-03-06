;; Problem 144: Number of Connected Components in an Undirected Graph (LeetCode 323)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn count-components [n edges]
  (let [parent (atom (vec (range n)))
        find (fn find [x]
               (if (= (get @parent x) x) x
                 (let [root (find (get @parent x))]
                   (swap! parent assoc x root) root)))]
    (reduce (fn [cnt [a b]]
      (let [ra (find a) rb (find b)]
        (if (= ra rb) cnt
          (do (swap! parent assoc ra rb) (dec cnt)))))
      n edges)))
