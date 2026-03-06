;; Problem 49: Add Binary (LeetCode 67)
;; Difficulty: Easy
;; Language: Clojure
;; 
(defn add-binary [a b]
  (loop [i (dec (count a)) j (dec (count b)) carry 0 acc ""]
    (if (and (neg? i) (neg? j) (zero? carry)) acc
      (let [da (if (>= i 0) (- (int (nth a i)) 48) 0)
            db (if (>= j 0) (- (int (nth b j)) 48) 0)
            s (+ da db carry)]
        (recur (dec i) (dec j) (quot s 2)
               (str (mod s 2) acc))))))
