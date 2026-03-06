;; Problem 116: Daily Temperatures (LeetCode 739)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn daily-temperatures [temps]
  (let [n (count temps)]
    (first
      (reduce (fn [[res stack] i]
                (let [stack (drop-while #(<= (temps %) (temps i)) stack)
                      val (if (empty? stack) 0 (- (first stack) i))]
                  [(assoc res i val) (cons i stack)]))
              [(vec (repeat n 0)) '()]
              (range (dec n) -1 -1)))))
