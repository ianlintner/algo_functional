;; Problem 168: Squares of a Sorted Array (LeetCode 977)
;; Difficulty: Easy
;; Language: Clojure
;; 
(defn sorted-squares [nums]
  (let [n (count nums)
        arr (vec nums)]
    (loop [l 0 r (dec n) i (dec n) result (vec (repeat n 0))]
      (if (< i 0) result
        (if (>= (abs (arr l)) (abs (arr r)))
          (recur (inc l) r (dec i) (assoc result i (* (arr l) (arr l))))
          (recur l (dec r) (dec i) (assoc result i (* (arr r) (arr r)))))))))
