;; Problem 142: Bus Routes (LeetCode 815)
;; Difficulty: Hard
;; Language: Clojure
;; 
(defn num-buses-to-destination [routes source target]
  (if (= source target) 0
    (let [stop-map (reduce-kv (fn [m ri route]
                    (reduce (fn [m2 s] (update m2 s (fnil conj []) ri)) m route))
                    {} (vec routes))]
      (loop [queue [source] buses 0 visited #{source} vr #{}]
        (cond
          (empty? queue) -1
          (some #{target} queue) buses
          :else
          (let [[next vis vr]
                (reduce (fn [[nq v r] stop]
                  (let [ris (remove r (get stop-map stop []))
                        r (into r ris)
                        new-stops (remove v (mapcat #(nth routes %) ris))
                        v (into v new-stops)]
                    [(into nq new-stops) v r]))
                  [[] visited vr] queue)]
            (recur next (inc buses) vis vr)))))))
