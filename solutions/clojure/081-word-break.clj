;; Problem 81: Word Break (LeetCode 139)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn word-break [s word-dict]
  (let [dict (set word-dict)
        n (count s)]
    (get (reduce (fn [dp i]
                   (assoc dp i (some #(and (dp %) (dict (subs s % i)))
                                     (range i))))
                 {0 true} (range 1 (inc n)))
         n false)))
