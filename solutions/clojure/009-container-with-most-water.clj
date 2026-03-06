;; Problem 9: Container With Most Water (LeetCode 11)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn max-area [height]
  (let [h (vec height)]
    (loop [l 0, r (dec (count h)), best 0]
      (if (>= l r) best
        (let [area (* (min (h l) (h r)) (- r l))
              new-best (max best area)]
          (if (< (h l) (h r))
            (recur (inc l) r new-best)
            (recur l (dec r) new-best)))))))
