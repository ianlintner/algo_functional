;; Problem 166: Find All Anagrams in a String (LeetCode 438)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn find-anagrams [s p]
  (let [p-freq (frequencies p)
        p-len (count p)]
    (loop [i 0 left 0 w-freq {} result []]
      (if (>= i (count s)) result
        (let [ch (nth s i)
              wf (update w-freq ch (fnil inc 0))
              [left wf] (if (> (- (inc i) left) p-len)
                          (let [lc (nth s left)
                                f (dec (wf lc))]
                            [(inc left) (if (zero? f) (dissoc wf lc) (assoc wf lc f))])
                          [left wf])]
          (recur (inc i) left wf
            (if (and (= (- (inc i) left) p-len) (= wf p-freq))
              (conj result left) result)))))))
