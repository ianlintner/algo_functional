;; Problem 153: Insert Delete GetRandom O(1) (LeetCode 380)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn create-set [] {:map {} :list []})
(defn rs-insert [{:keys [map list]} val]
  (if (contains? map val) [false {:map map :list list}]
    [true {:map (assoc map val (count list)) :list (conj list val)}]))
(defn rs-remove [{:keys [map list]} val]
  (if (not (contains? map val)) [false {:map map :list list}]
    (let [idx (map val) last-val (peek list)
          new-list (-> (pop list) (assoc idx last-val))
          new-map (-> (dissoc map val) (assoc last-val idx))]
      [true {:map new-map :list (if (= idx (dec (count list))) (pop list) new-list)}])))
