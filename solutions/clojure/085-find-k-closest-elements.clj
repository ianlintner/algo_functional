;; Problem 85: Find K Closest Elements (LeetCode 658)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn find-closest-elements [arr k x]
  (loop [lo 0 hi (count arr)]
    (if (= (- hi lo) k) (subvec (vec arr) lo hi)
      (if (<= (Math/abs (- (arr lo) x)) (Math/abs (- (arr (dec hi)) x)))
        (recur lo (dec hi))
        (recur (inc lo) hi)))))
