;; Problem 163: Longest Repeating Character Replacement (LeetCode 424)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn character-replacement [s k]
  (let [chars (vec s)]
    (loop [left 0 right 0 max-c 0 freq {} best 0]
      (if (>= right (count chars)) best
        (let [ch (chars right)
              freq (update freq ch (fnil inc 0))
              mc (max max-c (freq ch))]
          (if (> (- (inc (- right left)) mc) k)
            (let [lc (chars left)
                  freq (update freq lc dec)]
              (recur (inc left) (inc right) mc freq (max best (- right left))))
            (recur left (inc right) mc freq (max best (- (inc right) left)))))))))
